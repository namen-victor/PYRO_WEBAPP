import { Navigation } from '@/components/Navigation';

export default function FullServiceApplyPage() {
  const colors = {
    pageBg: '#ebebeb',
    text: '#2e2e2e',
    accent: '#7aa3a1',
    white: '#FFFFFF',
    line: '#e2e2e2',
    dark: '#2e2e2e',
    teal: '#dff3ef'
  };

  const maxw: React.CSSProperties = { maxWidth: 1200, margin: '0 auto' };
  const section: React.CSSProperties = { padding: '72px 16px' };
  const cta: React.CSSProperties = { display: 'inline-block', padding: '14px 22px', background: colors.accent, color: colors.white, borderRadius: 999, textDecoration: 'none', fontWeight: 800 };

  return (
    <div style={{ background: colors.pageBg, color: colors.text }}>
      {/* Header */}
      <Navigation currentPage="services" />

      {/* Hero */}
      <section style={{ ...section, background: '#e3e3e3' }}>
        <div style={{ ...maxw, display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: 24, alignItems: 'center' }}>
          <div>
            <div style={{ fontSize: 12, letterSpacing: '0.18em', fontWeight: 800, color: '#666' }}>JOB APPLICATION SERVICE</div>
            <h1 style={{ margin: '8px 0 0 0', fontSize: 40, lineHeight: 1.1, fontWeight: 900 }}>Full-Service Apply to Jobs</h1>
            <h3 style={{ margin: '6px 0 0 0', fontSize: 22, fontWeight: 800 }}>Applying is tough. We make it easy.</h3>
            <p style={{ marginTop: 10, color: '#555', fontSize: 18 }}>You're a perfect fit somewhere. Let's find out where. Work with us to build your dream career.</p>
            <div style={{ marginTop: 14 }}>
              <a href="/signup" style={cta}>Find out how</a>
            </div>
          </div>
          <div>
            <div style={{ background: 'linear-gradient(135deg, #FFFFFF, #f7f7f7)', border: '1px solid #e2e2e2', borderRadius: 12, height: 320, boxShadow: '0 10px 30px rgba(0,0,0,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
              <div style={{ color: '#8a8a8a' }}>Candidate resting while we apply (image)</div>
              <div style={{ position: 'absolute', top: 20, right: 30, width: 26, height: 26, borderRadius: 6, background: '#f9c74f' }} />
              <div style={{ position: 'absolute', bottom: 30, left: 30, width: 34, height: 34, borderRadius: '50%', background: '#90e0c8' }} />
            </div>
          </div>
        </div>
      </section>

      {/* Contact callout */}
      <section style={{ background: '#ffe8b3', borderTop: '1px solid #f3d389', borderBottom: '1px solid #f3d389', padding: '18px 16px' }}>
        <div style={{ ...maxw, display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, flexWrap: 'wrap' }}>
          <div style={{ fontWeight: 800, color: '#5a4a1f' }}>Need to talk to someone now? Call us at (555) 555-5555</div>
          <a href="/login" style={{ ...cta, background: '#2e7d32' }}>CALL US NOW</a>
        </div>
      </section>

      {/* Pricing */}
      <section style={{ ...section, background: colors.white }}>
        <div style={maxw}>
          <h2 style={{ margin: 0, fontSize: 28, fontWeight: 900 }}>How many years of full-time work experience do you have?</h2>
          <div style={{ display: 'flex', gap: 10, marginTop: 12, flexWrap: 'wrap' }}>
            <button style={{ padding: '8px 12px', borderRadius: 999, border: '1px solid #e2e2e2', background: '#fff', cursor: 'pointer' }}>{'< 1 Year'}</button>
            <button style={{ padding: '8px 12px', borderRadius: 999, border: '1px solid #b9ddd6', background: colors.teal, fontWeight: 800, cursor: 'pointer' }}>1-7 Years</button>
            <button style={{ padding: '8px 12px', borderRadius: 999, border: '1px solid #e2e2e2', background: '#fff', cursor: 'pointer' }}>{'7+ Years'}</button>
          </div>
          <div style={{ marginTop: 18 }}>
            <div style={{ background: '#fafafa', border: '1px solid #e2e2e2', borderRadius: 12, padding: 18 }}>
              <div style={{ width: 40, height: 40, borderRadius: 8, background: '#e9e9e9', marginBottom: 10 }} />
              <div style={{ fontWeight: 800, fontSize: 18 }}>Full-Service Apply to Jobs</div>
              <ul style={{ margin: '10px 0', paddingLeft: 18, color: '#555' }}>
                <li>Apply to a wider range of jobs</li>
                <li>Save time on all your job applications</li>
                <li>Nap while we apply to jobs for you</li>
              </ul>
              <div style={{ marginTop: 8, fontSize: 22, fontWeight: 900 }}>As low as $38 per payment</div>
              <div style={{ marginTop: 2, color: '#666' }}>Or One Payment $149</div>
              <div style={{ marginTop: 12 }}>
                <a href="/signup" style={cta}>Buy Now</a>
              </div>
              <div style={{ marginTop: 10, color: '#777', fontSize: 12 }}>*Pay in 4 installments over 2 months; prices in USD; PayPal and ShopPay may charge interest; this is a one-time purchase, not a subscription.</div>
            </div>
          </div>
        </div>
      </section>

      {/* Cross-sell */}
      <section style={{ background: '#d7efe9', padding: '22px 16px', borderTop: '1px solid #e2e2e2', borderBottom: '1px solid #e2e2e2' }}>
        <div style={{ ...maxw, display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, flexWrap: 'wrap' }}>
          <div>
            <div style={{ fontWeight: 900, fontSize: 20 }}>Want the Full Experience?</div>
            <div style={{ color: '#555', marginTop: 4 }}>This service is included in our Ultimate Bundle with a Job Offer Guarantee.</div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{ width: 40, height: 40, borderRadius: '50%', background: '#b9ddd6' }} title="Pyro Specialist" />
            <a href="/guarantee" style={cta}>EXPLORE THE BUNDLE</a>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section style={section}>
        <div style={maxw}>
          <h2 style={{ margin: 0, fontSize: 28, fontWeight: 900 }}>Why Full-Service Apply to Jobs?</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 16, marginTop: 16 }}>
            {[
              ['Save time', 'We fill out applications across dozens of sites so you don\'t have to.'],
              ['Cast a wider net', 'We increase your odds by applying to a broader range of jobs.'],
              ['Expert guidance', 'Our experts know your skills and interests and where you\'re a perfect fit.']
            ].map(([t, d]) => (
              <div key={t} style={{ background: '#fafafa', border: '1px solid #e2e2e2', borderRadius: 12, padding: 18, position: 'relative' }}>
                <div style={{ position: 'absolute', top: -10, left: 18, width: 28, height: 28, borderRadius: '50%', background: '#e9e9e9' }} />
                <div style={{ fontWeight: 800, marginTop: 14 }}>{t}</div>
                <div style={{ color: '#666', marginTop: 6 }}>{d}</div>
              </div>
            ))}
          </div>
          <div style={{ marginTop: 18, textAlign: 'center' }}>
            <a href="/signup" style={cta}>Sign up today</a>
          </div>
        </div>
      </section>

      {/* Is it right for you */}
      <section style={{ ...section, background: colors.white }}>
        <div style={maxw}>
          <h2 style={{ margin: 0, fontSize: 28, fontWeight: 900 }}>Is Full-Service Apply to Jobs right for you?</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 16, marginTop: 18 }}>
            <div style={{ background: '#fff', border: '1px solid #e2e2e2', borderRadius: 12, padding: 18 }}>
              <div style={{ fontWeight: 900, marginBottom: 8, color: '#2e7d32' }}>✓ It's great for you if:</div>
              <ul style={{ margin: 0, padding: 0, listStyle: 'none', color: '#666', display: 'grid', gap: 8 }}>
                <li>• Not applying for as many jobs as you want</li>
                <li>• Want to quickly apply to 50 non-industry roles or 25 niche/H1B roles</li>
                <li>• Aggressively applying</li>
                <li>• Open to working remotely/relocating</li>
                <li>• Prioritize job titles, experience, location</li>
              </ul>
            </div>
            <div style={{ background: '#fff', border: '1px solid #e2e2e2', borderRadius: 12, padding: 18 }}>
              <div style={{ fontWeight: 900, marginBottom: 8, color: '#d32f2f' }}>⚠ Ask us before buying if:</div>
              <ul style={{ margin: 0, padding: 0, listStyle: 'none', color: '#666', display: 'grid', gap: 8 }}>
                <li>• Targeting federal government roles</li>
                <li>• Requiring specialized schooling (law, medicine)</li>
                <li>• Not wanting to cast a wide net</li>
                <li>• Unwilling to relocate</li>
                <li>• Expecting guaranteed salary packages</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Options comparison */}
      <section style={section}>
        <div style={maxw}>
          <h2 style={{ margin: 0, fontSize: 28, fontWeight: 900 }}>Full-Service Apply to Jobs Now Comes with 2 Options</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 16, marginTop: 18 }}>
            <div style={{ background: '#fff', border: '1px solid #e2e2e2', borderRadius: 12, padding: 18 }}>
              <div style={{ fontWeight: 900, fontSize: 18, marginBottom: 10 }}>Apply to 50 non-industry-specific jobs</div>
              <p style={{ color: '#666', margin: 0 }}>We use your years of experience, up to 3 locations, and at least 3 desired job titles to apply to 50 jobs.</p>
            </div>
            <div style={{ background: '#fff', border: '1px solid #e2e2e2', borderRadius: 12, padding: 18 }}>
              <div style={{ fontWeight: 900, fontSize: 18, marginBottom: 10 }}>Apply to 25 industry-niche and/or H1B visa jobs</div>
              <p style={{ color: '#666', margin: 0 }}>Target your perfect roles; narrow by industry (tech, education, healthcare), job titles, locations, and visa needs.</p>
            </div>
          </div>
          <div style={{ marginTop: 18, textAlign: 'center' }}>
            <a href="/signup" style={cta}>Choose your option & start applying</a>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section style={{ ...section, background: colors.white }}>
        <div style={maxw}>
          <h2 style={{ margin: 0, fontSize: 28, fontWeight: 900 }}>How it Works: Full-Service Apply to Jobs</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 14, marginTop: 18 }}>
            {[
              ['Tell us about yourself', 'Decide between 25 targeted applications and 50 general ones.'],
              ['We target the right jobs', 'We select quality jobs with fast turnarounds to maximize interview odds.'],
              ['Replace your applications', 'You have two business days to replace up to 5 job listings we selected.'],
              ['We finalize your list & start applying', 'We adjust your list based on your changes and apply to all approved roles within 5 business days.'],
              ['Get your results', 'After applying, we hand control back to you; you answer follow-ups and network.']
            ].map(([t, d], i) => (
              <div key={t} style={{ background: '#fafafa', border: '1px solid #e2e2e2', borderRadius: 12, padding: 18 }}>
                <div style={{ fontWeight: 900, color: colors.accent }}>{String(i + 1).padStart(2, '0')}</div>
                <div style={{ fontWeight: 800, marginTop: 6 }}>{t}</div>
                <div style={{ color: '#666', marginTop: 4 }}>{d}</div>
              </div>
            ))}
          </div>
          <div style={{ marginTop: 18, textAlign: 'center' }}>
            <a href="/signup" style={cta}>Sign up today</a>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section style={section}>
        <div style={maxw}>
          <h2 style={{ margin: 0, fontSize: 28, fontWeight: 900 }}>See how we helped others land their dream jobs</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 16, marginTop: 16 }}>
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} style={{ background: '#fff', border: '1px solid #e2e2e2', borderRadius: 12, padding: 16, boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <div style={{ width: 40, height: 40, borderRadius: '50%', background: '#d9d9d9' }} />
                  <div style={{ width: 60, height: 24, background: '#efefef', borderRadius: 6 }} />
                </div>
                <div style={{ marginTop: 10, fontStyle: 'italic' }}>"Pyro's application service helped me land interviews at top companies."</div>
                <div style={{ marginTop: 6, color: '#666' }}>Client story about how automated applications opened doors.</div>
              </div>
            ))}
          </div>
          <div style={{ marginTop: 18, display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(100px, 1fr))', gap: 12 }}>
            {['LinkedIn', 'Google', 'Amazon', 'Microsoft', 'Goldman Sachs', 'Tesla', 'Deloitte', 'McKinsey'].map((c) => (
              <div key={c} style={{ height: 28, background: '#efefef', border: '1px solid #e2e2e2', borderRadius: 6, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, color: '#999' }}>{c}</div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section style={{ ...section, paddingTop: 32, paddingBottom: 32 }}>
        <div style={{ ...maxw, background: '#e0f2ed', border: '1px solid #e2e2e2', borderRadius: 12, padding: 22, textAlign: 'center' }}>
          <div style={{ fontSize: 26, fontWeight: 900 }}>Your dream career starts here</div>
          <div style={{ marginTop: 6, color: '#555' }}>Increase your chances of getting a job without lifting a finger. Get up to 50 chances to land an interview.</div>
          <div style={{ marginTop: 8, fontWeight: 800 }}>As low as $38 per payment • One payment $149</div>
          <div style={{ marginTop: 12 }}>
            <a href="/signup" style={cta}>Buy Now</a>
          </div>
          <div style={{ marginTop: 10, color: '#666' }}>Questions about our services? Visit our <a href="#" style={{ color: colors.accent }}>FAQs page</a> or contact our team <a href="#" style={{ color: colors.accent }}>here</a>.</div>
        </div>
      </section>

      {/* Disclaimer */}
      <section style={{ background: '#f9f9f9', padding: '32px 16px', borderTop: '1px solid #e2e2e2' }}>
        <div style={maxw}>
          <div style={{ fontSize: 12, color: '#666', lineHeight: 1.6 }}>
            <strong>Disclaimer:</strong> Full-Service Apply to Jobs is a one-time service; we do not apply continuously for you; this is not a referral service; we may submit applications through trusted external boards; we cannot monitor your inbox once complete; we do not guarantee executive roles (CEO, CMO, etc.). If a role is too niche, clients must provide additional job titles and locations.
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ background: colors.dark, color: '#eaeaea', padding: '48px 16px' }}>
        <div style={maxw}>
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
                <li><a href="/career-consulting" style={{ color: 'inherit', textDecoration: 'none' }}>Career Consulting</a></li>
                <li><a href="/resume-revision" style={{ color: 'inherit', textDecoration: 'none' }}>Résumé Revision</a></li>
                <li><a href="/cover-letter-revision" style={{ color: 'inherit', textDecoration: 'none' }}>Cover Letter Revision</a></li>
                <li><a href="/linkedin-profile-revision" style={{ color: 'inherit', textDecoration: 'none' }}>LinkedIn Profile Revision</a></li>
                <li><a href="/job-search-strategies" style={{ color: 'inherit', textDecoration: 'none' }}>Job Search Strategies</a></li>
                <li style={{ fontWeight: 800 }}>Full-Service Apply to Jobs</li>
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


