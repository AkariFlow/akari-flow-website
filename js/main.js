// ==========================================================================
// AKARI FLOW — main.js
// Small, dependency-free progressive enhancements:
//   1. Scroll-reveal for elements marked .reveal
//   2. Header gains a shadow/solid background once the page scrolls
//   3. Mobile hamburger menu toggle
// Both respect prefers-reduced-motion via the CSS in style.css.
// ==========================================================================

document.addEventListener('DOMContentLoaded', () => {

  // --- Scroll reveal -------------------------------------------------------
  const revealEls = document.querySelectorAll('.reveal');

  if ('IntersectionObserver' in window && revealEls.length) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -60px 0px' });

    revealEls.forEach((el) => observer.observe(el));
  } else {
    // No IntersectionObserver support — just show everything.
    revealEls.forEach((el) => el.classList.add('is-visible'));
  }

  // --- Sticky header shadow -------------------------------------------------
  const header = document.querySelector('header');
  if (header) {
    const toggleHeaderShadow = () => {
      header.classList.toggle('is-scrolled', window.scrollY > 8);
    };
    toggleHeaderShadow();
    window.addEventListener('scroll', toggleHeaderShadow, { passive: true });
  }

  // --- Mobile hamburger menu -------------------------------------------------
  const navToggle = document.querySelector('.nav-toggle');
  const closeMenu = () => {
    if (header) header.classList.remove('nav-open');
    if (navToggle) navToggle.setAttribute('aria-expanded', 'false');
  };
  if (navToggle && header) {
    navToggle.addEventListener('click', () => {
      const isOpen = header.classList.toggle('nav-open');
      navToggle.setAttribute('aria-expanded', String(isOpen));
    });
  }

  // --- Smooth in-page anchor scroll (fallback for browsers without CSS support) -
  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener('click', (e) => {
      const id = link.getAttribute('href');
      if (id.length > 1) {
        const target = document.querySelector(id);
        if (target) {
          e.preventDefault();
          closeMenu();
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    });
  });

});