import { Flame, Mail, MessageSquare } from "lucide-react";

export const ProfileCard = () => (
  <aside className="lg:col-span-4 h-full">
    <div className="lg:sticky lg:top-10 h-fit bg-gradient-to-br from-white to-zinc-50 rounded-[32px] p-8 text-black shadow-2xl flex flex-col items-center border border-zinc-200">
      
      {/* Image Container */}
      <div className="relative w-full aspect-[3/4] rounded-[24px] overflow-hidden bg-gradient-to-br from-orange-100 to-red-100 mb-8 border-2 border-orange-200">
        <img
          src="/profile.png"
          alt="Gaurav Kumar"
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent" />
      </div>

      {/* Name Section */}
      <div className="text-center mb-2 w-full">
        <h2 className="text-4xl font-black mb-1 tracking-tight">Gaurav Kumar</h2>
        <p className="text-orange-600 font-bold text-sm mb-3 uppercase tracking-wider">He/Him</p>
      </div>

      {/* Status Badge */}
      <div className="flex items-center gap-2 bg-orange-50 px-4 py-2 rounded-full mb-6 border border-orange-100">
        <Flame size={16} className="text-orange-600 animate-pulse" fill="currentColor" />
        <span className="text-sm font-bold text-orange-600">Open to Opportunities</span>
      </div>

      {/* Bio Section */}
      <p className="text-center text-zinc-500 font-medium text-[15px] leading-relaxed mb-8 max-w-xs">
        AI Systems Engineer | Python & FastAPI Developer | GenAI & RAG Expert | Next.js Specialist
      </p>

      {/* Social Links - Using Inline SVGs for Brand Icons */}
      <div className="grid grid-cols-4 gap-3 w-full mb-4">
        {/* GitHub */}
        <a href="https://github.com/Gauravkumar6617/" target="_blank" rel="noopener noreferrer" 
           className="flex justify-center items-center py-4 rounded-2xl bg-zinc-100 text-zinc-600 transition-all duration-300 hover:bg-zinc-900 hover:text-white hover:shadow-md group">
          <svg className="w-5 h-5 fill-current group-hover:scale-110 transition-transform" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.744.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
        </a>

        {/* LinkedIn */}
        <a href="https://www.linkedin.com/in/gauravkumar9452/" target="_blank" rel="noopener noreferrer"
           className="flex justify-center items-center py-4 rounded-2xl bg-zinc-100 text-zinc-600 transition-all duration-300 hover:bg-blue-600 hover:text-white hover:shadow-md group">
          <svg className="w-5 h-5 fill-current group-hover:scale-110 transition-transform" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
        </a>

        {/* Instagram */}
        <a href="https://www.instagram.com/am_i_gauravkumar" target="_blank" rel="noopener noreferrer"
           className="flex justify-center items-center py-4 rounded-2xl bg-zinc-100 text-zinc-600 transition-all duration-300 hover:bg-pink-600 hover:text-white hover:shadow-md group">
          <svg className="w-5 h-5 fill-current group-hover:scale-110 transition-transform" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
        </a>

        {/* Email */}
        <a href="mailto:gk2792523@gmail.com"
           className="flex justify-center items-center py-4 rounded-2xl bg-zinc-100 text-zinc-600 transition-all duration-300 hover:bg-red-500 hover:text-white hover:shadow-md group">
          <Mail size={20} className="group-hover:scale-110 transition-transform" />
        </a>
      </div>

      {/* Skype Link - Primary CTA */}
   <a
  href="https://join.skype.com/invite/fae34ce4428159f9"
  target="_blank"
  rel="noopener noreferrer"
  className="w-full flex items-center justify-center gap-2 py-4 rounded-2xl bg-gradient-to-r from-orange-500 to-red-500 text-white font-bold text-sm hover:from-orange-600 hover:to-red-600 transition-all duration-300 shadow-lg shadow-orange-500/20"
>
  <MessageSquare size={18} />
  Chat on Skype
</a>
    </div>
  </aside>
);