import React from 'react';
import { Toaster } from 'sonner';
import 'tailwindcss/tailwind.css';

const SonnerToast: React.FC = () => {
  return (
    <div className="fixed bottom-6 right-6 z-50">
      <Toaster position="bottom-right" />
    </div>
  );
};

export default SonnerToast;
