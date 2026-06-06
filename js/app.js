import { initNavbar } from './modules/navbar.js';
import { initAnimations } from './modules/animations.js';
import { initSmoothScroll } from './modules/smooth-scroll.js';
import { initModeSwitcher } from './modules/mode-switcher.js';
import { initThemeSwitcher } from './modules/theme-switcher.js';
import { initDashboardCarousel } from './modules/dashboard-carousel.js';
import { $$ } from './utils/dom-helpers.js';

document.addEventListener('DOMContentLoaded', () => {
  initThemeSwitcher();
  initNavbar();
  initAnimations();
  initSmoothScroll();
  initModeSwitcher();
  initDashboardCarousel();
  initRippleEffect();
});

function initRippleEffect() {
  $$('.btn').forEach(btn => {
    btn.addEventListener('click', function (e) {
      const existingRipple = this.querySelector('.btn-ripple');
      if (existingRipple) existingRipple.remove();

      const ripple = document.createElement('span');
      ripple.className = 'btn-ripple';

      const rect = this.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      const x = e.clientX - rect.left - size / 2;
      const y = e.clientY - rect.top - size / 2;

      ripple.style.width = ripple.style.height = `${size}px`;
      ripple.style.left = `${x}px`;
      ripple.style.top = `${y}px`;

      this.appendChild(ripple);
      ripple.addEventListener('animationend', () => ripple.remove());
    });
  });
}
