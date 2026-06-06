/**
 * VitaxGo — DOM Helper Utilities
 * Shorthand selectors and element creation helpers.
 */

/** Select a single element */
export const $ = (selector, parent = document) => parent.querySelector(selector);

/** Select all matching elements */
export const $$ = (selector, parent = document) => [...parent.querySelectorAll(selector)];

/** Create an element with attributes */
export function createElement(tag, attrs = {}, children = []) {
  const el = document.createElement(tag);
  
  Object.entries(attrs).forEach(([key, value]) => {
    if (key === 'class' || key === 'className') {
      el.className = value;
    } else if (key === 'style' && typeof value === 'object') {
      Object.assign(el.style, value);
    } else if (key.startsWith('on') && typeof value === 'function') {
      el.addEventListener(key.slice(2).toLowerCase(), value);
    } else if (key === 'dataset' && typeof value === 'object') {
      Object.entries(value).forEach(([k, v]) => (el.dataset[k] = v));
    } else {
      el.setAttribute(key, value);
    }
  });

  children.forEach(child => {
    if (typeof child === 'string') {
      el.appendChild(document.createTextNode(child));
    } else if (child instanceof Node) {
      el.appendChild(child);
    }
  });

  return el;
}

/**
 * Event delegation: listen on a parent, match a child selector.
 */
export function delegate(parent, eventType, selector, handler) {
  const el = typeof parent === 'string' ? $(parent) : parent;
  if (!el) return;

  el.addEventListener(eventType, (e) => {
    const target = e.target.closest(selector);
    if (target && el.contains(target)) {
      handler.call(target, e, target);
    }
  });
}
