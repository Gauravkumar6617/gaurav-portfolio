import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import Navbar from "./components/shared/Navbar";

// Professional font choice to match the Sawad template
const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
});

export const metadata: Metadata = {
  title: {
    default: "Gaurav Kumar | Software Engineer Portfolio",
    template: "%s | Gaurav Kumar",
  },
  description: "Software Engineer specializing in Python, FastAPI, Next.js, and Machine Learning. Building high-performance, scalable web applications.",
  keywords: [
    "Gaurav Kumar",
    "Software Engineer",
    "Full Stack Developer",
    "Python Developer",
    "Next.js",
    "React",
    "FastAPI",
    "PostgreSQL",
    "Machine Learning",
    "Portfolio",
  ],
  authors: [{ name: "Gaurav Kumar" }],
  creator: "Gaurav Kumar",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://gaurav-portfolio.vercel.app", // Fallback URL, should be updated with actual domain
    title: "Gaurav Kumar | Software Engineer",
    description: "Software Engineer specializing in Python, FastAPI, Next.js, and Machine Learning.",
    siteName: "Gaurav Kumar Portfolio",
    images: [
      {
        url: "/profile.png",
        width: 1200,
        height: 630,
        alt: "Gaurav Kumar Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Gaurav Kumar | Software Engineer",
    description: "Software Engineer specializing in Python, FastAPI, Next.js, and Machine Learning.",
    images: ["/profile.png"],
    creator: "@gauravkumar", // Placeholder twitter handle
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: `data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text x='50%' y='55%' dominant-baseline='middle' text-anchor='middle' font-family='system-ui, sans-serif' font-size='85' font-weight='900' fill='%23f97316'>G</text></svg>`,
    apple: "/icons/apple-touch-icon.png", // Recommended for professional sites
  },
  manifest: "/manifest.json",
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${jakarta.className} bg-[#0a0a0a] text-white antialiased`}
      >
        <Navbar />
        {children}
      </body>
    </html>
  );
}
