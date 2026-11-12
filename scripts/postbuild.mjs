/**
 * Runs after `vite build`.
 *
 * The app renders on the client, so on its own dist/index.html carries no
 * content: a crawler that does not run JavaScript — which is every AI crawler
 * today — would find an empty page. This script writes what the app shows
 * into static files:
 *
 *   dist/index.html      plain-HTML copy inside #root (EN + ES) and JSON-LD
 *   dist/llms.txt        short index for language models (llmstxt.org)
 *   dist/llms-full.txt   the full profile as Markdown (EN + ES)
 *   dist/sitemap.xml     with today's lastmod
 *
 * Everything comes from the same sources as the site and the CV
 * (src/data/*.ts, the i18n table, scripts/cv-data.cjs), so it cannot drift.
 * The build fails if a placeholder is missing or the content looks empty.
 */
import { createRequire } from 'node:module';
import { readFileSync, writeFileSync } from 'node:fs';
import { createServer } from 'vite';

const require = createRequire(import.meta.url);
const cv = require('./cv-data.cjs');

const SITE = cv.CONTACT.portfolioHref; // ends with "/"
const NAME = cv.CONTACT.name;
const EMAIL = cv.CONTACT.email;
const TODAY = new Date().toISOString().slice(0, 10);

// ── 1. Load the site's own data through Vite, so TS, aliases and image imports resolve.
const vite = await createServer({
  appType: 'custom',
  logLevel: 'error',
  server: { middlewareMode: true, hmr: false, watch: null },
  optimizeDeps: { noDiscovery: true, include: [] },
});
let projects, courses, socialLinks, translations;
try {
  ({ projects } = await vite.ssrLoadModule('/src/data/projects.ts'));
  ({ courses } = await vite.ssrLoadModule('/src/data/courses.ts'));
  ({ socialLinks } = await vite.ssrLoadModule('/src/data/socials.ts'));
  ({ translations } = await vite.ssrLoadModule('/src/contexts/LanguageContext.tsx'));
} finally {
  await vite.close();
}
if (!translations?.en || !translations?.es) throw new Error('postbuild: translations not found');
if (!projects?.length || !courses?.length) throw new Error('postbuild: projects or courses are empty');

const featured = projects.filter((p) => p.featured);
const rest = projects.filter((p) => !p.featured);

const L = {
  en: {
    featured: 'Featured projects', more: 'More case studies', exp: 'Experience', edu: 'Education',
    certs: 'Courses and certifications', skills: 'Skills and tools', services: 'Services', links: 'Links',
    problem: 'Problem', solution: 'Solution', insight: 'Insight', decisions: 'Key decisions', impact: 'Results',
    scope: 'Scope', live: 'Live project', langs: 'Languages', cv: 'CV (PDF)',
    profile: 'Full profile as plain text', portfolio: 'Interactive portfolio',
  },
  es: {
    featured: 'Proyectos destacados', more: 'Más casos de estudio', exp: 'Experiencia', edu: 'Educación',
    certs: 'Cursos y certificaciones', skills: 'Habilidades y herramientas', services: 'Servicios', links: 'Enlaces',
    problem: 'Problema', solution: 'Solución', insight: 'Aprendizaje', decisions: 'Decisiones clave', impact: 'Resultados',
    scope: 'Alcance', live: 'Proyecto en vivo', langs: 'Idiomas', cv: 'CV (PDF)',
    profile: 'Perfil completo en texto plano', portfolio: 'Portfolio interactivo',
  },
};

/** Field `k` in the given language: data files keep Spanish under `kEs`. */
const loc = (o, k, lang) => (lang === 'es' ? o[`${k}Es`] ?? o[k] : o[k]);
const serviceIds = Object.keys(translations.en)
  .map((k) => /^services\.([a-z]+)\.desc$/.exec(k)?.[1])
  .filter(Boolean);
