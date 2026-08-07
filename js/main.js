document.addEventListener('DOMContentLoaded', () => {
  const typedTarget = document.getElementById('typed-text');
  if (typedTarget && window.Typed) {
    new Typed('#typed-text', {
      strings: ['Full Stack Learner', 'Java Developer', 'Python Developer', 'Problem Solver'],
      typeSpeed: 55,
      backSpeed: 32,
      backDelay: 1200,
      loop: true,
    });
  }

  const menuToggle = document.querySelector('.menu-toggle');
  const navLinks = document.querySelector('.nav-links');
  if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', () => {
      const isOpen = navLinks.classList.toggle('open');
      menuToggle.setAttribute('aria-expanded', String(isOpen));
    });

    navLinks.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('open');
        menuToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  const reveals = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.18 });

    reveals.forEach((section) => observer.observe(section));
  } else {
    reveals.forEach((section) => section.classList.add('visible'));
  }
});
