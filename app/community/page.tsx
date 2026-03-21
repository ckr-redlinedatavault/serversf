"use client";

import { Users, MessageSquare, Globe, Heart, Shield, Sparkles, Zap, ArrowRight, Github, Twitter, Linkedin } from "lucide-react";
import Link from "next/link";
import Navbar from "../components/home/Navbar";
import SubNavbar from "../components/home/SubNavbar";
import Footer from "../components/home/Footer";
import Breadcrumbs from "../components/Breadcrumbs";

export default function CommunityPage() {
  const communityStats = [
    { label: "Active Members", value: "25k+", icon: Users },
    { label: "Global Chapters", value: "120+", icon: Globe },
    { label: "Monthly Events", value: "45+", icon: Sparkles },
    { label: "Resource Shares", value: "10k+", icon: Zap },
  ];

  const initiatives = [
    {
      title: "Student Forge Forums",
      description: "Join the discussion on everything from deep-tech to career growth. Our moderated forums are the heart of our knowledge exchange.",
      icon: MessageSquare,
      link: "#",
      tag: "Active"
    },
    {
      title: "Global Chapters",
      description: "Connect with local student leaders and professionals in your city. Each chapter hosts monthly meetups and workshops.",
      icon: Globe,
      link: "#",
      tag: "Growing"
    },
    {
      title: "Mentorship Program",
      description: "Get paired with industry veterans who can guide your journey. A 1:1 program designed for high-impact learning.",
      icon: Shield,
      link: "#",
      tag: "Premium"
    },
    {
      title: "Open Source Collective",
      description: "Contribute to real-world projects used by thousands. Learn version control and collaborative development by doing.",
      icon: Github,
      link: "#",
      tag: "Social"
    }
  ];

  return (
    <div className="min-h-screen bg-white text-zinc-900 font-sans selection:bg-[#0055FF]/10">
      <Navbar />
      <SubNavbar />
      
      <main className="w-full">
        {/* Hero Section - Minimal & Strong */}
        <section className="bg-black py-20 lg:py-32 overflow-hidden relative">
          {/* Subtle background element */}
          <div className="absolute top-0 right-0 w-1/3 h-full bg-[#0055FF]/10 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2" />
          
          <div className="mx-auto max-w-7xl px-6 lg:px-10 relative z-10">
            <Breadcrumbs items={[{ label: "Global", href: "/" }, { label: "Community" }]} />
            
            <div className="mt-12 max-w-3xl">
              <div className="flex items-center gap-2 mb-6">
                <div className="h-2 w-2 bg-[#0055FF] rotate-45" />
                <span className="text-[12px] font-bold text-zinc-400 uppercase tracking-widest">Collective Intelligence</span>
              </div>
              <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-white leading-[1.1]">
                Built by students, <span className="text-[#0055FF]">for the future.</span>
              </h1>
              <p className="mt-8 text-lg md:text-xl text-zinc-400 font-medium leading-relaxed max-w-2xl">
                We are more than a platform. We are a global network of ambitious individuals forging the next era of technology and innovation.
              </p>
              
              <div className="mt-12 flex flex-wrap gap-4">
                <button className="h-14 px-8 bg-white text-black text-[13px] font-bold uppercase tracking-widest hover:bg-[#0055FF] hover:text-white transition-all">
                  Join Discord
                </button>
                <button className="h-14 px-8 border border-zinc-800 text-white text-[13px] font-bold uppercase tracking-widest hover:bg-zinc-900 transition-all">
                  Explore Forums
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Grid */}
        <section className="border-b border-zinc-100 bg-zinc-50/30">
          <div className="mx-auto max-w-7xl px-6 lg:px-10 py-16 md:py-24">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
              {communityStats.map((stat, i) => (
                <div key={i} className="flex flex-col gap-4">
                  <div className="flex items-center gap-3">
                    <stat.icon className="h-5 w-5 text-[#0055FF]" strokeWidth={1.5} />
                    <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">{stat.label}</span>
                  </div>
                  <span className="text-4xl md:text-5xl font-bold tracking-tighter text-zinc-900">{stat.value}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Initiatives - The Forge Grid */}
        <section className="py-24 md:py-32">
          <div className="mx-auto max-w-7xl px-6 lg:px-10">
            <div className="mb-20 space-y-4">
                <span className="text-[11px] font-bold text-[#0055FF] uppercase tracking-[0.2em]">Our Ecosystem</span>
                <h2 className="text-4xl font-bold tracking-tight md:text-5xl">How we connect.</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
              {initiatives.map((item, i) => (
                <div key={i} className="group flex flex-col justify-between border border-zinc-100 p-8 lg:p-12 hover:border-[#0055FF]/30 transition-all hover:shadow-xl hover:shadow-zinc-100 relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
                    <item.icon className="h-24 w-24" />
                  </div>
                  
                  <div>
                    <div className="flex justify-between items-start mb-8">
                      <div className="h-14 w-14 flex items-center justify-center bg-zinc-900 text-white group-hover:bg-[#0055FF] transition-colors">
                        <item.icon className="h-6 w-6" strokeWidth={1.5} />
                      </div>
                      <span className="px-3 py-1 bg-zinc-50 border border-zinc-100 text-[10px] font-bold uppercase tracking-widest text-zinc-500">
                        {item.tag}
                      </span>
                    </div>
                    
                    <h3 className="text-2xl font-bold mb-4">{item.title}</h3>
                    <p className="text-zinc-500 text-[15px] leading-relaxed font-medium line-clamp-3">
                      {item.description}
                    </p>
                  </div>
                  
                  <Link href={item.link} className="mt-12 inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.2em] text-zinc-900 group-hover:text-[#0055FF] transition-colors">
                    Join Initiative <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Social Proof / Call to Action */}
        <section className="bg-zinc-900 py-24 md:py-40 relative overflow-hidden">
          <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#0055FF]/50 to-transparent" />
          
          <div className="mx-auto max-w-7xl px-6 lg:px-10 text-center relative z-10">
            <div className="inline-flex h-16 w-16 items-center justify-center bg-[#0055FF] text-white mb-10 shadow-2xl shadow-[#0055FF]/20">
              <Users className="h-8 w-8" />
            </div>
            <h2 className="text-4xl md:text-6xl font-bold tracking-tight text-white mb-8">
              Ready to forge <br className="hidden md:block" /> your path?
            </h2>
            <p className="mx-auto max-w-2xl text-zinc-400 text-lg font-medium leading-relaxed mb-12">
              Join thousands of other student leaders, developers, and creators. The community is open, the resources are free, and the opportunities are endless.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <button className="h-14 w-full sm:w-auto px-12 bg-[#0055FF] text-white text-[13px] font-bold uppercase tracking-widest hover:opacity-90 transition-all shadow-xl shadow-[#0055FF]/10">
                Become a Member
              </button>
              <div className="flex gap-4">
                <Link href="#" className="h-14 w-14 flex items-center justify-center border border-zinc-800 text-white hover:bg-zinc-800 transition-colors">
                    <Twitter className="h-5 w-5" />
                </Link>
                <Link href="#" className="h-14 w-14 flex items-center justify-center border border-zinc-800 text-white hover:bg-zinc-800 transition-colors">
                    <Linkedin className="h-5 w-5" />
                </Link>
                 <Link href="#" className="h-14 w-14 flex items-center justify-center border border-zinc-800 text-white hover:bg-zinc-800 transition-colors">
                    <Github className="h-5 w-5" />
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}
