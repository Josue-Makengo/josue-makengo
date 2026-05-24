/**
 * nav.js — Navigation
 * - Burger menu mobile
 * - Header ombre au scroll
 * - Lien actif selon section visible
 */

(function () {
  'use strict';

  const header = document.querySelector('.header');
  const burger = document.querySelector('.nav__burger');
  const menu = document.querySelector('.nav__menu');
  const navLinks = document.querySelectorAll('.nav__link');
  const yearSpan = document.getElementById('year');

  // ── Année auto dans le footer ──
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }

  // ── Header : ombre au scroll ──
  function onScroll() {
    header.classList.toggle('scrolled', window.scrollY > 40);
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll(); // Initialise au chargement

  // ── Burger menu ──
  function toggleMenu(open) {
    menu.classList.toggle('open', open);
    burger.classList.toggle('open', open);
    burger.setAttribute('aria-expanded', String(open));
    burger.setAttribute('aria-label', open ? 'Fermer le menu' : 'Ouvrir le menu');
    // Empêche le scroll body quand menu ouvert
    document.body.style.overflow = open ? 'hidden' : '';
  }

  burger.addEventListener('click', () => {
    const isOpen = menu.classList.contains('open');
    toggleMenu(!isOpen);
  });

  // Ferme le menu en cliquant sur un lien
  navLinks.forEach((link) => {
    link.addEventListener('click', () => toggleMenu(false));
  });

  // Ferme avec Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && menu.classList.contains('open')) {
      toggleMenu(false);
      burger.focus();
    }
  });

  // ── Lien actif au scroll (IntersectionObserver) ──
  const sections = document.querySelectorAll('main section[id]');

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.id;
          navLinks.forEach((link) => {
            const isActive = link.getAttribute('href') === `#${id}`;
            link.classList.toggle('active', isActive);
            link.setAttribute('aria-current', isActive ? 'true' : 'false');
          });
        }
      });
    },
    {
      rootMargin: '-40% 0px -55% 0px', // Déclenche quand la section est au centre de l'écran
    }
  );

  sections.forEach((section) => observer.observe(section));
})();
