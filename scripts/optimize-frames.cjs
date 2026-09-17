/**
 * Optimize the raw video frames for scroll-scrubbing:
 * - subsample 500 PNGs -> TARGET_COUNT frames (even spacing)
 * - resize to WIDTH px wide, encode WebP q QUALITY
 * - write to public/frames/frame-<n>.webp (0-based, sequential)
 */
const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const SRC = 'frames';
const OUT = 'public/frames';
const TARGET_COUNT = 120;
const WIDTH = 1600;
const QUALITY = 62;

async function main() {
  const files = fs.readdirSync(SRC).filter((f) => f.endsWith('.png')).sort();
  console.log('source frames:', files.length);

  // Probe dimensions of the first frame
  const meta = await sharp(path.join(SRC, files[0])).metadata();
  console.log('source size:', meta.width + 'x' + meta.height);

  fs.rmSync(OUT, { recursive: true, force: true });
  fs.mkdirSync(OUT, { recursive: true });

  // Even subsample indices across the full range (always include first & last)
  const picks = [];
  for (let i = 0; i < TARGET_COUNT; i++) {
    picks.push(Math.round((i * (files.length - 1)) / (TARGET_COUNT - 1)));
  }

  let done = 0;
  const CONCURRENCY = 8;
  const queue = picks.map((srcIdx, outIdx) => ({ srcIdx, outIdx }));

  async function worker() {
    while (queue.length) {
      const { srcIdx, outIdx } = queue.shift();
      const out = path.join(OUT, `frame-${String(outIdx).padStart(3, '0')}.webp`);
      await sharp(path.join(SRC, files[srcIdx]))
        .resize({ width: WIDTH })
        .webp({ quality: QUALITY })
        .toFile(out);
      done++;
      if (done % 20 === 0) console.log('processed', done, '/', TARGET_COUNT);
    }
  }

  await Promise.all(Array.from({ length: CONCURRENCY }, worker));

  // Report
  const outFiles = fs.readdirSync(OUT);
  const total = outFiles.reduce((acc, f) => acc + fs.statSync(path.join(OUT, f)).size, 0);
  const avg = total / outFiles.length;
  console.log('output frames:', outFiles.length);
  console.log('total size:', (total / 1024 / 1024).toFixed(1), 'MB | avg:', (avg / 1024).toFixed(0), 'KB');
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
