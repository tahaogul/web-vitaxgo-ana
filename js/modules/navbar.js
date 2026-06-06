import { $, $$ } from '../utils/dom-helpers.js';
import { throttle } from '../utils/debounce.js';

export function initNavbar() {
  const navbar = $('.navbar');
  if (!navbar) return;

  const toggle = $('.navbar__toggle');
  const mobileMenu = $('.navbar__mobile-menu');
  const overlay = $('.navbar__overlay');
  const mobileLinks = $$('.navbar__mobile-link');

  let isMenuOpen = false;
  const SCROLL_THRESHOLD = 50;

  function handleScroll() {
    const scrollY = window.scrollY;

    if (scrollY > SCROLL_THRESHOLD) {
      navbar.classList.remove('navbar--transparent');
      navbar.classList.add('navbar--scrolled');
    } else {
      navbar.classList.add('navbar--transparent');
      navbar.classList.remove('navbar--scrolled');
    }
  }

  function openMenu() {
    isMenuOpen = true;
    toggle.setAttribute('aria-expanded', 'true');
    mobileMenu.classList.add('is-active');
    overlay.classList.add('is-active');
    navbar.classList.add('menu-open');
    document.body.style.overflow = 'hidden';
  }

  function closeMenu() {
    if (!isMenuOpen) return;
    isMenuOpen = false;
    toggle.setAttribute('aria-expanded', 'false');
    mobileMenu.classList.remove('is-active');
    overlay.classList.remove('is-active');
    navbar.classList.remove('menu-open');
    document.body.style.overflow = '';
  }

  function toggleMenu() {
    if (isMenuOpen) {
      closeMenu();
    } else {
      openMenu();
    }
  }

  window.addEventListener('scroll', throttle(handleScroll, 16), { passive: true });

  if (toggle) {
    toggle.addEventListener('click', toggleMenu);
  }

  if (overlay) {
    overlay.addEventListener('click', closeMenu);
  }

  mobileLinks.forEach(link => {
    link.addEventListener('click', closeMenu);
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeMenu();
  });

  handleScroll();
}
