'use client';

import { useEffect } from 'react';
import FingerprintJS from '@fingerprintjs/fingerprintjs';

export default function FingerprintTracker() {
  useEffect(() => {
    let isMounted = true;

    async function getFingerprint() {
      try {
        // Initialize FingerprintJS
        const fp = await FingerprintJS.load();
        
        // Get the visitor identifier
        const result = await fp.get();
        const visitorId = result.visitorId;
        
        // Get additional fingerprint data
        const fingerprintData = {
          visitorId,
          timestamp: new Date().toISOString(),
          url: window.location.href,
          path: window.location.pathname,
          userAgent: navigator.userAgent,
          language: navigator.language,
          platform: navigator.platform,
          screenWidth: window.screen.width,
          screenHeight: window.screen.height,
          timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        };

        // Log to API
        if (isMounted) {
          await fetch('/api/log-visitor', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(fingerprintData),
          }).catch((error) => {
            // Silently fail - don't interrupt user experience
            console.error('Failed to log visitor fingerprint:', error);
          });
        }
      } catch (error) {
        // Silently fail - don't interrupt user experience
        console.error('FingerprintJS error:', error);
      }
    }

    // Run fingerprinting
    getFingerprint();

    return () => {
      isMounted = false;
    };
  }, []);

  return null; // This component doesn't render anything
}

















