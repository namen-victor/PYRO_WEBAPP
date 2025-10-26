"use client";

export default function TestLogoPage() {
  return (
    <div style={{ padding: 40, background: '#f5f5f5', minHeight: '100vh' }}>
      <h1 style={{ marginBottom: 40 }}>Logo Test Page - Updated</h1>
      
      <div style={{ marginBottom: 40, padding: 20, background: 'white', borderRadius: 8 }}>
        <h2>Test 1: Direct img tag with /logo.png</h2>
        <div style={{ border: '2px solid red', padding: 20, display: 'inline-block' }}>
          <img 
            src="/logo.png" 
            alt="Logo Test" 
            style={{ height: 80, width: 80, objectFit: 'contain', display: 'block' }}
            onLoad={() => console.log('✅ Test 1: Logo loaded from /logo.png')}
            onError={() => console.error('❌ Test 1: Logo FAILED to load from /logo.png')}
          />
        </div>
        <p>If you see a logo in the red box above, the file is loading correctly.</p>
      </div>

      <div style={{ marginBottom: 40, padding: 20, background: 'white', borderRadius: 8 }}>
        <h2>Test 2: With timestamp to bypass cache</h2>
        <div style={{ border: '2px solid blue', padding: 20, display: 'inline-block' }}>
          <img 
            src={`/logo.png?t=${Date.now()}`}
            alt="Logo Test Timestamp" 
            style={{ height: 80, width: 80, objectFit: 'contain', display: 'block' }}
            onLoad={() => console.log('✅ Test 2: Logo loaded with cache bypass')}
            onError={() => console.error('❌ Test 2: Logo FAILED with cache bypass')}
          />
        </div>
      </div>

      <div style={{ marginBottom: 40, padding: 20, background: 'white', borderRadius: 8 }}>
        <h2>Test 3: Full URL</h2>
        <div style={{ border: '2px solid green', padding: 20, display: 'inline-block' }}>
          <img 
            src="https://pyro-webapp-cfd1b.web.app/logo.png" 
            alt="Logo Test Full URL" 
            style={{ height: 80, width: 80, objectFit: 'contain', display: 'block' }}
            onLoad={() => console.log('✅ Test 3: Logo loaded from full URL')}
            onError={() => console.error('❌ Test 3: Logo FAILED from full URL')}
          />
        </div>
      </div>

      <div style={{ padding: 20, background: '#fff3cd', borderRadius: 8, border: '1px solid #ffc107' }}>
        <h2>Instructions:</h2>
        <ol>
          <li>Open browser console (F12 or right-click → Inspect → Console)</li>
          <li>Look for ✅ or ❌ messages</li>
          <li>Check which test boxes show the logo</li>
          <li>Try the direct URL: <a href="https://pyro-webapp-cfd1b.web.app/logo.png" target="_blank">https://pyro-webapp-cfd1b.web.app/logo.png</a></li>
        </ol>
      </div>
    </div>
  );
}
