import { useEffect, useRef } from 'react';

const VIDEO_URL =
  'https://res.cloudinary.com/drkpykb3l/video/upload/v1784236347/202607161808_sgu2zt.mp4';

/**
 * Fixed full-page background video driven by scroll — NO autoplay.
 * Scroll position maps linearly onto the video timeline: top of page = first
 * frame, bottom of page = last frame.
 *
 * Smoothness strategy: the scroll target is lerp-smoothed every rAF, and a
 * new seek is only issued once the previous one has finished ('seeked'
 * gating) — queueing seeks while one is in flight is what causes stutter.
 */
export const ScrollVideoBackground: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    const wrapper = wrapperRef.current;
    if (!video || !wrapper) return;

    let duration = 0;
    let target = 0;
    let smoothed = 0;
    let seeking = false;
    let rafId = 0;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const updateTarget = () => {
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      const progress = scrollable > 0 ? Math.min(1, Math.max(0, window.scrollY / scrollable)) : 0;
      if (duration > 0) target = progress * duration;

      // Fade the backdrop in after the hero (~60% of a viewport of scroll).
      const fade = Math.min(1, window.scrollY / (window.innerHeight * 0.6));
      wrapper.style.opacity = String(fade);
    };

    const trySeek = (time: number) => {
      if (seeking) return;
      seeking = true;
      // fastSeek trades precision for speed where supported (Safari/Firefox).
      const v = video as HTMLVideoElement & { fastSeek?: (t: number) => void };
      if (typeof v.fastSeek === 'function') v.fastSeek(time);
      else video.currentTime = time;
    };

    const onSeeked = () => {
      seeking = false;
    };

    const onMetadata = () => {
      // Keep a tiny margin from the very end so the last frame stays valid.
      duration = Math.max(0, video.duration - 0.05);
      video.pause();
      updateTarget();
      smoothed = target;
      trySeek(smoothed);
    };

    const tick = () => {
      if (duration > 0) {
        // Ease toward the scroll target so scrubbing feels fluid.
        smoothed += (target - smoothed) * (reduce ? 1 : 0.09);
        // Only issue a seek when the delta is a visible frame step and the
        // previous seek has completed.
        if (!seeking && Math.abs(video.currentTime - smoothed) > 1 / 30) {
          trySeek(smoothed);
        }
      }
      rafId = requestAnimationFrame(tick);
    };

    const onScroll = () => updateTarget();

    video.addEventListener('loadedmetadata', onMetadata);
    video.addEventListener('seeked', onSeeked);
    if (video.readyState >= 1) onMetadata();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    updateTarget();
    rafId = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(rafId);
      video.removeEventListener('loadedmetadata', onMetadata);
      video.removeEventListener('seeked', onSeeked);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  return (
    <div
      ref={wrapperRef}
      className="pointer-events-none fixed inset-0 z-0"
      style={{ opacity: 0 }}
      aria-hidden="true"
    >
      <video
        ref={videoRef}
        src={VIDEO_URL}
        muted
        playsInline
        preload="auto"
        className="h-full w-full object-cover"
        style={{ willChange: 'contents' }}
      />
      {/* Dark overlays — the video has bright sky/snow, content must stay readable */}
      <div className="absolute inset-0 bg-black/60" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-transparent to-black/70" />
    </div>
  );
};
