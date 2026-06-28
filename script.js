/* =========================================
   10X THINK TOURISM – script.js
   ========================================= */

'use strict';

/* ──────────────────────────────────────────
   1. NAVBAR – Scroll & Hamburger
────────────────────────────────────────── */
const navbar    = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const navLinks  = document.getElementById('navLinks');

window.addEventListener('scroll', () => {
  if (window.scrollY > 60) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
}, { passive: true });

hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('open');
  hamburger.setAttribute('aria-expanded', navLinks.classList.contains('open'));
});

// Close nav when a link is clicked
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => navLinks.classList.remove('open'));
});

/* ──────────────────────────────────────────
   2. HERO SLIDESHOW
────────────────────────────────────────── */
const slides    = document.querySelectorAll('.hero-slide');
const dotsWrap  = document.getElementById('slideDots');
let   currentSlide = 0;
let   slideTimer;

// Build dots
slides.forEach((_, i) => {
  const dot = document.createElement('button');
  dot.className = 'dot' + (i === 0 ? ' active' : '');
  dot.setAttribute('aria-label', `Go to slide ${i + 1}`);
  dot.addEventListener('click', () => goToSlide(i));
  dotsWrap.appendChild(dot);
});

function goToSlide(n) {
  slides[currentSlide].classList.remove('active');
  dotsWrap.children[currentSlide].classList.remove('active');
  currentSlide = (n + slides.length) % slides.length;
  slides[currentSlide].classList.add('active');
  dotsWrap.children[currentSlide].classList.add('active');
}

function nextSlide() { goToSlide(currentSlide + 1); }

function startSlideTimer() {
  clearInterval(slideTimer);
  slideTimer = setInterval(nextSlide, 6000);
}

startSlideTimer();

/* ──────────────────────────────────────────
   3. SCROLL REVEAL ANIMATION
────────────────────────────────────────── */
const revealEls = document.querySelectorAll('.reveal-up');

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      // Stagger sibling reveals for aesthetic effect
      const siblings = entry.target.parentElement.querySelectorAll('.reveal-up:not(.visible)');
      let delay = 0;
      siblings.forEach(el => {
        if (el === entry.target || el.getBoundingClientRect().top <= window.innerHeight) {
          setTimeout(() => el.classList.add('visible'), delay);
          delay += 80;
        }
      });
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

revealEls.forEach(el => revealObserver.observe(el));

/* ──────────────────────────────────────────
   4. SEARCH FORM VALIDATION
────────────────────────────────────────── */
const searchForm  = document.getElementById('searchForm');
const searchError = document.getElementById('searchError');

searchForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const data = new FormData(searchForm);
  const dest     = data.get('destination');
  const checkin  = data.get('checkin');
  const checkout = data.get('checkout');
  const travelers = data.get('travelers');

  if (!dest || !checkin || !checkout || !travelers) {
    searchError.textContent = 'Please fill in all fields before searching.';
    return;
  }

  if (new Date(checkout) <= new Date(checkin)) {
    searchError.textContent = 'Check-out date must be after check-in date.';
    return;
  }

  searchError.textContent = '';

  // Simulate search — scroll to destinations
  document.getElementById('destinations').scrollIntoView({ behavior: 'smooth' });

  // Brief visual feedback
  const btn = searchForm.querySelector('.btn-search');
  btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Searching…';
  setTimeout(() => {
    btn.innerHTML = '<i class="fas fa-check"></i> Results Below!';
    setTimeout(() => {
      btn.innerHTML = '<i class="fas fa-search"></i> Search';
    }, 2000);
  }, 900);
});

