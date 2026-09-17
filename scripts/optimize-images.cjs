/**
 * Converts the heavy source images to WebP in place.
 *
 *   node scripts/optimize-images.cjs          report only
 *   node scripts/optimize-images.cjs --write  convert and rewrite imports
 *
 * The certificate scans and a few portfolio pieces shipped as PNG — one of them
 * a megabyte on its own, several of the Google certificates around half a
 * megabyte each. They are screenshots of documents, which is the case WebP
 * handles best, and they sit in a section a visitor scrolls past.
 *
 * Anything already small enough is left alone: re-encoding a 40 KB image buys
 * nothing and costs a generation of quality.
 */

const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const ROOT = path.join(__dirname, '..');
const ASSETS = path.join(ROOT, 'src', 'assets');
const WRITE = process.argv.includes('--write');

/** Only bother with files above this. */
const THRESHOLD = 250 * 1024;
const QUALITY = 82;

function walk(dir, out = []) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) walk(p, out);
    else if (/\.(png|jpe?g)$/i.test(e.name)) out.push(p);
  }
  return out;
}

async function main() {
  const files = walk(ASSETS).filter((f) => fs.statSync(f).size > THRESHOLD);
  files.sort((a, b) => fs.statSync(b).size - fs.statSync(a).size);

  let before = 0;
  let after = 0;
  const renames = [];

  for (const file of files) {
    const sizeBefore = fs.statSync(file).size;
    const webp = file.replace(/\.(png|jpe?g)$/i, '.webp');
    const buf = await sharp(file).webp({ quality: QUALITY }).toBuffer();

    before += sizeBefore;
    after += buf.length;
    const saved = (1 - buf.length / sizeBefore) * 100;

    console.log(
      `  ${path.basename(file).padEnd(34)} ` +
        `${(sizeBefore / 1024).toFixed(0).padStart(5)} KB -> ` +
        `${(buf.length / 1024).toFixed(0).padStart(5)} KB  (-${saved.toFixed(0)}%)`
    );

    if (WRITE) {
      fs.writeFileSync(webp, buf);
      fs.unlinkSync(file);
      renames.push([path.basename(file), path.basename(webp)]);
    }
  }

  console.log(
    `\n  total  ${(before / 1024 / 1024).toFixed(2)} MB -> ` +
      `${(after / 1024 / 1024).toFixed(2)} MB ` +
      `(-${((1 - after / before) * 100).toFixed(0)}%)`
  );

  if (!WRITE) {
    console.log('\n  (informe solamente — usar --write para aplicar)');
    return;
  }

  // Point the imports at the new files.
  const srcFiles = [];
  (function walkSrc(dir) {
    for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
      const p = path.join(dir, e.name);
      if (e.isDirectory()) walkSrc(p);
      else if (/\.tsx?$/.test(e.name)) srcFiles.push(p);
    }
  })(path.join(ROOT, 'src'));

  let touched = 0;
  for (const f of srcFiles) {
    let s = fs.readFileSync(f, 'utf8');
    const original = s;
    for (const [from, to] of renames) s = s.split(from).join(to);
    if (s !== original) {
      fs.writeFileSync(f, s);
      touched++;
    }
  }
  console.log(`  imports actualizados en ${touched} archivos`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
