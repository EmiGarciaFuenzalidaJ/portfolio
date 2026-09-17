/**
 * ATS smoke test for the generated CVs.
 *
 *   node scripts/verify-cv.cjs      (or: npm run verify:cv)
 *
 * Every check here maps to a defect the previous Google Docs exports actually
 * had (September 2026 parsing audit), so a future regression fails loudly
 * instead of shipping a CV a parser cannot read.
 *
 * Needs `pdftotext` (poppler/xpdf) for the text-layer checks. Without it those
 * are skipped and only the structural checks run.
 */

const fs = require('fs');
const path = require('path');
const os = require('os');
const { execFileSync } = require('child_process');
const { en, es } = require('./cv-data.cjs');

const PUBLIC = path.join(__dirname, '..', 'public');
const TARGETS = [en.fileName, es.fileName];

let failures = 0;
let skipped = 0;

const ok = (msg) => console.log(`   PASS  ${msg}`);
const bad = (msg) => {
  console.log(`   FAIL  ${msg}`);
  failures++;
};
const skip = (msg) => {
  console.log(`   SKIP  ${msg}`);
  skipped++;
};
const check = (cond, msg) => (cond ? ok(msg) : bad(msg));

// poppler ships with Git for Windows but is not always on PATH.
const PDFTOTEXT_CANDIDATES = [
  'pdftotext',
  'C:\\Program Files\\Git\\mingw64\\bin\\pdftotext.exe',
  'C:\\Program Files (x86)\\Git\\mingw64\\bin\\pdftotext.exe',
  '/usr/bin/pdftotext',
  '/usr/local/bin/pdftotext',
];

function findPdftotext() {
  for (const bin of PDFTOTEXT_CANDIDATES) {
    try {
      execFileSync(bin, ['-v'], { stdio: 'pipe' });
      return bin;
    } catch (err) {
      // `pdftotext -v` prints its version and exits 99, so a non-ENOENT error
      // still means we found a working binary.
      if (err && err.code !== 'ENOENT' && typeof err.status === 'number') {
        return bin;
      }
    }
  }
  return null;
}

const PDFTOTEXT = findPdftotext();

/**
 * `-layout` rebuilds lines from glyph geometry — what a parser working off the
 * page actually sees. The default mode is xpdf's reading-order heuristic, which
 * reflows tightly-spaced lines into paragraphs; that one is checked separately
 * and only for the failure that actually costs a candidate.
 */
function extract(file, mode) {
  const out = path.join(
    os.tmpdir(),
    `cv-verify-${Date.now()}-${Math.random().toString(36).slice(2)}.txt`
  );
  const args = mode
    ? [mode, '-enc', 'UTF-8', file, out]
    : ['-enc', 'UTF-8', file, out];
  execFileSync(PDFTOTEXT, args, { stdio: 'pipe' });
  const txt = fs.readFileSync(out, 'utf8');
  fs.unlinkSync(out);
  return txt;
}

