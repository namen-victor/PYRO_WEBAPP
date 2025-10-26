// Notifications service for email and WhatsApp
import { collection, addDoc, serverTimestamp, updateDoc, doc } from 'firebase/firestore';
import { db } from './firebase';
import { sendEmailViaBrevo } from './brevo';

export interface Notification {
  id?: string;
  userId: string;
  type: 'email' | 'whatsapp' | 'in_app';
  title: string;
  message: string;
  priority: 'low' | 'medium' | 'high';
  status: 'pending' | 'sent' | 'failed';
  metadata?: any;
  createdAt?: Date;
}

export interface EmailTemplate {
  subject: string;
  html: string;
  text: string;
}

export interface WhatsAppTemplate {
  message: string;
  template?: string;
}

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
  
  applicationUpdate: {
    subject: 'Application Status Update',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #007bff;">Application Status Update</h2>
        <p>Hi {{name}},</p>
        <p>Great news! Your application status has been updated:</p>
        <div style="background: #f8f9fa; padding: 16px; border-radius: 8px; margin: 16px 0;">
          <strong>Company:</strong> {{company}}<br>
          <strong>Position:</strong> {{position}}<br>
          <strong>Status:</strong> <span style="color: #28a745;">{{status}}</span>
        </div>
        <p>Keep up the great work!</p>
        <p>Best regards,<br>The Pyro Solutions Team</p>
      </div>
    `,
    text: 'Your application for {{position}} at {{company}} has been updated to {{status}}. Keep up the great work!'
  },
  
  interviewScheduled: {
    subject: 'Interview Scheduled!',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #28a745;">🎉 Interview Scheduled!</h2>
        <p>Hi {{name}},</p>
        <p>Congratulations! You have an interview scheduled:</p>
        <div style="background: #e8f5e8; padding: 16px; border-radius: 8px; margin: 16px 0;">
          <strong>Company:</strong> {{company}}<br>
          <strong>Position:</strong> {{position}}<br>
          <strong>Date:</strong> {{date}}<br>
          <strong>Time:</strong> {{time}}
        </div>
        <p>Good luck! Your staff member will be in touch with interview preparation tips.</p>
        <p>Best regards,<br>The Pyro Solutions Team</p>
      </div>
    `,
    text: 'Congratulations! You have an interview scheduled for {{position}} at {{company}} on {{date}} at {{time}}. Good luck!'
  },
  
  paymentSuccess: {
    subject: 'Payment Successful - Welcome to Premium!',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #28a745;">Payment Successful!</h2>
        <p>Hi {{name}},</p>
        <p>Thank you for your payment! You now have access to our premium features:</p>
        <ul>
          <li>Unlimited job applications</li>
          <li>Priority support</li>
          <li>1-on-1 career coaching</li>
          <li>Advanced application tracking</li>
        </ul>
        <p>Your staff member will be in touch soon to get started.</p>
        <p>Best regards,<br>The Pyro Solutions Team</p>
      </div>
    `,
    text: 'Payment successful! You now have access to premium features including unlimited applications and priority support.'
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
      </div>
    `,
    text: 'New client signup: {{name}} <{{email}}> (uid: {{uid}})'
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
  }
};

// WhatsApp templates
export const WHATSAPP_TEMPLATES = {
  applicationUpdate: {
    message: "🎯 *Application Update*\n\nYour application for *{{position}}* at *{{company}}* has been updated to *{{status}}*.\n\nKeep up the great work! 💪",
    template: "application_update"
  },
  
  interviewScheduled: {
    message: "🎉 *Interview Scheduled!*\n\nCongratulations! You have an interview:\n\n*Company:* {{company}}\n*Position:* {{position}}\n*Date:* {{date}}\n*Time:* {{time}}\n\nGood luck! 🍀",
    template: "interview_scheduled"
  },
  
  newMessage: {
    message: "💬 *New Message*\n\nYou have a new message from your staff member. Check your dashboard to respond!",
    template: "new_message"
  },
  
  paymentReminder: {
    message: "💳 *Payment Reminder*\n\nYour subscription will renew in 3 days. Update your payment method if needed.",
    template: "payment_reminder"
  }
};

// Create notification
export const createNotification = async (notification: Omit<Notification, 'id' | 'createdAt'>): Promise<string> => {
  try {
    const docRef = await addDoc(collection(db, 'notifications'), {
      ...notification,
      createdAt: serverTimestamp()
    });
    return docRef.id;
  } catch (error) {
    console.error('Error creating notification:', error);
    throw error;
  }
};

