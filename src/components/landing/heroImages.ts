/**
 * The two hero layers live on Cloudinary as 2752×1536 PNGs (4.8 MB each as
 * uploaded). Requesting them through a transformation URL makes Cloudinary
 * resize and re-encode them (WebP/AVIF, chosen from the Accept header): about
 * 200 KB at 1920w instead of 4.8 MB.
 *
 * index.html preloads the same candidates. Its `imagesrcset` / `imagesizes`
 * must describe the same widths and sizes as this file, or the browser
 * downloads the hero twice.
 */
const CLOUD = 'https://res.cloudinary.com/drkpykb3l/image/upload';
const WIDTHS = [1280, 1920, 2752];

const variant = (file: string, width: number) => `${CLOUD}/f_auto,q_auto,c_limit,w_${width}/${file}`;

export interface HeroLayer {
  src: string;
  srcSet: string;
}

const layer = (file: string): HeroLayer => ({
  src: variant(file, 1920),
  srcSet: WIDTHS.map((w) => `${variant(file, w)} ${w}w`).join(', '),
});

/**
 * The image is drawn "cover" in a full-height section, so an upright phone
 * shows it much wider than its own viewport: 100vw would pick a file too small.
 */
export const HERO_SIZES = '(max-aspect-ratio: 177/100) 177vh, 100vw';

export const HERO_BASE = layer('v1784206503/magnific_necesito-que-saques-el-ci_kLFpV3O16B_1_txhw7u.png');
export const HERO_REVEAL = layer('v1784206503/magnific_necesito-que-hagas-una-ve_XtV4GMOBfo_1_p0ljao.png');

let ready: Promise<void> | null = null;

/** Resolves once both layers have loaded (or failed). The loader waits on it. */
export const heroReady = (): Promise<void> => {
  if (ready) return ready;
  if (typeof window === 'undefined') return Promise.resolve();
  ready = Promise.all(
    [HERO_BASE, HERO_REVEAL].map(
      (l) =>
        new Promise<void>((resolve) => {
          const img = new Image();
          img.onload = () => resolve();
          img.onerror = () => resolve();
          img.sizes = HERO_SIZES;
          img.srcset = l.srcSet;
          img.src = l.src;
        }),
    ),
  ).then(() => undefined);
  return ready;
};
