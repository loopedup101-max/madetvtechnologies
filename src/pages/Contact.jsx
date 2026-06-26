import React, { useState } from "react";
import { motion } from "framer-motion";
import { Send, CheckCircle2, AlertCircle } from "lucide-react";
import SubPageLayout from "@/components/hosting/SubPageLayout";
import { base44 } from "@/api/base44Client";

const subjects = ["Sales Inquiry", "Technical Support", "Migration Help", "Billing Question", "Partnership", "Other"];

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", subject: "Sales Inquiry", message: "" });
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      setError("Please fill in all fields.");
      return;
    }
    setStatus("submitting");
    setError("");
    try {
      await base44.entities.Lead.create({
        name: form.name,
        email: form.email,
        type: "contact",
        subject: form.subject,
        message: form.message,
      });

      await base44.integrations.Core.SendEmail({
        to: form.email,
        subject: "We received your message - NexusHost",
        body: `Hi ${form.name},\n\nThank you for contacting NexusHost. We've received your message regarding "${form.subject}" and our team will respond within 24 hours.\n\nYour message:\n${form.message}\n\nWe'll be in touch soon.\n\nThe NexusHost Team`,
      });

      setStatus("submitted");
    } catch (err) {
      setStatus("error");
      setError("Something went wrong. Please try again.");
    }
  };

  return (
    <SubPageLayout>
      <section className="py-16 lg:py-24">
        <div className="max-w-3xl mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <p className="font-mono text-xs uppercase tracking-[0.4em] text-[#FFB800] mb-4">
              Get In Touch
            </p>
            <h1 className="font-display text-3xl md:text-5xl font-extrabold text-[#F2F2F2] tracking-tight mb-6">
              CONTACT US
            </h1>
            <p className="text-lg text-[#8E9196] leading-relaxed mb-12">
              Have a question about our hosting plans, need technical support, or
              want to talk about a custom infrastructure solution? Fill out the form
              below and our team will respond within 24 hours.
            </p>
          </motion.div>

          {status === "submitted" ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="border border-[#FFB800]/30 bg-[#FFB800]/[0.03] p-12 text-center"
            >
              <CheckCircle2 size={48} className="text-[#FFB800] mx-auto mb-6" />
              <h2 className="font-display text-2xl font-bold text-[#F2F2F2] mb-3">
                Message Sent
              </h2>
              <p className="text-[#8E9196] leading-relaxed max-w-md mx-auto">
                Thank you for reaching out, {form.name}. We've sent a confirmation
                email to {form.email}. Our team will respond within 24 hours.
              </p>
            </motion.div>
          ) : (
            <motion.form
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              onSubmit={handleSubmit}
              className="space-y-6"
            >
              <div>
                <label className="block font-mono text-[10px] uppercase tracking-[0.3em] text-[#8E9196] mb-3">
                  Your Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Jane Doe"
                  className="w-full bg-white/[0.03] border border-white/10 px-5 py-4 text-[#F2F2F2] placeholder:text-[#8E9196]/40 font-body focus:outline-none focus:border-[#FFB800]/50 transition-colors min-h-[44px]"
                />
              </div>

              <div>
                <label className="block font-mono text-[10px] uppercase tracking-[0.3em] text-[#8E9196] mb-3">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="jane@example.com"
                  className="w-full bg-white/[0.03] border border-white/10 px-5 py-4 text-[#F2F2F2] placeholder:text-[#8E9196]/40 font-body focus:outline-none focus:border-[#FFB800]/50 transition-colors min-h-[44px]"
                />
              </div>

              <div>
                <label className="block font-mono text-[10px] uppercase tracking-[0.3em] text-[#8E9196] mb-3">
                  Subject
                </label>
                <select
                  name="subject"
                  value={form.subject}
                  onChange={handleChange}
                  className="w-full bg-white/[0.03] border border-white/10 px-5 py-4 text-[#F2F2F2] font-body focus:outline-none focus:border-[#FFB800]/50 transition-colors min-h-[44px] appearance-none"
                >
                  {subjects.map((s) => (
                    <option key={s} value={s} className="bg-[#0A0A0B] text-[#F2F2F2]">{s}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block font-mono text-[10px] uppercase tracking-[0.3em] text-[#8E9196] mb-3">
                  Message
                </label>
                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  rows={6}
                  placeholder="Tell us how we can help..."
                  className="w-full bg-white/[0.03] border border-white/10 px-5 py-4 text-[#F2F2F2] placeholder:text-[#8E9196]/40 font-body focus:outline-none focus:border-[#FFB800]/50 transition-colors resize-none"
                />
              </div>

              {error && (
                <div className="flex items-center gap-2 text-[#FFB800] text-sm">
                  <AlertCircle size={16} />
                  <span>{error}</span>
                </div>
              )}

              <button
                type="submit"
                disabled={status === "submitting"}
                className="w-full flex items-center justify-center gap-3 px-8 py-4 bg-[#FFB800] text-[#0A0A0B] font-display font-bold text-sm tracking-wider uppercase hover:bg-[#FFB800]/90 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed min-h-[44px] focus:outline-none focus:ring-2 focus:ring-[#FFB800] focus:ring-offset-2 focus:ring-offset-[#0A0A0B]"
              >
                {status === "submitting" ? "Sending..." : "Send Message"}
                {status !== "submitting" && <Send size={16} />}
              </button>
            </motion.form>
          )}
        </div>
      </section>
    </SubPageLayout>
  );
}