// ── Animations: scroll-reveal, typing hero text, stagger children ─────────

document.addEventListener('DOMContentLoaded', () => {

  // ── 1. Scroll-reveal via IntersectionObserver ────────────────────────────
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          revealObserver.unobserve(entry.target); // animate once
        }
      });
    },
    { threshold: 0.15 }
  );

  // Elements that already carry the class in HTML, or add it dynamically
  document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

  // Auto-tag common content blocks so every page benefits without extra markup
  const autoRevealSelectors = [
    '.card',
    '.contact-card',
    '.project-card',
    '.cert-card',
    '.about-container',
    '.page-title',
    '.timeline-item',
  ];
  autoRevealSelectors.forEach(sel => {
    document.querySelectorAll(sel).forEach((el, i) => {
      el.classList.add('reveal');
      el.style.transitionDelay = `${i * 0.08}s`; // stagger siblings
      revealObserver.observe(el);
    });
  });

  // ── 2. Typing effect for hero subtitle ───────────────────────────────────
  const typingTarget = document.querySelector('.typing-text');
  if (typingTarget) {
    const phrases = [
      'AI / ML Enthusiast',
      'Full-Stack Developer',
      'ICT Undergraduate',
    ];
    let phraseIndex = 0;
    let charIndex   = 0;
    let isDeleting  = false;

    function type() {
      const current = phrases[phraseIndex];

      if (isDeleting) {
        typingTarget.textContent = current.slice(0, --charIndex);
      } else {
        typingTarget.textContent = current.slice(0, ++charIndex);
      }

      let delay = isDeleting ? 50 : 90;

      if (!isDeleting && charIndex === current.length) {
        delay = 1800;          // pause at end of word
        isDeleting = true;
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        delay = 400;
      }

      setTimeout(type, delay);
    }

    type();
  }

  // ── 3. Floating glow orbs for hero background (index only) ──────────────
  const hero = document.querySelector('.hero');
  if (hero) {
    hero.classList.add('hero-animated');
  }

  // ── 4. Page-enter fade ───────────────────────────────────────────────────
  document.body.classList.add('page-enter');

});