/* ──────────────────────────────────────────
   5. DESTINATION MODAL
────────────────────────────────────────── */
const destData = {
  Goa: {
    img: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=800&q=85',
    desc: 'Goa blends golden beaches, Portuguese colonial heritage, and vibrant nightlife into a destination unlike any other. Perfect for beach lovers, party-goers, and food enthusiasts.',
    price: '₹12,999', duration: '5 Days / 4 Nights', rating: '4.8 / 5', best: 'Oct – Mar'
  },
  Kashmir: {
    img: 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?w=800&q=85',
    desc: 'Known as "Paradise on Earth", Kashmir offers emerald valleys, snow-capped mountains, Dal Lake shikara rides, and the warmth of Kashmiri culture and cuisine.',
    price: '₹18,499', duration: '7 Days / 6 Nights', rating: '4.9 / 5', best: 'Apr – Jun, Sep – Nov'
  },
  Dubai: {
    img: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800&q=85',
    desc: 'Dubai is a city of superlatives — the tallest tower, the largest mall, and the most thrilling desert safaris. A city that seamlessly merges tradition and futurism.',
    price: '₹42,999', duration: '6 Days / 5 Nights', rating: '4.7 / 5', best: 'Nov – Apr'
  },
  Bali: {
    img: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800&q=85',
    desc: 'Bali enchants with its terraced rice paddies, ornate Hindu temples, vibrant arts scene, and a spiritual energy that makes every moment feel magical.',
    price: '₹38,999', duration: '7 Days / 6 Nights', rating: '4.9 / 5', best: 'Apr – Oct'
  },
  Thailand: {
    img: 'https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?w=800&q=85',
    desc: 'Thailand dazzles with crystal-clear waters, lively floating markets, iconic golden temples, world-class street food, and unforgettable island hopping experiences.',
    price: '₹34,999', duration: '8 Days / 7 Nights', rating: '4.8 / 5', best: 'Nov – Feb'
  },
  Maldives: {
    img: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=800&q=85',
    desc: 'The Maldives is the ultimate luxury retreat — overwater bungalows perched above turquoise lagoons, vibrant coral reefs, and pristine white-sand beaches.',
    price: '₹79,999', duration: '5 Days / 4 Nights', rating: '5.0 / 5', best: 'Nov – Apr'
  },
  Europe: {
    img: 'https://images.unsplash.com/photo-1467269204594-9661b134dd2b?w=800&q=85',
    desc: 'Our Europe Grand Tour covers 6+ countries — from the Eiffel Tower to the Colosseum, the Swiss Alps to the canals of Amsterdam. A continent of infinite wonder awaits.',
    price: '₹1,19,999', duration: '12 Days / 11 Nights', rating: '4.9 / 5', best: 'May – Sep'
  }
};

const modalBackdrop = document.getElementById('modalBackdrop');

window.openModal = function(dest) {
  const data = destData[dest];
  if (!data) return;

  document.getElementById('modalImg').style.backgroundImage = `url('${data.img}')`;
  document.getElementById('modalTitle').textContent = dest;
  document.getElementById('modalDesc').textContent = data.desc;
  document.getElementById('modalDetails').innerHTML = `
    <div class="modal-detail-item"><strong>Starting From</strong>${data.price} / person</div>
    <div class="modal-detail-item"><strong>Duration</strong>${data.duration}</div>
    <div class="modal-detail-item"><strong>Rating</strong>⭐ ${data.rating}</div>
    <div class="modal-detail-item"><strong>Best Time</strong>${data.best}</div>
  `;
  modalBackdrop.classList.add('open');
  document.body.style.overflow = 'hidden';
};

window.closeModal = function() {
  modalBackdrop.classList.remove('open');
  document.body.style.overflow = '';
};

modalBackdrop.addEventListener('click', (e) => {
  if (e.target === modalBackdrop) closeModal();
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeModal();
});

/* ──────────────────────────────────────────
   6. TESTIMONIALS SLIDER
────────────────────────────────────────── */
const track    = document.getElementById('testimonialsTrack');
const prevBtn  = document.getElementById('testiPrev');
const nextBtn  = document.getElementById('testiNext');
let   tetiIndex = 0;

