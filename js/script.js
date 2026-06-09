// ── script.js – general utilities across all pages ────────────────────────

document.addEventListener('DOMContentLoaded', () => {

  // ── 1. Auto-update copyright year ────────────────────────────────────────
  const yearEl = document.querySelector('.footer-year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // ── 2. Smooth-scroll for in-page anchor links ────────────────────────────
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', e => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // ── 3. Project tag filter (used on projects.html) ────────────────────────
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  if (filterBtns.length && projectCards.length) {
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        // Update active button
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const filter = btn.dataset.filter;

        projectCards.forEach(card => {
          const tags = card.dataset.tags || '';
          const show = filter === 'all' || tags.includes(filter);
          card.style.opacity    = show ? '1' : '0.2';
          card.style.transform  = show ? 'scale(1)' : 'scale(0.95)';
          card.style.pointerEvents = show ? '' : 'none';
        });
      });
    });
  }

  // ── 4. Cert lightbox (used on certifications.html) ───────────────────────
  document.querySelectorAll('.cert-card img').forEach(img => {
    img.style.cursor = 'zoom-in';
    img.addEventListener('click', () => {
      const overlay = document.createElement('div');
      overlay.className = 'lightbox-overlay';
      overlay.innerHTML = `<img src="${img.src}" alt="${img.alt}" class="lightbox-img">`;
      document.body.appendChild(overlay);

      overlay.addEventListener('click', () => overlay.remove());

      // Keyboard close
      const closeOnKey = (e) => {
        if (e.key === 'Escape') { overlay.remove(); document.removeEventListener('keydown', closeOnKey); }
      };
      document.addEventListener('keydown', closeOnKey);
    });
  });

});
