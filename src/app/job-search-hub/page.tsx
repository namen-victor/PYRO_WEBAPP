'use client';

import React, { useState } from 'react';
import { Navigation } from '@/components/Navigation';

export default function JobSearchHubPage() {
  const [email, setEmail] = useState('');
  const [activeCategory, setActiveCategory] = useState('home');

  const featuredPosts = [
    {
      title: '5 Ways You Can Use LinkedIn to Advance Your Career',
      link: '#'
    },
    {
      title: 'The Interview Tips That Landed Us Offers at LinkedIn, Accenture, Udemy and more',
      link: '#'
    },
    {
      title: 'The Kismma Nhuhs Experiment: Applying to 100 Jobs with a Creative Name',
      link: '#'
    },
    {
      title: 'How To Land an Internship! A Step-By-Step Guide with Resume Tips',
      link: '#'
    }
  ];

  const blogPosts = [
    {
      category: 'Job Search',
      readTime: '4 min read',
      title: 'Why You Should Always Follow Up With Your Recruiter',
      excerpt: 'Learn why following up is crucial and how to do it professionally. Keep your top of mind, and use the tips here to make the difference between getting hired or forgotten.',
      date: 'August 14, 2025',
      badge: null
    },
    {
      category: 'Networking',
      readTime: '5 min read',
      title: 'Why Networking Works (Even If You Hate It)',
      excerpt: 'Networking isn\'t just for extroverts—it can boost your job search, build trust, benefit others, and helps you stand out, even if you hate it.',
      date: 'August 12, 2025',
      badge: null
    },
    {
      category: 'Resume',
      readTime: '6 min read',
      title: 'Hidden Eye Tracker: How Recruiters Actually Read Resumes',
      excerpt: 'Did you know recruiters spend an average of 6 seconds on a resume? Learn what they look for and how to grab their attention fast.',
      date: 'August 9, 2025',
      badge: 'Most Popular'
    },
    {
      category: 'Job Search',
      readTime: '7 min read',
      title: 'The Kismma Nhuhs Experiment: Applying to 100 Jobs with a Creative Name',
      excerpt: 'What happens when you apply to 100 jobs with a creative name? Read how this experiment revealed hidden biases and what you can learn from it.',
      date: 'August 7, 2025',
      badge: 'Most Popular'
    },
    {
      category: 'Resume',
      readTime: '8 min read',
      title: 'Avoid These 30 Resume Mistakes If You Want a Job Interview',
      excerpt: 'Examine your resume for any of these 30 mistakes and make corrections so you can get an invitation to interview at your dream company.',
      date: 'August 5, 2025',
      badge: null
    },
    {
      category: 'Resume',
      readTime: '5 min read',
      title: 'How to Write a Resume with Transferable Skills',
      excerpt: 'Discover how to write a resume with transferable skills. Ensure a seamless career transition with tips to highlight adaptability in your resume.',
      date: 'April 16, 2025',
      badge: null
    },
    {
      category: 'Resume',
      readTime: '6 min read',
      title: 'How To Land an Internship! A Step-By-Step Guide with Resume Tips',
      excerpt: 'Looking for an internship? This comprehensive guide shows you how to land your first internship! After your internship, you\'ll be hired in no time!',
      date: 'April 15, 2025',
      badge: null
    },
    {
      category: 'Interview',
      readTime: '5 min read',
      title: 'How to Answer These 10 Short Answer Interview Questions',
      excerpt: 'Master short answer interview questions with this guide—all examples of how to answer these 10 short answer interview questions.',
      date: 'March 18, 2025',
      badge: null
    },
    {
      category: 'Interview',
      readTime: '7 min read',
      title: 'The Interview Tips That Landed Us Offers at LinkedIn, Accenture, Udemy and more',
      excerpt: 'An interview with Jerry Yue about his successful job search through social media and network outreach, landing offers at top tech companies.',
      date: 'March 5, 2025',
      badge: 'Most Popular'
    },
    {
      category: 'Job Search',
      readTime: '6 min read',
      title: 'Follow These 8 Steps to Get a Job in AI',
      excerpt: 'Getting a job in AI is tough, but it doesn\'t have to be. Follow these 8 steps to set your AI job search strategy and start working in this booming field.',
      date: 'January 13, 2025',
      badge: null
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

      {/* Hero Section */}
      <section style={{ 
        padding: '80px 5%', 
        maxWidth: '1400px', 
        margin: '0 auto',
        display: 'flex',
        gap: '60px',
        flexWrap: 'wrap'
      }}>
        {/* Left: Hero Content */}
        <div style={{ flex: '1 1 600px' }}>
          <div style={{
            fontSize: '14px',
            fontWeight: 700,
            letterSpacing: '0.1em',
            color: '#666',
            marginBottom: '16px'
          }}>
            JOB SEARCH HUB
          </div>
          
          <h1 style={{ 
            fontSize: '48px', 
            fontWeight: 700, 
            color: '#2e2e2e', 
            marginBottom: '20px',
            lineHeight: 1.2
          }}>
            Land your dream job with expert-backed guidance
          </h1>
          
          <p style={{ 
            fontSize: '18px', 
            color: '#555', 
            marginBottom: '32px',
            lineHeight: 1.6
          }}>
            Get expert-backed, proven strategies used by top job seekers to move forward with clarity, confidence, and real results. When the process feels overwhelming, we'll help you move forward with clarity, confidence, and real results.
          </p>

          <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
            <a
              href="/guarantee"
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
              Book a Free Consultation
            </a>

            <a
              href="/about"
              style={{
                display: 'inline-block',
                padding: '16px 32px',
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
              Learn More
            </a>
          </div>
        </div>

        {/* Right: Featured Posts */}
        <div style={{ flex: '1 1 350px' }}>
          <h3 style={{
            fontSize: '20px',
            fontWeight: 700,
            color: '#2e2e2e',
            marginBottom: '24px'
          }}>
            Featured posts
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {featuredPosts.map((post, index) => (
              <a
                key={index}
                href={post.link}
                style={{
                  display: 'flex',
                  gap: '16px',
                  textDecoration: 'none',
                  padding: '16px',
                  backgroundColor: '#fff',
                  borderRadius: '8px',
                  border: '1px solid #e2e2e2',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = '#16a085';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = '#e2e2e2';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                <div style={{
                  width: '60px',
                  height: '60px',
                  backgroundColor: '#d4f1e8',
                  borderRadius: '8px',
                  flexShrink: 0,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '24px'
                }}>
                  📄
                </div>
                <div style={{ flex: 1 }}>
                  <p style={{
                    fontSize: '15px',
                    fontWeight: 600,
                    color: '#2e2e2e',
                    lineHeight: 1.4,
                    margin: 0
                  }}>
                    {post.title}
                  </p>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <section style={{
        padding: '60px 5%',
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
                { id: 'home', label: 'Home', link: '#' },
                { id: 'careers', label: 'Careers', link: '#' },
                { id: 'step1', label: 'Step 1: Resume', link: '#' },
                { id: 'step2', label: 'Step 2: Cover Letter', link: '#' },
                { id: 'step3', label: 'Step 3: Job Search', link: '#' },
                { id: 'step4', label: 'Step 4: Applying to Jobs', link: '#' },
                { id: 'step5', label: 'Step 5: Networking', link: '#' },
                { id: 'step6', label: 'Step 6: Interview', link: '#' }
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveCategory(item.id)}
                  style={{
                    padding: '12px 16px',
                    fontSize: '15px',
                    fontWeight: 600,
                    color: activeCategory === item.id ? '#fff' : '#2e2e2e',
                    backgroundColor: activeCategory === item.id ? '#16a085' : 'transparent',
                    border: 'none',
                    borderRadius: '8px',
                    textAlign: 'left',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseEnter={(e) => {
                    if (activeCategory !== item.id) {
                      e.currentTarget.style.backgroundColor = '#f5f5f5';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (activeCategory !== item.id) {
                      e.currentTarget.style.backgroundColor = 'transparent';
                    }
                  }}
                >
                  {item.label}
                </button>
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

        {/* Right: Blog Posts Grid */}
        <div style={{ flex: '1 1 800px' }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
            gap: '32px'
          }}>
            {blogPosts.map((post, index) => (
              <div
                key={index}
                style={{
                  backgroundColor: '#d4f1e8',
                  borderRadius: '12px',
                  overflow: 'hidden',
                  position: 'relative'
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
                  📊
                </div>

                {/* Content */}
                <div style={{ padding: '24px', backgroundColor: '#fff' }}>
                  <div style={{
                    display: 'flex',
                    gap: '12px',
                    marginBottom: '12px',
                    fontSize: '13px',
                    color: '#666'
                  }}>
                    <span style={{ fontWeight: 600, color: '#16a085' }}>{post.category}</span>
                    <span>•</span>
                    <span>{post.readTime}</span>
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
                      href="#"
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

          {/* More Posts Button */}
          <div style={{ textAlign: 'center', marginTop: '48px' }}>
            <a
              href="/blog"
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
              More posts ↗
            </a>
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
              <li style={{ marginBottom: '10px' }}><a href="/networking-tracker" style={{ color: '#ccc', textDecoration: 'none' }}>Networking Tracker</a></li>
              <li style={{ marginBottom: '10px' }}><a href="/interview-prep-template" style={{ color: '#ccc', textDecoration: 'none' }}>Interview Prep Template</a></li>
              <li style={{ marginBottom: '10px' }}><a href="/job-search-hub" style={{ color: '#16a085', textDecoration: 'none', fontWeight: 600 }}>Job Search Hub</a></li>
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














