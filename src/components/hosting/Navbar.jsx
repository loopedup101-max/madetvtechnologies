import React, { useState } from "react";
import { Menu, X } from "lucide-react";

const navLinks = [
  { label: "Hosting", href: "#pricing" },
  { label: "Domains", href: "#infrastructure" },
  { label: "AI & Developers", href: "#infrastructure" },
  { label: "Agency", href: "#migration" },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-[#0A0A0B]/80 border-b border-white/5">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          <a href="#" className="font-display text-xl font-bold tracking-wider text-[#F2F2F2]">
            NEXUS<span className="text-[#FFB800]">HOST</span>
          </a>

          <div className="hidden lg:flex items-center gap-10">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-sm font-mono uppercase tracking-widest text-[#8E9196] hover:text-[#F2F2F2] transition-colors duration-300"
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="hidden lg:flex items-center gap-4">
            <a
              href="#pricing"
              className="text-sm font-mono uppercase tracking-widest text-[#8E9196] hover:text-[#F2F2F2] transition-colors"
            >
              Login
            </a>
            <a
              href="#pricing"
              className="px-6 py-2.5 bg-[#FFB800] text-[#0A0A0B] font-display font-bold text-sm tracking-wide hover:bg-[#FFB800]/90 transition-all duration-300"
            >
              View Pricing
            </a>
          </div>

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden text-[#F2F2F2] p-2 min-w-[44px] min-h-[44px] flex items-center justify-center"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="lg:hidden bg-[#0A0A0B]/95 backdrop-blur-xl border-t border-white/5">
          <div className="px-6 py-6 space-y-4">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="block text-sm font-mono uppercase tracking-widest text-[#8E9196] hover:text-[#F2F2F2] py-3 min-h-[44px] flex items-center"
              >
                {link.label}
              </a>
            ))}
            <div className="pt-4 border-t border-white/5 space-y-3">
              <a href="#pricing" className="block text-sm font-mono text-[#8E9196] py-2">Login</a>
              <a
                href="#pricing"
                onClick={() => setMobileOpen(false)}
                className="block text-center px-6 py-3 bg-[#FFB800] text-[#0A0A0B] font-display font-bold text-sm tracking-wide"
              >
                View Pricing
              </a>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}