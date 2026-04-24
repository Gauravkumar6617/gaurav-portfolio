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
  title: "Gaurav Kumar Portfolio",
  description: "Software Engineer Portfolio",
  icons: {
    icon: `data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text x='50%' y='55%' dominant-baseline='middle' text-anchor='middle' font-family='system-ui, sans-serif' font-size='85' font-weight='900' fill='%23f97316'>G</text></svg>`,
  },
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
