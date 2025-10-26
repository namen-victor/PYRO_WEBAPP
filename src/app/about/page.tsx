import { Navigation } from '@/components/Navigation';

export default function AboutPage() {
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
      <Navigation currentPage="about" />

      <section style={{ padding: '72px 16px', paddingTop: 48 }}>
        <div style={{ ...maxw, display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: 32, alignItems: 'center' }}>
          <div>
            <div style={{ fontSize: 12, letterSpacing: '0.18em', fontWeight: 800, color: '#666', marginBottom: 12 }}>WE MAKE DREAM JOBS A REALITY</div>
            <h1 style={{ margin: 0, fontSize: 42, lineHeight: 1.1, fontWeight: 900 }}>About Pyro Solutions</h1>
            <p style={{ marginTop: 16, color: '#555', fontSize: 18, lineHeight: 1.6 }}>
              Founded in 2025, Pyro Solutions Inc. connects serious candidates with their dream roles by submitting tailored applications directly to company portals and coaching them through every step of the job search process.
            </p>
            <p style={{ marginTop: 12, color: '#555', fontSize: 18, lineHeight: 1.6 }}>
              We have helped thousands secure interviews and offers by combining human expertise with strategic application methods. From resume optimization to interview prep, we guide you all the way to landing your ideal position.
            </p>
            <div style={{ marginTop: 20, fontSize: 20, fontWeight: 800, color: colors.accent }}>
              Turning underdogs into winners
            </div>
          </div>
          <div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
              <div style={{ width: '100%', aspectRatio: '1', borderRadius: '50%', background: 'linear-gradient(135deg, #d9d9d9, #e9e9e9)', border: '3px solid #fff', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }} />
              <div style={{ width: '100%', aspectRatio: '1', borderRadius: '50%', background: 'linear-gradient(135deg, #d9d9d9, #e9e9e9)', border: '3px solid #fff', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }} />
              <div style={{ width: '100%', aspectRatio: '1', borderRadius: '50%', background: 'linear-gradient(135deg, #d9d9d9, #e9e9e9)', border: '3px solid #fff', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }} />
              <div style={{ width: '100%', aspectRatio: '1', borderRadius: '50%', background: 'linear-gradient(135deg, #d9d9d9, #e9e9e9)', border: '3px solid #fff', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }} />
            </div>
          </div>
        </div>
      </section>

      <section style={{ background: colors.dark, color: '#eee', padding: '48px 16px' }}>
        <div style={maxw}>
          <h2 style={{ margin: '0 0 32px 0', fontSize: 28, fontWeight: 900, textAlign: 'center' }}>Since 2025, we have accomplished:</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 24 }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: 36, fontWeight: 900, color: colors.white, marginBottom: 8 }}>50M+</div>
              <div style={{ fontSize: 14, color: '#ccc' }}>Views on professional development content</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: 36, fontWeight: 900, color: colors.white, marginBottom: 8 }}>1.5M+</div>
              <div style={{ fontSize: 14, color: '#ccc' }}>Community members</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: 36, fontWeight: 900, color: colors.white, marginBottom: 8 }}>220+</div>
              <div style={{ fontSize: 14, color: '#ccc' }}>Speaking engagements in 9 different countries</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: 36, fontWeight: 900, color: colors.white, marginBottom: 8 }}>70+</div>
              <div style={{ fontSize: 14, color: '#ccc' }}>Partnerships with companies like Google, Cisco and Zillow</div>
            </div>
          </div>
        </div>
      </section>

      <section style={{ padding: '72px 16px' }}>
        <div style={maxw}>
          <h2 style={{ margin: '0 0 32px 0', fontSize: 32, fontWeight: 900, textAlign: 'center' }}>Our Values</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 24 }}>
            <div style={{ background: colors.white, border: '1px solid #e2e2e2', borderRadius: 12, padding: 24, textAlign: 'center' }}>
              <div style={{ width: 60, height: 60, margin: '0 auto 16px', borderRadius: '50%', background: colors.teal, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <div style={{ width: 24, height: 24, borderRadius: 6, background: colors.accent }} />
              </div>
              <div style={{ fontWeight: 900, fontSize: 20, marginBottom: 12 }}>Empathy</div>
              <div style={{ color: '#666', lineHeight: 1.6 }}>We operate from a place of empathy and kindness. We prioritize having healthy conversations about what is going on in your life and being a safe space for you.</div>
            </div>
            <div style={{ background: colors.white, border: '1px solid #e2e2e2', borderRadius: 12, padding: 24, textAlign: 'center' }}>
              <div style={{ width: 60, height: 60, margin: '0 auto 16px', borderRadius: '50%', background: colors.teal, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <div style={{ width: 24, height: 24, borderRadius: 6, background: colors.accent }} />
              </div>
              <div style={{ fontWeight: 900, fontSize: 20, marginBottom: 12 }}>Equity</div>
              <div style={{ color: '#666', lineHeight: 1.6 }}>We want to ensure our services are accessible to all, particularly underrepresented talent. We provide affordable pricing and inclusive support for everyone.</div>
            </div>
            <div style={{ background: colors.white, border: '1px solid #e2e2e2', borderRadius: 12, padding: 24, textAlign: 'center' }}>
              <div style={{ width: 60, height: 60, margin: '0 auto 16px', borderRadius: '50%', background: colors.teal, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <div style={{ width: 24, height: 24, borderRadius: 6, background: colors.accent }} />
              </div>
              <div style={{ fontWeight: 900, fontSize: 20, marginBottom: 12 }}>Value Centric</div>
              <div style={{ color: '#666', lineHeight: 1.6 }}>We make sure to provide action-based resources to help our clients secure interviews and offers quickly. Everything we do is focused on delivering tangible results.</div>
            </div>
          </div>
        </div>
      </section>

      <section style={{ padding: '72px 16px', background: colors.white }}>
        <div style={maxw}>
          <h2 style={{ margin: '0 0 32px 0', fontSize: 32, fontWeight: 900, textAlign: 'center' }}>Meet Our Team</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: 24 }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ width: 120, height: 120, margin: '0 auto 12px', borderRadius: '50%', background: 'linear-gradient(135deg, #d9d9d9, #e9e9e9)', border: '3px solid #fff', boxShadow: '0 4px 12px rgba(0,0,0,0.08)' }} />
              <div style={{ fontWeight: 800, fontSize: 15, marginBottom: 4 }}>Jonathan Ziegler</div>
              <div style={{ fontSize: 13, color: '#666' }}>CEO</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ width: 120, height: 120, margin: '0 auto 12px', borderRadius: '50%', background: 'linear-gradient(135deg, #d9d9d9, #e9e9e9)', border: '3px solid #fff', boxShadow: '0 4px 12px rgba(0,0,0,0.08)' }} />
              <div style={{ fontWeight: 800, fontSize: 15, marginBottom: 4 }}>Jerry Lee</div>
              <div style={{ fontSize: 13, color: '#666' }}>COO</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ width: 120, height: 120, margin: '0 auto 12px', borderRadius: '50%', background: 'linear-gradient(135deg, #d9d9d9, #e9e9e9)', border: '3px solid #fff', boxShadow: '0 4px 12px rgba(0,0,0,0.08)' }} />
              <div style={{ fontWeight: 800, fontSize: 15, marginBottom: 4 }}>Cadejean Price</div>
              <div style={{ fontSize: 13, color: '#666' }}>Head of Business</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ width: 120, height: 120, margin: '0 auto 12px', borderRadius: '50%', background: 'linear-gradient(135deg, #d9d9d9, #e9e9e9)', border: '3px solid #fff', boxShadow: '0 4px 12px rgba(0,0,0,0.08)' }} />
              <div style={{ fontWeight: 800, fontSize: 15, marginBottom: 4 }}>Daniel Cho</div>
              <div style={{ fontSize: 13, color: '#666' }}>Product & Operations Manager</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ width: 120, height: 120, margin: '0 auto 12px', borderRadius: '50%', background: 'linear-gradient(135deg, #d9d9d9, #e9e9e9)', border: '3px solid #fff', boxShadow: '0 4px 12px rgba(0,0,0,0.08)' }} />
              <div style={{ fontWeight: 800, fontSize: 15, marginBottom: 4 }}>Martin Weissenfels</div>
              <div style={{ fontSize: 13, color: '#666' }}>Engineering Lead</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ width: 120, height: 120, margin: '0 auto 12px', borderRadius: '50%', background: 'linear-gradient(135deg, #d9d9d9, #e9e9e9)', border: '3px solid #fff', boxShadow: '0 4px 12px rgba(0,0,0,0.08)' }} />
              <div style={{ fontWeight: 800, fontSize: 15, marginBottom: 4 }}>Lauren Gollosky</div>
              <div style={{ fontSize: 13, color: '#666' }}>Head of Design</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ width: 120, height: 120, margin: '0 auto 12px', borderRadius: '50%', background: 'linear-gradient(135deg, #d9d9d9, #e9e9e9)', border: '3px solid #fff', boxShadow: '0 4px 12px rgba(0,0,0,0.08)' }} />
              <div style={{ fontWeight: 800, fontSize: 15, marginBottom: 4 }}>Nada Benotti</div>
              <div style={{ fontSize: 13, color: '#666' }}>Engineering Lead</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ width: 120, height: 120, margin: '0 auto 12px', borderRadius: '50%', background: 'linear-gradient(135deg, #d9d9d9, #e9e9e9)', border: '3px solid #fff', boxShadow: '0 4px 12px rgba(0,0,0,0.08)' }} />
              <div style={{ fontWeight: 800, fontSize: 15, marginBottom: 4 }}>Ken Burnette</div>
              <div style={{ fontSize: 13, color: '#666' }}>Senior Operations</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ width: 120, height: 120, margin: '0 auto 12px', borderRadius: '50%', background: 'linear-gradient(135deg, #d9d9d9, #e9e9e9)', border: '3px solid #fff', boxShadow: '0 4px 12px rgba(0,0,0,0.08)' }} />
              <div style={{ fontWeight: 800, fontSize: 15, marginBottom: 4 }}>Sher Baz Man</div>
              <div style={{ fontSize: 13, color: '#666' }}>Customer Success</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ width: 120, height: 120, margin: '0 auto 12px', borderRadius: '50%', background: 'linear-gradient(135deg, #d9d9d9, #e9e9e9)', border: '3px solid #fff', boxShadow: '0 4px 12px rgba(0,0,0,0.08)' }} />
              <div style={{ fontWeight: 800, fontSize: 15, marginBottom: 4 }}>Fernando Aguilar</div>
              <div style={{ fontSize: 13, color: '#666' }}>Product Sales</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ width: 120, height: 120, margin: '0 auto 12px', borderRadius: '50%', background: 'linear-gradient(135deg, #d9d9d9, #e9e9e9)', border: '3px solid #fff', boxShadow: '0 4px 12px rgba(0,0,0,0.08)' }} />
              <div style={{ fontWeight: 800, fontSize: 15, marginBottom: 4 }}>Saul Villegas</div>
              <div style={{ fontSize: 13, color: '#666' }}>Email Marketing</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ width: 120, height: 120, margin: '0 auto 12px', borderRadius: '50%', background: 'linear-gradient(135deg, #d9d9d9, #e9e9e9)', border: '3px solid #fff', boxShadow: '0 4px 12px rgba(0,0,0,0.08)' }} />
              <div style={{ fontWeight: 800, fontSize: 15, marginBottom: 4 }}>Arif Haq</div>
              <div style={{ fontSize: 13, color: '#666' }}>Email Marketing</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ width: 120, height: 120, margin: '0 auto 12px', borderRadius: '50%', background: 'linear-gradient(135deg, #d9d9d9, #e9e9e9)', border: '3px solid #fff', boxShadow: '0 4px 12px rgba(0,0,0,0.08)' }} />
              <div style={{ fontWeight: 800, fontSize: 15, marginBottom: 4 }}>Mark Lawrence</div>
              <div style={{ fontSize: 13, color: '#666' }}>Affiliate Specialist</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ width: 120, height: 120, margin: '0 auto 12px', borderRadius: '50%', background: 'linear-gradient(135deg, #d9d9d9, #e9e9e9)', border: '3px solid #fff', boxShadow: '0 4px 12px rgba(0,0,0,0.08)' }} />
              <div style={{ fontWeight: 800, fontSize: 15, marginBottom: 4 }}>Mariel Pilongo</div>
              <div style={{ fontSize: 13, color: '#666' }}>Executive Assistant</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ width: 120, height: 120, margin: '0 auto 12px', borderRadius: '50%', background: 'linear-gradient(135deg, #d9d9d9, #e9e9e9)', border: '3px solid #fff', boxShadow: '0 4px 12px rgba(0,0,0,0.08)' }} />
              <div style={{ fontWeight: 800, fontSize: 15, marginBottom: 4 }}>Angela Lomba</div>
              <div style={{ fontSize: 13, color: '#666' }}>Executive Assistant</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ width: 120, height: 120, margin: '0 auto 12px', borderRadius: '50%', background: 'linear-gradient(135deg, #d9d9d9, #e9e9e9)', border: '3px solid #fff', boxShadow: '0 4px 12px rgba(0,0,0,0.08)' }} />
              <div style={{ fontWeight: 800, fontSize: 15, marginBottom: 4 }}>Ada Nwanko</div>
              <div style={{ fontSize: 13, color: '#666' }}>QA Support</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ width: 120, height: 120, margin: '0 auto 12px', borderRadius: '50%', background: 'linear-gradient(135deg, #d9d9d9, #e9e9e9)', border: '3px solid #fff', boxShadow: '0 4px 12px rgba(0,0,0,0.08)' }} />
              <div style={{ fontWeight: 800, fontSize: 15, marginBottom: 4 }}>Tawanda Mtanda</div>
              <div style={{ fontSize: 13, color: '#666' }}>Specialist</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ width: 120, height: 120, margin: '0 auto 12px', borderRadius: '50%', background: 'linear-gradient(135deg, #d9d9d9, #e9e9e9)', border: '3px solid #fff', boxShadow: '0 4px 12px rgba(0,0,0,0.08)' }} />
              <div style={{ fontWeight: 800, fontSize: 15, marginBottom: 4 }}>Alyssa Rae</div>
              <div style={{ fontSize: 13, color: '#666' }}>Operations Assistant</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ width: 120, height: 120, margin: '0 auto 12px', borderRadius: '50%', background: 'linear-gradient(135deg, #d9d9d9, #e9e9e9)', border: '3px solid #fff', boxShadow: '0 4px 12px rgba(0,0,0,0.08)' }} />
              <div style={{ fontWeight: 800, fontSize: 15, marginBottom: 4 }}>Steph Vlad</div>
              <div style={{ fontSize: 13, color: '#666' }}>Senior Consultant</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ width: 120, height: 120, margin: '0 auto 12px', borderRadius: '50%', background: 'linear-gradient(135deg, #d9d9d9, #e9e9e9)', border: '3px solid #fff', boxShadow: '0 4px 12px rgba(0,0,0,0.08)' }} />
              <div style={{ fontWeight: 800, fontSize: 15, marginBottom: 4 }}>Shanteri Naidoo</div>
              <div style={{ fontSize: 13, color: '#666' }}>Senior Consultant</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ width: 120, height: 120, margin: '0 auto 12px', borderRadius: '50%', background: 'linear-gradient(135deg, #d9d9d9, #e9e9e9)', border: '3px solid #fff', boxShadow: '0 4px 12px rgba(0,0,0,0.08)' }} />
              <div style={{ fontWeight: 800, fontSize: 15, marginBottom: 4 }}>Tatenda Mangondo</div>
              <div style={{ fontSize: 13, color: '#666' }}>Operations Assistant</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ width: 120, height: 120, margin: '0 auto 12px', borderRadius: '50%', background: 'linear-gradient(135deg, #d9d9d9, #e9e9e9)', border: '3px solid #fff', boxShadow: '0 4px 12px rgba(0,0,0,0.08)' }} />
              <div style={{ fontWeight: 800, fontSize: 15, marginBottom: 4 }}>Christian Villamil</div>
              <div style={{ fontSize: 13, color: '#666' }}>Senior Business Developer</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ width: 120, height: 120, margin: '0 auto 12px', borderRadius: '50%', background: 'linear-gradient(135deg, #d9d9d9, #e9e9e9)', border: '3px solid #fff', boxShadow: '0 4px 12px rgba(0,0,0,0.08)' }} />
              <div style={{ fontWeight: 800, fontSize: 15, marginBottom: 4 }}>Hugh Butteri</div>
              <div style={{ fontSize: 13, color: '#666' }}>Career Associate</div>
            </div>
          </div>
        </div>
      </section>

      <section style={{ padding: '72px 16px', textAlign: 'center' }}>
        <div style={maxw}>
          <h2 style={{ margin: 0, fontSize: 32, fontWeight: 900 }}>Ready to make your dream job a <span style={{ color: colors.accent }}>reality</span>?</h2>
          <p style={{ marginTop: 12, color: '#555', fontSize: 18 }}>Get personal attention with each of our services, or join a community of learners in our online courses.</p>
          <div style={{ display: 'flex', gap: 12, marginTop: 20, justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href="#" style={{ ...cta, background: colors.dark }}>Try PyroAI for free</a>
            <a href="/guarantee" style={cta}>Book a Free Consultation</a>
          </div>
          <div style={{ marginTop: 16, color: '#666' }}>
            Questions about our services? Check out our <a href="#" style={{ color: colors.accent }}>FAQs page</a> or contact our team <a href="#" style={{ color: colors.accent }}>here</a>.
          </div>
        </div>
      </section>

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
                <li><a href="/resume-revision" style={{ color: 'inherit', textDecoration: 'none' }}>Resume Revision</a></li>
                <li><a href="/cover-letter-revision" style={{ color: 'inherit', textDecoration: 'none' }}>Cover Letter Revision</a></li>
                <li><a href="/linkedin-profile-revision" style={{ color: 'inherit', textDecoration: 'none' }}>LinkedIn Profile Revision</a></li>
                <li><a href="/job-search-strategies" style={{ color: 'inherit', textDecoration: 'none' }}>Job Search Strategies</a></li>
                <li><a href="/full-service-apply" style={{ color: 'inherit', textDecoration: 'none' }}>Full-Service Apply</a></li>
                <li><a href="/interview-prep" style={{ color: 'inherit', textDecoration: 'none' }}>Interview Prep</a></li>
              </ul>
            </div>
            <div>
              <div style={{ fontWeight: 900, marginBottom: 10 }}>Company</div>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'grid', gap: 8 }}>
                <li style={{ fontWeight: 800 }}>About Us</li>
                <li>Success Stories</li>
                <li>Employers</li>
                <li>Partnerships</li>
                <li>Press</li>
                <li>Careers</li>
              </ul>
            </div>
            <div>
              <div style={{ fontWeight: 900, marginBottom: 10 }}>Resources</div>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'grid', gap: 8 }}>
                <li>Blog</li>
                <li>Resource Library</li>
                <li>Job Search Hub</li>
                <li>FAQ</li>
              </ul>
            </div>
            <div>
              <div style={{ fontWeight: 900, marginBottom: 10 }}>Contact</div>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'grid', gap: 8 }}>
                <li><a href="mailto:support@pyrosolutions.com" style={{ color: 'inherit', textDecoration: 'none' }}>support@pyrosolutions.com</a></li>
                <li>(555) 555-5555</li>
              </ul>
            </div>
          </div>
          <div style={{ marginTop: 24, display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, flexWrap: 'wrap' }}>
            <div style={{ fontSize: 14 }}>Turning underdogs into winners</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <div title="Twitter" style={{ width: 28, height: 28, borderRadius: 6, background: '#3a3a3a' }} />
              <div title="LinkedIn" style={{ width: 28, height: 28, borderRadius: 6, background: '#3a3a3a' }} />
              <div title="Instagram" style={{ width: 28, height: 28, borderRadius: 6, background: '#3a3a3a' }} />
              <div title="YouTube" style={{ width: 28, height: 28, borderRadius: 6, background: '#3a3a3a' }} />
              <div title="TikTok" style={{ width: 28, height: 28, borderRadius: 6, background: '#3a3a3a' }} />
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
