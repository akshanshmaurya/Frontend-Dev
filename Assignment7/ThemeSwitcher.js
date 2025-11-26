"use strict";

// Q4 - Theme Switcher using setAttribute and data-theme
const themeButtons = document.querySelectorAll('.theme-btn');
const currentThemeText = document.getElementById('currentTheme');

function setTheme(themeName) {
  // Apply class by using setAttribute on body
  document.body.setAttribute('data-theme', themeName);

  // Save to localStorage for persistence on reload (optional)
  try { localStorage.setItem('site-theme', themeName); } catch(e) {}

  currentThemeText.textContent = themeName;
}

// init from existing attribute or localStorage
(function initTheme() {
  let theme = document.body.getAttribute('data-theme');
  if (!theme) {
    try { theme = localStorage.getItem('site-theme') || 'light'; } catch(e) { theme = 'light' }
    document.body.setAttribute('data-theme', theme);
  }
  currentThemeText.textContent = theme;
})();

// wire buttons
themeButtons.forEach(btn => btn.addEventListener('click', () => setTheme(btn.dataset.theme)));

// accessibility: allow keys
document.addEventListener('keydown', e => { if (e.key === '1') setTheme('light'); if (e.key === '2') setTheme('dark'); if (e.key === '3') setTheme('blue'); });

// exported for tests
if (typeof module !== 'undefined' && module.exports) module.exports = { setTheme };
