// YGI - Young Government Initiative JavaScript
// Handles: Navigation, FAQ, Tabs, Animations, Supabase interactions

document.addEventListener('DOMContentLoaded', () => {

  // === Supabase Config (inherit from main site)
  const SUPABASE_URL = 'https://yqnvjgxzqzqiepwmmhfy.supabase.co';
  const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlxbnZqZ3h6cXpxaWVwd21taGZ5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzE4NTU4NzUsImV4cCI6MjA0NzQzMTg3NX0.jHxlRKJ3KHdwzlMOBpjKd_aXj1VhvJj5aRlFIovIk5g';

  // === Mobile Nav Toggle ===
  const hamburger = document.getElementById('ygi-hamburger');
  const mobileNav = document.getElementById('ygi-mobile-nav');
  const mobileOverlay = document.getElementById('ygi-mobile-overlay');
  const mobileClose = document.getElementById('ygi-mobile-close');

  function openMobileNav() {
    mobileNav?.classList.add('open');
    mobileOverlay?.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeMobileNav() {
    mobileNav?.classList.remove('open');
    mobileOverlay?.classList.remove('open');
    document.body.style.overflow = '';
  }

  hamburger?.addEventListener('click', openMobileNav);
  mobileClose?.addEventListener('click', closeMobileNav);
  mobileOverlay?.addEventListener('click', closeMobileNav);
  document.querySelectorAll('.ygi-mobile-nav a').forEach(a => a.addEventListener('click', closeMobileNav));

  // === Header scroll effect ===
  const header = document.querySelector('.ygi-header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 60) {
      header?.classList.add('scrolled');
    } else {
      header?.classList.remove('scrolled');
    }
  });

  // === Tab system for positions ===
  const tabBtns = document.querySelectorAll('.ygi-tab-btn');
  const tabPanels = document.querySelectorAll('.ygi-positions-panel');

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      tabBtns.forEach(b => b.classList.remove('active'));
      tabPanels.forEach(p => p.classList.remove('active'));
      btn.classList.add('active');
      const target = btn.dataset.tab;
      document.getElementById(target)?.classList.add('active');
    });
  });

  // === FAQ Accordion ===
  const faqItems = document.querySelectorAll('.ygi-faq-item');
  faqItems.forEach(item => {
    const question = item.querySelector('.ygi-faq-question');
    question?.addEventListener('click', () => {
      const isOpen = item.classList.contains('open');
      faqItems.forEach(i => i.classList.remove('open'));
      if (!isOpen) item.classList.add('open');
    });
  });

  // === Intersection Observer Animations ===
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  document.querySelectorAll('.ygi-animate').forEach(el => observer.observe(el));

  // === Counter animation ===
  function animateCounter(el, target, duration = 2000) {
    const start = performance.now();
    const from = 0;
    function update(now) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.floor(from + (target - from) * eased).toLocaleString();
      if (progress < 1) requestAnimationFrame(update);
    }
    requestAnimationFrame(update);
  }

  const statObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseInt(el.dataset.target || '0');
        animateCounter(el, target);
        statObserver.unobserve(el);
      }
    });
  }, { threshold: 0.5 });

  document.querySelectorAll('.ygi-stat-number[data-target]').forEach(el => statObserver.observe(el));

  // === Toast notification ===
  window.ygiToast = function(message, type = 'default') {
    let toast = document.getElementById('ygi-toast');
    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'ygi-toast';
      toast.className = 'ygi-toast';
      document.body.appendChild(toast);
    }
    toast.textContent = message;
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 3500);
  };

  // === Position card click ===
  document.querySelectorAll('.ygi-position-card').forEach(card => {
    card.addEventListener('click', () => {
      const pos = card.querySelector('.ygi-position-title')?.textContent;
      if (pos) {
        const url = `/ygi/apply.html?position=${encodeURIComponent(pos)}`;
        window.location.href = url;
      }
    });
  });

  // === Training card click ===
  document.querySelectorAll('.ygi-training-card').forEach(card => {
    card.addEventListener('click', () => {
      window.ygiToast('Training Portal: Log in to access this module.');
    });
  });

  // === Newsletter/subscribe form ===
  const subscribeForm = document.getElementById('ygi-subscribe-form');
  subscribeForm?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('ygi-subscribe-email')?.value;
    if (!email) return;
    window.ygiToast('Thank you! You will receive YGI updates soon.');
    subscribeForm.reset();
  });

  // === Apply Now links ===
  document.querySelectorAll('.ygi-apply-now').forEach(btn => {
    btn.addEventListener('click', () => {
      window.location.href = '/ygi/apply.html';
    });
  });

  // === Smooth scroll for anchor links ===
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', (e) => {
      const target = document.querySelector(a.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  console.log('[YGI] Module loaded successfully.');
});
