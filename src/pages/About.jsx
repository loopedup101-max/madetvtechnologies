import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Zap, Shield, Globe, Users, Server, Award } from "lucide-react";
import SubPageLayout from "@/components/hosting/SubPageLayout";

const stats = [
  { value: "99.99%", label: "Uptime SLA", icon: Zap },
  { value: "12", label: "Global Data Centers", icon: Globe },
  { value: "500K+", label: "Sites Hosted", icon: Server },
  { value: "24/7", label: "Expert Support", icon: Award },
];

const values = [
  {
    icon: Zap,
    title: "Performance First",
    body: "Every decision we make starts with a simple question: does this make our customers' sites faster? From NVMe storage to optimized CPU allocation, performance is in our DNA.",
  },
  {
    icon: Shield,
    title: "Security by Default",
    body: "We treat your data like our own. Free SSL, automated malware scanning, DDoS protection, and proactive threat detection are included on every plan — not sold as add-ons.",
  },
  {
    icon: Globe,
    title: "Built to Scale",
    body: "Whether you're hosting a personal blog or a million-visitor e-commerce platform, our infrastructure scales with you. No migrations needed when you outgrow your current plan.",
  },
  {
    icon: Users,
    title: "Human Support",
    body: "Real engineers, available around the clock. No chatbots, no endless phone trees. When you need help, you talk to someone who can actually solve your problem.",
  },
];

export default function About() {
  return (
    <SubPageLayout>
      <section className="relative py-16 lg:py-32">
        <div className="max-w-5xl mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <p className="font-mono text-xs uppercase tracking-[0.4em] text-[#4F46E5] mb-4">
              Our Story
            </p>
            <h1 className="font-display text-3xl md:text-5xl lg:text-6xl font-extrabold text-[#1A1A2E] tracking-tight leading-[0.95]">
              INFRASTRUCTURE BUILT FOR
              <span className="text-[#4F46E5]"> WHAT'S NEXT</span>
            </h1>
            <p className="mt-8 text-lg lg:text-xl text-[#6B6B7B] leading-relaxed max-w-3xl">
              MadeTechnologies was founded on a simple belief: web hosting shouldn't be a
              compromise between speed, security, and affordability. We built our
              infrastructure from the ground up to deliver all three — without
              cutting corners or hiding essential features behind paywalls.
            </p>
            <p className="mt-6 text-lg text-[#6B6B7B] leading-relaxed max-w-3xl">
              From our first server to a global network spanning 12 data centers,
              we've stayed focused on what matters: giving our customers the tools
              they need to build, scale, and protect their online presence.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-16 lg:py-24 border-y border-[#E5E0D8]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="text-center"
              >
                <stat.icon size={20} className="text-[#4F46E5] mx-auto mb-4" />
                <div className="font-display text-3xl lg:text-5xl font-extrabold text-[#1A1A2E] mb-2">
                  {stat.value}
                </div>
                <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#6B6B7B]">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-32">
        <div className="max-w-5xl mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <p className="font-mono text-xs uppercase tracking-[0.4em] text-[#4F46E5] mb-4">
              What Drives Us
            </p>
            <h2 className="font-display text-3xl md:text-5xl font-extrabold text-[#1A1A2E] tracking-tight">
              OUR VALUES
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
            {values.map((value, i) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="border border-[#E5E0D8] bg-white p-8 lg:p-10"
              >
                <value.icon size={20} className="text-[#4F46E5] mb-6" />
                <h3 className="font-display text-xl font-bold text-[#1A1A2E] mb-3">
                  {value.title}
                </h3>
                <p className="text-[#6B6B7B] leading-relaxed">
                  {value.body}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-32 border-t border-[#E5E0D8]">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="font-display text-3xl md:text-5xl font-extrabold text-[#1A1A2E] tracking-tight mb-6">
              READY TO GET STARTED?
            </h2>
            <p className="text-lg text-[#6B6B7B] max-w-xl mx-auto mb-10">
              Explore our hosting plans and find the infrastructure that fits your needs.
            </p>
            <Link
              to="/"
              className="inline-flex items-center gap-3 px-10 py-4 bg-[#4F46E5] text-[#FAF8F5] font-display font-bold text-sm tracking-wider uppercase hover:bg-[#4F46E5]/90 transition-all duration-300 min-h-[44px]"
            >
              View Pricing
              <ArrowRight size={16} />
            </Link>
          </motion.div>
        </div>
      </section>
    </SubPageLayout>
  );
}