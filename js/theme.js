/**
 * theme.js — Toggle dark / light mode
 * Persiste le choix dans localStorage
 * Respecte prefers-color-scheme au premier chargement
 */

(function () {
  'use strict';

  const STORAGE_KEY = 'portfolio-theme';
  const toggleBtn = document.getElementById('theme-toggle');
  const html = document.documentElement;

  // ── Détermine le thème initial ──
  function getPreferredTheme() {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) return saved;
    return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
  }

  // ── Applique le thème au <html> ──
  function applyTheme(theme) {
    html.setAttribute('data-theme', theme);
    localStorage.setItem(STORAGE_KEY, theme);

    // Met à jour l'aria-label et aria-pressed
    const isLight = theme === 'light';
    toggleBtn.setAttribute('aria-label', isLight ? 'Activer le mode sombre' : 'Activer le mode clair');
    toggleBtn.setAttribute('aria-pressed', String(isLight));
  }

  // ── Initialisation ──
  const initialTheme = getPreferredTheme();
  applyTheme(initialTheme);

  // ── Clic sur le toggle ──
  toggleBtn.addEventListener('click', () => {
    const currentTheme = html.getAttribute('data-theme') || 'dark';
    applyTheme(currentTheme === 'dark' ? 'light' : 'dark');
  });

  // ── Écoute les changements système ──
  window.matchMedia('(prefers-color-scheme: light)').addEventListener('change', (e) => {
    if (!localStorage.getItem(STORAGE_KEY)) {
      applyTheme(e.matches ? 'light' : 'dark');
    }
  });
})();
