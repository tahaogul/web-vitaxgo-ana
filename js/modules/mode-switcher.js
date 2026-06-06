import { $, $$ } from '../utils/dom-helpers.js';

export function initModeSwitcher() {
  const modeLinks = $$('[data-mode-switch]');
  if (!modeLinks.length) return;

  const stored = localStorage.getItem('vitaxgo-mode');
  if (stored === 'bireysel') {
    switchMode('bireysel');
  }

  modeLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const mode = link.getAttribute('data-mode-switch');
      switchMode(mode);
    });
  });
}

function switchMode(mode) {
  document.body.setAttribute('data-mode', mode);
  localStorage.setItem('vitaxgo-mode', mode);

  $$('[data-mode-switch]').forEach(link => {
    const isActive = link.getAttribute('data-mode-switch') === mode;

    if (link.classList.contains('navbar__link')) {
      link.classList.toggle('navbar__link--active', isActive);
    }
    if (link.classList.contains('navbar__mobile-link')) {
      link.classList.toggle('navbar__mobile-link--active', isActive);
    }
  });

  window.scrollTo({ top: 0, behavior: 'smooth' });
}
