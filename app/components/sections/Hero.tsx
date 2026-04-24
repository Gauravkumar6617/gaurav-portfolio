"use client";

import React from "react";
import { Globe, ArrowUpRight, Flame } from "lucide-react";

export default function Hero() {
  const scrollToContact = () => {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      // Offset calculation if you have a sticky navbar
      const yOffset = -80; 
      const y = contactSection.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <section
      id="hero"
      className="relative w-full bg-[#0a0a0a] text-white pt-24 pb-16 px-6 md:px-12 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 xl:gap-12">
        
        {/* LEFT COLUMN: Empty space to push content right of your Sticky Card */}
        <div className="lg:col-span-4 hidden lg:block" aria-hidden="true" />

        {/* RIGHT COLUMN: The High-Impact Content */}
        <div className="lg:col-span-8 flex flex-col w-full">
          
          {/* Main Headline */}
          <div className="mb-12">
            <h1 className="text-[10vw] lg:text-[85px] xl:text-[100px] font-black tracking-tighter leading-[0.9] uppercase mb-8">
              AI & FULL STACK <br />
              <span className="text-zinc-800 transition-colors hover:text-zinc-700">
                DEVELOPER
              </span>
            </h1>
            <p className="text-zinc-400 text-lg md:text-xl xl:text-2xl max-w-2xl leading-relaxed">
              I build intelligent systems that bridge the gap between complex AI
              logic and seamless user experiences. Specializing in RAG systems,
              FastAPI, and high-performance React applications.
            </p>
          </div>

          {/* Stats Bar */}
          <div className="grid grid-cols-2 gap-8 border-t border-zinc-800 pt-10 pb-12">
            <div>
              <span className="text-5xl md:text-6xl xl:text-7xl font-bold block">1.6+</span>
              <p className="text-[10px] md:text-[11px] uppercase tracking-[0.2em] text-zinc-500 mt-3 font-black">
                Years of <br /> Experience
              </p>
            </div>
            <div>
              <span className="text-5xl md:text-6xl xl:text-7xl font-bold block">4+</span>
              <p className="text-[10px] md:text-[11px] uppercase tracking-[0.2em] text-zinc-500 mt-3 font-black">
                Projects <br /> Completed
              </p>
            </div>
          </div>

          {/* Service Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            
            {/* Orange Card */}
            <div 
              onClick={scrollToContact} 
              className="bg-gradient-to-br from-[#ff4d3a] to-[#ff3a22] p-7 rounded-[32px] min-h-[250px] flex flex-col justify-between group cursor-pointer relative overflow-hidden transition-all duration-500 hover:shadow-2xl hover:shadow-orange-500/40 hover:-translate-y-2"
            >
              <div className="relative z-10">
                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center mb-5">
                  <Globe size={28} className="text-white" />
                </div>
                <h3 className="text-xl md:text-2xl font-black text-white leading-tight">
                  Open for Collaborative <br /> & Global Projects
                </h3>
                <p className="text-white/80 mt-3 text-sm font-medium">
                  Let's build something epic.
                </p>
              </div>
              <div className="relative z-10 self-end">
                <div className="p-3 bg-white/20 rounded-full group-hover:bg-white transition-all duration-300">
                  <ArrowUpRight size={20} className="text-white group-hover:text-[#ff4d3a]" />
                </div>
              </div>
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-700" />
            </div>

            {/* Lime Card */}
            <div 
              onClick={scrollToContact} 
              className="bg-gradient-to-br from-[#b4ff39] to-[#9ef535] p-7 rounded-[32px] min-h-[250px] text-black flex flex-col justify-between group cursor-pointer relative overflow-hidden transition-all duration-500 hover:shadow-2xl hover:shadow-lime-500/40 hover:-translate-y-2"
            >
              <div className="relative z-10">
                <div className="w-12 h-12 bg-black/10 rounded-xl flex items-center justify-center mb-5">
                  <Flame size={28} className="text-black" />
                </div>
                <h3 className="text-xl md:text-2xl font-black text-black leading-tight">
                  Open for Founding <br /> Partner Roles
                </h3>
                <p className="text-black/60 mt-3 text-sm font-medium">
                  Co-founder opportunities.
                </p>
              </div>
              <div className="relative z-10 self-end">
                <div className="p-3 bg-black/10 rounded-full group-hover:bg-black transition-all duration-300">
                  <ArrowUpRight size={20} className="text-black group-hover:text-[#b4ff39]" />
                </div>
              </div>
              <div className="absolute top-0 right-0 w-32 h-32 bg-black/5 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-700" />
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}