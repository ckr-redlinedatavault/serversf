"use client";

import { ArrowRight } from "lucide-react";
import Link from "next/link";
import Script from "next/script";

export default function Home() {
  return (
    <div className="min-h-screen w-full flex flex-col bg-[#050505] text-white font-sans">
      <Script
        src="https://unpkg.com/@lottiefiles/dotlottie-wc@0.9.3/dist/dotlottie-wc.js"
        type="module"
      />
      {/* Navbar Minimal */}
      <nav className="w-full bg-[#92E3A9] px-6 py-4 sm:px-24 flex items-center justify-between z-50 shadow-lg sticky top-0">
        <div className="flex items-center gap-4">
          <Link href="/" className="flex items-center gap-3 sm:gap-4">
            <span className="text-xs sm:text-sm font-bold tracking-tight text-zinc-900">Student Forge</span>
            <div className="h-4 w-[1px] bg-zinc-900/20" />
            <span className="text-[9px] sm:text-[10px] font-bold text-zinc-900/70">Servers</span>
          </Link>
        </div>
        <div className="flex gap-4 sm:gap-8">
          <Link href="/courses" className="text-[10px] sm:text-xs font-bold text-zinc-900 border-b-2 border-zinc-900 pb-0.5 sm:pb-1">Courses</Link>
          <Link href="/docs" className="text-[10px] sm:text-xs font-semibold text-zinc-900/80 hover:text-zinc-900 transition-colors hidden xs:block">Docs</Link>
          <Link href="/support" className="text-[10px] sm:text-xs font-semibold text-zinc-900/80 hover:text-zinc-900 transition-colors">Support</Link>
        </div>
      </nav>

      <main className="flex-1 flex flex-col justify-center px-6 sm:px-24 py-12 md:py-20 max-w-[1400px] mx-auto w-full">
        {/* Compact Hero Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 items-center mb-16">
          <div className="w-full text-center lg:text-left">
            <div className="mb-8">
              <span className="text-[10px] font-black text-[#92E3A9] uppercase tracking-widest bg-zinc-900/50 px-3 py-1 rounded-full border border-zinc-800/50">Mission Platform</span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tighter text-white mt-4 leading-[1.1] flex flex-col sm:flex-row items-center lg:items-start justify-center lg:justify-start gap-4 sm:gap-6">
                Student Forge
                <div className="h-1 sm:h-12 w-12 sm:w-[2px] bg-[#92E3A9]" />
                <span className="text-[#92E3A9]">Servers</span>
              </h1>
            </div>

            <p className="text-sm md:text-base text-zinc-500 leading-relaxed max-w-lg font-medium mb-10 mx-auto lg:mx-0">
              A minimalist ecosystem built for student engineers. <br className="hidden sm:block" />
              Build, ship, and certify your craft with high-performance tools.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:flex gap-4 max-w-md lg:max-w-none mx-auto lg:mx-0">
              <Link
                href="/hackathon/submit"
                className="flex h-12 items-center justify-center rounded-xl bg-[#92E3A9] px-8 text-xs font-black text-zinc-900 transition-all hover:bg-white hover:scale-[1.02] active:scale-[0.98] uppercase tracking-widest shadow-lg shadow-[#92E3A9]/10"
              >
                Submit Project
              </Link>
              <Link
                href="/projects"
                className="flex h-12 items-center justify-center rounded-xl border border-zinc-800 bg-zinc-900/50 px-8 text-xs font-bold text-zinc-300 transition-all hover:bg-zinc-800 hover:text-white uppercase tracking-widest"
              >
                View Registry
              </Link>
              <Link
                href="/media/signin"
                className="col-span-1 sm:col-span-2 lg:flex h-12 items-center justify-center rounded-xl border border-[#92E3A9]/20 bg-[#92E3A9]/5 px-8 text-xs font-bold text-[#92E3A9] transition-all hover:bg-[#92E3A9] hover:text-black uppercase tracking-widest"
              >
                Media Access
              </Link>
            </div>
          </div>

          <div className="relative block lg:block scale-110 lg:scale-150 lg:translate-x-12 opacity-90 mx-auto lg:mx-0 max-w-sm lg:max-w-none">
            {/* @ts-expect-error - dotlottie-wc is a custom web component */}
            <dotlottie-wc
              src="https://lottie.host/2ae4304a-a072-4326-8d6e-a48f7a4f2198/AfAWtXSkBa.lottie"
              style={{ width: '100%', height: 'auto', maxHeight: '420px' }}
              autoplay
              loop
            />
          </div>
        </div>

        {/* Compact Service Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 border-t border-white/5 pt-12">
          {[
            {
              title: "Course academy",
              desc: "Professional curriculum designed for the next generation of engineers.",
              href: "/courses"
            },
            {
              title: "Mailer system",
              desc: "Bulk personalized outreach for scaling student communities.",
              href: "/mailer"
            },
            {
              title: "Event engine",
              desc: "Coordinate hackathons and workshops with automated workflows.",
              href: "/events"
            },
            {
              title: "Media portal",
              desc: "Production assets and coordination hub for creators.",
              href: "/media/signin"
            }
          ].map((item, idx) => (
            <Link
              key={idx}
              href={item.href}
              className="group p-8 rounded-2xl bg-zinc-900/40 border border-zinc-800/50 hover:bg-[#92E3A9] hover:border-black/5 transition-all duration-500 flex flex-col gap-4 h-full shadow-xl hover:shadow-[#92E3A9]/20"
            >
              <h3 className="text-xs font-black text-[#92E3A9] group-hover:text-black uppercase tracking-widest transition-colors">
                {item.title}
              </h3>
              <p className="text-xs text-zinc-500 group-hover:text-zinc-900 font-medium leading-relaxed transition-colors">
                {item.desc}
              </p>
              <div className="flex items-center gap-2 text-[9px] font-black text-white group-hover:text-black mt-auto pt-6 border-t border-white/5 group-hover:border-black/10 uppercase tracking-widest transition-all">
                Execute Mission <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          ))}
        </div>
      </main>

      {/* Off-White Footer with Normal Text */}
      <footer className="px-6 sm:px-24 py-10 bg-[#f8f8f8] text-zinc-900 border-t border-zinc-200">
        <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row items-center justify-between gap-10">
          <div className="flex flex-col sm:flex-row items-center gap-6 sm:gap-10">
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.4)]" />
              <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-500">Systems Operational</span>
            </div>
            <div className="h-[1px] w-12 sm:w-[1px] sm:h-4 bg-zinc-300" />
            <div className="flex gap-4">
              <Link href="/admin/login" className="text-[9px] font-black bg-zinc-900 text-white px-4 py-2 rounded-lg hover:bg-black transition-all uppercase tracking-widest">Admin</Link>
              <Link href="/ceo/signin" className="text-[9px] font-black bg-[#92E3A9] text-zinc-900 px-4 py-2 rounded-lg hover:bg-[#7DCF95] transition-all uppercase tracking-widest">CEO</Link>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-8">
            <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">© 2026 Forge Network</span>
            <span className="px-3 py-1 bg-zinc-200 text-zinc-600 rounded-full text-[9px] font-black uppercase tracking-widest">v2.0.4 - stable</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
