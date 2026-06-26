import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Server, FileText, Globe, Ticket, LogOut, Loader2 } from "lucide-react";
import SubPageLayout from "@/components/hosting/SubPageLayout";
import { base44 } from "@/api/base44Client";
import SubscriptionsList from "@/components/dashboard/SubscriptionsList";
import InvoicesList from "@/components/dashboard/InvoicesList";
import DomainsList from "@/components/dashboard/DomainsList";

export default function Dashboard() {
  const [email, setEmail] = useState(localStorage.getItem("customer_email") || "");
  const [entered, setEntered] = useState(!!localStorage.getItem("customer_email"));
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("subscriptions");
  const [canceling, setCanceling] = useState(null);

  useEffect(() => {
    if (entered && email) loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    try {
      const response = await base44.functions.invoke("get-dashboard", { email });
      setData(response.data);
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
    loadData();
  };

  const handleLogout = () => {
    localStorage.removeItem("customer_email");
    setEntered(false);
    setEmail("");
    setData(null);
  };

  const handleCancel = async (subId, wixSubId) => {
    if (!wixSubId) {
      alert("This subscription can't be cancelled from the dashboard yet. Please contact support.");
      return;
    }
    if (!confirm("Cancel this subscription? You'll keep access until the end of your billing period.")) return;
    setCanceling(subId);
    try {
      await base44.functions.invoke("cancel-subscription", { subscription_id: wixSubId, immediate: false });
      await loadData();
    } catch (err) {
      console.error(err);
      alert("Failed to cancel. Please try again or contact support.");
    }
    setCanceling(null);
  };

  if (!entered) {
    return (
      <SubPageLayout>
        <section className="py-16 lg:py-32">
          <div className="max-w-md mx-auto px-6">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <p className="font-mono text-xs uppercase tracking-[0.4em] text-[#FFB800] mb-4">Account Access</p>
              <h1 className="font-display text-3xl md:text-4xl font-extrabold text-[#F2F2F2] tracking-tight mb-4">DASHBOARD</h1>
              <p className="text-[#8E9196] mb-8 leading-relaxed">
                Enter the email associated with your account to view your subscriptions, invoices, and domains.
              </p>
              <form onSubmit={handleEmailSubmit} className="space-y-4">
                <input
                  type="email"
                  placeholder="you@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-white/[0.03] border border-white/10 px-5 py-4 text-[#F2F2F2] placeholder:text-[#8E9196]/40 font-body focus:outline-none focus:border-[#FFB800]/50 min-h-[44px]"
                />
                <button type="submit" className="w-full px-8 py-4 bg-[#FFB800] text-[#0A0A0B] font-display font-bold text-sm tracking-wider uppercase hover:bg-[#FFB800]/90 min-h-[44px]">
                  Access Dashboard
                </button>
              </form>
            </motion.div>
          </div>
        </section>
      </SubPageLayout>
    );
  }

  const stats = [
    { label: "Active Subs", value: data?.subscriptions?.filter(s => s.status === "active").length || 0, icon: Server },
    { label: "Invoices", value: data?.invoices?.length || 0, icon: FileText },
    { label: "Domains", value: data?.domains?.length || 0, icon: Globe },
    { label: "Open Tickets", value: data?.tickets?.filter(t => t.status === "open" || t.status === "in_progress").length || 0, icon: Ticket },
  ];

  return (
    <SubPageLayout>
      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.4em] text-[#FFB800] mb-2">Welcome back</p>
              <h1 className="font-display text-xl md:text-2xl font-extrabold text-[#F2F2F2] break-all">{email}</h1>
            </div>
            <button onClick={handleLogout} className="flex items-center gap-2 text-[#8E9196] hover:text-[#FFB800] transition-colors text-sm font-mono min-h-[44px]">
              <LogOut size={16} /> Switch Account
            </button>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
            {stats.map((stat) => (
              <div key={stat.label} className="border border-white/5 bg-white/[0.02] p-6">
                <stat.icon size={18} className="text-[#FFB800] mb-3" />
                <div className="font-display text-3xl font-extrabold text-[#F2F2F2]">{stat.value}</div>
                <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#8E9196] mt-1">{stat.label}</div>
              </div>
            ))}
          </div>

          <div className="flex gap-1 p-1 bg-white/[0.03] border border-white/5 mb-8 overflow-x-auto scrollbar-hide">
            {["subscriptions", "invoices", "domains"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-2.5 font-mono text-[10px] uppercase tracking-[0.2em] whitespace-nowrap transition-all min-h-[44px] ${activeTab === tab ? "bg-[#FFB800] text-[#0A0A0B] font-bold" : "text-[#8E9196] hover:text-[#F2F2F2]"}`}
              >
                {tab}
              </button>
            ))}
          </div>

          {loading ? (
            <div className="flex justify-center py-20"><Loader2 className="animate-spin text-[#FFB800]" size={32} /></div>
          ) : activeTab === "subscriptions" ? (
            <SubscriptionsList subscriptions={data?.subscriptions || []} onCancel={handleCancel} canceling={canceling} />
          ) : activeTab === "invoices" ? (
            <InvoicesList invoices={data?.invoices || []} />
          ) : (
            <DomainsList domains={data?.domains || []} />
          )}
        </div>
      </section>
    </SubPageLayout>
  );
}