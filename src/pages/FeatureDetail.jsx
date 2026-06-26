import React from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import SubPageLayout from "@/components/hosting/SubPageLayout";
import {
  Shield, Zap, HardDrive, RefreshCw, Globe, Clock,
  Lock, BarChart3, Layers, Settings, Mail, Cpu,
} from "lucide-react";
import { featureDetails, featureList } from "@/data/features";

const iconMap = {
  Shield, Zap, HardDrive, RefreshCw, Globe, Clock,
  Lock, BarChart3, Layers, Settings, Mail, Cpu,
};

export default function FeatureDetail() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const feature = featureDetails[slug];

  if (!feature) {
    return (
      <SubPageLayout>
        <div className="max-w-4xl mx-auto px-6 py-32 text-center">
          <h1 className="font-display text-3xl font-bold text-[#F2F2F2] mb-4">
            Feature Not Found
          </h1>
          <Link to="/" className="text-[#FFB800] hover:underline">
            Return Home
          </Link>
        </div>
      </SubPageLayout>
    );
  }

  const Icon = iconMap[feature.icon] || Zap;
  const currentIndex = featureList.findIndex((f) => f.slug === slug);
  const nextFeature = featureList[(currentIndex + 1) % featureList.length];

  return (
    <SubPageLayout>
      <div className="max-w-4xl mx-auto px-6 lg:px-8 py-16 lg:py-24">
        <motion.button
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-sm font-mono uppercase tracking-widest text-[#8E9196] hover:text-[#F2F2F2] transition-colors mb-12"
        >
          <ArrowLeft size={16} />
          Back
        </motion.button>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center gap-4 mb-6">
            <div className="w-14 h-14 border border-[#FFB800]/30 bg-[#FFB800]/[0.05] flex items-center justify-center">
              <Icon size={24} className="text-[#FFB800]" />
            </div>
            <p className="font-mono text-xs uppercase tracking-[0.4em] text-[#FFB800]">
              Included on every plan
            </p>
          </div>

          <h1 className="font-display text-3xl md:text-5xl lg:text-6xl font-extrabold text-[#F2F2F2] tracking-tight mb-4">
            {feature.label}
          </h1>
          <p className="text-lg text-[#8E9196] leading-relaxed mb-12">
            {feature.tagline}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-px bg-white/5 border border-white/5 mb-12"
        >
          {feature.stats.map((stat, i) => (
            <div key={i} className="bg-[#0A0A0B] p-6 text-center">
              <p className="font-display text-xl md:text-2xl font-bold text-[#FFB800] mb-1">
                {stat.value}
              </p>
              <p className="font-mono text-[10px] uppercase tracking-[0.15em] text-[#8E9196]">
                {stat.label}
              </p>
            </div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-16"
        >
          <h2 className="font-display text-xl font-bold text-[#F2F2F2] mb-4">
            Overview
          </h2>
          <p className="text-[#8E9196] leading-relaxed text-base lg:text-lg">
            {feature.description}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mb-16"
        >
          <h2 className="font-display text-xl font-bold text-[#F2F2F2] mb-6">
            What's Included
          </h2>
          <div className="space-y-4">
            {feature.points.map((point, i) => (
              <div key={i} className="flex items-start gap-3">
                <Check size={18} className="text-[#FFB800] mt-0.5 flex-shrink-0" />
                <p className="text-[#8E9196] leading-relaxed">{point}</p>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="border border-[#FFB800]/20 bg-[#FFB800]/[0.02] p-8 lg:p-10 text-center"
        >
          <h3 className="font-display text-2xl font-bold text-[#F2F2F2] mb-3">
            Ready to get started?
          </h3>
          <p className="text-[#8E9196] mb-6 max-w-md mx-auto">
            This feature is included on every MadeTechnologies plan. Choose your plan and get started today.
          </p>
          <Link
            to="/"
            onClick={(e) => {
              e.preventDefault();
              navigate("/");
              setTimeout(() => {
                document.getElementById("pricing")?.scrollIntoView({ behavior: "smooth" });
              }, 300);
            }}
            className="inline-flex items-center gap-2 px-8 py-4 bg-[#FFB800] text-[#0A0A0B] font-display font-bold text-sm tracking-wider uppercase hover:bg-[#FFB800]/90 transition-all"
          >
            View Pricing
            <ArrowRight size={16} />
          </Link>
        </motion.div>

        {nextFeature && (
          <div className="mt-12 pt-8 border-t border-white/5">
            <Link
              to={`/features/${nextFeature.slug}`}
              className="flex items-center justify-between group"
            >
              <div>
                <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-[#8E9196] mb-1">
                  Next Feature
                </p>
                <p className="font-display text-lg font-bold text-[#F2F2F2] group-hover:text-[#FFB800] transition-colors">
                  {nextFeature.label}
                </p>
              </div>
              <ArrowRight size={20} className="text-[#8E9196] group-hover:text-[#FFB800] transition-colors" />
            </Link>
          </div>
        )}
      </div>
    </SubPageLayout>
  );
}