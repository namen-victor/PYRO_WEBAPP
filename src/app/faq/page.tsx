'use client';

import React, { useState } from 'react';
import { Navigation } from '@/components/Navigation';

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqCategories = [
    {
      category: 'General Questions',
      questions: [
        {
          question: 'What is PyroINC and how does it work?',
          answer: 'PyroINC is a human-led job application service that helps job seekers land their dream roles. Unlike automated bots, our team of career specialists personally reviews your profile, optimizes your materials, submits tailored applications, and coaches you through interviews. We combine expert guidance with strategic outreach to maximize your chances of success.'
        },
        {
          question: 'How is PyroINC different from other job search services?',
          answer: 'PyroINC stands out because we use real human specialists, not bots. Every application is personally crafted and submitted by our team. We provide one-on-one coaching, strategic career guidance, and continuous support throughout your job search. Our 90% interview rate and 3.2-month average time to offer speak to our effectiveness.'
        },
        {
          question: 'Who are the PyroINC specialists?',
          answer: 'Our team consists of experienced recruiters, hiring managers, and career coaches from top companies like Google, Amazon, Microsoft, and Goldman Sachs. They understand what employers look for and know how to position candidates for success.'
        }
      ]
    },
    {
      category: 'Services & Pricing',
      questions: [
        {
          question: 'What services does PyroINC offer?',
          answer: 'We offer Career Consulting, Résumé Revision, Cover Letter Revision, LinkedIn Profile Revision, Job Search Strategies, Full-Service Apply to Jobs, Interview Prep, and Service Bundles. Each service is designed to address specific aspects of the job search process.'
        },
        {
          question: 'How much do your services cost?',
          answer: 'Pricing varies by service and experience level. Individual services range from $149 to $599. Our bundles offer better value: Starter Bundle ($799), Land the Job Bundle ($1,499), and Ultimate Bundle with Job Offer Guarantee ($2,999-$4,999). We also offer payment plans with 4 installments over 2 months.'
        },
        {
          question: 'Do you offer payment plans?',
          answer: 'Yes! We offer flexible payment plans that allow you to pay in 4 installments over 2 months. This makes our services more accessible while you focus on landing your dream job. Payment plan availability varies by country.'
        },
        {
          question: 'Can I purchase multiple services together?',
          answer: 'Absolutely! Our Service Bundles combine multiple services at a discounted rate. The Starter Bundle includes résumé and LinkedIn optimization. The Land the Job Bundle adds full-service applications. The Ultimate Bundle includes everything plus our Job Offer Guarantee.'
        }
      ]
    },
    {
      category: 'Job Offer Guarantee',
      questions: [
        {
          question: 'What is the Job Offer Guarantee?',
          answer: 'Our Job Offer Guarantee ensures you receive a job offer within 120 days, or we refund your money. This guarantee is included with our Ultimate Bundle and demonstrates our confidence in our human-led approach.'
        },
        {
          question: 'What are the requirements for the guarantee?',
          answer: 'To qualify, you must: (1) Complete all onboarding steps within 7 days, (2) Respond to our team within 24 hours, (3) Apply to at least 50 roles we recommend, (4) Attend all scheduled coaching sessions, and (5) Follow our interview preparation guidance. Full terms are provided at purchase.'
        },
        {
          question: 'How does the refund process work?',
          answer: 'If you meet all guarantee requirements and don\'t receive a job offer within 120 days, we\'ll refund 100% of your Ultimate Bundle fee. Simply submit a refund request with documentation of your compliance, and we\'ll process it within 14 business days.'
        },
        {
          question: 'What types of roles are covered by the guarantee?',
          answer: 'The guarantee covers full-time professional roles in your target industry and experience level. It does not cover contract, part-time, or gig positions. We work with you to define realistic target roles based on your background and market conditions.'
        }
      ]
    },
    {
      category: 'Process & Timeline',
      questions: [
        {
          question: 'How long does it take to see results?',
          answer: 'Most clients start receiving interview requests within 2-4 weeks of starting our services. On average, clients land job offers within 3.2 months. However, timelines vary based on your experience level, target industry, and market conditions.'
        },
        {
          question: 'What is the onboarding process like?',
          answer: 'After purchase, you\'ll upload your current résumé and complete a detailed questionnaire about your career goals. Within 1-2 business days, a specialist will contact you to schedule a kickoff call. During this call, we\'ll review your materials, discuss your target roles, and create your personalized job search strategy.'
        },
        {
          question: 'How often will I communicate with my specialist?',
          answer: 'Communication frequency depends on your service. Full-Service Apply clients typically have weekly check-ins and receive daily application updates. Career Consulting clients have bi-weekly coaching sessions. All clients have access to our chat platform for questions and updates.'
        },
        {
          question: 'Can I pause my service if I need to?',
          answer: 'Yes, you can pause most services for up to 30 days if needed (e.g., for personal reasons or to evaluate current opportunities). Simply contact your specialist or our support team. Note that pausing may affect guarantee timelines.'
        }
      ]
    },
    {
      category: 'International & Visa Clients',
      questions: [
        {
          question: 'Do you work with international clients?',
          answer: 'Yes! We help clients worldwide, including those seeking roles in the US, Canada, UK, Europe, and other regions. Our specialists understand visa requirements and can help position you for roles that sponsor international candidates.'
        },
        {
          question: 'Can you help with visa sponsorship applications?',
          answer: 'While we don\'t provide legal immigration advice, we help you target companies known for sponsoring visas (H-1B, TN, etc.) and optimize your materials to address common concerns employers have about international candidates. We recommend consulting an immigration attorney for specific visa questions.'
        },
        {
          question: 'What if English is not my first language?',
          answer: 'Our specialists are experienced working with non-native English speakers. We\'ll help refine your résumé, cover letters, and interview responses to ensure they\'re clear, professional, and compelling. Many of our success stories come from international clients.'
        }
      ]
    },
    {
      category: 'Technical & Account',
      questions: [
        {
          question: 'How do I access my account?',
          answer: 'After signing up, you\'ll receive login credentials via email. Log in at pyrosolutions.com/login to access your dashboard, where you can view application progress, message your specialist, upload documents, and schedule sessions.'
        },
        {
          question: 'Is my information secure?',
          answer: 'Absolutely. We use industry-standard encryption to protect your personal information and career documents. We never share your information with third parties without your explicit consent. Read our Privacy Policy for full details.'
        },
        {
          question: 'Can I cancel my service?',
          answer: 'You can cancel within 7 days of purchase for a full refund if no work has been completed. After that, refunds are evaluated on a case-by-case basis depending on the service and work completed. The Job Offer Guarantee has specific refund terms outlined in the agreement.'
        },
        {
          question: 'What if I\'m not satisfied with the service?',
          answer: 'Your satisfaction is our priority. If you\'re not happy with any deliverable, we\'ll revise it until you\'re satisfied. If issues persist, contact our support team at hello@pyrosolutions.com, and we\'ll work to resolve them promptly.'
        }
      ]
    }
  ];

  return (
    <div style={{ backgroundColor: '#ebebeb', minHeight: '100vh' }}>
      {/* Navigation */}
      <Navigation currentPage="faq" />

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
          Frequently Asked Questions
        </h1>
        
        <p style={{ 
          fontSize: '20px', 
          color: '#555', 
          marginBottom: '48px',
          lineHeight: 1.6,
          maxWidth: '800px',
          margin: '0 auto'
        }}>
          Find answers to common questions about PyroINC's services, pricing, and process.
        </p>
      </section>

      {/* FAQ Categories */}
      <section style={{
        padding: '0 5% 80px',
        maxWidth: '900px',
        margin: '0 auto'
      }}>
        {faqCategories.map((category, categoryIndex) => (
          <div key={categoryIndex} style={{ marginBottom: '48px' }}>
            <h2 style={{
              fontSize: '28px',
              fontWeight: 700,
              color: '#2e2e2e',
              marginBottom: '24px',
              paddingBottom: '12px',
              borderBottom: '3px solid #16a085'
            }}>
              {category.category}
            </h2>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {category.questions.map((item, questionIndex) => {
                const globalIndex = categoryIndex * 100 + questionIndex;
                const isOpen = openIndex === globalIndex;

                return (
                  <div
                    key={questionIndex}
                    style={{
                      backgroundColor: '#fff',
                      borderRadius: '12px',
                      overflow: 'hidden',
                      boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
                      transition: 'all 0.3s ease'
                    }}
                  >
                    <button
                      onClick={() => setOpenIndex(isOpen ? null : globalIndex)}
                      style={{
                        width: '100%',
                        padding: '20px 24px',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        backgroundColor: isOpen ? '#d4f1e8' : '#fff',
                        border: 'none',
                        cursor: 'pointer',
                        textAlign: 'left',
                        transition: 'all 0.3s ease'
                      }}
                      onMouseEnter={(e) => {
                        if (!isOpen) {
                          e.currentTarget.style.backgroundColor = '#f8f8f8';
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (!isOpen) {
                          e.currentTarget.style.backgroundColor = '#fff';
                        }
                      }}
                    >
                      <span style={{
                        fontSize: '18px',
                        fontWeight: 600,
                        color: '#2e2e2e',
                        flex: 1,
                        paddingRight: '16px'
                      }}>
                        {item.question}
                      </span>
                      <span style={{
                        fontSize: '24px',
                        color: '#16a085',
                        fontWeight: 700,
                        transition: 'transform 0.3s ease',
                        transform: isOpen ? 'rotate(45deg)' : 'rotate(0deg)'
                      }}>
                        +
                      </span>
                    </button>

                    {isOpen && (
                      <div style={{
                        padding: '20px 24px',
                        backgroundColor: '#fff',
                        borderTop: '1px solid #ebebeb'
                      }}>
                        <p style={{
                          fontSize: '16px',
                          color: '#555',
                          lineHeight: 1.7,
                          margin: 0
                        }}>
                          {item.answer}
                        </p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </section>

      {/* Still Have Questions Section */}
      <section style={{
        padding: '80px 5%',
        maxWidth: '1000px',
        margin: '0 auto'
      }}>
        <div style={{
          backgroundColor: '#fff',
          borderRadius: '16px',
          padding: '60px 40px',
          textAlign: 'center',
          boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
        }}>
          <h2 style={{
            fontSize: '36px',
            fontWeight: 700,
            color: '#2e2e2e',
            marginBottom: '16px'
          }}>
            Still Have Questions?
          </h2>
          <p style={{
            fontSize: '18px',
            color: '#555',
            marginBottom: '32px',
            lineHeight: 1.6
          }}>
            Our team is here to help! Reach out and we'll get back to you within 24 hours.
          </p>

          <div style={{
            display: 'flex',
            gap: '16px',
            justifyContent: 'center',
            flexWrap: 'wrap'
          }}>
            <a
              href="/contact"
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
              Contact Us
            </a>

            <a
              href="/guarantee"
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
              Book Free Consultation
            </a>
          </div>

          <p style={{
            fontSize: '14px',
            color: '#999',
            marginTop: '24px'
          }}>
            Email: hello@pyrosolutions.com | Phone: +1 (555) 123-4567
          </p>
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
              <li style={{ marginBottom: '10px' }}><a href="/faq" style={{ color: '#16a085', textDecoration: 'none', fontWeight: 600 }}>FAQ</a></li>
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
              <li style={{ marginBottom: '10px', color: '#ccc' }}>hello@pyrosolutions.com</li>
              <li style={{ marginBottom: '10px', color: '#ccc' }}>+1 (555) 123-4567</li>
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














