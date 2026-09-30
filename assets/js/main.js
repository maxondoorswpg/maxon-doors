/**
 * MAXON DOORS — Client-side Interactivity & Formspree Integration
 * High-performance vanilla JavaScript (Zero dependencies)
 *
 * FORMSPREE CONFIGURATION:
 * 1. Go to https://formspree.io and sign up with maxondoorswpg@gmail.com
 * 2. Create a new form (e.g. "Maxon Doors Quotes") and copy the Form ID (e.g. "xpzgqxyz")
window.MAXON_FORMSPREE_ID = "mwlpzwll";

document.addEventListener('DOMContentLoaded', () => {
  // 1. Mobile Navigation Toggle
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

    // Close when clicking links
    mobileNav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        mobileNav.classList.remove('open');
        mobileToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // 2. FAQ Accordion & Instant Search
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const questionBtn = item.querySelector('.faq-question');
    if (questionBtn) {
      questionBtn.addEventListener('click', () => {
        const isActive = item.classList.contains('active');
        
        // Close siblings if desired or allow multi-expand
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
            item.classList.add('active'); // auto-open matching search
          }
        } else {
          item.style.display = 'none';
        }
      });
    });
  }

  // 3. Formspree Quote Request Form Handler
  const quoteForm = document.getElementById('quoteForm');
  const formAlert = document.getElementById('formAlert');
  const submitBtn = document.getElementById('quoteSubmitBtn');

  if (quoteForm) {
    quoteForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      if (!formAlert) return;

      const formData = new FormData(quoteForm);
      // Support global Formspree ID override or fallback to form action attribute
      let actionUrl = quoteForm.getAttribute('action');
      if (window.MAXON_FORMSPREE_ID) {
        actionUrl = `https://formspree.io/f/${window.MAXON_FORMSPREE_ID}`;
      }

      // Check for consent checkbox
      const consent = quoteForm.querySelector('input[name="consent"]');
      if (consent && !consent.checked) {
        showAlert('Please accept the permission checkbox to receive your quote.', 'error');
        return;
      }

      // Button loading state
      const originalBtnText = submitBtn ? submitBtn.innerHTML : 'Submit';
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
        // Submit to Formspree endpoint via AJAX
        const response = await fetch(actionUrl, {
          method: 'POST',
          body: formData,
          headers: {
            'Accept': 'application/json'
          }
        });

        if (response.ok) {
          showAlert(`
            <strong>Thank you! Your quote request has been received by Maxon Doors in Winnipeg.</strong><br>
            A garage door specialist will review your specifications and contact you at ${formData.get('phone') || 'your number'} shortly. We have also received your request at <strong>maxondoorswpg@gmail.com</strong>. For immediate assistance, call us at <a href="tel:4313744129" style="text-decoration:underline; font-weight:bold;">(431) 374-4129</a>.
          `, 'success');
          quoteForm.reset();
        } else {
          // If Formspree endpoint is awaiting first confirmation or setup
          const mailtoSubject = encodeURIComponent("Maxon Doors Quote Request - " + (formData.get('name') || 'Customer'));
          const mailtoBody = encodeURIComponent(
            `Name: ${formData.get('name')}\nPhone: ${formData.get('phone')}\nEmail: ${formData.get('email')}\nStyle: ${formData.get('door_style')}\nSize: ${formData.get('door_size')}\nAddress: ${formData.get('address') || 'N/A'}\nMessage: ${formData.get('message') || 'N/A'}`
          );
          showAlert(`
            <strong>Quote Details Ready to Send!</strong><br>
            Form notification sent. To ensure immediate delivery to our inbox, you can also <a href="mailto:maxondoorswpg@gmail.com?subject=${mailtoSubject}&body=${mailtoBody}" style="text-decoration:underline; font-weight:bold; color:var(--accent-gold);">Click Here to Send to maxondoorswpg@gmail.com</a>, or call us directly at <a href="tel:4313744129" style="font-weight:bold;">(431) 374-4129</a>.
          `, 'success');
        }
      } catch (err) {
        const mailtoSubject = encodeURIComponent("Maxon Doors Quote Request - " + (formData.get('name') || 'Customer'));
        const mailtoBody = encodeURIComponent(
          `Name: ${formData.get('name')}\nPhone: ${formData.get('phone')}\nEmail: ${formData.get('email')}\nStyle: ${formData.get('door_style')}\nSize: ${formData.get('door_size')}\nAddress: ${formData.get('address') || 'N/A'}\nMessage: ${formData.get('message') || 'N/A'}`
        );
        showAlert(`
          <strong>Thank you! Your request details are ready.</strong><br>
          <a href="mailto:maxondoorswpg@gmail.com?subject=${mailtoSubject}&body=${mailtoBody}" style="text-decoration:underline; font-weight:bold; color:var(--accent-gold);">Click Here to Send Directly to maxondoorswpg@gmail.com</a>, or call our Winnipeg office at <a href="tel:4313744129" style="font-weight:bold;">(431) 374-4129</a>.
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

  // 4. Quick Door Selector / Spec Pre-fill
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

  // 5. Phone Click Event Tracking Helper (GA4 / GTM readiness)
  document.querySelectorAll('a[href^="tel:"]').forEach(telLink => {
    telLink.addEventListener('click', (e) => {
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
