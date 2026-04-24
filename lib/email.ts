// Lazy load nodemailer only if SMTP is configured
async function getNodemailer() {
  try {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const nm = require("nodemailer");
    return nm;
  } catch (error) {
    console.warn(
      "Nodemailer not installed. For Gmail SMTP, run: npm install nodemailer",
    );
    return null;
  }
}

interface EmailParams {
  to: string;
  subject: string;
  html: string;
  text?: string;
}

/**
 * Send email using Resend (recommended for production)
 */
async function sendWithResend(params: EmailParams): Promise<boolean> {
  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: `noreply@${process.env.NEXT_PUBLIC_SITE_URL?.replace("http://", "").replace("https://", "") || "example.com"}`,
        to: params.to,
        subject: params.subject,
        html: params.html,
      }),
    });

    return response.ok;
  } catch (error) {
    console.error("Resend email error:", error);
    return false;
  }
}

/**
 * Send email using Gmail SMTP
 */
async function sendWithGmail(params: EmailParams): Promise<boolean> {
  try {
    const nodemailer = await getNodemailer();
    if (!nodemailer) {
      console.error("Nodemailer is required for Gmail SMTP");
      return false;
    }

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT || "587"),
      secure: process.env.SMTP_PORT === "465",
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    await transporter.sendMail({
      from: process.env.SMTP_USER,
      to: params.to,
      subject: params.subject,
      html: params.html,
      text: params.text,
    });

    return true;
  } catch (error) {
    console.error("Gmail SMTP error:", error);
    return false;
  }
}

/**
 * Send email using SendGrid
 */
