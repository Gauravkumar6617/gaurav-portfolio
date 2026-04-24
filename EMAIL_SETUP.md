# Email Configuration Guide

## Current Setup: Gmail SMTP

Your portfolio is now configured to use **Gmail SMTP** for sending emails through your account `gk2792523@gmail.com`.

### Configuration Details

**Environment Variables (.env.local):**

```
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=gk2792523@gmail.com
SMTP_PASS=ohnsabajcfjzmycg (App Password)
NEXT_PUBLIC_CONTACT_EMAIL=gk2792523@gmail.com
```

## How It Works

### Email Flow:

1. **User submits contact form** on portfolio
   ↓
2. **Two emails are sent automatically:**
   - **Confirmation Email** → Sent to the user's email address
     - Beautiful template with "Thank you" message
     - Shows subject of their message
     - Lets them know you'll respond within 24-48 hours
   - **Notification Email** → Sent to your admin email (gk2792523@gmail.com)
     - Beautiful template with all submission details
     - Shows sender's name, email, subject, and full message
     - Includes quick reply button

### Email Templates

- **User Template:** Lime/green gradient header, professional confirmation message
- **Admin Template:** Orange/red gradient header, detailed message summary

## Installation Requirements

Make sure you have `nodemailer` installed:

```bash
npm install nodemailer
```

## Troubleshooting

### Emails not sending?

1. **Check Gmail App Password:**
   - Visit: https://myaccount.google.com/apppasswords
   - Make sure you generated an App Password (not regular password)
   - Copy the exact 16-character password to `.env.local`

2. **Enable Less Secure Apps (if needed):**
   - https://myaccount.google.com/security

3. **Check rate limiting:**
   - Default: 5 emails per 60 seconds (configured in `.env.local`)
   - Adjust `RATE_LIMIT_MAX_REQUESTS` and `RATE_LIMIT_WINDOW` if needed

4. **Check server logs:**
   - Look for errors in terminal where Next.js is running
   - Emails will log success/failure status

## Switching Email Providers

If you want to switch to **Resend** or **SendGrid**:

### Option 1: Resend (Recommended for production)

```
# Uncomment in .env.local:
RESEND_API_KEY=your-resend-api-key

# Comment out Gmail:
# SMTP_USER=...
# SMTP_PASS=...
```

### Option 2: SendGrid

```
# Uncomment in .env.local:
SENDGRID_API_KEY=your-sendgrid-api-key

# Comment out Gmail:
# SMTP_USER=...
# SMTP_PASS=...
```

## Email Template Customization

To customize email templates, edit `/lib/email.ts`:

- `generateAdminEmailHTML()` - Email sent to you
- `generateUserEmailHTML()` - Confirmation email sent to users

## Features

✅ Both sender and receiver get beautiful HTML emails
✅ Rate limiting to prevent abuse (5 emails per minute)
✅ Input validation and sanitization
✅ Error handling and logging
✅ Responsive email design
✅ Professional branding with gradients
✅ Easy provider switching (Resend, Gmail, SendGrid)

## Testing

Send a test message through your portfolio contact form to verify:

1. Admin notification arrives in your inbox
2. User confirmation arrives in the test email address
3. Both emails display correctly with full formatting

Enjoy your professional email integration! 🚀
