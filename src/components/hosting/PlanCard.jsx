import React from "react";
import { motion } from "framer-motion";
import { Check } from "lucide-react";

export default function PlanCard({ plan, index, billingPeriod, categoryName, onSelectPlan }) {
  const priceData = plan.prices[billingPeriod];

  const handleChoosePlan = (e) => {
    e.preventDefault();
    onSelectPlan(`${categoryName} - ${plan.name}`, plan.prices[billingPeriod].price);
    document.getElementById("migration")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className={`relative group flex flex-col h-full ${plan.popular ? "lg:-mt-4 lg:mb-4" : ""}`}
    >
      {plan.popular && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-20">
          <div className="relative">
            <div
              className="absolute inset-0 rounded-full"
              style={{ animation: "signalPulse 2s ease-out infinite" }}
            >
              <div className="w-full h-full rounded-full bg-[#FFB800]/20" />
            </div>
            <span className="relative block px-4 py-1.5 bg-[#FFB800] text-[#0A0A0B] font-mono text-[10px] uppercase tracking-[0.3em] font-bold whitespace-nowrap">
              Most Popular
            </span>
          </div>
        </div>
      )}

      <div
        className={`relative flex flex-col h-full border transition-all duration-500 ${
          plan.popular
            ? "border-[#FFB800]/40 bg-[#FFB800]/[0.03]"
            : "border-white/5 bg-white/[0.02] hover:border-white/10"
        }`}
        style={plan.popular ? { animation: "pulseGlow 3s ease-in-out infinite" } : {}}
      >
        <div className="p-6 lg:p-8 flex-1 flex flex-col">
          <div className="mb-6">
            <h3 className="font-display text-xl font-bold text-[#F2F2F2] tracking-wide">
              {plan.name}
            </h3>
            <p className="mt-2 text-sm text-[#8E9196] leading-relaxed font-body min-h-[40px]">
              {plan.tagline}
            </p>
          </div>

          <div className="mb-6">
            <div className="flex items-baseline gap-1">
              <span className="font-display text-4xl lg:text-5xl font-extrabold text-[#F2F2F2]">
                ${priceData.price}
              </span>
              <span className="text-[#8E9196] font-mono text-sm">/mo</span>
            </div>
            <div className="mt-2 flex items-center gap-2">
              <span className="font-mono text-xs text-[#FFB800] font-bold">
                Save {priceData.savings}
              </span>
              <span className="text-[10px] text-[#8E9196] font-mono">
                For {billingPeriod} month term
              </span>
            </div>
            <p className="mt-1 text-[10px] text-[#8E9196]/60 font-mono">
              Renews at ${priceData.renewPrice}/mo
            </p>
          </div>

          <a
            href="#migration"
            onClick={handleChoosePlan}
            className={`block w-full text-center py-4 font-display font-bold text-sm tracking-wider uppercase transition-all duration-300 min-h-[44px] focus:outline-none focus:ring-2 focus:ring-[#FFB800] focus:ring-offset-2 focus:ring-offset-[#0A0A0B] ${
              plan.popular
                ? "bg-[#FFB800] text-[#0A0A0B] hover:bg-[#FFB800]/90"
                : "border border-[#8E9196]/20 text-[#F2F2F2] hover:border-[#FFB800] hover:text-[#FFB800]"
            }`}
          >
            Choose Plan
          </a>

          <div className="mt-8 space-y-3 flex-1">
            {plan.features.map((feat, i) => (
              <div key={i} className="flex items-start gap-3">
                <Check size={14} className="text-[#FFB800] mt-0.5 shrink-0" />
                <span className="text-sm text-[#8E9196] font-body leading-snug">
                  {feat}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}