import { Navigation } from '@/components/Navigation';

export default function ServicesPage() {
  const colors = {
    pageBg: '#ebebeb',
    text: '#2e2e2e',
    accent: '#7aa3a1',
    accentHover: '#5e8c89',
    white: '#FFFFFF',
    line: '#e2e2e2',
    dark: '#2e2e2e'
  } as const;

  const maxw: React.CSSProperties = { maxWidth: 1200, margin: '0 auto' };
  const section: React.CSSProperties = { padding: '72px 16px' };
  const cta: React.CSSProperties = { display: 'inline-block', padding: '14px 22px', background: colors.accent, color: colors.white, borderRadius: 999, textDecoration: 'none', fontWeight: 800 };
  const ctaOutline: React.CSSProperties = { display: 'inline-block', padding: '12px 20px', border: `2px solid ${colors.accent}`, color: colors.accent, borderRadius: 999, textDecoration: 'none', fontWeight: 800 };

  return (
    <div style={{ background: colors.pageBg, color: colors.text }}>
      <Navigation currentPage="services" />

      {/* Hero */}
      <section style={{ ...section, background: '#e3e3e3' }}>
        <div style={{ ...maxw, display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: 24, alignItems: 'center' }}>
          <div>
            <h1 style={{ margin: 0, fontSize: 42, lineHeight: 1.1, fontWeight: 900 }}>Expert Job Application Services</h1>
            <p style={{ marginTop: 12, color: '#555', fontSize: 18 }}>Our team of specialists submits tailored applications, optimizes your profile, and coaches you through interviews so you get noticed faster than bots.</p>
            <div style={{ display: 'flex', gap: 12, marginTop: 18, flexWrap: 'wrap' }}>
              <a href="/login" style={cta}>Book a Free Consultation</a>
              <a href="/pricing" style={ctaOutline}>View Plans</a>
            </div>
          </div>
          <div>
            <div style={{ background: `linear-gradient(135deg, ${colors.white}, #f7f7f7)`, border: `1px solid ${colors.line}`, borderRadius: 12, height: 320, boxShadow: '0 10px 30px rgba(0,0,0,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <div style={{ color: '#8a8a8a' }}>Hero illustration / photo</div>
            </div>
          </div>
        </div>
      </section>

      {/* Metrics */}
      <section style={{ background: colors.white, padding: '22px 16px', borderTop: `1px solid ${colors.line}`, borderBottom: `1px solid ${colors.line}` }}>
        <div style={{ ...maxw, display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: 10, alignItems: 'center' }}>
          {[
            ['90%', 'interviews within 4 months'],
            ['2,000+', 'résumés optimized'],
            ['95%', 'customer satisfaction'],
            ['10k+', 'target roles sourced']
          ].map(([n, l]) => (
            <div key={n} style={{ textAlign: 'center' }}>
              <div style={{ fontSize: 22, fontWeight: 900 }}>{n}</div>
              <div style={{ color: '#666', fontSize: 13 }}>{l}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Services overview */}
      <section style={section}>
        <div style={maxw}>
          <h2 style={{ margin: 0, fontSize: 34, fontWeight: 900 }}>Our Services</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 16, marginTop: 18 }}>
              {[
                ['Career Consulting', 'Work with an industry specialist to discover your best‑fit role and strategy.', '/career-consulting'],
                ['Résumé & Profile Optimization', 'Keyword‑aligned, recruiter‑ready materials that stand out in ATS and to humans.', '/resume-revision'],
                ['Cover Letter Revision', 'Get a compelling story that aligns to your target roles and stands out.', '/cover-letter-revision'],
                ['LinkedIn Profile Revision', 'Grow your network and get noticed by recruiters with an optimized profile.', '/linkedin-profile-revision'],
                ['Job Search Strategies', 'Learn how to make the right connections and get the best referrals.', '/job-search-strategies'],
                ['Full-Service Apply to Jobs', 'Applying is tough. We make it easy. Nap while we apply to jobs for you.', '/full-service-apply'],
                ['Interview Prep', 'Train with a pro. Ace your interviews with personalized coaching.', '/interview-prep']
              ].map(([title, desc, href]) => (
              <div key={title} style={{ background: '#fff', border: `1px solid ${colors.line}`, borderRadius: 12, padding: 18 }}>
                <div style={{ width: 40, height: 40, borderRadius: 8, background: '#e9e9e9', marginBottom: 10 }} />
                <div style={{ fontWeight: 800 }}>{title}</div>
                <div style={{ color: '#666', marginTop: 6 }}>{desc}</div>
                <div style={{ marginTop: 10 }}>
                  <a href={href as string} style={{ color: colors.accent, textDecoration: 'none', fontWeight: 700 }}>Learn more →</a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section style={{ ...section, background: colors.white }}>
        <div style={maxw}>
          <h2 style={{ margin: 0, fontSize: 30, fontWeight: 900 }}>How We Help You Succeed</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 14, marginTop: 18 }}>
            {[
              ['Upload & Onboard', 'Upload your résumé and complete a brief profile.'],
              ['Meet Your Specialist', 'Align on goals with your dedicated Pyro agent.'],
              ['Strategize & Customize', 'Optimize materials and identify target roles.'],
              ['Application Execution', 'We submit tailored applications and track status.'],
              ['Interview Prep & Success', 'Coaching and support through offers.']
            ].map(([title, desc], i) => (
              <div key={title} style={{ background: '#fafafa', border: `1px solid ${colors.line}`, borderRadius: 12, padding: 18 }}>
                <div style={{ fontWeight: 900, color: colors.accent }}>{String(i + 1).padStart(2, '0')}</div>
                <div style={{ fontWeight: 800, marginTop: 6 }}>{title}</div>
                <div style={{ color: '#666', marginTop: 4 }}>{desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Pyro vs bots */}
      <section style={section}>
        <div style={maxw}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 16 }}>
            <div style={{ background: '#fff', border: `1px solid ${colors.line}`, borderRadius: 12, padding: 18 }}>
              <div style={{ fontWeight: 900, marginBottom: 8 }}>Automated Bots</div>
              <ul style={{ margin: 0, padding: 0, listStyle: 'none', color: '#666', display: 'grid', gap: 8 }}>
                <li>• Generic, untargeted submissions</li>
                <li>• Minimal feedback or accountability</li>
                <li>• Often flagged by ATS</li>
              </ul>
            </div>
            <div style={{ background: '#fff', border: `1px solid ${colors.line}`, borderRadius: 12, padding: 18, outline: `3px solid ${colors.accent}22` }}>
              <div style={{ fontWeight: 900, marginBottom: 8 }}>Pyro Human Advantage</div>
              <ul style={{ margin: 0, padding: 0, listStyle: 'none', color: '#666', display: 'grid', gap: 8 }}>
                <li>• Curated roles and company portals</li>
                <li>• Human expertise and personalized feedback</li>
                <li>• ATS‑friendly, recruiter‑ready materials</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Dark CTA band */}
      <section style={{ background: colors.dark, color: '#eee', padding: '40px 16px' }}>
        <div style={{ ...maxw, display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, flexWrap: 'wrap' }}>
          <div style={{ fontWeight: 900, fontSize: 22 }}>Ready to get noticed?</div>
          <a href="/login" style={{ ...cta, background: colors.white, color: colors.dark }}>Start Your Journey</a>
        </div>
      </section>

      {/* Testimonials teaser */}
      <section style={section}>
        <div style={maxw}>
          <h2 style={{ margin: 0, fontSize: 30, fontWeight: 900 }}>Success Stories</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 16, marginTop: 18 }}>
            {[
              ['Alex P., Product Manager', '“Two interviews in 3 weeks thanks to Pyro’s targeted submissions.”'],
              ['Maya R., Data Analyst', '“My specialist tailored everything—finally felt seen by recruiters.”'],
              ['Sam K., Software Engineer', '“Clear updates and real traction—highly recommend.”']
            ].map(([name, quote]) => (
              <div key={name} style={{ background: '#fff', border: `1px solid ${colors.line}`, borderRadius: 12, padding: 18 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <div style={{ width: 40, height: 40, borderRadius: '50%', background: '#d9d9d9' }} />
                  <div style={{ fontWeight: 700 }}>{name}</div>
                </div>
                <div style={{ marginTop: 10, color: '#555' }}>{quote}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer (same structure as landing) */}
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
                <li>Human‑Led Submission</li>
                <li>Résumé Revision</li>
                <li>Job Search Strategy</li>
                <li>Interview Coaching</li>
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
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
