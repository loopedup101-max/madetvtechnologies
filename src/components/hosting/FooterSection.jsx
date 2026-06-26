import React from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const footerLinks = {
  Hosting: ["Shared Hosting", "VPS Hosting", "Dedicated Servers", "Cloud Hosting", "WordPress Hosting"],
  Resources: ["Knowledge Base", "Blog", "System Status", "API Documentation", "Developer Tools"],
  Company: ["About Us", "Careers", "Press", "Partners", "Contact"],
  Legal: ["Privacy Policy", "Terms of Service", "SLA", "GDPR", "Cookie Policy"],
};

export default function FooterSection() {
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
              Enter your current domain and we'll handle the rest. Free migration
              with zero downtime on every plan.
            </p>

            <div className="mt-12 max-w-lg mx-auto">
              <div className="flex border border-white/10 focus-within:border-[#FFB800]/50 transition-colors">
                <input
                  type="text"
                  placeholder="yourdomain.com"
                  className="flex-1 bg-transparent px-6 py-4 font-mono text-sm text-[#F2F2F2] placeholder:text-[#8E9196]/50 focus:outline-none min-h-[44px]"
                />
                <button className="px-8 py-4 bg-[#FFB800] text-[#0A0A0B] font-display font-bold text-sm tracking-wider uppercase hover:bg-[#FFB800]/90 transition-all duration-300 flex items-center gap-2 min-h-[44px] whitespace-nowrap">
                  Migrate
                  <ArrowRight size={16} />
                </button>
              </div>
            </div>
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
                    <li key={link}>
                      <a
                        href="#"
                        className="text-sm text-[#8E9196] hover:text-[#F2F2F2] transition-colors duration-300 min-h-[44px] inline-flex items-center"
                      >
                        {link}
                      </a>
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
          <a href="#" className="font-display text-lg font-bold tracking-wider text-[#F2F2F2]">
            NEXUS<span className="text-[#FFB800]">HOST</span>
          </a>
          <p className="text-xs text-[#8E9196]/50 font-mono">
            © 2025 NexusHost. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}