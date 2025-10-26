'use client';

import React, { useState } from 'react';
import { Navigation } from '@/components/Navigation';

export default function FreeResumeFeedbackPage() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const testimonials = [
    {
      name: 'Thomas Bobarik',
      role: 'Systems Ops Manager',
      company: 'Google',
      quote: 'PyroINC took my unique background and helped me break out into Big Tech. Their résumé feedback was a key reason in being considered by a hiring manager for the role I have today.'
    },
    {
      name: 'Sarah Chen',
      role: 'Product Manager',
      company: 'Microsoft',
      quote: 'The feedback I received transformed my résumé completely. Within two weeks of applying the changes, I had three interviews lined up with top tech companies.'
    },
    {
      name: 'Marcus Johnson',
      role: 'Financial Analyst',
      company: 'Goldman Sachs',
      quote: 'PyroINC helped me highlight my achievements in a way that resonated with recruiters. The expert feedback made all the difference in landing my dream role.'
    }
  ];

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <div style={{ backgroundColor: '#ebebeb', minHeight: '100vh' }}>
      {/* Navigation */}
      <Navigation currentPage="free-resume-feedback" />

      {/* Hero Section */}
      <section style={{ 
        padding: '80px 5%', 
        maxWidth: '1200px', 
        margin: '0 auto',
        display: 'flex',
        flexDirection: 'row',
        gap: '60px',
        alignItems: 'center',
        flexWrap: 'wrap'
      }}>
        {/* Left: Text & CTA */}
        <div style={{ flex: '1 1 500px', minWidth: '300px' }}>
          <div style={{
            fontSize: '14px',
            fontWeight: 700,
            letterSpacing: '0.1em',
            color: '#16a085',
            marginBottom: '16px'
          }}>
            FREE RÉSUMÉ FEEDBACK
          </div>
          
          <h1 style={{ 
            fontSize: '48px', 
            fontWeight: 700, 
            color: '#2e2e2e', 
            marginBottom: '20px',
            lineHeight: 1.2
          }}>
            See what your résumé is missing
          </h1>
          
          <p style={{ 
            fontSize: '18px', 
            color: '#555', 
            marginBottom: '32px',
            lineHeight: 1.6
          }}>
            Our résumé feedback has helped clients secure positions at top companies like Google, Microsoft, and JP Morgan.
          </p>
          
          <p style={{ 
            fontSize: '16px', 
            color: '#555', 
            marginBottom: '32px',
            lineHeight: 1.6
          }}>
            Get expert insights on what works—and what doesn't—so you can stand out from the competition.
          </p>

          {/* CTA Box */}
          <div style={{
            backgroundColor: '#fff',
            border: '2px solid #16a085',
            borderRadius: '12px',
            padding: '32px',
            maxWidth: '500px',
            textAlign: 'center'
          }}>
            <div style={{
              width: '80px',
              height: '80px',
              margin: '0 auto 20px',
              borderRadius: '50%',
              border: '3px dashed #16a085',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '36px'
            }}>
              📄
            </div>
            
            <a
              href="/signup"
              style={{
                display: 'inline-block',
                width: '100%',
                padding: '16px 32px',
                fontSize: '18px',
                fontWeight: 600,
                color: '#fff',
                backgroundColor: '#16a085',
                border: 'none',
                borderRadius: '8px',
                textDecoration: 'none',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#138f75';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#16a085';
              }}
            >
              STAND OUT TO EMPLOYERS - $0 EXPERT REVIEW
            </a>
            
            <p style={{
              fontSize: '12px',
              color: '#666',
              marginTop: '16px',
              lineHeight: 1.5
            }}>
              Submit your résumé for a no-cost expert review. By submitting, you agree to receive occasional emails from PyroINC. You can unsubscribe any time. See our{' '}
              <a href="/terms" style={{ color: '#16a085', textDecoration: 'underline' }}>
                Terms & Conditions
              </a>.
            </p>
          </div>
        </div>

        {/* Right: Image */}
        <div style={{ flex: '1 1 400px', minWidth: '300px', textAlign: 'center', position: 'relative' }}>
          <div style={{
            backgroundColor: '#d4f1e8',
            borderRadius: '50%',
            width: '400px',
            height: '400px',
            margin: '0 auto',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative'
          }}>
            {/* Decorative Icons */}
            <div style={{
              position: 'absolute',
              top: '20px',
              right: '40px',
              width: '60px',
              height: '60px',
              backgroundColor: '#ffd93d',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '32px'
            }}>
              ✓
            </div>
            <div style={{
              position: 'absolute',
              top: '80px',
              right: '-20px',
              width: '70px',
              height: '70px',
              backgroundColor: '#ff8b6a',
              borderRadius: '12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '36px',
              transform: 'rotate(15deg)'
            }}>
              📋
            </div>
            
            {/* Placeholder for person image */}
            <div style={{
              width: '280px',
              height: '320px',
              backgroundColor: '#fff',
              borderRadius: '12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexDirection: 'column',
              boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
            }}>
              <div style={{
                width: '120px',
                height: '120px',
                backgroundColor: '#16a085',
                borderRadius: '50%',
                marginBottom: '20px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#fff',
                fontSize: '48px',
                fontWeight: 700
              }}>
                👤
              </div>
              <div style={{
                width: '200px',
                height: '140px',
                backgroundColor: '#f5f5f5',
                borderRadius: '8px',
                padding: '12px',
                fontSize: '10px',
                color: '#999',
                textAlign: 'left'
              }}>
                <div style={{ fontWeight: 700, marginBottom: '8px', fontSize: '12px', color: '#2e2e2e' }}>RÉSUMÉ</div>
                <div style={{ height: '4px', backgroundColor: '#ddd', marginBottom: '4px' }}></div>
                <div style={{ height: '4px', backgroundColor: '#ddd', marginBottom: '4px' }}></div>
                <div style={{ height: '4px', backgroundColor: '#ddd', width: '70%', marginBottom: '8px' }}></div>
                <div style={{ height: '4px', backgroundColor: '#ddd', marginBottom: '4px' }}></div>
                <div style={{ height: '4px', backgroundColor: '#ddd', marginBottom: '4px' }}></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section style={{ 
        padding: '80px 5%', 
        maxWidth: '1200px', 
        margin: '0 auto',
        backgroundColor: '#fff',
        borderRadius: '16px'
      }}>
        <h2 style={{
          fontSize: '36px',
          fontWeight: 700,
          color: '#2e2e2e',
          textAlign: 'center',
          marginBottom: '60px'
        }}>
          How it works
        </h2>

        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          gap: '40px',
          flexWrap: 'wrap',
          position: 'relative'
        }}>
          {/* Step 1 */}
          <div style={{ flex: '1 1 280px', textAlign: 'center', position: 'relative' }}>
            <div style={{
              width: '80px',
              height: '80px',
              backgroundColor: '#d4f1e8',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 20px',
              fontSize: '32px',
              fontWeight: 700,
              color: '#16a085',
              border: '3px solid #16a085'
            }}>
              1
            </div>
            <h3 style={{
              fontSize: '22px',
              fontWeight: 600,
              color: '#2e2e2e',
              marginBottom: '12px'
            }}>
              Fill Out the Form
            </h3>
            <p style={{
              fontSize: '16px',
              color: '#555',
              lineHeight: 1.6
            }}>
              Spend just 3 minutes filling out our quick form, and get ready to receive personalized résumé advice that can help you land more interviews.
            </p>
          </div>

          {/* Arrow */}
          <div style={{
            fontSize: '32px',
            color: '#16a085',
            alignSelf: 'flex-start',
            marginTop: '30px',
            display: 'none'
          }}>
            →
          </div>

          {/* Step 2 */}
          <div style={{ flex: '1 1 280px', textAlign: 'center', position: 'relative' }}>
            <div style={{
              width: '80px',
              height: '80px',
              backgroundColor: '#d4f1e8',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 20px',
              fontSize: '32px',
              fontWeight: 700,
              color: '#16a085',
              border: '3px solid #16a085'
            }}>
              2
            </div>
            <h3 style={{
              fontSize: '22px',
              fontWeight: 600,
              color: '#2e2e2e',
              marginBottom: '12px'
            }}>
              Receive Résumé Feedback
            </h3>
            <p style={{
              fontSize: '16px',
              color: '#555',
              lineHeight: 1.6
            }}>
              Get tailored, actionable feedback delivered straight to your inbox. Discover exactly what to change to make your résumé stand out.
            </p>
          </div>

          {/* Step 3 */}
          <div style={{ flex: '1 1 280px', textAlign: 'center', position: 'relative' }}>
            <div style={{
              width: '80px',
              height: '80px',
              backgroundColor: '#d4f1e8',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 20px',
              fontSize: '32px',
              fontWeight: 700,
              color: '#16a085',
              border: '3px solid #16a085'
            }}>
              3
            </div>
            <h3 style={{
              fontSize: '22px',
              fontWeight: 600,
              color: '#2e2e2e',
              marginBottom: '12px'
            }}>
              Apply Feedback
            </h3>
            <p style={{
              fontSize: '16px',
              color: '#555',
              lineHeight: 1.6
            }}>
              Apply the expert advice right away and boost your résumé's impact before sending out applications. Maximize your chances of landing interviews!
            </p>
          </div>
        </div>
      </section>

      {/* Why Our Feedback Matters */}
      <section style={{ 
        padding: '80px 5%', 
        maxWidth: '1200px', 
        margin: '0 auto'
      }}>
        <div style={{
          display: 'flex',
          gap: '60px',
          alignItems: 'center',
          flexWrap: 'wrap'
        }}>
          {/* Left Column */}
          <div style={{ flex: '1 1 400px' }}>
            <h2 style={{
              fontSize: '32px',
              fontWeight: 700,
              color: '#2e2e2e',
              marginBottom: '20px',
              lineHeight: 1.3
            }}>
              PyroINC's résumé feedback can help you land your dream job
            </h2>
            <p style={{
              fontSize: '16px',
              color: '#555',
              marginBottom: '32px',
              lineHeight: 1.6
            }}>
              Access our free resources and tips to further enhance your job hunting needs and ensure you're always one step ahead.
            </p>
            <a
              href="/signup"
              style={{
                display: 'inline-block',
                padding: '16px 32px',
                fontSize: '16px',
                fontWeight: 600,
                color: '#fff',
                backgroundColor: '#16a085',
                border: 'none',
                borderRadius: '8px',
                textDecoration: 'none',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#138f75';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#16a085';
              }}
            >
              BOOST YOUR HIRING ODDS - GET $0 FEEDBACK
            </a>
          </div>

          {/* Right Column - Benefits */}
          <div style={{ flex: '1 1 500px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
            {/* Benefit 1 */}
            <div style={{
              backgroundColor: '#fff',
              padding: '24px',
              borderRadius: '12px',
              border: '2px solid #e2e2e2'
            }}>
              <div style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: '16px'
              }}>
                <div style={{
                  fontSize: '32px',
                  flexShrink: 0
                }}>
                  ✓
                </div>
                <div>
                  <h3 style={{
                    fontSize: '20px',
                    fontWeight: 600,
                    color: '#2e2e2e',
                    marginBottom: '8px'
                  }}>
                    Improve your résumé
                  </h3>
                  <p style={{
                    fontSize: '15px',
                    color: '#555',
                    lineHeight: 1.6,
                    margin: 0
                  }}>
                    Make your first impression count with expert feedback on format and structure. Whether you're just starting out or advancing your career, we'll help you create a résumé that leaves a lasting impact.
                  </p>
                </div>
              </div>
            </div>

            {/* Benefit 2 */}
            <div style={{
              backgroundColor: '#fff',
              padding: '24px',
              borderRadius: '12px',
              border: '2px solid #e2e2e2'
            }}>
              <div style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: '16px'
              }}>
                <div style={{
                  fontSize: '32px',
                  flexShrink: 0
                }}>
                  ✓
                </div>
                <div>
                  <h3 style={{
                    fontSize: '20px',
                    fontWeight: 600,
                    color: '#2e2e2e',
                    marginBottom: '8px'
                  }}>
                    Content is king
                  </h3>
                  <p style={{
                    fontSize: '15px',
                    color: '#555',
                    lineHeight: 1.6,
                    margin: 0
                  }}>
                    Showcase your skills and achievements clearly. We'll help you highlight what matters most—your results—so your résumé stands out from the rest.
                  </p>
                </div>
              </div>
            </div>

            {/* Benefit 3 */}
            <div style={{
              backgroundColor: '#fff',
              padding: '24px',
              borderRadius: '12px',
              border: '2px solid #e2e2e2'
            }}>
              <div style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: '16px'
              }}>
                <div style={{
                  fontSize: '32px',
                  flexShrink: 0
                }}>
                  ✓
                </div>
                <div>
                  <h3 style={{
                    fontSize: '20px',
                    fontWeight: 600,
                    color: '#2e2e2e',
                    marginBottom: '8px'
                  }}>
                    Design matters
                  </h3>
                  <p style={{
                    fontSize: '15px',
                    color: '#555',
                    lineHeight: 1.6,
                    margin: 0
                  }}>
                    Get your résumé design right for recruiters and ATS systems. We ensure it's easy to read and optimized to get you noticed.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Client Logos */}
      <section style={{ 
        padding: '60px 5%', 
        maxWidth: '1200px', 
        margin: '0 auto',
        textAlign: 'center'
      }}>
        <h3 style={{
          fontSize: '18px',
          fontWeight: 600,
          color: '#666',
          marginBottom: '32px',
          letterSpacing: '0.05em'
        }}>
          Our clients work at
        </h3>
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '40px',
          flexWrap: 'wrap'
        }}>
          {['LinkedIn', 'Google', 'Amazon', 'Tesla', 'Goldman Sachs', 'Microsoft', 'Deloitte', 'Netflix'].map((company, index) => (
            <div key={index} style={{
              fontSize: '20px',
              fontWeight: 700,
              color: '#999',
              padding: '12px 24px',
              border: '2px solid #e2e2e2',
              borderRadius: '8px',
              backgroundColor: '#fff'
            }}>
              {company}
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section style={{ 
        padding: '80px 5%', 
        maxWidth: '1000px', 
        margin: '0 auto',
        textAlign: 'center'
      }}>
        <h2 style={{
          fontSize: '36px',
          fontWeight: 700,
          color: '#2e2e2e',
          marginBottom: '16px'
        }}>
          Dream Jobs that Became a Reality
        </h2>
        <p style={{
          fontSize: '16px',
          color: '#666',
          marginBottom: '48px'
        }}>
          See what our clients have to say about PyroINC
        </p>

        {/* Testimonial Carousel */}
        <div style={{
          backgroundColor: '#fff',
          borderRadius: '16px',
          padding: '48px',
          boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
          position: 'relative',
          minHeight: '300px'
        }}>
          {/* Navigation Arrows */}
          <button
            onClick={prevTestimonial}
            style={{
              position: 'absolute',
              left: '20px',
              top: '50%',
              transform: 'translateY(-50%)',
              width: '48px',
              height: '48px',
              borderRadius: '50%',
              border: '2px solid #16a085',
              backgroundColor: '#fff',
              color: '#16a085',
              fontSize: '24px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            ←
          </button>

          <button
            onClick={nextTestimonial}
            style={{
              position: 'absolute',
              right: '20px',
              top: '50%',
              transform: 'translateY(-50%)',
              width: '48px',
              height: '48px',
              borderRadius: '50%',
              border: '2px solid #16a085',
              backgroundColor: '#fff',
              color: '#16a085',
              fontSize: '24px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            →
          </button>

          {/* Testimonial Content */}
          <div style={{
            maxWidth: '700px',
            margin: '0 auto'
          }}>
            <div style={{
              width: '100px',
              height: '100px',
              backgroundColor: '#16a085',
              borderRadius: '50%',
              margin: '0 auto 24px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#fff',
              fontSize: '40px',
              fontWeight: 700
            }}>
              {testimonials[currentTestimonial].name.charAt(0)}
            </div>

            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '12px',
              marginBottom: '24px'
            }}>
              <h3 style={{
                fontSize: '24px',
                fontWeight: 600,
                color: '#2e2e2e',
                margin: 0
              }}>
                {testimonials[currentTestimonial].name}
              </h3>
              <div style={{
                fontSize: '20px',
                fontWeight: 700,
                color: '#999',
                padding: '4px 16px',
                border: '2px solid #e2e2e2',
                borderRadius: '6px'
              }}>
                {testimonials[currentTestimonial].company}
              </div>
            </div>

            <p style={{
              fontSize: '14px',
              color: '#666',
              marginBottom: '20px',
              fontWeight: 600
            }}>
              {testimonials[currentTestimonial].role}
            </p>

            <p style={{
              fontSize: '18px',
              color: '#2e2e2e',
              lineHeight: 1.7,
              fontStyle: 'italic'
            }}>
              "{testimonials[currentTestimonial].quote}"
            </p>
          </div>
        </div>

        <div style={{ marginTop: '32px' }}>
          <a
            href="/success-stories"
            style={{
              fontSize: '16px',
              color: '#16a085',
              textDecoration: 'none',
              fontWeight: 600,
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px'
            }}
          >
            Read more success stories →
          </a>
        </div>
      </section>

      {/* Final CTA */}
      <section style={{ 
        padding: '80px 5%', 
        maxWidth: '900px', 
        margin: '0 auto',
        textAlign: 'center'
      }}>
        <div style={{
          backgroundColor: '#2e2e2e',
          borderRadius: '16px',
          padding: '60px 40px',
          color: '#fff'
        }}>
          <h2 style={{
            fontSize: '36px',
            fontWeight: 700,
            marginBottom: '16px',
            color: '#fff'
          }}>
            You Deserve Your Best Résumé
          </h2>
          <p style={{
            fontSize: '18px',
            marginBottom: '32px',
            color: '#ccc'
          }}>
            Upload your résumé now for a no-cost expert review.
          </p>
          <a
            href="/signup"
            style={{
              display: 'inline-block',
              padding: '18px 40px',
              fontSize: '18px',
              fontWeight: 600,
              color: '#2e2e2e',
              backgroundColor: '#fff',
              border: 'none',
              borderRadius: '8px',
              textDecoration: 'none',
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#16a085';
              e.currentTarget.style.color = '#fff';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = '#fff';
              e.currentTarget.style.color = '#2e2e2e';
            }}
          >
            Stand Out to Employers Now
          </a>
          <p style={{
            fontSize: '14px',
            marginTop: '24px',
            color: '#ccc'
          }}>
            Questions about our services? Schedule time to speak to our team{' '}
            <a href="/contact" style={{ color: '#16a085', textDecoration: 'underline' }}>
              here
            </a>.
          </p>
        </div>

        {/* Upsell to Paid Service */}
        <div style={{
          marginTop: '40px',
          padding: '32px',
          backgroundColor: '#fff',
          borderRadius: '12px',
          border: '2px solid #16a085'
        }}>
          <p style={{
            fontSize: '16px',
            color: '#555',
            marginBottom: '16px'
          }}>
            Need more help? Our expert team can completely revise your résumé for maximum impact.
          </p>
          <a
            href="/resume-revision"
            style={{
              fontSize: '16px',
              color: '#16a085',
              textDecoration: 'none',
              fontWeight: 600
            }}
          >
            Explore our Résumé Revision service →
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ 
        backgroundColor: '#2e2e2e', 
        color: '#fff', 
        padding: '60px 5% 30px',
        marginTop: '80px'
      }}>
        <div style={{ 
          maxWidth: '1200px', 
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '40px',
          marginBottom: '40px'
        }}>
          {/* Products */}
          <div>
            <h4 style={{ fontSize: '16px', fontWeight: 600, marginBottom: '16px', color: '#fff' }}>Products</h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              <li style={{ marginBottom: '10px' }}><a href="/dashboard" style={{ color: '#ccc', textDecoration: 'none' }}>Client Portal</a></li>
              <li style={{ marginBottom: '10px' }}><a href="/staff/dashboard" style={{ color: '#ccc', textDecoration: 'none' }}>Staff Dashboard</a></li>
              <li style={{ marginBottom: '10px' }}><a href="/admin/dashboard" style={{ color: '#ccc', textDecoration: 'none' }}>Admin Console</a></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 style={{ fontSize: '16px', fontWeight: 600, marginBottom: '16px', color: '#fff' }}>Services</h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              <li style={{ marginBottom: '10px' }}><a href="/career-consulting" style={{ color: '#ccc', textDecoration: 'none' }}>Career Consulting</a></li>
              <li style={{ marginBottom: '10px' }}><a href="/resume-revision" style={{ color: '#ccc', textDecoration: 'none' }}>Résumé Revision</a></li>
              <li style={{ marginBottom: '10px' }}><a href="/cover-letter-revision" style={{ color: '#ccc', textDecoration: 'none' }}>Cover Letter Revision</a></li>
              <li style={{ marginBottom: '10px' }}><a href="/linkedin-profile-revision" style={{ color: '#ccc', textDecoration: 'none' }}>LinkedIn Profile Revision</a></li>
              <li style={{ marginBottom: '10px' }}><a href="/job-search-strategies" style={{ color: '#ccc', textDecoration: 'none' }}>Job Search Strategies</a></li>
              <li style={{ marginBottom: '10px' }}><a href="/full-service-apply" style={{ color: '#ccc', textDecoration: 'none' }}>Full-Service Apply to Jobs</a></li>
              <li style={{ marginBottom: '10px' }}><a href="/interview-prep" style={{ color: '#ccc', textDecoration: 'none' }}>Interview Prep</a></li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 style={{ fontSize: '16px', fontWeight: 600, marginBottom: '16px', color: '#fff' }}>Resources</h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              <li style={{ marginBottom: '10px' }}><a href="/resources" style={{ color: '#ccc', textDecoration: 'none' }}>Resource Library</a></li>
              <li style={{ marginBottom: '10px' }}><a href="/resume-template" style={{ color: '#ccc', textDecoration: 'none' }}>Résumé Template</a></li>
              <li style={{ marginBottom: '10px' }}><a href="/cover-letter-template" style={{ color: '#ccc', textDecoration: 'none' }}>Cover Letter Template</a></li>
              <li style={{ marginBottom: '10px' }}><a href="/free-resume-feedback" style={{ color: '#16a085', textDecoration: 'none', fontWeight: 600 }}>Free Résumé Feedback</a></li>
              <li style={{ marginBottom: '10px' }}><a href="/networking-tracker" style={{ color: '#ccc', textDecoration: 'none' }}>Networking Tracker</a></li>
              <li style={{ marginBottom: '10px' }}><a href="/interview-prep-template" style={{ color: '#ccc', textDecoration: 'none' }}>Interview Prep Template</a></li>
              <li style={{ marginBottom: '10px' }}><a href="/blog" style={{ color: '#ccc', textDecoration: 'none' }}>Blog</a></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 style={{ fontSize: '16px', fontWeight: 600, marginBottom: '16px', color: '#fff' }}>Company</h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              <li style={{ marginBottom: '10px' }}><a href="/about" style={{ color: '#ccc', textDecoration: 'none' }}>About Us</a></li>
              <li style={{ marginBottom: '10px' }}><a href="/success-stories" style={{ color: '#ccc', textDecoration: 'none' }}>Success Stories</a></li>
              <li style={{ marginBottom: '10px' }}><a href="/employers" style={{ color: '#ccc', textDecoration: 'none' }}>Employers</a></li>
              <li style={{ marginBottom: '10px' }}><a href="/partnerships" style={{ color: '#ccc', textDecoration: 'none' }}>Partnerships</a></li>
              <li style={{ marginBottom: '10px' }}><a href="/press" style={{ color: '#ccc', textDecoration: 'none' }}>Press</a></li>
              <li style={{ marginBottom: '10px' }}><a href="/careers" style={{ color: '#ccc', textDecoration: 'none' }}>Careers</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 style={{ fontSize: '16px', fontWeight: 600, marginBottom: '16px', color: '#fff' }}>Contact</h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              <li style={{ marginBottom: '10px', color: '#ccc' }}>hello@pyrosolutions.com</li>
              <li style={{ marginBottom: '10px', color: '#ccc' }}>+1 (555) 123-4567</li>
              <li style={{ marginBottom: '10px', color: '#ccc' }}>123 Innovation Drive<br />San Francisco, CA 94105</li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div style={{ 
          borderTop: '1px solid #444', 
          paddingTop: '20px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '16px'
        }}>
          <p style={{ margin: 0, fontSize: '14px', color: '#999' }}>
            © 2025 Pyro Solutions Inc. All rights reserved.
          </p>
          <div style={{ display: 'flex', gap: '20px' }}>
            <a href="/privacy" style={{ fontSize: '14px', color: '#999', textDecoration: 'none' }}>Privacy Policy</a>
            <a href="/terms" style={{ fontSize: '14px', color: '#999', textDecoration: 'none' }}>Terms & Conditions</a>
          </div>
        </div>
      </footer>
    </div>
  );
}







