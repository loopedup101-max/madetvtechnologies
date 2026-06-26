import React from "react";
import { motion } from "framer-motion";
import {
  Shield, Zap, HardDrive, RefreshCw, Globe, Clock,
  Lock, BarChart3, Layers, Settings, Mail, Cpu,
} from "lucide-react";

const features = [
  { icon: Clock, label: "99.99% Uptime SLA", desc: "Guaranteed availability for mission-critical applications" },
  { icon: HardDrive, label: "Weekly Backup", desc: "Automated weekly snapshots of your entire environment" },
  { icon: Cpu, label: "AI Site Creation", desc: "Intelligent site generation powered by machine learning" },
  { icon: Layers, label: "Multi-Site Mgmt", desc: "Centralized control for all your hosted properties" },
  { icon: Settings, label: "Plugin Management", desc: "One-click installs and updates for your stack" },
  { icon: BarChart3, label: "Yoast SEO", desc: "Built-in SEO optimization and analysis tools" },
  { icon: Shield, label: "Malware Removal", desc: "Real-time threat detection and automated remediation" },
  { icon: RefreshCw, label: "Free Migration", desc: "Zero-downtime migration from any hosting provider" },
  { icon: Lock, label: "Free SSL", desc: "Auto-provisioned TLS certificates for every domain" },
  { icon: Zap, label: "Seamless Updates", desc: "Rolling updates with zero service interruption" },
  { icon: Mail, label: "Pro Email Trial", desc: "Professional email hosting included free to start" },
  { icon: Globe, label: "24/7 Support", desc: "Expert technical assistance around the clock" },
];

export default function InfrastructureSection() {
  return (
    <section id="infrastructure" className="relative py-24 lg:py-40">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <p className="font-mono text-xs uppercase tracking-[0.4em] text-[#4F46E5] mb-4">
            Infrastructure Blueprint
          </p>
          <h2 className="font-display text-3xl md:text-5xl lg:text-6xl font-extrabold text-[#1A1A2E] tracking-tight">
            ALL PLANS INCLUDE
          </h2>
          <p className="mt-6 max-w-2xl mx-auto text-lg text-[#6B6B7B] leading-relaxed">
            Every tier ships with enterprise-grade tooling. No upsells, no hidden tiers.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-6 mb-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white border border-[#E5E0D8] rounded-2xl p-8 lg:p-10 shadow-sm flex flex-col min-h-[280px]"
          >
            <div className="w-12 h-12 rounded-xl bg-[#4F46E5]/10 flex items-center justify-center mb-6">
              <Zap size={20} className="text-[#4F46E5]" />
            </div>
            <h3 className="font-display text-2xl font-bold text-[#1A1A2E] mb-3">
              NVMe-Powered Speed
            </h3>
            <p className="text-sm text-[#6B6B7B] leading-relaxed">
              Up to 10x CPU power with NVMe SSD storage for sub-second page loads
              at enterprise scale.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="bg-white border border-[#E5E0D8] rounded-2xl p-8 lg:p-10 shadow-sm flex flex-col min-h-[280px]"
          >
            <div className="w-12 h-12 rounded-xl bg-[#4F46E5]/10 flex items-center justify-center mb-6">
              <Shield size={20} className="text-[#4F46E5]" />
            </div>
            <h3 className="font-display text-2xl font-bold text-[#1A1A2E] mb-3">
              Threat Immunity
            </h3>
            <p className="text-sm text-[#6B6B7B] leading-relaxed">
              Automated malware scanning & removal, free SSL certificates, and
              domain privacy protection built in.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="bg-white border border-[#E5E0D8] rounded-2xl p-8 lg:p-10 shadow-sm flex flex-col min-h-[280px]"
          >
            <div className="w-12 h-12 rounded-xl bg-[#4F46E5]/10 flex items-center justify-center mb-6">
              <Globe size={20} className="text-[#4F46E5]" />
            </div>
            <h3 className="font-display text-2xl font-bold text-[#1A1A2E] mb-3">
              Global CDN
            </h3>
            <p className="text-sm text-[#6B6B7B] leading-relaxed">
              Free CDN, 100-site hosting, and 400k+ monthly visit capacity.
              Your content, everywhere, instantly.
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {features.map((feat, i) => (
            <motion.div
              key={feat.label}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.03 }}
              className="bg-white border border-[#E5E0D8] rounded-xl p-6 lg:p-8 group hover:border-[#4F46E5]/30 hover:shadow-md transition-all duration-300"
            >
              <div className="w-10 h-10 rounded-lg bg-[#4F46E5]/5 flex items-center justify-center mb-4 group-hover:bg-[#4F46E5]/10 transition-colors">
                <feat.icon
                  size={18}
                  className="text-[#6B6B7B] group-hover:text-[#4F46E5] transition-colors duration-300"
                />
              </div>
              <h4 className="font-mono text-[11px] uppercase tracking-[0.15em] text-[#1A1A2E] font-bold mb-2">
                {feat.label}
              </h4>
              <p className="text-xs text-[#6B6B7B]/70 leading-relaxed hidden md:block">
                {feat.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}