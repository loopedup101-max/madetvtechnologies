import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";

const navLinks = [
  { label: "Hosting", section: "pricing" },
  { label: "Features", section: "infrastructure" },
  { label: "Support", page: "/support" },
  { label: "Knowledge Base", page: "/kb" },
  { label: "About", page: "/about" },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const goToSection = (sectionId) => {
    if (location.pathname === "/") {
      document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" });
    } else {
      navigate("/");
      setTimeout(() => {
        document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" });
      }, 400);
    }
  };

  const handleNavClick = (e, link) => {
    e.preventDefault();
    setMobileOpen(false);
    if (link.section) {
      goToSection(link.section);
    } else if (link.page) {
      navigate(link.page);
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-[#FAF8F5]/80 border-b border-[#E5E0D8]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          <Link to="/" className="font-display text-xl font-bold tracking-wider text-[#1A1A2E]">
            MADE<span className="text-[#4F46E5]">TECH</span>
          </Link>

          <div className="hidden lg:flex items-center gap-10">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.section ? `#${link.section}` : link.page}
                onClick={(e) => handleNavClick(e, link)}
                className="text-sm font-mono uppercase tracking-widest text-[#6B6B7B] hover:text-[#1A1A2E] transition-colors duration-300 min-h-[44px] flex items-center"
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="hidden lg:flex items-center gap-4">
            <Link
              to="/dashboard"
              className="text-sm font-mono uppercase tracking-widest text-[#6B6B7B] hover:text-[#1A1A2E] transition-colors min-h-[44px] flex items-center"
            >
              Dashboard
            </Link>
            <button
              onClick={() => goToSection("pricing")}
              className="px-6 py-2.5 bg-[#4F46E5] text-[#FAF8F5] font-display font-bold text-sm tracking-wide hover:bg-[#4F46E5]/90 transition-all duration-300 min-h-[44px] flex items-center"
            >
              View Pricing
            </button>
          </div>

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden text-[#1A1A2E] p-2 min-w-[44px] min-h-[44px] flex items-center justify-center"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="lg:hidden bg-[#FAF8F5]/95 backdrop-blur-xl border-t border-[#E5E0D8]">
          <div className="px-6 py-6 space-y-4">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.section ? `#${link.section}` : link.page}
                onClick={(e) => handleNavClick(e, link)}
                className="block text-sm font-mono uppercase tracking-widest text-[#6B6B7B] hover:text-[#1A1A2E] py-3 min-h-[44px] flex items-center"
              >
                {link.label}
              </a>
            ))}
            <div className="pt-4 border-t border-[#E5E0D8] space-y-3">
              <Link
                to="/dashboard"
                onClick={() => setMobileOpen(false)}
                className="block text-sm font-mono text-[#6B6B7B] py-2"
              >
                Dashboard
              </Link>
              <button
                onClick={() => { setMobileOpen(false); goToSection("pricing"); }}
                className="block w-full text-center px-6 py-3 bg-[#4F46E5] text-[#FAF8F5] font-display font-bold text-sm tracking-wide"
              >
                View Pricing
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}