"use client";

import { Home, User, Briefcase, Mail } from "lucide-react";
import { useState } from "react";

export default function Navbar() {
  const [activeSection, setActiveSection] = useState("hero");

  const scrollToSection = (id: string) => {
    setActiveSection(id);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-50">
      <div className="flex items-center gap-3 bg-[#1a1a1a]/80 backdrop-blur-lg px-4 py-2 rounded-2xl border border-white/10 shadow-2xl">
        <NavItem
          icon={<Home size={18} />}
          label="Home"
          active={activeSection === "hero"}
          onClick={() => scrollToSection("hero")}
        />
        <NavItem
          icon={<User size={18} />}
          label="About"
          active={activeSection === "experience"}
          onClick={() => scrollToSection("experience")}
        />
        <NavItem
          icon={<Briefcase size={18} />}
          label="Skills"
          active={activeSection === "skills"}
          onClick={() => scrollToSection("skills")}
        />
        <NavItem
          icon={<Mail size={18} />}
          label="Contact"
          active={activeSection === "contact"}
          onClick={() => scrollToSection("contact")}
        />
      </div>
    </nav>
  );
}

function NavItem({
  icon,
  label,
  active = false,
  onClick,
}: {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      title={label}
      className={`p-2.5 rounded-xl cursor-pointer transition-all ${
        active
          ? "bg-white text-black"
          : "text-zinc-500 hover:text-white hover:bg-zinc-800"
      }`}
    >
      {icon}
    </button>
  );
}
