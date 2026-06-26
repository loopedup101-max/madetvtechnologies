import React, { useState } from "react";
import DataStreams from "@/components/hosting/DataStreams";
import Navbar from "@/components/hosting/Navbar";
import HeroSection from "@/components/hosting/HeroSection";
import PricingSection from "@/components/hosting/PricingSection";
import InfrastructureSection from "@/components/hosting/InfrastructureSection";
import FooterSection from "@/components/hosting/FooterSection";

export default function Home() {
  const [selectedPlan, setSelectedPlan] = useState(null);

  const handleSelectPlan = (planInfo) => {
    setSelectedPlan(planInfo);
  };

  return (
    <div className="relative min-h-screen bg-[#FAF8F5] overflow-x-hidden">
      <DataStreams />
      <Navbar />
      <HeroSection />
      <PricingSection onSelectPlan={handleSelectPlan} />
      <InfrastructureSection />
      <FooterSection selectedPlan={selectedPlan} />
    </div>
  );
}