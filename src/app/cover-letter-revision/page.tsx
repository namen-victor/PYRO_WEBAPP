import { Navigation } from '@/components/Navigation';

export default function CoverLetterRevisionPage() {
  const colors = {
    pageBg: '#ebebeb',
    text: '#2e2e2e',
    accent: '#7aa3a1',
    accentHover: '#5e8c89',
    white: '#FFFFFF',
    line: '#e2e2e2',
    dark: '#2e2e2e',
    soft: '#f7f7f7',
    pale: '#e0f2ed',
  } as const;

  const maxw: React.CSSProperties = { maxWidth: 1200, margin: '0 auto' };
  const section: React.CSSProperties = { padding: '72px 16px' };
  const cta: React.CSSProperties = { display: 'inline-block', padding: '14px 22px', background: colors.accent, color: colors.white, borderRadius: 999, textDecoration: 'none', fontWeight: 800 };
  const pill: React.CSSProperties = { padding: '8px 12px', borderRadius: 999, border: `1px solid ${colors.line}`, background: '#fff', cursor: 'pointer' };

  return (
    <div style={{ background: colors.pageBg, color: colors.text }}>
      {/* Header */}
      <Navigation currentPage="services" />

      {/* Hero */}
      <section style={{ ...section, background: '#e3e3e3' }}>
        <div style={{ ...maxw, display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: 24, alignItems: 'center' }}>
          <div>
            <div style={{ fontSize: 12, letterSpacing: '0.18em', fontWeight: 800, color: '#666' }}>COVER LETTER REVISION HELP & ASSISTANCE</div>
            <h1 style={{ margin: '8px 0 0 0', fontSize: 36, lineHeight: 1.15, fontWeight: 900 }}>Cover Letter Revision: Grab their attention and bring your story to life.</h1>
            <p style={{ marginTop: 10, color: '#555', fontSize: 18 }}>We know exactly what employers look for in a cover letter. Let us redo your cover letter and make it a perfect fit for your dream role.</p>
            <div style={{ marginTop: 14 }}>
              <a href="/signup" style={cta}>Get revised</a>
            </div>
          </div>
          <div>
            <div style={{ background: `linear-gradient(135deg, ${colors.white}, ${colors.soft})`, border: `1px solid ${colors.line}`, borderRadius: 12, height: 320, boxShadow: '0 10px 30px rgba(0,0,0,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
              <div style={{ color: '#8a8a8a' }}>Joyful professional reading a letter (image)</div>
              {/* simple geometry accents */}
              <div style={{ position: 'absolute', top: 18, right: 24, width: 22, height: 22, borderRadius: 6, background: '#ededed' }} />
              <div style={{ position: 'absolute', bottom: 22, left: 22, width: 32, height: 32, borderRadius: '50%', background: '#efefef' }} />
            </div>
          </div>
        </div>
      </section>

      {/* Contact callout */}
      <section style={{ background: '#ffe8b3', borderTop: `1px solid #f3d389`, borderBottom: `1px solid #f3d389`, padding: '18px 16px' }}>
        <div style={{ ...maxw, display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, flexWrap: 'wrap' }}>
          <div style={{ fontWeight: 800, color: '#5a4a1f' }}>Need to talk to someone now? Call us at (555) 555‑5555</div>
          <a href="/login" style={{ ...cta, background: '#2e7d32' }}>CALL US NOW</a>
        </div>
      </section>

      {/* Experience-based pricing */}
      <section style={{ ...section, background: colors.white }}>
        <div style={maxw}>
          <h2 style={{ margin: 0, fontSize: 28, fontWeight: 900 }}>How many years of full‑time work experience do you have?</h2>
          <div style={{ display: 'flex', gap: 10, marginTop: 12, flexWrap: 'wrap' }}>
            <button style={pill}>{'< 1 Year'}</button>
            <button style={{ ...pill, background: '#dff3ef', borderColor: '#b9ddd6', fontWeight: 800 }}>1–7 Years</button>
            <button style={pill}>{'7+ Years'}</button>
          </div>
          <div style={{ marginTop: 18 }}>
            <div style={{ background: '#fafafa', border: `1px solid ${colors.line}`, borderRadius: 12, padding: 18, display: 'grid', gridTemplateColumns: '1fr', gap: 8 }}>
              <div style={{ width: 40, height: 40, borderRadius: 8, background: '#e9e9e9' }} />
              <div style={{ fontWeight: 800, fontSize: 18 }}>Cover Letter Revision</div>
              <p style={{ color: '#666', marginTop: 0 }}>We’ll use your relevant work experience to craft the perfect cover letter to land your dream job.</p>
              <ul style={{ margin: 0, paddingLeft: 18, color: '#555' }}>
                <li>Highlight your achievements.</li>
                <li>Showcase your story.</li>
                <li>Align with your target roles.</li>
              </ul>
              <div style={{ marginTop: 8, fontSize: 22, fontWeight: 900 }}>As low as $75 per payment</div>
              <div style={{ marginTop: 2, color: '#666' }}>Or One Payment $299</div>
              <div style={{ marginTop: 12 }}>
                <a href="/signup" style={cta}>Buy Now</a>
              </div>
              <div style={{ marginTop: 10, color: '#777', fontSize: 12 }}>*Pay in 4 easy installments over 2 months. Prices are USD only. Payment plan availability varies by country. This is a one‑time purchase (not a subscription).</div>
            </div>
          </div>
        </div>
      </section>

      {/* Full experience callout */}
      <section style={{ background: '#d7efe9', padding: '22px 16px', borderTop: `1px solid ${colors.line}`, borderBottom: `1px solid ${colors.line}` }}>
        <div style={{ ...maxw, display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, flexWrap: 'wrap' }}>
          <div>
            <div style={{ fontWeight: 900, fontSize: 20 }}>Want the Full Experience?</div>
            <div style={{ color: '#555', marginTop: 4 }}>This service is included in our Ultimate Bundle with a Job Offer Guarantee.</div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{ width: 40, height: 40, borderRadius: '50%', background: '#b9ddd6' }} title="Pyro Consultant" />
            <a href="/guarantee" style={cta}>EXPLORE THE BUNDLE</a>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section style={section}>
        <div style={maxw}>
          <h2 style={{ margin: 0, fontSize: 28, fontWeight: 900 }}>How it Works</h2>
          <p style={{ marginTop: 6, color: '#555' }}>Show them why they need to hire you with the perfect cover letter.</p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 18, marginTop: 18 }}>
            <div style={{ background: '#fff', border: `1px solid ${colors.line}`, borderRadius: 9999, height: 280, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Smiling professional (portrait)</div>
            <div style={{ display: 'grid', gap: 10 }}>
              {[
                ['Send us your cover letter', 'Send your existing cover letter and complete a short questionnaire.'],
                ['We contact you (1–2 days)', 'We review your submission and align on goals.'],
                ['We fix your cover letter (2–3 days)', 'We revise your letter to highlight why you’re perfect.'],
                ['Feedback session (2 days)', 'Receive a draft and shape the final version with a specialist.'],
                ['Cover letter complete! (2 days)', 'Final revisions and delivery—ready to send.']
              ].map(([t, d], i) => (
                <div key={t} style={{ background: '#fff', border: `1px solid ${colors.line}`, borderRadius: 12, padding: 14 }}>
                  <div style={{ fontWeight: 900, color: colors.accent }}>{String(i + 1).padStart(2, '0')}</div>
                  <div style={{ fontWeight: 800 }}>{t}</div>
                  <div style={{ color: '#666', marginTop: 4 }}>{d}</div>
                </div>
              ))}
              <div style={{ marginTop: 6 }}>
                <a href="/signup" style={cta}>Perfect your cover letter now</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why revise */}
      <section style={{ ...section, background: colors.white }}>
        <div style={maxw}>
          <h2 style={{ margin: 0, fontSize: 28, fontWeight: 900 }}>Why revise your cover letter?</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 16, marginTop: 16 }}>
            {[
              ['Expert guidance', 'Personal guidance from an industry professional. We know the best techniques to craft your cover letter.'],
              ['Professional writers', 'Hiring managers, recruiters, and industry pros make your letter stand out.'],
              ['Get results', 'Most clients secure interviews in 4–8 weeks and land jobs in under three months.']
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

      {/* Testimonials + logos */}
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
                <div style={{ marginTop: 10, fontStyle: 'italic' }}>“Pyro’s cover letter revision plus networking strategy helped me land interviews.”</div>
                <div style={{ marginTop: 6, color: '#666' }}>Short story on how targeted messaging unlocked new opportunities.</div>
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

      {/* Final CTA */}
      <section style={{ ...section, paddingTop: 32, paddingBottom: 32 }}>
        <div style={{ ...maxw, background: colors.pale, border: `1px solid ${colors.line}`, borderRadius: 12, padding: 22, textAlign: 'center' }}>
          <div style={{ fontSize: 24, fontWeight: 900 }}>Your best introduction is within reach</div>
          <div style={{ marginTop: 6, color: '#555' }}>Writing a cover letter can be challenging. Don’t let yours stand between you and your dream career. Let our professionals create your perfect cover letter.</div>
          <div style={{ marginTop: 8, fontWeight: 800 }}>As low as $75 per payment • One payment $299</div>
          <div style={{ marginTop: 12 }}>
            <a href="/signup" style={cta}>Buy Now</a>
          </div>
          <div style={{ marginTop: 10, color: '#666' }}>Questions about our services? Visit our <a href="#" style={{ color: colors.accent }}>FAQs page</a> or contact our team <a href="#" style={{ color: colors.accent }}>here</a>.</div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ background: colors.dark, color: '#eaeaea', padding: '48px 16px' }}>
        <div style={{ ...maxw }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 18 }}>
            <div>
              <div style={{ fontWeight: 900, marginBottom: 10 }}>Products</div>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'grid', gap: 8 }}>
                <li><a href="/login" style={{ color: 'inherit', textDecoration: 'none' }}>Client Portal</a></li>
                <li><a href="/staff/dashboard" style={{ color: 'inherit', textDecoration: 'none' }}>Staff Dashboard</a></li>
                <li><a href="/admin/dashboard" style={{ color: 'inherit', textDecoration: 'none' }}>Admin Console</a></li>
                <li><a href="#" style={{ color: 'inherit', textDecoration: 'none' }}>PyroAI Tools</a></li>
              </ul>
            </div>
            <div>
              <div style={{ fontWeight: 900, marginBottom: 10 }}>Services</div>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'grid', gap: 8 }}>
                <li>Cover Letter Revision</li>
                <li><a href="/resume-revision" style={{ color: 'inherit', textDecoration: 'none' }}>Résumé Revision</a></li>
                <li><a href="/career-consulting" style={{ color: 'inherit', textDecoration: 'none' }}>Career Consulting</a></li>
                <li><a href="/services" style={{ color: 'inherit', textDecoration: 'none' }}>More Services</a></li>
              </ul>
            </div>
            <div>
              <div style={{ fontWeight: 900, marginBottom: 10 }}>Company</div>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'grid', gap: 8 }}>
                <li>About Pyro Solutions Inc.</li>
                <li>Success Stories</li>
                <li>Employer Partnerships</li>
                <li>Careers</li>
              </ul>
            </div>
            <div>
              <div style={{ fontWeight: 900, marginBottom: 10 }}>Resources</div>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'grid', gap: 8 }}>
                <li>Blog</li>
                <li>Resource Library</li>
                <li>Job Search Hub</li>
                <li>FAQs</li>
              </ul>
            </div>
          </div>
          <div style={{ marginTop: 24, display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, flexWrap: 'wrap' }}>
            <div>Contact: <a href="mailto:support@pyrosolutions.com" style={{ color: 'inherit' }}>support@pyrosolutions.com</a></div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <div title="Twitter" style={{ width: 28, height: 28, borderRadius: 6, background: '#3a3a3a' }} />
              <div title="LinkedIn" style={{ width: 28, height: 28, borderRadius: 6, background: '#3a3a3a' }} />
              <div title="Instagram" style={{ width: 28, height: 28, borderRadius: 6, background: '#3a3a3a' }} />
            </div>
          </div>
          <div style={{ marginTop: 16, borderTop: '1px solid #3a3a3a', paddingTop: 12, display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 10 }}>
            <div>© 2025 Pyro Solutions Inc. All rights reserved.</div>
            <div style={{ display: 'flex', gap: 16 }}>
              <a href="#" style={{ color: 'inherit', textDecoration: 'none' }}>Privacy Policy</a>
              <a href="#" style={{ color: 'inherit', textDecoration: 'none' }}>Terms & Conditions</a>
              <a href="#" style={{ color: 'inherit', textDecoration: 'none' }}>Consent Preferences</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}



