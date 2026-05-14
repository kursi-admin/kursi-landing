/* Kursi — shared JS */

// ── Language Switcher ─────────────────────────────────────────────

function getLanguage() {
  return new URLSearchParams(window.location.search).get('lang') || 'ar';
}

function applyLanguage(lang) {
  var h = document.documentElement;
  h.lang = lang;
  h.dir  = lang === 'ar' ? 'rtl' : 'ltr';
  h.setAttribute('data-lang-ready', lang);
  document.querySelectorAll('[data-lang="ar"]').forEach(function(el) {
    el.style.display = lang === 'ar' ? '' : 'none';
  });
  document.querySelectorAll('[data-lang="en"]').forEach(function(el) {
    el.style.display = lang === 'en' ? '' : 'none';
  });
  var btn = document.getElementById('lang-toggle');
  if (btn) btn.textContent = lang === 'ar' ? 'EN' : 'عربي';
}

function switchLanguage() {
  var newLang = getLanguage() === 'ar' ? 'en' : 'ar';
  var url = new URL(window.location.href);
  url.searchParams.set('lang', newLang);
  history.replaceState(null, '', url);
  applyLanguage(newLang);
  updateAllLinks(newLang);
}

function updateAllLinks(lang) {
  document.querySelectorAll('a[href]').forEach(function(a) {
    var href = a.getAttribute('href');
    if (href &&
        !href.startsWith('http') &&
        !href.startsWith('mailto') &&
        !href.startsWith('tel') &&
        !href.startsWith('#') &&
        !href.startsWith('whatsapp')) {
      try {
        var url = new URL(href, window.location.origin);
        url.searchParams.set('lang', lang);
        a.setAttribute('href', url.pathname + url.search);
      } catch(_) {}
    }
  });
}

// Apply language on every page load
applyLanguage(getLanguage());
updateAllLinks(getLanguage());

var langToggle = document.getElementById('lang-toggle');
if (langToggle) {
  langToggle.addEventListener('click', switchLanguage);
}

// ── Sticky Header Shadow ──────────────────────────────────────────
const header = document.getElementById('header');
if (header) {
  window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', window.scrollY > 10);
  }, { passive: true });
}

// ── Mobile Hamburger ──────────────────────────────────────────────
const hamburger = document.getElementById('hamburger');
const nav = document.getElementById('nav');
if (hamburger && nav) {
  hamburger.addEventListener('click', () => {
    const open = hamburger.classList.toggle('open');
    nav.classList.toggle('open', open);
    hamburger.setAttribute('aria-expanded', open);
  });
  nav.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('open');
      nav.classList.remove('open');
      hamburger.setAttribute('aria-expanded', 'false');
    });
  });
  // Close on overlay tap
  document.addEventListener('click', e => {
    if (header && !header.contains(e.target)) {
      hamburger.classList.remove('open');
      nav.classList.remove('open');
      hamburger.setAttribute('aria-expanded', 'false');
    }
  });
}

// ── Active Nav Link ───────────────────────────────────────────────
(function markActive() {
  const page = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-link').forEach(link => {
    // Compare against the base href without query params
    const linkPage = (link.getAttribute('href') || '').split('?')[0];
    if (linkPage === page) link.classList.add('active');
  });
})();

// ── FAQ Accordion ─────────────────────────────────────────────────
document.querySelectorAll('.faq-question').forEach(btn => {
  btn.addEventListener('click', () => {
    const answer = btn.nextElementSibling;
    const isOpen = btn.classList.contains('open');
    document.querySelectorAll('.faq-question.open').forEach(q => {
      q.classList.remove('open');
      q.nextElementSibling.classList.remove('open');
    });
    if (!isOpen) {
      btn.classList.add('open');
      answer.classList.add('open');
    }
  });
});

// ── Smooth Scroll ─────────────────────────────────────────────────
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', e => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// ── Scroll Animations ─────────────────────────────────────────────
const animEls = document.querySelectorAll('.animate-up');
if (animEls.length) {
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });
    animEls.forEach(el => io.observe(el));
  } else {
    animEls.forEach(el => el.classList.add('visible'));
  }
}

// ── Back to Top ───────────────────────────────────────────────────
const backToTop = document.getElementById('back-to-top');
if (backToTop) {
  window.addEventListener('scroll', () => {
    backToTop.classList.toggle('visible', window.scrollY > 400);
  }, { passive: true });
  backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}
