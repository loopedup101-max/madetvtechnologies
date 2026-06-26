import React from "react";
import { motion } from "framer-motion";
import { Download } from "lucide-react";

const statusColors = {
  paid: "text-emerald-400",
  pending: "text-[#FFB800]",
  overdue: "text-red-400",
  refunded: "text-[#8E9196]",
};

export default function InvoicesList({ invoices }) {
  if (invoices.length === 0) {
    return (
      <div className="border border-white/5 bg-white/[0.02] p-12 text-center">
        <p className="text-[#8E9196]">No invoices yet. Invoices appear here after your first payment.</p>
      </div>
    );
  }

  return (
    <div className="border border-white/5 bg-white/[0.02] overflow-x-auto">
      <table className="w-full min-w-[600px]">
        <thead>
          <tr className="border-b border-white/5">
            <th className="text-left font-mono text-[10px] uppercase tracking-[0.2em] text-[#8E9196] py-4 px-6">Invoice</th>
            <th className="text-left font-mono text-[10px] uppercase tracking-[0.2em] text-[#8E9196] py-4 px-6">Date</th>
            <th className="text-left font-mono text-[10px] uppercase tracking-[0.2em] text-[#8E9196] py-4 px-6">Plan</th>
            <th className="text-right font-mono text-[10px] uppercase tracking-[0.2em] text-[#8E9196] py-4 px-6">Amount</th>
            <th className="text-center font-mono text-[10px] uppercase tracking-[0.2em] text-[#8E9196] py-4 px-6">Status</th>
          </tr>
        </thead>
        <tbody>
          {invoices.map((inv, i) => (
            <motion.tr
              key={inv.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: i * 0.03 }}
              className="border-b border-white/5 last:border-0 hover:bg-white/[0.02]"
            >
              <td className="py-4 px-6 font-mono text-sm text-[#F2F2F2]">{inv.invoice_number}</td>
              <td className="py-4 px-6 text-sm text-[#8E9196]">{inv.paid_date || inv.issue_date}</td>
              <td className="py-4 px-6 text-sm text-[#8E9196]">{inv.plan_name}</td>
              <td className="py-4 px-6 text-right font-mono text-sm text-[#F2F2F2]">${inv.amount} {inv.currency}</td>
              <td className="py-4 px-6 text-center">
                <span className={`font-mono text-xs uppercase tracking-widest ${statusColors[inv.status] || statusColors.pending}`}>
                  {inv.status}
                </span>
              </td>
            </motion.tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}