import React from "react";
import { Globe, Layers, Layout, ArrowUpRight, Flame } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative w-full bg-[#0a0a0a] text-white pt-24 pb-16 px-6 md:px-12">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* LEFT COLUMN: The Iconic Sticky Profile Card */}
        <aside className="lg:col-span-4">
          <div className="lg:sticky lg:top-28 h-fit bg-white rounded-[40px] p-6 text-black shadow-2xl flex flex-col items-center">
            {/* Image Container */}
            <div className="relative w-full aspect-[4/5] rounded-[32px] overflow-hidden bg-[#e63923] mb-6">
              <img
                src="/profile.jpg" // Replace with your actual path
                alt="Gaurav Kumar"
                className="w-full h-full object-cover grayscale brightness-90 mix-blend-multiply transition-transform duration-500 hover:scale-105"
              />
            </div>

            <h2 className="text-3xl font-black mb-1 tracking-tight">
              Gaurav Kumar
            </h2>
            <p className="text-zinc-500 font-bold text-sm mb-4">He/Him</p>

            <div className="bg-[#ff5722] p-2 rounded-full mb-5 text-white animate-pulse">
              <Flame size={20} fill="currentColor" />
            </div>

            <p className="text-center text-zinc-600 font-medium text-[16px] leading-snug mb-8 max-w-[260px]">
              AI Systems Engineer | Python & FastAPI Developer | GenAI & RAG
              Expert | Next.js Specialist
            </p>

            {/* Social Group */}
            <div className="flex gap-4 w-full">
              <a
                href="#"
                className="flex-1 flex justify-center py-3 rounded-2xl bg-zinc-100 text-zinc-400 hover:bg-black hover:text-white transition-all"
              >
                <Globe size={20} />
              </a>
            </div>
          </div>
        </aside>

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
          <div className="grid grid-cols-3 gap-8 border-t border-zinc-800 pt-10 pb-12">
            <div>
              <span className="text-5xl md:text-7xl font-bold block">+03</span>
              <p className="text-[11px] uppercase tracking-[0.2em] text-zinc-500 mt-3 font-black">
                Years of <br /> Experience
              </p>
            </div>
            <div>
              <span className="text-5xl md:text-7xl font-bold block">+25</span>
              <p className="text-[11px] uppercase tracking-[0.2em] text-zinc-500 mt-3 font-black">
                Projects <br /> Completed
              </p>
            </div>
            <div>
              <span className="text-5xl md:text-7xl font-bold block">+10</span>
              <p className="text-[11px] uppercase tracking-[0.2em] text-zinc-500 mt-3 font-black">
                AI Models <br /> Deployed
              </p>
            </div>
          </div>

          {/* Service Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Orange Card */}
            <div className="bg-[#ff4d3a] p-10 rounded-[40px] h-[260px] flex flex-col justify-between group cursor-pointer relative overflow-hidden transition-transform hover:-translate-y-2">
              <Layers size={40} strokeWidth={2.5} />
              <h3 className="text-3xl font-black uppercase leading-none w-2/3">
                AI Systems & RAG Pipeline
              </h3>
              <div className="absolute bottom-8 right-8 p-3 border border-white/20 rounded-full group-hover:bg-white group-hover:text-[#ff4d3a] transition-all">
                <ArrowUpRight size={28} />
              </div>
            </div>

            {/* Lime Card */}
            <div className="bg-[#b4ff39] p-10 rounded-[40px] h-[260px] text-black flex flex-col justify-between group cursor-pointer relative overflow-hidden transition-transform hover:-translate-y-2">
              <Layout size={40} strokeWidth={2.5} />
              <h3 className="text-3xl font-black uppercase leading-none w-2/3">
                Full Stack & Next.js Apps
              </h3>
              <div className="absolute bottom-8 right-8 p-3 border-black/10 border rounded-full group-hover:bg-black group-hover:text-[#b4ff39] transition-all">
                <ArrowUpRight size={28} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
