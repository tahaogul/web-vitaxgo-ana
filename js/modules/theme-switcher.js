export function initThemeSwitcher() {
  const saved = localStorage.getItem('vg_theme');
  if (saved) {
    document.documentElement.setAttribute('data-theme', saved);
  }

  function toggleTheme() {
    const current = document.documentElement.getAttribute('data-theme');
    const isDark = current === 'dark' ||
      (!current && window.matchMedia('(prefers-color-scheme: dark)').matches);

    const next = isDark ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem('vg_theme', next);
  }

  document.querySelectorAll('#themeToggle, #themeToggleMobile').forEach(btn => {
    btn.addEventListener('click', toggleTheme);
  });
}
