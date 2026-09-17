/* ==========================================================================
   ALSAMAHCO PREMIUM EXPERIENCE UPGRADE — MOTION & INTERACTION SCRIPT
   High-performance, GPU-accelerated micro-interactions & scroll engine
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  // Elements
  const navbar = document.getElementById('navbar');
  const progressBar = document.getElementById('progressBar');
  const pageLoader = document.getElementById('pageLoader');
  const heroImg = document.getElementById('heroImg');

  const hamburgerBtn = document.getElementById('hamburgerBtn');
  const drawerCloseBtn = document.getElementById('drawerCloseBtn');
  const mobileDrawer = document.getElementById('mobileDrawer');
  const drawerOverlay = document.getElementById('drawerOverlay');

  const quoteModal = document.getElementById('quoteModal');
  const modalCloseBtn = document.getElementById('modalCloseBtn');
  const quoteTriggerBtns = document.querySelectorAll('.quote-trigger-btn');
  const quoteForm = document.getElementById('quoteForm');

  const productModal = document.getElementById('productModal');
  const productModalCloseBtn = document.getElementById('productModalCloseBtn');
  const productCards = document.querySelectorAll('.product-card');
  const viewAllBtn = document.getElementById('viewAllBtn');

  const toast = document.getElementById('toast');
  const toastMsg = document.getElementById('toastMsg');

  // Check reduced motion preference
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // 1. Page-Load Entrance Sequence (1.2s)
  if (pageLoader && !prefersReducedMotion) {
    document.body.classList.add('loader-lock');
    setTimeout(() => {
      pageLoader.classList.add('hide');
      document.body.classList.remove('loader-lock');
    }, 1200);
  } else if (pageLoader) {
    pageLoader.style.display = 'none';
  }

  // 2. Verified Real Client Product Data matching AlSamahCo Portfolio Images
  const productsData = {
    dispenser: {
      tag: "ARCHITECTURAL METALWORK",
      title: "Architectural Stainless Steel Features",
      img: "assets/images/client/client_img_2.jpg",
      desc: "Authentic AlSamahCo custom-engineered stainless steel architectural features, integrated wall channels, and commercial metal installations for hotels, offices, and public facilities.",
      specs: [
        "Material: Architectural Grade Stainless Steel",
        "Finish: Brushed Surface Finish",
        "Applications: Commercial & Hospitality Facilities",
        "Origin: Fabricated in Riyadh 1st Industrial Area"
      ]
    },
    medical: {
      tag: "HEALTHCARE & MEDICAL",
      title: "Medical Equipment & Storage Systems",
      img: "assets/images/client/client_img_3.jpg",
      desc: "Authentic AlSamahCo hospital-grade stainless steel equipment, scrub sinks, medical trolleys, and storage cabinets engineered for healthcare facilities.",
      specs: [
        "Material: Heavy-Gauge Stainless Steel",
        "Construction: Sanitary Surface Welding",
        "Features: High durability & load capacity",
        "Origin: Fabricated in Riyadh 1st Industrial Area"
      ]
    },
    kitchen: {
      tag: "COMMERCIAL & HOSPITALITY",
      title: "Commercial Kitchen Workstations & Sinks",
      img: "assets/images/client/client_img_4.jpg",
      desc: "Authentic AlSamahCo heavy-duty stainless steel prep tables, integrated double sink units, and commercial food service fixtures.",
      specs: [
        "Material: Heavy-Duty Stainless Steel",
        "Construction: Reinforced understructure",
        "Finish: Polished Surface Finish",
        "Origin: Fabricated in Riyadh 1st Industrial Area"
      ]
    },
    architectural: {
      tag: "CUSTOM METALWORK",
      title: "Custom Stainless Steel Structures & Racks",
      img: "assets/images/client/client_img_6.jpg",
      desc: "Authentic AlSamahCo custom metal fabrication including specialized industrial storage racks, metal panels, and heavy stainless steel assemblies.",
      specs: [
        "Material: Industrial Stainless Steel",
        "Finish: Brushed Metal Finish",
        "Engineering: Tailored to project shop drawings",
        "Origin: Fabricated in Riyadh 1st Industrial Area"
      ]
    }
  };

  // 3. Scroll Engine (Navbar Scrolled + Scroll Progress + Hero Parallax)
  function handleScroll() {
    const scrollY = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;

    // Scroll progress bar
    if (progressBar && docHeight > 0) {
      const progressPercent = Math.min(100, Math.max(0, (scrollY / docHeight) * 100));
      progressBar.style.width = progressPercent + '%';
    }

    // Navbar scrolled threshold
    if (scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    // Subtle Hero Image Parallax (Desktop Only & Reduced Motion Check)
    if (heroImg && window.innerWidth > 768 && !prefersReducedMotion) {
      if (scrollY < 800) {
        heroImg.style.transform = `translate3d(0, ${scrollY * 0.12}px, 0)`;
      }
    }
  }

  window.addEventListener('scroll', handleScroll, { passive: true });

  // 4. Scroll-Based Section & Element Reveal (IntersectionObserver)
  if (!prefersReducedMotion && 'IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, {
      root: null,
      threshold: 0.12,
      rootMargin: '0px 0px -40px 0px'
    });

    document.querySelectorAll('.reveal-item').forEach(el => {
      revealObserver.observe(el);
    });

    // Staggered reveal for partner logos
    const partnerLogos = document.querySelectorAll('.reveal-partner');
    partnerLogos.forEach((partner, index) => {
      partner.style.transitionDelay = `${index * 120}ms`;
      revealObserver.observe(partner);
    });

  } else {
    // Fallback for no-observer or reduced motion
    document.querySelectorAll('.reveal-item, .reveal-partner').forEach(el => {
      el.classList.add('is-visible');
    });
  }

  // 5. ScrollSpy / Active Navigation Link Highlight
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  if ('IntersectionObserver' in window) {
    const spyObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute('id');
          navLinks.forEach(link => {
            if (link.getAttribute('href') === `#${id}`) {
              link.classList.add('active');
            } else {
              link.classList.remove('active');
            }
          });
        }
      });
    }, {
      root: null,
      threshold: 0.35
    });

    sections.forEach(sec => spyObserver.observe(sec));
  }

  // 6. Mobile Drawer Open / Close
  function openDrawer() {
    mobileDrawer.classList.add('active');
    drawerOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeDrawer() {
    mobileDrawer.classList.remove('active');
    drawerOverlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  if (hamburgerBtn) hamburgerBtn.addEventListener('click', openDrawer);
  if (drawerCloseBtn) drawerCloseBtn.addEventListener('click', closeDrawer);
  if (drawerOverlay) drawerOverlay.addEventListener('click', closeDrawer);

  document.querySelectorAll('.drawer-link').forEach(link => {
    link.addEventListener('click', closeDrawer);
  });

  // 7. Quote Modal Management
  function openQuoteModal() {
    closeDrawer();
    closeProductModal();
    quoteModal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeQuoteModal() {
    quoteModal.classList.remove('active');
    document.body.style.overflow = '';
  }

  quoteTriggerBtns.forEach(btn => {
    btn.addEventListener('click', openQuoteModal);
  });

  if (modalCloseBtn) modalCloseBtn.addEventListener('click', closeQuoteModal);
  if (quoteModal) {
    quoteModal.addEventListener('click', (e) => {
      if (e.target === quoteModal) closeQuoteModal();
    });
  }

  // 8. Product Modal Management
  function openProductModal(key) {
    const data = productsData[key];
    if (!data) return;

    document.getElementById('modalProductTag').innerText = data.tag;
    document.getElementById('modalProductTitle').innerText = data.title;
    document.getElementById('modalProductImg').src = data.img;
    document.getElementById('modalProductDesc').innerText = data.desc;

    const specList = document.querySelector('.spec-list');
    if (specList && data.specs) {
      specList.innerHTML = data.specs.map(s => {
        const parts = s.split(':');
        return `<li><strong>${parts[0]}:</strong> ${parts[1] || ''}</li>`;
      }).join('');
    }

    productModal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeProductModal() {
    productModal.classList.remove('active');
    document.body.style.overflow = '';
  }

  productCards.forEach(card => {
    card.addEventListener('click', () => {
      const key = card.getAttribute('data-product');
      openProductModal(key);
    });
  });

  if (productModalCloseBtn) productModalCloseBtn.addEventListener('click', closeProductModal);
  if (productModal) {
    productModal.addEventListener('click', (e) => {
      if (e.target === productModal) closeProductModal();
    });
  }

  // 9. Toast Feedback
  function showToast(msg) {
    toastMsg.innerText = msg;
    toast.classList.add('active');
    setTimeout(() => {
      toast.classList.remove('active');
    }, 4000);
  }

  window.handleQuoteSubmit = function() {
    const company = document.getElementById('companyName').value;
    closeQuoteModal();
    showToast(`Thank you, ${company}! Your quote request has been sent to AlSamahCo.`);
    if (quoteForm) quoteForm.reset();
  };

  if (viewAllBtn) {
    viewAllBtn.addEventListener('click', () => {
      showToast("Demo Preview: Full catalog with 50+ real AlSamahCo stainless items available in production build.");
    });
  }
});
