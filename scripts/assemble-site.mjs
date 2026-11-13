/**
 * Puts both builds into the deploy repo that Cloudflare Pages serves:
 *
 *   /             3D intro        (D:\Paginas\EmiMountain3D\dist: index.html, world/, models/)
 *   /portfolio/   this portfolio  (dist/index.html)
 *   /assets/ …    this portfolio's bundles and every public file (PDFs, frames, robots, sitemap…)
 *
 * Build both first:  npm run build  here, and  npx vite build  in EmiMountain3D.
 * Then:              node scripts/assemble-site.mjs
 * It only copies and stages; committing and pushing the deploy repo is a separate, deliberate step.
 */
import { cpSync, existsSync, mkdirSync, readdirSync, renameSync, rmSync, appendFileSync, readFileSync } from 'node:fs';
import { execSync } from 'node:child_process';
import { join } from 'node:path';

const DEPLOY = 'D:/Paginas/EmiGarciaFuenzalidaDesign';
const PORTFOLIO = 'D:/Paginas/EmiDesignType/dist';
const INTRO = 'D:/Paginas/EmiMountain3D/dist';

for (const [dir, file] of [[PORTFOLIO, 'index.html'], [INTRO, 'index.html'], [INTRO, 'world']]) {
  if (!existsSync(join(dir, file))) throw new Error(`Missing ${dir}/${file}: build it first.`);
}

// Old hashed bundles that the new builds no longer reference.
const fresh = new Set(readdirSync(join(PORTFOLIO, 'assets')));
for (const f of readdirSync(join(DEPLOY, 'assets'))) if (/^index-.*\.(js|css)$/.test(f) && !fresh.has(f)) rmSync(join(DEPLOY, 'assets', f));
rmSync(join(DEPLOY, 'world'), { recursive: true, force: true });

// Portfolio: everything at the root, then its page moves to /portfolio/.
cpSync(PORTFOLIO, DEPLOY, { recursive: true });
mkdirSync(join(DEPLOY, 'portfolio'), { recursive: true });
renameSync(join(DEPLOY, 'index.html'), join(DEPLOY, 'portfolio', 'index.html'));

// Intro at the root.
cpSync(join(INTRO, 'index.html'), join(DEPLOY, 'index.html'));
cpSync(join(INTRO, 'world'), join(DEPLOY, 'world'), { recursive: true });
cpSync(join(INTRO, 'models'), join(DEPLOY, 'models'), { recursive: true });

// The portfolio's _headers does not know about the intro's folders.
if (!readFileSync(join(DEPLOY, '_headers'), 'utf8').includes('/world/*')) {
  appendFileSync(
    join(DEPLOY, '_headers'),
    '\n# The 3D intro at the root: hashed bundles and CC0 models.\n/world/*\n  Cache-Control: public, max-age=31536000, immutable\n/models/*\n  Cache-Control: public, max-age=2592000\n',
  );
}

execSync('git add -A', { cwd: DEPLOY });
console.log(execSync('git status --short', { cwd: DEPLOY }).toString() || 'Nothing changed.');
