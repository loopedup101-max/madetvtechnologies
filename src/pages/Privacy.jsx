import React from "react";
import { motion } from "framer-motion";
import SubPageLayout from "@/components/hosting/SubPageLayout";

const sections = [
  {
    title: "1. Information We Collect",
    body: "We collect information you provide directly to us when you create an account, purchase hosting services, or contact our support team. This includes your name, email address, billing address, phone number, and payment information. We also automatically collect technical data including IP address, browser type, device information, pages visited, and usage timestamps through server logs and analytics tools.",
  },
  {
    title: "2. How We Use Your Information",
    body: "We use your personal information to provide and manage your hosting services, process payments, send service notifications and account alerts, provide technical support, communicate updates about our products, improve our services and infrastructure, detect and prevent fraud or abuse, and comply with legal obligations. We do not sell your personal data to third parties under any circumstances.",
  },
  {
    title: "3. Information Sharing",
    body: "We share your information only with trusted service providers who help us operate our infrastructure, such as payment processors, CDN providers, and cloud infrastructure partners. These providers are bound by strict data protection agreements. We may also disclose information when required by law, court order, or to protect our rights, property, or safety of our users.",
  },
  {
    title: "4. Data Security",
    body: "We implement industry-standard security measures including TLS encryption for all data in transit, AES-256 encryption for data at rest, multi-factor authentication for administrative access, regular security audits, and real-time malware scanning. Despite these measures, no system is 100% secure, and we cannot guarantee absolute security of your data.",
  },
  {
    title: "5. Cookies and Tracking",
    body: "We use essential cookies to maintain your login session and remember your preferences. We also use analytics cookies to understand how visitors use our website and improve our services. You can control cookies through your browser settings, though disabling essential cookies may affect website functionality. We do not use cookies for targeted advertising.",
  },
  {
    title: "6. Your Rights",
    body: "Depending on your jurisdiction, you may have the right to access the personal data we hold about you, request correction of inaccurate data, request deletion of your data (subject to legal retention requirements), export your data in a portable format, object to certain processing activities, and withdraw consent for data processing. To exercise these rights, contact us through our contact page.",
  },
  {
    title: "7. Data Retention",
    body: "We retain your personal data for as long as your account is active. After account closure, we retain data for up to 90 days for billing and legal purposes, after which it is permanently deleted. Server backups are retained for 30 days. Certain data may be retained longer if required by law or for legitimate business purposes such as fraud prevention.",
  },
  {
    title: "8. International Data Transfers",
    body: "As a global hosting provider, your data may be processed in countries other than your own. We ensure all international transfers comply with applicable data protection laws, including the EU GDPR and UK data protection regulations. We use Standard Contractual Clauses and other safeguards for transfers outside the EEA.",
  },
  {
    title: "9. Children's Privacy",
    body: "Our services are not directed to children under 16, and we do not knowingly collect personal data from children. If you believe a child has provided us with personal data, please contact us immediately, and we will take steps to delete such information.",
  },
  {
    title: "10. Changes to This Policy",
    body: "We may update this Privacy Policy from time to time. We will notify you of material changes by email or by posting a prominent notice on our website. The effective date at the top of this policy indicates when it was last updated. Continued use of our services after changes constitutes acceptance of the updated policy.",
  },
  {
    title: "11. Contact Us",
    body: "If you have questions about this Privacy Policy or how we handle your data, please reach out through our contact page. We are committed to addressing your privacy concerns promptly and transparently.",
  },
];

export default function Privacy() {
  return (
    <SubPageLayout>
      <div className="max-w-4xl mx-auto px-6 lg:px-8 py-16 lg:py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <p className="font-mono text-xs uppercase tracking-[0.4em] text-[#4F46E5] mb-4">
            Legal
          </p>
          <h1 className="font-display text-3xl md:text-5xl font-extrabold text-[#1A1A2E] tracking-tight mb-4">
            PRIVACY POLICY
          </h1>
          <p className="text-sm text-[#6B6B7B] font-mono mb-12">
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
              transition={{ duration: 0.4, delay: i * 0.05 }}
            >
              <h2 className="font-display text-lg lg:text-xl font-bold text-[#1A1A2E] mb-3">
                {section.title}
              </h2>
              <p className="text-[#6B6B7B] leading-relaxed text-base lg:text-lg">
                {section.body}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </SubPageLayout>
  );
}