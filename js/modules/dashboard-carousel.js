import { $$ } from '../utils/dom-helpers.js';

export function initDashboardCarousel() {
  const carousels = $$('.dashboard__carousel');

  carousels.forEach(carousel => {
    const cards = carousel.querySelector('.dashboard__cards');
    const prev = carousel.querySelector('.dashboard__arrow--prev');
    const next = carousel.querySelector('.dashboard__arrow--next');
    if (!cards || !prev || !next) return;

    const scrollAmount = 260;

    prev.addEventListener('click', () => {
      cards.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
    });

    next.addEventListener('click', () => {
      cards.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    });
  });
}
