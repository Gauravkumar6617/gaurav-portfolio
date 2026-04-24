import { Flame, Globe } from "lucide-react";

// You can put this at the top of your file or in a new file
export const ProfileCard = () => (
<aside className="lg:col-span-4 h-full"> {/* h-full ensures the aside spans the whole scroll area */}
    <div className="lg:sticky lg:top-10 h-fit bg-white rounded-[40px] p-6 text-black shadow-2xl flex flex-col items-center">
      <div className="relative w-full aspect-[4/5] rounded-[32px] overflow-hidden bg-[#e63923] mb-6">
        <img
          src="/profile.jpg"
          alt="Gaurav Kumar"
          className="w-full h-full object-cover grayscale brightness-90 mix-blend-multiply transition-transform duration-500 hover:scale-105"
        />
      </div>
      <h2 className="text-3xl font-black mb-1 tracking-tight">Gaurav Kumar</h2>
      <p className="text-zinc-500 font-bold text-sm mb-4">He/Him</p>
      <div className="bg-[#ff5722] p-2 rounded-full mb-5 text-white animate-pulse">
        <Flame size={20} fill="currentColor" />
      </div>
      <p className="text-center text-zinc-600 font-medium text-[16px] leading-snug mb-8 max-w-[260px]">
        AI Systems Engineer | Python & FastAPI Developer | GenAI & RAG Expert | Next.js Specialist
      </p>
      <div className="flex gap-4 w-full">
        <a href="#" className="flex-1 flex justify-center py-3 rounded-2xl bg-zinc-100 text-zinc-400 hover:bg-black hover:text-white transition-all">
          <Globe size={20} />
        </a>
      </div>
    </div>
  </aside>
);