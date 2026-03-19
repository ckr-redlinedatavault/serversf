"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-white py-12 lg:py-24">
      {/* Increased 90-Degree Corner Alignment Decorative Circle - Bottom Left */}
      <div className="absolute bottom-0 left-0 h-[400px] w-[400px] rounded-tr-full bg-[#92E3A9] pointer-events-none" />
      
      <div className="mx-auto max-w-7xl px-6 lg:px-10 relative z-10">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-20">

          <div className="text-center lg:text-left relative z-20">
            {/* Minimal Badge */}
            <div className="mb-6">
              <span className="border border-zinc-200 bg-white/80 backdrop-blur-sm px-3 py-1 text-[12px] text-zinc-500">
                Welcome to
              </span>
            </div>

            {/* Main Heading - Clean & Normal Weight */}
            <h1 className="mb-6 text-4xl tracking-tight text-zinc-900 md:text-5xl lg:text-6xl">
              Student Forge
              <span className="mx-4 hidden text-zinc-200 lg:inline-block"></span>
              <span className="block text-zinc-400 lg:inline-block">Academy</span>
            </h1>

            {/* Description */}
            <p className="mx-auto mb-10 max-w-lg text-[15px] leading-relaxed text-zinc-600 lg:mx-0">
              A simple platform for student engineers. 
              Build projects, learn new skills, and get your certificate with easy tools made for the next generation of students.
            </p>

            {/* Sharp Edged Action Buttons */}
            <div className="flex flex-col gap-4 sm:flex-row sm:justify-center lg:justify-start">
              <Link
                href="/hackathon/submit"
                className="flex h-12 items-center justify-center bg-black px-10 text-[14px] text-white transition-opacity hover:opacity-90 active:scale-[0.98]"
              >
                Submit Project
              </Link>

              <Link
                href="/projects"
                className="flex h-12 items-center justify-center border border-black px-10 text-[14px] text-black transition-colors hover:bg-zinc-50 active:scale-[0.98]"
              >
                View Projects
              </Link>
            </div>
          </div>

          {/* Animation Section - Improved Mobile Alignment */}
          <div className="relative flex justify-center opacity-90 lg:justify-end z-20 mt-12 lg:mt-0">
            <div className="relative w-full max-w-[320px] sm:max-w-[420px] lg:max-w-[520px] aspect-square flex items-center justify-center">
              
              {/* Interaction Tooltip / Speech Bubble - Better Mobile Center */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="absolute -top-6 left-1/2 -translate-x-1/2 sm:left-auto sm:translate-x-0 sm:top-4 sm:right-6 z-30 flex flex-col items-center sm:items-end gap-2 w-full sm:w-auto"
              >
                <div className="relative bg-black px-5 py-2.5 text-[11px] sm:text-[12px] font-medium text-white shadow-2xl whitespace-nowrap">
                  {"Hi! I'm Catty. I'm here to help you.".split("").map((char, i) => (
                    <motion.span
                      key={i}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: i * 0.03 }}
                    >
                      {char}
                    </motion.span>
                  ))}
                  {/* Speech bubble tail - Centered for mobile */}
                  <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 sm:left-auto sm:right-8 h-2.5 w-2.5 rotate-45 bg-black" />
                </div>
                
                {/* Secondary Message with Typewriter Reveal */}
                <div className="bg-zinc-900 px-3 py-1.5 text-[10px] sm:text-[11px] font-bold text-[#92E3A9] shadow-xl">
                  {"Ready to start!".split("").map((char, i) => (
                    <motion.span
                      key={i}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 1.5 + i * 0.04 }}
                    >
                      {char}
                    </motion.span>
                  ))}
                </div>
              </motion.div>

              {/* @ts-expect-error - dotlottie-wc is a custom web component */}
              <dotlottie-wc
                src="https://lottie.host/2ae4304a-a072-4326-8d6e-a48f7a4f2198/AfAWtXSkBa.lottie"
                style={{ width: '100%', height: '100%' }}
                autoplay
                loop
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}