"use client";

import React, { useEffect, useRef, useState } from 'react';

type AnchorPosition =
  | 'bottom-left'
  | 'bottom-right'
  | 'top-left'
  | 'top-right'
  | 'middle-left'
  | 'middle-right';

export interface DoodleDevOverlayProps {
  src: string;
  alt: string;
  position: AnchorPosition;
  initialOffset?: { x: number; y: number };
  initialScale?: number;
  maxWidth?: number | string; // mirrors Doodle maxWidth override
}

// This development-only overlay matches Doodle.tsx positioning exactly for supported anchors
export const DoodleDevOverlay: React.FC<DoodleDevOverlayProps> = ({
  src,
  alt,
  position,
  initialOffset = { x: 0, y: 0 },
  initialScale = 0.6,
  maxWidth
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [offset, setOffset] = useState(initialOffset);
  const [scale, setScale] = useState(initialScale);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging || !imgRef.current) return;

      const card = imgRef.current.parentElement;
      if (!card) return;

      const rect = card.getBoundingClientRect();
      const mouseX = e.clientX;
      const mouseY = e.clientY;

      // Base offset used by the Doodle component
      const BASE = 20;

      switch (position) {
        case 'bottom-right': {
          const relRight = rect.right - mouseX;
          const relBottom = rect.bottom - mouseY;
          setOffset({ x: Math.round(relRight - BASE), y: Math.round(relBottom - BASE) });
          break;
        }
        case 'bottom-left': {
          const relLeft = mouseX - rect.left;
          const relBottom = rect.bottom - mouseY;
          setOffset({ x: Math.round(relLeft - BASE), y: Math.round(relBottom - BASE) });
          break;
        }
        case 'top-right': {
          const relRight = rect.right - mouseX;
          const relTop = mouseY - rect.top;
          setOffset({ x: Math.round(relRight - BASE), y: Math.round(relTop - BASE) });
          break;
        }
        case 'top-left': {
          const relLeft = mouseX - rect.left;
          const relTop = mouseY - rect.top;
          setOffset({ x: Math.round(relLeft - BASE), y: Math.round(relTop - BASE) });
          break;
        }
        case 'middle-left': {
          const relLeft = mouseX - rect.left;
          const relCenterY = mouseY - rect.top - rect.height / 2;
          setOffset({ x: Math.round(relLeft - BASE), y: Math.round(relCenterY) });
          break;
        }
        case 'middle-right': {
          const relRight = rect.right - mouseX;
          const relCenterY = mouseY - rect.top - rect.height / 2;
          setOffset({ x: Math.round(relRight - BASE), y: Math.round(relCenterY) });
          break;
        }
      }
    };

    const handleMouseUp = () => setIsDragging(false);

    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, position]);

  const getPositionStyles = (): React.CSSProperties => {
    const base: React.CSSProperties = {
      position: 'absolute',
      pointerEvents: 'auto',
      zIndex: 10,
      transition: 'all 0.3s ease-out',
      willChange: 'transform',
      maxWidth: maxWidth ?? '320px',
      height: 'auto',
      transform: `scale(${scale})`,
      cursor: isDragging ? 'grabbing' : 'grab'
    };

    switch (position) {
      case 'bottom-left':
        return { ...base, bottom: `${20 + offset.y}px`, left: `${20 + offset.x}px`, transformOrigin: 'bottom left' };
      case 'bottom-right':
        return { ...base, bottom: `${20 + offset.y}px`, right: `${20 + offset.x}px`, transformOrigin: 'bottom right' };
      case 'top-left':
        return { ...base, top: `${20 + offset.y}px`, left: `${20 + offset.x}px`, transformOrigin: 'top left' };
      case 'top-right':
        return { ...base, top: `${20 + offset.y}px`, right: `${20 + offset.x}px`, transformOrigin: 'top right' };
      case 'middle-left':
        return { ...base, top: `calc(50% + ${offset.y}px)`, left: `${20 + offset.x}px`, transform: `translateY(-50%) scale(${scale})`, transformOrigin: 'center left' };
      case 'middle-right':
        return { ...base, top: `calc(50% + ${offset.y}px)`, right: `${20 + offset.x}px`, transform: `translateY(-50%) scale(${scale})`, transformOrigin: 'center right' };
      default:
        return base;
    }
  };

  const codeSnippet = `<Doodle\n  src="${src}"\n  alt="${alt}"\n  position="${position}"\n  offset={{ x: ${offset.x}, y: ${offset.y} }}\n  desktopScale={${scale.toFixed(2)}}\n  mobilePosition="hidden"\n/>`;

  return (
    <>
      <img
        ref={imgRef}
        src={src}
        alt={alt}
        draggable={false}
        onMouseDown={(e) => {
          setIsDragging(true);
          e.preventDefault();
        }}
        style={getPositionStyles()}
      />
      <div
        style={{
          position: 'fixed',
          bottom: 20,
          right: 20,
          background: '#2e2e2e',
          color: 'white',
          padding: 20,
          borderRadius: 12,
          boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
          zIndex: 1000,
          minWidth: 320
        }}
      >
        <div style={{ marginBottom: 12, fontWeight: 700, fontSize: 16 }}>🎯 Doodle Dev Overlay</div>
        <div style={{ marginBottom: 12, display: 'flex', alignItems: 'center', gap: 8 }}>
          <label style={{ fontSize: 13, minWidth: 50 }}>Scale:</label>
          <input
            type="range"
            min={0.05}
            max={1.5}
            step={0.05}
            value={scale}
            onChange={(e) => setScale(Number(e.target.value))}
            style={{ flex: 1 }}
          />
          <span style={{ fontSize: 13, minWidth: 40 }}>{scale.toFixed(2)}</span>
        </div>
        <div
          style={{
            background: '#1a1a1a',
            padding: 12,
            borderRadius: 6,
            fontSize: 12,
            fontFamily: 'monospace',
            marginTop: 12,
            lineHeight: 1.6,
            whiteSpace: 'pre-wrap'
          }}
        >
          {codeSnippet}
        </div>
        <button
          onClick={() => {
            navigator.clipboard.writeText(codeSnippet);
            alert('✅ Code copied!');
          }}
          style={{
            width: '100%',
            marginTop: 12,
            padding: '10px',
            background: '#7aa3a1',
            color: 'white',
            border: 'none',
            borderRadius: 6,
            cursor: 'pointer',
            fontWeight: 600
          }}
        >
          📋 Copy Code
        </button>
      </div>
    </>
  );
};

export default DoodleDevOverlay;


