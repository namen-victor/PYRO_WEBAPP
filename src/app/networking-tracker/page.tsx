'use client';

import React, { useState } from 'react';
import { Navigation } from '@/components/Navigation';

export default function NetworkingTrackerPage() {
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [investmentLevel, setInvestmentLevel] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    setTimeout(() => {
      setSubmitted(true);
      setIsSubmitting(false);
      // In production, trigger download of the template
      alert('Thank you! Your networking tracker template will be sent to your email shortly.');
    }, 1000);
  };

  return (
    <div style={{ backgroundColor: '#ebebeb', minHeight: '100vh' }}>
      {/* Navigation */}
      <Navigation currentPage="networking-tracker" />

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
        {/* Left: Text & Form */}
        <div style={{ flex: '1 1 500px', minWidth: '300px' }}>
          <h1 style={{ 
            fontSize: '48px', 
            fontWeight: 700, 
            color: '#2e2e2e', 
            marginBottom: '16px',
            lineHeight: 1.2
          }}>
            PyroINC Networking Tracker
          </h1>
          
          <p style={{ 
            fontSize: '20px', 
            color: '#16a085', 
            marginBottom: '12px',
            fontWeight: 600,
            lineHeight: 1.4
          }}>
            Track your network to get the best referrals.
          </p>
          
          <p style={{ 
            fontSize: '16px', 
            color: '#555', 
            marginBottom: '32px',
            lineHeight: 1.6
          }}>
            Use this template to organize your networking outreach, track follow-ups, and secure valuable referrals—or work with our specialists to build your career.
          </p>

          {/* Email Sign-up Form */}
          {!submitted ? (
            <div style={{
              backgroundColor: '#fff',
              border: '2px solid #2e2e2e',
              borderRadius: '12px',
              padding: '32px',
              maxWidth: '500px'
            }}>
              <h3 style={{
                fontSize: '24px',
                fontWeight: 600,
                color: '#2e2e2e',
                marginBottom: '20px'
              }}>
                PyroINC
              </h3>
              <p style={{
                fontSize: '14px',
                color: '#666',
                marginBottom: '24px'
              }}>
                Just a few details before we send you our networking tracker template!
              </p>

              <form onSubmit={handleSubmit}>
                <div style={{ marginBottom: '16px' }}>
                  <label htmlFor="firstName" style={{
                    display: 'block',
                    fontSize: '14px',
                    fontWeight: 600,
                    color: '#2e2e2e',
                    marginBottom: '6px'
                  }}>
                    First Name*
                  </label>
                  <input
                    id="firstName"
                    type="text"
                    placeholder="Type your first name"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    required
                    aria-required="true"
                    style={{
                      width: '100%',
                      padding: '14px',
                      fontSize: '16px',
                      border: '1px solid #ccc',
                      borderRadius: '6px',
                      boxSizing: 'border-box'
                    }}
                  />
                </div>

                <div style={{ marginBottom: '16px' }}>
                  <label htmlFor="email" style={{
                    display: 'block',
                    fontSize: '14px',
                    fontWeight: 600,
                    color: '#2e2e2e',
                    marginBottom: '6px'
                  }}>
                    Email Address*
                  </label>
                  <input
                    id="email"
                    type="email"
                    placeholder="Type your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    aria-required="true"
                    style={{
                      width: '100%',
                      padding: '14px',
                      fontSize: '16px',
                      border: '1px solid #ccc',
                      borderRadius: '6px',
                      boxSizing: 'border-box'
                    }}
                  />
                </div>

                <div style={{ marginBottom: '24px' }}>
                  <label htmlFor="investment" style={{
                    display: 'block',
                    fontSize: '14px',
                    fontWeight: 600,
                    color: '#2e2e2e',
                    marginBottom: '6px'
                  }}>
                    Investment Interest
                  </label>
                  <select
                    id="investment"
                    value={investmentLevel}
                    onChange={(e) => setInvestmentLevel(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '14px',
                      fontSize: '16px',
                      border: '1px solid #ccc',
                      borderRadius: '6px',
                      boxSizing: 'border-box',
                      backgroundColor: '#fff',
                      color: investmentLevel ? '#2e2e2e' : '#999'
                    }}
                  >
                    <option value="" disabled>
                      Are you looking to invest at least $147 to land your dream job in the next 3 months?
                    </option>
                    <option value="yes">Yes</option>
                    <option value="no">No</option>
                    <option value="unsure">Unsure</option>
                  </select>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  style={{
                    width: '100%',
                    padding: '16px',
                    fontSize: '18px',
                    fontWeight: 600,
                    color: '#fff',
                    backgroundColor: '#16a085',
                    border: 'none',
                    borderRadius: '6px',
                    cursor: isSubmitting ? 'not-allowed' : 'pointer',
                    opacity: isSubmitting ? 0.7 : 1
                  }}
                >
                  {isSubmitting ? 'Submitting...' : 'Get Your Tracker'}
                </button>
              </form>
            </div>
          ) : (
            <div style={{
              backgroundColor: '#d4edda',
              border: '2px solid #28a745',
              borderRadius: '12px',
              padding: '32px',
              maxWidth: '500px'
            }}>
              <h3 style={{
                fontSize: '24px',
                fontWeight: 600,
                color: '#155724',
                marginBottom: '12px'
              }}>
                Thank You!
              </h3>
              <p style={{
                fontSize: '16px',
                color: '#155724',
                lineHeight: 1.6
              }}>
                Your networking tracker template will be sent to <strong>{email}</strong> shortly. Check your inbox!
              </p>
            </div>
          )}

          <p style={{
            fontSize: '13px',
            color: '#666',
            marginTop: '16px',
            lineHeight: 1.5
          }}>
            By providing your email address above, you agree to receive this resource via email. We may also reach out with information about our products and services. You can opt out at any time. See our{' '}
            <a href="/terms" style={{ color: '#16a085', textDecoration: 'underline' }}>
              Terms & Conditions
            </a>.
          </p>
        </div>

        {/* Right: Template Preview */}
        <div style={{ flex: '1 1 400px', minWidth: '300px', textAlign: 'center' }}>
          <div style={{
            backgroundColor: '#fff',
            border: '2px solid #ddd',
            borderRadius: '12px',
            padding: '20px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
            position: 'relative'
          }}>
            {/* Decorative Icons */}
            <div style={{
              position: 'absolute',
              top: '-20px',
              right: '20px',
              width: '60px',
              height: '60px',
              backgroundColor: '#16a085',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '28px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.15)'
            }}>
              🤝
            </div>

            <img
              src="/networking-tracker-preview.png"
              alt="PyroINC Networking Tracker template illustration"
              style={{
                width: '100%',
                height: 'auto',
                borderRadius: '8px'
              }}
              onError={(e) => {
                // Fallback if image doesn't exist
                (e.target as HTMLImageElement).style.display = 'none';
                (e.target as HTMLImageElement).parentElement!.innerHTML = `
                  <div style="padding: 40px 20px; background: #f9f9f9; border-radius: 8px;">
                    <div style="background: #fff; border: 2px solid #e2e2e2; border-radius: 8px; padding: 24px; margin-bottom: 20px;">
                      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px; padding-bottom: 12px; border-bottom: 2px solid #16a085;">
                        <div style="font-weight: 700; font-size: 14px; color: #2e2e2e;">NETWORKING TRACKER</div>
                        <div style="width: 40px; height: 40px; background: #16a085; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 20px;">🤝</div>
                      </div>
                      <div style="text-align: left; font-size: 11px; color: #666;">
                        <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 8px; margin-bottom: 8px; font-weight: 700; color: #2e2e2e;">
                          <div>Contact Name</div>
                          <div>Company</div>
                          <div>Status</div>
                        </div>
                        <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 8px; padding: 8px 0; border-top: 1px solid #e2e2e2;">
                          <div>John Smith</div>
                          <div>Google</div>
                          <div style="color: #16a085;">✓ Connected</div>
                        </div>
                        <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 8px; padding: 8px 0; border-top: 1px solid #e2e2e2;">
                          <div>Sarah Chen</div>
                          <div>Microsoft</div>
                          <div style="color: #ffa500;">⏱ Follow-up</div>
                        </div>
                        <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 8px; padding: 8px 0; border-top: 1px solid #e2e2e2;">
                          <div>Mike Johnson</div>
                          <div>Amazon</div>
                          <div style="color: #16a085;">✓ Referral</div>
                        </div>
                      </div>
                    </div>
                    <p style="color: #666; font-size: 14px; margin: 0;">Track contacts, follow-ups & referrals</p>
                  </div>
                `;
              }}
            />
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section style={{ 
        padding: '60px 5%', 
        maxWidth: '1200px', 
        margin: '0 auto'
      }}>
        <h2 style={{
          fontSize: '32px',
          fontWeight: 700,
          color: '#2e2e2e',
          textAlign: 'center',
          marginBottom: '40px'
        }}>
          Why Use a Networking Tracker?
        </h2>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '32px'
        }}>
          {/* Benefit 1 */}
          <div style={{
            backgroundColor: '#fff',
            padding: '32px',
            borderRadius: '12px',
            border: '2px solid #e2e2e2',
            textAlign: 'center'
          }}>
            <div style={{
              width: '70px',
              height: '70px',
              backgroundColor: '#d4f1e8',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 20px',
              fontSize: '32px'
            }}>
              📊
            </div>
            <h3 style={{
              fontSize: '20px',
              fontWeight: 600,
              color: '#2e2e2e',
              marginBottom: '12px'
            }}>
              Stay Organized
            </h3>
            <p style={{
              fontSize: '15px',
              color: '#555',
              lineHeight: 1.6
            }}>
              Keep all your professional contacts, conversations, and follow-ups in one place. Never miss an opportunity to reconnect.
            </p>
          </div>

          {/* Benefit 2 */}
          <div style={{
            backgroundColor: '#fff',
            padding: '32px',
            borderRadius: '12px',
            border: '2px solid #e2e2e2',
            textAlign: 'center'
          }}>
            <div style={{
              width: '70px',
              height: '70px',
              backgroundColor: '#d4f1e8',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 20px',
              fontSize: '32px'
            }}>
              🎯
            </div>
            <h3 style={{
              fontSize: '20px',
              fontWeight: 600,
              color: '#2e2e2e',
              marginBottom: '12px'
            }}>
              Track Progress
            </h3>
            <p style={{
              fontSize: '15px',
              color: '#555',
              lineHeight: 1.6
            }}>
              Monitor your networking efforts and see which connections are most valuable. Identify patterns that lead to referrals and interviews.
            </p>
          </div>

          {/* Benefit 3 */}
          <div style={{
            backgroundColor: '#fff',
            padding: '32px',
            borderRadius: '12px',
            border: '2px solid #e2e2e2',
            textAlign: 'center'
          }}>
            <div style={{
              width: '70px',
              height: '70px',
              backgroundColor: '#d4f1e8',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 20px',
              fontSize: '32px'
            }}>
              🚀
            </div>
            <h3 style={{
              fontSize: '20px',
              fontWeight: 600,
              color: '#2e2e2e',
              marginBottom: '12px'
            }}>
              Get Referrals
            </h3>
            <p style={{
              fontSize: '15px',
              color: '#555',
              lineHeight: 1.6
            }}>
              Build meaningful relationships that lead to job referrals. Our tracker helps you nurture connections strategically.
            </p>
          </div>
        </div>
      </section>

      {/* Cross-sell Section */}
      <section style={{ 
        padding: '60px 5%', 
        maxWidth: '900px', 
        margin: '0 auto',
        textAlign: 'center'
      }}>
        <div style={{
          backgroundColor: '#fff',
          border: '2px solid #16a085',
          borderRadius: '12px',
          padding: '40px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.08)'
        }}>
          <h3 style={{
            fontSize: '28px',
            fontWeight: 600,
            color: '#2e2e2e',
            marginBottom: '16px'
          }}>
            Want Expert Guidance?
          </h3>
          <p style={{
            fontSize: '16px',
            color: '#555',
            lineHeight: 1.6,
            marginBottom: '24px'
          }}>
            While our networking tracker is a powerful tool, our specialists can help you build a comprehensive networking strategy tailored to your target industry and career goals.
          </p>
          <a
            href="/job-search-strategies"
            style={{
              display: 'inline-block',
              padding: '14px 32px',
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
            Explore Job Search Strategies →
          </a>
        </div>
      </section>

      {/* More Resources Section */}
      <section style={{ 
        padding: '80px 5%', 
        maxWidth: '1200px', 
        margin: '0 auto',
        textAlign: 'center'
      }}>
        <h2 style={{
          fontSize: '36px',
          fontWeight: 700,
          color: '#2e2e2e',
          marginBottom: '16px'
        }}>
          More Free Resources
        </h2>
        <p style={{
          fontSize: '18px',
          color: '#555',
          marginBottom: '40px'
        }}>
          Explore our other free tools and templates to accelerate your job search.
        </p>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '24px',
          marginBottom: '40px'
        }}>
          <a href="/resume-template" style={{
            display: 'block',
            backgroundColor: '#fff',
            border: '2px solid #ddd',
            borderRadius: '12px',
            padding: '24px',
            textDecoration: 'none',
            transition: 'all 0.3s ease'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = '#16a085';
            e.currentTarget.style.transform = 'translateY(-4px)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = '#ddd';
            e.currentTarget.style.transform = 'translateY(0)';
          }}>
            <h3 style={{
              fontSize: '20px',
              fontWeight: 600,
              color: '#2e2e2e',
              marginBottom: '8px'
            }}>
              Résumé Template
            </h3>
            <p style={{
              fontSize: '15px',
              color: '#666',
              lineHeight: 1.5
            }}>
              Download our ATS-friendly résumé template.
            </p>
          </a>

          <a href="/cover-letter-template" style={{
            display: 'block',
            backgroundColor: '#fff',
            border: '2px solid #ddd',
            borderRadius: '12px',
            padding: '24px',
            textDecoration: 'none',
            transition: 'all 0.3s ease'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = '#16a085';
            e.currentTarget.style.transform = 'translateY(-4px)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = '#ddd';
            e.currentTarget.style.transform = 'translateY(0)';
          }}>
            <h3 style={{
              fontSize: '20px',
              fontWeight: 600,
              color: '#2e2e2e',
              marginBottom: '8px'
            }}>
              Cover Letter Template
            </h3>
            <p style={{
              fontSize: '15px',
              color: '#666',
              lineHeight: 1.5
            }}>
              Craft compelling cover letters that stand out.
            </p>
          </a>

          <a href="/free-resume-feedback" style={{
            display: 'block',
            backgroundColor: '#fff',
            border: '2px solid #ddd',
            borderRadius: '12px',
            padding: '24px',
            textDecoration: 'none',
            transition: 'all 0.3s ease'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = '#16a085';
            e.currentTarget.style.transform = 'translateY(-4px)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = '#ddd';
            e.currentTarget.style.transform = 'translateY(0)';
          }}>
            <h3 style={{
              fontSize: '20px',
              fontWeight: 600,
              color: '#2e2e2e',
              marginBottom: '8px'
            }}>
              Free Résumé Feedback
            </h3>
            <p style={{
              fontSize: '15px',
              color: '#666',
              lineHeight: 1.5
            }}>
              Get expert feedback on your résumé for free.
            </p>
          </a>

          <a href="/interview-prep-template" style={{
            display: 'block',
            backgroundColor: '#fff',
            border: '2px solid #ddd',
            borderRadius: '12px',
            padding: '24px',
            textDecoration: 'none',
            transition: 'all 0.3s ease'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = '#16a085';
            e.currentTarget.style.transform = 'translateY(-4px)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = '#ddd';
            e.currentTarget.style.transform = 'translateY(0)';
          }}>
            <h3 style={{
              fontSize: '20px',
              fontWeight: 600,
              color: '#2e2e2e',
              marginBottom: '8px'
            }}>
              Interview Prep Template
            </h3>
            <p style={{
              fontSize: '15px',
              color: '#666',
              lineHeight: 1.5
            }}>
              Prepare for interviews with our structured template.
            </p>
          </a>
        </div>

        <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <a
            href="/resources"
            style={{
              display: 'inline-block',
              padding: '14px 32px',
              fontSize: '16px',
              fontWeight: 600,
              color: '#2e2e2e',
              backgroundColor: '#fff',
              border: '2px solid #2e2e2e',
              borderRadius: '8px',
              textDecoration: 'none',
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#2e2e2e';
              e.currentTarget.style.color = '#fff';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = '#fff';
              e.currentTarget.style.color = '#2e2e2e';
            }}
          >
            ← Back to Resource Library
          </a>

          <a
            href="/resources"
            style={{
              display: 'inline-block',
              padding: '14px 32px',
              fontSize: '16px',
              fontWeight: 600,
              color: '#fff',
              backgroundColor: '#16a085',
              border: '2px solid #16a085',
              borderRadius: '8px',
              textDecoration: 'none',
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#138f75';
              e.currentTarget.style.borderColor = '#138f75';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = '#16a085';
              e.currentTarget.style.borderColor = '#16a085';
            }}
          >
            Explore More Resources
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
              <li style={{ marginBottom: '10px' }}><a href="/free-resume-feedback" style={{ color: '#ccc', textDecoration: 'none' }}>Free Résumé Feedback</a></li>
              <li style={{ marginBottom: '10px' }}><a href="/networking-tracker" style={{ color: '#16a085', textDecoration: 'none', fontWeight: 600 }}>Networking Tracker</a></li>
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














