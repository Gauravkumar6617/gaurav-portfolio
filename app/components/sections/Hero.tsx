import React from "react";
import { Globe, Layers, Layout, ArrowUpRight, Flame } from "lucide-react";

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative w-full bg-[#0a0a0a] text-white pt-24 pb-16 px-6 md:px-12"
    >
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* LEFT COLUMN: The Iconic Sticky Profile Card */}

        {/* RIGHT COLUMN: The High-Impact Content */}
        <div className="lg:col-span-8 flex flex-col">
          {/* Main Headline */}
          <div className="mb-12">
            <h1 className="text-[12vw] lg:text-[100px] font-black tracking-tighter leading-[0.85] uppercase mb-8">
              AI & FULL STACK <br />
              <span className="text-zinc-800 transition-colors hover:text-zinc-700">
                DEVELOPER
              </span>
            </h1>
            <p className="text-zinc-400 text-xl md:text-2xl max-w-2xl leading-relaxed">
              I build intelligent systems that bridge the gap between complex AI
              logic and seamless user experiences. Specializing in RAG systems,
              FastAPI, and high-performance React applications.
            </p>
          </div>

          {/* Stats Bar */}
          <div className="grid grid-cols-2 gap-12 border-t border-zinc-800 pt-10 pb-12">
            <div>
              <span className="text-5xl md:text-7xl font-bold block">1.6+</span>
              <p className="text-[11px] uppercase tracking-[0.2em] text-zinc-500 mt-3 font-black">
                Years of <br /> Experience
              </p>
            </div>
            <div>
              <span className="text-5xl md:text-7xl font-bold block">4+</span>
              <p className="text-[11px] uppercase tracking-[0.2em] text-zinc-500 mt-3 font-black">
                Projects <br /> Completed
              </p>
            </div>
          </div>

          {/* Service Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Orange Card */}
            <div className="bg-gradient-to-br from-[#ff4d3a] to-[#ff3a22] p-8 rounded-[28px] min-h-[240px] flex flex-col justify-between group cursor-pointer relative overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-orange-500/40 hover:-translate-y-1">
              <div className="relative z-10">
                <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-white/30 transition-all">
                  <Layers size={32} strokeWidth={2} className="text-white" />
                </div>
                <h3 className="text-2xl md:text-3xl font-black text-white leading-snug">
                  AI Systems & RAG Pipeline
                </h3>
              </div>
              <div className="absolute bottom-6 right-6 p-3 bg-white/20 rounded-full group-hover:bg-white group-hover:text-[#ff4d3a] transition-all duration-300">
                <ArrowUpRight
                  size={24}
                  className="text-white group-hover:text-[#ff4d3a]"
                />
              </div>
              <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full -mr-20 -mt-20 group-hover:scale-150 transition-transform duration-500" />
            </div>

            {/* Lime Card */}
            <div className="bg-gradient-to-br from-[#b4ff39] to-[#9ef535] p-8 rounded-[28px] min-h-[240px] text-black flex flex-col justify-between group cursor-pointer relative overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-lime-500/40 hover:-translate-y-1">
              <div className="relative z-10">
                <div className="w-14 h-14 bg-black/10 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-black/20 transition-all">
                  <Layout size={32} strokeWidth={2} className="text-black" />
                </div>
                <h3 className="text-2xl md:text-3xl font-black text-black leading-snug">
                  Full Stack & Next.js Apps
                </h3>
              </div>
              <div className="absolute bottom-6 right-6 p-3 bg-black/10 rounded-full group-hover:bg-black group-hover:text-[#b4ff39] transition-all duration-300">
                <ArrowUpRight
                  size={24}
                  className="text-black group-hover:text-[#b4ff39]"
                />
              </div>
              <div className="absolute top-0 right-0 w-40 h-40 bg-black/5 rounded-full -mr-20 -mt-20 group-hover:scale-150 transition-transform duration-500" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
