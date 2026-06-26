import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Shield, Zap, HardDrive, RefreshCw, Globe, Clock,
  Lock, BarChart3, Layers, Settings, Mail, Cpu,
} from "lucide-react";

const SPEED_IMAGE = "https://media.base44.com/images/public/6a3dec0f4ac497c81e535e3f/f9d6f04f5_generated_f9dd35be.png";
const SECURITY_IMAGE = "https://media.base44.com/images/public/6a3dec0f4ac497c81e535e3f/0f847539e_generated_a326a730.png";

const features = [
  { icon: Clock, label: "99.99% Uptime SLA", desc: "Guaranteed availability for mission-critical applications", slug: "uptime-sla" },
  { icon: HardDrive, label: "Daily Backups", desc: "Automated daily snapshots of your entire environment", slug: "daily-backups" },
  { icon: Cpu, label: "AI Site Creation", desc: "Intelligent site generation powered by machine learning", slug: "ai-site-creation" },
  { icon: Layers, label: "Multi-Site Mgmt", desc: "Centralized control for all your hosted properties", slug: "multi-site-mgmt" },
  { icon: Settings, label: "Plugin Management", desc: "One-click installs and updates for your stack", slug: "plugin-management" },
  { icon: BarChart3, label: "Yoast SEO", desc: "Built-in SEO optimization and analysis tools", slug: "yoast-seo" },
  { icon: Shield, label: "Malware Removal", desc: "Real-time threat detection and automated remediation", slug: "malware-removal" },
  { icon: RefreshCw, label: "Free Migration", desc: "Zero-downtime migration from any hosting provider", slug: "free-migration" },
  { icon: Lock, label: "Free SSL", desc: "Auto-provisioned TLS certificates for every domain", slug: "free-ssl" },
  { icon: Zap, label: "Seamless Updates", desc: "Rolling updates with zero service interruption", slug: "seamless-updates" },
  { icon: Mail, label: "Pro Email Trial", desc: "Professional email hosting included free to start", slug: "pro-email-trial" },
  { icon: Globe, label: "24/7 Support", desc: "Expert technical assistance around the clock", slug: "support-24-7" },
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
          <Link to="/features/nvme-speed" className="lg:col-span-1 relative overflow-hidden border border-white/5 bg-white/[0.02] group block">
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
          </Link>

          <Link to="/features/threat-immunity" className="lg:col-span-1 relative overflow-hidden border border-white/5 bg-white/[0.02] group block">
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
          </Link>

          <Link to="/features/global-cdn" className="lg:col-span-1 border border-white/5 bg-white/[0.02] p-8 lg:p-10 flex flex-col justify-end min-h-[320px] group block hover:border-[#FFB800]/20 transition-colors">
            <Globe size={20} className="text-[#FFB800] mb-4" />
            <h3 className="font-display text-2xl font-bold text-[#F2F2F2] mb-3">
              Global CDN
            </h3>
            <p className="text-sm text-[#8E9196] leading-relaxed">
              Free CDN, 100-site hosting, and 400k+ monthly visit capacity.
              Your content, everywhere, instantly.
            </p>
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-px bg-white/5 border border-white/5">
          {features.map((feat, i) => (
            <Link
              key={feat.label}
              to={`/features/${feat.slug}`}
              className="bg-[#0A0A0B] p-6 lg:p-8 group hover:bg-white/[0.03] transition-colors duration-300 block"
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
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}