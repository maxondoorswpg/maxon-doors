/**
 * MAXON DOORS — Client-side Interactivity & Formspree Integration
 * Master Design System & Dark Luxury Interactive Architecture
 * Verified Formspree Endpoint: mwlpzwll
 */

window.MAXON_FORMSPREE_ID = "mwlpzwll";

// Visualizer Data Store
const DOOR_FINISHES = {
  oak: {
    title: "Natural Oak Woodgrain Flush Door",
    specs: "2\" Heavy-Duty Panel • Continuous R-17.4 Core • Matching Warm Oak Grain Both Sides • In-Stock in Winnipeg",
    img: "assets/images/oak-flush-garage-door.jpg",
    styleVal: "Flush Garage Door — Natural Oak"
  },
  walnut: {
    title: "Dark Walnut Woodgrain Flush Door",
    specs: "2\" Heavy-Duty Panel • Continuous R-17.4 Core • Rich Mocha Walnut Grain Both Sides • In-Stock in Winnipeg",
    img: "assets/images/dark-walnut-garage-door.jpg",
    styleVal: "Flush Garage Door — Dark Walnut"
  },
  black: {
    title: "Modern Midnight Black Flush Door",
    specs: "2\" Heavy-Duty Panel • Continuous R-17.4 Core • Satin Architectural Black Both Sides • In-Stock in Winnipeg",
    img: "assets/images/hero-flush-garage-door.jpg",
    styleVal: "Flush Garage Door — Midnight Black"
  },
  white: {
    title: "Polar White Flush Minimalist Door",
    specs: "2\" Heavy-Duty Panel • Continuous R-17.4 Core • Pure Baked Enamel Finish Inside & Out • In-Stock in Winnipeg",
    img: "assets/images/installed-white-flush-door.jpg",
    styleVal: "Flush Garage Door — Polar White"
  },
  glass: {
    title: "All-Glass / Full-View Architectural Door",
    specs: "Heavy Black Anodized Aluminum • Dual-Pane Insulated Tempered Glass • Modern Showpiece Curb Appeal",
    img: "assets/images/installed-glass-garage-door.jpg",
    styleVal: "All-Glass / Full-View Door"
  }
};

/**
 * 1. Interactive Door Visualizer Swatch Switcher
 */
window.selectDoorSwatch = function(colorKey) {
  const data = DOOR_FINISHES[colorKey];
  if (!data) return;

  const displayImg = document.getElementById('visualizerImg');
  const displayTitle = document.getElementById('visualizerTitle');
  const displaySpecs = document.getElementById('visualizerSpecs');
  const quoteStyleInput = document.getElementById('doorStyle');

  if (displayImg) {
    displayImg.style.opacity = '0';
    setTimeout(() => {
      displayImg.src = data.img;
      displayImg.alt = data.title;
      displayImg.style.opacity = '1';
    }, 180);
  }

  if (displayTitle) displayTitle.textContent = data.title;
  if (displaySpecs) displaySpecs.textContent = data.specs;

  // Active state on buttons
  document.querySelectorAll('.swatch-btn').forEach(btn => {
    btn.classList.toggle('active', btn.getAttribute('data-color') === colorKey);
  });

  // Pre-select in quote form dropdown
  if (quoteStyleInput && data.styleVal) {
    quoteStyleInput.value = data.styleVal;
  }
};

/**
 * 2. Interactive Installed Projects Filter Tabs
 */
window.filterGallery = function(category) {
  // Update active tab style
  document.querySelectorAll('.filter-tab').forEach(tab => {
    tab.classList.toggle('active', tab.getAttribute('data-category') === category);
  });

  // Filter gallery cards
  const cards = document.querySelectorAll('.gallery-card');
  cards.forEach(card => {
    const cardCat = card.getAttribute('data-category') || '';
    if (category === 'all' || cardCat.includes(category)) {
      card.style.display = 'flex';
      setTimeout(() => {
        card.style.opacity = '1';
        card.style.transform = 'translateY(0)';
      }, 50);
    } else {
      card.style.opacity = '0';
      card.style.transform = 'translateY(10px)';
      card.style.display = 'none';
    }
  });
};

/**
 * 3. Quick Quote Pre-fill and Smooth Scroll
 */
