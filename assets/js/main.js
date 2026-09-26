/* ==========================================
   Kavy Makhesana — Portfolio Interactions
   ========================================== */

(function () {
  'use strict';

  /* ---------- Mobile Menu ---------- */
  const menuToggle = document.getElementById('menuToggle');
  const navLinks = document.getElementById('navLinks');

  if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', function () {
      navLinks.classList.toggle('open');
      const spans = menuToggle.querySelectorAll('span');
      spans[0].style.transform = navLinks.classList.contains('open') ? 'translateY(7px) rotate(45deg)' : '';
      spans[1].style.opacity = navLinks.classList.contains('open') ? '0' : '';
      spans[2].style.transform = navLinks.classList.contains('open') ? 'translateY(-7px) rotate(-45deg)' : '';
    });

    // Close on link click
    navLinks.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        navLinks.classList.remove('open');
        const spans = menuToggle.querySelectorAll('span');
        spans[0].style.transform = '';
        spans[1].style.opacity = '';
        spans[2].style.transform = '';
      });
    });

    // Close on outside click
    document.addEventListener('click', function (e) {
      if (!navLinks.contains(e.target) && !menuToggle.contains(e.target)) {
        navLinks.classList.remove('open');
        const spans = menuToggle.querySelectorAll('span');
        spans[0].style.transform = '';
        spans[1].style.opacity = '';
        spans[2].style.transform = '';
      }
    });
  }

  /* ---------- Scroll Reveal ---------- */
  const revealElements = document.querySelectorAll('.reveal');

  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -60px 0px' }
    );

    revealElements.forEach(function (el) {
      revealObserver.observe(el);
    });
  } else {
    revealElements.forEach(function (el) {
      el.classList.add('visible');
    });
  }

  /* ---------- Active Nav Highlight ---------- */
  const sections = document.querySelectorAll('section[id]');
  const navAnchors = document.querySelectorAll('.nav-links a');

  function updateActiveLink() {
    let current = '';
    const scrollY = window.scrollY + 120;

    sections.forEach(function (section) {
      if (section.offsetTop <= scrollY) {
        current = section.getAttribute('id');
      }
    });

    navAnchors.forEach(function (anchor) {
      anchor.classList.remove('active');
      if (anchor.getAttribute('href') === '#' + current) {
        anchor.classList.add('active');
      }
    });
  }

  window.addEventListener('scroll', updateActiveLink, { passive: true });
  updateActiveLink();

  /* ---------- Counter Animation ---------- */
  const counters = document.querySelectorAll('.stat-num');

  function animateCounter(el) {
    const target = parseInt(el.getAttribute('data-count'), 10);
    const duration = 1600;
    const startTime = performance.now();

    function step(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // easeOutExpo
      const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      el.textContent = Math.floor(target * eased) + (progress === 1 ? '+' : '');

      if (progress < 1) {
        requestAnimationFrame(step);
      }
    }

    requestAnimationFrame(step);
  }

  if ('IntersectionObserver' in window && counters.length) {
    const counterObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            animateCounter(entry.target);
            counterObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.5 }
    );

    counters.forEach(function (c) {
      counterObserver.observe(c);
    });
  }

  /* ---------- Nav Shadow on Scroll ---------- */
  const nav = document.getElementById('nav');

  if (nav) {
    window.addEventListener(
      'scroll',
      function () {
        nav.style.boxShadow = window.scrollY > 20 ? '0 4px 24px rgba(0,0,0,0.4)' : 'none';
      },
      { passive: true }
    );
  }

  /* ---------- Console Greeting ---------- */
  console.log(
    '%c Kavy Makhesana ',
    'background:#00e676;color:#04140a;font-weight:700;font-size:14px;padding:6px 12px;border-radius:4px'
  );
  console.log(
    '%c Network Security Engineer | CCST Certified | ISC2 Candidate ',
    'color:#00b0ff;font-size:12px'
  );
  console.log('%c Looking for Network Admin / NetEng / SOC roles ', 'color:#8b98a9;font-size:11px');
  console.log('%c 📧 kavymakhesana07@gmail.com ', 'color:#00e676;font-size:12px');
})();
