// import {setGlobalOptions} from "firebase-functions"; // Only needed for v2
import * as functions from "firebase-functions/v1";
// import {onDocumentCreated} from "firebase-functions/v2/firestore"; // Temporarily disabled
// import {onCall} from "firebase-functions/v2/https";
import * as logger from "firebase-functions/logger";
import * as admin from "firebase-admin";
// @ts-ignore - sib-api-v3-sdk doesn't have types
import * as SibApiV3Sdk from "sib-api-v3-sdk";

// Initialize Firebase Admin
admin.initializeApp();

// Email templates (matching your notifications.ts)
const EMAIL_TEMPLATES = {
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
      </div>
    `,
    text: 'New client signup: {{name}} <{{email}}> (uid: {{uid}})'
  }
};

// Set global options for v2 functions only
// setGlobalOptions({ maxInstances: 10 });

// Function to send emails via Brevo
// TEMPORARILY DISABLED - Cloud Run health check issues with onDocumentCreated in v2
/*
export const sendQueuedEmails = onDocumentCreated(
  "notifications/{notificationId}",
  async (event) => {
    const notification = event.data?.data();
    const notificationId = event.params.notificationId;

    if (!notification || notification.status !== 'pending' || notification.type !== 'email') {
      logger.info("Skipping notification - not an email or not pending", { notificationId });
      return;
    }

    logger.info("Processing email notification", { notificationId, userId: notification.userId });

    try {
      // Get template name from metadata
      const templateName = notification.metadata?.template;
      if (!templateName || !EMAIL_TEMPLATES[templateName as keyof typeof EMAIL_TEMPLATES]) {
        logger.error("Template not found", { templateName });
        await admin.firestore().collection('notifications').doc(notificationId).update({
          status: 'failed',
          error: 'Template not found',
          failedAt: admin.firestore.FieldValue.serverTimestamp()
        });
        return;
      }

      const template = EMAIL_TEMPLATES[templateName as keyof typeof EMAIL_TEMPLATES];
      const variables = notification.metadata?.variables || {};

      // Replace variables in template
      let subject = template.subject;
      let htmlContent = template.html;
      let textContent = template.text;

      Object.entries(variables).forEach(([key, value]) => {
        const placeholder = new RegExp(`{{${key}}}`, 'g');
        subject = subject.replace(placeholder, String(value));
        htmlContent = htmlContent.replace(placeholder, String(value));
        textContent = textContent.replace(placeholder, String(value));
      });

      // Prepare Brevo email
      const sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail();
      sendSmtpEmail.sender = { 
        name: "Pyro Solutions Inc", 
        email: "info@pyrosolutionsinc.com" 
      };
      
      // Get recipient email from variables or notification
      const recipientEmail = variables.email || notification.metadata?.variables?.email;
      if (!recipientEmail) {
        logger.error("No recipient email found", { notificationId });
        await admin.firestore().collection('notifications').doc(notificationId).update({
          status: 'failed',
          error: 'No recipient email found',
          failedAt: admin.firestore.FieldValue.serverTimestamp()
        });
        return;
      }

      sendSmtpEmail.to = [{ 
        email: recipientEmail, 
        name: variables.name || 'User' 
      }];
      sendSmtpEmail.subject = subject;
      sendSmtpEmail.htmlContent = htmlContent;
      sendSmtpEmail.textContent = textContent;

      // Send email via Brevo
      const sendResult = await apiInstance.sendTransacEmail(sendSmtpEmail);
      logger.info("Email sent successfully", { notificationId, messageId: sendResult.messageId });

      // Update notification status
      await admin.firestore().collection('notifications').doc(notificationId).update({
        status: 'sent',
        sentAt: admin.firestore.FieldValue.serverTimestamp(),
        messageId: sendResult.messageId
      });

    } catch (error: any) {
      logger.error("Failed to send email", { notificationId, error: error.message });
      
      // Update notification status
      await admin.firestore().collection('notifications').doc(notificationId).update({
        status: 'failed',
        error: error.message || 'Unknown error',
        failedAt: admin.firestore.FieldValue.serverTimestamp()
      });
    }
  }
);
*/

/**
 * Callable function to send contact form emails
 * Sends contact form submissions to pyrosolutionsinc@gmail.com
 * Using v1 (1st gen) for better reliability
 */
export const sendContactEmail = functions
  .runWith({
    secrets: ['BREVO_API_KEY']
  })
  .https.onCall(
  async (data, context) => {
    const {name, email, subject, message} = data as {name: string; email: string; subject: string; message: string};

    // Validate input
    if (!name || !email || !subject || !message) {
      throw new Error("Missing required fields");
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      throw new Error("Invalid email format");
    }

    try {
      // Configure Brevo API inside the function
      const brevoApiKey = process.env.BREVO_API_KEY;
      if (!brevoApiKey) {
        logger.error("BREVO_API_KEY environment variable is not set");
        throw new Error("Email service not configured");
      }

      // Trim the API key to remove any whitespace or newlines
      const cleanApiKey = brevoApiKey.trim();

      const defaultClient = SibApiV3Sdk.ApiClient.instance;
      const apiKey = defaultClient.authentications['api-key'];
      apiKey.apiKey = cleanApiKey;

      const apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();
      
      // Prepare email to company
      const sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail();
      sendSmtpEmail.to = [{email: "pyrosolutionsinc@gmail.com", name: "Pyro Solutions"}];
      sendSmtpEmail.sender = {email: "noreply@pyrosolutionsinc.com", name: "Pyro Contact Form"};
      sendSmtpEmail.replyTo = {email: email, name: name};
      sendSmtpEmail.subject = `Contact Form: ${subject}`;
      sendSmtpEmail.htmlContent = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f8f9fa;">
          <div style="background-color: #ffffff; padding: 30px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
            <h2 style="color: #2e2e2e; margin-top: 0; border-bottom: 3px solid #7aa3a1; padding-bottom: 10px;">
              New Contact Form Submission
            </h2>
            
            <div style="margin: 20px 0;">
              <p style="margin: 8px 0;"><strong style="color: #555;">From:</strong> ${name}</p>
              <p style="margin: 8px 0;"><strong style="color: #555;">Email:</strong> <a href="mailto:${email}" style="color: #7aa3a1;">${email}</a></p>
              <p style="margin: 8px 0;"><strong style="color: #555;">Subject:</strong> ${subject}</p>
            </div>
            
            <div style="margin-top: 25px; padding: 20px; background-color: #f8fafc; border-left: 4px solid #7aa3a1; border-radius: 4px;">
              <p style="margin: 0 0 8px 0;"><strong style="color: #555;">Message:</strong></p>
              <p style="margin: 0; white-space: pre-wrap; line-height: 1.6; color: #2e2e2e;">${message}</p>
            </div>
            
            <div style="margin-top: 25px; padding: 15px; background-color: #d4f1e8; border-radius: 4px; font-size: 13px; color: #555;">
              <p style="margin: 0;"><strong>📧 Reply directly to this email</strong> to respond to ${name}</p>
              <p style="margin: 8px 0 0 0;">Submitted: ${new Date().toLocaleString('en-US', { timeZone: 'America/Toronto' })} EST</p>
            </div>
          </div>
        </div>
      `;
      sendSmtpEmail.textContent = `
New Contact Form Submission

From: ${name}
Email: ${email}
Subject: ${subject}

Message:
${message}

---
Reply to: ${email}
Submitted: ${new Date().toLocaleString('en-US', { timeZone: 'America/Toronto' })} EST
      `;

      // Send email via Brevo
      await apiInstance.sendTransacEmail(sendSmtpEmail);
      
      logger.info(`Contact form email sent successfully from ${email}`);

      // Optionally send confirmation to user
      const confirmationEmail = new SibApiV3Sdk.SendSmtpEmail();
      confirmationEmail.to = [{email: email, name: name}];
      confirmationEmail.sender = {email: "noreply@pyrosolutionsinc.com", name: "Pyro Solutions"};
      confirmationEmail.subject = "We received your message - Pyro Solutions";
      confirmationEmail.htmlContent = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background-color: #ffffff; padding: 30px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
            <h2 style="color: #7aa3a1; margin-top: 0;">Thank You for Contacting Us!</h2>
            <p>Hi ${name},</p>
            <p>We've received your message and will get back to you within 24 hours during business days.</p>
            
            <div style="background-color: #f8fafc; padding: 15px; border-radius: 4px; margin: 20px 0;">
              <p style="margin: 0 0 8px 0; color: #555;"><strong>Your Message:</strong></p>
              <p style="margin: 0; color: #2e2e2e; white-space: pre-wrap;">${message}</p>
            </div>
            
            <p>If you have any urgent questions, feel free to call us at <strong>+1 (905) 341-5055</strong>.</p>
            <p style="margin-top: 20px;">Best regards,<br><strong>The Pyro Solutions Team</strong></p>
            
            <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e0e0e0; font-size: 12px; color: #999;">
              <p style="margin: 0;">Pyro Solutions Inc.</p>
              <p style="margin: 4px 0 0 0;">Toronto, Canada</p>
            </div>
          </div>
        </div>
      `;
      confirmationEmail.textContent = `Thank you for contacting us, ${name}!\n\nWe've received your message and will get back to you within 24 hours during business days.\n\nYour Message:\n${message}\n\nIf you have any urgent questions, feel free to call us at +1 (905) 341-5055.\n\nBest regards,\nThe Pyro Solutions Team`;

      await apiInstance.sendTransacEmail(confirmationEmail);
      logger.info(`Confirmation email sent to ${email}`);

      return {
        success: true,
        message: "Email sent successfully"
      };
    } catch (error: any) {
      logger.error("Error sending contact email:", error);
      throw new functions.https.HttpsError(
        'internal',
        `Failed to send email: ${error.message || 'Unknown error'}`
      );
    }
  }
);
