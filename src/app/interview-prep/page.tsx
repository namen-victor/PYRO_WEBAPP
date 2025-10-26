import { Navigation } from '@/components/Navigation';

export default function InterviewPrepPage() {
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
            <div style={{ fontSize: 12, letterSpacing: '0.18em', fontWeight: 800, color: '#666' }}>INTERVIEW PREP & TRAINING SERVICES</div>
            <h1 style={{ margin: '8px 0 0 0', fontSize: 40, lineHeight: 1.1, fontWeight: 900 }}>Interview Preparation</h1>
            <h3 style={{ margin: '6px 0 0 0', fontSize: 22, fontWeight: 800 }}>Train with a pro. Ace your interviews.</h3>
            <p style={{ marginTop: 10, color: '#555', fontSize: 18 }}>Landing interviews is hard. Passing them might be harder. We'll train you one-on-one to crush your behavioral interviews and get hired.</p>
            <div style={{ marginTop: 14 }}>
              <a href="/signup" style={cta}>Find out how</a>
            </div>
          </div>
          <div>
            <div style={{ background: 'linear-gradient(135deg, #FFFFFF, #f7f7f7)', border: '1px solid #e2e2e2', borderRadius: 12, height: 320, boxShadow: '0 10px 30px rgba(0,0,0,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
              <div style={{ color: '#8a8a8a' }}>Candidate practicing with coach (image)</div>
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
              <div style={{ fontWeight: 800, fontSize: 18 }}>Interview Prep</div>
              <p style={{ color: '#666', marginTop: 6 }}>Train one-on-one with an interview pro. Like any skill, you need practice. Perform two 30-minute mock interviews. Get valuable feedback after each session. Gain confidence for your next real interview.</p>
              <div style={{ marginTop: 8, fontSize: 22, fontWeight: 900 }}>As low as $38 per payment</div>
              <div style={{ marginTop: 2, color: '#666' }}>Or One Payment $149</div>
              <div style={{ marginTop: 12 }}>
                <a href="/signup" style={cta}>Buy Now</a>
              </div>
              <div style={{ marginTop: 10, color: '#777', fontSize: 12 }}>*Pay in 4 easy installments over 2 months. Prices in USD. PayPal and ShopPay may charge interest. This is a one-time purchase, not a subscription.</div>
            </div>
          </div>
        </div>
      </section>

      {/* Cross-sell */}
      <section style={{ background: '#d7efe9', padding: '22px 16px', borderTop: '1px solid #e2e2e2', borderBottom: '1px solid #e2e2e2' }}>
        <div style={{ ...maxw, display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, flexWrap: 'wrap' }}>
          <div>
            <div style={{ fontWeight: 900, fontSize: 20 }}>Want the Full Experience?</div>
            <div style={{ color: '#555', marginTop: 4 }}>This service is included in our Ultimate Bundle with a Job Offer Guarantee!</div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{ width: 40, height: 40, borderRadius: '50%', background: '#b9ddd6' }} title="Pyro Specialist" />
            <a href="/guarantee" style={cta}>EXPLORE THE BUNDLE</a>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section style={section}>
        <div style={maxw}>
          <h2 style={{ margin: 0, fontSize: 28, fontWeight: 900 }}>How it Works</h2>
          <p style={{ marginTop: 6, color: '#555' }}>Get trained in the art of the interview.</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 14, marginTop: 18 }}>
            {[
              ['Introduce yourself', 'Fill out a questionnaire about your background and target role so we can pair you with the right coach.'],
              ['We design your interview (1-2 days)', 'Together we create a custom mock interview based on your targeted role and industry.'],
              ['First mock interview (2 days)', 'Conduct and record your first mock interview; we take notes on strengths and weaknesses.'],
              ['We provide feedback (2-3 days)', 'Send detailed feedback and answer your questions before the second session.'],
              ['Second mock interview (2 days)', 'Drill deeper into your interview skills.'],
              ['Feedback and tips sent (2 days)', 'Deliver final feedback, tips, and guidance to prepare you for real interviews.']
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

      {/* Benefits */}
      <section style={{ ...section, background: colors.white }}>
        <div style={maxw}>
          <h2 style={{ margin: 0, fontSize: 28, fontWeight: 900 }}>Interview Preparation Benefits</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 16, marginTop: 16 }}>
            {[
              ['Real interviewers', 'Our interview prep team consists of hiring managers, recruiters, and industry professionals.'],
              ['Personal guidance', 'Guidance from industry professionals who know the best interviewing techniques.'],
              ['Competitive advantage', 'Few applicants train with professionals—this gives you an edge.']
            ].map(([t, d]) => (
              <div key={t} style={{ background: '#fafafa', border: '1px solid #e2e2e2', borderRadius: 12, padding: 18, position: 'relative' }}>
                <div style={{ position: 'absolute', top: -10, left: 18, width: 28, height: 28, borderRadius: '50%', background: '#e9e9e9' }} />
                <div style={{ fontWeight: 800, marginTop: 14 }}>{t}</div>
                <div style={{ color: '#666', marginTop: 6 }}>{d}</div>
              </div>
            ))}
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
                <div style={{ marginTop: 10, fontStyle: 'italic' }}>"Pyro's interview prep gave me the confidence to ace my interviews."</div>
                <div style={{ marginTop: 6, color: '#666' }}>Client story about how mock interviews improved their performance.</div>
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

      {/* Trouble passing interviews CTA */}
      <section style={{ background: colors.dark, color: '#eee', padding: '40px 16px' }}>
        <div style={{ ...maxw, textAlign: 'center' }}>
          <h2 style={{ margin: 0, fontSize: 28, fontWeight: 900 }}>Trouble passing interviews?</h2>
          <p style={{ marginTop: 10, maxWidth: 600, margin: '10px auto 0' }}>If you're not passing interviews, PyroINC can help. Our team of hiring managers and industry pros will train you through two mock interviews, giving you strategies and confidence.</p>
          <div style={{ marginTop: 12, fontWeight: 800, fontSize: 18 }}>As low as $38 per payment • Or One Payment $149</div>
          <div style={{ marginTop: 14 }}>
            <a href="/signup" style={{ ...cta, background: colors.white, color: colors.dark }}>Buy Now</a>
          </div>
        </div>
      </section>

      {/* Final CTA card */}
      <section style={{ ...section, paddingTop: 32, paddingBottom: 32 }}>
        <div style={{ ...maxw, background: '#e0f2ed', border: '1px solid #e2e2e2', borderRadius: 12, padding: 22, textAlign: 'center' }}>
          <div style={{ fontSize: 26, fontWeight: 900 }}>Master your interviews</div>
          <div style={{ marginTop: 6, color: '#555' }}>Train with industry professionals and gain the confidence to ace your next interview.</div>
          <div style={{ marginTop: 8, fontWeight: 800 }}>As low as $75 per payment • One payment $299</div>
          <div style={{ marginTop: 12 }}>
            <a href="/signup" style={cta}>Buy Now</a>
          </div>
          <div style={{ marginTop: 10, color: '#666' }}>Questions about our services? Visit our <a href="#" style={{ color: colors.accent }}>FAQs page</a> or contact our team <a href="#" style={{ color: colors.accent }}>here</a>.</div>
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
                <li><a href="/full-service-apply" style={{ color: 'inherit', textDecoration: 'none' }}>Full-Service Apply to Jobs</a></li>
                <li style={{ fontWeight: 800 }}>Interview Prep</li>
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


