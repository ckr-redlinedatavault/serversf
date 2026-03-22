"use client";

import Script from "next/script";
import Navbar from "./components/home/Navbar";
import SubNavbar from "./components/home/SubNavbar";
import TopBanner from "./components/home/TopBanner";
import Hero from "./components/home/Hero";
import Resources from "./components/home/Resources";
import Impact from "./components/home/Impact";
import Ecosystem from "./components/home/Ecosystem";
import Community from "./components/home/Community";
import CTA from "./components/home/CTA";
import Footer from "./components/home/Footer";

export default function Home() {
  return (
    <div className="min-h-screen w-full flex flex-col bg-[#F8FAFC] text-[#0F172A] font-sans">
      <Script
        src="https://unpkg.com/@lottiefiles/dotlottie-wc@0.9.3/dist/dotlottie-wc.js"
        type="module"
      />
      
      <TopBanner />
      <Navbar />
      <SubNavbar />

      <main className="flex-1 w-full">
        <Hero />
        <Impact />
        <Resources />
        <Ecosystem />
        <Community />
        <CTA />
      </main>

      <Footer />
    </div>
  );
}
