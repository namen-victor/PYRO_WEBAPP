'use client';

import { Navigation } from '@/components/Navigation';
import { DoodleDevOverlay } from '@/components/DoodleDevOverlay';
import { Doodle } from '@/components/Doodle';
import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';

function HomePageContent() {
  const searchParams = useSearchParams();
  const doodleParam = searchParams.get('doodle');
  // Palette per spec
  const colors = {
    pageBg: '#ebebeb', // light gray background
    text: '#2e2e2e', // almost black
    accent: '#7aa3a1', // muted teal accent
    accentHover: '#5e8c89',
    warmGray: '#A79F96',
    white: '#FFFFFF',
    line: '#e2e2e2',
    dark: '#2e2e2e'
  } as const;

  const container: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    background: colors.pageBg,
    color: colors.text
  };

  const section: React.CSSProperties = { padding: '72px 16px' };
  const maxw: React.CSSProperties = { maxWidth: 1200, margin: '0 auto' };

  const ctaBtn: React.CSSProperties = {
    display: 'inline-block',
    padding: '14px 22px',
    background: colors.accent,
    color: colors.white,
    borderRadius: 999,
    textDecoration: 'none',
    fontWeight: 700
  };

  const ctaBtnOutline: React.CSSProperties = {
    display: 'inline-block',
    padding: '12px 20px',
    background: 'transparent',
    color: colors.accent,
    borderRadius: 999,
    border: `2px solid ${colors.accent}`,
    textDecoration: 'none',
    fontWeight: 700
  };

  return (
    <div style={container}>
      <style>{`
        @media (max-width: 768px) {
          .hero-grid {
            grid-template-columns: 1fr !important;
            gap: 32px !important;
          }
          .hero-title {
            font-size: 36px !important;
          }
          .hero-text {
            font-size: 16px !important;
          }
          .hero-buttons {
            flex-direction: column !important;
            width: 100% !important;
          }
          .hero-buttons a {
            width: 100% !important;
            max-width: 100% !important;
            text-align: center !important;
            box-sizing: border-box !important;
            padding: 14px 20px !important;
            font-size: 15px !important;
            white-space: nowrap !important;
            overflow: hidden !important;
            text-overflow: ellipsis !important;
          }
          .profile-cards {
            grid-template-columns: 1fr !important;
          }
          .kpi-grid {
            grid-template-columns: 1fr 1fr !important;
            gap: 16px !important;
          }
          section {
            padding-left: 20px !important;
            padding-right: 20px !important;
          }
        }
      `}</style>
      <Navigation currentPage="home" />

      {/* Hero */}
      <section style={{ ...section, paddingTop: 96, paddingBottom: 96, position: 'relative' }}>
        <div className="hero-grid" style={{ ...maxw, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 60, alignItems: 'center' }}>
          <div>
            <div style={{ fontSize: 12, letterSpacing: '0.15em', fontWeight: 700, color: colors.warmGray, marginBottom: 16, textTransform: 'uppercase' }}>AI POWERED RÉSUMÉ AND CAREER SERVICES</div>
            <h1 className="hero-title" style={{ fontSize: 52, lineHeight: 1.15, margin: 0, fontWeight: 900, color: colors.dark }}>
              Get noticed.<br />
              <span style={{ color: colors.accent }}>Get hired.</span>
            </h1>
            <p className="hero-text" style={{ marginTop: 20, fontSize: 18, color: '#555', lineHeight: 1.6 }}>
              Land your dream job in as fast as 4 weeks. We offer AI & human career services to help you stand out.
            </p>
            <div className="hero-buttons" style={{ display: 'flex', gap: 16, marginTop: 32 }}>
              <a href="/signup" style={{ ...ctaBtn, padding: '16px 32px', fontSize: 16, background: colors.dark, borderRadius: 8, whiteSpace: 'nowrap' }}>Try PyroINC for $0</a>
              <a href="/contact" style={{ ...ctaBtnOutline, padding: '14px 32px', fontSize: 16, borderRadius: 8, border: `2px solid ${colors.dark}`, color: colors.dark, whiteSpace: 'nowrap' }}>Schedule a Free Consultation</a>
            </div>
          </div>
          <div style={{ position: 'relative' }}>
            <div style={{ 
              background: `linear-gradient(135deg, #e8f5f3, #f0f8f7)`, 
              border: `1px solid ${colors.line}`, 
              borderRadius: 16, 
              padding: 32,
              boxShadow: '0 20px 60px rgba(0,0,0,0.1)',
              position: 'relative'
            }}>
              {/* 4-Step Process */}
              <div className="profile-cards" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, rowGap: 12 }}>
                {[
                  {
                    num: '1',
                    color: '#f4bd8e',
                    title: 'CREATE YOUR ACCOUNT',
                    desc: 'Create your account and skip the job search chaos'
                  },
                  {
                    num: '2',
                    color: '#ffb3d4',
                    title: 'MEET YOUR SPECIALIST',
                    desc: 'A dedicated specialist takes over your job applications'
                  },
                  {
                    num: '3',
                    color: '#a8c8ff',
                    title: 'TRACK EVERY APPLICATION',
                    desc: 'Watch your specialist apply to 100+ jobs while you prepare for interviews'
                  },
                  {
                    num: '4',
                    color: '#b3e5d8',
                    title: 'LAND INTERVIEWS',
                    desc: 'Start receiving interview invitations within weeks, not months'
                  }
                ].map((step, i) => (
                  <div 
                    key={i}
                    style={{ 
                      background: colors.white, 
                      borderRadius: 12, 
                      padding: 14, 
                      boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
                      transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: 6
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'translateY(-2px)';
                      e.currentTarget.style.boxShadow = '0 6px 16px rgba(0,0,0,0.12)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.08)';
                    }}
                  >
                    {/* Circle + Title (side by side) */}
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 10,
                      marginBottom: 2
                    }}>
                      {/* Number Circle */}
                      <div style={{ 
                        width: 50, 
                        height: 50, 
                        borderRadius: '50%', 
                        background: step.color, 
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: 24,
                        fontWeight: 900,
                        color: colors.white,
                        boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
                        flexShrink: 0
                      }}>
                        {step.num}
                      </div>
                      
                      {/* Title */}
                      <h3 style={{ 
                        fontSize: 14,
                        fontWeight: 900,
                        color: colors.dark,
                        margin: 0,
                        letterSpacing: '0.3px',
                        textTransform: 'uppercase',
                        textDecoration: 'underline',
                        textDecorationThickness: '2px',
                        textUnderlineOffset: '3px',
                        lineHeight: 1.2,
                        whiteSpace: 'nowrap'
                      }}>
                        {step.title}
                      </h3>
                    </div>
                    
                    {/* Description */}
                    <p style={{ 
                      fontSize: 12,
                      color: '#666',
                      lineHeight: 1.5,
                      margin: 0,
                      fontStyle: 'italic',
                      paddingLeft: 62
                    }}>
                      '{step.desc}'
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Savetime.svg Doodle */}
            {!doodleParam && (
              <Doodle
                src="/doodles/landing-page/Savetime.svg"
                alt="Save time doodle"
                position="bottom-right"
                offset={{ x: -498, y: -288 }}
                desktopScale={0.85}
                mobilePosition="hidden"
                maxWidth="none"
                zIndex={10}
              />
            )}

            {/* Doodle Dev Overlay for Savetime.svg */}
            {doodleParam === 'savetime' && (
              <DoodleDevOverlay
                src="/doodles/landing-page/Savetime.svg"
                alt="Save time doodle"
                position="bottom-right"
                initialScale={1.0}
                maxWidth="none"
              />
            )}
          </div>
        </div>
      </section>

      {/* KPI strip */}
      <section style={{ background: '#f6f6f6', borderTop: `1px solid ${colors.line}`, borderBottom: `1px solid ${colors.line}`, padding: '22px 16px' }}>
        <div className="kpi-grid" style={{ ...maxw, display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: 10, alignItems: 'center' }}>
          {[
            ['1.5M+', 'applications tracked'],
            ['10k+', 'roles targeted'],
            ['95%', 'client satisfaction'],
            ['90%', 'interviews in 4 months']
          ].map(([n, l]) => (
            <div key={n} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
              <div style={{ fontWeight: 900, fontSize: 20, color: colors.dark }}>{n}</div>
              <div style={{ color: '#666', fontSize: 13 }}>{l}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Problem & Two Paths */}
      <section id="services" style={{ ...section, background: colors.white }}>
        <div style={{ ...maxw }}>
          <h2 style={{ fontSize: 34, margin: 0, fontWeight: 900, textAlign: 'center' }}>Why Most Job Applications Fail</h2>
          <p style={{ marginTop: 12, textAlign: 'center', color: '#555', maxWidth: 800, marginInline: 'auto' }}>
            Generic auto‑apply tools flood ATS systems with poor‑fit résumés. Great candidates go unseen while filters and bots do all the rejecting.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 20, marginTop: 28 }}>
            <div style={{ border: `1px solid ${colors.line}`, borderRadius: 12, background: '#fafafa', padding: 20 }}>
              <div style={{ fontWeight: 800, marginBottom: 8 }}>Bots & Automation</div>
              <ul style={{ margin: 0, padding: 0, listStyle: 'none', color: '#666', display: 'grid', gap: 10 }}>
                <li>• Identical résumés blasted everywhere</li>
                <li>• Generic cover letters; no strategy</li>
                <li>• No feedback loop or accountability</li>
                <li>• Often flagged by ATS and ignored</li>
              </ul>
            </div>
            <div style={{ border: `1px solid ${colors.line}`, borderRadius: 12, background: '#fff', padding: 20, outline: `3px solid ${colors.accent}22` }}>
              <div style={{ fontWeight: 800, marginBottom: 8 }}>Pyro’s Human Advantage</div>
              <ul style={{ margin: 0, padding: 0, listStyle: 'none', color: '#666', display: 'grid', gap: 10 }}>
                <li>• Tailored submissions by specialists</li>
                <li>• Strategic company targeting</li>
                <li>• Real‑time updates and collaboration</li>
                <li>• ATS‑friendly and recruiter‑ready</li>
              </ul>
            </div>
          </div>

          <div style={{ textAlign: 'center', marginTop: 20 }}>
            <a href="#how" style={{ ...ctaBtn, background: colors.dark, color: colors.white }}>See how it works</a>
          </div>
        </div>
      </section>

      {/* Mid‑page CTA banner */}
      <section style={{ ...section, paddingTop: 32, paddingBottom: 32 }}>
        <div style={{ ...maxw, background: '#ffe8b3', border: '1px solid #f3d389', borderRadius: 12, padding: 18, display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, flexWrap: 'wrap' }}>
          <div style={{ fontWeight: 800, color: '#5a4a1f' }}>Need to talk to someone now?</div>
          <a href="/contact" style={{ ...ctaBtn, background: '#2e7d32' }}>Call us now</a>
        </div>
      </section>

      {/* Human Advantage / Features */}
      <section style={{ ...section, background: colors.dark, color: '#f5f5f5' }}>
        <div style={maxw}>
          <h2 style={{ fontSize: 30, margin: 0, fontWeight: 900, textAlign: 'center' }}>What Makes Pyro Different</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 16, marginTop: 24 }}>
            {[
              { t: 'Upload Once, We Do the Rest', d: 'Save time. One résumé becomes a targeted campaign managed by real people.' },
              { t: 'Real Specialists', d: 'Experienced professionals tailor keywords, align with role needs, and submit where it matters.' },
              { t: 'Real‑Time Tracking & Chat', d: 'See submissions, statuses, and message your specialist from your dashboard.' }
            ].map((c) => (
              <div key={c.t} style={{ background: '#383838', border: '1px solid #444', borderRadius: 12, padding: 20 }}>
                <div style={{ fontWeight: 800, marginBottom: 8 }}>{c.t}</div>
                <div style={{ color: '#d0d0d0' }}>{c.d}</div>
              </div>
            ))}
          </div>
          <div style={{ textAlign: 'center', marginTop: 24, color: '#c7e2e1' }}>“90% of clients secure interviews within 4 months.”</div>
        </div>
      </section>

      {/* How it works */}
      <section id="how" style={{ ...section, background: colors.white }}>
        <div style={maxw}>
          <h2 style={{ fontSize: 30, margin: 0, fontWeight: 900, textAlign: 'center' }}>How It Works</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 14, marginTop: 22 }}>
            {[
              ['Create Account & Upload Résumé', 'Start your profile and add your PDF.'],
              ['Match With a Pyro Specialist', 'We pair you with a human expert.'],
              ['Tailored Applications Submitted', 'Strategic targeting, ATS‑ready materials.'],
              ['Track Progress & Chat', 'Dashboard updates and messaging.'],
              ['Get Interview Calls', 'Real opportunities, not vanity metrics.']
            ].map(([title, desc], i) => (
              <div key={title} style={{ border: `1px solid ${colors.line}`, borderRadius: 12, background: '#fafafa', padding: 18 }}>
                <div style={{ fontWeight: 900, color: colors.accent }}>{String(i + 1).padStart(2, '0')}</div>
                <div style={{ fontWeight: 800, marginTop: 6 }}>{title}</div>
                <div style={{ color: '#666', marginTop: 4 }}>{desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison table (compact) */}
      <section style={{ ...section }}>
        <div style={maxw}>
          <h2 style={{ fontSize: 30, margin: 0, fontWeight: 900, textAlign: 'center' }}>Human vs. Auto‑Apply</h2>
          <div style={{ overflowX: 'auto', marginTop: 16, background: '#fff', borderRadius: 12, border: `1px solid ${colors.line}` }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr>
                  <th style={{ padding: 14, borderBottom: `2px solid ${colors.line}`, textAlign: 'left' }}>Feature</th>
                  <th style={{ padding: 14, borderBottom: `2px solid ${colors.line}`, textAlign: 'left' }}>Auto‑Apply Tools</th>
                  <th style={{ padding: 14, borderBottom: `2px solid ${colors.line}`, textAlign: 'left' }}>PyroINC</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ['Personalization', 'Low', 'High'],
                  ['Success Rate', 'Unclear', 'Interview‑focused'],
                  ['Support', 'None', 'Human specialist'],
                  ['Pricing', 'Hidden fees', 'Transparent plans']
                ].map(([f, a, h]) => (
                  <tr key={f} style={{ borderBottom: `1px solid ${colors.line}` }}>
                    <td style={{ padding: 12, fontWeight: 600 }}>{f}</td>
                    <td style={{ padding: 12 }}>✖ {a}</td>
                    <td style={{ padding: 12 }}>✓ {h}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Pricing CTA */}
      <section style={{ ...section, background: colors.white }}>
        <div style={{ ...maxw, textAlign: 'center' }}>
          <div style={{ border: `1px solid ${colors.line}`, borderRadius: 12, padding: 24, maxWidth: 540, margin: '0 auto', background: '#fff' }}>
            <div style={{ fontSize: 22, fontWeight: 800 }}>Choose the plan that fits your job search</div>
            <div style={{ marginTop: 14 }}>
              <a href="/pricing" style={ctaBtn}>View Plans</a>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials teaser */}
      <section id="stories" style={{ ...section }}>
        <div style={maxw}>
          <h2 style={{ fontSize: 30, margin: 0, fontWeight: 900, textAlign: 'center' }}>Client Success Stories</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 16, marginTop: 20 }}>
            {[
              ['Alex P., Product Manager', '“Pyro helped me cut through the noise. Two interviews in 3 weeks.”'],
              ['Maya R., Data Analyst', '“The human touch matters. My specialist tailored every submission.”'],
              ['Sam K., Software Engineer', '“I finally stopped guessing. Clear updates and real opportunities.”']
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

      {/* Footer */}
      <footer id="resources" style={{ background: colors.dark, color: '#eaeaea', padding: '60px 16px 32px' }}>
        <div style={{ ...maxw }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 24 }}>
            <div>
              <div style={{ fontWeight: 700, marginBottom: 12, fontSize: 14, letterSpacing: '0.05em' }}>PRODUCTS</div>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'grid', gap: 10, fontSize: 14 }}>
                <li><a href="/login" style={{ color: '#ccc', textDecoration: 'none' }}>Client Portal</a></li>
                <li><a href="/staff/dashboard" style={{ color: '#ccc', textDecoration: 'none' }}>Staff Dashboard</a></li>
                <li><a href="/admin/dashboard" style={{ color: '#ccc', textDecoration: 'none' }}>Admin Console</a></li>
                <li><a href="#" style={{ color: '#ccc', textDecoration: 'none' }}>PyroAI Tools</a></li>
              </ul>
            </div>
            <div>
              <div style={{ fontWeight: 700, marginBottom: 12, fontSize: 14, letterSpacing: '0.05em' }}>SERVICES</div>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'grid', gap: 10, fontSize: 14 }}>
                <li><a href="/guarantee" style={{ color: '#ccc', textDecoration: 'none' }}>Job Offer Guarantee</a></li>
                <li><a href="/career-consulting" style={{ color: '#ccc', textDecoration: 'none' }}>Career Consulting</a></li>
                <li><a href="/resume-revision" style={{ color: '#ccc', textDecoration: 'none' }}>Résumé Revision</a></li>
                <li><a href="/full-service-apply" style={{ color: '#ccc', textDecoration: 'none' }}>Full-Service Apply</a></li>
                <li><a href="/interview-prep" style={{ color: '#ccc', textDecoration: 'none' }}>Interview Prep</a></li>
                <li><a href="/bundles" style={{ color: '#ccc', textDecoration: 'none' }}>Service Bundles</a></li>
              </ul>
            </div>
            <div id="about">
              <div style={{ fontWeight: 700, marginBottom: 12, fontSize: 14, letterSpacing: '0.05em' }}>COMPANY</div>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'grid', gap: 10, fontSize: 14 }}>
                <li><a href="/about" style={{ color: '#ccc', textDecoration: 'none' }}>About Us</a></li>
                <li><a href="/success-stories" style={{ color: '#ccc', textDecoration: 'none' }}>Success Stories</a></li>
                <li><a href="/employers" style={{ color: '#ccc', textDecoration: 'none' }}>Employers</a></li>
                <li><a href="/partnerships" style={{ color: '#ccc', textDecoration: 'none' }}>Partnerships</a></li>
                <li><a href="/press" style={{ color: '#ccc', textDecoration: 'none' }}>Press</a></li>
                <li><a href="/careers" style={{ color: '#ccc', textDecoration: 'none' }}>Careers</a></li>
              </ul>
            </div>
            <div>
              <div style={{ fontWeight: 700, marginBottom: 12, fontSize: 14, letterSpacing: '0.05em' }}>RESOURCES</div>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'grid', gap: 10, fontSize: 14 }}>
                <li><a href="/resources" style={{ color: '#ccc', textDecoration: 'none' }}>Resource Library</a></li>
                <li><a href="/job-search-hub" style={{ color: '#ccc', textDecoration: 'none' }}>Job Search Hub</a></li>
                <li><a href="/role-specific-resumes" style={{ color: '#ccc', textDecoration: 'none' }}>Role-Specific Résumés</a></li>
                <li><a href="/blog" style={{ color: '#ccc', textDecoration: 'none' }}>Blog</a></li>
                <li><a href="/faq" style={{ color: '#ccc', textDecoration: 'none' }}>FAQ</a></li>
              </ul>
            </div>
            <div>
              <div style={{ fontWeight: 700, marginBottom: 12, fontSize: 14, letterSpacing: '0.05em' }}>CONTACT</div>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'grid', gap: 10, fontSize: 14 }}>
                <li><a href="/contact" style={{ color: '#ccc', textDecoration: 'none' }}>Contact Us</a></li>
                <li style={{ color: '#ccc' }}>hello@pyrosolutions.com</li>
                <li style={{ color: '#ccc' }}>+1 (555) 123-4567</li>
              </ul>
            </div>
          </div>
          
          {/* Newsletter Subscribe */}
          <div style={{ marginTop: 40, paddingTop: 32, borderTop: '1px solid #3a3a3a', textAlign: 'center' }}>
            <div style={{ fontSize: 16, fontWeight: 700, marginBottom: 12 }}>Subscribe to Our Newsletter</div>
            <div style={{ display: 'flex', justifyContent: 'center', gap: 8, maxWidth: 400, margin: '0 auto' }}>
              <input 
                type="email" 
                placeholder="Enter your email" 
                style={{ 
                  flex: 1, 
                  padding: '12px 16px', 
                  border: 'none', 
                  borderRadius: 6, 
                  fontSize: 14 
                }} 
              />
              <button 
                style={{ 
                  padding: '12px 24px', 
                  background: colors.accent, 
                  color: colors.white, 
                  border: 'none', 
                  borderRadius: 6, 
                  fontWeight: 700, 
                  cursor: 'pointer',
                  fontSize: 14
                }}
              >
                Subscribe
              </button>
            </div>
          </div>

          {/* Bottom Bar */}
          <div style={{ marginTop: 32, paddingTop: 20, borderTop: '1px solid #3a3a3a', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12, fontSize: 13 }}>
            <div style={{ color: '#999' }}>© 2025 Pyro Solutions Inc. All rights reserved.</div>
            <div style={{ display: 'flex', gap: 20 }}>
              <a href="/privacy" style={{ color: '#999', textDecoration: 'none' }}>Privacy Policy</a>
              <a href="/terms" style={{ color: '#999', textDecoration: 'none' }}>Terms & Conditions</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default function HomePage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <HomePageContent />
    </Suspense>
  );
}
