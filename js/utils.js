/**
 * utils.js — Utilitaires globaux
 * - Scroll reveal (IntersectionObserver)
 * - Smooth scroll sur les ancres
 */

(function () {
  'use strict';

  // ── Scroll Reveal ──────────────────────────────────────
  // Ajoute la classe .reveal sur les éléments à animer
  // puis .visible quand ils entrent dans le viewport
  const revealElements = document.querySelectorAll(
    '.project-card, .skill-group, .timeline__item, .about__text, .contact__intro, .contact__form-wrapper'
  );

  if ('IntersectionObserver' in window && revealElements.length) {
    revealElements.forEach((el) => el.classList.add('reveal'));

    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, i) => {
          if (entry.isIntersecting) {
            // Délai progressif pour les éléments en grille
            setTimeout(() => {
              entry.target.classList.add('visible');
            }, i * 80); // 80ms entre chaque élément
            revealObserver.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -40px 0px',
      }
    );

    revealElements.forEach((el) => revealObserver.observe(el));
  }

  // ── Smooth scroll polyfill (ancres internes) ──────────────
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;

      const target = document.querySelector(targetId);
      if (!target) return;

      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });

      // Met à jour l'URL sans rechargement
      history.pushState(null, '', targetId);

      // Focus sur la section pour accessibilité clavier
      target.setAttribute('tabindex', '-1');
      target.focus({ preventScroll: true });
      target.addEventListener('blur', () => target.removeAttribute('tabindex'), { once: true });
    });
  });
})();