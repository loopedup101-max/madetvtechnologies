import React from "react";
import { motion } from "framer-motion";
import SubPageLayout from "@/components/hosting/SubPageLayout";

const sections = [
  {
    title: "1. Acceptance of Terms",
    body: "By accessing or using NexusHost hosting services, you agree to be bound by these Terms of Service. If you do not agree to these terms, you may not access or use our services. These terms constitute a legally binding agreement between you and NexusHost.",
  },
  {
    title: "2. Description of Service",
    body: "NexusHost provides web hosting, VPS, dedicated server, and related infrastructure services. We strive to maintain 99.99% uptime but do not guarantee uninterrupted service. We reserve the right to modify, suspend, or discontinue any service at any time with reasonable notice to affected customers.",
  },
  {
    title: "3. Account Registration",
    body: "You must provide accurate and complete information when creating an account. You are responsible for maintaining the security of your account credentials and for all activities under your account. You must be at least 16 years old to create an account. You agree to notify us immediately of any unauthorized use of your account.",
  },
  {
    title: "4. Acceptable Use Policy",
    body: "You agree not to use our services to host or transmit illegal content, malware, or spam. Prohibited activities include distributing copyrighted material without authorization, launching attacks on other systems, hosting child exploitation material, sending unsolicited bulk email, and engaging in any activity that violates applicable laws. Violations may result in immediate suspension without refund.",
  },
  {
    title: "5. Payment and Billing",
    body: "Fees are billed in advance on a recurring basis according to your selected billing cycle. Prices shown are promotional rates for the initial term and renew at the regular rate indicated at checkout. All fees are non-refundable except where required by law. We may change pricing with 30 days notice. Failed payments may result in service suspension.",
  },
  {
    title: "6. Service Level Agreement",
    body: "We guarantee 99.99% monthly uptime for all hosting plans. If we fail to meet this SLA, affected customers may request a service credit equal to 5% of the monthly fee for each hour of downtime beyond the guaranteed threshold, up to 50% of the monthly fee. Service credits must be requested within 7 days of the incident.",
  },
  {
    title: "7. Backups and Data Loss",
    body: "We provide weekly automated backups for shared hosting plans. However, you are ultimately responsible for maintaining your own backups. We are not liable for data loss resulting from hardware failure, software errors, user mistakes, or force majeure events. We recommend maintaining off-site backups of all critical data.",
  },
  {
    title: "8. Intellectual Property",
    body: "All software, tools, branding, and content provided by NexusHost remain our intellectual property. You retain all rights to the content and data you host on our platform. You grant us a limited license to access your data solely for the purpose of providing and maintaining our services.",
  },
  {
    title: "9. Limitation of Liability",
    body: "NexusHost shall not be liable for any indirect, incidental, special, or consequential damages, including loss of profits, data, or business opportunities. Our total liability shall not exceed the amount you paid for our services in the three months preceding the claim. This limitation applies regardless of the cause of action.",
  },
  {
    title: "10. Indemnification",
    body: "You agree to indemnify and hold NexusHost harmless from any claims, damages, or expenses arising from your use of our services, your violation of these terms, or your infringement of third-party rights. We reserve the right to assume exclusive defense of any matter subject to indemnification.",
  },
  {
    title: "11. Termination",
    body: "You may cancel your account at any time through your account dashboard. We may terminate or suspend your account immediately if you violate these terms, fail to pay fees, or engage in activities that harm our infrastructure or other customers. Upon termination, your data will be deleted within 30 days unless legally restricted.",
  },
  {
    title: "12. Modifications to Terms",
    body: "We may modify these Terms of Service at any time. Material changes will be communicated via email at least 30 days before taking effect. Continued use of our services after the effective date constitutes acceptance of the modified terms.",
  },
  {
    title: "13. Governing Law",
    body: "These terms are governed by the laws of the jurisdiction in which NexusHost is incorporated, without regard to conflict of law principles. Any disputes shall be resolved through binding arbitration, except where prohibited by local consumer protection laws.",
  },
  {
    title: "14. Contact Information",
    body: "For questions about these Terms of Service, please contact us through our contact page. Our legal team is available to address any concerns regarding your use of our services.",
  },
];

export default function Terms() {
  return (
    <SubPageLayout>
      <div className="max-w-4xl mx-auto px-6 lg:px-8 py-16 lg:py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <p className="font-mono text-xs uppercase tracking-[0.4em] text-[#FFB800] mb-4">
            Legal
          </p>
          <h1 className="font-display text-3xl md:text-5xl font-extrabold text-[#F2F2F2] tracking-tight mb-4">
            TERMS OF SERVICE
          </h1>
          <p className="text-sm text-[#8E9196] font-mono mb-12">
            Last updated: June 2026
          </p>
        </motion.div>

        <div className="space-y-12">
          {sections.map((section, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.03 }}
            >
              <h2 className="font-display text-lg lg:text-xl font-bold text-[#F2F2F2] mb-3">
                {section.title}
              </h2>
              <p className="text-[#8E9196] leading-relaxed text-base lg:text-lg">
                {section.body}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </SubPageLayout>
  );
}