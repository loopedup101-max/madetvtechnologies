import React from "react";
import { motion } from "framer-motion";
import { Check } from "lucide-react";

export default function ComparisonTable({ plans, billingPeriod }) {
  const maxFeatures = Math.max(...plans.map((p) => p.features.length));

  const rows = Array.from({ length: maxFeatures }, (_, i) => i);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="mt-20 lg:mt-28 overflow-x-auto scrollbar-hide"
    >
      <div className="min-w-[700px]">
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b border-white/10">
              <th className="text-left p-4 lg:p-5 font-mono text-[10px] uppercase tracking-[0.2em] text-[#8E9196] align-bottom">
                Compare
              </th>
              {plans.map((plan) => (
                <th
                  key={plan.name}
                  className={`text-left p-4 lg:p-5 align-bottom ${
                    plan.popular ? "bg-[#FFB800]/[0.03]" : ""
                  }`}
                >
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-display text-lg font-bold text-[#F2F2F2]">
                      {plan.name}
                    </span>
                    {plan.popular && (
                      <span className="px-2 py-0.5 bg-[#FFB800] text-[#0A0A0B] font-mono text-[8px] uppercase tracking-widest font-bold">
                        Popular
                      </span>
                    )}
                  </div>
                  <div className="flex items-baseline gap-1">
                    <span className="font-display text-2xl font-extrabold text-[#F2F2F2]">
                      ${plan.prices[billingPeriod].price}
                    </span>
                    <span className="text-[#8E9196] font-mono text-xs">/mo</span>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((rowIdx) => (
              <tr
                key={rowIdx}
                className="border-b border-white/5 hover:bg-white/[0.02] transition-colors"
              >
                <td className="p-4 lg:p-5 font-mono text-[10px] uppercase tracking-[0.15em] text-[#8E9196] align-top">
                  {plans[0].features[rowIdx]?.split(" ").slice(1).join(" ") ||
                    "Feature"}
                </td>
                {plans.map((plan) => {
                  const feat = plan.features[rowIdx];
                  return (
                    <td
                      key={plan.name}
                      className={`p-4 lg:p-5 text-sm text-[#F2F2F2] align-top ${
                        plan.popular ? "bg-[#FFB800]/[0.03]" : ""
                      }`}
                    >
                      {feat ? (
                        <span className="flex items-center gap-2">
                          <Check
                            size={14}
                            className="text-[#FFB800] shrink-0"
                          />
                          {feat}
                        </span>
                      ) : (
                        <span className="text-[#8E9196]/40">—</span>
                      )}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
}