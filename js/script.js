document.addEventListener('DOMContentLoaded', function () {

  // ── Loader ──────────────────────────────────────────
  window.addEventListener('load', function () {
    setTimeout(function () {
      var ld = document.getElementById('ld');
      if (ld) ld.classList.add('out');
    }, 1200);
  });

  // ── Nav scroll ──────────────────────────────────────
  var nav = document.getElementById('nav');
  if (nav) {
    window.addEventListener('scroll', function () {
      nav.classList.toggle('sc', window.scrollY > 40);
    });
  }

  // ── Nav toggle (mobile) ─────────────────────────────
  var nt = document.getElementById('nt');
  var nl = document.getElementById('nl');
  if (nt && nl) {
    nt.addEventListener('click', function () {
      nl.classList.toggle('op');
    });
    document.querySelectorAll('.nl a').forEach(function (a) {
      a.addEventListener('click', function () {
        nl.classList.remove('op');
      });
    });
  }

  // ── Scroll reveal ────────────────────────────────────
  var rvEls = document.querySelectorAll('.rv');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e, i) {
        if (e.isIntersecting) {
          setTimeout(function () {
            e.target.classList.add('on');
          }, i * 65);
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -36px 0px' });
    rvEls.forEach(function (el) { io.observe(el); });
  } else {
    // Fallback for browsers without IntersectionObserver
    rvEls.forEach(function (el) { el.classList.add('on'); });
  }

  // ── Active nav highlight on scroll ───────────────────
  var secs = document.querySelectorAll('section[id]');
  var navAs = document.querySelectorAll('.nl a:not(.ncta)');
  if (secs.length && navAs.length) {
    window.addEventListener('scroll', function () {
      var cur = '';
      secs.forEach(function (s) {
        if (window.scrollY >= s.offsetTop - 130) cur = s.id;
      });
      navAs.forEach(function (a) {
        a.style.color = a.getAttribute('href') === '#' + cur ? 'var(--teal)' : '';
      });
    });
  }

  // ── Contact form submit ───────────────────────────────
  var fsub = document.getElementById('fsub');
  if (fsub) {
    fsub.addEventListener('click', function () {
      var btn = this;
      btn.innerHTML = '<i class="fas fa-check"></i> Sent! I\'ll be in touch soon.';
      btn.style.background = 'linear-gradient(135deg,#52b788,#2a9d8f)';
      setTimeout(function () {
        btn.innerHTML = '<i class="fas fa-paper-plane"></i> Send Message';
        btn.style.background = '';
      }, 4000);
    });
  }

  // ── Smooth scroll for anchor links ───────────────────
  document.querySelectorAll('a[href^="#"]').forEach(function (a) {
    a.addEventListener('click', function (e) {
      var target = document.querySelector(a.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

});
