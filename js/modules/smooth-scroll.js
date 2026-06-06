/**
 * VitaxGo — Smooth Scroll Module
 * Handles anchor link smooth scrolling with navbar offset.
 */

import { $, $$ } from '../utils/dom-helpers.js';

export function initSmoothScroll() {
  const links = $$('a[href^="#"]');
  
  links.forEach(link => {
    link.addEventListener('click', (e) => {
      const targetId = link.getAttribute('href');
      
      // Ignore empty hashes
      if (targetId === '#') return;

      const targetEl = $(targetId);
      if (!targetEl) return;

      e.preventDefault();

      const navbar = $('.navbar');
      const navbarHeight = navbar ? navbar.offsetHeight : 0;
      const targetPosition = targetEl.getBoundingClientRect().top + window.scrollY - navbarHeight - 20;

      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth',
      });

      // Update URL hash without jumping
      history.pushState(null, null, targetId);
    });
  });
}
