// Navbar scroll effect
window.addEventListener('scroll', () => {
  document.getElementById('navbar')
    .classList.toggle('scrolled', window.scrollY > 50);
});

// Create particles background
function createParticles() {
  const container = document.getElementById('particles');
  for (let i = 0; i < 50; i++) {
    const p = document.createElement('div');
    p.className = 'particle';
    p.style.left = Math.random() * 100 + '%';
    p.style.animationDelay = Math.random() * 20 + 's';
    p.style.opacity = Math.random() * 0.5 + 0.1;
    container.appendChild(p);
  }
}
createParticles();

// Fade-in observer for stats & features
const fadeObs = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.style.opacity = 1;
      e.target.style.transform = 'translateY(0)';
      fadeObs.unobserve(e.target);
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.stat-card, .feature-card').forEach(el => {
  el.style.opacity = 0;
  el.style.transform = 'translateY(30px)';
  el.style.transition = 'all 0.6s ease';
  fadeObs.observe(el);
});

// Animate stat numbers
function animateNumbers() {
  document.querySelectorAll('.stat-number').forEach(n => {
    const txt = n.textContent;
    const isPerc = txt.includes('%');
    const isCurr = txt.includes('$');
    let val = parseFloat(txt.replace(/[^0-9.-]/g,'')) *
              (isCurr && txt.includes('M') ? 1e6 : 1);
    let cur = 0, step = val / 100;
    const timer = setInterval(() => {
      cur += step;
      if (cur >= val) { cur = val; clearInterval(timer); }
      let disp;
      if (isCurr) {
        disp = cur >= 1e6
          ? '$' + (cur/1e6).toFixed(2) + 'M'
          : '$' + Math.floor(cur).toLocaleString();
      } else if (isPerc) {
        disp = cur.toFixed(0) + '%';
      } else {
        disp = Math.floor(cur);
      }
      n.textContent = disp;
    }, 20);
  });
}
new IntersectionObserver((es) => {
  if (es[0].isIntersecting) {
    animateNumbers();
  }
}, { threshold: 0.5 }).observe(document.querySelector('.stats'));

// Toggle “Learn More” panels
document.querySelectorAll('.product-cta').forEach(btn => {
  btn.addEventListener('click', () => {
    const detail = btn.nextElementSibling;
    detail.style.display = detail.style.display === 'block' ? 'none' : 'block';
  });
});
