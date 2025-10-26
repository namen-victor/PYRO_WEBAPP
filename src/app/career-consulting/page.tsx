import { Navigation } from '@/components/Navigation';

export default function CareerConsultingPage() {
  const colors = {
    pageBg: '#ebebeb',
    text: '#2e2e2e',
    accent: '#7aa3a1',
    accentHover: '#5e8c89',
    white: '#FFFFFF',
    line: '#e2e2e2',
    dark: '#2e2e2e',
    teal: '#dff3ef'
  } as const;

  const maxw: React.CSSProperties = { maxWidth: 1200, margin: '0 auto' };
  const section: React.CSSProperties = { padding: '72px 16px' };
  const cta: React.CSSProperties = { display: 'inline-block', padding: '14px 22px', background: colors.accent, color: colors.white, borderRadius: 999, textDecoration: 'none', fontWeight: 800 };
  const pill: React.CSSProperties = { padding: '8px 12px', borderRadius: 999, border: `1px solid ${colors.line}`, background: '#fff', cursor: 'pointer' };

  return (
    <div style={{ background: colors.pageBg, color: colors.text }}>
      {/* Header */}
      <Navigation currentPage="services" />

      {/* Hero split */}
      <section style={{ ...section, background: '#e3e3e3' }}>
        <div style={{ ...maxw, display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: 24, alignItems: 'center' }}>
          <div>
            <div style={{ fontSize: 12, letterSpacing: '0.18em', fontWeight: 800, color: '#666' }}>CAREER CONSULTING & COACHING SERVICES</div>
            <h1 style={{ margin: '8px 0 0 0', fontSize: 40, lineHeight: 1.1, fontWeight: 900 }}>Career Consulting – Let’s find your perfect fit</h1>
            <p style={{ marginTop: 10, color: '#555', fontSize: 18 }}>You’re a perfect fit somewhere. Let’s find out where. Our specialists will help you build your dream career by identifying your strengths and matching you with the right roles.</p>
            <div style={{ marginTop: 14 }}>
              <a href="/signup" style={cta}>Find Out How</a>
            </div>
          </div>
          <div>
            <div style={{ background: `linear-gradient(135deg, ${colors.white}, #f7f7f7)`, border: `1px solid ${colors.line}`, borderRadius: 12, height: 320, boxShadow: '0 10px 30px rgba(0,0,0,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
              <div style={{ color: '#8a8a8a' }}>Professional celebrating (image placeholder)</div>
              <div style={{ position: 'absolute', top: 16, right: 16, width: 28, height: 28, borderRadius: 8, background: '#ececec' }} />
              <div style={{ position: 'absolute', bottom: 16, left: 16, width: 28, height: 28, borderRadius: 8, background: '#ececec' }} />
            </div>
          </div>
        </div>
      </section>

      {/* Callout contact strip */}
      <section style={{ background: '#ffe8b3', borderTop: `1px solid #f3d389`, borderBottom: `1px solid #f3d389`, padding: '18px 16px' }}>
        <div style={{ ...maxw, display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, flexWrap: 'wrap' }}>
          <div style={{ fontWeight: 800, color: '#5a4a1f' }}>Need to talk to someone now? Call us at (555) 555‑5555</div>
          <a href="/login" style={{ ...cta, background: '#2e7d32' }}>Call Us Now</a>
        </div>
      </section>

      {/* Experience-based pricing */}
      <section style={{ ...section, background: colors.white }}>
        <div style={maxw}>
          <h2 style={{ margin: 0, fontSize: 28, fontWeight: 900 }}>How many years of full‑time work experience do you have?</h2>
          <div style={{ display: 'flex', gap: 10, marginTop: 12, flexWrap: 'wrap' }}>
            <button style={pill}>{'< 1 Year'}</button>
            <button style={{ ...pill, background: colors.teal, borderColor: '#b9ddd6', fontWeight: 800 }}>1–7 Years</button>
            <button style={pill}>{'7+ Years'}</button>
          </div>
          <div style={{ marginTop: 18, display: 'grid', gridTemplateColumns: '1fr', gap: 14 }}>
            <div style={{ background: '#fafafa', border: `1px solid ${colors.line}`, borderRadius: 12, padding: 18 }}>
              <div style={{ width: 40, height: 40, borderRadius: 8, background: '#e9e9e9', marginBottom: 10 }} />
              <div style={{ fontWeight: 800, fontSize: 18 }}>Career Consulting</div>
              <p style={{ color: '#666', marginTop: 6 }}>Let our network of industry specialists show you the way to your breakout role. Identify your dream job. Develop your career strategy. Consult with an industry pro.</p>
              <div style={{ marginTop: 8, fontSize: 22, fontWeight: 900 }}>As low as $75 per payment*</div>
              <div style={{ marginTop: 2, color: '#666' }}>Or One Payment $299</div>
              <div style={{ marginTop: 12 }}>
                <a href="/signup" style={cta}>Buy Now</a>
              </div>
              <div style={{ marginTop: 10, color: '#777', fontSize: 12 }}>*Pay in 4 easy installments over 2 months (USD only). Payment plan availability varies by country. This is a one-time payment option, not a subscription.</div>
            </div>
          </div>
        </div>
      </section>

      {/* Cross-sell banner */}
      <section style={{ background: '#d7efe9', padding: '22px 16px', borderTop: `1px solid ${colors.line}`, borderBottom: `1px solid ${colors.line}` }}>
        <div style={{ ...maxw, display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, flexWrap: 'wrap' }}>
          <div>
            <div style={{ fontWeight: 900, fontSize: 20 }}>Want the Full Experience?</div>
            <div style={{ color: '#555', marginTop: 4 }}>This service is included in our Ultimate Bundle with a Job Offer Guarantee.</div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{ width: 40, height: 40, borderRadius: '50%', background: '#b9ddd6' }} title="Data Science Consultant" />
            <a href="/guarantee" style={cta}>Explore the Bundle</a>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section style={section}>
        <div style={maxw}>
          <h2 style={{ margin: 0, fontSize: 28, fontWeight: 900 }}>How it works</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 18, marginTop: 18 }}>
            <div>
              <div style={{ background: '#fff', border: `1px solid ${colors.line}`, borderRadius: 12, height: 320, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Smiling professional (image)</div>
            </div>
            <div style={{ display: 'grid', gap: 10 }}>
              {[
                ['Connect with us', 'Fill out a questionnaire about goals, skills, and experience.'],
                ['We contact you (1–2 days)', 'We review your answers and schedule your first consultation.'],
                ['First consultation (1–2 days)', 'Deep dive into background and job search priorities.'],
                ['Do your homework (1–2 days)', 'A short assignment to pinpoint your dream job; ask us anything.'],
                ['Final consultation (1–2 days)', 'Quantify gaps and build the plan for the next steps.'],
                ['Get your career guide (1–2 days)', 'Receive your personalized guide and actionable strategies.']
              ].map(([t, d], i) => (
                <div key={t} style={{ background: '#fff', border: `1px solid ${colors.line}`, borderRadius: 12, padding: 14 }}>
                  <div style={{ fontWeight: 900, color: colors.accent }}>{String(i + 1).padStart(2, '0')}</div>
                  <div style={{ fontWeight: 800 }}>{t}</div>
                  <div style={{ color: '#666', marginTop: 4 }}>{d}</div>
                </div>
              ))}
              <div style={{ marginTop: 6 }}>
                <a href="/signup" style={cta}>Sign up today</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section style={{ ...section, background: colors.white }}>
        <div style={maxw}>
          <h2 style={{ margin: 0, fontSize: 28, fontWeight: 900 }}>Career Consulting Benefits</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 16, marginTop: 16 }}>
            {[
              ['Learn from the best', 'Our specialists know the job market. Work with recruiters to identify your dream job and learn how to get there.'],
              ['Get lifetime support', 'Choose the Ultimate Bundle to receive continued support from our team.'],
              ['No experience required', 'All underdogs welcome — no prior experience needed to start.']
            ].map(([t, d]) => (
              <div key={t} style={{ background: '#fafafa', border: `1px solid ${colors.line}`, borderRadius: 12, padding: 18, position: 'relative' }}>
                <div style={{ position: 'absolute', top: -10, left: 18, width: 28, height: 28, borderRadius: '50%', background: '#e9e9e9' }} />
                <div style={{ fontWeight: 800, marginTop: 14 }}>{t}</div>
                <div style={{ color: '#666', marginTop: 6 }}>{d}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Success story slider (static placeholders) */}
      <section style={section}>
        <div style={maxw}>
          <h2 style={{ margin: 0, fontSize: 28, fontWeight: 900 }}>See how we helped others land their dream jobs</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 16, marginTop: 16 }}>
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} style={{ background: '#fff', border: `1px solid ${colors.line}`, borderRadius: 12, padding: 16, boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <div style={{ width: 40, height: 40, borderRadius: '50%', background: '#d9d9d9' }} />
                  <div style={{ width: 60, height: 24, background: '#efefef', borderRadius: 6 }} />
                </div>
                <div style={{ marginTop: 10, fontStyle: 'italic' }}>“Pyro’s networking strategies and consultations helped me secure my offer.”</div>
                <div style={{ marginTop: 6, color: '#666' }}>Longer story excerpt—how guidance and outreach led to interviews and an offer.</div>
              </div>
            ))}
          </div>
          <div style={{ marginTop: 18, display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(100px, 1fr))', gap: 12 }}>
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} style={{ height: 28, background: '#efefef', border: `1px solid ${colors.line}`, borderRadius: 6 }} />
            ))}
          </div>
        </div>
      </section>

      {/* Big CTA card */}
      <section style={{ ...section, paddingTop: 32, paddingBottom: 32 }}>
        <div style={{ ...maxw, background: '#e0f2ed', border: `1px solid ${colors.line}`, borderRadius: 12, padding: 22, textAlign: 'center' }}>
          <div style={{ fontSize: 26, fontWeight: 900 }}>Your dream career starts here</div>
          <div style={{ marginTop: 6, color: '#555' }}>Let our network of industry specialists show you the way to your breakout role and dream career!</div>
          <div style={{ marginTop: 8, fontWeight: 800 }}>As low as $75 per payment • One payment $299</div>
          <div style={{ marginTop: 12 }}>
            <a href="/signup" style={cta}>Buy Now</a>
          </div>
          <div style={{ marginTop: 10, color: '#666' }}>Questions about our services? Visit our <a href="#" style={{ color: colors.accent }}>FAQs page</a> or contact our team <a href="#" style={{ color: colors.accent }}>here</a>.</div>
        </div>
      </section>

      {/* Footer minimal */}
      <footer style={{ background: colors.dark, color: '#eaeaea', padding: '48px 16px' }}>
        <div style={{ ...maxw, display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <span style={{ fontWeight: 800 }}>Pyro Solutions Inc.</span>
          </div>
          <div>© 2025 Pyro Solutions Inc. All rights reserved.</div>
        </div>
      </footer>
    </div>
  );
}



