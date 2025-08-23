// Thundered Studios — script.js
(function(){
  const navToggle = document.getElementById('navToggle');
  const navMenu = document.getElementById('navMenu');
  const backToTop = document.getElementById('backToTop');
  const year = document.getElementById('year');
  const form = document.getElementById('contactForm');

  year.textContent = new Date().getFullYear();

  if(navToggle && navMenu){
    navToggle.addEventListener('click', () => {
      const open = navMenu.classList.toggle('open');
      navToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
  }

  // Back to top visibility
  const onScroll = () => {
    if(window.scrollY > 500){ backToTop.classList.add('show'); }
    else{ backToTop.classList.remove('show'); }
  };
  window.addEventListener('scroll', onScroll);
  backToTop.addEventListener('click', () => window.scrollTo({top:0, behavior:'smooth'}));

  // Reveal on scroll
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if(e.isIntersecting){
        e.target.classList.add('visible');
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.12 });
  document.querySelectorAll('.reveal').forEach(el => io.observe(el));

  // Simple form handler (no backend) — validates then opens a mailto draft
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(form).entries());
    if(!data.name || !data.email || !data.message){
      toast('Please fill out all fields.');
      return;
    }
    const subject = encodeURIComponent('New project inquiry — Thundered Studios');
    const body = encodeURIComponent(
      `Name: ${data.name}\nEmail: ${data.email}\nNDA: ${data.nda ? 'Yes' : 'No'}\n\n${data.message}`
    );
    window.location.href = `mailto:hello@thundered.studio?subject=${subject}&body=${body}`;
    toast('Drafting your email…');
    form.reset();
  });

  // Tiny toast
  function toast(msg){
    const t = document.createElement('div');
    t.textContent = msg;
    Object.assign(t.style, {
      position:'fixed', left:'50%', bottom:'24px', transform:'translateX(-50%)',
      padding:'10px 14px', background:'rgba(15,23,42,.85)', color:'#e6f1ff',
      border:'1px solid rgba(255,255,255,.12)', borderRadius:'12px', zIndex:9999
    });
    document.body.appendChild(t);
    setTimeout(()=> t.remove(), 2200);
  }
})();
