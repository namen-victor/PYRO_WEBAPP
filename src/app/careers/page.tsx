import { Navigation } from '@/components/Navigation';

export default function CareersPage() {
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

  const openRoles = [
    {
      title: 'Sales Support Specialist',
      description: 'This role is ideal for an organized, detail-oriented, people-first professional who thrives in a fast-paced, client-facing environment. You will partner closely with our sales reps to manage client onboarding, schedule calls, handle outbound appointments, follow-up with warm leads, and ensuring every prospective client gets a seamless experience from the first hello to the booked call.'
    },
    {
      title: 'Product QA Tester',
      description: 'We are looking for a Product QA Tester (Part-Time, Remote) to help ensure our AI-powered tools meet the highest standards of quality, reliability, and usability. This role is centered on testing, validation, and user experience, not just bug detection.'
    },
    {
      title: 'Full Service Apply Service Provider',
      description: 'PyroINC is looking for Full-time virtual assistants to help with our Career Services efforts to turn landscapes into Winners!'
    },
    {
      title: 'Product Lead',
      description: 'We are looking for a Fractional Product Lead (Part-Time, Remote) with strong product management experience in a fast-growing B2C SaaS startup. This role is centered on product strategy rather than execution. You will work closely with the co-founder, product manager, and cross-functional leads to set direction, align teams, and ensure our product scales effectively.'
    },
    {
      title: 'UGC Creator',
      description: 'Hey Creators! We are launching a new program where you can earn money and build your portfolio by making short-form videos that actually get seen. The more traction your content gets, the more you will earn, the better deal.'
    },
    {
      title: 'Inbound Sales Representative',
      description: 'We are looking for our next Inbound Sales Superstar! This role is ideal for a high-potential, growth-minded sales professional excited to thrive in a fast-paced, client-facing environment. You will be working exclusively with warm inbound leads, individual job seekers already interested in our services.'
    },
    {
      title: 'Career Coach - Bundles',
      description: 'We are seeking dedicated and versatile Career Coaches to join our dynamic team. This role offers flexibility, autonomy, and the opportunity to work with diverse clients across various services.'
    }
  ];

  const testimonials = [
    {
      name: 'Joseph P. Forline',
      title: 'Career Coach',
      quote: 'In the Fall of 2020, I was looking for a way to help people whose jobs had been impacted by the pandemic. That is when I met Jonathan (Jerry) and the PyroINC team who were doing just that - helping people land jobs that changed their lives. The mission resonated with me. I joined as a Career Coach and resume editor. It has been an incredible experience! I am super thankful for it. If you are looking for a new job opportunity, give PyroINC a try. If they can help me, they can help you too.'
    },
    {
      name: 'Fernando Aguilar',
      title: 'Web & Product Design Associate',
      quote: 'Working with PyroINC has been an amazing journey. The team is passionate about helping job seekers succeed, and being part of that mission is incredibly rewarding. Every day I get to contribute to tools that change lives.'
    }
  ];

  return (
    <div style={{ background: colors.pageBg, color: colors.text }}>
      <Navigation currentPage="company" />

      <section style={{ padding: '80px 16px', background: colors.teal }}>
        <div style={{ ...maxw, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 48, alignItems: 'center' }}>
          <div>
            <div style={{ fontSize: 14, letterSpacing: '0.15em', fontWeight: 800, color: '#666', marginBottom: 12 }}>PYROINC CAREERS</div>
            <h1 style={{ margin: 0, fontSize: 48, lineHeight: 1.1, fontWeight: 900 }}>Join Our Mission</h1>
            <p style={{ marginTop: 20, fontSize: 18, lineHeight: 1.6, color: '#555' }}>
              Help us turn underdogs into winners. We are building tools and programs that transform job seekers into success stories, and we are looking for passionate teammates to make it happen.
            </p>
            <a href="#open-roles" style={{ ...cta, marginTop: 24, display: 'inline-block' }}>See Open Roles</a>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            <div style={{ width: '100%', aspectRatio: '1', borderRadius: '50%', background: 'linear-gradient(135deg, #f9d5a7, #f7c78e)', border: '4px solid #fff', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }} />
            <div style={{ width: '100%', aspectRatio: '1', borderRadius: '50%', background: 'linear-gradient(135deg, #7aa3a1, #5e8c89)', border: '4px solid #fff', boxShadow: '0 4px 12px rgba(0,0,0,0.1)', marginTop: 32 }} />
            <div style={{ width: '100%', aspectRatio: '1', borderRadius: '50%', background: 'linear-gradient(135deg, #d9d9d9, #e9e9e9)', border: '4px solid #fff', boxShadow: '0 4px 12px rgba(0,0,0,0.1)', marginTop: -16 }} />
          </div>
        </div>
      </section>

      <section id="open-roles" style={{ padding: '72px 16px' }}>
        <div style={maxw}>
          <h2 style={{ margin: '0 0 48px 0', fontSize: 32, fontWeight: 900, textAlign: 'center' }}>Current Opportunities</h2>
          <div style={{ display: 'grid', gap: 24 }}>
            {openRoles.map((role, index) => (
              <div key={index} style={{ background: colors.white, border: '1px solid #e2e2e2', borderRadius: 12, padding: 32 }}>
                <h3 style={{ margin: '0 0 16px 0', fontSize: 24, fontWeight: 900 }}>{role.title}</h3>
                <p style={{ margin: '0 0 20px 0', color: '#666', lineHeight: 1.6 }}>{role.description}</p>
                <a href="mailto:careers@pyrosolutions.com" style={{ color: colors.accent, textDecoration: 'none', fontWeight: 700, fontSize: 16 }}>
                  Apply Now →
                </a>
              </div>
            ))}
          </div>
          <div style={{ marginTop: 32, padding: 24, background: '#fff9e6', border: '1px solid #ffe066', borderRadius: 8, textAlign: 'center' }}>
            <p style={{ margin: 0, color: '#666', fontSize: 15 }}>
              We accept applications on a rolling basis. Roles will be removed once filled.
            </p>
          </div>
        </div>
      </section>

      <section style={{ padding: '72px 16px', background: colors.white }}>
        <div style={maxw}>
          <h2 style={{ margin: '0 0 48px 0', fontSize: 32, fontWeight: 900, textAlign: 'center' }}>Testimonials From The Team</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: 32 }}>
            {testimonials.map((testimonial, index) => (
              <div key={index} style={{ background: colors.teal, border: '1px solid #e2e2e2', borderRadius: 12, padding: 32, textAlign: 'center' }}>
                <div style={{ width: 100, height: 100, margin: '0 auto 20px', borderRadius: '50%', background: 'linear-gradient(135deg, #d9d9d9, #e9e9e9)', border: '3px solid #fff' }} />
                <p style={{ margin: '0 0 20px 0', fontSize: 15, lineHeight: 1.7, color: '#555', fontStyle: 'italic' }}>
                  "{testimonial.quote}"
                </p>
                <div style={{ fontWeight: 900, fontSize: 18, marginBottom: 4 }}>{testimonial.name}</div>
                <div style={{ color: '#666', fontSize: 14 }}>{testimonial.title}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ padding: '80px 16px', background: colors.dark, color: colors.white, textAlign: 'center' }}>
        <div style={maxw}>
          <h2 style={{ margin: '0 0 16px 0', fontSize: 42, fontWeight: 900 }}>Ready to build the future of job search?</h2>
          <p style={{ margin: '0 0 32px 0', fontSize: 18, color: '#e0e0e0', maxWidth: 700, marginLeft: 'auto', marginRight: 'auto' }}>
            Join our team and help transform the way people find their dream jobs. Apply for an open role or express your general interest.
          </p>
          <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href="mailto:careers@pyrosolutions.com" style={{ ...cta, background: colors.white, color: colors.dark }}>Apply Now</a>
            <a href="mailto:careers@pyrosolutions.com?subject=General Interest" style={cta}>General Interest</a>
          </div>
        </div>
      </section>

      <section style={{ padding: '72px 16px' }}>
        <div style={{ ...maxw, textAlign: 'center' }}>
          <h2 style={{ margin: '0 0 16px 0', fontSize: 32, fontWeight: 900 }}>Ready to make your dream job a reality?</h2>
          <p style={{ margin: '0 0 32px 0', fontSize: 18, color: '#666', maxWidth: 700, marginLeft: 'auto', marginRight: 'auto' }}>
            Get personal attention with each of our services, or join a community of learners in our online courses.
          </p>
          <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href="#" style={{ ...cta, background: colors.dark }}>Try PyroAI for FREE</a>
            <a href="/guarantee" style={cta}>Book a Free Consultation</a>
          </div>
          <p style={{ marginTop: 24, fontSize: 14, color: '#666' }}>
            Questions about our recruitment? Visit our <a href="#" style={{ color: colors.accent }}>FAQ page</a> or contact our team <a href="#" style={{ color: colors.accent }}>here</a>.
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
                <li><a href="/press" style={{ color: 'inherit', textDecoration: 'none' }}>Press</a></li>
                <li style={{ fontWeight: 800 }}>Careers</li>
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
                <li><a href="mailto:careers@pyrosolutions.com" style={{ color: 'inherit', textDecoration: 'none' }}>careers@pyrosolutions.com</a></li>
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
