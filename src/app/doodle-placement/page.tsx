"use client";

export default function DoodlePlacementHome() {
  const pages = [
    { name: 'Basics', href: '/doodle-placement/basics' },
    { name: 'Location', href: '/doodle-placement/location' },
    { name: 'Job Boards', href: '/doodle-placement/job-boards' },
    { name: 'Contact', href: '/doodle-placement/contact' },
    { name: 'Review', href: '/doodle-placement/review' },
  ];

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#ebebeb' }}>
      <div style={{ background: 'white', padding: '40px', borderRadius: '12px', boxShadow: '0 2px 12px rgba(0,0,0,0.08)', maxWidth: '600px' }}>
        <h1 style={{ fontSize: '28px', fontWeight: 800, marginBottom: '24px' }}>🎨 Doodle Placement Tools</h1>
        <p style={{ color: '#666', marginBottom: '32px' }}>Select an onboarding page to position doodles:</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {pages.map((page) => (
            <a
              key={page.href}
              href={page.href}
              style={{
                padding: '16px 20px',
                background: '#2e2e2e',
                color: 'white',
                borderRadius: '8px',
                textDecoration: 'none',
                fontWeight: 600,
                transition: 'background 0.2s'
              }}
              onMouseOver={(e) => e.currentTarget.style.background = '#1a1a1a'}
              onMouseOut={(e) => e.currentTarget.style.background = '#2e2e2e'}
            >
              {page.name}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}

