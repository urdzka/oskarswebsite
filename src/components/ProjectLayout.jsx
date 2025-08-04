// src/components/ProjectLayout.jsx

import React from 'react';
import { GlassRippleButton } from './GlassRippleButton';

// This component wraps any project page to give it a consistent layout and back button.
export const ProjectLayout = ({ children, onBack, onMouseEnter, onMouseLeave }) => {
  return (
    // Main container with padding and a fade-in animation on load
    <div className="animate-fadeIn max-w-7xl mx-auto px-4">
      {/* --- Back Navigation --- */}
      <div className="mb-12">
        {/* Using GlassRippleButton with the ORIGINAL classes, no extra styling added. */}
        <GlassRippleButton
          onClick={onBack}
          onMouseEnter={() => onMouseEnter('Back')}
          onMouseLeave={onMouseLeave}
          className="group flex items-center gap-2 text-sm text-brown-muted dark:text-neutral-500 hover:text-brown-text dark:hover:text-neutral-200 transition-colors duration-300"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 transform transition-transform duration-300 group-hover:-translate-x-1"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          <span>Back to Work</span>
        </GlassRippleButton>
      </div>

      {/* The actual page content will be rendered here */}
      <main>
        {children}
      </main>
    </div>
  );
};