import { NextRequest, NextResponse } from "next/server";
import {
  sendEmail,
  generateContactEmailHTML,
  generateUserEmailHTML,
  generateAdminEmailHTML,
} from "@/lib/email";

// Simple in-memory rate limiting (store in Redis for production)
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();

const RATE_LIMIT_WINDOW =
  (parseInt(process.env.RATE_LIMIT_WINDOW || "60") || 60) * 1000; // Default 1 minute
const MAX_REQUESTS_PER_WINDOW =
  parseInt(process.env.RATE_LIMIT_MAX_REQUESTS || "5") || 5; // Default 5 requests

function getRateLimitKey(ip: string): string {
  return `contact_form_${ip}`;
}

function checkRateLimit(ip: string): { allowed: boolean; retryAfter?: number } {
  const key = getRateLimitKey(ip);
  const now = Date.now();
  const existing = rateLimitMap.get(key);

  if (!existing || now > existing.resetTime) {
    // Create new rate limit entry
    rateLimitMap.set(key, { count: 1, resetTime: now + RATE_LIMIT_WINDOW });
    return { allowed: true };
  }

  if (existing.count >= MAX_REQUESTS_PER_WINDOW) {
    const retryAfter = Math.ceil((existing.resetTime - now) / 1000);
    return { allowed: false, retryAfter };
  }

  existing.count++;
  return { allowed: true };
}

export async function POST(request: NextRequest) {
  try {
    // Get client IP
    const ip =
      request.headers.get("x-forwarded-for")?.split(",")[0] ||
      request.headers.get("x-real-ip") ||
      "unknown";

    // Check rate limit
    const rateLimit = checkRateLimit(ip);
    if (!rateLimit.allowed) {
      return NextResponse.json(
        {
          error: "Too many requests. Please try again later.",
          retryAfter: rateLimit.retryAfter,
        },
        {
          status: 429,
          headers: {
            "Retry-After": rateLimit.retryAfter?.toString() || "60",
          },
        },
      );
    }

    const body = await request.json();
    const { name, email, subject, message } = body;

    // Validation
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 },
      );
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Invalid email address" },
        { status: 400 },
      );
    }

    // Sanitize inputs
    const sanitizedData = {
      name: name.slice(0, 100).trim(),
      email: email.slice(0, 100).trim(),
      subject: subject.slice(0, 200).trim(),
      message: message.slice(0, 5000).trim(),
    };

    // Try to send email notifications
    const recipientEmail = process.env.NEXT_PUBLIC_CONTACT_EMAIL;
    let adminEmailSent = false;
    let userEmailSent = false;

    // Send email to admin/owner
    if (recipientEmail) {
      const adminEmailHtml = generateAdminEmailHTML(
        sanitizedData.name,
        sanitizedData.email,
        sanitizedData.subject,
        sanitizedData.message,
      );

      adminEmailSent = await sendEmail({
        to: recipientEmail,
        subject: `📨 New Contact: ${sanitizedData.subject}`,
        html: adminEmailHtml,
      });

      if (adminEmailSent) {
        console.log("Admin email sent successfully to:", recipientEmail);
      } else {
        console.log("Admin email sending failed:", sanitizedData);
      }
    }

    // Send confirmation email to user
    const userEmailHtml = generateUserEmailHTML(
      sanitizedData.name,
      sanitizedData.subject,
    );

    userEmailSent = await sendEmail({
      to: sanitizedData.email,
      subject: "✨ We've Received Your Message - Thank You!",
      html: userEmailHtml,
    });

    if (userEmailSent) {
      console.log(
        "Confirmation email sent successfully to:",
        sanitizedData.email,
      );
    } else {
      console.log(
        "User confirmation email sending failed:",
        sanitizedData.email,
      );
    }

    console.log("Contact form submission:", sanitizedData);

    return NextResponse.json(
      {
        success: true,
        message: "Your message has been sent successfully!",
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json(
      { error: "An error occurred while processing your request" },
      { status: 500 },
    );
  }
}
