import { describe, it, expect } from 'vitest';
import { render, screen, within } from '@testing-library/react';
import { HeroSpotlight } from '@/components/landing/HeroSpotlight';
import { ContactSectionV2 } from '@/components/landing/ContactSectionV2';
import { LanguageProvider } from '@/contexts/LanguageContext';
import { socialLinks } from '@/data/socials';
import { CV_HREF } from '@/data/cv';

const renderWithLanguage = (ui: React.ReactElement) =>
  render(<LanguageProvider>{ui}</LanguageProvider>);

describe('hero', () => {
  it('keeps the visible greeting', () => {
    renderWithLanguage(<HeroSpotlight />);
    // BlurText animates one span per word, so textContent has no spaces.
    const text = screen
      .getByRole('heading', { level: 1 })
      .textContent?.replace(/\s+/g, '');
    expect(text).toContain("Hi,i'mEmi");
  });

  it('names the person and the role inside the h1, for crawlers', () => {
    renderWithLanguage(<HeroSpotlight />);
    const h1 = screen.getByRole('heading', { level: 1 });
    expect(h1.textContent).toContain('Emiliano García Fuenzalida');
    expect(h1.textContent).toContain('UX/UI & Product Designer');
  });

  it('shows every social profile', () => {
    renderWithLanguage(<HeroSpotlight />);
    for (const social of socialLinks) {
      const link = screen.getByRole('link', { name: social.name });
      expect(link).toHaveAttribute('href', social.href);
      expect(link).toHaveAttribute('target', '_blank');
      expect(link).toHaveAttribute('rel', expect.stringContaining('noopener'));
    }
  });
});

describe('contact footer', () => {
  it('shows the same social profiles as the hero', () => {
    renderWithLanguage(<ContactSectionV2 />);
    for (const social of socialLinks) {
      expect(screen.getByRole('link', { name: social.name })).toHaveAttribute(
        'href',
        social.href
      );
    }
  });

  it('links the CV at its generated filename', () => {
    const { container } = renderWithLanguage(<ContactSectionV2 />);
    const cv = within(container).getByText(/download cv|descargar cv/i)
      .closest('a');
    expect(cv).toHaveAttribute('href', CV_HREF.en);
  });
});
