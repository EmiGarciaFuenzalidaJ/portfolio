/**
 * Builds the downloadable CVs as ATS-safe PDFs.
 *
 *   node scripts/build-cv.cjs        (or: npm run build:cv)
 *
 * Why this exists: the previous CVs were Google Docs exports whose text layer
 * was unparseable — emoji exported as images left invalid UTF-8 bytes in the
 * contact block, 39 zero-width spaces were welded between keywords, and every
 * bullet of a job collapsed onto a single 493-character line, so a parser
 * could not tell the company from the responsibilities.
 *
 * Everything here is built for the parser first:
 *   - one text run per line, so line structure survives extraction
 *   - plain ASCII labels instead of emoji, one contact field per line
 *   - no zero-width spaces, no images, no tables, no columns
 *   - real /Link annotations for portfolio, LinkedIn, GitHub, email, phone
 *   - correct /Lang per language, full document metadata, tagged structure
 *   - a job header is never orphaned from its first bullets by a page break
 *
 * After changing anything, verify with:  node scripts/verify-cv.cjs
 */

const fs = require('fs');
const path = require('path');
const PDFDocument = require('pdfkit');
const { CONTACT, en, es } = require('./cv-data.cjs');

const OUT_DIR = path.join(__dirname, '..', 'public');

// pdfkit stamps a fresh CreationDate on every run, which would make the PDFs
// differ byte-for-byte on each build and show up as noise in every commit.
// Tie the date to when the content itself last changed instead, so rebuilding
// without editing anything produces identical files.
const CONTENT_DATE = fs.statSync(path.join(__dirname, 'cv-data.cjs')).mtime;

// Layout
const PAGE = 'LETTER';
const M = Number(process.env.CV_MARGIN || 50); // margin
const PAGE_W = 612;
const PAGE_H = 792;
const CONTENT_W = PAGE_W - M * 2;
const BOTTOM = PAGE_H - M;

// Type
const BODY_SIZE = Number(process.env.CV_BODY_SIZE || 9.5);
const BODY = 'Helvetica';
const BOLD = 'Helvetica-Bold';
const ITALIC = 'Helvetica-Oblique';

// Color
const INK = '#141414';
const INK_SOFT = '#4A4A4A';
const ACCENT = '#2F5D8C';

// Vertical breathing room between logical lines. This is not cosmetic: some
// text extractors (xpdf's reading-order mode, for one) glue consecutive lines
// into a single run when the gap is tight, which is exactly what makes a CV
// unparseable — the job header fuses with its own bullets. Keeping distinct
// items clearly apart makes the line structure survive any extractor.
const BULLET_GAP = Number(process.env.CV_BULLET_GAP || 5);
const HEADER_GAP = Number(process.env.CV_HEADER_GAP || 7);
const LINE_GAP = Number(process.env.CV_LINE_GAP || 1.2);

