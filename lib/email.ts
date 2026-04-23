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
 * Generate HTML email template for contact form
 */
export function generateContactEmailHTML(
  name: string,
  email: string,
  subject: string,
  message: string,
): string {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: #ff5722; color: white; padding: 20px; border-radius: 5px; }
          .content { padding: 20px; background: #f9f9f9; border-radius: 5px; }
          .field { margin: 15px 0; }
          .label { font-weight: bold; color: #666; }
          .footer { margin-top: 20px; padding-top: 20px; border-top: 1px solid #ddd; color: #888; font-size: 12px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h2>New Contact Form Submission</h2>
          </div>
          <div class="content">
            <div class="field">
              <span class="label">Name:</span>
              <p>${escapeHtml(name)}</p>
            </div>
            <div class="field">
              <span class="label">Email:</span>
              <p><a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a></p>
            </div>
            <div class="field">
              <span class="label">Subject:</span>
              <p>${escapeHtml(subject)}</p>
            </div>
            <div class="field">
              <span class="label">Message:</span>
              <p>${escapeHtml(message).replace(/\n/g, "<br>")}</p>
            </div>
          </div>
          <div class="footer">
            <p>This email was sent from your portfolio contact form.</p>
          </div>
        </div>
      </body>
    </html>
  `;
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
