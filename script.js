const phrases = [
  'Web Developer.',
  'Node.js & MongoDB.',
  'React Applications.',
  'Render & EmailJS.',
  'Full-stack Solutions.',
];
let phraseIdx = 0, charIdx = 0, isDeleting = false;
const typeEl = document.getElementById('typewriter');

function type() {
  if (!typeEl) return;
  const current = phrases[phraseIdx];

  typeEl.textContent = isDeleting
    ? current.slice(0, --charIdx)
    : current.slice(0, ++charIdx);

  let delay = isDeleting ? 60 : 100;

  if (!isDeleting && charIdx === current.length) {
    delay = 1800; isDeleting = true;
  } else if (isDeleting && charIdx === 0) {
    isDeleting = false;
    phraseIdx = (phraseIdx + 1) % phrases.length;
    delay = 400;
  }
  setTimeout(type, delay);
}
document.addEventListener('DOMContentLoaded', () => setTimeout(type, 800));

const cursorGlow = document.getElementById('cursorGlow');
document.addEventListener('mousemove', (e) => {
  if (cursorGlow) {
    cursorGlow.style.left = e.clientX + 'px';
    cursorGlow.style.top  = e.clientY + 'px';
  }
});

const header    = document.getElementById('siteHeader');
const backToTop = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
  const y = window.scrollY;

  if (header) header.classList.toggle('scrolled', y > 40);

  if (backToTop) backToTop.classList.toggle('visible', y > 400);

  updateActiveNav();

  animateBars();
});

const sections = document.querySelectorAll('section[id], footer[id]');
const navLinks  = document.querySelectorAll('.nav-link');

function updateActiveNav() {
  let current = '';
  sections.forEach((sec) => {
    const top = sec.offsetTop - 100;
    if (window.scrollY >= top) current = sec.id;
  });
  navLinks.forEach((link) => {
    link.classList.toggle('active', link.dataset.nav === current);
  });
}

const revealEls = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        const siblings = entry.target.parentElement
          ? [...entry.target.parentElement.children].filter(el => el.classList.contains('reveal'))
          : [];
        const idx = siblings.indexOf(entry.target);
        entry.target.style.transitionDelay = idx * 0.1 + 's';
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 }
);
revealEls.forEach((el) => revealObserver.observe(el));

let barsAnimated = false;
function animateBars() {
  if (barsAnimated) return;
  const skillsSection = document.getElementById('skills');
  if (!skillsSection) return;
  const rect = skillsSection.getBoundingClientRect();
  if (rect.top < window.innerHeight * 0.85) {
    document.querySelectorAll('.bar-fill').forEach((bar) => {
      bar.style.width = bar.dataset.pct + '%';
    });
    barsAnimated = true;
  }
}
window.addEventListener('load', animateBars);

const hamburger  = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');

hamburger?.addEventListener('click', () => {
  const isOpen = mobileMenu.classList.toggle('open');
  hamburger.classList.toggle('open', isOpen);
  document.body.style.overflow = isOpen ? 'hidden' : '';
});

function closeMobile() {
  mobileMenu?.classList.remove('open');
  hamburger?.classList.remove('open');
  document.body.style.overflow = '';
}

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function handleFormSubmit(e) {
  e.preventDefault();
  const btn     = document.getElementById('sendMessageBtn');
  const success = document.getElementById('formSuccess');
  const form    = document.getElementById('contactForm');

  btn.disabled = true;
  btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Sending…';

  setTimeout(() => {
    btn.innerHTML = '<i class="fa-solid fa-check"></i> Sent!';
    btn.style.background = 'linear-gradient(135deg, #00d4aa, #00a885)';
    success.classList.add('show');
    form.reset();

    setTimeout(() => {
      btn.disabled = false;
      btn.innerHTML = '<i class="fa-solid fa-paper-plane"></i> Send Message';
      btn.style.background = '';
      success.classList.remove('show');
    }, 4000);
  }, 1500);
}

document.addEventListener('DOMContentLoaded', () => {
  document.body.style.opacity = '0';
  document.body.style.transition = 'opacity 0.4s ease';
  requestAnimationFrame(() => {
    document.body.style.opacity = '1';
  });

  document.querySelectorAll('.hero .reveal').forEach((el, i) => {
    el.style.transitionDelay = (i * 0.15 + 0.2) + 's';
    el.classList.add('visible');
  });
});