if (!serviceIds.length) throw new Error('postbuild: no services found in the i18n table');
/** A service's name is whichever of its keys is not the description. */
const serviceTitle = (t, id) => {
  const key = Object.keys(t).find((k) => (k === `services.${id}` || k.startsWith(`services.${id}.`)) && !k.endsWith('.desc'));
  return key ? t[key] : id;
};
const metricsOf = (p, lang) => (p.metrics ?? []).map((m) => `${m.value} ${loc(m, 'label', lang)}`).join(' · ');
const metricsLabel = (p, lang) => {
  const source = loc(p, 'metricsSource', lang);
  return (p.metricsKind === 'scope' ? L[lang].scope : L[lang].impact) + (source ? ` (${source})` : '');
};
const links = (lang) => [
  [L[lang].portfolio, SITE],
  [L[lang].profile, `${SITE}llms-full.txt`],
  [`${L[lang].cv} — English`, SITE + cv.en.fileName],
  [`${L[lang].cv} — Español`, SITE + cv.es.fileName],
  ...socialLinks.map((s) => [s.name, s.href]),
  ['Email', `mailto:${EMAIL}`],
];

// ── 2. Markdown (llms-full.txt)
const projectMd = (p, lang) => {
  const l = L[lang];
  const lines = [`### ${loc(p, 'title', lang)}`, '', `${loc(p, 'category', lang)}. ${loc(p, 'oneLiner', lang)}`, ''];
  lines.push(`- ${l.problem}: ${loc(p, 'problem', lang)}`, `- ${l.solution}: ${loc(p, 'solution', lang)}`);
  if (p.insight) lines.push(`- ${l.insight}: ${loc(p, 'insight', lang)}`);
  if (p.metrics?.length) lines.push(`- ${metricsLabel(p, lang)}: ${metricsOf(p, lang)}`);
  const decisions = loc(p, 'decisions', lang) ?? [];
  if (decisions.length) lines.push(`- ${l.decisions}:`, ...decisions.map((d) => `  - ${d}`));
  if (p.url) lines.push(`- ${l.live}: ${p.url}`);
  lines.push('');
  return lines;
};

const markdown = (lang) => {
  const c = cv[lang];
  const t = translations[lang];
  const l = L[lang];
  return [
    `# ${NAME} — ${c.headline}`, '',
    `${c.locationLine} · ${EMAIL} · ${SITE}`, '',
    c.summary, '',
    t['info.statement'], '',
    `## ${l.featured}`, '', ...featured.flatMap((p) => projectMd(p, lang)),
    `## ${l.more}`, '', ...rest.flatMap((p) => projectMd(p, lang)),
    `## ${l.exp}`, '',
    ...c.experience.flatMap((e) => [`### ${e.role} — ${e.company}`, '', `${e.period} · ${e.place}`, '', ...e.bullets.map((b) => `- ${b}`), '']),
    `## ${l.edu}`, '', ...c.education.map(([what, where, when]) => `- ${what} — ${where} (${when})`), '',
    `## ${l.certs}`, '', ...courses.map((x) => `- ${loc(x, 'title', lang)}: ${loc(x, 'description', lang)}`), '',
    `## ${l.skills}`, '', ...c.skills.map(([group, items]) => `- ${group}: ${items}`), `- ${l.langs}: ${c.languages.join(' · ')}`, '',
    `## ${l.services}`, '', ...serviceIds.map((id) => `- ${serviceTitle(t, id)}: ${t[`services.${id}.desc`]}`), '',
    `## ${l.links}`, '', ...links(lang).map(([text, href]) => `- [${text}](${href})`), '',
  ].join('\n');
};

