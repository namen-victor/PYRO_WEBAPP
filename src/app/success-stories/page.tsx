'use client';

import React, { useState } from 'react';
import { Navigation } from '@/components/Navigation';

export default function SuccessStoriesPage() {
  const [selectedFilter, setSelectedFilter] = useState('All');
  const [selectedService, setSelectedService] = useState('All Services');

  const filters = ['All', 'Entry Level', '1-7 Years', '7+ Years'];
  const serviceFilters = ['All Services', 'Career Consulting', 'Resume Revision', 'Full-Service Apply', 'Interview Prep'];

  const successStories = [
    {
      name: 'Sarah Chen',
      title: 'Software Engineer at Google',
      company: 'Google',
      image: '👩‍💻',
      experience: '1-7 Years',
      service: 'Full-Service Apply',
      quote: 'PyroINC helped me land my dream job at Google! Their human-led approach made all the difference. Within 3 months, I had multiple offers from top tech companies.',
      results: 'Landed job in 3 months, 5 interviews, 3 offers',
      videoUrl: '#'
    },
    {
      name: 'Michael Rodriguez',
      title: 'Product Manager at Amazon',
      company: 'Amazon',
      image: '👨‍💼',
      experience: '7+ Years',
      service: 'Career Consulting',
      quote: 'After 10 years in the same role, I wanted to transition to product management. PyroINC\'s career consulting service helped me pivot successfully. I\'m now at Amazon!',
      results: 'Career pivot in 4 months, 8 interviews, 2 offers',
      videoUrl: '#'
    },
    {
      name: 'Emily Thompson',
      title: 'Marketing Manager at Microsoft',
      company: 'Microsoft',
      image: '👩‍🦰',
      experience: '1-7 Years',
      service: 'Resume Revision',
      quote: 'My resume was getting zero responses. After PyroINC revised it, I started getting interview requests within days. The human touch made my experience stand out.',
      results: 'Landed job in 2 months, 12 interviews, 4 offers',
      videoUrl: '#'
    },
    {
      name: 'David Park',
      title: 'Data Scientist at Meta',
      company: 'Meta',
      image: '👨‍🔬',
      experience: 'Entry Level',
      service: 'Full-Service Apply',
      quote: 'As a new grad, I was overwhelmed by the job search. PyroINC handled everything - applications, follow-ups, interview prep. I landed at Meta within 2 months!',
      results: 'First job in 2 months, 6 interviews, 2 offers',
      videoUrl: '#'
    },
    {
      name: 'Jessica Williams',
      title: 'Financial Analyst at Goldman Sachs',
      company: 'Goldman Sachs',
      image: '👩‍💼',
      experience: '1-7 Years',
      service: 'Interview Prep',
      quote: 'I was getting interviews but not converting them to offers. PyroINC\'s interview prep service transformed my performance. I got an offer from Goldman Sachs!',
      results: 'Landed job in 6 weeks, 4 interviews, 1 offer',
      videoUrl: '#'
    },
    {
      name: 'James Anderson',
      title: 'UX Designer at Apple',
      company: 'Apple',
      image: '👨‍🎨',
      experience: '1-7 Years',
      service: 'Career Consulting',
      quote: 'PyroINC helped me transition from graphic design to UX design. Their strategic guidance and portfolio review were invaluable. Now I\'m designing for Apple!',
      results: 'Career transition in 5 months, 10 interviews, 3 offers',
      videoUrl: '#'
    }
  ];

  const filteredStories = successStories.filter(story => {
    const matchesExperience = selectedFilter === 'All' || story.experience === selectedFilter;
    const matchesService = selectedService === 'All Services' || story.service === selectedService;
    return matchesExperience && matchesService;
  });

  return (
    <div style={{ backgroundColor: '#ebebeb', minHeight: '100vh' }}>
      {/* Navigation */}
      <Navigation currentPage="success-stories" />

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
          Real People. Real Results.
        </h1>
        
        <p style={{ 
          fontSize: '20px', 
          color: '#555', 
          marginBottom: '48px',
          lineHeight: 1.6,
          maxWidth: '800px',
          margin: '0 auto 48px'
        }}>
          See how PyroINC's human-led approach has helped thousands of job seekers land their dream roles at top companies.
        </p>
      </section>

      {/* Filter Section */}
      <section style={{
        padding: '0 5% 40px',
        maxWidth: '1200px',
        margin: '0 auto'
      }}>
        <div style={{
          backgroundColor: '#fff',
          borderRadius: '12px',
          padding: '32px',
          marginBottom: '40px'
        }}>
          <h3 style={{
            fontSize: '20px',
            fontWeight: 700,
            color: '#2e2e2e',
            marginBottom: '20px'
          }}>
            Filter Success Stories
          </h3>

          <div style={{
            display: 'flex',
            gap: '24px',
            flexWrap: 'wrap',
            alignItems: 'center'
          }}>
            {/* Experience Level Filter */}
            <div style={{ flex: '1 1 300px' }}>
              <label style={{
                display: 'block',
                fontSize: '14px',
                fontWeight: 600,
                color: '#666',
                marginBottom: '8px'
              }}>
                Experience Level
              </label>
              <div style={{
                display: 'flex',
                gap: '8px',
                flexWrap: 'wrap'
              }}>
                {filters.map((filter) => (
                  <button
                    key={filter}
                    onClick={() => setSelectedFilter(filter)}
                    style={{
                      padding: '10px 20px',
                      fontSize: '14px',
                      fontWeight: 600,
                      color: selectedFilter === filter ? '#fff' : '#2e2e2e',
                      backgroundColor: selectedFilter === filter ? '#16a085' : '#fff',
                      border: '2px solid #16a085',
                      borderRadius: '20px',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease'
                    }}
                    onMouseEnter={(e) => {
                      if (selectedFilter !== filter) {
                        e.currentTarget.style.backgroundColor = '#d4f1e8';
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (selectedFilter !== filter) {
                        e.currentTarget.style.backgroundColor = '#fff';
                      }
                    }}
                  >
                    {filter}
                  </button>
                ))}
              </div>
            </div>

            {/* Service Filter */}
            <div style={{ flex: '1 1 300px' }}>
              <label style={{
                display: 'block',
                fontSize: '14px',
                fontWeight: 600,
                color: '#666',
                marginBottom: '8px'
              }}>
                Service Used
              </label>
              <select
                value={selectedService}
                onChange={(e) => setSelectedService(e.target.value)}
                style={{
                  width: '100%',
                  padding: '12px',
                  fontSize: '15px',
                  border: '2px solid #16a085',
                  borderRadius: '8px',
                  backgroundColor: '#fff',
                  color: '#2e2e2e',
                  fontWeight: 600,
                  cursor: 'pointer'
                }}
              >
                {serviceFilters.map((service) => (
                  <option key={service} value={service}>
                    {service}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* Success Stories Grid */}
      <section style={{
        padding: '0 5% 80px',
        maxWidth: '1200px',
        margin: '0 auto'
      }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
          gap: '32px'
        }}>
          {filteredStories.map((story, index) => (
            <div
              key={index}
              style={{
                backgroundColor: '#fff',
                borderRadius: '12px',
                overflow: 'hidden',
                boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-8px)';
                e.currentTarget.style.boxShadow = '0 12px 24px rgba(0,0,0,0.15)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.08)';
              }}
            >
              {/* Header with Image */}
              <div style={{
                backgroundColor: '#d4f1e8',
                padding: '32px',
                textAlign: 'center'
              }}>
                <div style={{
                  width: '120px',
                  height: '120px',
                  borderRadius: '50%',
                  backgroundColor: '#fff',
                  margin: '0 auto 16px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '64px',
                  border: '4px solid #16a085'
                }}>
                  {story.image}
                </div>
                <h3 style={{
                  fontSize: '22px',
                  fontWeight: 700,
                  color: '#2e2e2e',
                  marginBottom: '8px'
                }}>
                  {story.name}
                </h3>
                <p style={{
                  fontSize: '16px',
                  fontWeight: 600,
                  color: '#16a085',
                  marginBottom: '4px'
                }}>
                  {story.title}
                </p>
                <p style={{
                  fontSize: '14px',
                  color: '#666'
                }}>
                  {story.company}
                </p>
              </div>

              {/* Content */}
              <div style={{ padding: '24px' }}>
                {/* Tags */}
                <div style={{
                  display: 'flex',
                  gap: '8px',
                  marginBottom: '16px',
                  flexWrap: 'wrap'
                }}>
                  <span style={{
                    padding: '4px 12px',
                    fontSize: '12px',
                    fontWeight: 600,
                    color: '#fff',
                    backgroundColor: '#16a085',
                    borderRadius: '12px'
                  }}>
                    {story.experience}
                  </span>
                  <span style={{
                    padding: '4px 12px',
                    fontSize: '12px',
                    fontWeight: 600,
                    color: '#2e2e2e',
                    backgroundColor: '#ebebeb',
                    borderRadius: '12px'
                  }}>
                    {story.service}
                  </span>
                </div>

                {/* Quote */}
                <p style={{
                  fontSize: '15px',
                  color: '#555',
                  lineHeight: 1.7,
                  marginBottom: '16px',
                  fontStyle: 'italic'
                }}>
                  "{story.quote}"
                </p>

                {/* Results */}
                <div style={{
                  backgroundColor: '#f8f8f8',
                  padding: '16px',
                  borderRadius: '8px',
                  marginBottom: '16px'
                }}>
                  <p style={{
                    fontSize: '13px',
                    fontWeight: 600,
                    color: '#666',
                    marginBottom: '4px'
                  }}>
                    Results:
                  </p>
                  <p style={{
                    fontSize: '14px',
                    color: '#2e2e2e',
                    fontWeight: 600
                  }}>
                    {story.results}
                  </p>
                </div>

                {/* Video Link */}
                <a
                  href={story.videoUrl}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    fontSize: '15px',
                    fontWeight: 600,
                    color: '#16a085',
                    textDecoration: 'none'
                  }}
                >
                  <span>▶</span> Watch Video Story
                </a>
              </div>
            </div>
          ))}
        </div>

        {filteredStories.length === 0 && (
          <div style={{
            textAlign: 'center',
            padding: '60px 20px',
            backgroundColor: '#fff',
            borderRadius: '12px'
          }}>
            <p style={{
              fontSize: '18px',
              color: '#666'
            }}>
              No success stories match your filters. Try adjusting your selection.
            </p>
          </div>
        )}
      </section>

      {/* Stats Section */}
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
          marginBottom: '48px'
        }}>
          Our Track Record
        </h2>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '40px',
          textAlign: 'center'
        }}>
          {[
            { number: '2,500+', label: 'Clients Helped' },
            { number: '90%', label: 'Interview Rate' },
            { number: '3.2 months', label: 'Average Time to Offer' },
            { number: '95%', label: 'Client Satisfaction' }
          ].map((stat, index) => (
            <div key={index}>
              <div style={{
                fontSize: '48px',
                fontWeight: 700,
                color: '#16a085',
                marginBottom: '8px'
              }}>
                {stat.number}
              </div>
              <div style={{
                fontSize: '16px',
                color: '#666',
                fontWeight: 600
              }}>
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section style={{
        padding: '80px 5%',
        maxWidth: '1000px',
        margin: '0 auto',
        textAlign: 'center'
      }}>
        <h2 style={{
          fontSize: '40px',
          fontWeight: 700,
          color: '#2e2e2e',
          marginBottom: '16px'
        }}>
          Ready to Write Your Success Story?
        </h2>
        <p style={{
          fontSize: '18px',
          color: '#555',
          marginBottom: '32px'
        }}>
          Join thousands of job seekers who've landed their dream roles with PyroINC's human-led approach.
        </p>

        <div style={{
          display: 'flex',
          gap: '16px',
          justifyContent: 'center',
          flexWrap: 'wrap'
        }}>
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

          <a
            href="/services"
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
            Explore Our Services
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
              <li style={{ marginBottom: '10px' }}><a href="/networking-tracker" style={{ color: '#ccc', textDecoration: 'none' }}>Networking Tracker</a></li>
              <li style={{ marginBottom: '10px' }}><a href="/interview-prep-template" style={{ color: '#ccc', textDecoration: 'none' }}>Interview Prep Template</a></li>
              <li style={{ marginBottom: '10px' }}><a href="/job-search-hub" style={{ color: '#ccc', textDecoration: 'none' }}>Job Search Hub</a></li>
              <li style={{ marginBottom: '10px' }}><a href="/role-specific-resumes" style={{ color: '#ccc', textDecoration: 'none' }}>Role-Specific Résumés</a></li>
              <li style={{ marginBottom: '10px' }}><a href="/blog" style={{ color: '#ccc', textDecoration: 'none' }}>Blog</a></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 style={{ fontSize: '16px', fontWeight: 600, marginBottom: '16px', color: '#fff' }}>Company</h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              <li style={{ marginBottom: '10px' }}><a href="/about" style={{ color: '#ccc', textDecoration: 'none' }}>About Us</a></li>
              <li style={{ marginBottom: '10px' }}><a href="/success-stories" style={{ color: '#16a085', textDecoration: 'none', fontWeight: 600 }}>Success Stories</a></li>
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














