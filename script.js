
// ── Navbar: scroll behavior ──────────────────
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
  if (window.scrollY > 20) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
}, { passive: true });

// ── Mobile Nav Toggle ────────────────────────
const navToggle   = document.getElementById('nav-toggle');
const navMobile   = document.getElementById('nav-mobile');
let mobileNavOpen = false;

function openMobileNav() {
  mobileNavOpen = true;
  navMobile.classList.add('open');
  navToggle.classList.add('open');
  navToggle.setAttribute('aria-expanded', 'true');
  navMobile.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
}

function closeMobileNav() {
  mobileNavOpen = false;
  navMobile.classList.remove('open');
  navToggle.classList.remove('open');
  navToggle.setAttribute('aria-expanded', 'false');
  navMobile.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}

navToggle.addEventListener('click', () => {
  mobileNavOpen ? closeMobileNav() : openMobileNav();
});

// Close on outside click
document.addEventListener('click', (e) => {
  if (mobileNavOpen && !navMobile.contains(e.target) && !navToggle.contains(e.target)) {
    closeMobileNav();
  }
});

// Close on Escape
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && mobileNavOpen) closeMobileNav();
});

// ── Scroll-into-view Animations ──────────────
const fadeElements = document.querySelectorAll('.fade-in');

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.12,
  rootMargin: '0px 0px -40px 0px'
});

fadeElements.forEach(el => observer.observe(el));

// ── Active Nav Link on Scroll ─────────────────
const sections    = document.querySelectorAll('section[id]');
const navLinks    = document.querySelectorAll('.nav-links a:not(.nav-cta)');

function updateActiveNav() {
  const scrollY = window.scrollY;

  sections.forEach(section => {
    const sectionTop    = section.offsetTop - 120;
    const sectionBottom = sectionTop + section.offsetHeight;

    if (scrollY >= sectionTop && scrollY < sectionBottom) {
      navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${section.id}`) {
          link.classList.add('active');
        }
      });
    }
  });
}

window.addEventListener('scroll', updateActiveNav, { passive: true });



// ── Smooth scroll for all anchor links ───────
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', (e) => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    const offset = navbar.offsetHeight + 16;
    const top    = target.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top, behavior: 'smooth' });
  });
});

// ── Skill items: stagger animation on scroll ──
const skillGrid = document.querySelector('.skills-grid');
if (skillGrid) {
  const skillObserver = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) {
      const items = skillGrid.querySelectorAll('.skill-tag');
      items.forEach((item, i) => {
        setTimeout(() => {
          item.style.opacity   = '1';
          item.style.transform = 'translateY(0)';
        }, i * 60);
      });
      skillObserver.unobserve(skillGrid);
    }
  }, { threshold: 0.15 });

  skillGrid.querySelectorAll('.skill-tag').forEach(item => {
    item.style.opacity    = '0';
    item.style.transform  = 'translateY(16px)';
    item.style.transition = 'opacity 0.4s ease, transform 0.4s ease, box-shadow 0.3s, border-color 0.3s';
  });

  skillObserver.observe(skillGrid);
}

// ── Bento cards: stagger animation ───────────
const bentoGrid = document.querySelector('.bento-grid');
if (bentoGrid) {
  const bentoObserver = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) {
      const cards = bentoGrid.querySelectorAll('.bento-card');
      cards.forEach((card, i) => {
        setTimeout(() => {
          card.style.opacity   = '1';
          card.style.transform = 'translateY(0)';
        }, i * 80);
      });
      bentoObserver.unobserve(bentoGrid);
    }
  }, { threshold: 0.15 });

  bentoGrid.querySelectorAll('.bento-card').forEach(card => {
    card.style.opacity    = '0';
    card.style.transform  = 'translateY(16px)';
    card.style.transition = 'opacity 0.4s ease, transform 0.4s ease, box-shadow 0.3s, border-color 0.3s';
  });

  bentoObserver.observe(bentoGrid);
}
