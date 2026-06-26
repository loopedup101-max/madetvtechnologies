import React from "react";
import { motion } from "framer-motion";
import {
  Shield, Zap, HardDrive, RefreshCw, Globe, Clock,
  Lock, BarChart3, Layers, Settings, Mail, Cpu,
} from "lucide-react";

const SPEED_IMAGE = "https://media.base44.com/images/public/6a3dec0f4ac497c81e535e3f/f9d6f04f5_generated_f9dd35be.png";
const SECURITY_IMAGE = "https://media.base44.com/images/public/6a3dec0f4ac497c81e535e3f/0f847539e_generated_a326a730.png";

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
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#FFB800]/[0.02] to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <p className="font-mono text-xs uppercase tracking-[0.4em] text-[#FFB800] mb-4">
            Infrastructure Blueprint
          </p>
          <h2 className="font-display text-3xl md:text-5xl lg:text-6xl font-extrabold text-[#F2F2F2] tracking-tight">
            ALL PLANS INCLUDE
          </h2>
          <p className="mt-6 max-w-2xl mx-auto text-lg text-[#8E9196] leading-relaxed">
            Every tier ships with enterprise-grade tooling. No upsells, no hidden tiers.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-6 mb-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-1 relative overflow-hidden border border-white/5 bg-white/[0.02] group"
          >
            <div className="absolute inset-0">
              <img
                src={SPEED_IMAGE}
                alt="Abstract light trails representing data speed"
                className="w-full h-full object-cover opacity-20 group-hover:opacity-30 transition-opacity duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0B] via-[#0A0A0B]/70 to-transparent" />
            </div>
            <div className="relative p-8 lg:p-10 flex flex-col justify-end min-h-[320px]">
              <Zap size={20} className="text-[#FFB800] mb-4" />
              <h3 className="font-display text-2xl font-bold text-[#F2F2F2] mb-3">
                NVMe-Powered Speed
              </h3>
              <p className="text-sm text-[#8E9196] leading-relaxed">
                Up to 10x CPU power with NVMe SSD storage for sub-second page loads
                at enterprise scale.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-1 relative overflow-hidden border border-white/5 bg-white/[0.02] group"
          >
            <div className="absolute inset-0">
              <img
                src={SECURITY_IMAGE}
                alt="Digital vault with obsidian plates and silver light"
                className="w-full h-full object-cover opacity-20 group-hover:opacity-30 transition-opacity duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0B] via-[#0A0A0B]/70 to-transparent" />
            </div>
            <div className="relative p-8 lg:p-10 flex flex-col justify-end min-h-[320px]">
              <Shield size={20} className="text-[#FFB800] mb-4" />
              <h3 className="font-display text-2xl font-bold text-[#F2F2F2] mb-3">
                Threat Immunity
              </h3>
              <p className="text-sm text-[#8E9196] leading-relaxed">
                Automated malware scanning & removal, free SSL certificates, and
                domain privacy protection built in.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-1 border border-white/5 bg-white/[0.02] p-8 lg:p-10 flex flex-col justify-end min-h-[320px]"
          >
            <Globe size={20} className="text-[#FFB800] mb-4" />
            <h3 className="font-display text-2xl font-bold text-[#F2F2F2] mb-3">
              Global CDN
            </h3>
            <p className="text-sm text-[#8E9196] leading-relaxed">
              Free CDN, 100-site hosting, and 400k+ monthly visit capacity.
              Your content, everywhere, instantly.
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-px bg-white/5 border border-white/5">
          {features.map((feat, i) => (
            <motion.div
              key={feat.label}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.03 }}
              className="bg-[#0A0A0B] p-6 lg:p-8 group hover:bg-white/[0.03] transition-colors duration-300"
            >
              <feat.icon
                size={18}
                className="text-[#8E9196] group-hover:text-[#FFB800] transition-colors duration-300 mb-4"
              />
              <h4 className="font-mono text-[11px] uppercase tracking-[0.15em] text-[#F2F2F2] font-bold mb-2">
                {feat.label}
              </h4>
              <p className="text-xs text-[#8E9196]/70 leading-relaxed hidden md:block">
                {feat.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}