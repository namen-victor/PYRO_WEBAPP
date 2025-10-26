import { Navigation } from '@/components/Navigation';

export default function PressPage() {
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

  const pressArticles = [
    { logo: 'Forbes', title: '5 ChatGPT Prompts To Land Your Next Job Faster', category: 'Forbes' },
    { logo: 'Fox News', title: 'How to use AI to help you get a better job instead of it stealing one', category: 'Fox News' },
    { logo: 'Business Insider', title: 'Here is exactly how much I make at Google in a strategy role and why I chose to leave', category: 'Business Insider' },
    { logo: 'New York Times', title: 'For Younger Workers, Job Hopping Has Lost Its Stigma. Should It?', category: 'The New York Times' },
    { logo: 'New York Times', title: 'They Lost Their Jobs, Then Went Viral on TikTok', category: 'The New York Times' },
    { logo: 'Business Insider', title: 'Your 30-day plan for bouncing back from a layoff and landing a new job in no time', category: 'Business Insider' },
    { logo: 'Bloomberg', title: 'Hybrid Work Spurs Career Shifts', category: 'Bloomberg' },
    { logo: 'Business Insider', title: 'Here is my résumé that got me a job at Google without networking or using referrals', category: 'Business Insider' },
    { logo: 'Fox 2', title: 'Wonsulting at Fox 2', category: 'Fox 2' },
    { logo: 'NBC', title: 'Novelty or the future? Job recruiters weigh up the value of video resumes', category: 'NBC' },
    { logo: 'Fortune', title: 'How TikTok became Gen Z favorite career coach', category: 'Fortune' },
    { logo: 'Business Insider', title: 'The cover letter a student used to land an internship at Accenture making $75,000 a year', category: 'Business Insider' },
    { logo: 'Forbes', title: 'How To Craft A Viral LinkedIn Post? These Influencers Show You How', category: 'Forbes' },
    { logo: 'Business Insider', title: 'The direct LinkedIn message a student sent a recruiter to land a job at Google', category: 'Business Insider' },
    { logo: 'Forbes', title: 'No Application Necessary: 8 Tips To Use LinkedIn To Land A Job in 2021', category: 'Forbes' },
    { logo: 'Daily Mail', title: 'Job-hunting expert reveals BIGGEST mistakes people make on resumes', category: 'Daily Mail' }
  ];

  return (
    <div style={{ background: colors.pageBg, color: colors.text }}>
      <Navigation currentPage="company" />

      <section style={{ background: colors.dark, color: colors.white, padding: '80px 16px', textAlign: 'center' }}>
        <div style={maxw}>
          <h1 style={{ margin: 0, fontSize: 56, lineHeight: 1.1, fontWeight: 900 }}>Press</h1>
          <p style={{ marginTop: 16, fontSize: 18, color: '#e0e0e0' }}>
            See where PyroINC has been featured in the news
          </p>
        </div>
      </section>

      <section style={{ padding: '72px 16px' }}>
        <div style={maxw}>
          <h2 style={{ margin: '0 0 48px 0', fontSize: 32, fontWeight: 900, textAlign: 'center' }}>Featured on</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 32 }}>
            {pressArticles.map((article, index) => (
              <div key={index} style={{ background: colors.white, border: '1px solid #e2e2e2', borderRadius: 12, padding: 24 }}>
                <div style={{ width: 80, height: 80, margin: '0 auto 20px', borderRadius: 12, background: '#f5f5f5', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, fontWeight: 800, color: '#999', textAlign: 'center', padding: 8 }}>
                  {article.logo}
                </div>
                <h3 style={{ margin: '0 0 12px 0', fontSize: 18, fontWeight: 700, lineHeight: 1.4, minHeight: 60 }}>{article.title}</h3>
                <a href="#" target="_blank" rel="noopener noreferrer" style={{ color: colors.accent, textDecoration: 'none', fontWeight: 600, fontSize: 14 }}>
                  View on their website →
                </a>
              </div>
            ))}
          </div>
          <div style={{ marginTop: 48, textAlign: 'center' }}>
            <button style={{ padding: '12px 24px', background: colors.white, border: '2px solid #e0e0e0', borderRadius: 8, fontWeight: 700, color: colors.dark, cursor: 'pointer' }}>
              Next
            </button>
          </div>
        </div>
      </section>

      <section style={{ padding: '72px 16px', background: colors.white }}>
        <div style={{ ...maxw, display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 48, alignItems: 'start' }}>
          <div>
            <h3 style={{ margin: '0 0 16px 0', fontSize: 22, fontWeight: 900 }}>Interested in writing about PyroINC? Contact us!</h3>
            <p style={{ margin: '0 0 12px 0', color: '#666', lineHeight: 1.6 }}>
              <strong>Partnerships & Public Relations</strong><br />
              <a href="mailto:pr@pyrosolutions.com" style={{ color: colors.accent }}>pr@pyrosolutions.com</a>
            </p>
            <p style={{ margin: 0, color: '#666', lineHeight: 1.6 }}>
              <strong>Brand Partnerships</strong><br />
              <a href="mailto:partnerships@pyrosolutions.com" style={{ color: colors.accent }}>partnerships@pyrosolutions.com</a>
            </p>
          </div>

          <div>
            <h3 style={{ margin: '0 0 16px 0', fontSize: 22, fontWeight: 900 }}>Press Kit</h3>
            <p style={{ margin: '0 0 20px 0', color: '#666', lineHeight: 1.6 }}>
              Download our press kit with high-resolution logos, founder bios, and brand guidelines.
            </p>
            <a href="#" style={{ ...cta, fontSize: 14, padding: '12px 20px' }}>Read our Press Kit</a>
          </div>

          <div>
            <h3 style={{ margin: '0 0 16px 0', fontSize: 22, fontWeight: 900 }}>Follow Us</h3>
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              <a href="#" style={{ width: 40, height: 40, borderRadius: 8, background: colors.accent, display: 'flex', alignItems: 'center', justifyContent: 'center', color: colors.white, textDecoration: 'none', fontSize: 18 }}>in</a>
              <a href="#" style={{ width: 40, height: 40, borderRadius: 8, background: colors.accent, display: 'flex', alignItems: 'center', justifyContent: 'center', color: colors.white, textDecoration: 'none', fontSize: 18 }}>▶</a>
              <a href="#" style={{ width: 40, height: 40, borderRadius: 8, background: colors.accent, display: 'flex', alignItems: 'center', justifyContent: 'center', color: colors.white, textDecoration: 'none', fontSize: 18 }}>📷</a>
              <a href="#" style={{ width: 40, height: 40, borderRadius: 8, background: colors.accent, display: 'flex', alignItems: 'center', justifyContent: 'center', color: colors.white, textDecoration: 'none', fontSize: 18 }}>🎵</a>
              <a href="#" style={{ width: 40, height: 40, borderRadius: 8, background: colors.accent, display: 'flex', alignItems: 'center', justifyContent: 'center', color: colors.white, textDecoration: 'none', fontSize: 18 }}>P</a>
              <a href="#" style={{ width: 40, height: 40, borderRadius: 8, background: colors.accent, display: 'flex', alignItems: 'center', justifyContent: 'center', color: colors.white, textDecoration: 'none', fontSize: 18 }}>Q</a>
            </div>
          </div>
        </div>
      </section>

      <section style={{ padding: '72px 16px', background: colors.teal }}>
        <div style={{ ...maxw, display: 'grid', gridTemplateColumns: '200px 1fr 200px', gap: 32, alignItems: 'center' }}>
          <div style={{ width: 150, height: 150, borderRadius: '50%', background: 'linear-gradient(135deg, #d9d9d9, #e9e9e9)', border: '4px solid #fff' }} />
          
          <div style={{ textAlign: 'center' }}>
            <h2 style={{ margin: '0 0 16px 0', fontSize: 28, fontWeight: 900 }}>Subscribe to our newsletter</h2>
            <p style={{ margin: '0 0 20px 0', color: '#666' }}>Our weekly newsletter is perfect for you if:</p>
            <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 24px 0', textAlign: 'left', maxWidth: 400, marginLeft: 'auto', marginRight: 'auto' }}>
              <li style={{ marginBottom: 8, color: '#666' }}>• You are looking for a job and want new tips and strategies</li>
              <li style={{ color: '#666' }}>• You want to grow your career with weekly insights and tips</li>
            </ul>
            <div style={{ display: 'flex', gap: 8, maxWidth: 400, marginLeft: 'auto', marginRight: 'auto' }}>
              <input type="email" placeholder="Email" style={{ flex: 1, padding: '12px 16px', border: '1px solid #ccc', borderRadius: 6, fontSize: 14 }} />
              <button style={{ ...cta, fontSize: 14, padding: '12px 24px' }}>Subscribe</button>
            </div>
          </div>

          <div style={{ width: 150, height: 150, borderRadius: '50%', background: 'linear-gradient(135deg, #d9d9d9, #e9e9e9)', border: '4px solid #fff' }} />
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
              <div style={{ fontWeight: 900, marginBottom: 10 }}>Company</div>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'grid', gap: 8 }}>
                <li><a href="/about" style={{ color: 'inherit', textDecoration: 'none' }}>About Us</a></li>
                <li>Success Stories</li>
                <li><a href="/employers" style={{ color: 'inherit', textDecoration: 'none' }}>Employers</a></li>
                <li><a href="/partnerships" style={{ color: 'inherit', textDecoration: 'none' }}>Partnerships</a></li>
                <li style={{ fontWeight: 800 }}>Press</li>
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
                <li><a href="mailto:pr@pyrosolutions.com" style={{ color: 'inherit', textDecoration: 'none' }}>pr@pyrosolutions.com</a></li>
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
