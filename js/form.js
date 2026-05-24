/**
 * form.js — Validation du formulaire de contact
 * - Validation en temps réel
 * - Messages d'erreur accessibles (aria-live)
 * - Simulation d'envoi (à remplacer par Formspree ou EmailJS)
 */

(function () {
  'use strict';

  const submitBtn = document.getElementById('submit-btn');
  const formSuccess = document.getElementById('form-success');

  if (!submitBtn) return;

  const fields = {
    name: { el: document.getElementById('name'), errorEl: document.getElementById('name-error') },
    email: { el: document.getElementById('email'), errorEl: document.getElementById('email-error') },
    message: { el: document.getElementById('message'), errorEl: document.getElementById('message-error') },
  };

  // ── Règles de validation ──
  const validators = {
    name: (val) => {
      if (!val.trim()) return 'Le nom est requis.';
      if (val.trim().length < 2) return 'Le nom doit contenir au moins 2 caractères.';
      return null;
    },
    email: (val) => {
      if (!val.trim()) return "L'email est requis.";
      // Regex simple et efficace
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val)) return "L'adresse email n'est pas valide.";
      return null;
    },
    message: (val) => {
      if (!val.trim()) return 'Le message est requis.';
      if (val.trim().length < 10) return 'Le message doit contenir au moins 10 caractères.';
      return null;
    },
  };

  // ── Affiche / efface une erreur ──
  function showError(fieldName, message) {
    const { el, errorEl } = fields[fieldName];
    el.classList.toggle('error', !!message);
    el.classList.toggle('success', !message && el.value.trim() !== '');
    errorEl.textContent = message || '';
  }

  // ── Valide un champ ──
  function validateField(fieldName) {
    const val = fields[fieldName].el.value;
    const error = validators[fieldName](val);
    showError(fieldName, error);
    return !error;
  }

  // ── Validation en temps réel (blur) ──
  Object.keys(fields).forEach((name) => {
    const { el } = fields[name];
    el.addEventListener('blur', () => validateField(name));
    el.addEventListener('input', () => {
      // N'efface l'erreur que si elle était déjà affichée
      if (el.classList.contains('error')) validateField(name);
    });
  });

  // ── Soumission ──
  submitBtn.addEventListener('click', async () => {
    // Valide tous les champs
    const isValid = Object.keys(fields).map(validateField).every(Boolean);
    if (!isValid) {
      // Focus sur le premier champ en erreur
      const firstError = Object.keys(fields).find(
        (name) => fields[name].el.classList.contains('error')
      );
      if (firstError) fields[firstError].el.focus();
      return;
    }

    // ── Désactive le bouton pendant l'envoi ──
    submitBtn.disabled = true;
    submitBtn.textContent = 'Envoi en cours…';

    try {
      /* ─── À REMPLACER ───────────────────────────────────────────────
         Option 1 — Formspree (gratuit, sans backend) :
         const res = await fetch('https://formspree.io/f/XXXXXXXX', {
           method: 'POST',
           headers: { 'Accept': 'application/json' },
           body: new FormData(document.getElementById('contact-form')),
         });
         if (!res.ok) throw new Error('Erreur réseau');

         Option 2 — EmailJS :
         await emailjs.send('SERVICE_ID', 'TEMPLATE_ID', {
           name: fields.name.el.value,
           email: fields.email.el.value,
           message: fields.message.el.value,
         });
      ────────────────────────────────────────────────────────────────── */

      // Simulation d'appel réseau (2 secondes)
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Succès
      Object.keys(fields).forEach((name) => {
        fields[name].el.value = '';
        fields[name].el.classList.remove('success', 'error');
      });
      formSuccess.hidden = false;
      formSuccess.scrollIntoView({ behavior: 'smooth', block: 'nearest' });

    } catch (err) {
      // Erreur réseau
      showError('message', 'Une erreur est survenue. Merci de réessayer ou de me contacter directement par email.');
      console.error('Erreur formulaire :', err);

    } finally {
      submitBtn.disabled = false;
      submitBtn.textContent = 'Envoyer le message';
    }
  });
})();