for (const name of TARGETS) {
  const file = path.join(PUBLIC, name);
  console.log(`\n${name}`);

  if (!fs.existsSync(file)) {
    bad('file exists');
    continue;
  }

  const bin = fs.readFileSync(file).toString('latin1');
  const isEnglish = name.endsWith('-EN.pdf');
  const data = isEnglish ? en : es;
  const expectedLang = isEnglish ? 'en-US' : 'es-AR';

  // --- structure ------------------------------------------------------------

  check(/\/Marked\s+true/.test(bin), 'tagged PDF (/MarkInfo /Marked true)');
  check(/\/StructTreeRoot/.test(bin), 'has /StructTreeRoot');
  check(
    bin.includes(`/Lang (${expectedLang})`) ||
      bin.includes(`/Lang(${expectedLang})`),
    `declares /Lang ${expectedLang}`
  );

  // pdfkit stores Info values as indirect references, so accept `(…)`, `<…>`
  // and `N 0 R`, then confirm the strings themselves reached the file.
  const infoKey = (key) =>
    new RegExp(`/${key}\\s*(\\(|<|\\d+ \\d+ R)`).test(bin);
  check(infoKey('Title'), 'has /Title');
  check(infoKey('Author'), 'has /Author');
  check(infoKey('Keywords'), 'has /Keywords');
  check(bin.includes('Fuenzalida'), '/Author value written into the file');
  check(
    bin.includes('Product Designer'),
    '/Keywords value written into the file'
  );
  check(!/\/Encrypt/.test(bin), 'not encrypted');

  const links = (bin.match(/\/Subtype\s*\/Link/g) || []).length;
  check(links >= 5, `clickable links present (${links}, need >= 5)`);

  const images = (bin.match(/\/Subtype\s*\/Image/g) || []).length;
  check(images === 0, `no embedded images (${images})`);

  const pages = (bin.match(/\/Type\s*\/Page[^s]/g) || []).length;
  check(pages > 0 && pages <= 3, `page count is recruiter-friendly (${pages})`);

  // --- text layer -----------------------------------------------------------

  if (!PDFTOTEXT) {
    skip('text-layer checks (pdftotext not found)');
    continue;
  }

  const txt = extract(file, '-layout');
  const lines = txt.split(/\r?\n/).filter((l) => l.trim());

  const zwsp = (txt.match(/\u200b/g) || []).length;
  check(zwsp === 0, `no zero-width spaces (${zwsp})`);

  const surrogates = (txt.match(/[\ud800-\udfff]/g) || []).length;
  check(surrogates === 0, `no lone surrogates from emoji (${surrogates})`);

  const replacement = (txt.match(/\ufffd/g) || []).length;
  check(replacement === 0, `no undecodable characters (${replacement})`);

  const emoji = (txt.match(/[\u2190-\u21ff\u2600-\u27bf\ufe0f]/g) || []).length;
  check(emoji === 0, `no emoji or dingbats (${emoji})`);

  // Every bullet occupies its own line.
  const merged = lines.filter((l) => (l.match(/\u2022/g) || []).length > 1);
  check(
    merged.length === 0,
    `no line holds more than one bullet (${merged.length})`
  );

  // A bullet line is one responsibility, not a whole job glued together. The
  // summary paragraph is legitimately one long line, so only bullets count.
  const longestBullet = lines
    .filter((l) => l.includes('\u2022'))
    .reduce((a, b) => (b.length > a.length ? b : a), '');
  check(
    longestBullet.length <= 220,
    `longest bullet is one responsibility (${longestBullet.length} chars, max 220)`
  );

  // The expensive failure, tested against the most aggressive extractor there
  // is: a company/date header welded onto the bullets underneath it.
  const reflowed = extract(file)
    .split(/\r?\n/)
    .filter((l) => l.trim());
  const fused = reflowed.filter(
    (l) => /\|\s*20\d\d/.test(l) && l.includes('\u2022')
  );
  check(
    fused.length === 0,
    `job headers survive reading-order extraction (${fused.length} fused)`
  );

  // Contact block: one labelled field per line, machine-readable.
  check(
    /^\s*(Email|Correo):\s*\S+@\S+\.\S+\s*$/m.test(txt),
    'email alone on its own labelled line'
  );
  check(
    /^\s*(Phone|Tel\u00e9fono):\s*\+[\d\s]+$/m.test(txt),
    'phone alone on its own labelled line'
  );
  check(
    /^\s*LinkedIn:\s*linkedin\.com\/\S+\s*$/m.test(txt),
    'LinkedIn alone on its own labelled line'
  );

  // Section headings a parser recognises by dictionary.
  const missing = Object.values(data.sections).filter((h) => !txt.includes(h));
  check(
    missing.length === 0,
    `all section headings present${missing.length ? ` (missing: ${missing.join(', ')})` : ''}`
  );

  // Regressions we specifically fixed.
  check(!txt.includes('DalA'), 'company name is not the "DalA" typo');
  check(txt.includes('DAIA AI'), 'company name reads "DAIA AI"');
  const metrics = (txt.match(/[+-]\d+%/g) || []).length;
  check(metrics >= 10, `quantified achievements reached the text layer (${metrics})`);

  const words = txt.split(/\s+/).filter(Boolean).length;
  check(words > 700, `substantial text layer (${words} words)`);
}

console.log(
  `\n${failures === 0 ? 'All checks passed' : `${failures} check(s) FAILED`}` +
    `${skipped ? ` \u2014 ${skipped} skipped` : ''}\n`
);
process.exit(failures === 0 ? 0 : 1);
