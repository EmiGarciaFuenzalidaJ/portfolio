import { clsx, type ClassValue } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";

/**
 * tailwind-merge has to be told about the custom type scale in
 * tailwind.config.ts. Without this it reads `text-label` or `text-h3` as a
 * text *colour*, so `cn('text-label', 'text-white/55')` silently dropped the
 * font size and the label rendered at body size.
 */
const twMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      "font-size": [{ text: ["label", "lead", "h4", "metric", "h3", "h2", "h1", "display"] }],
    },
  },
});

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
