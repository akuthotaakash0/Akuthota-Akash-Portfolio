document.addEventListener('DOMContentLoaded', () => {
  const typedTarget = document.getElementById('typed-text');
  if (typedTarget) {
    const titles = ['Frontend Developer', 'Full Stack Learner', 'Problem Solver', 'Software Developer'];
    let titleIndex = 0, charIndex = 0, deleting = false;
    typedTarget.textContent = '';
    typedTarget.style.display = 'inline-block';
    typedTarget.style.minWidth = '16ch';
    const typeTitle = () => {
      const current = titles[titleIndex];
      typedTarget.textContent = current.slice(0, charIndex);
      if (!deleting && charIndex < current.length) { charIndex++; setTimeout(typeTitle, 75); return; }
      if (!deleting) { deleting = true; setTimeout(typeTitle, 1800); return; }
      if (charIndex > 0) { charIndex--; setTimeout(typeTitle, 45); return; }
      deleting = false; titleIndex = (titleIndex + 1) % titles.length; setTimeout(typeTitle, 300);
    };
    typeTitle();
  }

  const educationCard = document.querySelector('#education .education-card');
  if (educationCard) {
    const performance = document.createElement('div');
    performance.className = 'academic-performance';
    performance.innerHTML = `
      <div class="performance-heading"><div><span class="performance-kicker">Academic Performance</span><h3>Strong results, built through consistency.</h3></div><span class="performance-badge">Latest Update</span></div>
      <div class="performance-grid">
        <article class="performance-card performance-cgpa"><div class="performance-top"><span>B.Tech CSE</span><span>Current</span></div><div class="performance-value">7.85 <small>/ 10</small></div><p>CGPA · Pursuing</p><div class="performance-bar"><span style="width:78.5%"></span></div><div class="performance-meta"><span>Latest CGPA</span><strong>7.85 / 10</strong></div></article>
        <article class="performance-card performance-percent"><div class="performance-top"><span>Intermediate</span><span>2024</span></div><div class="performance-value">97.6<small>%</small></div><p>Board Percentage</p><div class="performance-bar"><span style="width:97.6%"></span></div><div class="performance-meta"><span>Overall</span><strong>97.6%</strong></div></article>
        <article class="performance-card performance-cgpa"><div class="performance-top"><span>SSC</span><span>2022</span></div><div class="performance-value">9.8 <small>/ 10</small></div><p>CGPA</p><div class="performance-bar"><span style="width:98%"></span></div><div class="performance-meta"><span>Final CGPA</span><strong>9.8 / 10</strong></div></article>
      </div>`;
    educationCard.appendChild(performance);
    const academicStyles = document.createElement('style');
    academicStyles.textContent = `.academic-performance{margin-top:30px;padding-top:28px;border-top:1px solid var(--border)}.performance-heading{display:flex;align-items:flex-end;justify-content:space-between;gap:20px;margin-bottom:18px}.performance-kicker{color:var(--primary);font-size:.78rem;font-weight:800;text-transform:uppercase;letter-spacing:.1em}.performance-heading h3{margin-top:6px;color:var(--text);font-family:'Poppins',sans-serif;font-size:1.2rem}.performance-badge{padding:7px 11px;border-radius:999px;color:#c8f2ff;background:rgba(56,189,248,.1);border:1px solid rgba(56,189,248,.2);font-size:.78rem;font-weight:700;white-space:nowrap}.performance-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:14px}.performance-card{position:relative;overflow:hidden;padding:20px;min-height:210px;border:1px solid rgba(148,163,184,.14);border-radius:18px;background:linear-gradient(145deg,rgba(15,23,42,.9),rgba(20,31,50,.7));transition:transform .25s ease,border-color .25s ease,box-shadow .25s ease}.performance-card::after{content:'';position:absolute;width:100px;height:100px;right:-45px;top:-45px;border-radius:50%;background:rgba(56,189,248,.08)}.performance-card:hover{transform:translateY(-4px);border-color:rgba(56,189,248,.4);box-shadow:0 16px 40px rgba(0,0,0,.22)}.performance-top,.performance-meta{display:flex;justify-content:space-between;gap:12px;align-items:center}.performance-top span:first-child{color:var(--text);font-weight:700}.performance-top span:last-child{color:var(--muted);font-size:.78rem}.performance-value{margin-top:22px;color:#e8f7ff;font-family:'Poppins',sans-serif;font-size:2.45rem;line-height:1;font-weight:800;letter-spacing:-.04em}.performance-value small{color:var(--primary);font-size:1rem;letter-spacing:0}.performance-card p{margin-top:8px;color:var(--muted);font-size:.9rem}.performance-bar{height:7px;margin-top:22px;overflow:hidden;border-radius:999px;background:rgba(148,163,184,.12)}.performance-bar span{display:block;height:100%;border-radius:inherit;background:linear-gradient(90deg,var(--primary),#8b5cf6);transform-origin:left;animation:performanceGrow 1.1s ease-out both}.performance-meta{margin-top:10px;color:var(--muted);font-size:.78rem}.performance-meta strong{color:var(--text)}@keyframes performanceGrow{from{transform:scaleX(0)}to{transform:scaleX(1)}}@media(max-width:900px){.performance-grid{grid-template-columns:1fr}.performance-card{min-height:190px}}@media(max-width:600px){.performance-heading{align-items:flex-start;flex-direction:column}.performance-value{font-size:2.2rem}}`;
    document.head.appendChild(academicStyles);
  }

  const certificateGrid = document.querySelector('#certificates .skills-grid');
  if (certificateGrid) {
    const certificates = [['Python (Basic)','HackerRank','assets/python_basic certificate.pdf'],['Programming in Java','NPTEL','assets/JAVA NPTEL.pdf'],['Problem Solving through Programming in C','NPTEL','assets/PROGRAMMING IN C (NPTEL).pdf'],['Python Full Stack Development + Project','EduSkills Academy','assets/python full stack + project.pdf'],['Python Full Stack Development','EduSkills Academy','assets/Python fullstack Certificate.pdf'],['Java Full Stack Development','EduSkills Academy','assets/java fullstack certificate.pdf'],['AI-ML Virtual Internship','EduSkills / AICTE','assets/AI-ML intenship certificate.pdf'],['Python Skill Up','GeeksforGeeks','assets/PYTHON SKILLUP GFG.pdf'],['500 Difficulty Rating','CodeChef','assets/akuthotaakash-500 difficulty rating(2).pdf']];
    certificateGrid.innerHTML = certificates.map(([title,issuer,file]) => `<article class="skill-card certificate-card"><div class="certificate-icon" aria-hidden="true">🏆</div><h3>${title}</h3><p>${issuer}</p><a class="certificate-link" href="${encodeURI(file)}" target="_blank" rel="noopener noreferrer">View Certificate ↗</a></article>`).join('');
    const certificateStyles = document.createElement('style');
    certificateStyles.textContent = `#certificates .skills-grid{grid-template-columns:repeat(3,minmax(0,1fr))}.certificate-card{position:relative;display:flex;flex-direction:column;min-height:220px}.certificate-icon{width:52px;height:52px;display:grid;place-items:center;border-radius:14px;margin-bottom:18px;background:linear-gradient(135deg,rgba(56,189,248,.18),rgba(167,139,250,.18));border:1px solid rgba(125,211,252,.18);font-size:24px}.certificate-card h3{margin-bottom:10px}.certificate-card p{margin-bottom:20px;color:#94a3b8}.certificate-link{margin-top:auto;color:#38bdf8;font-weight:700;text-decoration:none}.certificate-link:hover{text-decoration:underline}@media(max-width:900px){#certificates .skills-grid{grid-template-columns:repeat(2,minmax(0,1fr))}}@media(max-width:600px){#certificates .skills-grid{grid-template-columns:1fr}.certificate-card{min-height:190px}}`;
    document.head.appendChild(certificateStyles);
  }

  const menuToggle=document.querySelector('.menu-toggle'), navLinks=document.querySelector('.nav-links');
  if(menuToggle&&navLinks){menuToggle.addEventListener('click',()=>{const isOpen=navLinks.classList.toggle('open');menuToggle.setAttribute('aria-expanded',String(isOpen));});navLinks.querySelectorAll('a').forEach(link=>link.addEventListener('click',()=>{navLinks.classList.remove('open');menuToggle.setAttribute('aria-expanded','false');}));}
  const reveals=document.querySelectorAll('.reveal');
  if('IntersectionObserver'in window){const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('visible');observer.unobserve(entry.target);}}),{threshold:.18});reveals.forEach(section=>observer.observe(section));}else reveals.forEach(section=>section.classList.add('visible'));
  const sections=document.querySelectorAll('main section[id], header[id]'),navItems=document.querySelectorAll('.nav-links a');
  if('IntersectionObserver'in window&&sections.length&&navItems.length){const sectionObserver=new IntersectionObserver(entries=>entries.forEach(entry=>{if(!entry.isIntersecting)return;navItems.forEach(item=>item.classList.remove('active'));const activeLink=document.querySelector(`.nav-links a[href="#${entry.target.id}"]`);if(activeLink)activeLink.classList.add('active');}),{rootMargin:'-30% 0px -55% 0px',threshold:0});sections.forEach(section=>sectionObserver.observe(section));}
  const scrollTop=document.getElementById('back-to-top');
  if(scrollTop){const updateScrollButton=()=>scrollTop.classList.toggle('show',window.scrollY>500);window.addEventListener('scroll',updateScrollButton,{passive:true});updateScrollButton();scrollTop.addEventListener('click',()=>window.scrollTo({top:0,behavior:'smooth'}));}
  const contactForm=document.getElementById('contact-form'),formNote=document.getElementById('form-note'),contactSubmit=document.getElementById('contact-submit');
  if(contactForm){contactForm.addEventListener('submit',async event=>{event.preventDefault();if(!contactForm.checkValidity()){contactForm.reportValidity();return;}const endpoint=contactForm.getAttribute('action'),formData=new FormData(contactForm),name=String(formData.get('name')||'').trim();if(formNote)formNote.textContent='Sending your message…';if(contactSubmit){contactSubmit.disabled=true;contactSubmit.textContent='Sending…';}try{const response=await fetch(endpoint,{method:'POST',headers:{Accept:'application/json'},body:formData});const data=await response.json().catch(()=>({}));if(!response.ok||data.success===false)throw new Error(data.message||'Unable to send the message.');contactForm.reset();if(formNote){formNote.textContent=`Message sent successfully${name?`, ${name}`:''}! Akash will receive it by email.`;formNote.classList.add('success');}}catch(error){if(formNote){formNote.textContent='We could not send the message right now. Please try again in a moment or use the email button beside the form.';formNote.classList.remove('success');}}finally{if(contactSubmit){contactSubmit.disabled=false;contactSubmit.textContent='Send Message';}}});}
});
