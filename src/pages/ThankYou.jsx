import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { CheckCircle2, Server, Headphones, BookOpen } from "lucide-react";
import SubPageLayout from "@/components/hosting/SubPageLayout";

export default function ThankYou() {
  return (
    <SubPageLayout>
      <section className="py-16 lg:py-32">
        <div className="max-w-2xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring" }}
              className="inline-flex mb-8"
            >
              <div className="relative">
                <div className="absolute inset-0 rounded-full bg-[#4F46E5]/20 blur-2xl" />
                <CheckCircle2 size={64} className="text-[#4F46E5] relative" />
              </div>
            </motion.div>

            <p className="font-mono text-xs uppercase tracking-[0.4em] text-[#4F46E5] mb-4">
              Payment Confirmed
            </p>
            <h1 className="font-display text-3xl md:text-5xl font-extrabold text-[#1A1A2E] tracking-tight mb-6">
              WELCOME TO MADETECHNOLOGIES
            </h1>
            <p className="text-lg text-[#6B6B7B] leading-relaxed mb-12">
              Your subscription is being provisioned. You'll receive a confirmation
              email shortly with your account details. Your hosting environment
              will be fully active within minutes.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
              <Link
                to="/dashboard"
                className="border border-[#E5E0D8] bg-white p-6 hover:border-[#4F46E5]/30 transition-all duration-300 group"
              >
                <Server size={20} className="text-[#4F46E5] mb-3" />
                <h3 className="font-display text-sm font-bold text-[#1A1A2E] mb-1">View Dashboard</h3>
                <p className="text-xs text-[#6B6B7B]">Manage your subscriptions</p>
              </Link>
              <Link
                to="/support"
                className="border border-[#E5E0D8] bg-white p-6 hover:border-[#4F46E5]/30 transition-all duration-300 group"
              >
                <Headphones size={20} className="text-[#4F46E5] mb-3" />
                <h3 className="font-display text-sm font-bold text-[#1A1A2E] mb-1">Get Support</h3>
                <p className="text-xs text-[#6B6B7B]">Open a support ticket</p>
              </Link>
              <Link
                to="/kb"
                className="border border-[#E5E0D8] bg-white p-6 hover:border-[#4F46E5]/30 transition-all duration-300 group"
              >
                <BookOpen size={20} className="text-[#4F46E5] mb-3" />
                <h3 className="font-display text-sm font-bold text-[#1A1A2E] mb-1">Knowledge Base</h3>
                <p className="text-xs text-[#6B6B7B]">Browse setup guides</p>
              </Link>
            </div>

            <Link
              to="/"
              className="inline-flex items-center px-8 py-4 bg-[#4F46E5] text-[#FAF8F5] font-display font-bold text-sm tracking-wider uppercase hover:bg-[#4F46E5]/90 transition-all min-h-[44px]"
            >
              Back to Homepage
            </Link>
          </motion.div>
        </div>
      </section>
    </SubPageLayout>
  );
}