import React from "react";
import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";
import SideWaves from "./SideWaves";

const HERO_IMAGE = "https://media.base44.com/images/public/6a3dec0f4ac497c81e535e3f/f62438dd5_generated_21340133.png";

export default function HeroSection() {
  const scrollToSection = (e, id) => {
    e.preventDefault();
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      <div className="absolute inset-0 bg-gradient-to-b from-[#0A0A0B] via-[#0A0A0B] to-transparent z-0" />
      <SideWaves />

      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] md:w-[700px] md:h-[700px] z-0">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="w-full h-full relative">
          
          <div className="absolute inset-0 rounded-full bg-[#FFB800]/5 blur-3xl" />
          <img
            src={HERO_IMAGE}
            alt="Futuristic processor core with glowing amber circuits"
            className="w-full h-full object-contain opacity-40 mix-blend-lighten" />
          
        </motion.div>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}>
          
          <p className="font-mono text-xs uppercase tracking-[0.4em] text-[#FFB800] mb-8">
            High-Performance Cloud Hosting
          </p>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="font-display font-extrabold text-[#F2F2F2] leading-[0.95] tracking-tight">
          
          <span className="block text-4xl sm:text-4xl md:text-4xl lg:text-4xl">WHERE HIGH TRAFFIC

          </span>
          <span className="block text-4xl mt-2 sm:text-4xl md:text-4xl lg:text-4xl">MEETS HIGH-

          </span>
          <span className="block mt-2 text-[#FFB800] text-4xl sm:text-4xl md:text-4xl lg:text-4xl">PERFORMANCE

          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9 }}
          className="mt-10 max-w-2xl mx-auto text-lg md:text-xl text-[#8E9196] leading-relaxed font-body">
          
          Expanded NVMe storage. Enhanced CPU performance. Websites that load
          faster, scale seamlessly, and repel the latest threats.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.1 }}
          className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4">
          
          <a
            href="#pricing"
            onClick={(e) => scrollToSection(e, "pricing")}
            className="px-10 py-4 bg-[#FFB800] text-[#0A0A0B] font-display font-bold tracking-wider uppercase hover:bg-[#FFB800]/90 transition-all duration-300 min-h-[44px] flex items-center text-xs">
            
            Explore Plans
          </a>
          <a
            href="#infrastructure"
            onClick={(e) => scrollToSection(e, "infrastructure")}
            className="px-10 py-4 border border-[#8E9196]/30 text-[#F2F2F2] font-display font-bold tracking-wider uppercase hover:border-[#FFB800]/50 hover:text-[#FFB800] transition-all duration-300 min-h-[44px] flex items-center text-xs">
            
            Learn More
          </a>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10">
        
        <a href="#pricing" onClick={(e) => scrollToSection(e, "pricing")} className="flex flex-col items-center gap-2 text-[#8E9196] hover:text-[#FFB800] transition-colors">
          <span className="font-mono text-[10px] uppercase tracking-[0.3em]">Scroll</span>
          <ArrowDown size={16} className="animate-bounce" />
        </a>
      </motion.div>
    </section>);

}