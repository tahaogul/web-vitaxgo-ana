/**
 * VitaxGo — Counter Animation Module
 * Animates numbers from 0 to target value when they enter the viewport.
 */

import { $$ } from '../utils/dom-helpers.js';

export function initCounters() {
  const counters = $$('[data-counter]');
  if (!counters.length) return;

  // Reduced motion check
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (prefersReducedMotion) {
    counters.forEach(el => {
      el.textContent = el.dataset.counter;
    });
    return;
  }

  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.3,
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  counters.forEach(el => observer.observe(el));
}

function animateCounter(el) {
  const target = parseInt(el.dataset.counter, 10);
  const duration = parseInt(el.dataset.counterDuration, 10) || 2000;
  const suffix = el.dataset.counterSuffix || '';
  const prefix = el.dataset.counterPrefix || '';
  const startTime = performance.now();

  function update(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);

    // easeOutCubic easing
    const eased = 1 - Math.pow(1 - progress, 3);
    const current = Math.round(eased * target);

    el.textContent = `${prefix}${current.toLocaleString('tr-TR')}${suffix}`;

    if (progress < 1) {
      requestAnimationFrame(update);
    }
  }

  requestAnimationFrame(update);
}
