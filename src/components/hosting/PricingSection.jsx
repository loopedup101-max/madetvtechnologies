import React, { useState } from "react";
import { motion } from "framer-motion";
import PlanCard from "./PlanCard";

const plans = [
  {
    name: "Pro",
    description: "Crafted for growing companies needing power and flexibility",
    price: "9.99",
    savings: "41%",
    renewPrice: "16.99",
    features: [
      "100GB NVMe storage",
      "5x more CPU power",
      "100 websites",
      "~400k monthly visits",
      "Free domain + SSL + CDN",
      "Malware scan & removal",
      "Domain privacy (1yr)",
      "24/7 chat + phone support",
    ],
  },
  {
    name: "Premium",
    description: "Built for sites and apps prioritizing storage and CPU performance",
    price: "13.99",
    savings: "33%",
    renewPrice: "20.99",
    popular: true,
    features: [
      "150GB NVMe storage",
      "6x more CPU power",
      "100 websites",
      "~400k monthly visits",
      "Free domain + SSL + CDN",
      "Malware scan & removal",
      "Domain privacy (1yr)",
      "24/7 chat + phone support",
    ],
  },
  {
    name: "Enhanced",
    description: "For intensive sites and apps requiring powerful tools and storage",
    price: "16.99",
    savings: "32%",
    renewPrice: "24.99",
    features: [
      "200GB NVMe storage",
      "8x more CPU power",
      "100 websites",
      "~400k monthly visits",
      "Free domain + SSL + CDN",
      "Malware scan & removal",
      "Domain privacy (1yr)",
      "24/7 chat + phone support",
    ],
  },
  {
    name: "Elite",
    description: "For brands needing enterprise-grade infrastructure and performance",
    price: "19.99",
    savings: "31%",
    renewPrice: "28.99",
    features: [
      "250GB NVMe storage",
      "10x more CPU power",
      "100 websites",
      "~400k monthly visits",
      "Free domain + SSL + CDN",
      "Malware scan & removal",
      "Domain privacy (1yr)",
      "24/7 chat + phone support",
    ],
  },
];

const categories = ["Standard", "High Performance", "Commerce", "VPS", "Dedicated", "AI Tools", "Agency"];

export default function PricingSection() {
  const [billingPeriod, setBillingPeriod] = useState("36");
  const [activeCategory, setActiveCategory] = useState("High Performance");

  return (
    <section id="pricing" className="relative py-24 lg:py-40">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="font-mono text-xs uppercase tracking-[0.4em] text-[#FFB800] mb-4">
            Performance Matrix
          </p>
          <h2 className="font-display text-3xl md:text-5xl lg:text-6xl font-extrabold text-[#F2F2F2] tracking-tight">
            CHOOSE YOUR TIER
          </h2>
        </motion.div>

        <div className="flex justify-center mb-10 overflow-x-auto scrollbar-hide">
          <div className="flex gap-1 p-1 bg-white/[0.03] border border-white/5">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2.5 font-mono text-[10px] uppercase tracking-[0.2em] whitespace-nowrap transition-all duration-300 min-h-[44px] ${
                  activeCategory === cat
                    ? "bg-[#FFB800] text-[#0A0A0B] font-bold"
                    : "text-[#8E9196] hover:text-[#F2F2F2]"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="flex justify-center mb-14">
          <div className="flex items-center gap-4 p-1 bg-white/[0.03] border border-white/5">
            <button
              onClick={() => setBillingPeriod("12")}
              className={`px-6 py-2.5 font-mono text-xs uppercase tracking-widest transition-all duration-300 min-h-[44px] ${
                billingPeriod === "12"
                  ? "bg-white/10 text-[#F2F2F2]"
                  : "text-[#8E9196] hover:text-[#F2F2F2]"
              }`}
            >
              12 Months
            </button>
            <button
              onClick={() => setBillingPeriod("36")}
              className={`px-6 py-2.5 font-mono text-xs uppercase tracking-widest transition-all duration-300 min-h-[44px] ${
                billingPeriod === "36"
                  ? "bg-white/10 text-[#F2F2F2]"
                  : "text-[#8E9196] hover:text-[#F2F2F2]"
              }`}
            >
              36 Months
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
          {plans.map((plan, i) => (
            <PlanCard
              key={plan.name}
              plan={plan}
              index={i}
              isPopular={plan.popular}
            />
          ))}
        </div>
      </div>
    </section>
  );
}