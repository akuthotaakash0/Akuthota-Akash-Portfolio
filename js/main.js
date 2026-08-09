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

  const sections = document.querySelectorAll('main section[id], header[id]');
  const navItems = document.querySelectorAll('.nav-links a');
  if ('IntersectionObserver' in window && sections.length && navItems.length) {
    const sectionObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        navItems.forEach((item) => item.classList.remove('active'));
        const activeLink = document.querySelector(`.nav-links a[href="#${entry.target.id}"]`);
        if (activeLink) activeLink.classList.add('active');
      });
    }, { rootMargin: '-30% 0px -55% 0px', threshold: 0 });

    sections.forEach((section) => sectionObserver.observe(section));
  }

  const scrollTop = document.getElementById('back-to-top');
  if (scrollTop) {
    const updateScrollButton = () => {
      scrollTop.classList.toggle('show', window.scrollY > 500);
    };

    window.addEventListener('scroll', updateScrollButton, { passive: true });
    updateScrollButton();

    scrollTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  const contactForm = document.getElementById('contact-form');
  const formNote = document.getElementById('form-note');
  if (contactForm) {
    contactForm.addEventListener('submit', (event) => {
      event.preventDefault();

      const name = document.getElementById('name')?.value.trim() || '';
      const email = document.getElementById('email')?.value.trim() || '';
      const message = document.getElementById('message')?.value.trim() || '';
      const subject = `Portfolio message from ${name}`;
      const body = `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`;
      const mailto = `mailto:akuthotaakash0@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

      if (formNote) formNote.textContent = 'Opening your email app…';
      window.location.href = mailto;
    });
  }
});