window.selectDoorOption = function(style, size) {
  const styleSelect = document.getElementById('doorStyle');
  const sizeSelect = document.getElementById('doorSize');
  const quoteSection = document.getElementById('quote');

  if (styleSelect && style) {
    styleSelect.value = style;
  }
  if (sizeSelect && size) {
    sizeSelect.value = size;
  }
  if (quoteSection) {
    quoteSection.scrollIntoView({ behavior: 'smooth' });
  }
};

/**
 * 4. Financing Pre-fill Helper
 */
window.checkFinancingOption = function() {
  const chk = document.getElementById('financingCheckbox');
  if (chk) chk.checked = true;
  const quoteSection = document.getElementById('quote');
  if (quoteSection) {
    quoteSection.scrollIntoView({ behavior: 'smooth' });
  }
};

document.addEventListener('DOMContentLoaded', () => {
  // Mobile Navigation Drawer Toggle
  const mobileToggle = document.getElementById('mobileToggle');
  const mobileNav = document.getElementById('mobileNav');

  if (mobileToggle && mobileNav) {
    mobileToggle.addEventListener('click', () => {
      const isOpen = mobileNav.classList.toggle('open');
      mobileToggle.setAttribute('aria-expanded', isOpen);
      mobileToggle.innerHTML = isOpen ? `
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <line x1="18" y1="6" x2="6" y2="18"></line>
          <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
      ` : `
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <line x1="3" y1="12" x2="21" y2="12"></line>
          <line x1="3" y1="6" x2="21" y2="6"></line>
          <line x1="3" y1="18" x2="21" y2="18"></line>
        </svg>
      `;
    });

    mobileNav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        mobileNav.classList.remove('open');
        mobileToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // FAQ Accordion & Instant Search Filter
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const questionBtn = item.querySelector('.faq-question');
    if (questionBtn) {
      questionBtn.addEventListener('click', () => {
        const isActive = item.classList.contains('active');
        faqItems.forEach(sib => {
          if (sib !== item) sib.classList.remove('active');
        });
        item.classList.toggle('active', !isActive);
      });
    }
  });

  const faqSearch = document.getElementById('faqSearch');
  if (faqSearch) {
    faqSearch.addEventListener('input', (e) => {
      const term = e.target.value.toLowerCase().trim();
      faqItems.forEach(item => {
        const questionText = item.querySelector('.faq-question')?.textContent.toLowerCase() || '';
        const answerText = item.querySelector('.faq-answer')?.textContent.toLowerCase() || '';
        if (term === '' || questionText.includes(term) || answerText.includes(term)) {
          item.style.display = 'block';
          if (term.length > 2 && (questionText.includes(term) || answerText.includes(term))) {
            item.classList.add('active');
          }
        } else {
          item.style.display = 'none';
        }
      });
    });
  }

  // Formspree Quote Request Form Submission Handler
  const quoteForm = document.getElementById('quoteForm');
  const formAlert = document.getElementById('formAlert');
  const submitBtn = document.getElementById('quoteSubmitBtn');

  if (quoteForm) {
    quoteForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      if (!formAlert) return;

      const formData = new FormData(quoteForm);
      let actionUrl = `https://formspree.io/f/${window.MAXON_FORMSPREE_ID}`;

      // Check permission checkbox
      const consent = quoteForm.querySelector('input[name="consent"]');
      if (consent && !consent.checked) {
        showAlert('Please accept the permission checkbox to receive your quote.', 'error');
        return;
      }

      // Handle attachment for Formspree free tier compatibility
      const fileInput = quoteForm.querySelector('input[type="file"]');
      if (fileInput && (!fileInput.files || fileInput.files.length === 0 || fileInput.files[0].size === 0)) {
        formData.delete('attachment');
      } else if (fileInput && fileInput.files && fileInput.files.length > 0) {
        const origMsg = formData.get('message') || '';
        formData.set('message', origMsg + (origMsg ? '\n\n' : '') + '[Customer has photo/blueprint to share — requested follow-up]');
        formData.delete('attachment');
      }

      // Button loading indicator
      const originalBtnText = submitBtn ? submitBtn.innerHTML : 'Submit Quote Request to Maxon Doors';
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = `
          <svg style="animation: spin 1s linear infinite; display: inline-block; vertical-align: middle; margin-right: 8px;" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="12" cy="12" r="10" stroke-opacity="0.25"></circle>
            <path d="M12 2a10 10 0 0 1 10 10" stroke-linecap="round"></path>
          </svg>
          Submitting Quote Request...
        `;
      }

      try {
        const response = await fetch(actionUrl, {
          method: 'POST',
          body: formData,
          headers: {
            'Accept': 'application/json'
          }
        });

        if (response.ok) {
          showAlert(`
            <div style="font-size:1.1rem; font-weight:800; margin-bottom:0.4rem; color:#34d399;">
              Quote Request Confirmed!
            </div>
            <div>
              Thank you, <strong>${formData.get('name') || 'Customer'}</strong>! Your quote request has been transmitted directly to Maxon Doors Winnipeg at <strong>maxondoorswpg@gmail.com</strong>.<br>
              A garage door specialist will contact you at <strong>${formData.get('phone') || 'your phone number'}</strong> with direct warehouse pricing.<br>
              For immediate questions, call our 50 Mandalay Drive showroom at <a href="tel:4313744129" style="text-decoration:underline; font-weight:bold; color:var(--accent-gold);">(431) 374-4129</a>.
            </div>
          `, 'success');
          quoteForm.reset();
        } else {
          const mailtoSubject = encodeURIComponent("Maxon Doors Quote Request - " + (formData.get('name') || 'Customer'));
          const mailtoBody = encodeURIComponent(
            `Name: ${formData.get('name')}\nPhone: ${formData.get('phone')}\nEmail: ${formData.get('email')}\nStyle: ${formData.get('door_style')}\nSize: ${formData.get('door_size')}\nAddress: ${formData.get('address') || 'N/A'}\nFinancing: ${formData.get('financing_interested') || 'No'}\nMessage: ${formData.get('message') || 'N/A'}`
          );
          showAlert(`
            <div style="font-size:1.1rem; font-weight:800; margin-bottom:0.4rem; color:var(--accent-gold);">
              Quote Details Ready to Send!
            </div>
            <div>
              We received your form input. To ensure instant delivery to our dispatch desk, <a href="mailto:maxondoorswpg@gmail.com?subject=${mailtoSubject}&body=${mailtoBody}" style="text-decoration:underline; font-weight:bold; color:#ffffff;">Click Here to Email Directly to maxondoorswpg@gmail.com</a>, or call our Winnipeg showroom at <a href="tel:4313744129" style="font-weight:bold; color:var(--accent-gold);">(431) 374-4129</a>.
            </div>
          `, 'success');
        }
      } catch (err) {
        const mailtoSubject = encodeURIComponent("Maxon Doors Quote Request - " + (formData.get('name') || 'Customer'));
        const mailtoBody = encodeURIComponent(
          `Name: ${formData.get('name')}\nPhone: ${formData.get('phone')}\nEmail: ${formData.get('email')}\nStyle: ${formData.get('door_style')}\nSize: ${formData.get('door_size')}\nAddress: ${formData.get('address') || 'N/A'}\nFinancing: ${formData.get('financing_interested') || 'No'}\nMessage: ${formData.get('message') || 'N/A'}`
        );
        showAlert(`
          <div style="font-size:1.1rem; font-weight:800; margin-bottom:0.4rem; color:var(--accent-gold);">
            Quote Details Prepared
          </div>
          <div>
            Please <a href="mailto:maxondoorswpg@gmail.com?subject=${mailtoSubject}&body=${mailtoBody}" style="text-decoration:underline; font-weight:bold; color:#ffffff;">Click Here to Send Directly to maxondoorswpg@gmail.com</a>, or call us at <a href="tel:4313744129" style="font-weight:bold; color:var(--accent-gold);">(431) 374-4129</a>.
          </div>
        `, 'success');
      } finally {
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.innerHTML = originalBtnText;
        }
      }
    });
  }

  function showAlert(message, type) {
    if (!formAlert) return;
    formAlert.innerHTML = message;
    formAlert.className = 'form-alert ' + (type === 'success' ? 'form-alert-success' : 'form-alert-error');
    formAlert.style.display = 'block';
    formAlert.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }

  // Phone Click Event Tracking Helper
  document.querySelectorAll('a[href^="tel:"]').forEach(telLink => {
    telLink.addEventListener('click', () => {
      const phoneNumber = telLink.getAttribute('href').replace('tel:', '');
      if (window.dataLayer) {
        window.dataLayer.push({
          event: 'phone_click',
          phone_number: phoneNumber,
          click_location: window.location.pathname
        });
      }
    });
  });
});
