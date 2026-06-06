/**
 * VitaxGo — Parallax Module
 * Scroll-based parallax effects using requestAnimationFrame.
 */

import { $$ } from '../utils/dom-helpers.js';

export function initParallax() {
  const elements = $$('[data-parallax]');
  if (!elements.length) return;

  // Respect reduced motion
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion) return;

  let ticking = false;

  function updateParallax() {
    const scrollY = window.scrollY;
    const windowHeight = window.innerHeight;

    elements.forEach(el => {
      const speed = parseFloat(el.dataset.parallax) || 0.3;
      const rect = el.getBoundingClientRect();

      // Only apply when element is in viewport
      if (rect.bottom < 0 || rect.top > windowHeight) return;

      const yOffset = (scrollY - el.offsetTop) * speed;
      el.style.transform = `translate3d(0, ${yOffset}px, 0)`;
    });

    ticking = false;
  }

  function onScroll() {
    if (!ticking) {
      requestAnimationFrame(updateParallax);
      ticking = true;
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true });
}
