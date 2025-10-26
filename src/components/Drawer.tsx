"use client";
import type { ReactNode } from 'react';

type Props = {
  open: boolean;
  title?: string;
  onClose: () => void;
  children: ReactNode;
};

export function Drawer({ open, title, onClose, children }: Props) {
  if (!open) return null;
  return (
    <div
      aria-modal="true"
      role="dialog"
      style={{
        position: 'fixed',
        inset: 0,
        display: 'flex',
        justifyContent: 'flex-end',
        background: 'rgba(0,0,0,0.25)'
      }}
      onClick={onClose}
    >
      <aside
        onClick={(e) => e.stopPropagation()}
        style={{
          width: '420px',
          maxWidth: '90vw',
          height: '100%',
          background: '#fff',
          boxShadow: '-4px 0 16px rgba(0,0,0,0.1)',
          padding: '16px',
          overflowY: 'auto'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <h2 style={{ margin: 0 }}>{title || 'Details'}</h2>
          <button aria-label="Close" onClick={onClose}>✕</button>
        </div>
        <div style={{ marginTop: 12 }}>{children}</div>
      </aside>
    </div>
  );
}





