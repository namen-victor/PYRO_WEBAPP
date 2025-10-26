"use client";

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function Logo({ size = 'md', className = '' }: LogoProps) {
  // Calculate dimensions based on size
  const sizes = {
    sm: 40,
    md: 60,
    lg: 80
  };

  const dimension = sizes[size];

  return (
    <div 
      className={className} 
      style={{ 
        display: 'flex', 
        alignItems: 'center',
        justifyContent: 'center',
        height: `${dimension}px`,
        width: `${dimension}px`,
        overflow: 'hidden'
      }}
    >
      <img
        src="/logo.jpg"
        alt="PYRO SOLUTIONS INC."
        width={dimension}
        height={dimension}
        style={{
          maxWidth: '100%',
          maxHeight: '100%',
          objectFit: 'contain',
          display: 'block'
        }}
      />
    </div>
  );
}
