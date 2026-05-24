/**
 * filter.js — Filtre de projets
 * - Filtre par catégorie (data-category)
 * - Met à jour aria-pressed pour accessibilité
 * - Animation de disparition/apparition
 */

(function () {
  'use strict';

  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  if (!filterBtns.length || !projectCards.length) return;

  // ── Filtre les cartes ──
  function filterProjects(activeFilter) {
    projectCards.forEach((card) => {
      const categories = card.getAttribute('data-category') || '';
      const isVisible = activeFilter === 'all' || categories.includes(activeFilter);

      if (isVisible) {
        card.removeAttribute('data-hidden');
        card.style.animation = 'fadeUp 0.4s ease forwards';
      } else {
        card.setAttribute('data-hidden', 'true');
      }
    });
  }

  // ── Met à jour les boutons ──
  function setActiveButton(activeBtn) {
    filterBtns.forEach((btn) => {
      const isActive = btn === activeBtn;
      btn.classList.toggle('filter-btn--active', isActive);
      btn.setAttribute('aria-pressed', String(isActive));
    });
  }

  // ── Écouteurs ──
  filterBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      const filter = btn.getAttribute('data-filter');
      setActiveButton(btn);
      filterProjects(filter);
    });

    // Navigation clavier (flèches)
    btn.addEventListener('keydown', (e) => {
      const btnsArray = [...filterBtns];
      const idx = btnsArray.indexOf(btn);

      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        e.preventDefault();
        btnsArray[(idx + 1) % btnsArray.length].focus();
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        e.preventDefault();
        btnsArray[(idx - 1 + btnsArray.length) % btnsArray.length].focus();
      }
    });
  });

  // ── Init : filtre "all" actif ──
  filterProjects('all');
})();