// Send email notification
export const sendEmailNotification = async (
  userId: string,
  template: keyof typeof EMAIL_TEMPLATES,
  variables: Record<string, string>
): Promise<string> => {
  const emailTemplate = EMAIL_TEMPLATES[template];
  
  // Replace variables in template
  let subject = emailTemplate.subject;
  let html = emailTemplate.html;
  let text = emailTemplate.text;
  
  Object.entries(variables).forEach(([key, value]) => {
    const regex = new RegExp(`{{${key}}}`, 'g');
    subject = subject.replace(regex, value);
    html = html.replace(regex, value);
    text = text.replace(regex, value);
  });
  
  // Create notification record
  const notificationId = await createNotification({
    userId,
    type: 'email',
    title: subject,
    message: text,
    priority: 'medium',
    status: 'pending',
    metadata: {
      template,
      variables,
      html,
      subject
    }
  });
  
  // Send email via Brevo
  try {
    const result = await sendEmailViaBrevo(
      template,
      variables,
      variables.email || variables.recipientEmail || 'user@example.com',
      variables.name || variables.recipientName
    );

    if (result.success) {
      console.log('Email sent successfully:', result);
      
      // Update notification status
      await updateDoc(doc(db, 'notifications', notificationId), {
        status: 'sent',
        sentAt: serverTimestamp(),
        messageId: result.messageId
      });
    } else {
      console.error('Failed to send email:', result.error);
      
      // Update notification status
      await updateDoc(doc(db, 'notifications', notificationId), {
        status: 'failed',
        error: result.error || 'Failed to send email',
        failedAt: serverTimestamp()
      });
    }
  } catch (error) {
    console.error('Error sending email:', error);
    
    // Update notification status
    await updateDoc(doc(db, 'notifications', notificationId), {
      status: 'failed',
      error: error instanceof Error ? error.message : 'Unknown error',
      failedAt: serverTimestamp()
    });
  }
  
  return notificationId;
};

export const notifyAdminsNewSignup = async (
  uid: string,
  name: string,
  email: string
): Promise<string> => {
  // Send directly to admin email via Brevo
  const adminEmail = 'info@pyrosolutionsinc.com'; // Replace with your actual admin email
  
  try {
    const result = await sendEmailViaBrevo(
      'newSignupAdmin',
      { uid, name, email },
      adminEmail,
      'Pyro Solutions Admin'
    );
    
    if (result.success) {
      console.log('Admin notification sent successfully');
      return result.messageId || 'sent';
    } else {
      console.error('Failed to send admin notification:', result.error);
      return 'failed';
    }
  } catch (error) {
    console.error('Error sending admin notification:', error);
    return 'failed';
  }
};

// Send welcome email when user reaches waiting page
export const notifyWaitingListWelcome = async (
  userId: string,
  name: string,
  email: string
): Promise<string> => {
  return sendEmailNotification(userId, 'waitingListWelcome', { name, email });
};

// Send activation email when user is accepted
export const notifyAccountActivated = async (
  userId: string,
  name: string,
  email: string
): Promise<string> => {
  return sendEmailNotification(userId, 'accountActivated', { name, email });
};

// Send WhatsApp notification
export const sendWhatsAppNotification = async (
  userId: string,
  template: keyof typeof WHATSAPP_TEMPLATES,
  variables: Record<string, string>
): Promise<string> => {
  const whatsappTemplate = WHATSAPP_TEMPLATES[template];
  
  // Replace variables in template
  let message = whatsappTemplate.message;
  
  Object.entries(variables).forEach(([key, value]) => {
    const regex = new RegExp(`{{${key}}}`, 'g');
    message = message.replace(regex, value);
  });
  
  // Create notification record
  const notificationId = await createNotification({
    userId,
    type: 'whatsapp',
    title: 'WhatsApp Message',
    message,
    priority: 'high',
    status: 'pending',
    metadata: {
      template: whatsappTemplate.template,
      variables,
      message
    }
  });
  
  // In a real implementation, you would send the WhatsApp message here
  console.log('WhatsApp notification created:', {
    userId,
    message
  });
  
  return notificationId;
};

// Send in-app notification
export const sendInAppNotification = async (
  userId: string,
  title: string,
  message: string,
  priority: 'low' | 'medium' | 'high' = 'medium'
): Promise<string> => {
  return await createNotification({
    userId,
    type: 'in_app',
    title,
    message,
    priority,
    status: 'sent'
  });
};

// Bulk notification functions
export const notifyApplicationUpdate = async (
  userId: string,
  company: string,
  position: string,
  status: string,
  userEmail: string,
  whatsappConsent: boolean
) => {
  const variables = { name: 'User', company, position, status };
  
  // Always send email
  await sendEmailNotification(userId, 'applicationUpdate', variables);
  
  // Send WhatsApp if consent given
  if (whatsappConsent) {
    await sendWhatsAppNotification(userId, 'applicationUpdate', variables);
  }
  
  // Send in-app notification
  await sendInAppNotification(
    userId,
    'Application Updated',
    `Your application for ${position} at ${company} has been updated to ${status}`
  );
};

export const notifyInterviewScheduled = async (
  userId: string,
  company: string,
  position: string,
  date: string,
  time: string,
  userEmail: string,
  whatsappConsent: boolean
) => {
  const variables = { name: 'User', company, position, date, time };
  
  // Always send email
  await sendEmailNotification(userId, 'interviewScheduled', variables);
  
  // Send WhatsApp if consent given
  if (whatsappConsent) {
    await sendWhatsAppNotification(userId, 'interviewScheduled', variables);
  }
  
  // Send in-app notification
  await sendInAppNotification(
    userId,
    'Interview Scheduled!',
    `Congratulations! You have an interview for ${position} at ${company} on ${date} at ${time}`
  );
};