function build(data) {
  const doc = new PDFDocument({
    size: PAGE,
    margins: { top: M, bottom: M, left: M, right: M },
    pdfVersion: '1.7',
    tagged: true,
    displayTitle: true,
    lang: data.lang,
    info: {
      Title: data.meta.title,
      Author: CONTACT.name,
      Subject: data.meta.subject,
      Keywords: data.meta.keywords,
      Creator: CONTACT.name,
      CreationDate: CONTENT_DATE,
      ModDate: CONTENT_DATE,
    },
  });

  const root = doc.struct('Document');
  doc.addStructure(root);

  // --- primitives -----------------------------------------------------------

  const space = (n) => {
    doc.y += n;
  };

  const ensure = (needed) => {
    if (doc.y + needed > BOTTOM) {
      doc.addPage();
    }
  };

  const measure = (text, size, font, width) => {
    doc.font(font).fontSize(size);
    return doc.heightOfString(text, { width: width || CONTENT_W });
  };

  const line = (text, opts = {}) => {
    const {
      size = BODY_SIZE,
      font = BODY,
      color = INK,
      gap = 0,
      link = null,
      width = CONTENT_W,
      x = M,
    } = opts;
    doc.font(font).fontSize(size).fillColor(color);
    doc.text(text, x, doc.y, { width, link, underline: false, lineGap: LINE_GAP });
    if (gap) space(gap);
  };

  const tagged = (type, fn) => {
    root.add(doc.struct(type, {}, fn));
  };

  // --- header ---------------------------------------------------------------

  tagged('H1', () => {
    doc.font(BOLD).fontSize(19).fillColor(INK);
    // No characterSpacing anywhere: tracking makes extractors emit
    // 'E D U C AT I O N', and a parser looking for the section by dictionary
    // then misses it entirely.
    doc.text(CONTACT.name.toUpperCase(), M, doc.y, { width: CONTENT_W });
  });
  space(2);

  tagged('P', () => {
    line(data.headline, { size: 11.5, font: BOLD, color: ACCENT, gap: 5 });
  });

  tagged('P', () => {
    line(data.locationLine, { size: 9.4, color: INK_SOFT, gap: 3 });
    // One contact field per line. Labels are plain ASCII, never icons.
    line(`${data.labels.email}: ${CONTACT.email}`, {
      size: 9.4,
      link: `mailto:${CONTACT.email}`,
    });
    line(`${data.labels.phone}: ${CONTACT.phoneText}`, {
      size: 9.4,
      link: CONTACT.phoneHref,
    });
    line(`${data.labels.portfolio}: ${CONTACT.portfolioText}`, {
      size: 9.4,
      link: CONTACT.portfolioHref,
    });
    line(`${data.labels.linkedin}: ${CONTACT.linkedinText}`, {
      size: 9.4,
      link: CONTACT.linkedinHref,
    });
    line(`${data.labels.github}: ${CONTACT.githubText}`, {
      size: 9.4,
      link: CONTACT.githubHref,
    });
  });

  // --- section heading ------------------------------------------------------

  const heading = (text) => {
    ensure(46);
    space(9);
    tagged('H2', () => {
      doc.font(BOLD).fontSize(10.8).fillColor(ACCENT);
      doc.text(text.toUpperCase(), M, doc.y, { width: CONTENT_W });
    });
    space(2);
    doc
      .moveTo(M, doc.y)
      .lineTo(M + CONTENT_W, doc.y)
      .lineWidth(0.7)
      .strokeColor(ACCENT)
      .stroke();
    space(5);
    doc.fillColor(INK);
  };

  const bullet = (text) => {
    doc.font(BODY).fontSize(BODY_SIZE);
    const h = doc.heightOfString(text, { width: CONTENT_W - 12, lineGap: LINE_GAP });
    ensure(h + 3);
    const y = doc.y;
    doc.font(BODY).fontSize(BODY_SIZE).fillColor(INK);
    doc.text('•', M + 1, y, { width: 8, lineBreak: false });
    doc.text(text, M + 12, y, { width: CONTENT_W - 12, lineGap: LINE_GAP });
    space(BULLET_GAP);
  };

  // --- summary --------------------------------------------------------------

  heading(data.sections.summary);
  tagged('P', () => {
    doc.font(BODY).fontSize(BODY_SIZE).fillColor(INK);
    doc.text(data.summary, M, doc.y, { width: CONTENT_W, align: 'justify' });
  });

  // --- skills ---------------------------------------------------------------

  heading(data.sections.skills);
  for (const [label, list] of data.skills) {
    // "Label: a, b, c" on one line keeps the category attached to its keywords.
    const text = `${label}: ${list}`;
    const h = measure(text, BODY_SIZE, BODY, CONTENT_W);
    ensure(h + 3);
    const y = doc.y;
    doc.font(BOLD).fontSize(BODY_SIZE).fillColor(INK);
    const labelW = doc.widthOfString(`${label}: `);
    doc.text(`${label}: `, M, y, { lineBreak: false });
    doc.font(BODY).fillColor(INK);
    doc.text(list, M + labelW, y, { width: CONTENT_W - labelW, lineGap: LINE_GAP });
    space(BULLET_GAP);
  }

  // --- languages ------------------------------------------------------------

  heading(data.sections.languages);
  data.languages.forEach((l) => {
    tagged('P', () => {
      line(l, { size: BODY_SIZE, gap: 1.5 });
    });
  });

  // --- experience -----------------------------------------------------------

  heading(data.sections.experience);
  data.experience.forEach((job, i) => {
    const companyLine =
      job.company === 'Independent' || job.company === 'Independiente'
        ? `${job.company} — ${job.place} | ${job.period}`
        : `${job.company} — ${job.place} | ${job.period}`;

    // Keep the role + company + first two bullets together on one page.
    const headH =
      measure(job.role, 10.2, BOLD, CONTENT_W) +
      measure(companyLine, 9.3, BODY, CONTENT_W);
    const firstBullets = job.bullets
      .slice(0, 2)
      .reduce((acc, b) => acc + measure(b, BODY_SIZE, BODY, CONTENT_W - 12) + 2, 0);
    ensure(headH + firstBullets + 12);

    if (i > 0) space(6);
    tagged('H3', () => {
      line(job.role, { size: 10.2, font: BOLD });
    });
    tagged('P', () => {
      line(companyLine, { size: 9.3, font: ITALIC, color: INK_SOFT, gap: HEADER_GAP });
    });
    job.bullets.forEach(bullet);
  });

  // --- selected projects ----------------------------------------------------

  heading(data.sections.projects);
  data.projects.forEach(bullet);
  space(2);
  tagged('P', () => {
    line(data.projectsNote, {
      size: 9,
      font: ITALIC,
      color: INK_SOFT,
      link: CONTACT.portfolioHref,
    });
  });

  // --- education ------------------------------------------------------------

  heading(data.sections.education);
  data.education.forEach(([degree, school, period], i) => {
    const h =
      measure(degree, 9.8, BOLD, CONTENT_W) +
      measure(`${school} | ${period}`, 9.3, BODY, CONTENT_W);
    ensure(h + 8);
    if (i > 0) space(4);
    tagged('H3', () => {
      line(degree, { size: 9.8, font: BOLD });
    });
    tagged('P', () => {
      line(`${school} | ${period}`, {
        size: 9.3,
        font: ITALIC,
        color: INK_SOFT,
      });
    });
  });

  // --- certifications -------------------------------------------------------

  heading(data.sections.certifications);
  data.certifications.forEach(bullet);
  space(2);
  tagged('P', () => {
    line(data.certificationsNote, {
      size: 9,
      font: ITALIC,
      color: INK_SOFT,
      link: CONTACT.portfolioHref,
    });
  });

  return doc;
}

function write(data, fileName) {
  return new Promise((resolve, reject) => {
    const target = path.join(OUT_DIR, fileName);
    const doc = build(data);
    const stream = fs.createWriteStream(target);
    stream.on('finish', () => resolve(target));
    stream.on('error', reject);
    doc.pipe(stream);
    doc.end();
  });
}

async function main() {
  const written = [];
  written.push(await write(en, en.fileName));
  written.push(await write(es, es.fileName));

  // Legacy filenames: anyone holding an old link gets the corrected CV
  // instead of a 404 or the broken original.
  const legacy = [
    [en.fileName, 'EmiGarciaFuenzalida2026English.pdf'],
    [es.fileName, 'EmiGarciaFuenzalida2026.pdf'],
  ];
  for (const [from, to] of legacy) {
    fs.copyFileSync(path.join(OUT_DIR, from), path.join(OUT_DIR, to));
    written.push(path.join(OUT_DIR, to));
  }

  for (const f of written) {
    const kb = (fs.statSync(f).size / 1024).toFixed(1);
    console.log(`  ${path.basename(f).padEnd(52)} ${kb} KB`);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
