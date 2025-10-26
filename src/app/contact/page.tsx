'use client';

import React, { useState, useEffect } from 'react';
import { Navigation } from '@/components/Navigation';
import { getFunctions, httpsCallable } from 'firebase/functions';
import { app } from '@/lib/firebase';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [userTimezone, setUserTimezone] = useState<string>('');
  const [businessHours, setBusinessHours] = useState<string[]>([]);

  useEffect(() => {
    // Detect user's timezone
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    setUserTimezone(timezone);
    
    // Define Toronto business hours (EST/EDT - America/Toronto)
    const torontoHours = [
      { day: 'Monday - Friday', start: '09:00', end: '18:00' },
      { day: 'Saturday', start: '10:00', end: '16:00' },
      { day: 'Sunday', start: null, end: null } // Closed
    ];
    
    const convertedHours = torontoHours.map(schedule => {
      if (!schedule.start) {
        return `${schedule.day}: Closed`;
      }
      
      // Create Date objects in Toronto timezone
      // Using a Monday in January to ensure consistent timezone handling
      const startDate = new Date(`2025-01-06T${schedule.start}:00-05:00`); // EST offset
      const endDate = new Date(`2025-01-06T${schedule.end}:00-05:00`);
      
      // Format in user's timezone
      const formatter = new Intl.DateTimeFormat('en-US', {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true,
        timeZone: timezone
      });
      
      const startTime = formatter.format(startDate);
      const endTime = formatter.format(endDate);
      
      return `${schedule.day}: ${startTime} - ${endTime}`;
    });
    
    setBusinessHours(convertedHours);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const functions = getFunctions(app);
      const sendContactEmail = httpsCallable(functions, 'sendContactEmail');
      
      const result = await sendContactEmail({
        name: formData.name,
        email: formData.email,
        subject: formData.subject,
        message: formData.message
      });

      console.log('Email sent successfully:', result);
      setSubmitted(true);
      setFormData({ name: '', email: '', subject: '', message: '' });
      
      // Reset success message after 5 seconds
      setTimeout(() => {
        setSubmitted(false);
      }, 5000);
    } catch (err: any) {
      console.error('Error sending email:', err);
      setError(err.message || 'Failed to send message. Please try again or email us directly at pyrosolutionsinc@gmail.com');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div style={{ backgroundColor: '#ebebeb', minHeight: '100vh' }}>
      {/* Navigation */}
      <Navigation currentPage="contact" />

      {/* Hero Section */}
      <section style={{ 
        padding: '80px 5%', 
        maxWidth: '1200px', 
        margin: '0 auto',
        textAlign: 'center'
      }}>
        <h1 style={{ 
          fontSize: '56px', 
          fontWeight: 700, 
          color: '#2e2e2e', 
          marginBottom: '24px',
          lineHeight: 1.2
        }}>
          Get in Touch
        </h1>
        
        <p style={{ 
          fontSize: '20px', 
          color: '#555', 
          marginBottom: '48px',
          lineHeight: 1.6,
          maxWidth: '800px',
          margin: '0 auto'
        }}>
          Have questions about our services? Want to learn more about how PyroINC can help you land your dream job? We're here to help!
        </p>
      </section>

      {/* Contact Content */}
      <section style={{
        padding: '0 5% 80px',
        maxWidth: '1200px',
        margin: '0 auto',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
        gap: '40px'
      }}>
        {/* Contact Form */}
        <div style={{
          backgroundColor: '#fff',
          borderRadius: '16px',
          padding: '40px',
          boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
        }}>
          <h2 style={{
            fontSize: '28px',
            fontWeight: 700,
            color: '#2e2e2e',
            marginBottom: '24px'
          }}>
            Send Us a Message
          </h2>

          {error && (
            <div style={{
              padding: '16px',
              marginBottom: '20px',
              backgroundColor: '#fee',
              border: '1px solid #fcc',
              borderRadius: '8px',
              color: '#c33'
            }}>
              <strong>Error:</strong> {error}
            </div>
          )}

          {submitted ? (
            <div style={{
              padding: '32px',
              backgroundColor: '#d4f1e8',
              borderRadius: '12px',
              textAlign: 'center'
            }}>
              <div style={{
                fontSize: '48px',
                marginBottom: '16px'
              }}>
                ✓
              </div>
              <h3 style={{
                fontSize: '24px',
                fontWeight: 700,
                color: '#16a085',
                marginBottom: '8px'
              }}>
                Message Sent!
              </h3>
              <p style={{
                fontSize: '16px',
                color: '#555'
              }}>
                We'll get back to you within 24 hours.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <div style={{ marginBottom: '20px' }}>
                <label style={{
                  display: 'block',
                  fontSize: '14px',
                  fontWeight: 600,
                  color: '#2e2e2e',
                  marginBottom: '8px'
                }}>
                  Full Name *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  style={{
                    width: '100%',
                    padding: '12px',
                    fontSize: '16px',
                    border: '2px solid #ddd',
                    borderRadius: '8px',
                    boxSizing: 'border-box',
                    transition: 'border-color 0.3s ease'
                  }}
                  onFocus={(e) => e.currentTarget.style.borderColor = '#16a085'}
                  onBlur={(e) => e.currentTarget.style.borderColor = '#ddd'}
                />
              </div>

              <div style={{ marginBottom: '20px' }}>
                <label style={{
                  display: 'block',
                  fontSize: '14px',
                  fontWeight: 600,
                  color: '#2e2e2e',
                  marginBottom: '8px'
                }}>
                  Email Address *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  style={{
                    width: '100%',
                    padding: '12px',
                    fontSize: '16px',
                    border: '2px solid #ddd',
                    borderRadius: '8px',
                    boxSizing: 'border-box',
                    transition: 'border-color 0.3s ease'
                  }}
                  onFocus={(e) => e.currentTarget.style.borderColor = '#16a085'}
                  onBlur={(e) => e.currentTarget.style.borderColor = '#ddd'}
                />
              </div>

              <div style={{ marginBottom: '20px' }}>
                <label style={{
                  display: 'block',
                  fontSize: '14px',
                  fontWeight: 600,
                  color: '#2e2e2e',
                  marginBottom: '8px'
                }}>
                  Subject *
                </label>
                <select
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  style={{
                    width: '100%',
                    padding: '12px',
                    fontSize: '16px',
                    border: '2px solid #ddd',
                    borderRadius: '8px',
                    boxSizing: 'border-box',
                    backgroundColor: '#fff',
                    cursor: 'pointer',
                    transition: 'border-color 0.3s ease'
                  }}
                  onFocus={(e) => e.currentTarget.style.borderColor = '#16a085'}
                  onBlur={(e) => e.currentTarget.style.borderColor = '#ddd'}
                >
                  <option value="">Select a subject...</option>
                  <option value="services">Questions about Services</option>
                  <option value="pricing">Pricing & Payment Plans</option>
                  <option value="guarantee">Job Offer Guarantee</option>
                  <option value="technical">Technical Support</option>
                  <option value="partnership">Partnership Opportunities</option>
                  <option value="press">Press & Media Inquiries</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div style={{ marginBottom: '24px' }}>
                <label style={{
                  display: 'block',
                  fontSize: '14px',
                  fontWeight: 600,
                  color: '#2e2e2e',
                  marginBottom: '8px'
                }}>
                  Message *
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={6}
                  style={{
                    width: '100%',
                    padding: '12px',
                    fontSize: '16px',
                    border: '2px solid #ddd',
                    borderRadius: '8px',
                    boxSizing: 'border-box',
                    resize: 'vertical',
                    fontFamily: 'inherit',
                    transition: 'border-color 0.3s ease'
                  }}
                  onFocus={(e) => e.currentTarget.style.borderColor = '#16a085'}
                  onBlur={(e) => e.currentTarget.style.borderColor = '#ddd'}
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                style={{
                  width: '100%',
                  padding: '16px',
                  fontSize: '16px',
                  fontWeight: 600,
                  color: '#fff',
                  backgroundColor: loading ? '#999' : '#16a085',
                  border: 'none',
                  borderRadius: '8px',
                  cursor: loading ? 'not-allowed' : 'pointer',
                  transition: 'all 0.3s ease',
                  opacity: loading ? 0.7 : 1
                }}
                onMouseEnter={(e) => {
                  if (!loading) {
                    e.currentTarget.style.backgroundColor = '#138f75';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!loading) {
                    e.currentTarget.style.backgroundColor = '#16a085';
                  }
                }}
              >
                {loading ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          )}
        </div>

        {/* Contact Information */}
        <div>
          {/* Contact Details Card */}
          <div style={{
            backgroundColor: '#fff',
            borderRadius: '16px',
            padding: '40px',
            marginBottom: '24px',
            boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
          }}>
            <h2 style={{
              fontSize: '28px',
              fontWeight: 700,
              color: '#2e2e2e',
              marginBottom: '24px'
            }}>
              Contact Information
            </h2>

            <div style={{ marginBottom: '24px' }}>
              <div style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: '16px',
                marginBottom: '20px'
              }}>
                <div style={{
                  width: '48px',
                  height: '48px',
                  backgroundColor: '#d4f1e8',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '24px',
                  flexShrink: 0
                }}>
                  📧
                </div>
                <div>
                  <h3 style={{
                    fontSize: '16px',
                    fontWeight: 600,
                    color: '#2e2e2e',
                    marginBottom: '4px'
                  }}>
                    Email
                  </h3>
                  <a href="mailto:pyrosolutionsinc@gmail.com" style={{
                    fontSize: '16px',
                    color: '#16a085',
                    textDecoration: 'none'
                  }}>
                    pyrosolutionsinc@gmail.com
                  </a>
                </div>
              </div>

              <div style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: '16px',
                marginBottom: '20px'
              }}>
                <div style={{
                  width: '48px',
                  height: '48px',
                  backgroundColor: '#d4f1e8',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '24px',
                  flexShrink: 0
                }}>
                  📞
                </div>
                <div>
                  <h3 style={{
                    fontSize: '16px',
                    fontWeight: 600,
                    color: '#2e2e2e',
                    marginBottom: '4px'
                  }}>
                    Phone
                  </h3>
                  <a href="tel:+19053415055" style={{
                    fontSize: '16px',
                    color: '#16a085',
                    textDecoration: 'none'
                  }}>
                    +1 (905) 341-5055
                  </a>
                </div>
              </div>

              <div style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: '16px'
              }}>
                <div style={{
                  width: '48px',
                  height: '48px',
                  backgroundColor: '#d4f1e8',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '24px',
                  flexShrink: 0
                }}>
                  📍
                </div>
                <div>
                  <h3 style={{
                    fontSize: '16px',
                    fontWeight: 600,
                    color: '#2e2e2e',
                    marginBottom: '4px'
                  }}>
                    Address
                  </h3>
                  <p style={{
                    fontSize: '16px',
                    color: '#555',
                    lineHeight: 1.6,
                    margin: 0
                  }}>
                    Toronto Canada.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Business Hours Card */}
          <div style={{
            backgroundColor: '#fff',
            borderRadius: '16px',
            padding: '40px',
            marginBottom: '24px',
            boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
          }}>
            <h3 style={{
              fontSize: '20px',
              fontWeight: 700,
              color: '#2e2e2e',
              marginBottom: '16px'
            }}>
              Business Hours
            </h3>
            <p style={{
              fontSize: '16px',
              color: '#555',
              lineHeight: 1.8,
              margin: 0
            }}>
              {businessHours.length > 0 ? (
                businessHours.map((hours, index) => (
                  <React.Fragment key={index}>
                    {hours}
                    {index < businessHours.length - 1 && <br />}
                  </React.Fragment>
                ))
              ) : (
                <>
                  Monday - Friday: 9:00 AM - 6:00 PM EST<br />
                  Saturday: 10:00 AM - 4:00 PM EST<br />
                  Sunday: Closed
                </>
              )}
            </p>
            {userTimezone && (
              <p style={{
                fontSize: '13px',
                color: '#16a085',
                marginTop: '12px',
                fontStyle: 'italic',
                fontWeight: 600
              }}>
                Times shown in your timezone: {userTimezone.replace(/_/g, ' ')}
              </p>
            )}
            <p style={{
              fontSize: '14px',
              color: '#999',
              marginTop: '16px',
              fontStyle: 'italic'
            }}>
              We typically respond within 24 hours during business days.
            </p>
          </div>

          {/* Quick Links Card */}
          <div style={{
            backgroundColor: '#d4f1e8',
            borderRadius: '16px',
            padding: '32px',
            textAlign: 'center'
          }}>
            <h3 style={{
              fontSize: '20px',
              fontWeight: 700,
              color: '#2e2e2e',
              marginBottom: '16px'
            }}>
              Ready to Get Started?
            </h3>
            <p style={{
              fontSize: '16px',
              color: '#555',
              marginBottom: '24px'
            }}>
              Book a free consultation to discuss your career goals.
            </p>
            <a
              href="/guarantee"
              style={{
                display: 'inline-block',
                padding: '14px 28px',
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
              Book Free Consultation
            </a>
          </div>
        </div>
      </section>

      {/* FAQ Link Section */}
      <section style={{
        padding: '60px 5%',
        maxWidth: '1000px',
        margin: '0 auto',
        textAlign: 'center'
      }}>
        <div style={{
          backgroundColor: '#fff',
          borderRadius: '16px',
          padding: '48px 32px',
          boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
        }}>
          <h2 style={{
            fontSize: '28px',
            fontWeight: 700,
            color: '#2e2e2e',
            marginBottom: '16px'
          }}>
            Looking for Quick Answers?
          </h2>
          <p style={{
            fontSize: '18px',
            color: '#555',
            marginBottom: '24px'
          }}>
            Check out our FAQ page for answers to common questions about services, pricing, and more.
          </p>
          <a
            href="/faq"
            style={{
              display: 'inline-block',
              padding: '14px 28px',
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
            Visit FAQ Page
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
              <li style={{ marginBottom: '10px' }}><a href="/full-service-apply" style={{ color: '#ccc', textDecoration: 'none' }}>Full-Service Apply</a></li>
              <li style={{ marginBottom: '10px' }}><a href="/interview-prep" style={{ color: '#ccc', textDecoration: 'none' }}>Interview Prep</a></li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 style={{ fontSize: '16px', fontWeight: 600, marginBottom: '16px', color: '#fff' }}>Resources</h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              <li style={{ marginBottom: '10px' }}><a href="/resources" style={{ color: '#ccc', textDecoration: 'none' }}>Resource Library</a></li>
              <li style={{ marginBottom: '10px' }}><a href="/job-search-hub" style={{ color: '#ccc', textDecoration: 'none' }}>Job Search Hub</a></li>
              <li style={{ marginBottom: '10px' }}><a href="/blog" style={{ color: '#ccc', textDecoration: 'none' }}>Blog</a></li>
              <li style={{ marginBottom: '10px' }}><a href="/faq" style={{ color: '#ccc', textDecoration: 'none' }}>FAQ</a></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 style={{ fontSize: '16px', fontWeight: 600, marginBottom: '16px', color: '#fff' }}>Company</h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              <li style={{ marginBottom: '10px' }}><a href="/about" style={{ color: '#ccc', textDecoration: 'none' }}>About Us</a></li>
              <li style={{ marginBottom: '10px' }}><a href="/success-stories" style={{ color: '#ccc', textDecoration: 'none' }}>Success Stories</a></li>
              <li style={{ marginBottom: '10px' }}><a href="/careers" style={{ color: '#ccc', textDecoration: 'none' }}>Careers</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 style={{ fontSize: '16px', fontWeight: 600, marginBottom: '16px', color: '#fff' }}>Contact</h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              <li style={{ marginBottom: '10px' }}><a href="/contact" style={{ color: '#16a085', textDecoration: 'none', fontWeight: 600 }}>Contact Us</a></li>
              <li style={{ marginBottom: '10px', color: '#ccc' }}>pyrosolutionsinc@gmail.com</li>
              <li style={{ marginBottom: '10px', color: '#ccc' }}>+1 (905) 341-5055</li>
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







