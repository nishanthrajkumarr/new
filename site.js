// Short demo clips play only while on screen, and never for people who prefer reduced motion.
(() => {
  const clips = document.querySelectorAll('video[data-loop]');
  if (!clips.length) return;
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduce) { clips.forEach(v => { v.controls = true; }); return; }
  if (!('IntersectionObserver' in window)) { clips.forEach(v => { v.autoplay = true; v.play().catch(() => {}); }); return; }
  const io = new IntersectionObserver(entries => {
    for (const e of entries) {
      const v = e.target;
      if (e.isIntersecting) { v.play().catch(() => { v.controls = true; }); }
      else if (!v.paused) v.pause();
    }
  }, { rootMargin: '200px 0px', threshold: 0.01 });
  clips.forEach(v => { v.muted = true; io.observe(v); });
})();