async function sendWithSendGrid(params: EmailParams): Promise<boolean> {
  try {
    const response = await fetch("https://api.sendgrid.com/v3/mail/send", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.SENDGRID_API_KEY}`,
      },
      body: JSON.stringify({
        personalizations: [
          {
            to: [{ email: params.to }],
          },
        ],
        from: {
          email: process.env.SMTP_USER || "noreply@example.com",
        },
        subject: params.subject,
        content: [
          {
            type: "text/html",
            value: params.html,
          },
        ],
      }),
    });

    return response.ok;
  } catch (error) {
    console.error("SendGrid error:", error);
    return false;
  }
}

/**
 * Main function to send email - automatically detects which provider to use
 */
export async function sendEmail(params: EmailParams): Promise<boolean> {
  // Check which email service is configured
  if (process.env.RESEND_API_KEY) {
    return sendWithResend(params);
  }

  if (process.env.SMTP_USER && process.env.SMTP_PASS) {
    return sendWithGmail(params);
  }

  if (process.env.SENDGRID_API_KEY) {
    return sendWithSendGrid(params);
  }

  console.warn(
    "No email service configured. Set RESEND_API_KEY, SMTP credentials, or SENDGRID_API_KEY in .env.local",
  );
  return false;
}

/**
 * Generate beautiful HTML email template for portfolio owner (admin)
 */
export function generateAdminEmailHTML(
  name: string,
  email: string,
  subject: string,
  message: string,
): string {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="UTF-8">
        <style>
          * { margin: 0; padding: 0; box-sizing: border-box; }
          body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; }
          .header { background: linear-gradient(135deg, #ff4d3a 0%, #ff3a22 100%); color: white; padding: 40px 20px; text-align: center; border-radius: 12px 12px 0 0; }
          .header h1 { font-size: 28px; font-weight: 700; margin-bottom: 8px; }
          .header p { font-size: 14px; opacity: 0.9; }
          .content { padding: 40px; background: white; }
          .section { margin-bottom: 30px; }
          .section-title { font-size: 14px; font-weight: 700; color: #ff4d3a; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 12px; }
          .info-box { background: #f8f8f8; padding: 15px; border-radius: 8px; border-left: 4px solid #ff4d3a; margin-bottom: 15px; }
          .info-label { font-size: 12px; font-weight: 600; color: #999; text-transform: uppercase; letter-spacing: 0.5px; }
          .info-value { font-size: 16px; color: #333; margin-top: 5px; }
          .message-box { background: #fafafa; padding: 20px; border-radius: 8px; border: 1px solid #e0e0e0; }
          .message-box p { font-size: 14px; line-height: 1.8; color: #555; white-space: pre-wrap; word-wrap: break-word; }
          .footer { background: #f8f8f8; padding: 30px 20px; text-align: center; border-radius: 0 0 12px 12px; border-top: 1px solid #e0e0e0; }
          .footer-text { font-size: 12px; color: #999; }
          .action-button { background: linear-gradient(135deg, #ff4d3a 0%, #ff3a22 100%); color: white; padding: 12px 30px; border-radius: 6px; text-decoration: none; display: inline-block; font-weight: 600; margin-top: 20px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>📨 New Contact Form Submission</h1>
            <p>You've received a message from your portfolio</p>
          </div>
          <div class="content">
            <div class="section">
              <div class="section-title">Sender Information</div>
              <div class="info-box">
                <div class="info-label">Name</div>
                <div class="info-value">${escapeHtml(name)}</div>
              </div>
              <div class="info-box">
                <div class="info-label">Email Address</div>
                <div class="info-value"><a href="mailto:${escapeHtml(email)}" style="color: #ff4d3a; text-decoration: none;">${escapeHtml(email)}</a></div>
              </div>
            </div>
            <div class="section">
              <div class="section-title">Subject</div>
              <div class="info-box">
                <div class="info-value" style="font-size: 16px; font-weight: 500;">${escapeHtml(subject)}</div>
              </div>
            </div>
            <div class="section">
              <div class="section-title">Message</div>
              <div class="message-box">
                <p>${escapeHtml(message).replace(/\n/g, "<br>")}</p>
              </div>
            </div>
            <div style="text-align: center;">
              <a href="mailto:${escapeHtml(email)}" class="action-button">Reply to ${escapeHtml(name)}</a>
            </div>
          </div>
          <div class="footer">
            <p class="footer-text">This email was sent from your Gaurav Kumar's Portfolio Contact Form</p>
            <p class="footer-text" style="margin-top: 10px;">🚀 Keep building amazing things!</p>
          </div>
        </div>
      </body>
    </html>
  `;
}

/**
 * Generate beautiful HTML email template for user (confirmation email)
 */
export function generateUserEmailHTML(name: string, subject: string): string {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="UTF-8">
        <style>
          * { margin: 0; padding: 0; box-sizing: border-box; }
          body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; }
          .header { background: linear-gradient(135deg, #b4ff39 0%, #9ef535 100%); color: #1a1a1a; padding: 40px 20px; text-align: center; border-radius: 12px 12px 0 0; }
          .header h1 { font-size: 28px; font-weight: 700; margin-bottom: 8px; }
          .header p { font-size: 14px; opacity: 0.8; }
          .content { padding: 40px; background: white; }
          .section { margin-bottom: 30px; }
          .greeting { font-size: 16px; color: #333; margin-bottom: 20px; }
          .highlight { background: linear-gradient(135deg, #b4ff39 0%, #9ef535 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; font-weight: 700; }
          .message-item { background: #f8fafb; padding: 16px; border-radius: 8px; border-left: 4px solid #b4ff39; margin-bottom: 12px; }
          .message-label { font-size: 12px; font-weight: 600; color: #999; text-transform: uppercase; letter-spacing: 0.5px; }
          .message-value { font-size: 14px; color: #333; margin-top: 6px; font-weight: 500; }
          .divider { height: 1px; background: #e0e0e0; margin: 30px 0; }
          .cta-section { background: linear-gradient(135deg, #f8fafb 0%, #f0f2f5 100%); padding: 30px; border-radius: 8px; text-align: center; }
          .cta-button { background: linear-gradient(135deg, #b4ff39 0%, #9ef535 100%); color: #1a1a1a; padding: 14px 32px; border-radius: 8px; text-decoration: none; display: inline-block; font-weight: 700; margin-top: 16px; }
          .footer { background: #f8f8f8; padding: 30px 20px; text-align: center; border-radius: 0 0 12px 12px; border-top: 1px solid #e0e0e0; }
          .footer-text { font-size: 12px; color: #999; }
          .social-links { margin-top: 20px; }
          .social-links a { display: inline-block; width: 36px; height: 36px; background: #e0e0e0; border-radius: 50%; margin: 0 6px; text-decoration: none; line-height: 36px; color: #666; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>✨ Thank You!</h1>
            <p>Your message has been received</p>
          </div>
          <div class="content">
            <div class="greeting">
              Hi <span class="highlight">${escapeHtml(name)}</span>,<br><br>
              Thank you for reaching out! We appreciate you taking the time to contact Gaurav Kumar's portfolio.
            </div>
            <div class="message-item">
              <div class="message-label">Your Message Subject</div>
              <div class="message-value">${escapeHtml(subject)}</div>
            </div>
            <p style="color: #666; font-size: 14px; margin-bottom: 20px;">
              We've received your message and will get back to you as soon as possible. Usually within 24-48 hours.
            </p>
            <div class="divider"></div>
            <div class="cta-section">
              <h2 style="font-size: 18px; color: #333; margin-bottom: 12px;">What Happens Next?</h2>
              <p style="font-size: 14px; color: #666; margin-bottom: 12px;">
                Gaurav will review your message and respond directly to your email address. Feel free to check out more of the work in the meantime.
              </p>
              <a href="https://gauravkumar.dev" class="cta-button">Visit Portfolio</a>
            </div>
            <div class="divider"></div>
            <p style="font-size: 13px; color: #999; line-height: 1.8;">
              <strong>Pro tip:</strong> Make sure to check your spam folder in case our response ends up there. Add this email to your contacts to ensure you don't miss our reply.
            </p>
          </div>
          <div class="footer">
            <p class="footer-text">© 2026 Gaurav Kumar | AI Systems Engineer</p>
            <div class="social-links">
              <a href="#" title="GitHub">G</a>
              <a href="#" title="LinkedIn">In</a>
              <a href="#" title="Twitter">𝕏</a>
            </div>
            <p class="footer-text" style="margin-top: 16px;">This is an automated confirmation email. Please do not reply to this email.</p>
          </div>
        </div>
      </body>
    </html>
  `;
}

/**
 * Generate HTML email template for contact form
 */
export function generateContactEmailHTML(
  name: string,
  email: string,
  subject: string,
  message: string,
): string {
  return generateAdminEmailHTML(name, email, subject, message);
}

/**
 * Escape HTML to prevent XSS
 */
function escapeHtml(text: string): string {
  const map: { [key: string]: string } = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;",
  };
  return text.replace(/[&<>"']/g, (m) => map[m]);
}
