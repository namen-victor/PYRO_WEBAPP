'use client';

import React from 'react';
import { Navigation } from '@/components/Navigation';

export default function TermsPage() {
  return (
    <div style={{ backgroundColor: '#ebebeb', minHeight: '100vh' }}>
      {/* Navigation */}
      <Navigation currentPage="terms" />

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
          Terms & Conditions
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
              Welcome to Pyro Solutions Inc. ("PyroINC," "we," "us," or "our"). These Terms and Conditions ("Terms") govern your access to and use of our website, services, and products. By accessing or using our services, you agree to be bound by these Terms.
            </p>
            <p style={{
              fontSize: '16px',
              color: '#555',
              lineHeight: 1.8
            }}>
              Please read these Terms carefully before using our services. If you do not agree with any part of these Terms, you must not use our services.
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
              1. Services Overview
            </h2>
            <p style={{
              fontSize: '16px',
              color: '#555',
              lineHeight: 1.8,
              marginBottom: '16px'
            }}>
              PyroINC provides human-led job application services, including but not limited to:
            </p>
            <ul style={{
              fontSize: '16px',
              color: '#555',
              lineHeight: 1.8,
              marginBottom: '16px',
              paddingLeft: '24px'
            }}>
              <li>Career consulting and coaching</li>
              <li>Résumé, cover letter, and LinkedIn profile revision</li>
              <li>Job search strategies and guidance</li>
              <li>Full-service job application submission</li>
              <li>Interview preparation and coaching</li>
              <li>Service bundles with job offer guarantees</li>
            </ul>
            <p style={{
              fontSize: '16px',
              color: '#555',
              lineHeight: 1.8
            }}>
              Our services are designed to assist job seekers in their career advancement. We do not guarantee employment outcomes unless explicitly stated in a Job Offer Guarantee agreement.
            </p>
          </div>

          {/* Section 2 */}
          <div style={{ marginBottom: '32px' }}>
            <h2 style={{
              fontSize: '24px',
              fontWeight: 700,
              color: '#2e2e2e',
              marginBottom: '16px'
            }}>
              2. Account Registration
            </h2>
            <p style={{
              fontSize: '16px',
              color: '#555',
              lineHeight: 1.8,
              marginBottom: '16px'
            }}>
              To use our services, you must create an account and provide accurate, complete information. You are responsible for:
            </p>
            <ul style={{
              fontSize: '16px',
              color: '#555',
              lineHeight: 1.8,
              marginBottom: '16px',
              paddingLeft: '24px'
            }}>
              <li>Maintaining the confidentiality of your account credentials</li>
              <li>All activities that occur under your account</li>
              <li>Notifying us immediately of any unauthorized use</li>
              <li>Ensuring your account information remains current and accurate</li>
            </ul>
            <p style={{
              fontSize: '16px',
              color: '#555',
              lineHeight: 1.8
            }}>
              You must be at least 18 years old to create an account and use our services.
            </p>
          </div>

          {/* Section 3 */}
          <div style={{ marginBottom: '32px' }}>
            <h2 style={{
              fontSize: '24px',
              fontWeight: 700,
              color: '#2e2e2e',
              marginBottom: '16px'
            }}>
              3. Payment and Pricing
            </h2>
            <p style={{
              fontSize: '16px',
              color: '#555',
              lineHeight: 1.8,
              marginBottom: '16px'
            }}>
              <strong>3.1 Fees:</strong> Prices for our services are displayed on our website and are subject to change. All fees are in U.S. dollars unless otherwise stated.
            </p>
            <p style={{
              fontSize: '16px',
              color: '#555',
              lineHeight: 1.8,
              marginBottom: '16px'
            }}>
              <strong>3.2 Payment:</strong> Payment is due at the time of purchase. We accept major credit cards, debit cards, and other payment methods as indicated on our website. By providing payment information, you authorize us to charge the applicable fees.
            </p>
            <p style={{
              fontSize: '16px',
              color: '#555',
              lineHeight: 1.8,
              marginBottom: '16px'
            }}>
              <strong>3.3 Payment Plans:</strong> We offer installment payment plans for certain services. Payment plan terms are disclosed at checkout. Failure to make timely payments may result in suspension of services.
            </p>
            <p style={{
              fontSize: '16px',
              color: '#555',
              lineHeight: 1.8
            }}>
              <strong>3.4 Taxes:</strong> You are responsible for any applicable taxes, duties, or government fees.
            </p>
          </div>

          {/* Section 4 */}
          <div style={{ marginBottom: '32px' }}>
            <h2 style={{
              fontSize: '24px',
              fontWeight: 700,
              color: '#2e2e2e',
              marginBottom: '16px'
            }}>
              4. Refund Policy
            </h2>
            <p style={{
              fontSize: '16px',
              color: '#555',
              lineHeight: 1.8,
              marginBottom: '16px'
            }}>
              <strong>4.1 General Refunds:</strong> You may request a full refund within 7 days of purchase if no work has been completed. After work has begun, refunds are evaluated on a case-by-case basis.
            </p>
            <p style={{
              fontSize: '16px',
              color: '#555',
              lineHeight: 1.8,
              marginBottom: '16px'
            }}>
              <strong>4.2 Job Offer Guarantee:</strong> Our Ultimate Bundle includes a Job Offer Guarantee. If you meet all requirements and do not receive a job offer within 120 days, you are eligible for a full refund. Terms and conditions of the guarantee are provided in a separate agreement.
            </p>
            <p style={{
              fontSize: '16px',
              color: '#555',
              lineHeight: 1.8
            }}>
              <strong>4.3 Refund Processing:</strong> Approved refunds will be processed within 14 business days to the original payment method.
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
              5. User Responsibilities
            </h2>
            <p style={{
              fontSize: '16px',
              color: '#555',
              lineHeight: 1.8,
              marginBottom: '16px'
            }}>
              You agree to:
            </p>
            <ul style={{
              fontSize: '16px',
              color: '#555',
              lineHeight: 1.8,
              marginBottom: '16px',
              paddingLeft: '24px'
            }}>
              <li>Provide accurate and truthful information about your employment history, education, and skills</li>
              <li>Respond to our team's communications in a timely manner (within 24-48 hours)</li>
              <li>Review and approve materials (résumés, cover letters) before we submit applications</li>
              <li>Attend scheduled coaching sessions and complete assigned tasks</li>
              <li>Follow our guidance and recommendations for your job search</li>
              <li>Notify us of any job offers or changes in your employment status</li>
              <li>Use our services only for lawful purposes</li>
              <li>Not misrepresent your qualifications or experience</li>
            </ul>
          </div>

          {/* Section 6 */}
          <div style={{ marginBottom: '32px' }}>
            <h2 style={{
              fontSize: '24px',
              fontWeight: 700,
              color: '#2e2e2e',
              marginBottom: '16px'
            }}>
              6. Intellectual Property
            </h2>
            <p style={{
              fontSize: '16px',
              color: '#555',
              lineHeight: 1.8,
              marginBottom: '16px'
            }}>
              <strong>6.1 Our Content:</strong> All content on our website, including text, graphics, logos, images, and software, is the property of PyroINC or its licensors and is protected by copyright, trademark, and other intellectual property laws.
            </p>
            <p style={{
              fontSize: '16px',
              color: '#555',
              lineHeight: 1.8,
              marginBottom: '16px'
            }}>
              <strong>6.2 Your Content:</strong> You retain ownership of any materials you provide to us (résumés, cover letters, etc.). By using our services, you grant us a limited license to use, modify, and distribute your materials solely for the purpose of providing our services.
            </p>
            <p style={{
              fontSize: '16px',
              color: '#555',
              lineHeight: 1.8
            }}>
              <strong>6.3 Deliverables:</strong> Materials we create for you (revised résumés, cover letters, etc.) become your property upon full payment. However, we retain the right to use anonymized versions for marketing and training purposes.
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
              7. Disclaimer of Warranties
            </h2>
            <p style={{
              fontSize: '16px',
              color: '#555',
              lineHeight: 1.8,
              marginBottom: '16px'
            }}>
              OUR SERVICES ARE PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED. WE DO NOT GUARANTEE:
            </p>
            <ul style={{
              fontSize: '16px',
              color: '#555',
              lineHeight: 1.8,
              marginBottom: '16px',
              paddingLeft: '24px'
            }}>
              <li>That you will receive job offers or employment</li>
              <li>Specific interview rates or response rates</li>
              <li>That our services will meet your expectations</li>
              <li>That our services will be uninterrupted or error-free</li>
              <li>The accuracy or reliability of any information obtained through our services</li>
            </ul>
            <p style={{
              fontSize: '16px',
              color: '#555',
              lineHeight: 1.8
            }}>
              Employment outcomes depend on many factors beyond our control, including market conditions, your qualifications, and employer decisions.
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
              8. Limitation of Liability
            </h2>
            <p style={{
              fontSize: '16px',
              color: '#555',
              lineHeight: 1.8,
              marginBottom: '16px'
            }}>
              TO THE MAXIMUM EXTENT PERMITTED BY LAW, PYROINC SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, INCLUDING BUT NOT LIMITED TO LOSS OF PROFITS, DATA, OR OPPORTUNITIES, ARISING OUT OF OR RELATED TO YOUR USE OF OUR SERVICES.
            </p>
            <p style={{
              fontSize: '16px',
              color: '#555',
              lineHeight: 1.8
            }}>
              OUR TOTAL LIABILITY TO YOU FOR ANY CLAIMS ARISING FROM THESE TERMS OR YOUR USE OF OUR SERVICES SHALL NOT EXCEED THE AMOUNT YOU PAID FOR THE SERVICES IN THE 12 MONTHS PRECEDING THE CLAIM.
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
              9. Termination
            </h2>
            <p style={{
              fontSize: '16px',
              color: '#555',
              lineHeight: 1.8,
              marginBottom: '16px'
            }}>
              <strong>9.1 By You:</strong> You may cancel your account at any time by contacting us. Cancellation does not entitle you to a refund unless otherwise specified in our Refund Policy.
            </p>
            <p style={{
              fontSize: '16px',
              color: '#555',
              lineHeight: 1.8
            }}>
              <strong>9.2 By Us:</strong> We reserve the right to suspend or terminate your account if you violate these Terms, provide false information, fail to make payments, or engage in conduct that we deem harmful to our business or other users.
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
              10. Governing Law and Dispute Resolution
            </h2>
            <p style={{
              fontSize: '16px',
              color: '#555',
              lineHeight: 1.8,
              marginBottom: '16px'
            }}>
              These Terms are governed by the laws of the State of California, United States, without regard to its conflict of law provisions.
            </p>
            <p style={{
              fontSize: '16px',
              color: '#555',
              lineHeight: 1.8
            }}>
              Any disputes arising from these Terms or your use of our services shall be resolved through binding arbitration in accordance with the rules of the American Arbitration Association. You waive your right to participate in class actions or class arbitrations.
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
              11. Changes to Terms
            </h2>
            <p style={{
              fontSize: '16px',
              color: '#555',
              lineHeight: 1.8
            }}>
              We reserve the right to modify these Terms at any time. We will notify you of significant changes by posting the updated Terms on our website and updating the "Last Updated" date. Your continued use of our services after changes are posted constitutes your acceptance of the revised Terms.
            </p>
          </div>

          {/* Section 12 */}
          <div style={{ marginBottom: '32px' }}>
            <h2 style={{
              fontSize: '24px',
              fontWeight: 700,
              color: '#2e2e2e',
              marginBottom: '16px'
            }}>
              12. Miscellaneous
            </h2>
            <p style={{
              fontSize: '16px',
              color: '#555',
              lineHeight: 1.8,
              marginBottom: '16px'
            }}>
              <strong>12.1 Entire Agreement:</strong> These Terms, along with our Privacy Policy and any service-specific agreements, constitute the entire agreement between you and PyroINC.
            </p>
            <p style={{
              fontSize: '16px',
              color: '#555',
              lineHeight: 1.8,
              marginBottom: '16px'
            }}>
              <strong>12.2 Severability:</strong> If any provision of these Terms is found to be unenforceable, the remaining provisions will remain in full effect.
            </p>
            <p style={{
              fontSize: '16px',
              color: '#555',
              lineHeight: 1.8,
              marginBottom: '16px'
            }}>
              <strong>12.3 Waiver:</strong> Our failure to enforce any right or provision of these Terms does not constitute a waiver of that right or provision.
            </p>
            <p style={{
              fontSize: '16px',
              color: '#555',
              lineHeight: 1.8
            }}>
              <strong>12.4 Assignment:</strong> You may not assign or transfer these Terms without our prior written consent. We may assign these Terms without restriction.
            </p>
          </div>

          {/* Section 13 */}
          <div style={{ marginBottom: '32px' }}>
            <h2 style={{
              fontSize: '24px',
              fontWeight: 700,
              color: '#2e2e2e',
              marginBottom: '16px'
            }}>
              13. Contact Information
            </h2>
            <p style={{
              fontSize: '16px',
              color: '#555',
              lineHeight: 1.8,
              marginBottom: '16px'
            }}>
              If you have any questions about these Terms, please contact us:
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
            Ready to Get Started?
          </h2>
          <p style={{
            fontSize: '18px',
            color: '#555',
            marginBottom: '24px'
          }}>
            Join thousands of job seekers who've landed their dream roles with PyroINC.
          </p>
          <a
            href="/signup"
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
            Get Started
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
            <a href="/privacy" style={{ fontSize: '14px', color: '#999', textDecoration: 'none' }}>Privacy Policy</a>
            <a href="/terms" style={{ fontSize: '14px', color: '#16a085', textDecoration: 'none', fontWeight: 600 }}>Terms & Conditions</a>
            <a href="/contact" style={{ fontSize: '14px', color: '#999', textDecoration: 'none' }}>Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
}














