/* GSAP animations and interactions */
(function(){
  const year = document.getElementById('year');
  if(year){ year.textContent = new Date().getFullYear(); }

  // Intro timeline for hero
  if(window.gsap){
    // Ensure ScrollTrigger is registered
    if(window.ScrollTrigger){
      gsap.registerPlugin(ScrollTrigger);
    }
    const tl = gsap.timeline({ defaults:{ ease:"power3.out" } });
    tl.from(".site-header", { y:-40, opacity:0, duration:.6 })
      .from(".badge", { y:20, opacity:0, duration:.5 })
      .from(".headline span", { y:50, opacity:0, duration:.8, stagger:.12 })
      .from(".subheadline", { y:20, opacity:0, duration:.5 }, "-=0.3")
      .from(".cta-group", { y:14, opacity:0, duration:.5 }, "-=0.3")
      .from(".socials a", { y:10, opacity:0, stagger:.1, duration:.4 }, "-=0.25");

    // Scroll animations
    if(gsap.ScrollTrigger){
      // Parallax hero background as you scroll past the hero
      gsap.to('.hero-bg', {
        yPercent: 12,
        scale: 1.06,
        ease: 'none',
        scrollTrigger: {
          trigger: '.hero',
          start: 'top top',
          end: 'bottom top',
          scrub: true
        }
      });

      // Intensify header background slightly on scroll
      gsap.to('.site-header', {
        backgroundColor: 'rgba(11,14,18,0.9)',
        scrollTrigger: {
          trigger: document.body,
          start: 0,
          end: 300,
          scrub: true
        }
      });

      gsap.utils.toArray('.section').forEach((section)=>{
        const targets = section.querySelectorAll('.section-header, .card, .plan');
        if(!targets.length) return;
        gsap.from(targets,{
          y:30,
          opacity:0,
          duration:.7,
          stagger:.12,
          ease:"power2.out",
          scrollTrigger:{
            trigger: section,
            start: "top 80%",
            end: "bottom 60%",
            toggleActions: "play none none reverse"
          }
        });
      });
    }
  }

  // Mobile menu toggle
  const toggle = document.querySelector('.menu-toggle');
  const menu = document.querySelector('.menu');
  if(toggle && menu){
    toggle.addEventListener('click', ()=>{
      const open = menu.style.display === 'flex';
      menu.style.display = open ? 'none' : 'flex';
      if(!open){ menu.style.flexDirection = 'column'; menu.style.gap = '14px'; }
    });
  }

  // Pricing toggle Monthly / Yearly
  const toggles = document.querySelectorAll('.billing-toggle .toggle');
  const amounts = document.querySelectorAll('.plan .amount');
  function setBilling(mode){
    toggles.forEach(b=>b.classList.toggle('active', b.dataset.billing === mode));
    amounts.forEach(el=>{
      const monthly = Number(el.getAttribute('data-monthly'));
      const yearly = Number(el.getAttribute('data-yearly'));
      const value = mode === 'yearly' ? yearly : monthly;
      el.textContent = `$${value}`;
    });
  }
  toggles.forEach(btn=>btn.addEventListener('click', ()=> setBilling(btn.dataset.billing)));
  setBilling('monthly');
})();


