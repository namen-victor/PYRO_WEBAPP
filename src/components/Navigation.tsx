'use client';

import { Logo } from '@/components/Logo';
import { useState, useEffect } from 'react';
import { onAuthStateChange, logout, type User } from '@/lib/auth';
import { useRouter } from 'next/navigation';

interface NavigationProps {
  currentPage?: 'home' | 'services' | 'guarantee' | 'success-stories' | 'stories' | 'plans' | 'resources' | 'company' | 'about' | 'employers' | 'resume-template' | 'cover-letter-template' | 'free-resume-feedback' | 'networking-tracker' | 'interview-prep-template' | 'job-search-hub' | 'role-specific-resumes' | 'blog' | 'faq' | 'contact' | 'privacy' | 'terms' | 'career-consulting' | 'resume-revision' | 'cover-letter-revision' | 'linkedin-profile-revision' | 'job-search-strategies' | 'full-service-apply' | 'interview-prep' | 'bundles' | 'partnerships' | 'press' | 'careers';
}

export function Navigation({ currentPage }: NavigationProps) {
  const [servicesOpen, setServicesOpen] = useState(false);
  const [individualServicesOpen, setIndividualServicesOpen] = useState(false);
  const [resourcesOpen, setResourcesOpen] = useState(false);
  const [pyroAIOpen, setPyroAIOpen] = useState(false);
  const [aboutOpen, setAboutOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const colors = {
    accent: '#7aa3a1',
    white: '#FFFFFF',
    dark: '#2e2e2e',
    error: '#ef4444'
  };

  const maxw: React.CSSProperties = { maxWidth: 1200, margin: '0 auto' };
  const cta: React.CSSProperties = { display: 'inline-block', padding: '10px 20px', background: colors.accent, color: colors.white, borderRadius: 6, textDecoration: 'none', fontWeight: 700, fontSize: 14 };

  const dropdownStyle: React.CSSProperties = {
    position: 'absolute',
    top: '100%',
    left: 0,
    background: colors.white,
    border: '1px solid #e0e0e0',
    borderRadius: 8,
    paddingTop: 12,
    marginTop: 0,
    minWidth: 220,
    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
    zIndex: 100
  };

  const dropdownItemStyle: React.CSSProperties = {
    display: 'block',
    padding: '12px 20px',
    color: colors.dark,
    textDecoration: 'none',
    fontSize: 15,
    transition: 'background 0.2s',
    fontWeight: 500
  };

  const navLinkStyle: React.CSSProperties = {
    color: colors.dark,
    textDecoration: 'none',
    fontSize: 15,
    fontWeight: 500,
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    gap: 4
  };

  // Listen for auth state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChange((user) => {
      setUser(user);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  // Handle logout
  const handleLogout = async () => {
    try {
      await logout();
      router.push('/');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  // Get dashboard URL based on user role
  const getDashboardUrl = (user: User) => {
    switch (user.role) {
      case 'admin':
        return '/admin/dashboard';
      case 'staff':
        return '/staff/dashboard';
      case 'client':
        return '/dashboard';
      default:
        return '/dashboard';
    }
  };

  return (
    <>
      <style>{`
        @media (max-width: 1024px) {
          .desktop-nav {
            display: none !important;
          }
          .mobile-menu-btn {
            display: block !important;
          }
          .mobile-menu {
            display: ${mobileMenuOpen ? 'flex' : 'none'} !important;
          }
        }
        @media (min-width: 1025px) {
          .mobile-menu-btn {
            display: none !important;
          }
          .mobile-menu {
            display: none !important;
          }
        }
      `}</style>
      
      <nav style={{ position: 'sticky', top: 0, zIndex: 50, background: colors.white, color: colors.dark, borderBottom: '1px solid #e0e0e0' }}>
        <div style={{ ...maxw, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 16px' }}>
          <a href="/" style={{ display: 'flex', alignItems: 'center', gap: 10, color: 'inherit', textDecoration: 'none' }}>
            <Logo size="sm" />
          </a>
          
          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="mobile-menu-btn"
            style={{
              background: 'none',
              border: 'none',
              fontSize: 28,
              cursor: 'pointer',
              padding: 8,
              color: colors.dark,
              display: 'none'
            }}
          >
            {mobileMenuOpen ? '✕' : '☰'}
          </button>
          
          {/* Desktop Navigation */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 24 }} className="desktop-nav">
            {/* Services */}
            <div 
              style={{ position: 'relative' }}
              onMouseEnter={() => setServicesOpen(true)}
              onMouseLeave={() => setServicesOpen(false)}
            >
              <a href="/services" style={navLinkStyle}>
                Services
              </a>
            </div>

            {/* Job Offer Guarantee */}
            <a href="/guarantee" style={navLinkStyle}>Job Offer Guarantee</a>

            {/* Success Stories */}
            <a href="/success-stories" style={navLinkStyle}>Success Stories</a>

            {/* Individual Services Dropdown */}
            <div 
              style={{ position: 'relative', paddingTop: 8, paddingBottom: 8 }}
              onMouseEnter={() => setIndividualServicesOpen(true)}
              onMouseLeave={() => setIndividualServicesOpen(false)}
            >
              <span style={navLinkStyle}>
                Individual Services
                <span style={{ fontSize: 12 }}>▼</span>
              </span>
              
              {individualServicesOpen && (
                <div style={{...dropdownStyle, marginTop: -8}}>
                  <a href="/career-consulting" style={dropdownItemStyle} onMouseEnter={(e) => e.currentTarget.style.background = '#f5f5f5'} onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}>Career Consulting</a>
                  <a href="/resume-revision" style={dropdownItemStyle} onMouseEnter={(e) => e.currentTarget.style.background = '#f5f5f5'} onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}>Resume Revision</a>
                  <a href="/cover-letter-revision" style={dropdownItemStyle} onMouseEnter={(e) => e.currentTarget.style.background = '#f5f5f5'} onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}>Cover Letter Revision</a>
                  <a href="/linkedin-profile-revision" style={dropdownItemStyle} onMouseEnter={(e) => e.currentTarget.style.background = '#f5f5f5'} onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}>LinkedIn Profile Revision</a>
                  <a href="/job-search-strategies" style={dropdownItemStyle} onMouseEnter={(e) => e.currentTarget.style.background = '#f5f5f5'} onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}>Job Search Strategies</a>
                  <a href="/full-service-apply" style={dropdownItemStyle} onMouseEnter={(e) => e.currentTarget.style.background = '#f5f5f5'} onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}>Full-Service Apply to Jobs</a>
                  <a href="/interview-prep" style={dropdownItemStyle} onMouseEnter={(e) => e.currentTarget.style.background = '#f5f5f5'} onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}>Interview Prep</a>
                  <a href="/bundles" style={dropdownItemStyle} onMouseEnter={(e) => e.currentTarget.style.background = '#f5f5f5'} onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}>Service Bundles</a>
                </div>
              )}
            </div>

            {/* Resources Dropdown */}
            <div 
              style={{ position: 'relative', paddingTop: 8, paddingBottom: 8 }}
              onMouseEnter={() => setResourcesOpen(true)}
              onMouseLeave={() => setResourcesOpen(false)}
            >
              <span style={navLinkStyle}>
                Resources
                <span style={{ fontSize: 12 }}>▼</span>
              </span>
              
              {resourcesOpen && (
                <div style={{...dropdownStyle, marginTop: -8}}>
                  <a href="/resources" style={dropdownItemStyle} onMouseEnter={(e) => e.currentTarget.style.background = '#f5f5f5'} onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}>Resource Library</a>
                  <a href="/resume-template" style={dropdownItemStyle} onMouseEnter={(e) => e.currentTarget.style.background = '#f5f5f5'} onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}>Resume Template</a>
                  <a href="/cover-letter-template" style={dropdownItemStyle} onMouseEnter={(e) => e.currentTarget.style.background = '#f5f5f5'} onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}>Cover Letter Template</a>
                  <a href="/free-resume-feedback" style={dropdownItemStyle} onMouseEnter={(e) => e.currentTarget.style.background = '#f5f5f5'} onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}>Free Resume Feedback</a>
                  <a href="/networking-tracker" style={dropdownItemStyle} onMouseEnter={(e) => e.currentTarget.style.background = '#f5f5f5'} onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}>Networking Tracker</a>
                  <a href="/interview-prep-template" style={dropdownItemStyle} onMouseEnter={(e) => e.currentTarget.style.background = '#f5f5f5'} onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}>Interview Prep Template</a>
                  <a href="/job-search-hub" style={dropdownItemStyle} onMouseEnter={(e) => e.currentTarget.style.background = '#f5f5f5'} onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}>Job Search Hub</a>
                  <a href="/role-specific-resumes" style={dropdownItemStyle} onMouseEnter={(e) => e.currentTarget.style.background = '#f5f5f5'} onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}>Role-Specific Resumes</a>
                  <a href="/blog" style={dropdownItemStyle} onMouseEnter={(e) => e.currentTarget.style.background = '#f5f5f5'} onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}>Blog</a>
                </div>
              )}
            </div>

            {/* PyroAI Dropdown */}
            <div 
              style={{ position: 'relative', paddingTop: 8, paddingBottom: 8 }}
              onMouseEnter={() => setPyroAIOpen(true)}
              onMouseLeave={() => setPyroAIOpen(false)}
            >
              <span style={navLinkStyle}>
                PyroAI
                <span style={{ fontSize: 12 }}>▼</span>
              </span>
              
              {pyroAIOpen && (
                <div style={{...dropdownStyle, marginTop: -8}}>
                  <a href="#home" style={dropdownItemStyle} onMouseEnter={(e) => e.currentTarget.style.background = '#f5f5f5'} onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}>PyroAI Home</a>
                  <a href="#resumai" style={dropdownItemStyle} onMouseEnter={(e) => e.currentTarget.style.background = '#f5f5f5'} onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}>ResumeAI</a>
                  <a href="#jobboardai" style={dropdownItemStyle} onMouseEnter={(e) => e.currentTarget.style.background = '#f5f5f5'} onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}>JobBoardAI</a>
                  <a href="#networkai" style={dropdownItemStyle} onMouseEnter={(e) => e.currentTarget.style.background = '#f5f5f5'} onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}>NetworkAI</a>
                  <a href="#interviewai" style={dropdownItemStyle} onMouseEnter={(e) => e.currentTarget.style.background = '#f5f5f5'} onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}>InterviewAI</a>
                  <a href="#jobtrackerai" style={dropdownItemStyle} onMouseEnter={(e) => e.currentTarget.style.background = '#f5f5f5'} onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}>JobTrackerAI</a>
                  <a href="#coverlettrai" style={dropdownItemStyle} onMouseEnter={(e) => e.currentTarget.style.background = '#f5f5f5'} onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}>CoverLetterAI</a>
                </div>
              )}
            </div>

            {/* About Dropdown */}
            <div 
              style={{ position: 'relative', paddingTop: 8, paddingBottom: 8 }}
              onMouseEnter={() => setAboutOpen(true)}
              onMouseLeave={() => setAboutOpen(false)}
            >
              <span style={navLinkStyle}>
                About
                <span style={{ fontSize: 12 }}>▼</span>
              </span>
              
              {aboutOpen && (
                <div style={{...dropdownStyle, marginTop: -8}}>
                  <a href="/about" style={dropdownItemStyle} onMouseEnter={(e) => e.currentTarget.style.background = '#f5f5f5'} onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}>About Us</a>
                  <a href="/faq" style={dropdownItemStyle} onMouseEnter={(e) => e.currentTarget.style.background = '#f5f5f5'} onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}>FAQ</a>
                  <a href="/contact" style={dropdownItemStyle} onMouseEnter={(e) => e.currentTarget.style.background = '#f5f5f5'} onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}>Contact Us</a>
                </div>
              )}
            </div>

            {/* Get Started / Dashboard & Logout Buttons */}
            {user ? (
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <a 
                  href={getDashboardUrl(user)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: 40,
                    height: 40,
                    backgroundColor: colors.accent,
                    color: colors.white,
                    borderRadius: 6,
                    textDecoration: 'none',
                    fontSize: 18,
                    transition: 'all 0.2s',
                    border: 'none',
                    cursor: 'pointer'
                  }}
                  onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#5a8a87'}
                  onMouseOut={(e) => e.currentTarget.style.backgroundColor = colors.accent}
                  title={`Go to ${user.role} dashboard`}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <rect x="3" y="3" width="7" height="7" rx="1"/>
                    <rect x="14" y="3" width="7" height="7" rx="1"/>
                    <rect x="3" y="14" width="7" height="7" rx="1"/>
                    <rect x="14" y="14" width="7" height="7" rx="1"/>
                  </svg>
                </a>
                <button onClick={handleLogout} style={{...cta, border: 'none', cursor: 'pointer'}}>
                  Logout
                </button>
              </div>
            ) : (
              <a href="/signup" style={cta}>Get Started</a>
            )}
          </div>
        </div>

        {/* Mobile Menu */}
        <div 
          className="mobile-menu"
          style={{
            display: 'none',
            flexDirection: 'column',
            width: '100%',
            background: colors.white,
            borderTop: '1px solid #e0e0e0',
            maxHeight: '80vh',
            overflowY: 'auto'
          }}
        >
          <a href="/services" style={{ padding: '16px 20px', borderBottom: '1px solid #f0f0f0', color: colors.dark, textDecoration: 'none', fontWeight: 500 }}>Services</a>
          <a href="/guarantee" style={{ padding: '16px 20px', borderBottom: '1px solid #f0f0f0', color: colors.dark, textDecoration: 'none', fontWeight: 500 }}>Job Offer Guarantee</a>
          <a href="/success-stories" style={{ padding: '16px 20px', borderBottom: '1px solid #f0f0f0', color: colors.dark, textDecoration: 'none', fontWeight: 500 }}>Success Stories</a>
          
          {/* Mobile Individual Services */}
          <div style={{ borderBottom: '1px solid #f0f0f0' }}>
            <div 
              onClick={() => setIndividualServicesOpen(!individualServicesOpen)}
              style={{ padding: '16px 20px', fontWeight: 500, cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
            >
              Individual Services
              <span style={{ fontSize: 12 }}>{individualServicesOpen ? '▲' : '▼'}</span>
            </div>
            {individualServicesOpen && (
              <div style={{ background: '#f8f8f8' }}>
                <a href="/career-consulting" style={{ padding: '12px 20px 12px 40px', display: 'block', color: colors.dark, textDecoration: 'none', fontSize: 14 }}>Career Consulting</a>
                <a href="/resume-revision" style={{ padding: '12px 20px 12px 40px', display: 'block', color: colors.dark, textDecoration: 'none', fontSize: 14 }}>Resume Revision</a>
                <a href="/cover-letter-revision" style={{ padding: '12px 20px 12px 40px', display: 'block', color: colors.dark, textDecoration: 'none', fontSize: 14 }}>Cover Letter Revision</a>
                <a href="/linkedin-profile-revision" style={{ padding: '12px 20px 12px 40px', display: 'block', color: colors.dark, textDecoration: 'none', fontSize: 14 }}>LinkedIn Profile Revision</a>
                <a href="/job-search-strategies" style={{ padding: '12px 20px 12px 40px', display: 'block', color: colors.dark, textDecoration: 'none', fontSize: 14 }}>Job Search Strategies</a>
                <a href="/full-service-apply" style={{ padding: '12px 20px 12px 40px', display: 'block', color: colors.dark, textDecoration: 'none', fontSize: 14 }}>Full-Service Apply</a>
                <a href="/interview-prep" style={{ padding: '12px 20px 12px 40px', display: 'block', color: colors.dark, textDecoration: 'none', fontSize: 14 }}>Interview Prep</a>
                <a href="/bundles" style={{ padding: '12px 20px 12px 40px', display: 'block', color: colors.dark, textDecoration: 'none', fontSize: 14 }}>Service Bundles</a>
              </div>
            )}
          </div>

          {/* Mobile Resources */}
          <div style={{ borderBottom: '1px solid #f0f0f0' }}>
            <div 
              onClick={() => setResourcesOpen(!resourcesOpen)}
              style={{ padding: '16px 20px', fontWeight: 500, cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
            >
              Resources
              <span style={{ fontSize: 12 }}>{resourcesOpen ? '▲' : '▼'}</span>
            </div>
            {resourcesOpen && (
              <div style={{ background: '#f8f8f8' }}>
                <a href="/resources" style={{ padding: '12px 20px 12px 40px', display: 'block', color: colors.dark, textDecoration: 'none', fontSize: 14 }}>Resource Library</a>
                <a href="/resume-template" style={{ padding: '12px 20px 12px 40px', display: 'block', color: colors.dark, textDecoration: 'none', fontSize: 14 }}>Resume Template</a>
                <a href="/cover-letter-template" style={{ padding: '12px 20px 12px 40px', display: 'block', color: colors.dark, textDecoration: 'none', fontSize: 14 }}>Cover Letter Template</a>
                <a href="/free-resume-feedback" style={{ padding: '12px 20px 12px 40px', display: 'block', color: colors.dark, textDecoration: 'none', fontSize: 14 }}>Free Resume Feedback</a>
                <a href="/networking-tracker" style={{ padding: '12px 20px 12px 40px', display: 'block', color: colors.dark, textDecoration: 'none', fontSize: 14 }}>Networking Tracker</a>
                <a href="/interview-prep-template" style={{ padding: '12px 20px 12px 40px', display: 'block', color: colors.dark, textDecoration: 'none', fontSize: 14 }}>Interview Prep Template</a>
                <a href="/job-search-hub" style={{ padding: '12px 20px 12px 40px', display: 'block', color: colors.dark, textDecoration: 'none', fontSize: 14 }}>Job Search Hub</a>
                <a href="/role-specific-resumes" style={{ padding: '12px 20px 12px 40px', display: 'block', color: colors.dark, textDecoration: 'none', fontSize: 14 }}>Role-Specific Resumes</a>
                <a href="/blog" style={{ padding: '12px 20px 12px 40px', display: 'block', color: colors.dark, textDecoration: 'none', fontSize: 14 }}>Blog</a>
              </div>
            )}
          </div>

          {/* Mobile About */}
          <div style={{ borderBottom: '1px solid #f0f0f0' }}>
            <div 
              onClick={() => setAboutOpen(!aboutOpen)}
              style={{ padding: '16px 20px', fontWeight: 500, cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
            >
              About
              <span style={{ fontSize: 12 }}>{aboutOpen ? '▲' : '▼'}</span>
            </div>
            {aboutOpen && (
              <div style={{ background: '#f8f8f8' }}>
                <a href="/about" style={{ padding: '12px 20px 12px 40px', display: 'block', color: colors.dark, textDecoration: 'none', fontSize: 14 }}>About Us</a>
                <a href="/faq" style={{ padding: '12px 20px 12px 40px', display: 'block', color: colors.dark, textDecoration: 'none', fontSize: 14 }}>FAQ</a>
                <a href="/contact" style={{ padding: '12px 20px 12px 40px', display: 'block', color: colors.dark, textDecoration: 'none', fontSize: 14 }}>Contact Us</a>
              </div>
            )}
          </div>

          {user ? (
            <div style={{ padding: '16px 20px', display: 'flex', gap: 12 }}>
              <a 
                href={getDashboardUrl(user)}
                style={{
                  flex: 1,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 8,
                  padding: '12px 16px',
                  backgroundColor: colors.accent,
                  color: colors.white,
                  textDecoration: 'none',
                  borderRadius: 6,
                  fontSize: 14,
                  fontWeight: 600,
                  transition: 'all 0.2s'
                }}
                onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#5a8a87'}
                onMouseOut={(e) => e.currentTarget.style.backgroundColor = colors.accent}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <rect x="3" y="3" width="7" height="7" rx="1"/>
                  <rect x="14" y="3" width="7" height="7" rx="1"/>
                  <rect x="3" y="14" width="7" height="7" rx="1"/>
                  <rect x="14" y="14" width="7" height="7" rx="1"/>
                </svg>
                Dashboard
              </a>
              <button 
                onClick={handleLogout} 
                style={{ 
                  flex: 1,
                  padding: '12px 16px',
                  backgroundColor: colors.error,
                  color: 'white',
                  border: 'none',
                  borderRadius: 6,
                  cursor: 'pointer',
                  fontSize: 14,
                  fontWeight: 600,
                  transition: 'all 0.2s'
                }}
                onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#dc2626'}
                onMouseOut={(e) => e.currentTarget.style.backgroundColor = colors.error}
              >
                Logout
              </button>
            </div>
          ) : (
            <a href="/signup" style={{ ...cta, margin: '16px 20px', textAlign: 'center' }}>Get Started</a>
          )}
        </div>
      </nav>
    </>
  );
}
