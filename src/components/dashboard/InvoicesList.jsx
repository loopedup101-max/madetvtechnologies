import React from "react";
import { motion } from "framer-motion";
import { Download } from "lucide-react";

const statusColors = {
  paid: "text-emerald-400",
  pending: "text-[#4F46E5]",
  overdue: "text-red-400",
  refunded: "text-[#6B6B7B]",
};

export default function InvoicesList({ invoices }) {
  if (invoices.length === 0) {
    return (
      <div className="border border-[#E5E0D8] bg-white p-12 text-center">
        <p className="text-[#6B6B7B]">No invoices yet. Invoices appear here after your first payment.</p>
      </div>
    );
  }

  return (
    <div className="border border-[#E5E0D8] bg-white overflow-x-auto">
      <table className="w-full min-w-[600px]">
        <thead>
          <tr className="border-b border-[#E5E0D8]">
            <th className="text-left font-mono text-[10px] uppercase tracking-[0.2em] text-[#6B6B7B] py-4 px-6">Invoice</th>
            <th className="text-left font-mono text-[10px] uppercase tracking-[0.2em] text-[#6B6B7B] py-4 px-6">Date</th>
            <th className="text-left font-mono text-[10px] uppercase tracking-[0.2em] text-[#6B6B7B] py-4 px-6">Plan</th>
            <th className="text-right font-mono text-[10px] uppercase tracking-[0.2em] text-[#6B6B7B] py-4 px-6">Amount</th>
            <th className="text-center font-mono text-[10px] uppercase tracking-[0.2em] text-[#6B6B7B] py-4 px-6">Status</th>
          </tr>
        </thead>
        <tbody>
          {invoices.map((inv, i) => (
            <motion.tr
              key={inv.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: i * 0.03 }}
              className="border-b border-[#E5E0D8] last:border-0 hover:bg-white"
            >
              <td className="py-4 px-6 font-mono text-sm text-[#1A1A2E]">{inv.invoice_number}</td>
              <td className="py-4 px-6 text-sm text-[#6B6B7B]">{inv.paid_date || inv.issue_date}</td>
              <td className="py-4 px-6 text-sm text-[#6B6B7B]">{inv.plan_name}</td>
              <td className="py-4 px-6 text-right font-mono text-sm text-[#1A1A2E]">${inv.amount} {inv.currency}</td>
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