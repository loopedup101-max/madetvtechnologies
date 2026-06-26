import React, { useState } from "react";
import { motion } from "framer-motion";
import { Check, Loader2 } from "lucide-react";
import { base44 } from "@/api/base44Client";

export default function PlanCard({ plan, index, billingPeriod, categoryName, categoryKey, onSelectPlan }) {
  const priceData = plan.prices[billingPeriod];

  const [loading, setLoading] = useState(false);

  const handleChoosePlan = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await base44.functions.invoke("create-checkout", {
        plan_name: `${categoryName} - ${plan.name}`,
        plan_category: categoryKey,
        price: parseFloat(priceData.price),
        billing_period: parseInt(billingPeriod),
      });
      if (response.data?.redirectUrl) {
        window.location.href = response.data.redirectUrl;
      }
    } catch (err) {
      console.error("Checkout failed:", err);
      setLoading(false);
    }
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
              <div className="w-full h-full rounded-full bg-[#4F46E5]/20" />
            </div>
            <span className="relative block px-4 py-1.5 bg-[#4F46E5] text-[#FAF8F5] font-mono text-[10px] uppercase tracking-[0.3em] font-bold whitespace-nowrap">
              Most Popular
            </span>
          </div>
        </div>
      )}

      <div
        className={`relative flex flex-col h-full border transition-all duration-500 ${
          plan.popular
            ? "border-[#4F46E5]/40 bg-[#4F46E5]/[0.03]"
            : "border-[#E5E0D8] bg-white hover:border-[#4F46E5]/30"
        }`}
        style={plan.popular ? { animation: "pulseGlow 3s ease-in-out infinite" } : {}}
      >
        <div className="p-6 lg:p-8 flex-1 flex flex-col">
          <div className="mb-6">
            <h3 className="font-display text-xl font-bold text-[#1A1A2E] tracking-wide">
              {plan.name}
            </h3>
            <p className="mt-2 text-sm text-[#6B6B7B] leading-relaxed font-body min-h-[40px]">
              {plan.tagline}
            </p>
          </div>

          <div className="mb-6">
            <div className="flex items-baseline gap-1">
              <span className="font-display text-4xl lg:text-5xl font-extrabold text-[#1A1A2E]">
                ${priceData.price}
              </span>
              <span className="text-[#6B6B7B] font-mono text-sm">/mo</span>
            </div>
            <div className="mt-2 flex items-center gap-2">
              <span className="font-mono text-xs text-[#4F46E5] font-bold">
                Save {priceData.savings}
              </span>
              <span className="text-[10px] text-[#6B6B7B] font-mono">
                For {billingPeriod} month term
              </span>
            </div>
            <p className="mt-1 text-[10px] text-[#6B6B7B]/60 font-mono">
              Renews at ${priceData.renewPrice}/mo
            </p>
          </div>

          <button
            type="button"
            disabled={loading}
            onClick={handleChoosePlan}
            className={`block w-full text-center py-4 font-display font-bold text-sm tracking-wider uppercase transition-all duration-300 min-h-[44px] focus:outline-none focus:ring-2 focus:ring-[#4F46E5] focus:ring-offset-2 focus:ring-offset-[#FAF8F5] disabled:opacity-50 ${
              plan.popular
                ? "bg-[#4F46E5] text-[#FAF8F5] hover:bg-[#4F46E5]/90"
                : "border border-[#6B6B7B]/20 text-[#1A1A2E] hover:border-[#4F46E5] hover:text-[#4F46E5]"
            }`}
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <Loader2 size={16} className="animate-spin" />
                Processing...
              </span>
            ) : (
              "Choose Plan"
            )}
          </button>

          <div className="mt-8 space-y-3 flex-1">
            {plan.features.map((feat, i) => (
              <div key={i} className="flex items-start gap-3">
                <Check size={14} className="text-[#4F46E5] mt-0.5 shrink-0" />
                <span className="text-sm text-[#6B6B7B] font-body leading-snug">
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