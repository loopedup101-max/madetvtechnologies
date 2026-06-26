import React from "react";
import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";

export default function HeroSection() {
  const scrollToSection = (e, id) => {
    e.preventDefault();
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      <div className="absolute inset-0 bg-gradient-to-b from-[#F0EDE8] via-[#FAF8F5] to-[#FAF8F5] z-0" />

      <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] rounded-full bg-[#4F46E5]/5 blur-3xl z-0" />
      <div className="absolute bottom-1/4 right-1/4 w-[300px] h-[300px] rounded-full bg-[#C68E17]/5 blur-3xl z-0" />

      <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <p className="font-mono text-xs uppercase tracking-[0.4em] text-[#4F46E5] mb-8">
            High-Performance Cloud Hosting
          </p>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="font-display font-extrabold text-[#1A1A2E] leading-[0.95] tracking-tight"
        >
          <span className="block text-4xl sm:text-5xl md:text-6xl lg:text-7xl">WHERE HIGH TRAFFIC</span>
          <span className="block text-4xl sm:text-5xl md:text-6xl lg:text-7xl mt-2">MEETS HIGH-</span>
          <span className="block mt-2 text-[#4F46E5] text-4xl sm:text-5xl md:text-6xl lg:text-7xl">PERFORMANCE</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9 }}
          className="mt-10 max-w-2xl mx-auto text-lg md:text-xl text-[#6B6B7B] leading-relaxed font-body"
        >
          Expanded NVMe storage. Enhanced CPU performance. Websites that load
          faster, scale seamlessly, and repel the latest threats.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.1 }}
          className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <a
            href="#pricing"
            onClick={(e) => scrollToSection(e, "pricing")}
            className="px-10 py-4 bg-[#4F46E5] text-white font-display font-bold tracking-wider uppercase hover:bg-[#4338CA] transition-all duration-300 min-h-[44px] flex items-center text-xs rounded-lg shadow-lg shadow-[#4F46E5]/20"
          >
            Explore Plans
          </a>
          <a
            href="#infrastructure"
            onClick={(e) => scrollToSection(e, "infrastructure")}
            className="px-10 py-4 border border-[#6B6B7B]/20 text-[#1A1A2E] font-display font-bold tracking-wider uppercase hover:border-[#4F46E5]/50 hover:text-[#4F46E5] transition-all duration-300 min-h-[44px] flex items-center text-xs rounded-lg"
          >
            Learn More
          </a>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10"
      >
        <a href="#pricing" onClick={(e) => scrollToSection(e, "pricing")} className="flex flex-col items-center gap-2 text-[#6B6B7B] hover:text-[#4F46E5] transition-colors">
          <span className="font-mono text-[10px] uppercase tracking-[0.3em]">Scroll</span>
          <ArrowDown size={16} className="animate-bounce" />
        </a>
      </motion.div>
    </section>
  );
}