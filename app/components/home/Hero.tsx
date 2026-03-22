"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-white py-12 lg:py-16">
      {/* Increased 90-Degree Corner Alignment Decorative Circle - Bottom Left - Updated to Blue and solid */}
      <div className="absolute bottom-0 left-0 h-[250px] w-[250px] rounded-tr-full bg-[#0055FF] pointer-events-none" />

      <div className="mx-auto max-w-7xl px-6 lg:px-10 relative z-10">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-20">

          <div className="text-center lg:text-left relative z-20">
            {/* Minimal Badge */}
            <div className="mb-4">
              <span className="border border-zinc-200 bg-white/80 backdrop-blur-sm px-3 py-1 text-[12px] text-zinc-500">
                Welcome to
              </span>
            </div>

            {/* Main Heading - Clean & Normal Weight */}
            <h1 className="mb-2 text-4xl tracking-tight text-zinc-900 md:text-5xl lg:text-6xl">
              Student Forge
              <span className="mx-4 hidden text-zinc-200 lg:inline-block"></span>
              <span className="block text-zinc-400 lg:inline-block">Academy</span>
            </h1>

            {/* Description */}
            <p className="mx-auto mb-6 max-w-lg text-[15px] leading-relaxed text-zinc-600 lg:mx-0">
              A simple platform for student engineers.
              Build projects, learn new skills, and get your certificate with easy tools made for the next generation of students.
            </p>

            {/* Sharp Edged Action Buttons */}
            <div className="flex flex-col gap-4 sm:flex-row sm:justify-center lg:justify-start">
              <Link
                href="/courses"
                className="flex h-12 items-center justify-center bg-black px-10 text-[15px] text-white transition-opacity hover:opacity-90 active:scale-[0.98] font-medium"
              >
                View Courses
              </Link>

              <Link
                href="/projects"
                className="flex h-12 items-center justify-center border border-black px-10 text-[14px] text-black transition-colors hover:bg-zinc-50 active:scale-[0.98]"
              >
                Explore Opportunities
              </Link>
            </div>
          </div>

          {/* Animation Section - Improved Mobile Alignment */}
          <div className="relative flex justify-center opacity-90 lg:justify-end z-20 mt-10 lg:mt-0">
            <div className="relative w-full max-w-[320px] sm:max-w-[420px] lg:max-w-[450px] aspect-square flex items-center justify-center">



              {/* @ts-expect-error - dotlottie-wc is a custom web component */}
              <dotlottie-wc
                src="https://lottie.host/e8e91eee-73f3-4713-8da0-90515e71ca53/ksbz9RrOE3.lottie"
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