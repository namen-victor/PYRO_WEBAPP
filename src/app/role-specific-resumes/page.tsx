'use client';

import React, { useState } from 'react';
import { Navigation } from '@/components/Navigation';

export default function RoleSpecificResumesPage() {
  const [selectedIndustry, setSelectedIndustry] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const industries = ['All', 'Sales', 'Engineering', 'Marketing', 'Operations', 'Education', 'HR', 'Healthcare', 'Technology', 'Consulting'];

  const templates = [
    { title: 'Technician Resume Template', industry: 'Technology', badge: 'Technology' },
    { title: 'System Analyst Resume Template', industry: 'Technology', badge: 'Technology' },
    { title: 'Pediatric Nurse Resume Template', industry: 'Healthcare', badge: 'Healthcare' },
    { title: 'Mechanical Engineer Resume Template', industry: 'Engineering', badge: 'Engineering' },
    { title: 'Marketing Manager Resume Template', industry: 'Marketing', badge: 'Marketing' },
    { title: 'Marketing Assistant Resume Template', industry: 'Marketing', badge: 'Marketing' },
    { title: 'Industrial Engineer Resume Template', industry: 'Engineering', badge: 'Engineering' },
    { title: 'Data Scientist Resume Template', industry: 'Technology', badge: 'Technology' },
    { title: 'Account Executive Resume Template', industry: 'Sales', badge: 'Sales' },
    { title: 'HR Coordinator Resume Template', industry: 'HR', badge: 'HR' },
    { title: 'IT Manager Resume Template', industry: 'Technology', badge: 'Technology' },
    { title: 'DevOps Engineer Resume Template', industry: 'Technology', badge: 'Technology' },
    { title: 'Customer Service Manager Resume Template', industry: 'Operations', badge: 'Operations' },
    { title: 'Art Director Resume Template', industry: 'Marketing', badge: 'Marketing' },
    { title: 'Engineering Manager Resume Template', industry: 'Engineering', badge: 'Engineering' },
    { title: 'Customer Service Resume Template', industry: 'Operations', badge: 'Operations' },
    { title: 'Project Manager Resume Template', industry: 'Operations', badge: 'Operations' },
    { title: 'Product Manager Resume Template', industry: 'Technology', badge: 'Technology' },
    { title: 'Graphic Designer Resume Template', industry: 'Marketing', badge: 'Marketing' },
    { title: 'Accounting Assistant Resume Template', industry: 'Operations', badge: 'Operations' }
  ];

  const filteredTemplates = templates.filter(template => {
    const matchesIndustry = selectedIndustry === 'All' || template.industry === selectedIndustry;
    const matchesSearch = template.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesIndustry && matchesSearch;
  });

  return (
    <div style={{ backgroundColor: '#ebebeb', minHeight: '100vh' }}>
      {/* Navigation */}
      <Navigation currentPage="role-specific-resumes" />

      {/* Hero Section */}
      <section style={{ 
        padding: '80px 5%', 
        maxWidth: '1200px', 
        margin: '0 auto',
        textAlign: 'center'
      }}>
        <div style={{
          fontSize: '14px',
          fontWeight: 700,
          letterSpacing: '0.1em',
          color: '#666',
          marginBottom: '16px'
        }}>
          FREE RESUME TEMPLATES ONLINE
        </div>
        
        <h1 style={{ 
          fontSize: '48px', 
          fontWeight: 700, 
          color: '#2e2e2e', 
          marginBottom: '16px',
          lineHeight: 1.2
        }}>
          PyroINC's Résumés
        </h1>
        
        <p style={{ 
          fontSize: '18px', 
          color: '#555', 
          marginBottom: '48px',
          lineHeight: 1.6,
          maxWidth: '700px',
          margin: '0 auto 48px'
        }}>
          The best resume templates online, we are adding more constantly!
        </p>
      </section>

      {/* Filter and Search Section */}
      <section style={{
        padding: '0 5% 40px',
        maxWidth: '1200px',
        margin: '0 auto'
      }}>
        <div style={{
          display: 'flex',
          gap: '20px',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          {/* Left: Title */}
          <h2 style={{
            fontSize: '28px',
            fontWeight: 700,
            color: '#2e2e2e',
            margin: 0
          }}>
            Free Resume Templates to Download
          </h2>

          {/* Right: Filter and Search */}
          <div style={{
            display: 'flex',
            gap: '16px',
            flexWrap: 'wrap',
            alignItems: 'center'
          }}>
            <div>
              <label htmlFor="industry-filter" style={{
                display: 'block',
                fontSize: '14px',
                fontWeight: 600,
                color: '#2e2e2e',
                marginBottom: '8px'
              }}>
                Filter by Industry
              </label>
              <select
                id="industry-filter"
                value={selectedIndustry}
                onChange={(e) => setSelectedIndustry(e.target.value)}
                style={{
                  padding: '10px 16px',
                  fontSize: '15px',
                  border: '2px solid #2e2e2e',
                  borderRadius: '6px',
                  backgroundColor: '#fff',
                  color: '#2e2e2e',
                  fontWeight: 600,
                  cursor: 'pointer',
                  minWidth: '150px'
                }}
              >
                {industries.map((industry) => (
                  <option key={industry} value={industry}>
                    {industry}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="search" style={{
                display: 'block',
                fontSize: '14px',
                fontWeight: 600,
                color: '#2e2e2e',
                marginBottom: '8px'
              }}>
                Search
              </label>
              <input
                id="search"
                type="text"
                placeholder="Search templates..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{
                  padding: '10px 16px',
                  fontSize: '15px',
                  border: '2px solid #2e2e2e',
                  borderRadius: '6px',
                  backgroundColor: '#fff',
                  minWidth: '200px'
                }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Templates Grid */}
      <section style={{
        padding: '0 5% 80px',
        maxWidth: '1200px',
        margin: '0 auto'
      }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
          gap: '32px'
        }}>
          {filteredTemplates.map((template, index) => (
            <div
              key={index}
              style={{
                backgroundColor: '#fff',
                borderRadius: '12px',
                overflow: 'hidden',
                border: '2px solid #e2e2e2',
                transition: 'all 0.3s ease',
                display: 'flex',
                flexDirection: 'column'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = '#16a085';
                e.currentTarget.style.transform = 'translateY(-4px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = '#e2e2e2';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              {/* Badge */}
              <div style={{
                backgroundColor: '#16a085',
                color: '#fff',
                padding: '8px 16px',
                fontSize: '13px',
                fontWeight: 700,
                textAlign: 'center'
              }}>
                {template.badge}
              </div>

              {/* Template Preview */}
              <div style={{
                padding: '24px',
                backgroundColor: '#f9f9f9',
                minHeight: '200px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <div style={{
                  width: '100%',
                  height: '250px',
                  backgroundColor: '#fff',
                  border: '1px solid #ddd',
                  borderRadius: '8px',
                  padding: '16px',
                  fontSize: '10px',
                  color: '#999',
                  overflow: 'hidden'
                }}>
                  <div style={{ fontWeight: 700, marginBottom: '8px', fontSize: '12px', color: '#2e2e2e' }}>RÉSUMÉ</div>
                  <div style={{ height: '3px', backgroundColor: '#16a085', width: '40%', marginBottom: '8px' }}></div>
                  <div style={{ height: '2px', backgroundColor: '#ddd', marginBottom: '4px' }}></div>
                  <div style={{ height: '2px', backgroundColor: '#ddd', marginBottom: '4px' }}></div>
                  <div style={{ height: '2px', backgroundColor: '#ddd', width: '70%', marginBottom: '12px' }}></div>
                  <div style={{ height: '2px', backgroundColor: '#ddd', marginBottom: '4px' }}></div>
                  <div style={{ height: '2px', backgroundColor: '#ddd', marginBottom: '4px' }}></div>
                  <div style={{ height: '2px', backgroundColor: '#ddd', width: '60%' }}></div>
                </div>
              </div>

              {/* Content */}
              <div style={{ padding: '20px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                <h3 style={{
                  fontSize: '18px',
                  fontWeight: 700,
                  color: '#2e2e2e',
                  marginBottom: '16px',
                  lineHeight: 1.3,
                  flex: 1
                }}>
                  {template.title}
                </h3>

                <a
                  href="#"
                  style={{
                    display: 'block',
                    width: '100%',
                    padding: '12px',
                    fontSize: '15px',
                    fontWeight: 600,
                    color: '#fff',
                    backgroundColor: '#16a085',
                    border: 'none',
                    borderRadius: '6px',
                    textAlign: 'center',
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
                  DOWNLOAD HERE
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div style={{ textAlign: 'center', marginTop: '48px' }}>
          <button
            style={{
              padding: '12px 32px',
              fontSize: '16px',
              fontWeight: 600,
              color: '#2e2e2e',
              backgroundColor: '#fff',
              border: '2px solid #2e2e2e',
              borderRadius: '8px',
              cursor: 'pointer',
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
            Next
          </button>
        </div>
      </section>

      {/* Featured Resources Section */}
      <section style={{
        padding: '80px 5%',
        maxWidth: '1200px',
        margin: '0 auto'
      }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '32px'
        }}>
          {/* Free Resume Feedback */}
          <div style={{
            backgroundColor: '#fff',
            borderRadius: '12px',
            padding: '32px',
            border: '2px solid #e2e2e2'
          }}>
            <h3 style={{
              fontSize: '22px',
              fontWeight: 700,
              color: '#2e2e2e',
              marginBottom: '16px'
            }}>
              Free Résumé Feedback
            </h3>
            <p style={{
              fontSize: '15px',
              color: '#555',
              lineHeight: 1.6,
              marginBottom: '24px'
            }}>
              Our resumes have helped clients land jobs at Google, Microsoft, Uber, JP Morgan, McKinsey, and more. Don't miss out on critical résumé feedback to make your experience, skills, and profile stand out.
            </p>
            <a
              href="/free-resume-feedback"
              style={{
                display: 'inline-block',
                padding: '12px 24px',
                fontSize: '15px',
                fontWeight: 600,
                color: '#fff',
                backgroundColor: '#16a085',
                border: 'none',
                borderRadius: '6px',
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
              SUBMIT YOURS HERE
            </a>
          </div>

          {/* PyroINC Resume Template */}
          <div style={{
            backgroundColor: '#fff',
            borderRadius: '12px',
            padding: '32px',
            border: '2px solid #e2e2e2'
          }}>
            <h3 style={{
              fontSize: '22px',
              fontWeight: 700,
              color: '#2e2e2e',
              marginBottom: '16px'
            }}>
              PyroINC Résumé Template
            </h3>
            <p style={{
              fontSize: '15px',
              color: '#555',
              lineHeight: 1.6,
              marginBottom: '24px'
            }}>
              Download the résumé template that's helped thousands land jobs. Take charge of your career and get closer to your next opportunity.
            </p>
            <a
              href="/resume-template"
              style={{
                display: 'inline-block',
                padding: '12px 24px',
                fontSize: '15px',
                fontWeight: 600,
                color: '#fff',
                backgroundColor: '#16a085',
                border: 'none',
                borderRadius: '6px',
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
              DOWNLOAD HERE
            </a>
          </div>

          {/* 14-Day Job Search Challenge */}
          <div style={{
            backgroundColor: '#fff',
            borderRadius: '12px',
            padding: '32px',
            border: '2px solid #e2e2e2'
          }}>
            <h3 style={{
              fontSize: '22px',
              fontWeight: 700,
              color: '#2e2e2e',
              marginBottom: '16px'
            }}>
              The 14 Day Job Search Challenge
            </h3>
            <p style={{
              fontSize: '15px',
              color: '#555',
              lineHeight: 1.6,
              marginBottom: '24px'
            }}>
              Get 14 days of practical job search tips sent to your inbox at no cost. Start from the basics and start landing job offers.
            </p>
            <a
              href="/job-search-hub"
              style={{
                display: 'inline-block',
                padding: '12px 24px',
                fontSize: '15px',
                fontWeight: 600,
                color: '#fff',
                backgroundColor: '#16a085',
                border: 'none',
                borderRadius: '6px',
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
              CHECK IT OUT HERE
            </a>
          </div>
        </div>
      </section>

      {/* Subscribe to PyroINC AI */}
      <section style={{
        padding: '80px 5%',
        maxWidth: '1200px',
        margin: '0 auto'
      }}>
        <div style={{
          background: 'linear-gradient(135deg, #1e5f5d, #2a7a77)',
          borderRadius: '16px',
          padding: '60px 40px',
          color: '#fff',
          textAlign: 'center'
        }}>
          <h2 style={{
            fontSize: '36px',
            fontWeight: 700,
            marginBottom: '24px',
            color: '#fff'
          }}>
            Subscribe to PyroINC AI
          </h2>

          <ul style={{
            textAlign: 'left',
            maxWidth: '800px',
            margin: '0 auto 32px',
            fontSize: '16px',
            lineHeight: 2,
            listStyle: 'none',
            padding: 0
          }}>
            <li>• Leverage the power of AutoApplyAI to automatically apply to 350 jobs, 25 more each week at the speed of AI</li>
            <li>• Get more job offers with InterviewAI, ResumeAI, CoverLetterAI, and NetworkAI. First interview free!</li>
            <li>• Our innovative Resume Scorer offers an in-depth analysis of your resume, providing a comprehensive assessment of its quality</li>
            <li>• Unlock complete access to ResumeAI, InterviewAI, CoverLetterAI, and NetworkAI. Upload unlimited resumes, and create endless bullet points, cover letters, networking messages and practice interview questions</li>
          </ul>

          <div style={{
            fontSize: '48px',
            fontWeight: 900,
            marginBottom: '24px'
          }}>
            PyroINC AI
          </div>

          <a
            href="#"
            style={{
              display: 'inline-block',
              padding: '16px 40px',
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
              e.currentTarget.style.backgroundColor = '#ebebeb';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = '#fff';
            }}
          >
            Visit PyroINC AI
          </a>
        </div>
      </section>

      {/* Final CTA */}
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
          Ready to make your dream job a <span style={{ color: '#16a085' }}>reality</span>?
        </h2>
        <p style={{
          fontSize: '18px',
          color: '#555',
          marginBottom: '32px'
        }}>
          Get personal attention with each of our services, or join a community of learners in our online courses.
        </p>

        <div style={{
          display: 'flex',
          gap: '16px',
          justifyContent: 'center',
          flexWrap: 'wrap'
        }}>
          <a
            href="#"
            style={{
              display: 'inline-block',
              padding: '16px 32px',
              fontSize: '16px',
              fontWeight: 600,
              color: '#fff',
              backgroundColor: '#2e2e2e',
              border: '2px solid #2e2e2e',
              borderRadius: '8px',
              textDecoration: 'none',
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#1a1a1a';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = '#2e2e2e';
            }}
          >
            Try PyroAI for $5
          </a>

          <a
            href="/guarantee"
            style={{
              display: 'inline-block',
              padding: '16px 32px',
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
            Book a Free Consultation
          </a>
        </div>

        <p style={{
          fontSize: '15px',
          color: '#666',
          marginTop: '24px'
        }}>
          Questions about our services? Check out our <a href="/faq" style={{ color: '#16a085', textDecoration: 'underline' }}>FAQ page</a> or contact our team <a href="/contact" style={{ color: '#16a085', textDecoration: 'underline' }}>here</a>.
        </p>
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
              <li style={{ marginBottom: '10px' }}><a href="/job-search-hub" style={{ color: '#ccc', textDecoration: 'none' }}>Job Search Hub</a></li>
              <li style={{ marginBottom: '10px' }}><a href="/role-specific-resumes" style={{ color: '#16a085', textDecoration: 'none', fontWeight: 600 }}>Role-Specific Résumés</a></li>
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














