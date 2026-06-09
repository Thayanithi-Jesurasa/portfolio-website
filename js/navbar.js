// ── Navbar: active link, scroll shrink, mobile hamburger ──────────────────

document.addEventListener('DOMContentLoaded', () => {

  // ── 1. Mark active page link ─────────────────────────────────────────────
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage) {
      link.classList.add('active');
    }
  });

  // ── 2. Darken navbar on scroll ───────────────────────────────────────────
  const navbar = document.querySelector('.navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('navbar-scrolled');
    } else {
      navbar.classList.remove('navbar-scrolled');
    }
  });

  // ── 3. Mobile hamburger toggle ───────────────────────────────────────────
  // Inject hamburger button if it doesn't already exist in the HTML
  if (!document.querySelector('.hamburger')) {
    const hamburger = document.createElement('button');
    hamburger.className = 'hamburger';
    hamburger.setAttribute('aria-label', 'Toggle menu');
    hamburger.innerHTML = `
      <span></span>
      <span></span>
      <span></span>
    `;
    navbar.appendChild(hamburger);

    const navLinks = document.querySelector('.nav-links');

    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('open');
      navLinks.classList.toggle('nav-open');
    });

    // Close menu when a link is clicked (mobile navigation)
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('open');
        navLinks.classList.remove('nav-open');
      });
    });
  }

});
