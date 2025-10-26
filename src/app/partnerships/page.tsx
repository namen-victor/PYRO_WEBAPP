import { Navigation } from '@/components/Navigation';

export default function PartnershipsPage() {
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

  return (
    <div style={{ background: colors.pageBg, color: colors.text }}>
      <Navigation currentPage="company" />

      <section style={{ background: colors.dark, color: colors.white, padding: '80px 16px' }}>
        <div style={{ ...maxw, textAlign: 'center' }}>
          <div style={{ fontSize: 14, letterSpacing: '0.15em', fontWeight: 800, color: '#ccc', marginBottom: 12 }}>PARTNER WITH PYROINC</div>
          <h1 style={{ margin: 0, fontSize: 56, lineHeight: 1.1, fontWeight: 900 }}>Major impact,<br />massive diversity.</h1>
          <p style={{ marginTop: 20, fontSize: 18, lineHeight: 1.6, color: '#e0e0e0', maxWidth: 700, margin: '20px auto 0' }}>
            We connect you with one of the largest, most diverse audiences of job seekers by creating engaging content and viral posts that reach millions.
          </p>
          <div style={{ marginTop: 32 }}>
            <a href="mailto:partnerships@pyrosolutions.com" style={{ ...cta, background: colors.white, color: colors.dark }}>Partner with Us</a>
          </div>
        </div>
      </section>

      <section style={{ padding: '72px 16px', background: colors.white }}>
        <div style={maxw}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 32, textAlign: 'center' }}>
            <div>
              <div style={{ width: 80, height: 80, margin: '0 auto 16px', borderRadius: '50%', background: 'linear-gradient(135deg, #ff0050, #ff4d8f)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 32 }}>📱</div>
              <div style={{ fontSize: 42, fontWeight: 900, color: colors.dark }}>1.5M</div>
              <div style={{ color: '#666', marginTop: 8 }}>Followers on TikTok</div>
            </div>
            <div>
              <div style={{ width: 80, height: 80, margin: '0 auto 16px', borderRadius: '50%', background: 'linear-gradient(135deg, #833AB4, #FD1D1D)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 32 }}>📷</div>
              <div style={{ fontSize: 42, fontWeight: 900, color: colors.dark }}>802K</div>
              <div style={{ color: '#666', marginTop: 8 }}>Followers on Instagram</div>
            </div>
            <div>
              <div style={{ width: 80, height: 80, margin: '0 auto 16px', borderRadius: '50%', background: 'linear-gradient(135deg, #0077B5, #00A0DC)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 32 }}>💼</div>
              <div style={{ fontSize: 42, fontWeight: 900, color: colors.dark }}>589K</div>
              <div style={{ color: '#666', marginTop: 8 }}>Followers on LinkedIn</div>
            </div>
          </div>
        </div>
      </section>

      <section style={{ padding: '72px 16px' }}>
        <div style={maxw}>
          <h2 style={{ margin: '0 0 16px 0', fontSize: 32, fontWeight: 900, textAlign: 'center' }}>We have partnered with over 100 corporate partners since 2025</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: 24, marginTop: 48 }}>
            {['LinkedIn', 'Udacity', 'TikTok', 'Microsoft', 'Coursera', 'JobScape', 'Roblox', 'ZipRecruiter'].map((name) => (
              <div key={name} style={{ background: colors.white, border: '1px solid #e2e2e2', borderRadius: 12, padding: 32, textAlign: 'center' }}>
                <div style={{ height: 60, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, fontWeight: 800, color: '#999' }}>{name}</div>
                <div style={{ marginTop: 12, fontSize: 13, color: '#666' }}>Impact</div>
              </div>
            ))}
          </div>
          <div style={{ marginTop: 48, textAlign: 'center', fontSize: 20, fontWeight: 700, color: colors.dark }}>
            Largest professional development audience across TikTok, LinkedIn, and Instagram
          </div>
        </div>
      </section>

      <section style={{ padding: '72px 16px', background: colors.white }}>
        <div style={maxw}>
          <h2 style={{ margin: '0 0 48px 0', fontSize: 32, fontWeight: 900, textAlign: 'center' }}>Our viral posts keep growing 👀</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16 }}>
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} style={{ aspectRatio: '9/16', borderRadius: 12, background: 'linear-gradient(135deg, #e0e0e0, #f0f0f0)', border: '2px solid #ddd', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, color: '#999' }}>
                Viral Post {i}
              </div>
            ))}
          </div>
          <div style={{ marginTop: 32, display: 'flex', gap: 48, justifyContent: 'center', flexWrap: 'wrap' }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: 36, fontWeight: 900, color: colors.dark }}>4M+</div>
              <div style={{ color: '#666', marginTop: 4 }}>Million impressions</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: 36, fontWeight: 900, color: colors.dark }}>1M+</div>
              <div style={{ color: '#666', marginTop: 4 }}>Million views</div>
            </div>
          </div>
        </div>
      </section>

      <section style={{ padding: '72px 16px', background: colors.dark, color: colors.white }}>
        <div style={maxw}>
          <h2 style={{ margin: '0 0 48px 0', fontSize: 32, fontWeight: 900, textAlign: 'center' }}>Led by Industry-Renowned Founders</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 48 }}>
            <div>
              <div style={{ width: 150, height: 150, margin: '0 auto 24px', borderRadius: '50%', background: 'linear-gradient(135deg, #7aa3a1, #5e8c89)', border: '4px solid #fff' }} />
              <div style={{ fontSize: 24, fontWeight: 900, marginBottom: 8, textAlign: 'center' }}>Jonathan Ziegler</div>
              <div style={{ fontSize: 16, color: '#ccc', marginBottom: 16, textAlign: 'center' }}>Founder & CEO</div>
              <p style={{ lineHeight: 1.6, color: '#e0e0e0' }}>
                Jonathan leads PyroINC mission to democratize access to career opportunities. Previously at top tech firms, he was recognized as Forbes 30 Under 30 for his work in professional development. With over 800K followers across platforms, Jonathan creates content that helps job seekers navigate the modern job market.
              </p>
            </div>
            <div>
              <div style={{ width: 150, height: 150, margin: '0 auto 24px', borderRadius: '50%', background: 'linear-gradient(135deg, #7aa3a1, #5e8c89)', border: '4px solid #fff' }} />
              <div style={{ fontSize: 24, fontWeight: 900, marginBottom: 8, textAlign: 'center' }}>Jerry Lee</div>
              <div style={{ fontSize: 16, color: '#ccc', marginBottom: 16, textAlign: 'center' }}>Co-founder & COO</div>
              <p style={{ lineHeight: 1.6, color: '#e0e0e0' }}>
                Jerry brings a decade of experience in career coaching and operations. His innovative approach to resume optimization and interview prep has helped thousands land their dream jobs. With 600K+ followers, Jerry viral content reaches millions monthly, making him one of the most influential voices in career development.
              </p>
            </div>
          </div>
          <div style={{ marginTop: 48, textAlign: 'center', fontSize: 18, color: '#ccc' }}>
            Combined social following: <strong style={{ color: colors.white }}>1M+ followers</strong> | Monthly impressions: <strong style={{ color: colors.white }}>42M+</strong>
          </div>
        </div>
      </section>

      <section style={{ padding: '72px 16px' }}>
        <div style={maxw}>
          <h2 style={{ margin: '0 0 48px 0', fontSize: 32, fontWeight: 900, textAlign: 'center' }}>Why partner with PyroINC?</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 32 }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ width: 80, height: 80, margin: '0 auto 20px', borderRadius: '50%', background: colors.teal, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 36 }}>🌍</div>
              <div style={{ fontSize: 22, fontWeight: 900, marginBottom: 12 }}>Massive Diversity</div>
              <p style={{ color: '#666', lineHeight: 1.6 }}>
                Our audience spans every major demographic and industry, offering the largest ethnically diverse professional development community online.
              </p>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ width: 80, height: 80, margin: '0 auto 20px', borderRadius: '50%', background: colors.teal, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 36 }}>✅</div>
              <div style={{ fontSize: 22, fontWeight: 900, marginBottom: 12 }}>Perfect Record</div>
              <p style={{ color: '#666', lineHeight: 1.6 }}>
                We ensure satisfaction and measurable results for every partner. Our track record speaks for itself with 100% partner retention.
              </p>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ width: 80, height: 80, margin: '0 auto 20px', borderRadius: '50%', background: colors.teal, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 36 }}>📈</div>
              <div style={{ fontSize: 22, fontWeight: 900, marginBottom: 12 }}>Greater Impact</div>
              <p style={{ color: '#666', lineHeight: 1.6 }}>
                Our sponsored content averages 250K views per post, with a 0.9% engagement rate and 42M monthly views across all platforms.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section style={{ padding: '72px 16px', background: colors.white }}>
        <div style={maxw}>
          <h2 style={{ margin: '0 0 48px 0', fontSize: 32, fontWeight: 900, textAlign: 'center' }}>Reach the largest audience of job seekers</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 32, marginBottom: 48 }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: 48, fontWeight: 900, color: colors.accent }}>+100</div>
              <div style={{ color: '#666', marginTop: 8 }}>Corporate partners to date</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: 48, fontWeight: 900, color: colors.accent }}>+250K</div>
              <div style={{ color: '#666', marginTop: 8 }}>Views per post</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: 48, fontWeight: 900, color: colors.accent }}>0.9%</div>
              <div style={{ color: '#666', marginTop: 8 }}>Average engagement rate</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: 48, fontWeight: 900, color: colors.accent }}>+42M</div>
              <div style={{ color: '#666', marginTop: 8 }}>Monthly views</div>
            </div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <a href="mailto:partnerships@pyrosolutions.com" style={cta}>Let's Talk Partnerships</a>
          </div>
        </div>
      </section>

      <section style={{ padding: '80px 16px', background: colors.dark, color: colors.white, textAlign: 'center' }}>
        <div style={maxw}>
          <h2 style={{ margin: '0 0 24px 0', fontSize: 42, fontWeight: 900 }}>Ready to reach top talent?</h2>
          <p style={{ margin: '0 0 32px 0', fontSize: 18, color: '#e0e0e0', maxWidth: 600, marginLeft: 'auto', marginRight: 'auto' }}>
            Join over 100 companies that trust PyroINC to connect them with the most engaged job seekers in the world.
          </p>
          <a href="mailto:partnerships@pyrosolutions.com" style={{ ...cta, background: colors.white, color: colors.dark }}>Partner with PyroINC</a>
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
                <li style={{ fontWeight: 800 }}>Partnerships</li>
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
                <li><a href="mailto:partnerships@pyrosolutions.com" style={{ color: 'inherit', textDecoration: 'none' }}>partnerships@pyrosolutions.com</a></li>
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
