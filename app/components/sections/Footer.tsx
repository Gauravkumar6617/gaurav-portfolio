"use client";

import { ArrowUpRight } from "lucide-react";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const socialLinks = [
    {
      name: "LinkedIn",
      url: "https://www.linkedin.com/in/gaurav-kumar"
    },
    {
      name: "GitHub",
      url: "https://github.com/Gauravkumar6617"
    },
    {
      name: "Threads",
      url: "https://www.threads.com/@am_i_gauravkumar?igshid=NTc4MTIwNjQ2YQ=="
    }
  ];

  return (
    <footer className="w-full mt-40 pb-12 border-t border-zinc-800">
      <div className="pt-12 flex flex-col gap-12">

        <div className="flex justify-between items-end">
          <h2 className="text-5xl md:text-7xl font-black tracking-tighter text-zinc-800 uppercase leading-[0.8]">
            Gaurav <br /> Kumar
          </h2>

          <button
            onClick={scrollToTop}
            className="group flex flex-col items-center gap-2 text-zinc-500 hover:text-white transition-colors"
          >
            <span className="text-[10px] uppercase tracking-[0.3em] font-bold">
              Back to Top
            </span>

            <div className="w-14 h-14 rounded-full border border-zinc-800 flex items-center justify-center group-hover:border-orange-500 group-hover:bg-orange-500 group-hover:text-black transition-all">
              <ArrowUpRight className="-rotate-45" size={24} />
            </div>
          </button>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-start md:items-center pt-8 border-t border-zinc-900 gap-6">
          <p className="text-zinc-500 text-sm italic">
            © 2026 Gaurav Kumar — AI Systems Engineer
          </p>

          <div className="flex gap-8">
            {socialLinks.map((link) => (
              <a
                key={link.name}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs uppercase tracking-widest font-bold text-zinc-400 hover:text-orange-500 transition-colors"
              >
                {link.name}
              </a>
            ))}
          </div>
        </div>

      </div>
    </footer>
  );
}