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
          setTimeout(function () { e.target.classList.add('on'); }, i * 65);
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -36px 0px' });
    rvEls.forEach(function (el) { io.observe(el); });
  } else {
    rvEls.forEach(function (el) { el.classList.add('on'); });
  }

  // ── Active nav highlight ─────────────────────────────
  var secs   = document.querySelectorAll('section[id]');
  var navAs  = document.querySelectorAll('.nl a:not(.ncta)');
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

  // ── Smooth scroll ────────────────────────────────────
  document.querySelectorAll('a[href^="#"]').forEach(function (a) {
    a.addEventListener('click', function (e) {
      var target = document.querySelector(a.getAttribute('href'));
      if (target) { e.preventDefault(); target.scrollIntoView({ behavior: 'smooth' }); }
    });
  });

  // ── Contact Form — EmailJS ────────────────────────────
  var EMAILJS_SERVICE  = 'service_u82km2e';
  var EMAILJS_TEMPLATE = 'template_6yonr8i';   // ← NEW template for Dr. Shizza

  var submitBtn = document.getElementById('shizza_submit');
  if (submitBtn) {
    submitBtn.addEventListener('click', function () {
      var name    = (document.getElementById('shizza_name')    || {}).value || '';
      var email   = (document.getElementById('shizza_email')   || {}).value || '';
      var subject = (document.getElementById('shizza_subject') || {}).value || '';
      var message = (document.getElementById('shizza_message') || {}).value || '';

      // Basic validation
      if (!name.trim()) {
        shakeField('shizza_name');
        return;
      }
      if (!email.trim() || !email.includes('@')) {
        shakeField('shizza_email');
        return;
      }
      if (!message.trim()) {
        shakeField('shizza_message');
        return;
      }

      // Button loading state
      submitBtn.disabled = true;
      submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';

      // Build a temporary hidden form for EmailJS sendForm
      var tempForm = document.createElement('form');
      tempForm.style.display = 'none';

      var fields = {
        from_name:  name,
        from_email: email,
        subject:    subject || 'Consultation Request',
        message:    message,
        to_email:   'rphdrshizza@gmail.com'
      };

      Object.keys(fields).forEach(function (key) {
        var input = document.createElement('input');
        input.name  = key;
        input.value = fields[key];
        tempForm.appendChild(input);
      });

      document.body.appendChild(tempForm);

      if (typeof emailjs !== 'undefined') {
        emailjs.sendForm(EMAILJS_SERVICE, EMAILJS_TEMPLATE, tempForm)
          .then(function () {
            document.body.removeChild(tempForm);
            showSuccess();
          }, function (error) {
            document.body.removeChild(tempForm);
            console.error('EmailJS error:', error);
            // Mailto fallback
            window.location.href = 'mailto:rphdrshizza@gmail.com'
              + '?subject=' + encodeURIComponent(subject || 'Consultation Request — ' + name)
              + '&body=' + encodeURIComponent('From: ' + name + ' <' + email + '>\n\n' + message);
            showSuccess();
          });
      } else {
        // EmailJS SDK not loaded — direct mailto fallback
        document.body.removeChild(tempForm);
        window.location.href = 'mailto:rphdrshizza@gmail.com'
          + '?subject=' + encodeURIComponent(subject || 'Consultation Request — ' + name)
          + '&body=' + encodeURIComponent('From: ' + name + ' <' + email + '>\n\n' + message);
        showSuccess();
      }
    });
  }

  function showSuccess() {
    if (submitBtn) {
      submitBtn.disabled = false;
      submitBtn.innerHTML = '<i class="fas fa-check"></i> Message Sent! I\'ll be in touch soon.';
      submitBtn.style.background = 'linear-gradient(135deg, #52b788, #2a9d8f)';
      // Clear form fields
      ['shizza_name', 'shizza_email', 'shizza_subject', 'shizza_message'].forEach(function (id) {
        var el = document.getElementById(id);
        if (el) el.value = '';
      });
      setTimeout(function () {
        submitBtn.innerHTML = '<i class="fas fa-paper-plane"></i> Send Message';
        submitBtn.style.background = '';
      }, 5000);
    }
  }

  function shakeField(id) {
    var el = document.getElementById(id);
    if (!el) return;
    el.style.borderColor = '#e74c3c';
    el.style.animation = 'none';
    el.offsetHeight; // reflow
    el.style.animation = 'shizzaShake 0.4s ease';
    setTimeout(function () {
      el.style.borderColor = '';
      el.style.animation   = '';
    }, 500);
    el.focus();
  }

  // Inject shake keyframe once
  if (!document.getElementById('shizzaShakeKF')) {
    var s = document.createElement('style');
    s.id = 'shizzaShakeKF';
    s.textContent = '@keyframes shizzaShake {'
      + '0%,100%{transform:translateX(0)}'
      + '20%{transform:translateX(-6px)}'
      + '40%{transform:translateX(6px)}'
      + '60%{transform:translateX(-4px)}'
      + '80%{transform:translateX(4px)}'
      + '}';
    document.head.appendChild(s);
  }

});
