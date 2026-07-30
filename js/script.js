(function () {
  'use strict';

  var doc = document;

  /* ------------------------------------------------------------
     Header: solid background after scroll
  ------------------------------------------------------------ */
  var header = doc.querySelector('.header');
  function onScrollHeader() {
    if (window.scrollY > 40) {
      header.classList.add('is-scrolled');
    } else {
      header.classList.remove('is-scrolled');
    }
  }
  if (header) {
    onScrollHeader();
    window.addEventListener('scroll', onScrollHeader, { passive: true });
  }

  /* ------------------------------------------------------------
     Mobile nav toggle
  ------------------------------------------------------------ */
  var navToggle = doc.querySelector('.nav-toggle');
  var navLinks = doc.querySelector('.nav-links');
  if (navToggle && navLinks) {
    function closeMenu() {
      navLinks.classList.remove('is-open');
      navToggle.classList.remove('is-active');
      navToggle.setAttribute('aria-expanded', 'false');
      doc.body.style.overflow = '';
    }
    function openMenu() {
      navLinks.classList.add('is-open');
      navToggle.classList.add('is-active');
      navToggle.setAttribute('aria-expanded', 'true');
      doc.body.style.overflow = 'hidden';
    }
    navToggle.addEventListener('click', function () {
      if (navLinks.classList.contains('is-open')) {
        closeMenu();
      } else {
        openMenu();
      }
    });
    navLinks.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', closeMenu);
    });
    // Close when tapping the overlay itself (outside the link list)
    navLinks.addEventListener('click', function (e) {
      if (e.target === navLinks) closeMenu();
    });
    // Close on Escape
    doc.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && navLinks.classList.contains('is-open')) closeMenu();
    });
  }

  /* ------------------------------------------------------------
     Scroll reveal animations
  ------------------------------------------------------------ */
  var revealEls = doc.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && revealEls.length) {
    var revealObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -60px 0px' }
    );
    revealEls.forEach(function (el) { revealObserver.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add('is-visible'); });
  }

  /* ------------------------------------------------------------
     Service cards: cursor-tracked glow
  ------------------------------------------------------------ */
  doc.querySelectorAll('.service-card').forEach(function (card) {
    card.addEventListener('mousemove', function (e) {
      var rect = card.getBoundingClientRect();
      card.style.setProperty('--mx', ((e.clientX - rect.left) / rect.width) * 100 + '%');
      card.style.setProperty('--my', ((e.clientY - rect.top) / rect.height) * 100 + '%');
    });
  });

  /* ------------------------------------------------------------
     FAQ accordion
  ------------------------------------------------------------ */
  doc.querySelectorAll('.faq-item').forEach(function (item) {
    var question = item.querySelector('.faq-question');
    if (!question) return;
    question.addEventListener('click', function () {
      var wasOpen = item.classList.contains('is-open');
      item.closest('.faq-list').querySelectorAll('.faq-item').forEach(function (other) {
        other.classList.remove('is-open');
        other.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
      });
      if (!wasOpen) {
        item.classList.add('is-open');
        question.setAttribute('aria-expanded', 'true');
      }
    });
  });

  /* ------------------------------------------------------------
     WhatsApp floating button: tap-to-toggle on touch devices
  ------------------------------------------------------------ */
  var waFloat = doc.querySelector('.wa-float');
  var waBtn = doc.querySelector('.wa-btn');
  if (waFloat && waBtn) {
    waBtn.addEventListener('click', function (e) {
      if (window.matchMedia('(hover: none)').matches) {
        if (!waFloat.classList.contains('is-active')) {
          e.preventDefault();
          waFloat.classList.add('is-active');
        }
      }
    });
    doc.addEventListener('click', function (e) {
      if (!waFloat.contains(e.target)) {
        waFloat.classList.remove('is-active');
      }
    });
  }

  /* ------------------------------------------------------------
     Footer year
  ------------------------------------------------------------ */
  var yearEl = doc.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

})();
