import { Home, User, Briefcase, Mail, Zap } from "lucide-react";

export default function Navbar() {
  return (
    <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-50">
      <div className="flex items-center gap-3 bg-[#1a1a1a]/80 backdrop-blur-lg px-4 py-2 rounded-2xl border border-white/10 shadow-2xl">
        <NavItem icon={<Home size={18} />} active />
        <NavItem icon={<User size={18} />} />
        <NavItem icon={<Briefcase size={18} />} />
        <NavItem icon={<Zap size={18} />} />
        <NavItem icon={<Mail size={18} />} />
      </div>
    </nav>
  );
}

function NavItem({
  icon,
  active = false,
}: {
  icon: React.ReactNode;
  active?: boolean;
}) {
  return (
    <div
      className={`p-2.5 rounded-xl cursor-pointer transition-all ${
        active
          ? "bg-white text-black"
          : "text-zinc-500 hover:text-white hover:bg-zinc-800"
      }`}
    >
      {icon}
    </div>
  );
}
