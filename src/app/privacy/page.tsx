'use client';

import React from 'react';
import { Navigation } from '@/components/Navigation';

export default function PrivacyPolicyPage() {
  return (
    <div style={{ backgroundColor: '#ebebeb', minHeight: '100vh' }}>
      {/* Navigation */}
      <Navigation currentPage="privacy" />

      {/* Hero Section */}
      <section style={{ 
        padding: '80px 5%', 
        maxWidth: '900px', 
        margin: '0 auto',
        textAlign: 'center'
      }}>
        <h1 style={{ 
          fontSize: '56px', 
          fontWeight: 700, 
          color: '#2e2e2e', 
          marginBottom: '16px',
          lineHeight: 1.2
        }}>
          Privacy Policy
        </h1>
        
        <p style={{ 
          fontSize: '16px', 
          color: '#999', 
          marginBottom: '8px'
        }}>
          Last Updated: January 1, 2025
        </p>
      </section>

      {/* Content */}
      <section style={{
        padding: '0 5% 80px',
        maxWidth: '900px',
        margin: '0 auto'
      }}>
        <div style={{
          backgroundColor: '#fff',
          borderRadius: '16px',
          padding: '48px',
          boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
        }}>
          {/* Introduction */}
          <div style={{ marginBottom: '40px' }}>
            <p style={{
              fontSize: '16px',
              color: '#555',
              lineHeight: 1.8,
              marginBottom: '16px'
            }}>
              At Pyro Solutions Inc. ("PyroINC," "we," "us," or "our"), we are committed to protecting your privacy and ensuring the security of your personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or use our services.
            </p>
            <p style={{
              fontSize: '16px',
              color: '#555',
              lineHeight: 1.8
            }}>
              By using our services, you agree to the collection and use of information in accordance with this policy. If you do not agree with our policies and practices, please do not use our services.
            </p>
          </div>

          {/* Section 1 */}
          <div style={{ marginBottom: '32px' }}>
            <h2 style={{
              fontSize: '24px',
              fontWeight: 700,
              color: '#2e2e2e',
              marginBottom: '16px'
            }}>
              1. Information We Collect
            </h2>
            
            <h3 style={{
              fontSize: '18px',
              fontWeight: 600,
              color: '#2e2e2e',
              marginBottom: '12px',
              marginTop: '20px'
            }}>
              1.1 Personal Information
            </h3>
            <p style={{
              fontSize: '16px',
              color: '#555',
              lineHeight: 1.8,
              marginBottom: '16px'
            }}>
              We collect personal information that you voluntarily provide to us when you:
            </p>
            <ul style={{
              fontSize: '16px',
              color: '#555',
              lineHeight: 1.8,
              marginBottom: '16px',
              paddingLeft: '24px'
            }}>
              <li>Register for an account</li>
              <li>Purchase our services</li>
              <li>Upload your résumé or other career documents</li>
              <li>Communicate with our team</li>
              <li>Subscribe to our newsletter</li>
              <li>Participate in surveys or promotions</li>
            </ul>
            <p style={{
              fontSize: '16px',
              color: '#555',
              lineHeight: 1.8,
              marginBottom: '16px'
            }}>
              This information may include: name, email address, phone number, mailing address, payment information, employment history, education, skills, career goals, LinkedIn profile URL, and any other information you choose to provide.
            </p>

            <h3 style={{
              fontSize: '18px',
              fontWeight: 600,
              color: '#2e2e2e',
              marginBottom: '12px',
              marginTop: '20px'
            }}>
              1.2 Automatically Collected Information
            </h3>
            <p style={{
              fontSize: '16px',
              color: '#555',
              lineHeight: 1.8,
              marginBottom: '16px'
            }}>
              When you visit our website, we automatically collect certain information about your device and browsing activity, including:
            </p>
            <ul style={{
              fontSize: '16px',
              color: '#555',
              lineHeight: 1.8,
              marginBottom: '16px',
              paddingLeft: '24px'
            }}>
              <li>IP address</li>
              <li>Browser type and version</li>
              <li>Operating system</li>
              <li>Pages visited and time spent on pages</li>
              <li>Referring website</li>
              <li>Cookies and similar tracking technologies</li>
            </ul>
          </div>

          {/* Section 2 */}
          <div style={{ marginBottom: '32px' }}>
            <h2 style={{
              fontSize: '24px',
              fontWeight: 700,
              color: '#2e2e2e',
              marginBottom: '16px'
            }}>
              2. How We Use Your Information
            </h2>
            <p style={{
              fontSize: '16px',
              color: '#555',
              lineHeight: 1.8,
              marginBottom: '16px'
            }}>
              We use the information we collect to:
            </p>
            <ul style={{
              fontSize: '16px',
              color: '#555',
              lineHeight: 1.8,
              marginBottom: '16px',
              paddingLeft: '24px'
            }}>
              <li>Provide, operate, and maintain our services</li>
              <li>Process your transactions and manage your account</li>
              <li>Optimize your résumé, cover letters, and LinkedIn profile</li>
              <li>Submit job applications on your behalf</li>
              <li>Provide career coaching and interview preparation</li>
              <li>Communicate with you about our services, updates, and promotions</li>
              <li>Respond to your inquiries and provide customer support</li>
              <li>Improve our website and services</li>
              <li>Analyze usage patterns and trends</li>
              <li>Detect, prevent, and address technical issues or fraudulent activity</li>
              <li>Comply with legal obligations</li>
            </ul>
          </div>

          {/* Section 3 */}
          <div style={{ marginBottom: '32px' }}>
            <h2 style={{
              fontSize: '24px',
              fontWeight: 700,
              color: '#2e2e2e',
              marginBottom: '16px'
            }}>
              3. How We Share Your Information
            </h2>
            <p style={{
              fontSize: '16px',
              color: '#555',
              lineHeight: 1.8,
              marginBottom: '16px'
            }}>
              We do not sell your personal information. We may share your information in the following circumstances:
            </p>
            <ul style={{
              fontSize: '16px',
              color: '#555',
              lineHeight: 1.8,
              marginBottom: '16px',
              paddingLeft: '24px'
            }}>
              <li><strong>With Your Consent:</strong> When you authorize us to submit applications to employers on your behalf.</li>
              <li><strong>Service Providers:</strong> With third-party vendors who perform services on our behalf (e.g., payment processing, email delivery, hosting).</li>
              <li><strong>Legal Requirements:</strong> When required by law, court order, or government regulation.</li>
              <li><strong>Business Transfers:</strong> In connection with a merger, acquisition, or sale of assets.</li>
              <li><strong>Protection of Rights:</strong> To protect our rights, property, or safety, or that of our users or others.</li>
            </ul>
          </div>

          {/* Section 4 */}
          <div style={{ marginBottom: '32px' }}>
            <h2 style={{
              fontSize: '24px',
              fontWeight: 700,
              color: '#2e2e2e',
              marginBottom: '16px'
            }}>
              4. Data Security
            </h2>
            <p style={{
              fontSize: '16px',
              color: '#555',
              lineHeight: 1.8,
              marginBottom: '16px'
            }}>
              We implement industry-standard security measures to protect your personal information, including:
            </p>
            <ul style={{
              fontSize: '16px',
              color: '#555',
              lineHeight: 1.8,
              marginBottom: '16px',
              paddingLeft: '24px'
            }}>
              <li>Encryption of data in transit and at rest</li>
              <li>Secure servers and databases</li>
              <li>Regular security audits and updates</li>
              <li>Access controls and authentication</li>
              <li>Employee training on data protection</li>
            </ul>
            <p style={{
              fontSize: '16px',
              color: '#555',
              lineHeight: 1.8
            }}>
              However, no method of transmission over the internet or electronic storage is 100% secure. While we strive to protect your information, we cannot guarantee absolute security.
            </p>
          </div>

          {/* Section 5 */}
          <div style={{ marginBottom: '32px' }}>
            <h2 style={{
              fontSize: '24px',
              fontWeight: 700,
              color: '#2e2e2e',
              marginBottom: '16px'
            }}>
              5. Your Rights and Choices
            </h2>
            <p style={{
              fontSize: '16px',
              color: '#555',
              lineHeight: 1.8,
              marginBottom: '16px'
            }}>
              Depending on your location, you may have the following rights regarding your personal information:
            </p>
            <ul style={{
              fontSize: '16px',
              color: '#555',
              lineHeight: 1.8,
              marginBottom: '16px',
              paddingLeft: '24px'
            }}>
              <li><strong>Access:</strong> Request a copy of the personal information we hold about you.</li>
              <li><strong>Correction:</strong> Request that we correct inaccurate or incomplete information.</li>
              <li><strong>Deletion:</strong> Request that we delete your personal information, subject to certain exceptions.</li>
              <li><strong>Opt-Out:</strong> Unsubscribe from marketing emails by clicking the "unsubscribe" link.</li>
              <li><strong>Data Portability:</strong> Request a copy of your data in a structured, machine-readable format.</li>
              <li><strong>Objection:</strong> Object to our processing of your personal information for certain purposes.</li>
            </ul>
            <p style={{
              fontSize: '16px',
              color: '#555',
              lineHeight: 1.8
            }}>
              To exercise these rights, please contact us at hello@pyrosolutions.com.
            </p>
          </div>

          {/* Section 6 */}
          <div style={{ marginBottom: '32px' }}>
            <h2 style={{
              fontSize: '24px',
              fontWeight: 700,
              color: '#2e2e2e',
              marginBottom: '16px'
            }}>
              6. Cookies and Tracking Technologies
            </h2>
            <p style={{
              fontSize: '16px',
              color: '#555',
              lineHeight: 1.8,
              marginBottom: '16px'
            }}>
              We use cookies and similar tracking technologies to enhance your experience on our website. Cookies are small data files stored on your device that help us:
            </p>
            <ul style={{
              fontSize: '16px',
              color: '#555',
              lineHeight: 1.8,
              marginBottom: '16px',
              paddingLeft: '24px'
            }}>
              <li>Remember your preferences and settings</li>
              <li>Understand how you use our website</li>
              <li>Improve our services and user experience</li>
              <li>Deliver personalized content and advertisements</li>
            </ul>
            <p style={{
              fontSize: '16px',
              color: '#555',
              lineHeight: 1.8
            }}>
              You can control cookies through your browser settings. However, disabling cookies may affect your ability to use certain features of our website.
            </p>
          </div>

          {/* Section 7 */}
          <div style={{ marginBottom: '32px' }}>
            <h2 style={{
              fontSize: '24px',
              fontWeight: 700,
              color: '#2e2e2e',
              marginBottom: '16px'
            }}>
              7. Third-Party Links
            </h2>
            <p style={{
              fontSize: '16px',
              color: '#555',
              lineHeight: 1.8
            }}>
              Our website may contain links to third-party websites. We are not responsible for the privacy practices or content of these external sites. We encourage you to review the privacy policies of any third-party sites you visit.
            </p>
          </div>

          {/* Section 8 */}
          <div style={{ marginBottom: '32px' }}>
            <h2 style={{
              fontSize: '24px',
              fontWeight: 700,
              color: '#2e2e2e',
              marginBottom: '16px'
            }}>
              8. Children's Privacy
            </h2>
            <p style={{
              fontSize: '16px',
              color: '#555',
              lineHeight: 1.8
            }}>
              Our services are not directed to individuals under the age of 18. We do not knowingly collect personal information from children. If you believe we have collected information from a child, please contact us immediately, and we will take steps to delete such information.
            </p>
          </div>

          {/* Section 9 */}
          <div style={{ marginBottom: '32px' }}>
            <h2 style={{
              fontSize: '24px',
              fontWeight: 700,
              color: '#2e2e2e',
              marginBottom: '16px'
            }}>
              9. International Data Transfers
            </h2>
            <p style={{
              fontSize: '16px',
              color: '#555',
              lineHeight: 1.8
            }}>
              Your information may be transferred to and processed in countries other than your country of residence. These countries may have different data protection laws. By using our services, you consent to the transfer of your information to the United States and other countries where we operate.
            </p>
          </div>

          {/* Section 10 */}
          <div style={{ marginBottom: '32px' }}>
            <h2 style={{
              fontSize: '24px',
              fontWeight: 700,
              color: '#2e2e2e',
              marginBottom: '16px'
            }}>
              10. Changes to This Privacy Policy
            </h2>
            <p style={{
              fontSize: '16px',
              color: '#555',
              lineHeight: 1.8
            }}>
              We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last Updated" date. We encourage you to review this Privacy Policy periodically for any changes.
            </p>
          </div>

          {/* Section 11 */}
          <div style={{ marginBottom: '32px' }}>
            <h2 style={{
              fontSize: '24px',
              fontWeight: 700,
              color: '#2e2e2e',
              marginBottom: '16px'
            }}>
              11. Contact Us
            </h2>
            <p style={{
              fontSize: '16px',
              color: '#555',
              lineHeight: 1.8,
              marginBottom: '16px'
            }}>
              If you have any questions or concerns about this Privacy Policy or our data practices, please contact us:
            </p>
            <div style={{
              backgroundColor: '#f8f8f8',
              padding: '20px',
              borderRadius: '8px',
              fontSize: '16px',
              color: '#555',
              lineHeight: 1.8
            }}>
              <strong>Pyro Solutions Inc.</strong><br />
              123 Innovation Drive<br />
              San Francisco, CA 94105<br />
              United States<br /><br />
              Email: <a href="mailto:hello@pyrosolutions.com" style={{ color: '#16a085', textDecoration: 'none' }}>hello@pyrosolutions.com</a><br />
              Phone: <a href="tel:+15551234567" style={{ color: '#16a085', textDecoration: 'none' }}>+1 (555) 123-4567</a>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section style={{
        padding: '60px 5%',
        maxWidth: '900px',
        margin: '0 auto 80px'
      }}>
        <div style={{
          backgroundColor: '#d4f1e8',
          borderRadius: '16px',
          padding: '48px 32px',
          textAlign: 'center'
        }}>
          <h2 style={{
            fontSize: '28px',
            fontWeight: 700,
            color: '#2e2e2e',
            marginBottom: '16px'
          }}>
            Have Questions About Our Privacy Practices?
          </h2>
          <p style={{
            fontSize: '18px',
            color: '#555',
            marginBottom: '24px'
          }}>
            We're here to help. Contact our team for more information.
          </p>
          <a
            href="/contact"
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
            Contact Us
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ 
        backgroundColor: '#2e2e2e', 
        color: '#fff', 
        padding: '60px 5% 30px'
      }}>
        <div style={{ 
          maxWidth: '1200px', 
          margin: '0 auto',
          textAlign: 'center'
        }}>
          <p style={{ margin: 0, fontSize: '14px', color: '#999' }}>
            © 2025 Pyro Solutions Inc. All rights reserved.
          </p>
          <div style={{ display: 'flex', gap: '20px', justifyContent: 'center', marginTop: '16px' }}>
            <a href="/privacy" style={{ fontSize: '14px', color: '#16a085', textDecoration: 'none', fontWeight: 600 }}>Privacy Policy</a>
            <a href="/terms" style={{ fontSize: '14px', color: '#999', textDecoration: 'none' }}>Terms & Conditions</a>
            <a href="/contact" style={{ fontSize: '14px', color: '#999', textDecoration: 'none' }}>Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
}














