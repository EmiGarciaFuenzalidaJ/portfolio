/**
 * Builds every raster icon from public/favicon.svg.
 *
 * The template shipped a stock favicon.ico, and index.html pointed at an
 * apple-touch-icon.png that did not exist — so phones, which skip the SVG,
 * fell back to the stock icon. Generating them all from one source means the
 * tab, the home screen and Android's launcher can't disagree again.
 *
 * Run by hand after changing the SVG: `npm run build:icons`.
 */
const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const PUBLIC = path.join(__dirname, '..', 'public');
const svg = fs.readFileSync(path.join(PUBLIC, 'favicon.svg'), 'utf8');

// Home-screen icons get masked by the OS, so they need a full-bleed square
// rather than the rounded tile used in the browser tab.
const square = svg.replace(/ rx="\d+"/, '');

// Android crops maskable icons to a circle inside the central 80%.
const maskable = square
  .replace('<path', '<g transform="translate(256 256) scale(0.8) translate(-256 -256)"><path')
  .replace('</svg>', '</g></svg>');

const png = (source, size) =>
  sharp(Buffer.from(source), { density: 72 * (size / 512) * 4 })
    .resize(size, size)
    .png()
    .toBuffer();

/** ICO container holding PNG payloads — supported by every current browser. */
function ico(images) {
  const header = Buffer.alloc(6 + images.length * 16);
  header.writeUInt16LE(0, 0);
  header.writeUInt16LE(1, 2);
  header.writeUInt16LE(images.length, 4);
  let offset = header.length;
  images.forEach(({ size, data }, i) => {
    const e = 6 + i * 16;
    header.writeUInt8(size >= 256 ? 0 : size, e);
    header.writeUInt8(size >= 256 ? 0 : size, e + 1);
    header.writeUInt8(0, e + 2);
    header.writeUInt8(0, e + 3);
    header.writeUInt16LE(1, e + 4);
    header.writeUInt16LE(32, e + 6);
    header.writeUInt32LE(data.length, e + 8);
    header.writeUInt32LE(offset, e + 12);
    offset += data.length;
  });
  return Buffer.concat([header, ...images.map((i) => i.data)]);
}

(async () => {
  const icoSizes = [16, 32, 48];
  const icoImages = await Promise.all(icoSizes.map(async (size) => ({ size, data: await png(svg, size) })));
  fs.writeFileSync(path.join(PUBLIC, 'favicon.ico'), ico(icoImages));

  const outputs = [
    ['apple-touch-icon.png', square, 180],
    ['icon-192.png', square, 192],
    ['icon-512.png', square, 512],
    ['icon-maskable-512.png', maskable, 512],
  ];
  for (const [name, source, size] of outputs) {
    fs.writeFileSync(path.join(PUBLIC, name), await png(source, size));
  }

  console.log(`favicon.ico (${icoSizes.join(', ')}) + ${outputs.map((o) => o[0]).join(', ')}`);
})();
