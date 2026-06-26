import React from "react";
import { motion } from "framer-motion";
import { Globe } from "lucide-react";

const statusColors = {
  active: "text-emerald-400",
  expiring: "text-[#FFB800]",
  expired: "text-red-400",
  pending_transfer: "text-[#8E9196]",
};

export default function DomainsList({ domains }) {
  if (domains.length === 0) {
    return (
      <div className="border border-white/5 bg-white/[0.02] p-12 text-center">
        <Globe size={24} className="text-[#8E9196]/40 mx-auto mb-3" />
        <p className="text-[#8E9196]">No domains registered yet.</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {domains.map((domain, i) => (
        <motion.div
          key={domain.id}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.05 }}
          className="border border-white/5 bg-white/[0.02] p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
        >
          <div className="flex items-center gap-4">
            <Globe size={18} className="text-[#FFB800] shrink-0" />
            <div>
              <h3 className="font-mono text-sm text-[#F2F2F2] font-bold">{domain.domain_name}</h3>
              <div className="flex flex-wrap gap-3 text-xs text-[#8E9196] font-mono mt-1">
                <span>Registered: {domain.registration_date}</span>
                <span>• Expires: {domain.expiry_date}</span>
                {domain.auto_renew && <span className="text-emerald-400">• Auto-renew on</span>}
              </div>
            </div>
          </div>
          <span className={`font-mono text-xs uppercase tracking-widest ${statusColors[domain.status] || statusColors.active}`}>
            {domain.status}
          </span>
        </motion.div>
      ))}
    </div>
  );
}