// ── 3. HTML copy for #root
const h = (s) => String(s ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const a = (href, text) => `<a href="${h(href)}">${h(text)}</a>`;
const ul = (items) => `<ul>${items.map((i) => `<li>${i}</li>`).join('')}</ul>`;

const projectHtml = (p, lang, full) => {
  const l = L[lang];
  let out = `<article><h3>${h(loc(p, 'title', lang))}</h3><p>${h(loc(p, 'category', lang))}. ${h(loc(p, 'oneLiner', lang))}</p>`;
  if (full) {
    out += `<p><strong>${l.problem}:</strong> ${h(loc(p, 'problem', lang))}</p>`;
    out += `<p><strong>${l.solution}:</strong> ${h(loc(p, 'solution', lang))}</p>`;
    if (p.insight) out += `<p><strong>${l.insight}:</strong> ${h(loc(p, 'insight', lang))}</p>`;
  }
  if (p.metrics?.length) out += `<p><strong>${h(metricsLabel(p, lang))}:</strong> ${h(metricsOf(p, lang))}</p>`;
  if (p.url) out += `<p>${a(p.url, l.live)}</p>`;
  return `${out}</article>`;
};

const html = (lang) => {
  const c = cv[lang];
  const t = translations[lang];
  const l = L[lang];
  return [
    `<article lang="${lang}">`,
    `<header><h1>${h(NAME)} — ${h(c.headline)}</h1><p>${h(c.locationLine)} · ${a(`mailto:${EMAIL}`, EMAIL)}</p></header>`,
    `<p>${h(c.summary)}</p><p>${h(t['info.statement'])}</p>`,
    `<section><h2>${l.featured}</h2>${featured.map((p) => projectHtml(p, lang, true)).join('')}</section>`,
    `<section><h2>${l.more}</h2>${rest.map((p) => projectHtml(p, lang, false)).join('')}</section>`,
    `<section><h2>${l.exp}</h2>${c.experience.map((e) => `<h3>${h(e.role)} — ${h(e.company)}</h3><p>${h(e.period)} · ${h(e.place)}</p>${ul(e.bullets.map(h))}`).join('')}</section>`,
    `<section><h2>${l.edu}</h2>${ul(c.education.map(([what, where, when]) => `${h(what)} — ${h(where)} (${h(when)})`))}</section>`,
    `<section><h2>${l.certs}</h2>${ul(courses.map((x) => h(loc(x, 'title', lang))))}</section>`,
    `<section><h2>${l.skills}</h2>${ul([...c.skills.map(([group, items]) => `<strong>${h(group)}:</strong> ${h(items)}`), `<strong>${l.langs}:</strong> ${h(c.languages.join(' · '))}`])}</section>`,
    `<section><h2>${l.services}</h2>${ul(serviceIds.map((id) => `<strong>${h(serviceTitle(t, id))}:</strong> ${h(t[`services.${id}.desc`])}`))}</section>`,
    `<section><h2>${l.links}</h2>${ul(links(lang).map(([text, href]) => a(href, text)))}</section>`,
    '</article>',
  ].join('');
};

const staticHtml = `<div id="static-content">${html('en')}${html('es')}</div>`;

// ── 4. JSON-LD
const personId = `${SITE}#person`;
const credential = (line) => {
  const cut = line.lastIndexOf(' - ');
  const issuer = line.slice(cut + 3).replace(/,\s*\d{4}$/, '');
  return {
    '@type': 'EducationalOccupationalCredential',
    name: line.slice(0, cut),
    credentialCategory: 'certificate',
    recognizedBy: { '@type': 'Organization', name: issuer },
  };
};
const graph = {
  '@context': 'https://schema.org',
  '@graph': [
    { '@type': 'WebSite', '@id': `${SITE}#website`, url: SITE, name: `${NAME} — Portfolio`, inLanguage: ['en', 'es'], author: { '@id': personId } },
    { '@type': 'ProfilePage', '@id': `${SITE}#profile`, url: SITE, name: `${NAME} — ${cv.en.headline}`, dateModified: TODAY, isPartOf: { '@id': `${SITE}#website` }, mainEntity: { '@id': personId } },
    {
      '@type': 'Person',
      '@id': personId,
      name: NAME,
      alternateName: 'Emi García Fuenzalida',
      jobTitle: cv.en.headline,
      description: cv.en.summary,
      email: `mailto:${EMAIL}`,
      telephone: cv.CONTACT.phoneHref.replace('tel:', ''),
      url: SITE,
      image: `${SITE}og-image.jpg`,
      address: { '@type': 'PostalAddress', addressLocality: 'Godoy Cruz', addressRegion: 'Mendoza', addressCountry: 'AR' },
      knowsLanguage: ['es', 'en'],
      knowsAbout: [
        'UX Design', 'UI Design', 'Product Design', 'UX Research', 'Usability Testing', 'Information Architecture',
        'Design Systems', 'Interaction Design', 'Prototyping', 'Accessibility', 'Figma', 'React',
        'AI Product Design', 'Conversational UX', 'Dashboard Design', 'Workflow Automation',
        'Unity', 'Augmented Reality', 'Virtual Reality', 'Design Thinking', 'Agile',
      ],
      worksFor: { '@type': 'Organization', name: 'DAIA AI' },
      alumniOf: [
        { '@type': 'CollegeOrUniversity', name: 'Universidad de Mendoza' },
        { '@type': 'CollegeOrUniversity', name: 'Universidad Tecnológica Nacional (UTN)' },
      ],
      hasCredential: cv.en.certifications.map(credential),
      sameAs: socialLinks.map((s) => s.href),
    },
    {
      '@type': 'ItemList',
      '@id': `${SITE}#case-studies`,
      name: 'UX case studies',
      numberOfItems: projects.length,
      itemListElement: projects.map((p, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        item: {
          '@type': 'CreativeWork',
          name: p.title,
          description: p.oneLiner,
          genre: p.category,
          ...(p.url ? { url: p.url } : {}),
          creator: { '@id': personId },
        },
      })),
    },
  ],
};
const jsonLd = `<script type="application/ld+json">${JSON.stringify(graph).replace(/</g, '\\u003c')}</script>`;

