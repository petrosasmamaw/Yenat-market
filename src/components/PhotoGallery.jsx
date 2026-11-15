import { useState, useEffect, useRef, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight, Maximize2, X } from 'lucide-react';

const SLIDE_MS = 4500;
const EASE = [0.16, 1, 0.3, 1];
const pad = (n) => String(n).padStart(2, '0');

// Ask Cloudinary for a resized, auto-format/quality version (local images pass through)
const cld = (url, w) => (url.includes('/image/upload/') ? url.replace('/image/upload/', `/image/upload/f_auto,q_auto,w_${w}/`) : url);

/**
 * Portrait-first photo gallery (the shop's photos are all tall phone shots).
 *  · Tablet/desktop — expanding panels: the active photo opens wide, the rest wait as slim strips.
 *  · Phones — one tall photo, swipe left/right, filmstrip underneath.
 *  · Tap the open photo → full-screen viewer (arrows, swipe, Esc).
 * slides: [{ mediaUrl, title, caption }]
 */
export const PhotoGallery = ({ slides, label }) => {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [viewer, setViewer] = useState(false);
  const touchX = useRef(null);
  const total = slides.length;

  const go = useCallback((i) => setActive((i + total) % total), [total]);
  const next = useCallback(() => setActive((a) => (a + 1) % total), [total]);
  const prev = useCallback(() => setActive((a) => (a - 1 + total) % total), [total]);

  // Auto-advance (pauses on hover, touch, or while the viewer is open)
  useEffect(() => {
    if (paused || viewer) return;
    const t = setTimeout(next, SLIDE_MS);
    return () => clearTimeout(t);
  }, [active, paused, viewer, next]);

  // Viewer: keyboard + scroll lock
  useEffect(() => {
    if (!viewer) return;
    const onKey = (e) => {
      if (e.key === 'Escape') setViewer(false);
      if (e.key === 'ArrowRight') next();
      if (e.key === 'ArrowLeft') prev();
    };
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [viewer, next, prev]);

  const onTouchStart = (e) => {
    touchX.current = e.touches[0].clientX;
    setPaused(true);
  };
  const onTouchEnd = (e) => {
    if (touchX.current == null) return;
    const dx = e.changedTouches[0].clientX - touchX.current;
    if (Math.abs(dx) > 40) (dx < 0 ? next : prev)();
    touchX.current = null;
    setPaused(false);
  };

  const slide = slides[active];

  const Progress = () => (
    <span className="absolute inset-x-0 bottom-0 z-20 h-[3px] bg-forest-950/50">
      <span
        key={`${active}-${paused}-${viewer}`}
        className="slide-progress block h-full bg-gold-400"
        style={{ animationDuration: `${SLIDE_MS}ms`, animationPlayState: paused || viewer ? 'paused' : 'running' }}
      />
    </span>
  );

  return (
    <div
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      role="region"
      aria-roledescription="carousel"
      aria-label={label}
    >
      {/* ═════ Tablet & desktop — expanding portrait panels ═════ */}
      <div className="@container hidden h-[520px] gap-2.5 sm:flex lg:h-[620px]">
        {slides.map((s, i) => {
          const on = i === active;
          return (
            <button
              key={s.mediaUrl}
              type="button"
              onClick={() => (on ? setViewer(true) : go(i))}
              aria-label={on ? `Open photo full screen: ${s.title}` : `Show photo ${i + 1}: ${s.title}`}
              aria-current={on}
              style={{ flexGrow: on ? 7 : 1 }}
              className={`group relative min-w-0 basis-0 overflow-hidden rounded-[22px] bg-forest-950 text-left transition-[flex-grow,box-shadow] duration-[800ms] ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none ${
                on ? 'shadow-[0_40px_70px_-40px_rgb(0_0_0/0.9)] ring-1 ring-gold-400/40' : 'ring-1 ring-gold-400/10 hover:ring-gold-400/50'
              }`}
            >
              <img
                src={cld(s.mediaUrl, 1000)}
                loading="lazy"
                alt={on ? s.title : ''}
                draggable={false}
                className={`absolute inset-0 h-full w-full object-cover transition-[filter,opacity] duration-700 ${
                  on ? 'photo-drift' : 'opacity-60 saturate-[0.6] group-hover:opacity-90 group-hover:saturate-100'
                }`}
              />

              {/* closed strip: number */}
              <span
                className={`absolute inset-x-0 bottom-0 flex justify-center bg-gradient-to-t from-forest-950/90 to-transparent pb-4 pt-16 font-display text-[13px] font-semibold tabular-nums text-ink transition-opacity duration-300 ${
                  on ? 'opacity-0' : 'opacity-100'
                }`}
                aria-hidden
              >
                {pad(i + 1)}
              </span>

              {/* open panel: caption + controls */}
              {on && (
                <>
                  <span className="photo-shade absolute inset-0" aria-hidden />
                  <span className="badge badge-glass absolute left-4 top-4 tabular-nums">
                    {pad(active + 1)} <span className="text-gold-300">/ {pad(total)}</span>
                  </span>
                  <span className="icon-btn absolute right-4 top-4 h-10 w-10 group-hover:border-gold-400 group-hover:bg-gold-400 group-hover:text-forest-950" aria-hidden>
                    <Maximize2 className="h-4 w-4" />
                  </span>
                  {/* fixed to the open-panel width so the text never reflows while the panel is still opening */}
                  <span key={active} className="animate-card-switch absolute bottom-0 left-0 block px-6 pb-7 lg:px-7" style={{ width: 'calc((100cqw - 2.5rem) * 7 / 11)' }}>
                    <span className="h-sub block max-w-md">{s.title}</span>
                    <span className="mt-2 block max-w-md text-[14px] leading-relaxed text-body">{s.caption}</span>
                  </span>
                  <Progress />
                </>
              )}
            </button>
          );
        })}
      </div>

      {/* ═════ Phones — one tall photo, swipeable ═════ */}
      <div className="sm:hidden">
        <div className="photo aspect-[4/5]" onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
          {slides.map((s, i) => (
            <img
              key={s.mediaUrl}
              src={cld(s.mediaUrl, 900)}
              alt={i === active ? s.title : ''}
              draggable={false}
              loading={i === 0 ? 'eager' : 'lazy'}
              className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${i === active ? 'opacity-100' : 'opacity-0'}`}
            />
          ))}
          <span className="photo-shade absolute inset-0" aria-hidden />

          <span className="badge badge-glass absolute left-3.5 top-3.5 tabular-nums">
            {pad(active + 1)} <span className="text-gold-300">/ {pad(total)}</span>
          </span>
          <button type="button" onClick={() => setViewer(true)} className="icon-btn absolute right-3.5 top-3.5 h-10 w-10" aria-label="Open photo full screen">
            <Maximize2 className="h-4 w-4" />
          </button>

          <div key={active} className="animate-card-switch absolute inset-x-0 bottom-0 px-5 pb-6">
            <p className="font-display text-[1.25rem] font-semibold leading-tight tracking-[-0.015em] text-ink">{slide.title}</p>
            <p className="mt-1.5 line-clamp-3 text-[13.5px] leading-relaxed text-body">{slide.caption}</p>
          </div>
          <Progress />
        </div>

        {/* Filmstrip */}
        <div className="mt-3 grid grid-cols-5 gap-2">
          {slides.map((s, i) => (
            <button
              key={s.mediaUrl}
              type="button"
              onClick={() => go(i)}
              aria-label={`Show photo ${i + 1}: ${s.title}`}
              aria-current={i === active}
              className={`relative aspect-[3/4] overflow-hidden rounded-xl transition-all duration-300 ${
                i === active ? 'ring-2 ring-gold-400 ring-offset-2 ring-offset-forest-800' : 'opacity-50'
              }`}
            >
              <img src={cld(s.mediaUrl, 240)} alt="" className="h-full w-full object-cover" loading="lazy" />
            </button>
          ))}
        </div>
      </div>

      {/* ═════ Full-screen viewer ═════ */}
      {createPortal(
        <AnimatePresence>
          {viewer && (
            <motion.div
              className="theme-dark fixed inset-0 z-[60] flex flex-col bg-forest-950/96 backdrop-blur-md"
              role="dialog"
              aria-modal="true"
              aria-label={slide.title}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={() => setViewer(false)}
            >
              <div className="flex shrink-0 items-center justify-between px-4 py-3 sm:px-6 sm:py-4">
                <span className="badge badge-glass tabular-nums">
                  {pad(active + 1)} <span className="text-gold-300">/ {pad(total)}</span>
                </span>
                <button type="button" onClick={() => setViewer(false)} className="icon-btn" aria-label="Close photo viewer">
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div
                className="relative flex min-h-0 flex-1 items-center justify-center px-3 sm:px-20"
                onTouchStart={onTouchStart}
                onTouchEnd={onTouchEnd}
              >
                <AnimatePresence mode="wait">
                  <motion.img
                    key={slide.mediaUrl}
                    src={cld(slide.mediaUrl, 1600)}
                    alt={slide.title}
                    draggable={false}
                    onClick={(e) => e.stopPropagation()}
                    className="max-h-full max-w-full rounded-2xl object-contain shadow-[0_40px_80px_-30px_rgb(0_0_0/0.9)] ring-1 ring-gold-400/25"
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    transition={{ duration: 0.35, ease: EASE }}
                  />
                </AnimatePresence>

                {[
                  { fn: prev, Icon: ChevronLeft, label: 'Previous photo', pos: 'left-3 sm:left-6' },
                  { fn: next, Icon: ChevronRight, label: 'Next photo', pos: 'right-3 sm:right-6' },
                ].map(({ fn, Icon, label: l, pos }) => (
                  <button
                    key={l}
                    type="button"
                    onClick={(e) => { e.stopPropagation(); fn(); }}
                    aria-label={l}
                    className={`icon-btn absolute top-1/2 -translate-y-1/2 ${pos}`}
                  >
                    <Icon className="h-5 w-5" />
                  </button>
                ))}
              </div>

              <div className="shrink-0 px-5 pb-[max(1.25rem,env(safe-area-inset-bottom))] pt-4 text-center" onClick={(e) => e.stopPropagation()}>
                <p className="font-display text-[1.1rem] font-semibold leading-tight text-ink sm:text-[1.35rem]">{slide.title}</p>
                <p className="mx-auto mt-1.5 max-w-2xl text-[13.5px] leading-relaxed text-body sm:text-[15px]">{slide.caption}</p>
                <div className="mt-4 flex justify-center gap-2">
                  {slides.map((s, i) => (
                    <button
                      key={s.mediaUrl}
                      type="button"
                      onClick={() => go(i)}
                      aria-label={`Show photo ${i + 1}`}
                      aria-current={i === active}
                      className={`h-14 w-11 overflow-hidden rounded-lg transition-all duration-300 ${
                        i === active ? 'ring-2 ring-gold-400 ring-offset-2 ring-offset-forest-950' : 'opacity-45 hover:opacity-100'
                      }`}
                    >
                      <img src={cld(s.mediaUrl, 240)} alt="" className="h-full w-full object-cover" />
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </div>
  );
};
