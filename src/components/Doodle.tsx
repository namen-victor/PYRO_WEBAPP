"use client";

import React from 'react';

export interface DoodleProps {
  src: string;
  alt: string;
  position: 'bottom-left' | 'bottom-right' | 'middle-left' | 'middle-right' | 'top-left' | 'top-right' | 'bottom-center' | 'top-center';
  offset?: { x?: number; y?: number }; // Fine-tune positioning in pixels
  mobilePosition?: 'hidden' | 'bottom-center' | 'top-center';
  mobileScale?: number; // Scale for mobile (default 0.5)
  desktopScale?: number; // Scale for desktop (default 1)
  zIndex?: number; // Custom z-index (default 1)
  maxWidth?: number | string; // Optional: override default max width
  className?: string;
}

export const Doodle: React.FC<DoodleProps> = ({
  src,
  alt,
  position,
  offset = { x: 0, y: 0 },
  mobilePosition = 'bottom-center',
  mobileScale = 0.5,
  desktopScale = 1,
  zIndex = 1,
  maxWidth,
  className = ''
}) => {
  const getPositionStyles = (): React.CSSProperties => {
    const baseStyles: React.CSSProperties = {
      position: 'absolute',
      pointerEvents: 'none',
      zIndex,
      transition: 'all 0.3s ease-out',
      willChange: 'transform',
      maxWidth: maxWidth ?? '320px', // Allow override for extra-wide SVGs
      height: 'auto'
    };

    // Desktop positioning - closer to forms
    switch (position) {
      case 'bottom-left':
        return {
          ...baseStyles,
          bottom: `${20 + (offset.y || 0)}px`, // Closer: 20px instead of 40px
          left: `${20 + (offset.x || 0)}px`, // Closer: 20px instead of 60px
          transform: `scale(${desktopScale})`,
          transformOrigin: 'bottom left'
        };
      case 'bottom-right':
        return {
          ...baseStyles,
          bottom: `${20 + (offset.y || 0)}px`,
          right: `${20 + (offset.x || 0)}px`,
          transform: `scale(${desktopScale})`,
          transformOrigin: 'bottom right'
        };
      case 'middle-left':
        return {
          ...baseStyles,
          top: `calc(50% + ${offset.y || 0}px)`,
          left: `${20 + (offset.x || 0)}px`,
          transform: `translateY(-50%) scale(${desktopScale})`,
          transformOrigin: 'center left'
        };
      case 'middle-right':
        return {
          ...baseStyles,
          top: `calc(50% + ${offset.y || 0}px)`,
          right: `${20 + (offset.x || 0)}px`,
          transform: `translateY(-50%) scale(${desktopScale})`,
          transformOrigin: 'center right'
        };
      case 'top-left':
        return {
          ...baseStyles,
          top: `${20 + (offset.y || 0)}px`,
          left: `${20 + (offset.x || 0)}px`,
          transform: `scale(${desktopScale})`,
          transformOrigin: 'top left'
        };
      case 'top-right':
        return {
          ...baseStyles,
          top: `${20 + (offset.y || 0)}px`,
          right: `${20 + (offset.x || 0)}px`,
          transform: `scale(${desktopScale})`,
          transformOrigin: 'top right'
        };
      case 'bottom-center':
        return {
          ...baseStyles,
          bottom: `${20 + (offset.y || 0)}px`,
          left: '50%',
          transform: `translateX(-50%) scale(${desktopScale})`,
          transformOrigin: 'bottom center'
        };
      case 'top-center':
        return {
          ...baseStyles,
          top: `${20 + (offset.y || 0)}px`,
          left: '50%',
          transform: `translateX(-50%) scale(${desktopScale})`,
          transformOrigin: 'top center'
        };
      default:
        return baseStyles;
    }
  };

  const getMobilePositionClass = () => {
    if (mobilePosition === 'hidden') {
      return 'doodle-mobile-hidden';
    }
    return `doodle-mobile-${mobilePosition}`;
  };

  return (
    <>
      <style>{`
        @media (max-width: 768px) {
          .doodle-mobile-hidden {
            display: none !important;
          }
          
          .doodle-mobile-bottom-center {
            bottom: 20px !important;
            left: 50% !important;
            right: auto !important;
            top: auto !important;
            transform: translateX(-50%) scale(${mobileScale}) !important;
            max-width: 150px !important;
          }
          
          .doodle-mobile-top-center {
            top: 20px !important;
            left: 50% !important;
            right: auto !important;
            bottom: auto !important;
            transform: translateX(-50%) scale(${mobileScale}) !important;
            max-width: 150px !important;
          }
        }
      `}</style>
      <img
        src={src}
        alt={alt}
        style={getPositionStyles()}
        className={`${getMobilePositionClass()} ${className}`}
      />
    </>
  );
};


