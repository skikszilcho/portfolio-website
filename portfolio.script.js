/* =========================================================
   MOBILE MENU TOGGLE
========================================================= */
const menuIcon = document.querySelector('#menu-icon');
const navbar   = document.querySelector('.navbar');

menuIcon.addEventListener('click', () => {
  menuIcon.classList.toggle('bx-x');
  navbar.classList.toggle('active');
});

/* =========================================================
   DARK / LIGHT MODE
========================================================= */
const darkModeIcon = document.querySelector('#darkMode-icon');

darkModeIcon.addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');
  darkModeIcon.classList.toggle('bx-moon');
  darkModeIcon.classList.toggle('bx-sun');
});

/* =========================================================
   ACTIVE LINK ON SCROLL
========================================================= */
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.navbar a');

window.addEventListener('scroll', () => {
  /* Header shadow only after scrolling */
  const header = document.querySelector('.header');
  header.classList.toggle('sticky', window.scrollY > 0);
  sections.forEach(sec => {
    const top    = window.scrollY;
    const offset = sec.offsetTop - 150;
    const height = sec.offsetHeight;
    const id     = sec.getAttribute('id');

    if (top >= offset && top < offset + height) {
      navLinks.forEach(link => link.classList.remove('active'));
      const active = document.querySelector('.navbar a[href*=' + id + ']');
      if (active) active.classList.add('active');
    }
  });

  /* Close mobile menu when scrolling */
  menuIcon.classList.remove('bx-x');
  navbar.classList.remove('active');
});

/* =========================================================
   SIMPLE TYPING EFFECT (no external library)
========================================================= */
const roles = ['Web Developer', 'AI Engineer', 'Applied AI Developer', 'Solutions Developer'];
const typeEl = document.querySelector('.typing-text');

let roleIndex = 0;
let charIndex = 0;
let deleting  = false;

function type() {
  const word = roles[roleIndex];
  typeEl.textContent = word.substring(0, charIndex);

  if (!deleting && charIndex < word.length) {
    charIndex++;
    setTimeout(type, 90);
  } else if (deleting && charIndex > 0) {
    charIndex--;
    setTimeout(type, 50);
  } else {
    deleting = !deleting;
    if (!deleting) roleIndex = (roleIndex + 1) % roles.length;
    setTimeout(type, deleting ? 1400 : 300);
  }
}

type();
