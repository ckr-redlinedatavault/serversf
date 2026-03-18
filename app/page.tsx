"use client";

import Script from "next/script";
import Navbar from "./components/home/Navbar";
import Hero from "./components/home/Hero";
import Services from "./components/home/Services";
import Footer from "./components/home/Footer";

export default function Home() {
  return (
    <div className="min-h-screen w-full flex flex-col bg-white text-zinc-900 font-sans">
      <Script
        src="https://unpkg.com/@lottiefiles/dotlottie-wc@0.9.3/dist/dotlottie-wc.js"
        type="module"
      />
      
      <Navbar />

      <main className="flex-1 w-full">
        <Hero />
        <Services />
      </main>

      <Footer />
    </div>
  );
}
