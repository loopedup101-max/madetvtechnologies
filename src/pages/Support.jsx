import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Plus, ArrowLeft, Send, Loader2, Headphones } from "lucide-react";
import SubPageLayout from "@/components/hosting/SubPageLayout";
import { base44 } from "@/api/base44Client";

const categories = ["technical", "billing", "migration", "general", "security"];
const priorities = ["low", "medium", "high", "urgent"];

const statusColors = {
  open: "text-[#4F46E5] border-[#4F46E5]/30 bg-[#4F46E5]/[0.03]",
  in_progress: "text-blue-400 border-blue-400/30 bg-blue-400/[0.03]",
  resolved: "text-emerald-400 border-emerald-400/30 bg-emerald-400/[0.03]",
  closed: "text-[#6B6B7B] border-[#6B6B7B]/30 bg-[#6B6B7B]/[0.03]",
};

export default function Support() {
  const [email, setEmail] = useState(localStorage.getItem("customer_email") || "");
  const [entered, setEntered] = useState(!!localStorage.getItem("customer_email"));
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [form, setForm] = useState({ subject: "", description: "", category: "general", priority: "medium" });
  const [reply, setReply] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (entered && email) loadTickets();
  }, []);

  const loadTickets = async () => {
    setLoading(true);
    try {
      const list = await base44.entities.SupportTicket.filter({ customer_email: email }, "-created_date", 50);
      setTickets(list || []);
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  const handleEmailSubmit = (e) => {
    e.preventDefault();
    if (!email.includes("@")) return;
    localStorage.setItem("customer_email", email);
    setEntered(true);
    loadTickets();
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const ticketNum = `TKT-${Date.now().toString().slice(-8)}`;
      await base44.entities.SupportTicket.create({
        ...form,
        customer_email: email,
        customer_name: email.split("@")[0],
        ticket_number: ticketNum,
        status: "open",
        messages: [{
          author: email,
          role: "customer",
          content: form.description,
          timestamp: new Date().toISOString(),
        }],
      });

      await base44.integrations.Core.SendEmail({
        to: email,
        subject: `Support Ticket ${ticketNum} Created - MadeTechnologies`,
        body: `Hi,\n\nWe've received your support ticket "${form.subject}" (Ticket #${ticketNum}).\n\nOur team will respond within 24 hours.\n\nThe MadeTechnologies Team`,
      });

      setForm({ subject: "", description: "", category: "general", priority: "medium" });
      setShowForm(false);
      await loadTickets();
    } catch (err) {
      console.error(err);
      alert("Failed to create ticket. Please try again.");
    }
    setSubmitting(false);
  };

  const handleReply = async (e) => {
    e.preventDefault();
    if (!reply.trim()) return;
    setSubmitting(true);
    try {
      const updatedMessages = [...(selectedTicket.messages || []), {
        author: email,
        role: "customer",
        content: reply,
        timestamp: new Date().toISOString(),
      }];
      await base44.entities.SupportTicket.update(selectedTicket.id, { messages: updatedMessages });
      setSelectedTicket({ ...selectedTicket, messages: updatedMessages });
      setReply("");
    } catch (err) {
      console.error(err);
    }
    setSubmitting(false);
  };

  if (!entered) {
    return (
      <SubPageLayout>
        <section className="py-16 lg:py-32">
          <div className="max-w-md mx-auto px-6">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <Headphones size={24} className="text-[#4F46E5] mb-4" />
              <p className="font-mono text-xs uppercase tracking-[0.4em] text-[#4F46E5] mb-4">Support Center</p>
              <h1 className="font-display text-3xl md:text-4xl font-extrabold text-[#1A1A2E] tracking-tight mb-4">GET SUPPORT</h1>
              <p className="text-[#6B6B7B] mb-8 leading-relaxed">Enter your email to view your support tickets and create new ones.</p>
              <form onSubmit={handleEmailSubmit} className="space-y-4">
                <input type="email" placeholder="you@email.com" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full bg-white border border-[#D8D2C8] px-5 py-4 text-[#1A1A2E] placeholder:text-[#6B6B7B]/40 font-body focus:outline-none focus:border-[#4F46E5]/50 min-h-[44px]" />
                <button type="submit" className="w-full px-8 py-4 bg-[#4F46E5] text-[#FAF8F5] font-display font-bold text-sm tracking-wider uppercase hover:bg-[#4F46E5]/90 min-h-[44px]">Access Support</button>
              </form>
            </motion.div>
          </div>
        </section>
      </SubPageLayout>
    );
  }

  if (selectedTicket) {
    return (
      <SubPageLayout>
        <section className="py-16 lg:py-24">
          <div className="max-w-3xl mx-auto px-6 lg:px-8">
            <button onClick={() => setSelectedTicket(null)} className="flex items-center gap-2 text-[#6B6B7B] hover:text-[#4F46E5] transition-colors mb-6 text-sm font-mono min-h-[44px]">
              <ArrowLeft size={16} /> All Tickets
            </button>

            <div className="border border-[#E5E0D8] bg-white p-8 mb-6">
              <div className="flex items-start justify-between gap-4 mb-4">
                <div>
                  <p className="font-mono text-xs text-[#6B6B7B] mb-2">{selectedTicket.ticket_number}</p>
                  <h1 className="font-display text-xl md:text-2xl font-bold text-[#1A1A2E]">{selectedTicket.subject}</h1>
                </div>
                <span className={`px-3 py-1 text-[10px] font-mono uppercase tracking-widest border whitespace-nowrap ${statusColors[selectedTicket.status] || statusColors.open}`}>
                  {selectedTicket.status}
                </span>
              </div>
              <div className="flex flex-wrap gap-3 text-xs font-mono text-[#6B6B7B]">
                <span className="text-[#4F46E5]">{selectedTicket.category}</span>
                <span>• Priority: {selectedTicket.priority}</span>
              </div>
            </div>

            <div className="space-y-4 mb-8">
              {(selectedTicket.messages || []).map((msg, i) => (
                <div key={i} className={`flex ${msg.role === "customer" ? "justify-end" : "justify-start"}`}>
                  <div className={`max-w-[80%] border p-4 ${msg.role === "customer" ? "border-[#4F46E5]/20 bg-[#4F46E5]/[0.03]" : "border-[#E5E0D8] bg-white"}`}>
                    <p className="text-[10px] font-mono text-[#6B6B7B] mb-2">{msg.role === "customer" ? "You" : "Support Agent"} • {new Date(msg.timestamp).toLocaleString()}</p>
                    <p className="text-sm text-[#1A1A2E] leading-relaxed">{msg.content}</p>
                  </div>
                </div>
              ))}
            </div>

            {selectedTicket.status !== "closed" && (
              <form onSubmit={handleReply} className="space-y-3">
                <textarea
                  value={reply}
                  onChange={(e) => setReply(e.target.value)}
                  rows={3}
                  placeholder="Type your reply..."
                  className="w-full bg-white border border-[#D8D2C8] px-5 py-4 text-[#1A1A2E] placeholder:text-[#6B6B7B]/40 font-body focus:outline-none focus:border-[#4F46E5]/50 resize-none"
                />
                <button type="submit" disabled={submitting || !reply.trim()} className="flex items-center gap-2 px-6 py-3 bg-[#4F46E5] text-[#FAF8F5] font-display font-bold text-sm tracking-wider uppercase hover:bg-[#4F46E5]/90 min-h-[44px] disabled:opacity-50">
                  {submitting ? <Loader2 size={16} className="animate-spin" /> : <Send size={16} />}
                  Send Reply
                </button>
              </form>
            )}
          </div>
        </section>
      </SubPageLayout>
    );
  }

  return (
    <SubPageLayout>
      <section className="py-16 lg:py-24">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.4em] text-[#4F46E5] mb-2">Support Center</p>
              <h1 className="font-display text-3xl md:text-4xl font-extrabold text-[#1A1A2E] tracking-tight">YOUR TICKETS</h1>
            </div>
            <button onClick={() => setShowForm(!showForm)} className="flex items-center gap-2 px-6 py-3 bg-[#4F46E5] text-[#FAF8F5] font-display font-bold text-sm tracking-wider uppercase hover:bg-[#4F46E5]/90 min-h-[44px]">
              <Plus size={16} /> New Ticket
            </button>
          </div>

          {showForm && (
            <motion.form
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              onSubmit={handleCreate}
              className="border border-[#E5E0D8] bg-white p-6 lg:p-8 mb-8 space-y-4"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block font-mono text-[10px] uppercase tracking-[0.3em] text-[#6B6B7B] mb-3">Category</label>
                  <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} className="w-full bg-white border border-[#D8D2C8] px-5 py-4 text-[#1A1A2E] font-body focus:outline-none focus:border-[#4F46E5]/50 min-h-[44px] appearance-none">
                    {categories.map(c => <option key={c} value={c} className="bg-[#FAF8F5]">{c}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block font-mono text-[10px] uppercase tracking-[0.3em] text-[#6B6B7B] mb-3">Priority</label>
                  <select value={form.priority} onChange={(e) => setForm({ ...form, priority: e.target.value })} className="w-full bg-white border border-[#D8D2C8] px-5 py-4 text-[#1A1A2E] font-body focus:outline-none focus:border-[#4F46E5]/50 min-h-[44px] appearance-none">
                    {priorities.map(p => <option key={p} value={p} className="bg-[#FAF8F5]">{p}</option>)}
                  </select>
                </div>
              </div>
              <div>
                <label className="block font-mono text-[10px] uppercase tracking-[0.3em] text-[#6B6B7B] mb-3">Subject</label>
                <input type="text" value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })} placeholder="Brief description of your issue" className="w-full bg-white border border-[#D8D2C8] px-5 py-4 text-[#1A1A2E] placeholder:text-[#6B6B7B]/40 font-body focus:outline-none focus:border-[#4F46E5]/50 min-h-[44px]" />
              </div>
              <div>
                <label className="block font-mono text-[10px] uppercase tracking-[0.3em] text-[#6B6B7B] mb-3">Description</label>
                <textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} rows={5} placeholder="Describe your issue in detail..." className="w-full bg-white border border-[#D8D2C8] px-5 py-4 text-[#1A1A2E] placeholder:text-[#6B6B7B]/40 font-body focus:outline-none focus:border-[#4F46E5]/50 resize-none" />
              </div>
              <div className="flex gap-3">
                <button type="submit" disabled={submitting || !form.subject || !form.description} className="flex items-center gap-2 px-6 py-3 bg-[#4F46E5] text-[#FAF8F5] font-display font-bold text-sm tracking-wider uppercase hover:bg-[#4F46E5]/90 min-h-[44px] disabled:opacity-50">
                  {submitting ? <Loader2 size={16} className="animate-spin" /> : <Send size={16} />}
                  Submit Ticket
                </button>
                <button type="button" onClick={() => setShowForm(false)} className="px-6 py-3 border border-[#D8D2C8] text-[#6B6B7B] font-mono text-sm uppercase tracking-widest hover:text-[#1A1A2E] min-h-[44px]">
                  Cancel
                </button>
              </div>
            </motion.form>
          )}

          {loading ? (
            <div className="flex justify-center py-20"><Loader2 className="animate-spin text-[#4F46E5]" size={32} /></div>
          ) : tickets.length === 0 ? (
            <div className="border border-[#E5E0D8] bg-white p-12 text-center">
              <Headphones size={24} className="text-[#6B6B7B]/40 mx-auto mb-3" />
              <p className="text-[#6B6B7B]">No support tickets yet. Click "New Ticket" to get help.</p>
            </div>
          ) : (
            <div className="space-y-3">
              {tickets.map((ticket, i) => (
                <motion.button
                  key={ticket.id}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  onClick={() => setSelectedTicket(ticket)}
                  className="w-full text-left border border-[#E5E0D8] bg-white p-6 hover:border-[#4F46E5]/30 transition-all duration-300"
                >
                  <div className="flex items-center justify-between gap-4 mb-2">
                    <h3 className="font-display text-sm font-bold text-[#1A1A2E]">{ticket.subject}</h3>
                    <span className={`px-3 py-1 text-[10px] font-mono uppercase tracking-widest border whitespace-nowrap ${statusColors[ticket.status] || statusColors.open}`}>
                      {ticket.status}
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-3 text-xs font-mono text-[#6B6B7B]">
                    <span>{ticket.ticket_number}</span>
                    <span className="text-[#4F46E5]">• {ticket.category}</span>
                    <span>• {ticket.priority} priority</span>
                  </div>
                </motion.button>
              ))}
            </div>
          )}
        </div>
      </section>
    </SubPageLayout>
  );
}