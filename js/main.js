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

  const certificateGrid = document.querySelector('#certificates .skills-grid');
  if (certificateGrid) {
    const certificates = [
      ['Python (Basic)', 'HackerRank', 'assets/python_basic certificate.pdf'],
      ['Programming in Java', 'NPTEL', 'assets/JAVA NPTEL.pdf'],
      ['Problem Solving through Programming in C', 'NPTEL', 'assets/PROGRAMMING IN C (NPTEL).pdf'],
      ['Python Full Stack Development + Project', 'EduSkills Academy', 'assets/python full stack + project.pdf'],
      ['Python Full Stack Development', 'EduSkills Academy', 'assets/PYTHON fullstack Certificate.pdf'],
      ['Java Full Stack Development', 'EduSkills Academy', 'assets/java fullstack certificate.pdf'],
      ['AI-ML Virtual Internship', 'EduSkills / AICTE', 'assets/AI-ML intenship certificate.pdf'],
      ['Python Skill Up', 'GeeksforGeeks', 'assets/PYTHON SKILLUP GFG.pdf'],
      ['500 Difficulty Rating', 'CodeChef', 'assets/akuthotaakash-500 difficulty rating(2).pdf'],
    ];

    certificateGrid.innerHTML = certificates.map(([title, issuer, file]) => `
      <article class="skill-card certificate-card">
        <div class="certificate-icon" aria-hidden="true">🏆</div>
        <h3>${title}</h3>
        <p>${issuer}</p>
        <a class="certificate-link" href="${encodeURI(file)}" target="_blank" rel="noopener noreferrer">View Certificate ↗</a>
      </article>
    `).join('');

    const certificateStyles = document.createElement('style');
    certificateStyles.textContent = `
      #certificates .skills-grid { grid-template-columns: repeat(3, minmax(0, 1fr)); }
      .certificate-card { position: relative; display: flex; flex-direction: column; min-height: 220px; }
      .certificate-icon { width: 52px; height: 52px; display: grid; place-items: center; border-radius: 14px; margin-bottom: 18px; background: linear-gradient(135deg, rgba(56,189,248,.18), rgba(167,139,250,.18)); border: 1px solid rgba(125,211,252,.18); font-size: 24px; }
      .certificate-card h3 { margin-bottom: 10px; }
      .certificate-card p { margin-bottom: 20px; color: #94a3b8; }
      .certificate-link { margin-top: auto; color: #38bdf8; font-weight: 700; text-decoration: none; }
      .certificate-link:hover { text-decoration: underline; }
      @media (max-width: 900px) { #certificates .skills-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); } }
      @media (max-width: 600px) { #certificates .skills-grid { grid-template-columns: 1fr; } .certificate-card { min-height: 190px; } }
    `;
    document.head.appendChild(certificateStyles);
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
