import { $ } from '../utils/dom-helpers.js';

export function initModals() {
  document.querySelectorAll('[data-modal]').forEach(trigger => {
    trigger.addEventListener('click', e => {
      e.preventDefault();
      const id = trigger.getAttribute('data-modal');
      const overlay = $(`#${id}`);
      if (overlay) openModal(overlay);
    });
  });

  document.querySelectorAll('.modal-overlay').forEach(overlay => {
    overlay.addEventListener('click', e => {
      if (e.target === overlay) closeModal(overlay);
    });

    const closeBtn = overlay.querySelector('.modal__close');
    if (closeBtn) {
      closeBtn.addEventListener('click', () => closeModal(overlay));
    }
  });

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
      const active = document.querySelector('.modal-overlay.is-active');
      if (active) closeModal(active);
    }
  });
}

function openModal(overlay) {
  overlay.classList.add('is-active');
  document.body.style.overflow = 'hidden';
}

function closeModal(overlay) {
  overlay.classList.remove('is-active');
  document.body.style.overflow = '';
}
