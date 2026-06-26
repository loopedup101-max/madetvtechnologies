import React from "react";
import DataStreams from "@/components/hosting/DataStreams";
import Navbar from "@/components/hosting/Navbar";
import HeroSection from "@/components/hosting/HeroSection";
import PricingSection from "@/components/hosting/PricingSection";
import InfrastructureSection from "@/components/hosting/InfrastructureSection";
import FooterSection from "@/components/hosting/FooterSection";

export default function Home() {
  return (
    <div className="relative min-h-screen bg-[#0A0A0B] overflow-x-hidden">
      <DataStreams />
      <Navbar />
      <HeroSection />
      <PricingSection />
      <InfrastructureSection />
      <FooterSection />
    </div>
  );
}