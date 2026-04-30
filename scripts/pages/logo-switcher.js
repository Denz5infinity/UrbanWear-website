/**
 * Logo Switcher - Handles dual-logo branding system for UrbanWear
 * - Homepage: Uses detailed logo (90-110px)
 * - Other pages: Uses text logo (35-50px)
 */

(function() {
  'use strict';

  function initLogoSizer() {
    const brand = document.querySelector('.brand');
    
    if (!brand) return;

    const pageType = brand.getAttribute('data-page');
    
    // Set data attribute for CSS media queries to use
    if (pageType) {
      document.documentElement.setAttribute('data-page', pageType);
    }

    // Handle responsive behavior
    function updateLogoClass() {
      const width = window.innerWidth;
      
      if (pageType === 'home') {
        // Homepage: 90-110px on desktop, 70-80px on tablet, 60px on mobile
        if (width >= 1024) {
          brand.classList.remove('logo-tablet', 'logo-mobile');
          brand.classList.add('logo-desktop');
        } else if (width >= 768) {
          brand.classList.remove('logo-desktop', 'logo-mobile');
          brand.classList.add('logo-tablet');
        } else {
          brand.classList.remove('logo-desktop', 'logo-tablet');
          brand.classList.add('logo-mobile');
        }
      } else {
        // Other pages: 35-50px on desktop, 30-40px on tablet, 28px on mobile
        if (width >= 768) {
          brand.classList.remove('logo-mobile');
          brand.classList.add('logo-desktop');
        } else {
          brand.classList.remove('logo-desktop');
          brand.classList.add('logo-mobile');
        }
      }
    }

    // Initial setup
    updateLogoClass();

    // Update on window resize
    let resizeTimer;
    window.addEventListener('resize', function() {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(updateLogoClass, 250);
    });
  }

  // Run when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initLogoSizer);
  } else {
    initLogoSizer();
  }
})();
