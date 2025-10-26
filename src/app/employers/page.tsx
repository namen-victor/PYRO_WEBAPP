import { Navigation } from '@/components/Navigation';

export default function EmployersPage() {
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
  const cta: React.CSSProperties = { display: 'inline-block', padding: '14px 22px', background: colors.accent, color: colors.white, borderRadius: 999, textDecoration: 'none', fontWeight: 800 };

  return (
    <div style={{ background: colors.pageBg, color: colors.text }}>
      <Navigation currentPage="employers" />

      <section style={{ background: colors.dark, color: colors.white, padding: '80px 16px' }}>
        <div style={{ ...maxw, display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: 48, alignItems: 'center' }}>
          <div>
            <h1 style={{ margin: 0, fontSize: 48, lineHeight: 1.1, fontWeight: 900 }}>Stop drowning in resumes. Start finding real talent.</h1>
            <p style={{ marginTop: 20, fontSize: 20, lineHeight: 1.6, color: '#e0e0e0' }}>
              Connect with thousands of motivated, pre-screened candidates who are ready for the roles you need to fill.
            </p>
            <a href="mailto:employers@pyrosolutions.com" style={{ ...cta, marginTop: 24, display: 'inline-block' }}>Talk with us</a>
          </div>
          <div>
            <div style={{ width: '100%', aspectRatio: '4/3', borderRadius: 16, background: 'linear-gradient(135deg, #555, #777)', border: '3px solid #fff', boxShadow: '0 8px 24px rgba(0,0,0,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <div style={{ textAlign: 'center', color: '#ccc', fontSize: 14 }}>Recruiter reviewing qualified candidates</div>
            </div>
          </div>
        </div>
      </section>

      <section style={{ padding: '72px 16px' }}>
        <div style={maxw}>
          <h2 style={{ margin: '0 0 16px 0', fontSize: 36, fontWeight: 900, textAlign: 'center' }}>Streamline your recruitment process</h2>
          <p style={{ maxWidth: 700, margin: '0 auto 48px', textAlign: 'center', color: '#555', fontSize: 18, lineHeight: 1.6 }}>
            PyroINC prepares candidates with tailored applications and skills, so you can focus on final interviews and cultural fit. We handle the heavy lifting so you can hire faster and smarter.
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 24 }}>
            <div style={{ background: colors.white, border: '1px solid #e2e2e2', borderRadius: 12, padding: 32, textAlign: 'center' }}>
              <div style={{ width: 60, height: 60, margin: '0 auto 16px', borderRadius: '50%', background: colors.teal, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <div style={{ width: 24, height: 24, borderRadius: 6, background: colors.accent }} />
              </div>
              <div style={{ fontWeight: 900, fontSize: 20, marginBottom: 12 }}>Qualified Candidates</div>
              <div style={{ color: '#666', lineHeight: 1.6 }}>Our human-led process means every applicant has been screened, coached, and aligned to your job requirements.</div>
            </div>
            <div style={{ background: colors.white, border: '1px solid #e2e2e2', borderRadius: 12, padding: 32, textAlign: 'center' }}>
              <div style={{ width: 60, height: 60, margin: '0 auto 16px', borderRadius: '50%', background: colors.teal, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <div style={{ width: 24, height: 24, borderRadius: 6, background: colors.accent }} />
              </div>
              <div style={{ fontWeight: 900, fontSize: 20, marginBottom: 12 }}>Save Time</div>
              <div style={{ color: '#666', lineHeight: 1.6 }}>We reduce your resume pile by curating only serious, prepared job seekers who match your criteria.</div>
            </div>
            <div style={{ background: colors.white, border: '1px solid #e2e2e2', borderRadius: 12, padding: 32, textAlign: 'center' }}>
              <div style={{ width: 60, height: 60, margin: '0 auto 16px', borderRadius: '50%', background: colors.teal, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <div style={{ width: 24, height: 24, borderRadius: 6, background: colors.accent }} />
              </div>
              <div style={{ fontWeight: 900, fontSize: 20, marginBottom: 12 }}>Diverse Talent Pool</div>
              <div style={{ color: '#666', lineHeight: 1.6 }}>Our network includes professionals from underrepresented backgrounds across industries and experience levels.</div>
            </div>
          </div>
        </div>
      </section>

      <section style={{ padding: '72px 16px', background: colors.teal }}>
        <div style={{ ...maxw, textAlign: 'center' }}>
          <h2 style={{ margin: '0 0 16px 0', fontSize: 36, fontWeight: 900 }}>Your next great hire is already in our network.</h2>
          <p style={{ maxWidth: 700, margin: '0 auto 32px', color: '#555', fontSize: 18, lineHeight: 1.6 }}>
            PyroINC community comprises thousands of job seekers actively preparing for roles. Employers can tap into this pool by partnering with Pyro to access pre-vetted, interview-ready candidates.
          </p>
          <a href="mailto:employers@pyrosolutions.com?subject=Request Candidate List" style={{ ...cta, background: colors.dark }}>Request Candidate List</a>
        </div>
      </section>

      <section style={{ padding: '72px 16px' }}>
        <div style={maxw}>
          <h2 style={{ margin: '0 0 48px 0', fontSize: 32, fontWeight: 900, textAlign: 'center' }}>What employers are saying</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 24 }}>
            <div style={{ background: colors.white, border: '1px solid #e2e2e2', borderRadius: 12, padding: 24 }}>
              <div style={{ width: 80, height: 80, margin: '0 0 16px 0', borderRadius: 8, background: 'linear-gradient(135deg, #d9d9d9, #e9e9e9)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, color: '#999' }}>Company Logo</div>
              <div style={{ fontSize: 16, lineHeight: 1.6, color: '#555', marginBottom: 16 }}>
                "PyroINC helped us cut our hiring time in half. The candidates they sent were polished, prepared, and ready to contribute from day one."
              </div>
              <div style={{ fontWeight: 800 }}>Sarah Chen</div>
              <div style={{ fontSize: 14, color: '#666' }}>Head of Talent, TechCorp</div>
            </div>
            <div style={{ background: colors.white, border: '1px solid #e2e2e2', borderRadius: 12, padding: 24 }}>
              <div style={{ width: 80, height: 80, margin: '0 0 16px 0', borderRadius: 8, background: 'linear-gradient(135deg, #d9d9d9, #e9e9e9)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, color: '#999' }}>Company Logo</div>
              <div style={{ fontSize: 16, lineHeight: 1.6, color: '#555', marginBottom: 16 }}>
                "We were struggling to find diverse talent. PyroINC connected us with exceptional candidates from backgrounds we had never reached before."
              </div>
              <div style={{ fontWeight: 800 }}>Marcus Johnson</div>
              <div style={{ fontSize: 14, color: '#666' }}>VP of HR, FinanceHub</div>
            </div>
            <div style={{ background: colors.white, border: '1px solid #e2e2e2', borderRadius: 12, padding: 24 }}>
              <div style={{ width: 80, height: 80, margin: '0 0 16px 0', borderRadius: 8, background: 'linear-gradient(135deg, #d9d9d9, #e9e9e9)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, color: '#999' }}>Company Logo</div>
              <div style={{ fontSize: 16, lineHeight: 1.6, color: '#555', marginBottom: 16 }}>
                "The quality of applicants from PyroINC is unmatched. Every interview felt productive, and we made three hires in one month."
              </div>
              <div style={{ fontWeight: 800 }}>Emily Rodriguez</div>
              <div style={{ fontSize: 14, color: '#666' }}>Recruiting Manager, StartupX</div>
            </div>
          </div>
        </div>
      </section>

      <section style={{ padding: '72px 16px', background: colors.white }}>
        <div style={{ ...maxw, textAlign: 'center' }}>
          <h2 style={{ margin: '0 0 16px 0', fontSize: 36, fontWeight: 900 }}>Partner with PyroINC</h2>
          <p style={{ maxWidth: 700, margin: '0 auto 32px', color: '#555', fontSize: 18, lineHeight: 1.6 }}>
            Whether you are a fast-growing startup or an established enterprise, we are ready to connect you with exceptional candidates who are trained and ready to interview.
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16 }}>
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', justifyContent: 'center' }}>
              <a href="mailto:employers@pyrosolutions.com" style={{ ...cta, background: colors.dark }}>Schedule a Call</a>
              <a href="mailto:employers@pyrosolutions.com" style={cta}>Email Us</a>
            </div>
            <div style={{ marginTop: 8, color: '#666' }}>
              <strong>Email:</strong> <a href="mailto:employers@pyrosolutions.com" style={{ color: colors.accent }}>employers@pyrosolutions.com</a> | <strong>Phone:</strong> (555) 555-5555
            </div>
          </div>
        </div>
      </section>

      <section style={{ background: colors.dark, color: colors.white, padding: '64px 16px', textAlign: 'center' }}>
        <div style={maxw}>
          <h2 style={{ margin: '0 0 16px 0', fontSize: 36, fontWeight: 900 }}>Ready to hire better candidates?</h2>
          <p style={{ margin: '0 0 24px 0', fontSize: 18, color: '#e0e0e0' }}>Join the companies that trust PyroINC to deliver top talent.</p>
          <a href="mailto:employers@pyrosolutions.com?subject=Partner with PyroINC" style={{ ...cta, background: colors.white, color: colors.dark }}>Partner with PyroINC</a>
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
                <li><a href="/about" style={{ color: 'inherit', textDecoration: 'none' }}>About Us</a></li>
                <li>Success Stories</li>
                <li style={{ fontWeight: 800 }}>Employers</li>
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
                <li><a href="mailto:employers@pyrosolutions.com" style={{ color: 'inherit', textDecoration: 'none' }}>employers@pyrosolutions.com</a></li>
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
