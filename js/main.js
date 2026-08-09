document.addEventListener('DOMContentLoaded', () => {
  const typedTarget = document.getElementById('typed-text');
  if (typedTarget) {
    const titles = [
      'Frontend Developer',
      'Full Stack Learner',
      'Problem Solver',
      'Software Developer',
    ];

    let titleIndex = 0;
    let charIndex = 0;
    let deleting = false;

    typedTarget.textContent = '';
    typedTarget.style.display = 'inline-block';
    typedTarget.style.minWidth = '16ch';

    const typeTitle = () => {
      const current = titles[titleIndex];
      typedTarget.textContent = current.slice(0, charIndex);

      if (!deleting && charIndex < current.length) {
        charIndex += 1;
        setTimeout(typeTitle, 75);
        return;
      }

      if (!deleting) {
        deleting = true;
        setTimeout(typeTitle, 1800);
        return;
      }

      if (charIndex > 0) {
        charIndex -= 1;
        setTimeout(typeTitle, 45);
        return;
      }

      deleting = false;
      titleIndex = (titleIndex + 1) % titles.length;
      setTimeout(typeTitle, 300);
    };

    typeTitle();
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
  const contactSubmit = document.getElementById('contact-submit');

  if (contactForm) {
    contactForm.addEventListener('submit', async (event) => {
      event.preventDefault();

      if (!contactForm.checkValidity()) {
        contactForm.reportValidity();
        return;
      }

      const endpoint = contactForm.getAttribute('action');
      const formData = new FormData(contactForm);
      const name = String(formData.get('name') || '').trim();

      if (formNote) formNote.textContent = 'Sending your message…';
      if (contactSubmit) {
        contactSubmit.disabled = true;
        contactSubmit.textContent = 'Sending…';
      }

      try {
        const response = await fetch(endpoint, {
          method: 'POST',
          headers: { Accept: 'application/json' },
          body: formData,
        });

        const data = await response.json().catch(() => ({}));

        if (!response.ok || data.success === false) {
          throw new Error(data.message || 'Unable to send the message.');
        }

        contactForm.reset();
        if (formNote) {
          formNote.textContent = `Message sent successfully${name ? `, ${name}` : ''}! Akash will receive it by email.`;
          formNote.classList.add('success');
        }
      } catch (error) {
        if (formNote) {
          formNote.textContent = 'We could not send the message right now. Please try again in a moment or use the email button beside the form.';
          formNote.classList.remove('success');
        }
      } finally {
        if (contactSubmit) {
          contactSubmit.disabled = false;
          contactSubmit.textContent = 'Send Message';
        }
      }
    });
  }
});
