export default function Marquee() {
  return (
    <div className="relative flex overflow-x-hidden border-y border-zinc-800 bg-[#0a0a0a] py-4">
      <div className="animate-marquee whitespace-nowrap flex items-center">
        {[...Array(10)].map((_, i) => (
          <span
            key={i}
            className="text-4xl font-bold mx-8 flex items-center gap-8"
          >
            <span className="text-zinc-700 uppercase tracking-tighter">
              Available for Hire
            </span>
            <div className="w-3 h-3 rounded-full bg-lime-400" />
          </span>
        ))}
      </div>
    </div>
  );
}
