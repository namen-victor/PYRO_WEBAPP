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

  // Keyboard nudging for pixel-perfect placement
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Only when overlay is visible on page
      let moved = false;
      const step = e.shiftKey ? 5 : 1; // Shift for faster moves
      if (e.key === 'ArrowLeft') {
        setOffset((o) => ({ ...o, x: o.x - step }));
        moved = true;
      } else if (e.key === 'ArrowRight') {
        setOffset((o) => ({ ...o, x: o.x + step }));
        moved = true;
      } else if (e.key === 'ArrowUp') {
        setOffset((o) => ({ ...o, y: o.y - step }));
        moved = true;
      } else if (e.key === 'ArrowDown') {
        setOffset((o) => ({ ...o, y: o.y + step }));
        moved = true;
      } else if (e.key === '+' || e.key === '=') {
        setScale((s) => Number((s + 0.01).toFixed(2)));
        moved = true;
      } else if (e.key === '-' || e.key === '_') {
        setScale((s) => Number((s - 0.01).toFixed(2)));
        moved = true;
      }
      if (moved) {
        e.preventDefault();
        e.stopPropagation();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

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
      transition: 'none',
      willChange: 'transform',
      maxWidth: maxWidth ?? 'none',
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
          minWidth: 360
        }}
      >
        <div style={{ marginBottom: 12, fontWeight: 700, fontSize: 16 }}>🎯 Doodle Dev Overlay</div>
        <div style={{ marginBottom: 8, fontSize: 13 }}>
          Offset: x <strong>{offset.x}</strong>, y <strong>{offset.y}</strong> &nbsp; | &nbsp; Scale: <strong>{scale.toFixed(2)}</strong>
        </div>
        <div style={{ marginBottom: 8, display: 'flex', gap: 8 }}>
          <button onClick={() => setOffset((o) => ({ ...o, y: o.y - 1 }))}>⬆︎</button>
          <div>
            <button onClick={() => setOffset((o) => ({ ...o, x: o.x - 1 }))}>⬅︎</button>
            <button onClick={() => setOffset((o) => ({ ...o, x: o.x + 1 }))} style={{ marginLeft: 6 }}>➡︎</button>
          </div>
          <button onClick={() => setOffset((o) => ({ ...o, y: o.y + 1 }))}>⬇︎</button>
          <button onClick={() => setScale((s) => Number((s - 0.01).toFixed(2)))} style={{ marginLeft: 10 }}>-</button>
          <button onClick={() => setScale((s) => Number((s + 0.01).toFixed(2)))}>+</button>
          <button onClick={() => { setOffset(initialOffset); setScale(initialScale); }} style={{ marginLeft: 10 }}>Reset</button>
          <button
            onClick={() => { navigator.clipboard.writeText(codeSnippet); alert('✅ Code copied!'); }}
            style={{ marginLeft: 'auto', background: '#7aa3a1', color: 'white', border: 'none', borderRadius: 6, padding: '8px 12px', cursor: 'pointer', fontWeight: 600 }}
          >
            📋 Copy Code
          </button>
        </div>
        <div
          style={{
            background: '#1a1a1a',
            padding: 12,
            borderRadius: 6,
            fontSize: 12,
            fontFamily: 'monospace',
            marginTop: 8,
            lineHeight: 1.6,
            whiteSpace: 'pre-wrap'
          }}
        >
          {codeSnippet}
        </div>
        <div style={{ marginTop: 8, fontSize: 12, color: '#bbb' }}>
          Tips: Use arrow keys to nudge (Shift = 5px). +/- to change scale by 0.01.
        </div>
      </div>
    </>
  );
};

export default DoodleDevOverlay;


