// ==========================================================================
// AKARI FLOW — main.js
// Handles: mobile nav toggle (with aria-expanded kept in sync), sticky
// header scroll state, and the .reveal scroll-in animation system.
// ==========================================================================

document.addEventListener('DOMContentLoaded', function () {

  /* ---------------------------------------------------------------------
     Mobile nav toggle
     Keeps header.nav-open, the button's aria-expanded, and its
     accessible label all in sync with the menu's actual open/closed state.
  --------------------------------------------------------------------- */
  var header = document.querySelector('header');
  var navToggle = document.querySelector('.nav-toggle');
  var navLinks = document.getElementById('nav-links');

  if (header && navToggle && navLinks) {
    var closeMenu = function () {
      header.classList.remove('nav-open');
      navToggle.setAttribute('aria-expanded', 'false');
      navToggle.setAttribute('aria-label', 'Open menu');
    };

    var openMenu = function () {
      header.classList.add('nav-open');
      navToggle.setAttribute('aria-expanded', 'true');
      navToggle.setAttribute('aria-label', 'Close menu');
    };

    navToggle.addEventListener('click', function () {
      var isOpen = header.classList.contains('nav-open');
      if (isOpen) {
        closeMenu();
      } else {
        openMenu();
      }
    });

    // Close the menu after choosing a link, and on outside click / Escape.
    navLinks.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', closeMenu);
    });

    document.addEventListener('click', function (event) {
      var isOpen = header.classList.contains('nav-open');
      if (isOpen && !header.contains(event.target)) {
        closeMenu();
      }
    });

    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape' && header.classList.contains('nav-open')) {
        closeMenu();
        navToggle.focus();
      }
    });
  }

  /* ---------------------------------------------------------------------
     Sticky header shadow/background once the page has scrolled
  --------------------------------------------------------------------- */
  if (header) {
    var updateHeaderScrollState = function () {
      if (window.scrollY > 8) {
        header.classList.add('is-scrolled');
      } else {
        header.classList.remove('is-scrolled');
      }
    };
    updateHeaderScrollState();
    window.addEventListener('scroll', updateHeaderScrollState, { passive: true });
  }

  /* ---------------------------------------------------------------------
     Scroll-reveal: adds .is-visible to .reveal elements as they enter
     the viewport. Falls back gracefully (elements stay visible) if
     IntersectionObserver isn't supported.
  --------------------------------------------------------------------- */
  var revealEls = document.querySelectorAll('.reveal');

  if ('IntersectionObserver' in window && revealEls.length) {
    var revealObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

    revealEls.forEach(function (el) { revealObserver.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add('is-visible'); });
  }

});