// ── 5. llms.txt
const llms = [
  `# ${NAME}`, '',
  `> ${cv.en.headline} based in Mendoza, Argentina, open to remote work. ${translations.en['info.statement']}`, '',
  cv.en.summary, '',
  '## Profile', '',
  `- [Full profile](${SITE}llms-full.txt): experience, ${projects.length} case studies with problem, decisions and results, education, ${courses.length} courses and certifications, in English and Spanish`,
  `- [Interactive portfolio](${SITE}): the same content with visuals and prototypes`,
  `- [CV in English (PDF)](${SITE}${cv.en.fileName})`,
  `- [CV en español (PDF)](${SITE}${cv.es.fileName})`, '',
  '## Featured projects', '',
  ...featured.map((p) => `- [${p.title}](${p.url ?? `${SITE}#projects`}): ${p.oneLiner}`), '',
  '## Contact', '',
  `- Email: ${EMAIL}`,
  ...socialLinks.map((s) => `- [${s.name}](${s.href})`), '',
].join('\n');

// ── 6. Write
const indexPath = 'dist/index.html';
let page = readFileSync(indexPath, 'utf8');
for (const [placeholder, value] of [['<!--STATIC-->', staticHtml], ['<!--JSONLD-->', jsonLd]]) {
  if (!page.includes(placeholder)) throw new Error(`postbuild: ${placeholder} is missing from dist/index.html`);
  page = page.replace(placeholder, () => value);
}
writeFileSync(indexPath, page);
writeFileSync('dist/llms.txt', llms);
writeFileSync('dist/llms-full.txt', `${markdown('en')}\n---\n\n${markdown('es')}`);
writeFileSync(
  'dist/sitemap.xml',
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${[SITE, SITE + cv.en.fileName, SITE + cv.es.fileName]
    .map((u) => `  <url><loc>${u}</loc><lastmod>${TODAY}</lastmod></url>`)
    .join('\n')}\n</urlset>\n`,
);

const words = staticHtml.replace(/<[^>]+>/g, ' ').split(/\s+/).filter(Boolean).length;
if (words < 2000) throw new Error(`postbuild: static content looks empty (${words} words)`);
console.log(
  `postbuild: ${words} words of static content · ${projects.length} projects (${featured.length} featured) · ` +
    `${courses.length} courses · ${serviceIds.length} services · index.html ${(page.length / 1024).toFixed(0)} KB`,
);
