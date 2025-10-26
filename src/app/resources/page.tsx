import { Navigation } from '@/components/Navigation';

export default function ResourcesPage() {
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
  const cta: React.CSSProperties = { display: 'inline-block', padding: '14px 28px', background: colors.accent, color: colors.white, borderRadius: 8, textDecoration: 'none', fontWeight: 800, fontSize: 16 };

  const resources = [
    {
      title: 'PyroINC Resume Template',
      description: 'Download the resume template that has helped thousands land jobs. Take charge of your career and get closer to your job opportunity.',
      buttonText: 'GET YOUR JOB WINNING RESUME',
      link: '/resume-template'
    },
    {
      title: 'Free Resume Feedback',
      description: 'Get expert feedback that has landed jobs at top companies like Google, Microsoft, and JP Morgan. Submit your resume and boost your chances of getting noticed.',
      buttonText: 'GET EXPERT FEEDBACK NOW',
      link: '#free-feedback'
    },
    {
      title: 'PyroINC Cover Letter Template',
      description: 'Save time with a cover letter template that works. Download now and focus on landing interviews, or get personalized help with our career consultants.',
      buttonText: 'GRAB ATTENTION - DOWNLOAD NOW',
      link: '/cover-letter-template'
    },
    {
      title: 'The 14 Day Job Search Challenge',
      description: 'Get 14 Days of Practical Job Search Tips Sent to Your Inbox That has Helped Our Clients Land Jobs At Google, Meta, Amazon, and more!',
      buttonText: 'SIGN UP HERE',
      link: '#job-search-challenge'
    }
  ];

  return (
    <div style={{ background: colors.pageBg, color: colors.text }}>
      <Navigation currentPage="resources" />

      <section style={{ padding: '80px 16px', textAlign: 'center' }}>
        <div style={maxw}>
          <div style={{ fontSize: 14, letterSpacing: '0.15em', fontWeight: 800, color: '#666', marginBottom: 12 }}>CAREER RESOURCES</div>
          <h1 style={{ margin: 0, fontSize: 48, lineHeight: 1.1, fontWeight: 900 }}>Essential Resources to Get You Hired</h1>
          <p style={{ marginTop: 16, fontSize: 18, color: '#666', maxWidth: 700, marginLeft: 'auto', marginRight: 'auto' }}>
            Picture yourself landing interviews faster—our no-cost templates and feedback make it happen.
          </p>
        </div>
      </section>

      <section style={{ padding: '72px 16px' }}>
        <div style={maxw}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: 32 }}>
            {resources.map((resource, index) => (
              <div key={index} style={{ background: colors.white, border: '1px solid #e2e2e2', borderRadius: 12, padding: 32, display: 'flex', flexDirection: 'column' }}>
                <div style={{ flex: 1 }}>
                  <h3 style={{ margin: '0 0 16px 0', fontSize: 24, fontWeight: 900 }}>{resource.title}</h3>
                  <p style={{ margin: '0 0 24px 0', color: '#666', lineHeight: 1.6 }}>{resource.description}</p>
                </div>
                <a href={resource.link} style={{ ...cta, textAlign: 'center', fontSize: 14 }}>{resource.buttonText}</a>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ padding: '72px 16px', background: 'linear-gradient(135deg, #1e5f5d, #2a7a77)', color: colors.white, textAlign: 'center' }}>
        <div style={maxw}>
          <h2 style={{ margin: '0 0 16px 0', fontSize: 36, fontWeight: 900 }}>Struggling to Land a Job?</h2>
          <p style={{ margin: '0 0 24px 0', fontSize: 18, lineHeight: 1.6, maxWidth: 700, marginLeft: 'auto', marginRight: 'auto' }}>
            Today's job search isn't about working harder - it's about working smarter.<br />
            Every manual application is time you can't get back.<br />
            Transform your job search with our free AI tools.
          </p>
          <div style={{ fontSize: 48, fontWeight: 900, marginBottom: 24 }}>PyroAI</div>
          <a href="#" style={{ ...cta, background: colors.white, color: colors.dark }}>Try it for $0</a>
        </div>
      </section>

      <section style={{ padding: '72px 16px' }}>
        <div style={maxw}>
          <h2 style={{ margin: '0 0 48px 0', fontSize: 32, fontWeight: 900, textAlign: 'center' }}>Role-Specific Resume Templates</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: 24 }}>
            {[
              { role: 'Accounting Assistant Resume Template', description: 'Tailored for accounting roles with industry-specific keywords' },
              { role: 'Data Engineer Resume Template', description: 'Optimized for technical data engineering positions' },
              { role: 'Marketing Manager Resume Template', description: 'Perfect for marketing leadership roles' },
              { role: 'Software Engineer Resume Template', description: 'Designed for software development positions' }
            ].map((template, index) => (
              <div key={index} style={{ background: colors.white, border: '1px solid #e2e2e2', borderRadius: 12, padding: 24 }}>
                <h3 style={{ margin: '0 0 12px 0', fontSize: 20, fontWeight: 800 }}>{template.role}</h3>
                <p style={{ margin: '0 0 16px 0', color: '#666', fontSize: 15 }}>{template.description}</p>
                <a href="#" style={{ color: colors.accent, textDecoration: 'none', fontWeight: 700 }}>Download Here →</a>
              </div>
            ))}
          </div>
          <div style={{ marginTop: 32, textAlign: 'center' }}>
            <a href="#" style={{ ...cta, background: colors.dark }}>See All Templates</a>
          </div>
        </div>
      </section>

      <section style={{ padding: '72px 16px', background: colors.white }}>
        <div style={maxw}>
          <h2 style={{ margin: '0 0 48px 0', fontSize: 32, fontWeight: 900, textAlign: 'center' }}>Partner Resources & Deals</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 24 }}>
            {[
              { name: 'Onomy Free Course', description: 'Crush your job search with a free course on Onomy website' },
              { name: 'ZipRecruiter', description: 'Apply to jobs in less than 30 seconds' },
              { name: 'Dice', description: 'Find tech jobs that match your skills' },
              { name: 'AWS Open Roles', description: 'Explore career opportunities at Amazon Web Services' },
              { name: 'Facet Wealth', description: 'Get personalized financial planning for your career' },
              { name: 'Morning Brew', description: 'Stay informed with daily business news' }
            ].map((partner, index) => (
              <div key={index} style={{ background: colors.teal, border: '1px solid #e2e2e2', borderRadius: 12, padding: 24, textAlign: 'center' }}>
                <div style={{ width: 80, height: 80, margin: '0 auto 16px', borderRadius: 12, background: '#f5f5f5', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 800, color: '#999' }}>
                  Logo
                </div>
                <h3 style={{ margin: '0 0 12px 0', fontSize: 20, fontWeight: 800 }}>{partner.name}</h3>
                <p style={{ margin: '0 0 16px 0', color: '#666', fontSize: 14 }}>{partner.description}</p>
                <a href="#" style={{ ...cta, fontSize: 14, padding: '10px 20px' }}>Get it here</a>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ padding: '80px 16px', background: colors.dark, color: colors.white, textAlign: 'center' }}>
        <div style={maxw}>
          <h2 style={{ margin: '0 0 16px 0', fontSize: 42, fontWeight: 900 }}>Ready to make your dream job a <span style={{ color: colors.accent }}>reality</span>?</h2>
          <p style={{ margin: '0 0 32px 0', fontSize: 18, color: '#e0e0e0', maxWidth: 700, marginLeft: 'auto', marginRight: 'auto' }}>
            Get personal attention with each of our services, or join a community of learners in our online courses.
          </p>
          <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href="#" style={{ ...cta, background: colors.white, color: colors.dark }}>Try PyroAI for FREE</a>
            <a href="/guarantee" style={cta}>Book a Free Consultation</a>
          </div>
          <p style={{ marginTop: 24, fontSize: 14, color: '#ccc' }}>
            Questions about our services? Check out our <a href="#" style={{ color: colors.accent }}>FAQs page</a> or contact our team <a href="#" style={{ color: colors.accent }}>here</a>.
          </p>
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
              <div style={{ fontWeight: 900, marginBottom: 10 }}>Resources</div>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'grid', gap: 8 }}>
                <li style={{ fontWeight: 800 }}>Resource Library</li>
                <li>Resume Template</li>
                <li>Cover Letter Template</li>
                <li>Free Resume Feedback</li>
                <li>Networking Tracker</li>
                <li>Interview Prep Template</li>
                <li>Job Search Hub</li>
                <li>Blog</li>
              </ul>
            </div>
            <div>
              <div style={{ fontWeight: 900, marginBottom: 10 }}>Company</div>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'grid', gap: 8 }}>
                <li><a href="/about" style={{ color: 'inherit', textDecoration: 'none' }}>About Us</a></li>
                <li>Success Stories</li>
                <li><a href="/employers" style={{ color: 'inherit', textDecoration: 'none' }}>Employers</a></li>
                <li><a href="/partnerships" style={{ color: 'inherit', textDecoration: 'none' }}>Partnerships</a></li>
                <li><a href="/press" style={{ color: 'inherit', textDecoration: 'none' }}>Press</a></li>
                <li><a href="/careers" style={{ color: 'inherit', textDecoration: 'none' }}>Careers</a></li>
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
