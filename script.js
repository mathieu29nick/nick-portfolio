const body = document.body;
const themeToggle = document.getElementById('themeToggle');
const menuButton = document.getElementById('menuButton');
const mobileNav = document.getElementById('mobileNav');
const scrollProgress = document.getElementById('scrollProgress');
const cursorGlow = document.getElementById('cursorGlow');

const savedTheme = localStorage.getItem('portfolio-theme');
if (savedTheme === 'light') body.classList.add('light');

themeToggle?.addEventListener('click', () => {
  body.classList.toggle('light');
  localStorage.setItem('portfolio-theme', body.classList.contains('light') ? 'light' : 'dark');
});

menuButton?.addEventListener('click', () => {
  const open = !mobileNav.classList.contains('open');
  mobileNav.classList.toggle('open', open);
  menuButton.classList.toggle('active', open);
  menuButton.setAttribute('aria-expanded', String(open));
});

mobileNav?.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
  mobileNav.classList.remove('open');
  menuButton.classList.remove('active');
  menuButton.setAttribute('aria-expanded', 'false');
}));

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach(el => {
  if (el.dataset.delay) el.style.setProperty('--delay', `${el.dataset.delay}ms`);
  revealObserver.observe(el);
});

const roles = [
  'Développeur FullStack JavaScript',
  'React · Next.js · Node.js · NestJS',
  'Front-end · APIs · Data · Tests'
];
const typedRole = document.getElementById('typedRole');
let roleIndex = 0;
let charIndex = roles[0].length;
let deleting = true;

function typeLoop() {
  if (!typedRole || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const current = roles[roleIndex];
  if (deleting) {
    charIndex--;
    typedRole.textContent = current.slice(0, charIndex);
    if (charIndex <= 0) {
      deleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
      setTimeout(typeLoop, 350);
      return;
    }
    setTimeout(typeLoop, 28);
  } else {
    const next = roles[roleIndex];
    charIndex++;
    typedRole.textContent = next.slice(0, charIndex);
    if (charIndex >= next.length) {
      deleting = true;
      setTimeout(typeLoop, 1850);
      return;
    }
    setTimeout(typeLoop, 52);
  }
}
setTimeout(typeLoop, 2200);

function onScroll() {
  const doc = document.documentElement;
  const max = doc.scrollHeight - doc.clientHeight;
  const value = max > 0 ? (doc.scrollTop / max) * 100 : 0;
  scrollProgress.style.width = `${value}%`;
}
window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

window.addEventListener('pointermove', (e) => {
  if (!cursorGlow) return;
  cursorGlow.style.left = `${e.clientX}px`;
  cursorGlow.style.top = `${e.clientY}px`;
}, { passive: true });

const tilt = document.querySelector('.tilt-card');
if (tilt && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  tilt.addEventListener('pointermove', (e) => {
    const r = tilt.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    tilt.style.transform = `perspective(900px) rotateX(${-y * 5}deg) rotateY(${x * 7}deg) translateY(-3px)`;
  });
  tilt.addEventListener('pointerleave', () => {
    tilt.style.transform = '';
  });
}
