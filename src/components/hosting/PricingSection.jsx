import React, { useState } from "react";
import { motion } from "framer-motion";
import PlanCard from "./PlanCard";
import { planCategories, categoryKeys } from "@/data/plans";

export default function PricingSection({ onSelectPlan }) {
  const [billingPeriod, setBillingPeriod] = useState("36");
  const [activeCategory, setActiveCategory] = useState("high_performance");

  const currentCategory = planCategories[activeCategory];

  return (
    <section id="pricing" className="relative py-24 lg:py-40">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="font-mono text-xs uppercase tracking-[0.4em] text-[#4F46E5] mb-4">
            Performance Matrix
          </p>
          <h2 className="font-display text-3xl md:text-5xl lg:text-6xl font-extrabold text-[#1A1A2E] tracking-tight">
            CHOOSE YOUR TIER
          </h2>
        </motion.div>

        <div className="flex justify-center mb-10 overflow-x-auto scrollbar-hide">
          <div className="flex gap-1 p-1 bg-white border border-[#E5E0D8]">
            {categoryKeys.map((key) => (
              <button
                key={key}
                onClick={() => setActiveCategory(key)}
                className={`px-4 py-2.5 font-mono text-[10px] uppercase tracking-[0.2em] whitespace-nowrap transition-all duration-300 min-h-[44px] ${
                  activeCategory === key
                    ? "bg-[#4F46E5] text-[#FAF8F5] font-bold"
                    : "text-[#6B6B7B] hover:text-[#1A1A2E]"
                }`}
              >
                {planCategories[key].label}
              </button>
            ))}
          </div>
        </div>

        <div className="flex justify-center mb-14">
          <div className="flex items-center gap-4 p-1 bg-white border border-[#E5E0D8]">
            <button
              onClick={() => setBillingPeriod("12")}
              className={`px-6 py-2.5 font-mono text-xs uppercase tracking-widest transition-all duration-300 min-h-[44px] ${
                billingPeriod === "12"
                  ? "bg-[#4F46E5]/10 text-[#1A1A2E]"
                  : "text-[#6B6B7B] hover:text-[#1A1A2E]"
              }`}
            >
              12 Months
            </button>
            <button
              onClick={() => setBillingPeriod("36")}
              className={`px-6 py-2.5 font-mono text-xs uppercase tracking-widest transition-all duration-300 min-h-[44px] ${
                billingPeriod === "36"
                  ? "bg-[#4F46E5]/10 text-[#1A1A2E]"
                  : "text-[#6B6B7B] hover:text-[#1A1A2E]"
              }`}
            >
              36 Months
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
          {currentCategory.plans.map((plan, i) => (
            <PlanCard
              key={plan.name}
              plan={plan}
              index={i}
              billingPeriod={billingPeriod}
              categoryName={currentCategory.label}
              categoryKey={activeCategory}
              onSelectPlan={onSelectPlan}
            />
          ))}
        </div>
      </div>
    </section>
  );
}