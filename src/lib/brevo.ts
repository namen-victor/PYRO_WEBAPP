// Brevo email service
// API key is now stored in Firebase Functions secret manager
// DO NOT commit API keys to the repository!
const BREVO_API_KEY = process.env.NEXT_PUBLIC_BREVO_API_KEY || '';
const BREVO_API_URL = 'https://api.brevo.com/v3/smtp/email';

// Email templates
export const EMAIL_TEMPLATES = {
  welcome: {
    subject: 'Welcome to Pyro Solutions!',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #007bff;">Welcome to Pyro Solutions!</h2>
        <p>Hi {{name}},</p>
        <p>Welcome to Pyro Solutions! We're excited to help you land your dream job.</p>
        <p>Your account has been created and you can now:</p>
        <ul>
          <li>Track your job applications</li>
          <li>Chat with your assigned staff member</li>
          <li>Upload your resume for review</li>
        </ul>
        <p>Best regards,<br>The Pyro Solutions Team</p>
      </div>
    `,
    text: 'Welcome to Pyro Solutions! Your account has been created. You can now track applications, chat with staff, and upload your resume.'
  },
  waitingListWelcome: {
    subject: 'Welcome to Pyro Solutions - You\'re on the Waitlist!',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #7aa3a1;">Welcome to Pyro Solutions!</h2>
        <p>Hi {{name}},</p>
        <p>Congratulations! You've successfully completed your profile setup and are now on our waitlist.</p>
        <p>Here's what happens next:</p>
        <ul>
          <li>Our team will review your profile and resume</li>
          <li>We'll match you with a dedicated staff member</li>
          <li>You'll receive an email when you're accepted and ready to start</li>
        </ul>
        <p>In the meantime, you can:</p>
        <ul>
          <li>Update your profile anytime</li>
          <li>Upload a new resume if needed</li>
          <li>Check your dashboard for updates</li>
        </ul>
        <p>Thank you for choosing Pyro Solutions. We're excited to help you land your dream job!</p>
        <p>Best regards,<br>The Pyro Solutions Team</p>
      </div>
    `,
    text: 'Welcome to Pyro Solutions! You\'ve completed your profile and are now on our waitlist. Our team will review your profile and match you with a dedicated staff member. You\'ll receive an email when you\'re accepted and ready to start.'
  },
  accountActivated: {
    subject: '🎉 Your Pyro Solutions Account is Now Active!',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #16a34a;">🎉 Welcome to Pyro Solutions!</h2>
        <p>Hi {{name}},</p>
        <p>Great news! Your account has been activated and you're ready to start your job search journey with us.</p>
        <p>Your dedicated staff member will be in touch soon to:</p>
        <ul>
          <li>Introduce themselves and discuss your goals</li>
          <li>Review your profile and resume</li>
          <li>Start applying to jobs on your behalf</li>
          <li>Keep you updated on application progress</li>
        </ul>
        <div style="background: #f0f9ff; padding: 16px; border-radius: 8px; margin: 16px 0; border-left: 4px solid #7aa3a1;">
          <p style="margin: 0; font-weight: 600;">Next Steps:</p>
          <p style="margin: 8px 0 0 0;">1. Check your dashboard for updates<br>2. Respond to your staff member's messages<br>3. Be ready to provide any additional information they need</p>
        </div>
        <p>We're excited to help you land your dream job!</p>
        <p>Best regards,<br>The Pyro Solutions Team</p>
      </div>
    `,
    text: '🎉 Great news! Your Pyro Solutions account is now active! Your dedicated staff member will be in touch soon to introduce themselves, review your profile, and start applying to jobs on your behalf. Check your dashboard for updates and be ready to respond to messages from your staff member.'
  },
  newSignupAdmin: {
    subject: 'New client signup: {{name}} ({{email}})',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #2e2e2e;">New Client Signup</h2>
        <p><strong>Name:</strong> {{name}}</p>
        <p><strong>Email:</strong> {{email}}</p>
        <p><strong>User ID:</strong> {{uid}}</p>
        <p>They were created with status <strong>pendingProfile</strong>.</p>
        <p><a href="https://pyro-webapp-cfd1b.web.app/admin/clients" style="display: inline-block; margin-top: 16px; padding: 12px 24px; background-color: #7aa3a1; color: white; text-decoration: none; border-radius: 8px;">View in Admin Dashboard</a></p>
      </div>
    `,
    text: 'New client signup: {{name}} <{{email}}> (uid: {{uid}}). View in admin dashboard: https://pyro-webapp-cfd1b.web.app/admin/clients'
  },
  applicationUpdate: {
    subject: 'Application Update: {{company}} - {{position}}',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #007bff;">Application Update</h2>
        <p>Hi {{name}},</p>
        <p>We have an update on your application for <strong>{{position}}</strong> at <strong>{{company}}</strong>.</p>
        <p><strong>Status:</strong> {{status}}</p>
        <p><strong>Details:</strong> {{details}}</p>
        <p>Best regards,<br>The Pyro Solutions Team</p>
      </div>
    `,
    text: 'Application Update: {{company}} - {{position}}. Status: {{status}}. Details: {{details}}'
  },
  interviewScheduled: {
    subject: 'Interview Scheduled: {{company}} - {{position}}',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #16a34a;">Interview Scheduled!</h2>
        <p>Hi {{name}},</p>
        <p>Great news! We've scheduled an interview for you.</p>
        <p><strong>Company:</strong> {{company}}</p>
        <p><strong>Position:</strong> {{position}}</p>
        <p><strong>Date:</strong> {{date}}</p>
        <p><strong>Time:</strong> {{time}}</p>
        <p><strong>Location:</strong> {{location}}</p>
        <p>Best regards,<br>The Pyro Solutions Team</p>
      </div>
    `,
    text: 'Interview Scheduled: {{company}} - {{position}}. Date: {{date}}, Time: {{time}}, Location: {{location}}'
  },
  paymentSuccess: {
    subject: 'Payment Successful - Pyro Solutions',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #16a34a;">Payment Successful!</h2>
        <p>Hi {{name}},</p>
        <p>Thank you for your payment. Your subscription is now active.</p>
        <p><strong>Amount:</strong> {{amount}}</p>
        <p><strong>Plan:</strong> {{plan}}</p>
        <p>Best regards,<br>The Pyro Solutions Team</p>
      </div>
    `,
    text: 'Payment Successful! Amount: {{amount}}, Plan: {{plan}}'
  }
};

export interface EmailTemplate {
  subject: string;
  html: string;
  text: string;
}

export interface EmailVariables {
  [key: string]: string;
}

export const sendEmailViaBrevo = async (
  template: keyof typeof EMAIL_TEMPLATES,
  variables: EmailVariables,
  recipientEmail: string,
  recipientName?: string
): Promise<{ success: boolean; messageId?: string; error?: string }> => {
  try {
    const emailTemplate = EMAIL_TEMPLATES[template];
    if (!emailTemplate) {
      return { success: false, error: 'Template not found' };
    }

    // Replace variables in template
    let subject = emailTemplate.subject;
    let htmlContent = emailTemplate.html;
    let textContent = emailTemplate.text;

    Object.entries(variables).forEach(([key, value]) => {
      const placeholder = new RegExp(`{{${key}}}`, 'g');
      subject = subject.replace(placeholder, String(value));
      htmlContent = htmlContent.replace(placeholder, String(value));
      textContent = textContent.replace(placeholder, String(value));
    });

    // Send email via Brevo API
    const emailData = {
      sender: {
        name: "Pyro Solutions Inc",
        email: "info@pyrosolutionsinc.com"
      },
      to: [{
        email: recipientEmail,
        name: recipientName || 'User'
      }],
      subject: subject,
      htmlContent: htmlContent,
      textContent: textContent
    };

    const response = await fetch(BREVO_API_URL, {
      method: 'POST',
      headers: {
        'accept': 'application/json',
        'api-key': BREVO_API_KEY,
        'content-type': 'application/json'
      },
      body: JSON.stringify(emailData)
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Brevo API error:', errorData);
      return { success: false, error: errorData.message || 'Failed to send email' };
    }

    const result = await response.json();
    console.log('Email sent successfully:', result);
    return { success: true, messageId: result.messageId };

  } catch (error) {
    console.error('Email sending error:', error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Unknown error' 
    };
  }
};
