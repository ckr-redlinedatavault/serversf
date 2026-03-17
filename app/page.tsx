"use client";

import { ArrowRight } from "lucide-react";
import Link from "next/link";
import Script from "next/script";

export default function Home() {
  return (
    <div className="h-screen w-full flex flex-col bg-[#050505] text-white overflow-hidden font-sans">
      <Script
        src="https://unpkg.com/@lottiefiles/dotlottie-wc@0.9.3/dist/dotlottie-wc.js"
        type="module"
      />
      {/* Navbar Minimal */}
      <nav className="w-full bg-[#92E3A9] px-12 py-3 sm:px-24 flex items-center justify-between z-50 shadow-lg">
        <div className="flex items-center gap-4">
          <Link href="/" className="flex items-center gap-4">
            <span className="text-sm font-bold tracking-tighter text-zinc-900 uppercase">Student Forge</span>
            <div className="h-4 w-[1px] bg-zinc-900/20" />
            <span className="text-[10px] font-bold tracking-[0.2em] text-zinc-900/70 uppercase">SERVERS</span>
          </Link>
        </div>
        <div className="flex gap-8">
          <Link href="/docs" className="text-xs font-semibold text-zinc-900/80 hover:text-zinc-900 transition-colors">Documentation</Link>
          <Link href="/support" className="text-xs font-semibold text-zinc-900/80 hover:text-zinc-900 transition-colors">Support</Link>
        </div>
      </nav>

      <main className="flex-1 flex flex-col justify-center px-12 sm:px-24 py-4 max-w-[1400px] mx-auto w-full">
        {/* Compact Hero Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center mb-6">
          <div className="w-full">
            <div className="mb-6">
              <span className="text-[10px] font-black text-[#92E3A9] uppercase tracking-[0.4em] ml-1">Welcome to</span>
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-white mt-2 leading-none flex items-center gap-6">
                Student Forge
                <div className="h-10 w-[2px] bg-[#92E3A9]" />
                <span className="text-[#92E3A9] text-3xl font-black uppercase tracking-tighter">Servers</span>
              </h1>
            </div>

            <p className="text-sm text-zinc-500 leading-relaxed max-w-lg font-medium mb-6">
              A minimalist ecosystem for student builders. Build, ship, and certify your craft with zero friction.
            </p>

            <div className="flex flex-col gap-4 sm:flex-row flex-wrap">
              <Link
                href="/get-started"
                className="flex h-10 items-center justify-center rounded-lg bg-[#92E3A9] px-6 text-sm font-bold text-zinc-900 transition-colors hover:bg-[#7DCF95]"
              >
                Get started
              </Link>
              <Link
                href="/projects"
                className="flex h-10 items-center justify-center rounded-lg border border-zinc-800 bg-zinc-900/50 px-6 text-sm font-semibold text-zinc-300 transition-colors hover:bg-zinc-800"
              >
                View projects
              </Link>
              <Link
                href="/media/signin"
                className="flex h-10 items-center justify-center rounded-lg border border-[#92E3A9]/30 bg-[#92E3A9]/5 px-6 text-sm font-bold text-[#92E3A9] transition-all hover:bg-[#92E3A9] hover:text-black"
              >
                Media Team Access
              </Link>
            </div>
          </div>

          <div className="relative hidden lg:block scale-150 translate-x-12 opacity-90">
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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 border-t border-zinc-900 pt-8">
          {[
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
              desc: "Production assets and team coordination hub for creators.",
              href: "/media/signin"
            }
          ].map((item, idx) => (
            <Link
              key={idx}
              href={item.href}
              className="group p-5 rounded-xl bg-zinc-900/30 border border-zinc-800/50 hover:border-[#92E3A9]/50 transition-colors flex flex-col gap-2 h-full"
            >
              <h3 className="text-sm font-semibold text-zinc-100 group-hover:text-[#92E3A9] transition-colors">
                {item.title}
              </h3>
              <p className="text-[12px] text-zinc-500 leading-snug">
                {item.desc}
              </p>
              <div className="flex items-center gap-1 text-[10px] font-bold text-[#92E3A9] uppercase tracking-widest mt-auto pt-2 opacity-80 group-hover:opacity-100">
                Launch mission <ArrowRight className="w-3 h-3" />
              </div>
            </Link>
          ))}
        </div>
      </main>

      {/* Off-White Footer with Normal Text */}
      <footer className="px-12 sm:px-24 py-5 bg-[#f8f8f8] text-zinc-900 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-zinc-200">
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-2.5">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.4)]" />
            <span className="text-xs font-semibold text-zinc-600">Servers are operational</span>
          </div>
          <div className="h-4 w-[1px] bg-zinc-300 hidden sm:block" />
          <span className="text-xs font-medium text-zinc-500">Controlled by CTO and Technical Team</span>
          <Link href="/admin/login" className="text-[10px] font-bold bg-zinc-900 text-white px-3 py-1 rounded-md hover:bg-black transition-colors">SUPER ADMIN</Link>
        </div>

        <div className="flex items-center gap-4">
          <span className="text-xs font-medium text-zinc-400">© 2026 Student Forge</span>
          <span className="px-2 py-0.5 bg-zinc-200 text-zinc-600 rounded text-[10px] font-bold leading-none">v2.0.4 stable</span>
        </div>
      </footer>
    </div>
  );
}
