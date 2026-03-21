"use client";

import Script from "next/script";
import Navbar from "./components/home/Navbar";
import SubNavbar from "./components/home/SubNavbar";
import TopBanner from "./components/home/TopBanner";
import Hero from "./components/home/Hero";
import QuoteSection from "./components/home/QuoteSection";
import Resources from "./components/home/Resources";
import Impact from "./components/home/Impact";
import Footer from "./components/home/Footer";

export default function Home() {
  return (
    <div className="min-h-screen w-full flex flex-col bg-white text-zinc-900 font-sans">
      <Script
        src="https://unpkg.com/@lottiefiles/dotlottie-wc@0.9.3/dist/dotlottie-wc.js"
        type="module"
      />
      
      <TopBanner />
      <Navbar />
      <SubNavbar />

      <main className="flex-1 w-full">
        <Hero />
        <QuoteSection />
        <Resources />
        <Impact />
      </main>

      <Footer />
    </div>
  );
}