function getCardWidth() {
  const card = track.querySelector('.testi-card');
  if (!card) return 360;
  return card.offsetWidth + 24; // card + gap
}

function scrollTesti(dir) {
  const cards      = track.querySelectorAll('.testi-card');
  const cardWidth  = getCardWidth();
  const maxIndex   = cards.length - Math.floor(track.offsetWidth / cardWidth);

  tetiIndex = Math.max(0, Math.min(tetiIndex + dir, maxIndex));
  track.scrollTo({ left: tetiIndex * cardWidth, behavior: 'smooth' });
}

prevBtn.addEventListener('click', () => scrollTesti(-1));
nextBtn.addEventListener('click', () => scrollTesti(1));

// Auto-advance testimonials
let testiTimer = setInterval(() => scrollTesti(1), 5000);
track.addEventListener('mouseenter', () => clearInterval(testiTimer));
track.addEventListener('mouseleave', () => {
  testiTimer = setInterval(() => scrollTesti(1), 5000);
});

/* ──────────────────────────────────────────
   7. FAQ ACCORDION
────────────────────────────────────────── */
document.querySelectorAll('.faq-q').forEach(btn => {
  btn.addEventListener('click', () => {
    const isOpen = btn.getAttribute('aria-expanded') === 'true';

    // Close all
    document.querySelectorAll('.faq-q').forEach(b => {
      b.setAttribute('aria-expanded', 'false');
      b.nextElementSibling.classList.remove('open');
    });

    // Open clicked if it was closed
    if (!isOpen) {
      btn.setAttribute('aria-expanded', 'true');
      btn.nextElementSibling.classList.add('open');
    }
  });
});

/* ──────────────────────────────────────────
   8. CONTACT FORM VALIDATION
────────────────────────────────────────── */
const contactForm  = document.getElementById('contactForm');
const formSuccess  = document.getElementById('formSuccess');

function validateField(input) {
  const errEl = input.closest('.form-group').querySelector('.err-msg');
  if (!errEl) return true;

  if (input.required && !input.value.trim()) {
    errEl.textContent = 'This field is required.';
    errEl.classList.add('show');
    return false;
  }
  if (input.type === 'email' && input.value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.value)) {
    errEl.textContent = 'Please enter a valid email address.';
    errEl.classList.add('show');
    return false;
  }
  if (input.type === 'tel' && input.value && !/^[\d\s\+\-\(\)]{7,15}$/.test(input.value)) {
    errEl.textContent = 'Please enter a valid phone number.';
    errEl.classList.add('show');
    return false;
  }
  errEl.classList.remove('show');
  return true;
}

contactForm.querySelectorAll('input, select, textarea').forEach(el => {
  el.addEventListener('blur', () => validateField(el));
  el.addEventListener('input', () => {
    const errEl = el.closest('.form-group').querySelector('.err-msg');
    if (errEl) errEl.classList.remove('show');
  });
});

contactForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const fields  = contactForm.querySelectorAll('input[required], select[required]');
  let   isValid = true;

  fields.forEach(field => {
    if (!validateField(field)) isValid = false;
  });

  if (!isValid) return;

  const btn = contactForm.querySelector('button[type="submit"]');
  btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending…';
  btn.disabled = true;

  // Simulate async submit
  setTimeout(() => {
    btn.innerHTML = '<i class="fas fa-paper-plane"></i> Send Enquiry';
    btn.disabled = false;
    contactForm.reset();
    formSuccess.classList.add('show');
    setTimeout(() => formSuccess.classList.remove('show'), 6000);
  }, 1600);
});

/* ──────────────────────────────────────────
   9. NEWSLETTER FORM
────────────────────────────────────────── */
const newsletterForm    = document.getElementById('newsletterForm');
const newsletterSuccess = document.getElementById('newsletterSuccess');

newsletterForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const emailInput = newsletterForm.querySelector('input[type="email"]');
  if (!emailInput.value || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailInput.value)) {
    emailInput.style.borderColor = '#e53e3e';
    return;
  }
  emailInput.style.borderColor = '';
  emailInput.value = '';
  newsletterSuccess.classList.add('show');
  setTimeout(() => newsletterSuccess.classList.remove('show'), 4000);
});

/* ──────────────────────────────────────────
   10. DARK / LIGHT MODE TOGGLE
────────────────────────────────────────── */
const themeToggle = document.getElementById('themeToggle');
const themeIcon   = document.getElementById('themeIcon');
const html        = document.documentElement;

// Persist preference
const savedTheme = localStorage.getItem('10xthink-theme') || 'light';
html.setAttribute('data-theme', savedTheme);
updateThemeIcon(savedTheme);

themeToggle.addEventListener('click', () => {
  const current = html.getAttribute('data-theme');
  const next    = current === 'dark' ? 'light' : 'dark';
  html.setAttribute('data-theme', next);
  localStorage.setItem('10xthink-theme', next);
  updateThemeIcon(next);
});

function updateThemeIcon(theme) {
  themeIcon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
}

/* ──────────────────────────────────────────
   11. BACK TO TOP BUTTON
────────────────────────────────────────── */
const backToTop = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
  if (window.scrollY > 400) {
    backToTop.classList.add('visible');
  } else {
    backToTop.classList.remove('visible');
  }
}, { passive: true });

backToTop.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

/* ──────────────────────────────────────────
   12. SMOOTH ACTIVE NAV LINK HIGHLIGHT
────────────────────────────────────────── */
const sections   = document.querySelectorAll('section[id]');
const navAnchors = document.querySelectorAll('.nav-links a');

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navAnchors.forEach(a => a.classList.remove('active'));
      const active = document.querySelector(`.nav-links a[href="#${entry.target.id}"]`);
      if (active) active.classList.add('active');
    }
  });
}, { threshold: 0.35 });

sections.forEach(s => sectionObserver.observe(s));

/* ──────────────────────────────────────────
   13. SET MIN DATE FOR DATE INPUTS
────────────────────────────────────────── */
const today = new Date().toISOString().split('T')[0];
document.querySelectorAll('input[type="date"]').forEach(input => {
  input.setAttribute('min', today);
});

/* ──────────────────────────────────────────
   14. GALLERY LIGHTBOX (simple)
────────────────────────────────────────── */
document.querySelectorAll('.gallery-item').forEach(item => {
  item.addEventListener('click', () => {
    const img    = item.querySelector('img');
    const label  = item.querySelector('.gallery-hover span')?.textContent || '';
    if (!img) return;

    const lightbox = document.createElement('div');
    lightbox.style.cssText = `
      position:fixed;inset:0;background:rgba(10,37,64,0.92);
      display:flex;flex-direction:column;align-items:center;justify-content:center;
      z-index:3000;padding:24px;cursor:zoom-out;
    `;
    lightbox.innerHTML = `
      <img src="${img.src.replace('w=500','w=1200')}" alt="${img.alt}"
        style="max-width:90%;max-height:82vh;border-radius:12px;object-fit:contain;box-shadow:0 20px 60px rgba(0,0,0,0.5);" />
      <p style="color:#fff;margin-top:16px;font-size:0.95rem;letter-spacing:0.06em;font-weight:600;">${label}</p>
    `;
    lightbox.addEventListener('click', () => lightbox.remove());
    document.body.appendChild(lightbox);
    document.body.style.overflow = 'hidden';
    lightbox.addEventListener('click', () => { document.body.style.overflow = ''; });
  });
});

console.log('%c🌍 10X THINK Tourism', 'color:#00B4D8;font-size:1.2rem;font-weight:bold;');
console.log('%cBuilt with ❤ for extraordinary travel experiences.', 'color:#FFD166;');