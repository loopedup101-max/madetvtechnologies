import React from "react";
import DataStreams from "./DataStreams";
import Navbar from "./Navbar";
import FooterSection from "./FooterSection";

export default function SubPageLayout({ children }) {
  return (
    <div className="relative min-h-screen bg-[#FAF8F5] overflow-x-hidden">
      <DataStreams />
      <Navbar />
      <main className="relative z-10 pt-20 lg:pt-28">
        {children}
      </main>
      <FooterSection />
    </div>
  );
}