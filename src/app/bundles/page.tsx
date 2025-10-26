import { Navigation } from '@/components/Navigation';

export default function ServiceBundlesPage() {
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

      {/* Promotional banner */}
      <section style={{ background: colors.dark, color: '#eee', padding: '32px 16px', borderBottom: '3px solid #f9c74f' }}>
        <div style={{ ...maxw, display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 24, flexWrap: 'wrap' }}>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 28, fontWeight: 900, marginBottom: 8 }}>Get hired faster with direct guidance from PyroINC's founders</div>
            <p style={{ margin: 0, color: '#ddd' }}>Limited spots available for exclusive group coaching sessions when purchasing any bundle.</p>
            <div style={{ marginTop: 14 }}>
              <a href="/signup" style={{ ...cta, background: '#f9c74f', color: colors.dark }}>Get Direct Access</a>
            </div>
          </div>
          <div style={{ width: 200, height: 200, borderRadius: '50%', background: '#3a3a3a', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ color: '#888' }}>Founders (image)</div>
          </div>
        </div>
      </section>

      {/* Intro */}
      <section style={{ ...section, paddingTop: 48, paddingBottom: 32, textAlign: 'center' }}>
        <div style={maxw}>
          <div style={{ fontSize: 12, letterSpacing: '0.18em', fontWeight: 800, color: '#666' }}>JOB COACHING TO GET HIRED</div>
          <h1 style={{ margin: '8px 0 0 0', fontSize: 36, fontWeight: 900 }}>How our service bundles work</h1>
          <p style={{ marginTop: 8, color: '#555', fontSize: 18 }}>Step-by-step guidance to help you get hired!</p>
          <div style={{ display: 'flex', gap: 12, marginTop: 18, justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href="#starter" style={{ padding: '10px 20px', border: '2px solid #e2e2e2', borderRadius: 999, textDecoration: 'none', color: colors.text, fontWeight: 700 }}>Starter Bundle</a>
            <a href="#land" style={{ padding: '10px 20px', border: '2px solid #e2e2e2', borderRadius: 999, textDecoration: 'none', color: colors.text, fontWeight: 700 }}>Land the Job Bundle</a>
            <a href="#ultimate" style={{ padding: '10px 20px', border: '2px solid #7aa3a1', background: colors.teal, borderRadius: 999, textDecoration: 'none', color: colors.text, fontWeight: 700 }}>Ultimate Bundle</a>
          </div>
        </div>
      </section>

      {/* Starter Bundle */}
      <section id="starter" style={{ ...section, background: colors.white }}>
        <div style={maxw}>
          <div style={{ display: 'inline-block', padding: '6px 12px', background: '#f9c74f', borderRadius: 6, fontSize: 12, fontWeight: 800, marginBottom: 8 }}>STARTER BUNDLE</div>
          <h2 style={{ margin: '8px 0 0 0', fontSize: 28, fontWeight: 900 }}>Starter Bundle: How it works</h2>
          <p style={{ marginTop: 6, color: '#555' }}>Build your foundation with career planning, resume, and LinkedIn optimization.</p>
          <div style={{ marginTop: 18, display: 'grid', gap: 16 }}>
            <div style={{ background: '#f9f9f9', padding: 16, borderRadius: 12, border: '1px solid #e2e2e2' }}>
              <div style={{ fontWeight: 900, color: colors.accent, marginBottom: 8 }}>WEEK 1</div>
              <div style={{ display: 'grid', gap: 12 }}>
                <div>
                  <div style={{ fontWeight: 800 }}>1. Onboarding</div>
                  <div style={{ color: '#666', marginTop: 4 }}>Do you know your dream job? What are your career goals? We'll work with you to set goals and get you started in our 1:1 meeting!</div>
                </div>
                <div>
                  <div style={{ fontWeight: 800 }}>2. <a href="/career-consulting" style={{ color: colors.accent, textDecoration: 'none' }}>Career Consulting</a></div>
                  <div style={{ color: '#666', marginTop: 4 }}>We'll meet again to analyze your career in more depth. We'll identify your skill gaps and experience gaps so you can become the perfect candidate.</div>
                </div>
              </div>
            </div>
            <div style={{ background: '#f9f9f9', padding: 16, borderRadius: 12, border: '1px solid #e2e2e2' }}>
              <div style={{ fontWeight: 900, color: colors.accent, marginBottom: 8 }}>WEEK 2</div>
              <div style={{ display: 'grid', gap: 12 }}>
                <div>
                  <div style={{ fontWeight: 800 }}>3. <a href="/resume-revision" style={{ color: colors.accent, textDecoration: 'none' }}>Résumé Revision</a></div>
                  <div style={{ color: '#666', marginTop: 4 }}>Your new resume targets your dream role! Get another 1:1 revision to go over all the improvements.</div>
                </div>
                <div>
                  <div style={{ fontWeight: 800 }}>4. <a href="/linkedin-profile-revision" style={{ color: colors.accent, textDecoration: 'none' }}>LinkedIn Profile Revision</a></div>
                  <div style={{ color: '#666', marginTop: 4 }}>Your LinkedIn profile is ready to get it built to ensure your target role so you can start networking to get hired.</div>
                </div>
              </div>
            </div>
          </div>
          <div style={{ marginTop: 16, padding: 12, background: '#fff3cd', borderRadius: 8, fontSize: 13, color: '#856404' }}>
            * For bundle services, clients are allowed a maximum of two (2) no-shows or reschedules per bundle. Meeting this limit may result in your consultant sending your service resources via email.
          </div>
        </div>
      </section>

      {/* Land the Job Bundle */}
      <section id="land" style={section}>
        <div style={maxw}>
          <div style={{ display: 'inline-block', padding: '6px 12px', background: '#90e0c8', borderRadius: 6, fontSize: 12, fontWeight: 800, marginBottom: 8 }}>LAND THE JOB BUNDLE</div>
          <h2 style={{ margin: '8px 0 0 0', fontSize: 28, fontWeight: 900 }}>Land the Job Bundle: How it works</h2>
          <p style={{ marginTop: 6, color: '#555' }}>Everything in Starter plus automated applications and job search strategy.</p>
          <div style={{ marginTop: 18, display: 'grid', gap: 16 }}>
            <div style={{ background: '#f9f9f9', padding: 16, borderRadius: 12, border: '1px solid #e2e2e2' }}>
              <div style={{ fontWeight: 900, color: colors.accent, marginBottom: 8 }}>WEEK 1</div>
              <div style={{ display: 'grid', gap: 12 }}>
                <div>
                  <div style={{ fontWeight: 800 }}>1. Onboarding</div>
                  <div style={{ color: '#666', marginTop: 4 }}>Plan your goals and dream job in a 1:1 meeting.</div>
                </div>
                <div>
                  <div style={{ fontWeight: 800 }}>2. <a href="/career-consulting" style={{ color: colors.accent, textDecoration: 'none' }}>Career Consulting</a></div>
                  <div style={{ color: '#666', marginTop: 4 }}>Identify skill gaps and plan your trajectory.</div>
                </div>
              </div>
            </div>
            <div style={{ background: '#f9f9f9', padding: 16, borderRadius: 12, border: '1px solid #e2e2e2' }}>
              <div style={{ fontWeight: 900, color: colors.accent, marginBottom: 8 }}>WEEK 2</div>
              <div style={{ display: 'grid', gap: 12 }}>
                <div>
                  <div style={{ fontWeight: 800 }}>3. <a href="/resume-revision" style={{ color: colors.accent, textDecoration: 'none' }}>Résumé Revision</a></div>
                  <div style={{ color: '#666', marginTop: 4 }}>Target resume for dream role; 1:1 session to review.</div>
                </div>
                <div>
                  <div style={{ fontWeight: 800 }}>4. <a href="/full-service-apply" style={{ color: colors.accent, textDecoration: 'none' }}>Full-Service Apply to Jobs</a></div>
                  <div style={{ color: '#666', marginTop: 4 }}>We'll take your new resume and apply to 50 or 25 niche jobs for you. Each application personally targeting your perfect role.</div>
                </div>
                <div>
                  <div style={{ fontWeight: 800 }}>5. <a href="/linkedin-profile-revision" style={{ color: colors.accent, textDecoration: 'none' }}>LinkedIn Profile Revision</a></div>
                  <div style={{ color: '#666', marginTop: 4 }}>Optimize profile for networking.</div>
                </div>
              </div>
            </div>
            <div style={{ background: '#f9f9f9', padding: 16, borderRadius: 12, border: '1px solid #e2e2e2' }}>
              <div style={{ fontWeight: 900, color: colors.accent, marginBottom: 8 }}>WEEK 3+</div>
              <div style={{ display: 'grid', gap: 12 }}>
                <div>
                  <div style={{ fontWeight: 800 }}>6. <a href="/job-search-strategies" style={{ color: colors.accent, textDecoration: 'none' }}>Job Search Strategy</a></div>
                  <div style={{ color: '#666', marginTop: 4 }}>Learn how to network using your new profile.</div>
                </div>
                <div>
                  <div style={{ fontWeight: 800 }}>7. Apply to Jobs Results</div>
                  <div style={{ color: '#666', marginTop: 4 }}>The results are in! We applied to 50 jobs for you. Now you're in control. Follow up on the applications and network.</div>
                </div>
                <div>
                  <div style={{ fontWeight: 800 }}>8. Continued Support</div>
                  <div style={{ color: '#666', marginTop: 4 }}>We're here to support you! Have additional questions? Need more guidance or motivation? Check the next section for full detail!</div>
                </div>
              </div>
            </div>
          </div>
          <div style={{ marginTop: 16, padding: 12, background: '#fff3cd', borderRadius: 8, fontSize: 13, color: '#856404' }}>
            * For bundle services, clients are allowed a maximum of two (2) no-shows or reschedules per bundle. Meeting this limit may result in your consultant sending your service resources via email.
          </div>
        </div>
      </section>

      {/* Ultimate Bundle */}
      <section id="ultimate" style={{ ...section, background: colors.white }}>
        <div style={maxw}>
          <div style={{ display: 'inline-block', padding: '6px 12px', background: '#7aa3a1', color: '#fff', borderRadius: 6, fontSize: 12, fontWeight: 800, marginBottom: 8 }}>ULTIMATE BUNDLE - MOST POPULAR</div>
          <h2 style={{ margin: '8px 0 0 0', fontSize: 28, fontWeight: 900 }}>Ultimate Bundle: How it works</h2>
          <p style={{ marginTop: 6, color: '#555' }}>The full package. We'll take you from planning your career all the way to practicing for the final interview. Get all the tools you need to get hired and learn how to use them. We'll guide you every step of the way.</p>
          <div style={{ marginTop: 18, display: 'grid', gap: 16 }}>
            <div style={{ background: '#f9f9f9', padding: 16, borderRadius: 12, border: '1px solid #e2e2e2' }}>
              <div style={{ fontWeight: 900, color: colors.accent, marginBottom: 8 }}>WEEK 1</div>
              <div style={{ display: 'grid', gap: 12 }}>
                <div>
                  <div style={{ fontWeight: 800 }}>1. Onboarding</div>
                  <div style={{ color: '#666', marginTop: 4 }}>Do you know your dream job? What are your career goals? We'll work with you to set goals and get you started in our 1:1 meeting!</div>
                </div>
                <div>
                  <div style={{ fontWeight: 800 }}>2. <a href="/career-consulting" style={{ color: colors.accent, textDecoration: 'none' }}>Career Consulting</a></div>
                  <div style={{ color: '#666', marginTop: 4 }}>We'll meet again to analyze your career in more depth. We'll identify your skill gaps and experience gaps so you can become the perfect candidate.</div>
                </div>
              </div>
            </div>
            <div style={{ background: '#f9f9f9', padding: 16, borderRadius: 12, border: '1px solid #e2e2e2' }}>
              <div style={{ fontWeight: 900, color: colors.accent, marginBottom: 8 }}>WEEK 2</div>
              <div style={{ display: 'grid', gap: 12 }}>
                <div>
                  <div style={{ fontWeight: 800 }}>3. <a href="/resume-revision" style={{ color: colors.accent, textDecoration: 'none' }}>Résumé Revision</a></div>
                  <div style={{ color: '#666', marginTop: 4 }}>Your new resume targets your dream role! Get another 1:1 revision to go over all the improvements.</div>
                </div>
                <div>
                  <div style={{ fontWeight: 800 }}>4. <a href="/full-service-apply" style={{ color: colors.accent, textDecoration: 'none' }}>Full-Service Apply to Jobs</a></div>
                  <div style={{ color: '#666', marginTop: 4 }}>We'll take your new resume and apply to 50 or 25 niche jobs for you. Each application personally targeting your perfect role.</div>
                </div>
                <div>
                  <div style={{ fontWeight: 800 }}>5. <a href="/linkedin-profile-revision" style={{ color: colors.accent, textDecoration: 'none' }}>LinkedIn Profile Revision</a></div>
                  <div style={{ color: '#666', marginTop: 4 }}>Your LinkedIn profile is ready to get it built to ensure your target role so you can start networking to get hired.</div>
                </div>
              </div>
            </div>
            <div style={{ background: '#f9f9f9', padding: 16, borderRadius: 12, border: '1px solid #e2e2e2' }}>
              <div style={{ fontWeight: 900, color: colors.accent, marginBottom: 8 }}>WEEK 3+</div>
              <div style={{ display: 'grid', gap: 12 }}>
                <div>
                  <div style={{ fontWeight: 800 }}>6. <a href="/job-search-strategies" style={{ color: colors.accent, textDecoration: 'none' }}>Job Search Strategy</a></div>
                  <div style={{ color: '#666', marginTop: 4 }}>Learn how to network with hiring managers, recruiters, and relevant professionals on LinkedIn.</div>
                </div>
                <div>
                  <div style={{ fontWeight: 800 }}>7. Apply to Jobs Results</div>
                  <div style={{ color: '#666', marginTop: 4 }}>The results are in! We applied to 50 jobs for you. Now you're in control. Follow up on the applications and network.</div>
                </div>
                <div>
                  <div style={{ fontWeight: 800 }}>8. <a href="/interview-prep" style={{ color: colors.accent, textDecoration: 'none' }}>Interview Prep Session #1</a></div>
                  <div style={{ color: '#666', marginTop: 4 }}>Perform a 1:1 mock interview with a recruiter or hiring manager. Gain critical feedback on your interview skills and learn how to make it past the first round of interviews.</div>
                </div>
                <div>
                  <div style={{ fontWeight: 800 }}>9. <a href="/interview-prep" style={{ color: colors.accent, textDecoration: 'none' }}>Interview Prep Session #2</a></div>
                  <div style={{ color: '#666', marginTop: 4 }}>This time, focus on landing the job with a later stage mock interview. Answer that interview questions from your target role. Don't worry, we'll help you prepare!</div>
                </div>
                <div>
                  <div style={{ fontWeight: 800 }}>10. Continued Support</div>
                  <div style={{ color: '#666', marginTop: 4 }}>We're here to support you! Have additional questions? Need more guidance or motivation? Check the next section for full detail!</div>
                </div>
              </div>
            </div>
          </div>
          <div style={{ marginTop: 18, padding: 18, background: colors.teal, borderRadius: 12, border: '2px solid #7aa3a1', textAlign: 'center' }}>
            <div style={{ fontSize: 20, fontWeight: 900, marginBottom: 8 }}>2,500+ Trusted by happy clients</div>
            <div style={{ color: '#555', marginBottom: 12 }}>The Ultimate Bundle includes our bold Job Offer Guarantee!</div>
            <a href="/guarantee" style={cta}>Learn about the guarantee</a>
          </div>
        </div>
      </section>

      {/* Continued Support */}
      <section style={{ ...section, background: '#f9f9f9' }}>
        <div style={maxw}>
          <h2 style={{ margin: 0, fontSize: 28, fontWeight: 900, textAlign: 'center' }}>Continued Support</h2>
          <p style={{ marginTop: 8, textAlign: 'center', color: '#555', maxWidth: 700, margin: '8px auto 0' }}>Continued Support is a guarantee that we will support you and guide you for as long as it takes you to get hired.</p>
          <div style={{ marginTop: 24, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, alignItems: 'center' }}>
            <div>
              <div style={{ width: '100%', height: 300, background: '#e9e9e9', borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <div style={{ color: '#888' }}>Happy client (image)</div>
              </div>
            </div>
            <div>
              <div style={{ marginBottom: 16 }}>
                <div style={{ fontWeight: 900, marginBottom: 6 }}>✓ Enhance your job search</div>
                <div style={{ color: '#666' }}>Gain access to personalized advice and valuable feedback from our expert career consultants to help you stand out in your job hunt.</div>
              </div>
              <div style={{ marginBottom: 16 }}>
                <div style={{ fontWeight: 900, marginBottom: 6 }}>✓ Receive ongoing support</div>
                <div style={{ color: '#666' }}>Benefit from continued support hours with our coaches, guiding you through your job search journey until you land the perfect position.</div>
              </div>
              <div style={{ marginBottom: 16 }}>
                <div style={{ fontWeight: 900, marginBottom: 6 }}>✓ Stay accountable</div>
                <div style={{ color: '#666' }}>Leverage unlimited calls to maintain focus on your plans and goals, ensuring you stay on track throughout your job search.</div>
              </div>
              <div style={{ padding: 12, background: '#fff3cd', borderRadius: 8, fontSize: 13, color: '#856404' }}>
                Continued Support sessions don't offer additional services or deliverables. Instead, they provide personalized advice and feedback to help you successfully navigate your career development journey.
              </div>
              <div style={{ marginTop: 12, fontSize: 13, color: '#666' }}>
                The job search can be lonely, it doesn't have to be 🙂
              </div>
              <div style={{ marginTop: 8, fontSize: 13, color: '#666' }}>
                * Scheduling is on a first-come, first-served basis, subject to availability.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section style={{ ...section, textAlign: 'center' }}>
        <div style={maxw}>
          <h2 style={{ margin: 0, fontSize: 32, fontWeight: 900 }}>Ready to make your dream job a <span style={{ color: colors.accent }}>reality</span>?</h2>
          <p style={{ marginTop: 10, color: '#555', fontSize: 18 }}>Get personal attention with each of our services, or join a community of learners in our online courses.</p>
          <div style={{ marginTop: 18 }}>
            <a href="/signup" style={{ ...cta, fontSize: 18, padding: '16px 32px' }}>Book a Free Consultation</a>
          </div>
          <div style={{ marginTop: 14, color: '#666' }}>
            Questions about our services? Check out our <a href="#" style={{ color: colors.accent }}>FAQs page</a> or contact our team <a href="#" style={{ color: colors.accent }}>here</a>.
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
                <li><a href="/full-service-apply" style={{ color: 'inherit', textDecoration: 'none' }}>Full-Service Apply</a></li>
                <li><a href="/interview-prep" style={{ color: 'inherit', textDecoration: 'none' }}>Interview Prep</a></li>
              </ul>
            </div>
            <div>
              <div style={{ fontWeight: 900, marginBottom: 10 }}>Service Bundles</div>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'grid', gap: 8 }}>
                <li><a href="/bundles#starter" style={{ color: 'inherit', textDecoration: 'none' }}>Starter Bundle</a></li>
                <li><a href="/bundles#land" style={{ color: 'inherit', textDecoration: 'none' }}>Land the Job Bundle</a></li>
                <li><a href="/bundles#ultimate" style={{ color: 'inherit', textDecoration: 'none' }}>Ultimate Bundle</a></li>
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


