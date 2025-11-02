// Safe Stellar initialization for Next.js/React
// Only initialize if jQuery and Stellar are available and DOM is ready
(function() {
  'use strict';
  
  function initStellar() {
    if (typeof jQuery === 'undefined' || typeof jQuery.fn.stellar === 'undefined') {
      return;
    }
    
    try {
      // Only initialize on window/document, not on React components
      if (jQuery(window).length > 0) {
        jQuery(window).stellar({
          responsive: true,
          parallaxBackgrounds: true,
          parallaxElements: true,
          horizontalScrolling: false,
          hideDistantElements: false,
          scrollProperty: 'scroll'
        });
      }
    } catch (e) {
      console.warn('Stellar initialization failed:', e);
      // Silently fail - parallax is not critical
    }
  }
  
  // Wait for DOM to be fully ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
      setTimeout(initStellar, 100);
    });
  } else {
    setTimeout(initStellar, 100);
  }
})();

