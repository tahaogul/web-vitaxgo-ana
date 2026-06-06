/**
 * VitaxGo — Scroll Animations Module
 * Uses Intersection Observer to trigger CSS animations on scroll.
 */

import { $$ } from '../utils/dom-helpers.js';

export function initAnimations() {
  const animatedElements = $$('[data-animate]');

  if (!animatedElements.length) return;

  // Check for reduced motion preference
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (prefersReducedMotion) {
    // Show everything immediately
    animatedElements.forEach(el => el.classList.add('is-visible'));
    return;
  }

  const observerOptions = {
    root: null,
    rootMargin: '0px 0px -80px 0px',
    threshold: 0.1,
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        
        // Unobserve after revealing (one-time animation)
        if (!entry.target.hasAttribute('data-animate-repeat')) {
          observer.unobserve(entry.target);
        }
      } else if (entry.target.hasAttribute('data-animate-repeat')) {
        entry.target.classList.remove('is-visible');
      }
    });
  }, observerOptions);

  animatedElements.forEach(el => observer.observe(el));
}
