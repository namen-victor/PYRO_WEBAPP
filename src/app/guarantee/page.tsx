'use client';

import { Navigation } from '@/components/Navigation';
import Head from 'next/head';
import { useEffect } from 'react';

export default function GuaranteePage() {
  // Update document title and meta description
  useEffect(() => {
    document.title = "Pyro — We Apply For You, Every Weekday";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', "Human-led, AI-assisted job applications every Monday–Friday. High-volume coverage in your target location. Tailored per role or use your optimized résumé. No employment guarantee.");
    } else {
      const meta = document.createElement('meta');
      meta.name = 'description';
      meta.content = "Human-led, AI-assisted job applications every Monday–Friday. High-volume coverage in your target location. Tailored per role or use your optimized résumé. No employment guarantee.";
      document.head.appendChild(meta);
    }
  }, []);
  const colors = {
    pageBg: '#ebebeb',
    text: '#2e2e2e',
    accent: '#7aa3a1',
    white: '#FFFFFF',
    line: '#e2e2e2',
    dark: '#2e2e2e',
    muted: '#666666',
    softGray: '#f8f8f8'
  } as const;

  const maxw: React.CSSProperties = { maxWidth: 1200, margin: '0 auto' };
  const section: React.CSSProperties = { padding: '80px 16px' };
  const sectionTablet: React.CSSProperties = { padding: '56px 16px' };
  const sectionMobile: React.CSSProperties = { padding: '40px 16px' };
  
  const cta: React.CSSProperties = { 
    display: 'inline-block', 
    padding: '14px 28px', 
    background: colors.accent, 
    color: colors.white, 
    borderRadius: 8, 
    textDecoration: 'none', 
    fontWeight: 700,
    fontSize: 16,
    transition: 'background 0.2s'
  };
  
  const ctaSecondary: React.CSSProperties = { 
    display: 'inline-block', 
    padding: '12px 26px', 
    border: `2px solid ${colors.accent}`, 
    color: colors.accent, 
    borderRadius: 8, 
    textDecoration: 'none', 
    fontWeight: 700,
    fontSize: 16,
    transition: 'all 0.2s'
  };

  const cardStyle: React.CSSProperties = {
    background: colors.white,
    border: `1px solid ${colors.line}`,
    borderRadius: 12,
    padding: 24,
    boxShadow: '0 4px 16px rgba(0,0,0,0.08)'
  };

  return (
    <div style={{ background: colors.pageBg, color: colors.text }}>
      <style jsx global>{`
        @media (max-width: 1023px) {
          .hero-grid {
            grid-template-columns: 1fr !important;
            gap: 40px !important;
          }
        }
        @media (max-width: 767px) {
          .hero-grid,
          .promise-grid,
          .pace-grid,
          .tailoring-grid,
          .testimonial-grid,
          .faq-grid {
            grid-template-columns: 1fr !important;
          }
          .section-padding {
            padding: 40px 16px !important;
          }
        }
        @media (min-width: 768px) and (max-width: 1023px) {
          .promise-grid,
          .pace-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
          .section-padding {
            padding: 56px 16px !important;
          }
        }
        .smooth-scroll {
          scroll-behavior: smooth;
        }
      `}</style>
      
      <Navigation currentPage="guarantee" />

      {/* Hero */}
      <section style={{ ...section, background: colors.softGray }} className="section-padding">
        <div style={maxw}>
          <div className="hero-grid" style={{ display: 'grid', gridTemplateColumns: '7fr 5fr', gap: 32, alignItems: 'center' }}>
            <div>
              <h1 style={{ margin: 0, fontSize: 'clamp(32px, 5vw, 48px)', lineHeight: 1.1, fontWeight: 900 }}>
                Relentless Applications. Real Visibility.
              </h1>
              <p style={{ marginTop: 24, color: colors.text, fontSize: 18, lineHeight: 1.6 }}>
                We apply to a high volume of roles for you every Monday–Friday in your target location. Choose tailored-per-application or use your optimized résumé—either way, we maximize recruiter and ATS visibility.
              </p>
              
              {/* Bullets */}
              <ul style={{ listStyle: 'none', padding: 0, margin: '24px 0 0 0' }}>
                {[
                  'Weekday cadence: consistent applications Mon–Fri.',
                  'Coverage promise: every relevant opportunity in your chosen location.',
                  'Visibility first: recruiter/ATS-ready submissions.'
                ].map((item, i) => (
                  <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 12, marginBottom: 12, fontSize: 16 }}>
                    <span style={{ 
                      flexShrink: 0, 
                      width: 20, 
                      height: 20, 
                      borderRadius: '50%', 
                      background: colors.accent, 
                      color: colors.white, 
                      display: 'flex', 
                      alignItems: 'center', 
                      justifyContent: 'center', 
                      fontSize: 12, 
                      fontWeight: 700,
                      marginTop: 2
                    }}>✓</span>
                    <span style={{ lineHeight: 1.5 }}>{item}</span>
                  </li>
                ))}
              </ul>

              {/* CTAs */}
              <div style={{ display: 'flex', gap: 16, marginTop: 32, flexWrap: 'wrap' }}>
                <a href="/signup" style={cta}>Get Started</a>
                <a href="#how-it-works" style={ctaSecondary}>See How It Works</a>
              </div>
            </div>
            
            {/* Visual placeholder */}
            <div>
              <div style={{ 
                background: `linear-gradient(135deg, ${colors.white}, #f7f7f7)`, 
                border: `1px solid ${colors.line}`, 
                borderRadius: 12, 
                aspectRatio: '16/10',
                boxShadow: '0 10px 30px rgba(0,0,0,0.08)', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center' 
              }}>
                <div style={{ color: '#8a8a8a', textAlign: 'center', padding: 20 }}>Visual Asset Placeholder</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Promise */}
      <section id="promise" style={{ ...section, background: colors.white }} className="section-padding">
        <div style={maxw}>
          <h2 style={{ margin: '0 0 16px 0', fontSize: 'clamp(24px, 3.5vw, 32px)', fontWeight: 900, textAlign: 'center' }}>
            Our Promise: Coverage + Visibility
          </h2>
          
          <div className="promise-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24, marginTop: 40 }}>
            {[
              {
                title: 'High-Volume, Weekday Applications',
                body: 'We submit a large number of applications for you every Monday–Friday, so your profile never goes quiet.'
              },
              {
                title: 'Coverage in Your Target Location',
                body: 'We capture every relevant opportunity in the cities you choose.'
              },
              {
                title: 'Visibility Built-In',
                body: 'Pick tailored per application or use your optimized résumé. Both are recruiter/ATS-ready.'
              }
            ].map((item, i) => (
              <div key={i} style={cardStyle}>
                <h3 style={{ margin: 0, fontSize: 18, fontWeight: 800, color: colors.dark }}>{item.title}</h3>
                <p style={{ margin: '12px 0 0 0', fontSize: 15, lineHeight: 1.6, color: colors.text }}>{item.body}</p>
              </div>
            ))}
          </div>

          {/* Disclaimer */}
          <p style={{ marginTop: 32, textAlign: 'center', fontSize: 14, color: colors.muted, lineHeight: 1.5, maxWidth: 800, marginLeft: 'auto', marginRight: 'auto' }}>
            We cannot guarantee interviews or offers. Employers decide. We maximize reach, fit, and presentation—consistently.
          </p>
        </div>
      </section>

      {/* Weekly Pace */}
      <section id="pace" style={{ ...section, background: colors.softGray }} className="section-padding">
        <div style={maxw}>
          <h2 style={{ margin: '0 0 16px 0', fontSize: 'clamp(24px, 3.5vw, 32px)', fontWeight: 900, textAlign: 'center' }}>
            Consistent, High-Volume Pace (Mon–Fri)
          </h2>
          
          <div className="pace-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24, marginTop: 40 }}>
            {[
              { tier: 'Standard', volume: 'Triple-digit weekly applications' },
              { tier: 'Plus', volume: 'Hundreds weekly' },
              { tier: 'Max', volume: 'Up to 400+ weekly' }
            ].map((item, i) => (
              <a 
                key={i} 
                href="/pricing"
                style={{ 
                  ...cardStyle, 
                  textDecoration: 'none',
                  color: colors.text,
                  transition: 'transform 0.2s, box-shadow 0.2s',
                  cursor: 'pointer',
                  display: 'block'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-4px)';
                  e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.12)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 4px 16px rgba(0,0,0,0.08)';
                }}
              >
                <div style={{ fontSize: 14, fontWeight: 700, color: colors.accent, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  {item.tier}
                </div>
                <div style={{ marginTop: 12, fontSize: 20, fontWeight: 800, lineHeight: 1.3 }}>
                  {item.volume}
                </div>
              </a>
            ))}
          </div>

          <p style={{ marginTop: 24, textAlign: 'center', fontSize: 14, color: colors.muted }}>
            Pace varies by plan and market conditions. We queue applications Monday–Friday.
          </p>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" style={{ ...section, background: colors.white }} className="section-padding">
        <div style={maxw}>
          <h2 style={{ margin: '0 0 40px 0', fontSize: 'clamp(24px, 3.5vw, 32px)', fontWeight: 900, textAlign: 'center' }}>
            How It Works
          </h2>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 24 }}>
            {[
              {
                num: '1',
                title: 'Intake & Targeting',
                desc: 'Choose locations, roles, and seniority; share your résumé.'
              },
              {
                num: '2',
                title: 'Setup',
                desc: 'We configure search coverage, ATS formatting, and tailoring rules.'
              },
              {
                num: '3',
                title: 'Daily Runs (Mon–Fri)',
                desc: 'We apply in volume, prioritize fit, and log everything.'
              },
              {
                num: '4',
                title: 'Updates',
                desc: 'Weekly summaries; adjust targets anytime.'
              }
            ].map((step, i) => (
              <div key={i} style={{ textAlign: 'center' }}>
                <div style={{ 
                  width: 60, 
                  height: 60, 
                  borderRadius: '50%', 
                  background: colors.accent, 
                  color: colors.white, 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center', 
                  fontSize: 28, 
                  fontWeight: 900,
                  margin: '0 auto 16px auto',
                  boxShadow: '0 4px 12px rgba(122, 163, 161, 0.3)'
                }}>
                  {step.num}
                </div>
                <h3 style={{ margin: '0 0 8px 0', fontSize: 16, fontWeight: 800 }}>{step.title}</h3>
                <p style={{ margin: 0, fontSize: 14, lineHeight: 1.5, color: colors.muted }}>{step.desc}</p>
              </div>
            ))}
          </div>

          <div style={{ textAlign: 'center', marginTop: 48 }}>
            <a href="/signup" style={cta}>Start My Setup</a>
          </div>
        </div>
      </section>

      {/* Tailoring Options */}
      <section id="tailoring" style={{ ...section, background: colors.softGray }} className="section-padding">
        <div style={maxw}>
          <h2 style={{ margin: '0 0 40px 0', fontSize: 'clamp(24px, 3.5vw, 32px)', fontWeight: 900, textAlign: 'center' }}>
            Your Choice: Tailored or Optimized
          </h2>
          
          <div className="tailoring-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
            {[
              {
                title: 'Tailored Per Application',
                desc: 'Keyword alignment + role-specific tweaks for each submission.',
                icon: '🎯'
              },
              {
                title: 'Use My Optimized Résumé',
                desc: 'Stick to your best version while we maximize reach.',
                icon: '📄'
              }
            ].map((option, i) => (
              <div key={i} style={cardStyle}>
                <div style={{ fontSize: 40, marginBottom: 16 }}>{option.icon}</div>
                <h3 style={{ margin: 0, fontSize: 20, fontWeight: 800 }}>{option.title}</h3>
                <p style={{ margin: '12px 0 0 0', fontSize: 15, lineHeight: 1.6, color: colors.text }}>{option.desc}</p>
              </div>
            ))}
          </div>

          <p style={{ marginTop: 24, textAlign: 'center', fontSize: 14, color: colors.muted }}>
            Switch anytime. Both tracks are recruiter/ATS-ready.
          </p>
        </div>
      </section>

      {/* Coverage */}
      <section id="coverage" style={{ ...section, background: colors.white }} className="section-padding">
        <div style={maxw}>
          <h2 style={{ margin: '0 0 24px 0', fontSize: 'clamp(24px, 3.5vw, 32px)', fontWeight: 900, textAlign: 'center' }}>
            We Cover Your Market
          </h2>
          
          <div style={{ maxWidth: 700, margin: '0 auto', textAlign: 'center' }}>
            <div style={{ fontSize: 48, marginBottom: 16 }}>📍</div>
            <p style={{ margin: 0, fontSize: 18, lineHeight: 1.6, color: colors.text }}>
              We monitor major boards and employer sites to capture every relevant opening in your chosen city (or cities). Add or remove locations anytime.
            </p>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="proof" style={{ ...section, background: colors.softGray }} className="section-padding">
        <div style={maxw}>
          <h2 style={{ margin: '0 0 40px 0', fontSize: 'clamp(24px, 3.5vw, 32px)', fontWeight: 900, textAlign: 'center' }}>
            What Clients Say
          </h2>
          
          <div className="testimonial-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }}>
            {[
              ['Alex P., Product Manager', '"Pyro helped me cut through the noise. Two interviews in 3 weeks."'],
              ['Maya R., Data Analyst', '"The human touch matters. My specialist tailored every submission."'],
              ['Sam K., Software Engineer', '"I finally stopped guessing. Clear updates and real opportunities."']
            ].map(([name, quote], i) => (
              <div key={i} style={cardStyle}>
                <p style={{ margin: '0 0 16px 0', fontSize: 16, lineHeight: 1.6, fontStyle: 'italic', color: colors.text }}>
                  {quote}
                </p>
                <div style={{ fontSize: 14, fontWeight: 700, color: colors.dark }}>— {name}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section id="faqs" style={{ ...section, background: colors.white }} className="section-padding">
        <div style={maxw}>
          <h2 style={{ margin: '0 0 40px 0', fontSize: 'clamp(24px, 3.5vw, 32px)', fontWeight: 900, textAlign: 'center' }}>
            FAQs
          </h2>
          
          <div className="faq-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 32 }}>
            {[
              {
                q: 'Do you guarantee a job?',
                a: 'No. We guarantee consistent weekday applications, coverage, and visibility.'
              },
              {
                q: 'Can I choose tailoring?',
                a: 'Yes—tailored per application or use your optimized résumé. Switch anytime.'
              },
              {
                q: 'Which days do you apply?',
                a: 'Monday through Friday.'
              },
              {
                q: 'What locations do you cover?',
                a: 'Your choice—single city or multiple.'
              },
              {
                q: 'What does "high-volume" mean?',
                a: 'Triple-digit weekly submissions at minimum; higher tiers reach several hundred per week.'
              }
            ].map((faq, i) => (
              <div key={i} style={{ ...cardStyle, padding: 20 }}>
                <h3 style={{ margin: 0, fontSize: 17, fontWeight: 800, color: colors.dark }}>{faq.q}</h3>
                <p style={{ margin: '12px 0 0 0', fontSize: 15, lineHeight: 1.6, color: colors.text }}>{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ background: colors.dark, color: '#eaeaea', padding: '48px 16px' }}>
        <div style={{ ...maxw, display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
            <span style={{ fontWeight: 800 }}>Pyro Solutions Inc.</span>
            <a href="#promise" style={{ color: colors.accent, textDecoration: 'none', fontSize: 14 }}>Our Promise</a>
          </div>
          <div>© 2025 Pyro Solutions Inc. All rights reserved.</div>
        </div>
      </footer>
    </div>
  );
}
