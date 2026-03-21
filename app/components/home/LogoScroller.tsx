"use client";

import { motion } from "framer-motion";

const logos = [
  { name: "Python", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" },
  { name: "JavaScript", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" },
  { name: "React", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
  { name: "Node.js", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" },
  { name: "TypeScript", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" },
  { name: "Go", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/go/go-original-wordmark.svg" },
  { name: "Java", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg" },
  { name: "PostgreSQL", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg" },
  { name: "Docker", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg" },
  { name: "AWS", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original-wordmark.svg" },
  { name: "Rust", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/rust/rust-plain.svg" },
  { name: "C++", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg" }
];

export default function LogoScroller() {
  return (
    <div className="w-full bg-white py-12 border-b border-zinc-50 overflow-hidden">
      <div className="mx-auto max-w-7xl px-6 lg:px-10 mb-8">
        <p className="text-[11px] font-bold text-zinc-400 uppercase tracking-[0.2em] text-center">
          Trusted Technologies & Libraries
        </p>
      </div>

      <div className="relative flex overflow-x-hidden">
        <motion.div
          animate={{
            x: [0, -100 * logos.length],
          }}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: "loop",
              duration: 25,
              ease: "linear",
            },
          }}
          className="flex whitespace-nowrap"
        >
          {/* First set of logos */}
          {logos.map((logo, index) => (
            <div
              key={`${logo.name}-${index}`}
              className="flex items-center gap-3 px-12 transition-all duration-300 pointer-events-none"
            >
              <img
                src={logo.url}
                alt={logo.name}
                className="h-8 w-8 object-contain"
              />
              <span className="text-[13px] font-bold tracking-tight text-zinc-400 uppercase">
                {logo.name}
              </span>
            </div>
          ))}
          {/* Duplicate set for infinite scroll */}
          {logos.map((logo, index) => (
            <div
              key={`${logo.name}-dup-${index}`}
              className="flex items-center gap-3 px-12 grayscale opacity-40 hover:grayscale-0 hover:opacity-100 transition-all duration-300 pointer-events-none"
            >
              <img
                src={logo.url}
                alt={logo.name}
                className="h-8 w-8 object-contain"
              />
              <span className="text-[14px] font-bold tracking-tight text-zinc-800 uppercase">
                {logo.name}
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
