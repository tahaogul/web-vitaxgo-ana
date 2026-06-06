/**
 * VitaxGo — Carousel Module
 * Auto-scrolling partner logos with pause on hover.
 * Uses CSS animation with JS fallback.
 */

import { $ } from '../utils/dom-helpers.js';

export function initCarousel() {
  const carousel = $('.partners__carousel');
  if (!carousel) return;

  const track = $('.partners__track', carousel);
  if (!track) return;

  // Clone children for seamless infinite loop
  const children = [...track.children];
  children.forEach(child => {
    const clone = child.cloneNode(true);
    clone.setAttribute('aria-hidden', 'true');
    track.appendChild(clone);
  });

  // Pause on hover
  carousel.addEventListener('mouseenter', () => {
    track.style.animationPlayState = 'paused';
  });

  carousel.addEventListener('mouseleave', () => {
    track.style.animationPlayState = 'running';
  });
}
