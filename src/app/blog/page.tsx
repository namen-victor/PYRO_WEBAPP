'use client';

import React, { useState } from 'react';
import { Navigation } from '@/components/Navigation';

export default function BlogPage() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [email, setEmail] = useState('');

  const categories = ['All', 'Career Tips', 'AI Tools', 'Success Stories', 'Networking', 'Resume', 'Interview', 'Job Search'];

  const featuredPosts = [
    {
      category: 'Success Stories',
      title: 'From Job Search Challenges to a $40K Salary Boost: How Olivia Found Her Dream Job',
      excerpt: 'Struggling with your job search? Olivia was in your shoes. Here\'s how she landed her dream role with PyroINC\'s help.',
      date: 'March 20, 2025',
      readTime: '5 min read',
      link: '#'
    },
    {
      category: 'Resume',
      title: 'Avoid These 30 Résumé Mistakes If You Want a Job Interview',
      excerpt: 'Examine your resume for any of these 30 mistakes and make corrections so you can get an invitation to interview at your dream company.',
      date: 'August 5, 2025',
      readTime: '8 min read',
      link: '#'
    },
    {
      category: 'Job Search',
      title: 'The Kismma Nhuhs Experiment: Applying to 100 Jobs with a Creative Name',
      excerpt: 'What happens when you apply to 100 jobs with a creative name? This experiment revealed hidden biases in hiring.',
      date: 'August 7, 2025',
      readTime: '7 min read',
      link: '#'
    }
  ];

  const blogPosts = [
    {
      category: 'Success Stories',
      title: 'International Job Seeker Guide: Practical Tips to Get Your Dream Job',
      excerpt: 'All of these can be EVEN MORE hard to navigate when you\'re an international job seeker. We\'ve been there, so we\'re here to help you.',
      date: 'September 30, 2025',
      readTime: '6 min read',
      badge: null
    },
    {
      category: 'Success Stories',
      title: 'Why We Downsized Our Job Search Team (And Why It Works Better)',
      excerpt: 'Ever wondered why having a smaller team can lead to better results? Here\'s why our lean approach gets you hired faster.',
      date: 'August 30, 2025',
      readTime: '5 min read',
      badge: null
    },
    {
      category: 'Success Stories',
      title: 'PyroINC Review – From Retail Inventory Manager to Transitioning to a Dream Professional',
      excerpt: 'Discover how one client made a successful career transition with PyroINC. Read his inspiring journey.',
      date: 'July 12, 2025',
      readTime: '6 min read',
      badge: null
    },
    {
      category: 'Success Stories',
      title: 'PyroINC Review – The Networking Breakthrough: How a Client Landed Interviews at Top Companies',
      excerpt: 'How PyroINC\'s career coaching services helped a client make a major career breakthrough. Read the full story.',
      date: 'June 11, 2025',
      readTime: '7 min read',
      badge: null
    },
    {
      category: 'Success Stories',
      title: 'PyroINC Review – From Job Search Fatigue to Success: How Jared Found His Dream Role',
      excerpt: 'Jared\'s job search was exhausting. Discover how he found success with PyroINC and landed his dream role.',
      date: 'June 7, 2025',
      readTime: '6 min read',
      badge: null
    },
    {
      category: 'Success Stories',
      title: 'PyroINC Review – From Corporate Burnout to Success: How Olivia Found Her Harmonized Life',
      excerpt: 'Fed up with corporate burnout? Olivia found a better work-life balance with PyroINC. Here\'s her story.',
      date: 'May 28, 2025',
      readTime: '7 min read',
      badge: null
    },
    {
      category: 'Success Stories',
      title: 'PyroINC Review – How Aaryan Secured a PayPal Internship Through Networking',
      excerpt: 'Networking is key to landing internships. Aaryan learned this firsthand. Discover how he secured his dream internship.',
      date: 'May 26, 2025',
      readTime: '5 min read',
      badge: null
    },
    {
      category: 'Success Stories',
      title: 'PyroINC Review – From Career Setbacks to a Steady Role: How Andres Rebuilt His Career',
      excerpt: 'Faced a blow and losing hope? Andres found his career path again with PyroINC. Read his comeback story.',
      date: 'May 23, 2025',
      readTime: '6 min read',
      badge: null
    },
    {
      category: 'Success Stories',
      title: 'PyroINC Review – From India to a Data Analyst Role in the U.S.: How Aman Used PyroINC to Land His Dream Job',
      excerpt: 'International job search is tough. Aman navigated it successfully with PyroINC and landed his dream role in the U.S.',
      date: 'May 22, 2025',
      readTime: '7 min read',
      badge: null
    },
    {
      category: 'Success Stories',
      title: 'PyroINC Review – From Job Search Challenges to a $40K Salary Boost: How Olivia Found Her Dream Job',
      excerpt: 'Struggling with your job search? Olivia was in your shoes. Here\'s how she landed her dream role with a significant salary boost.',
      date: 'March 20, 2025',
      readTime: '8 min read',
      badge: null
    },
    {
      category: 'Career Tips',
      title: 'PyroINC Review – From Rejections to TikTok: How David Quinton Landed His Dream Job',
      excerpt: 'Struggling with rejections? David turned to TikTok to find his dream job. Here\'s his unique journey.',
      date: 'March 17, 2025',
      readTime: '6 min read',
      badge: null
    },
    {
      category: 'AI Tools',
      title: '10 Incredible AI Tools to Supercharge Your Job Search',
      excerpt: 'AI tools can revolutionize your job search. Discover the top 10 tools to help you land your dream job faster.',
      date: 'February 28, 2025',
      readTime: '9 min read',
      badge: null
    },
    {
      category: 'Career Tips',
      title: '10 Exciting Entry-Level Government Jobs',
      excerpt: 'Discover the top 10 entry-level government jobs that offer excellent pay, job security, and career growth opportunities.',
      date: 'February 5, 2025',
      readTime: '7 min read',
      badge: null
    },
    {
      category: 'Career Tips',
      title: '10 Most In-Demand IT Soft Skills',
      excerpt: 'Discover which soft skills are crucial for career advancement in tech and how to develop them.',
      date: 'February 5, 2025',
      readTime: '6 min read',
      badge: null
    }
  ];

  const filteredPosts = blogPosts.filter(post => {
    const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory;
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Thank you for subscribing with ${email}!`);
    setEmail('');
  };

  return (
    <div style={{ backgroundColor: '#ebebeb', minHeight: '100vh' }}>
      {/* Navigation */}
      <Navigation currentPage="blog" />

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
          CAREER & JOB SEARCH TIPS
        </div>
        
        <h1 style={{ 
          fontSize: '48px', 
          fontWeight: 700, 
          color: '#2e2e2e', 
          marginBottom: '16px',
          lineHeight: 1.2
        }}>
          PyroINC's Blog
        </h1>
        
        <p style={{ 
          fontSize: '18px', 
          color: '#555', 
          marginBottom: '48px',
          lineHeight: 1.6,
          maxWidth: '800px',
          margin: '0 auto 48px'
        }}>
          Welcome to the PyroINC blog! Here we share actionable advice on the job search, success stories, and more.
        </p>
      </section>

      {/* Filter by Category */}
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
          justifyContent: 'space-between',
          marginBottom: '32px'
        }}>
          <h2 style={{
            fontSize: '28px',
            fontWeight: 700,
            color: '#2e2e2e',
            margin: 0
          }}>
            Filter by Category
          </h2>

          <div style={{
            display: 'flex',
            gap: '16px',
            flexWrap: 'wrap',
            alignItems: 'center'
          }}>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
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
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>

            <input
              type="text"
              placeholder="Search by topic, keyword, or title..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                padding: '10px 16px',
                fontSize: '15px',
                border: '2px solid #2e2e2e',
                borderRadius: '6px',
                backgroundColor: '#fff',
                minWidth: '250px'
              }}
            />
          </div>
        </div>

        {/* Category Pills */}
        <div style={{
          display: 'flex',
          gap: '12px',
          flexWrap: 'wrap'
        }}>
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              style={{
                padding: '8px 16px',
                fontSize: '14px',
                fontWeight: 600,
                color: selectedCategory === category ? '#fff' : '#2e2e2e',
                backgroundColor: selectedCategory === category ? '#16a085' : '#fff',
                border: '2px solid #16a085',
                borderRadius: '20px',
                cursor: 'pointer',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => {
                if (selectedCategory !== category) {
                  e.currentTarget.style.backgroundColor = '#d4f1e8';
                }
              }}
              onMouseLeave={(e) => {
                if (selectedCategory !== category) {
                  e.currentTarget.style.backgroundColor = '#fff';
                }
              }}
            >
              {category}
            </button>
          ))}
        </div>
      </section>

      {/* Featured Posts */}
      <section style={{
        padding: '60px 5%',
        maxWidth: '1200px',
        margin: '0 auto'
      }}>
        <h2 style={{
          fontSize: '32px',
          fontWeight: 700,
          color: '#2e2e2e',
          marginBottom: '32px'
        }}>
          Featured Posts
        </h2>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '32px'
        }}>
          {featuredPosts.map((post, index) => (
            <div
              key={index}
              style={{
                backgroundColor: '#d4f1e8',
                borderRadius: '12px',
                overflow: 'hidden',
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
                📰
              </div>

              {/* Content */}
              <div style={{ padding: '24px', backgroundColor: '#fff' }}>
                <div style={{
                  display: 'inline-block',
                  backgroundColor: '#16a085',
                  color: '#fff',
                  padding: '6px 12px',
                  borderRadius: '6px',
                  fontSize: '12px',
                  fontWeight: 700,
                  marginBottom: '12px'
                }}>
                  {post.category}
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
                  alignItems: 'center',
                  marginBottom: '16px'
                }}>
                  <span style={{
                    fontSize: '13px',
                    color: '#999'
                  }}>
                    {post.date}
                  </span>
                  <span style={{
                    fontSize: '13px',
                    color: '#666',
                    fontWeight: 600
                  }}>
                    {post.readTime}
                  </span>
                </div>

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
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section style={{
        padding: '60px 5%',
        maxWidth: '1200px',
        margin: '0 auto'
      }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
          gap: '32px'
        }}>
          {filteredPosts.map((post, index) => (
            <div
              key={index}
              style={{
                backgroundColor: '#d4f1e8',
                borderRadius: '12px',
                overflow: 'hidden',
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
                📝
              </div>

              {/* Content */}
              <div style={{ padding: '24px', backgroundColor: '#fff' }}>
                <div style={{
                  display: 'inline-block',
                  backgroundColor: '#16a085',
                  color: '#fff',
                  padding: '6px 12px',
                  borderRadius: '6px',
                  fontSize: '12px',
                  fontWeight: 700,
                  marginBottom: '12px'
                }}>
                  {post.category}
                </div>

                <h3 style={{
                  fontSize: '18px',
                  fontWeight: 700,
                  color: '#2e2e2e',
                  marginBottom: '12px',
                  lineHeight: 1.3
                }}>
                  {post.title}
                </h3>

                <p style={{
                  fontSize: '14px',
                  color: '#555',
                  lineHeight: 1.6,
                  marginBottom: '16px'
                }}>
                  {post.excerpt}
                </p>

                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: '16px'
                }}>
                  <span style={{
                    fontSize: '13px',
                    color: '#999'
                  }}>
                    {post.date}
                  </span>
                  <span style={{
                    fontSize: '13px',
                    color: '#666',
                    fontWeight: 600
                  }}>
                    {post.readTime}
                  </span>
                </div>

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
              </div>
            </div>
          ))}
        </div>

        {/* More Posts Button */}
        <div style={{ textAlign: 'center', marginTop: '48px' }}>
          <button
            style={{
              padding: '14px 32px',
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

      {/* Newsletter Section */}
      <section style={{
        padding: '80px 5%',
        maxWidth: '1000px',
        margin: '0 auto'
      }}>
        <div style={{
          backgroundColor: '#d4f1e8',
          borderRadius: '16px',
          padding: '60px 40px',
          textAlign: 'center'
        }}>
          <h2 style={{
            fontSize: '36px',
            fontWeight: 700,
            color: '#2e2e2e',
            marginBottom: '16px'
          }}>
            Subscribe to Our Newsletter
          </h2>
          <p style={{
            fontSize: '18px',
            color: '#555',
            marginBottom: '32px',
            lineHeight: 1.6
          }}>
            Get weekly job search tips, career advice, and AI insights delivered to your inbox.
          </p>

          <form onSubmit={handleNewsletterSubmit} style={{
            display: 'flex',
            gap: '12px',
            maxWidth: '500px',
            margin: '0 auto',
            flexWrap: 'wrap',
            justifyContent: 'center'
          }}>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={{
                flex: '1 1 300px',
                padding: '14px',
                fontSize: '16px',
                border: '2px solid #2e2e2e',
                borderRadius: '6px',
                backgroundColor: '#fff'
              }}
            />
            <button
              type="submit"
              style={{
                padding: '14px 32px',
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
              <li style={{ marginBottom: '10px' }}><a href="/role-specific-resumes" style={{ color: '#ccc', textDecoration: 'none' }}>Role-Specific Résumés</a></li>
              <li style={{ marginBottom: '10px' }}><a href="/blog" style={{ color: '#16a085', textDecoration: 'none', fontWeight: 600 }}>Blog</a></li>
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














