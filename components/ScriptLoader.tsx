import { useEffect } from 'react';

export default function ScriptLoader() {
  useEffect(() => {
    // Only run on client-side
    if (typeof window === 'undefined' || typeof document === 'undefined') {
      return;
    }

    // Load scripts sequentially after page is interactive
    const scripts = [
      '/js/jquery.min.js',
      '/js/popper.min.js',
      '/js/bootstrap.min.js',
      '/js/jquery.easing.1.3.js',
      '/js/jquery.waypoints.min.js',
      '/js/owl.carousel.min.js',
      '/js/jquery.magnific-popup.min.js',
      '/js/jquery.animateNumber.min.js',
      '/js/bootstrap-datepicker.js',
      '/js/scrollax.min.js',
      '/js/main.js'
    ];

    let index = 0;

    const loadScript = () => {
      if (index >= scripts.length) return;

      const script = document.createElement('script');
      script.src = scripts[index];
      script.async = false; // Load sequentially, not in parallel
      
      script.onload = () => {
        index++;
        loadScript();
      };

      script.onerror = () => {
        console.warn(`Failed to load ${scripts[index]}`);
        index++;
        loadScript();
      };

      document.body.appendChild(script);
    };

    // Wait for DOM and jQuery availability before loading
    const checkAndLoad = () => {
      if (document.readyState === 'complete' || document.readyState === 'interactive') {
        // Wait a bit more to ensure everything is ready
        setTimeout(loadScript, 100);
      } else {
        setTimeout(checkAndLoad, 50);
      }
    };

    checkAndLoad();
  }, []);

  return null;
}

