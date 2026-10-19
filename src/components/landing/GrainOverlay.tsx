/**
 * A faint, static film grain over the whole page. On large dark surfaces it
 * takes the flat digital edge off and gives the page a printed feel — a
 * small detail that award-winning dark sites lean on.
 *
 * Static on purpose: animated grain repaints every frame on a full-screen
 * layer, which is expensive and distracting. Fixed, non-interactive, and
 * below the navbar so it never dims the controls.
 */
const NOISE =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='180' height='180'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3CfeColorMatrix values='0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0 0 0 0.55 0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")";

export const GrainOverlay: React.FC = () => (
  <div
    aria-hidden="true"
    className="pointer-events-none fixed inset-0 z-40 opacity-[0.07] mix-blend-overlay print:hidden"
    style={{ backgroundImage: NOISE, backgroundSize: '180px 180px' }}
  />
);
