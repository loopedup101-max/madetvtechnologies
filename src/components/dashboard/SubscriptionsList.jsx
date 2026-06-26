import React from "react";
import { motion } from "framer-motion";
import { Loader2, X } from "lucide-react";

const statusColors = {
  active: "text-emerald-400 border-emerald-400/30 bg-emerald-400/[0.03]",
  pending: "text-[#FFB800] border-[#FFB800]/30 bg-[#FFB800]/[0.03]",
  suspended: "text-orange-400 border-orange-400/30 bg-orange-400/[0.03]",
  cancelled: "text-red-400 border-red-400/30 bg-red-400/[0.03]",
};

export default function SubscriptionsList({ subscriptions, onCancel, canceling }) {
  if (subscriptions.length === 0) {
    return (
      <div className="border border-white/5 bg-white/[0.02] p-12 text-center">
        <p className="text-[#8E9196]">No subscriptions yet. Choose a plan to get started.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {subscriptions.map((sub, i) => (
        <motion.div
          key={sub.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.05 }}
          className="border border-white/5 bg-white/[0.02] p-6 lg:p-8"
        >
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <h3 className="font-display text-lg font-bold text-[#F2F2F2]">{sub.plan_name}</h3>
                <span className={`px-3 py-1 text-[10px] font-mono uppercase tracking-widest border ${statusColors[sub.status] || statusColors.pending}`}>
                  {sub.status}
                </span>
              </div>
              <div className="flex flex-wrap gap-4 text-sm text-[#8E9196] font-mono">
                <span>${sub.price}/mo</span>
                {sub.domain && <span>• {sub.domain}</span>}
                {sub.renewal_date && <span>• Renews: {sub.renewal_date}</span>}
                <span>• {sub.billing_period_months || 12}mo term</span>
              </div>
            </div>
            {sub.status === "active" && (
              <button
                onClick={() => onCancel(sub.id, sub.wix_subscription_id)}
                disabled={canceling === sub.id}
                className="flex items-center gap-2 px-5 py-2.5 border border-red-400/20 text-red-400 text-xs font-mono uppercase tracking-widest hover:bg-red-400/10 transition-all min-h-[44px] disabled:opacity-50"
              >
                {canceling === sub.id ? <Loader2 size={14} className="animate-spin" /> : <X size={14} />}
                Cancel
              </button>
            )}
          </div>
        </motion.div>
      ))}
    </div>
  );
}