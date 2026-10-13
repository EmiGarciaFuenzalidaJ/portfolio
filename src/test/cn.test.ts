import { describe, it, expect } from 'vitest';
import { cn } from '@/lib/utils';

describe('cn', () => {
  it('keeps a custom font size next to a text colour', () => {
    // Without the extended config tailwind-merge treated `text-label` as a
    // colour and dropped it in favour of `text-white/55`.
    expect(cn('text-label', 'text-white/55')).toBe('text-label text-white/55');
    expect(cn('text-white', 'text-h3')).toBe('text-white text-h3');
  });

  it('still lets a later size override an earlier one', () => {
    expect(cn('text-label', 'text-h3')).toBe('text-h3');
  });
});
