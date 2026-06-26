import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2, AlertCircle } from "lucide-react";
import { base44 } from "@/api/base44Client";

const footerLinks = {
  Products: [
    { label: "Shared Hosting", section: "pricing" },
    { label: "VPS Hosting", section: "pricing" },
    { label: "Dedicated Servers", section: "pricing" },
    { label: "All Features", section: "infrastructure" },
  ],
  Company: [
    { label: "About Us", page: "/about" },
    { label: "Contact", page: "/contact" },
    { label: "Start Migration", section: "migration" },
  ],
  Resources: [
    { label: "View Pricing", section: "pricing" },
    { label: "Infrastructure", section: "infrastructure" },
    { label: "Contact Support", page: "/contact" },
  ],
  Legal: [
    { label: "Privacy Policy", page: "/privacy" },
    { label: "Terms of Service", page: "/terms" },
    { label: "Cookie Policy", page: "/privacy" },
  ],
};

export default function FooterSection({ selectedPlan }) {
  const [form, setForm] = useState({ domain: "", email: "" });
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (selectedPlan && status === "submitted") {
      setStatus("idle");
    }
  }, [selectedPlan]);

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.domain || !form.email) {
      setError("Please enter both your domain and email.");
      return;
    }
    if (!form.email.includes("@")) {
      setError("Please enter a valid email address.");
      return;
    }
    setStatus("submitting");
    setError("");
    try {
      await base44.entities.Lead.create({
        email: form.email,
        domain: form.domain,
        type: "migration",
        plan: selectedPlan || "Not specified",
        name: form.email.split("@")[0],
      });

      await base44.integrations.Core.SendEmail({
        to: form.email,
        subject: "Migration Request Received - MadeTechnologies",
        body: `Hi,\n\nWe've received your migration request for ${form.domain}.\n\nSelected plan: ${selectedPlan || "To be determined"}\n\nOur migration team will review your request and contact you within 24 hours to schedule a zero-downtime migration. There is no cost for migration on any plan.\n\nThe MadeTechnologies Team`,
      });

      setStatus("submitted");
    } catch (err) {
      setStatus("error");
      setError("Something went wrong. Please try again or contact us directly.");
    }
  };

  return (
    <footer id="migration" className="relative">
      <section className="relative py-32 lg:py-48 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#FFB800]/[0.03] to-[#FFB800]/[0.01]" />

        <div className="relative max-w-4xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <p className="font-mono text-xs uppercase tracking-[0.4em] text-[#FFB800] mb-6">
              Zero-Downtime Migration
            </p>
            <h2 className="font-display text-3xl md:text-5xl lg:text-7xl font-extrabold text-[#F2F2F2] tracking-tight leading-[0.95]">
              START YOUR
              <br />
              MIGRATION
            </h2>
            <p className="mt-6 text-lg text-[#8E9196] max-w-xl mx-auto leading-relaxed">
              Enter your current domain and email. We'll handle the rest — free
              migration with zero downtime on every plan.
            </p>

            {selectedPlan && status !== "submitted" && (
              <div className="mt-6 inline-block px-4 py-2 border border-[#FFB800]/30 bg-[#FFB800]/[0.03]">
                <span className="font-mono text-xs text-[#FFB800]">
                  Selected: {selectedPlan}
                </span>
              </div>
            )}

            {status === "submitted" ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="mt-12 max-w-lg mx-auto border border-[#FFB800]/30 bg-[#FFB800]/[0.03] p-8 lg:p-10"
              >
                <CheckCircle2 size={40} className="text-[#FFB800] mx-auto mb-4" />
                <h3 className="font-display text-xl font-bold text-[#F2F2F2] mb-2">
                  Migration Request Received
                </h3>
                <p className="text-[#8E9196] leading-relaxed text-sm">
                  We've sent a confirmation email to {form.email}. Our team will
                  contact you within 24 hours to schedule your migration for{" "}
                  {form.domain}.
                </p>
              </motion.div>
            ) : (
              <motion.form
                onSubmit={handleSubmit}
                className="mt-12 max-w-lg mx-auto space-y-4"
              >
                <input
                  type="text"
                  placeholder="yourdomain.com"
                  value={form.domain}
                  onChange={(e) => setForm({ ...form, domain: e.target.value })}
                  className="w-full bg-white/[0.03] border border-white/10 px-6 py-4 font-mono text-sm text-[#F2F2F2] placeholder:text-[#8E9196]/40 focus:outline-none focus:border-[#FFB800]/50 transition-colors min-h-[44px]"
                />
                <input
                  type="email"
                  placeholder="you@email.com"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full bg-white/[0.03] border border-white/10 px-6 py-4 font-mono text-sm text-[#F2F2F2] placeholder:text-[#8E9196]/40 focus:outline-none focus:border-[#FFB800]/50 transition-colors min-h-[44px]"
                />
                {error && (
                  <div className="flex items-center gap-2 text-[#FFB800] text-sm justify-start">
                    <AlertCircle size={16} />
                    <span>{error}</span>
                  </div>
                )}
                <button
                  type="submit"
                  disabled={status === "submitting"}
                  className="w-full flex items-center justify-center gap-2 px-8 py-4 bg-[#FFB800] text-[#0A0A0B] font-display font-bold text-sm tracking-wider uppercase hover:bg-[#FFB800]/90 transition-all duration-300 disabled:opacity-50 min-h-[44px] focus:outline-none focus:ring-2 focus:ring-[#FFB800] focus:ring-offset-2 focus:ring-offset-[#0A0A0B]"
                >
                  {status === "submitting" ? "Submitting..." : "Migrate Now"}
                  {status !== "submitting" && <ArrowRight size={16} />}
                </button>
              </motion.form>
            )}
          </motion.div>
        </div>
      </section>

      <div className="border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16 lg:py-24">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-10 lg:gap-16">
            {Object.entries(footerLinks).map(([category, links]) => (
              <div key={category}>
                <h4 className="font-mono text-[10px] uppercase tracking-[0.3em] text-[#FFB800] mb-6 font-bold">
                  {category}
                </h4>
                <ul className="space-y-3">
                  {links.map((link) => (
                    <li key={link.label}>
                      {link.page ? (
                        <Link
                          to={link.page}
                          className="text-sm text-[#8E9196] hover:text-[#F2F2F2] transition-colors duration-300 min-h-[44px] inline-flex items-center"
                        >
                          {link.label}
                        </Link>
                      ) : (
                        <a
                          href={`#${link.section}`}
                          onClick={(e) => {
                            e.preventDefault();
                            goToSection(link.section);
                          }}
                          className="text-sm text-[#8E9196] hover:text-[#F2F2F2] transition-colors duration-300 min-h-[44px] inline-flex items-center"
                        >
                          {link.label}
                        </a>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <Link to="/" className="font-display text-lg font-bold tracking-wider text-[#F2F2F2]">
            MADE<span className="text-[#FFB800]">TECH</span>
          </Link>
          <p className="text-xs text-[#8E9196]/50 font-mono">
            © 2026 MadeTechnologies. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}