import { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowUpRight, Menu, X } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { cn } from '@/lib/utils';
import profileImage from '@/assets/Profile.jpeg';
import { T } from './motion';

const navItems = [
  { key: 'nav.services', href: '#services' },
  { key: 'nav.projects', href: '#projects' },
  { key: 'nav.experience', href: '#experience' },
  { key: 'nav.courses', href: '#courses' },
  { key: 'nav.portfolio', href: '#visual-work' },
];

/** Floating liquid-glass pill navbar: logo · links · EN/ES · "Say hi". */
export const Navbar: React.FC = () => {
  const { t, language, setLanguage } = useLanguage();
  const [menuOpen, setMenuOpen] = useState(false);

  const LangToggle = () => (
    <div className="flex items-center gap-1.5 px-2 text-sm font-medium lg:text-base">
      <button
        onClick={() => setLanguage('en')}
        className={cn(
          'transition-colors duration-200',
          language === 'en' ? 'text-[#89AACC]' : 'text-white/55 hover:text-white'
        )}
      >
        EN
      </button>
      <span aria-hidden="true" className="text-white/45">/</span>
      <button
        onClick={() => setLanguage('es')}
        className={cn(
          'transition-colors duration-200',
          language === 'es' ? 'text-[#89AACC]' : 'text-white/55 hover:text-white'
        )}
      >
        ES
      </button>
    </div>
  );
  const reduce = useReducedMotion();

  return (
    <>
      <motion.nav
        className="pointer-events-none fixed top-4 left-0 right-0 z-50 flex justify-center px-4"
        initial={reduce ? { opacity: 0 } : { opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ ...T.base, delay: 0.2 }}
      >
        <div className="liquid-glass pointer-events-auto inline-flex items-center rounded-full px-2.5 py-2.5 backdrop-blur-md">
          {/* Logo */}
          <a href="#hero" className="group relative mx-1 block h-11 w-11 rounded-full" aria-label="Home">
            <span className="accent-gradient absolute inset-0 rounded-full" aria-hidden="true" />
            <span className="absolute inset-[2px] overflow-hidden rounded-full bg-black">
              <img
                src={profileImage}
                alt="Emi García Fuenzalida"
                className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
              />
            </span>
          </a>

          <span className="mx-1.5 hidden h-6 w-px bg-white/15 md:block" />

          {/* Desktop links */}
          <div className="hidden items-center md:flex">
            {navItems.map((item) => (
              <a
                key={item.key}
                href={item.href}
                className="whitespace-nowrap rounded-full px-4 py-2 text-sm font-medium text-white/60 transition-colors duration-200 hover:bg-white/10 hover:text-white lg:text-base"
              >
                {t(item.key)}
              </a>
            ))}
          </div>

          <span className="mx-1.5 hidden h-6 w-px bg-white/15 md:block" />

          <LangToggle />

          {/* Say hi CTA */}
          <a href="#contact" className="group relative ml-1.5 hidden rounded-full sm:block">
            <span className="gradient-ring opacity-0 transition-opacity duration-300 group-hover:opacity-100" aria-hidden="true" />
            <span className="relative z-10 inline-flex items-center gap-1.5 whitespace-nowrap rounded-full bg-white px-5 py-2 text-sm font-medium text-black lg:text-base">
              {t('landing.sayHi')}
              <ArrowUpRight className="h-4 w-4" />
            </span>
          </a>

          {/* Mobile menu button */}
          <button
            onClick={() => setMenuOpen((o) => !o)}
            className="ml-1 flex h-11 w-11 items-center justify-center rounded-full text-white/80 transition-colors hover:bg-white/10 md:hidden"
            aria-label="Toggle menu"
          >
            {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile sheet */}
      <div
        className={cn(
          'fixed inset-0 z-40 md:hidden transition-opacity duration-300',
          menuOpen ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'
        )}
      >
        <div className="absolute inset-0 bg-black/85 backdrop-blur-sm" onClick={() => setMenuOpen(false)} />
        <nav className="liquid-glass absolute left-4 right-4 top-20 rounded-3xl bg-black/80 p-4">
          <ul className="space-y-1">
            {navItems.map((item) => (
              <li key={item.key}>
                <a
                  href={item.href}
                  onClick={() => setMenuOpen(false)}
                  className="block rounded-2xl px-4 py-3 text-base font-medium text-white/80 transition-colors hover:bg-white/10 hover:text-white"
                >
                  {t(item.key)}
                </a>
              </li>
            ))}
            <li>
              <a
                href="#contact"
                onClick={() => setMenuOpen(false)}
                className="mt-1 flex items-center gap-1.5 rounded-2xl bg-white px-4 py-3 text-base font-medium text-black"
              >
                {t('landing.sayHi')}
                <ArrowUpRight className="h-4 w-4" />
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </>
  );
};
