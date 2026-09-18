import { describe, it, expect } from 'vitest';
import fs from 'node:fs';
import path from 'node:path';
import { translations } from '@/contexts/LanguageContext';

/**
 * Guards the translation table against the failure that put raw keys in the
 * navbar: keys were pruned as unused because the scan only looked for
 * `t('literal')`, and the navbar reads `t(item.key)` off a const array.
 *
 * Any string that looks like a translation key anywhere in src has to resolve
 * in both languages, however it reaches `t()`.
 */

const SRC = path.resolve(__dirname, '..');

function walk(dir: string, out: string[] = []): string[] {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(p, out);
    else if (/\.tsx?$/.test(entry.name) && !/\.test\.tsx?$/.test(entry.name)) {
      out.push(p);
    }
  }
  return out;
}

/**
 * Only what Index.tsx actually renders. The v1 components still live under
 * src/components (kept as content history) and reference keys that were
 * retired along with them, so scanning those would demand keys nothing
 * displays. LanguageContext is excluded because it defines keys, not uses them.
 */
const mounted = [
  ...walk(path.join(SRC, 'components', 'landing')),
  ...walk(path.join(SRC, 'pages')),
];

/** Every key referenced, whether through t('x') or through `key: 'x'`. */
function referencedKeys(): Map<string, string[]> {
  const found = new Map<string, string[]>();
  const add = (key: string, file: string) => {
    const at = found.get(key) ?? [];
    at.push(path.basename(file));
    found.set(key, at);
  };

  for (const file of mounted) {
    const src = fs.readFileSync(file, 'utf8');
    for (const m of src.matchAll(/\bt\(\s*'([^']+)'/g)) add(m[1], file);
    // Arrays of nav-style items: { key: 'nav.projects', ... }
    for (const m of src.matchAll(/\bkey:\s*'([a-z][a-zA-Z]*\.[a-zA-Z.]+)'/g)) {
      add(m[1], file);
    }
  }
  return found;
}

const en = translations.en as Record<string, string>;
const es = translations.es as Record<string, string>;

describe('translations', () => {
  it('has the same keys in both languages', () => {
    expect(Object.keys(en).sort()).toEqual(Object.keys(es).sort());
  });

  it('resolves every key the mounted app references', () => {
    const missing: string[] = [];
    for (const [key, files] of referencedKeys()) {
      if (!(key in en)) missing.push(`${key}  (${[...new Set(files)].join(', ')})`);
    }
    expect(missing, `keys referenced but not defined:\n${missing.join('\n')}`).toEqual([]);
  });

  it('leaves no value empty', () => {
    const empty = Object.entries(en)
      .concat(Object.entries(es))
      .filter(([, v]) => !v || !v.trim())
      .map(([k]) => k);
    expect(empty).toEqual([]);
  });

  it('keeps the Spanish from being a truncated copy of the English', () => {
    // Seven service descriptions had silently lost their final clause. A
    // Spanish string dramatically shorter than its English counterpart is the
    // signature of that, so it fails here rather than shipping.
    const suspicious: string[] = [];
    for (const [key, enValue] of Object.entries(en)) {
      const esValue = es[key];
      if (!esValue || enValue.length < 60) continue;
      if (esValue.length < enValue.length * 0.6) {
        suspicious.push(`${key}  EN ${enValue.length} / ES ${esValue.length}`);
      }
    }
    expect(suspicious, `Spanish looks truncated:\n${suspicious.join('\n')}`).toEqual([]);
  });
});
