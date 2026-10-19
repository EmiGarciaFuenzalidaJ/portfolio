import { useId } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { T } from './motion';
import { cn } from '@/lib/utils';

interface IndexRowProps {
  open: boolean;
  onToggle: () => void;
  /** The always-visible part of the row. */
  header: React.ReactNode;
  /** Revealed when the row is open. */
  children: React.ReactNode;
  className?: string;
  /** Extra classes for the header button (grid templates live here). */
  headerClassName?: string;
  onPointerEnter?: (e: React.PointerEvent) => void;
  onPointerMove?: (e: React.PointerEvent) => void;
  onPointerLeave?: () => void;
}

/**
 * One row of an index list that opens in place.
 *
 * The page was long because every role, course and service showed all of
 * its detail at once. Award-winning portfolios (Lama Lama, Signal-A) keep
 * lists to one quiet line per item and reveal the rest on demand — the
 * content is all still there, one click away, and the page reads as a
 * structured index instead of a wall.
 */
export const IndexRow: React.FC<IndexRowProps> = ({
  open,
  onToggle,
  header,
  children,
  className,
  headerClassName,
  onPointerEnter,
  onPointerMove,
  onPointerLeave,
}) => {
  const reduce = useReducedMotion();
  const panelId = useId();

  return (
    <div className={cn('border-t border-white/10', className)}>
      <button
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={onToggle}
        onPointerEnter={onPointerEnter}
        onPointerMove={onPointerMove}
        onPointerLeave={onPointerLeave}
        className={cn(
          'group flex w-full items-start gap-4 py-5 text-left transition-colors duration-300 hover:bg-white/[0.02]',
          headerClassName
        )}
      >
        <div className="min-w-0 flex-1">{header}</div>
        <span
          aria-hidden="true"
          className={cn(
            'mt-0.5 flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full border font-mono text-sm leading-none transition-all duration-300',
            open
              ? 'rotate-45 border-white/60 text-white'
              : 'border-white/20 text-white/60 group-hover:border-white/50 group-hover:text-white'
          )}
        >
          +
        </span>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id={panelId}
            role="region"
            initial={reduce ? false : { height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={reduce ? { opacity: 0 } : { height: 0, opacity: 0 }}
            transition={T.base}
            className="overflow-hidden"
          >
            <div className="pb-6">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
