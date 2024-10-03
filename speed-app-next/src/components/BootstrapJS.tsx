'use client'; // This ensures that the component is client-side

import { useEffect } from 'react';

export default function BootstrapJS() {
  useEffect(() => {
    // Dynamically import Bootstrap JavaScript bundle only on the client-side
    import('bootstrap/dist/js/bootstrap.bundle')
      .then(() => {
        console.log('Bootstrap JS loaded');
      })
      .catch((err) => console.error('Error loading Bootstrap JS:', err));
  }, []);

  return null; // This component doesn't render anything
}
