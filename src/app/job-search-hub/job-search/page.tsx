'use client';

import React, { useState } from 'react';
import { Navigation } from '@/components/Navigation';

export default function JobSearchHubJobSearchPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [email, setEmail] = useState('');

  const jobSearchPosts = [
    {
      title: 'Everything You Need to Know to Run an Effective Job Search',
      excerpt: 'Master the fundamentals of job searching with proven strategies that work. Learn how to organize your search, track applications, and stay motivated throughout the process.',
      date: 'September 15, 2025',
      readTime: '12 min read',
      badge: 'Most Popular',
      link: '#'
    },
    {
      title: 'How to Follow Up After Applying: Email Templates That Get Responses',
      excerpt: 'Following up can double your response rate. Learn when and how to follow up with hiring managers using our proven email templates.',
      date: 'August 20, 2025',
      readTime: '8 min read',
      badge: null,
      link: '#'
    },
    {
      title: 'AI Jobs: How to Position Yourself for the Future of Work',
      excerpt: 'The AI revolution is creating new opportunities. Discover how to pivot into AI-related roles and what skills employers are looking for.',
      date: 'July 30, 2025',
      readTime: '10 min read',
      badge: 'Most Popular',
      link: '#'
    },
    {
      title: 'Career Change Guide: How to Successfully Transition to a New Industry',
      excerpt: 'Changing careers can be daunting. This comprehensive guide walks you through identifying transferable skills, networking strategically, and positioning yourself for success.',
      date: 'June 25, 2025',
      readTime: '15 min read',
      badge: null,
      link: '#'
    },
    {
      title: 'Working Abroad: A Complete Guide to International Job Searches',
      excerpt: 'Dream of working overseas? Learn how to navigate visa requirements, target international employers, and adapt your materials for global markets.',
      date: 'May 18, 2025',
      readTime: '14 min read',
      badge: null,
      link: '#'
    }
  ];

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Thank you for subscribing with ${email}!`);
    setEmail('');
  };

  return (
    <div style={{ backgroundColor: '#ebebeb', minHeight: '100vh' }}>
      {/* Navigation */}
      <Navigation currentPage="job-search-hub" />

      {/* Hero Section with Breadcrumb */}
      <section style={{ 
        padding: '80px 5%', 
        maxWidth: '1400px', 
        margin: '0 auto'
      }}>
        <div style={{
          fontSize: '14px',
          fontWeight: 700,
          letterSpacing: '0.1em',
          color: '#666',
          marginBottom: '16px'
        }}>
          JOB SEARCH HUB: JOB SEARCH
        </div>
        
        <h1 style={{ 
          fontSize: '48px', 
          fontWeight: 700, 
          color: '#2e2e2e', 
          marginBottom: '16px',
          lineHeight: 1.2,
          maxWidth: '800px'
        }}>
          Everything You Need to Know to Run an Effective Job Search
        </h1>

        <p style={{
          fontSize: '18px',
          color: '#555',
          lineHeight: 1.6,
          maxWidth: '700px',
          marginBottom: '24px'
        }}>
          Master proven job search strategies, stay organized, and land interviews faster with expert guidance and actionable tips.
        </p>

        {/* Breadcrumb */}
        <div style={{
          fontSize: '15px',
          color: '#555',
          marginTop: '24px'
        }}>
          <a href="/job-search-hub" style={{ color: '#16a085', textDecoration: 'none', fontWeight: 600 }}>
            Job Search Hub
          </a>
          <span style={{ margin: '0 8px', color: '#999' }}>›</span>
          <span style={{ color: '#2e2e2e', fontWeight: 600 }}>Job Search</span>
        </div>
      </section>

      {/* Main Content Area */}
      <section style={{
        padding: '0 5% 80px',
        maxWidth: '1400px',
        margin: '0 auto',
        display: 'flex',
        gap: '40px',
        flexWrap: 'wrap'
      }}>
        {/* Left Sidebar: Menu & Search */}
        <div style={{ flex: '0 0 250px', minWidth: '250px' }}>
          <div style={{
            backgroundColor: '#fff',
            borderRadius: '12px',
            padding: '24px',
            position: 'sticky',
            top: '20px'
          }}>
            <h3 style={{
              fontSize: '18px',
              fontWeight: 700,
              color: '#2e2e2e',
              marginBottom: '20px'
            }}>
              Menu
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '24px' }}>
              {[
                { id: 'home', label: 'Home', link: '/job-search-hub' },
                { id: 'careers', label: 'Careers', link: '/job-search-hub#careers' },
                { id: 'step1', label: 'Step 1: Resume', link: '/job-search-hub/resume' },
                { id: 'step2', label: 'Step 2: Cover Letter', link: '/job-search-hub/cover-letter' },
                { id: 'step3', label: 'Step 3: Job Search', link: '/job-search-hub/job-search' },
                { id: 'step4', label: 'Step 4: Applying to Jobs', link: '/job-search-hub/applying' },
                { id: 'step5', label: 'Step 5: Networking', link: '/job-search-hub/networking' },
                { id: 'step6', label: 'Step 6: Interview', link: '/job-search-hub/interview' }
              ].map((item) => (
                <a
                  key={item.id}
                  href={item.link}
                  style={{
                    padding: '12px 16px',
                    fontSize: '15px',
                    fontWeight: 600,
                    color: item.id === 'step3' ? '#fff' : '#2e2e2e',
                    backgroundColor: item.id === 'step3' ? '#16a085' : 'transparent',
                    border: 'none',
                    borderRadius: '8px',
                    textAlign: 'left',
                    textDecoration: 'none',
                    display: 'block',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseEnter={(e) => {
                    if (item.id !== 'step3') {
                      e.currentTarget.style.backgroundColor = '#f5f5f5';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (item.id !== 'step3') {
                      e.currentTarget.style.backgroundColor = 'transparent';
                    }
                  }}
                >
                  {item.label}
                </a>
              ))}
            </div>

            <div>
              <h4 style={{
                fontSize: '16px',
                fontWeight: 700,
                color: '#2e2e2e',
                marginBottom: '12px'
              }}>
                Search
              </h4>
              <input
                type="text"
                placeholder="Search by topic, keyword, or title..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{
                  width: '100%',
                  padding: '12px',
                  fontSize: '14px',
                  border: '1px solid #ccc',
                  borderRadius: '6px',
                  boxSizing: 'border-box'
                }}
              />
            </div>
          </div>
        </div>

        {/* Right: Posts Grid */}
        <div style={{ flex: '1 1 800px' }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
            gap: '32px'
          }}>
            {jobSearchPosts.map((post, index) => (
              <div
                key={index}
                style={{
                  backgroundColor: '#d4f1e8',
                  borderRadius: '12px',
                  overflow: 'hidden',
                  position: 'relative',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-4px)';
                  e.currentTarget.style.boxShadow = '0 8px 20px rgba(0,0,0,0.1)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                {/* Badge */}
                {post.badge && (
                  <div style={{
                    position: 'absolute',
                    top: '16px',
                    right: '16px',
                    backgroundColor: '#16a085',
                    color: '#fff',
                    padding: '6px 12px',
                    borderRadius: '6px',
                    fontSize: '12px',
                    fontWeight: 700,
                    zIndex: 1
                  }}>
                    {post.badge}
                  </div>
                )}

                {/* Image Placeholder */}
                <div style={{
                  width: '100%',
                  height: '200px',
                  backgroundColor: '#a8dfd0',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '48px'
                }}>
                  🔍
                </div>

                {/* Content */}
                <div style={{ padding: '24px', backgroundColor: '#fff' }}>
                  <div style={{
                    fontSize: '13px',
                    color: '#666',
                    marginBottom: '8px',
                    fontWeight: 600
                  }}>
                    {post.readTime}
                  </div>

                  <h3 style={{
                    fontSize: '20px',
                    fontWeight: 700,
                    color: '#2e2e2e',
                    marginBottom: '12px',
                    lineHeight: 1.3
                  }}>
                    {post.title}
                  </h3>

                  <p style={{
                    fontSize: '15px',
                    color: '#555',
                    lineHeight: 1.6,
                    marginBottom: '16px'
                  }}>
                    {post.excerpt}
                  </p>

                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                  }}>
                    <a
                      href={post.link}
                      style={{
                        fontSize: '15px',
                        fontWeight: 600,
                        color: '#16a085',
                        textDecoration: 'none'
                      }}
                    >
                      Read more →
                    </a>
                    <span style={{
                      fontSize: '13px',
                      color: '#999'
                    }}>
                      {post.date}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Cross-sell to Job Search Strategies */}
          <div style={{
            marginTop: '48px',
            backgroundColor: '#fff',
            borderRadius: '12px',
            padding: '32px',
            border: '2px solid #16a085'
          }}>
            <h3 style={{
              fontSize: '24px',
              fontWeight: 700,
              color: '#2e2e2e',
              marginBottom: '16px'
            }}>
              Need a personalized job search strategy?
            </h3>
            <p style={{
              fontSize: '16px',
              color: '#555',
              lineHeight: 1.6,
              marginBottom: '24px'
            }}>
              Our Job Search Strategies service provides you with a custom roadmap tailored to your goals, experience, and target roles. Get expert guidance on where to apply, how to network, and when to follow up.
            </p>
            <div style={{
              display: 'flex',
              gap: '16px',
              flexWrap: 'wrap'
            }}>
              <a
                href="/job-search-strategies"
                style={{
                  padding: '14px 28px',
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
                Get Your Custom Strategy
              </a>
              <a
                href="/guarantee"
                style={{
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
                View Job Offer Guarantee
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section style={{
        padding: '80px 5%',
        maxWidth: '1200px',
        margin: '0 auto'
      }}>
        <div style={{
          backgroundColor: '#d4f1e8',
          borderRadius: '16px',
          padding: '60px 40px',
          display: 'flex',
          alignItems: 'center',
          gap: '60px',
          flexWrap: 'wrap'
        }}>
          {/* Left: Person Image */}
          <div style={{
            width: '150px',
            height: '150px',
            borderRadius: '50%',
            backgroundColor: '#fff',
            flexShrink: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '64px',
            border: '4px solid #16a085'
          }}>
            👨‍💼
          </div>

          {/* Center: Content */}
          <div style={{ flex: '1 1 400px' }}>
            <h2 style={{
              fontSize: '32px',
              fontWeight: 700,
              color: '#2e2e2e',
              marginBottom: '16px'
            }}>
              Subscribe to our newsletter
            </h2>
            <p style={{
              fontSize: '16px',
              color: '#555',
              marginBottom: '20px',
              lineHeight: 1.6
            }}>
              Our weekly newsletter is perfect for you if:
            </p>
            <ul style={{
              fontSize: '15px',
              color: '#555',
              lineHeight: 1.8,
              paddingLeft: '20px',
              marginBottom: '24px'
            }}>
              <li>You're looking for a job and value new tips and strategies</li>
              <li>You want to grow within your career</li>
              <li>You value industry insights and job trends</li>
            </ul>

            <form onSubmit={handleNewsletterSubmit} style={{
              display: 'flex',
              gap: '12px',
              maxWidth: '500px'
            }}>
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                style={{
                  flex: 1,
                  padding: '14px',
                  fontSize: '16px',
                  border: '1px solid #ccc',
                  borderRadius: '6px',
                  backgroundColor: '#fff'
                }}
              />
              <button
                type="submit"
                style={{
                  padding: '14px 28px',
                  fontSize: '16px',
                  fontWeight: 600,
                  color: '#fff',
                  backgroundColor: '#16a085',
                  border: 'none',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#138f75';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = '#16a085';
                }}
              >
                Subscribe
              </button>
            </form>
          </div>

          {/* Right: Person Image */}
          <div style={{
            width: '150px',
            height: '150px',
            borderRadius: '50%',
            backgroundColor: '#fff',
            flexShrink: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '64px',
            border: '4px solid #16a085'
          }}>
            👩‍💼
          </div>
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
            <h4 style={{ fontSize: '16px', fontWeight: 600, marginBottom: '16px', color: '#fff' }}>PRODUCTS</h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              <li style={{ marginBottom: '10px' }}><a href="#" style={{ color: '#ccc', textDecoration: 'none' }}>Services</a></li>
              <li style={{ marginBottom: '10px' }}><a href="#" style={{ color: '#ccc', textDecoration: 'none' }}>Client Portal</a></li>
              <li style={{ marginBottom: '10px' }}><a href="#" style={{ color: '#ccc', textDecoration: 'none' }}>PyroAI</a></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 style={{ fontSize: '16px', fontWeight: 600, marginBottom: '16px', color: '#fff' }}>SERVICES</h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              <li style={{ marginBottom: '10px' }}><a href="/guarantee" style={{ color: '#ccc', textDecoration: 'none' }}>Job Offer Guarantee</a></li>
              <li style={{ marginBottom: '10px' }}><a href="/career-consulting" style={{ color: '#ccc', textDecoration: 'none' }}>Career Consulting</a></li>
              <li style={{ marginBottom: '10px' }}><a href="/job-search-strategies" style={{ color: '#ccc', textDecoration: 'none' }}>Job Search Strategies</a></li>
              <li style={{ marginBottom: '10px' }}><a href="/full-service-apply" style={{ color: '#ccc', textDecoration: 'none' }}>Full-Service Apply</a></li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 style={{ fontSize: '16px', fontWeight: 600, marginBottom: '16px', color: '#fff' }}>RESOURCES</h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              <li style={{ marginBottom: '10px' }}><a href="/resources" style={{ color: '#ccc', textDecoration: 'none' }}>Resource Library</a></li>
              <li style={{ marginBottom: '10px' }}><a href="/job-search-hub" style={{ color: '#16a085', textDecoration: 'none', fontWeight: 600 }}>Job Search Hub</a></li>
              <li style={{ marginBottom: '10px' }}><a href="/blog" style={{ color: '#ccc', textDecoration: 'none' }}>Blog</a></li>
              <li style={{ marginBottom: '10px' }}><a href="/faq" style={{ color: '#ccc', textDecoration: 'none' }}>FAQ</a></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 style={{ fontSize: '16px', fontWeight: 600, marginBottom: '16px', color: '#fff' }}>COMPANY</h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              <li style={{ marginBottom: '10px' }}><a href="/about" style={{ color: '#ccc', textDecoration: 'none' }}>About Us</a></li>
              <li style={{ marginBottom: '10px' }}><a href="/success-stories" style={{ color: '#ccc', textDecoration: 'none' }}>Success Stories</a></li>
              <li style={{ marginBottom: '10px' }}><a href="/careers" style={{ color: '#ccc', textDecoration: 'none' }}>Careers</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 style={{ fontSize: '16px', fontWeight: 600, marginBottom: '16px', color: '#fff' }}>CONTACT</h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              <li style={{ marginBottom: '10px' }}><a href="/contact" style={{ color: '#ccc', textDecoration: 'none' }}>Contact Us</a></li>
              <li style={{ marginBottom: '10px', color: '#ccc' }}>📧 hello@pyrosolutions.com</li>
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
            ©2025 PyroINC
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














