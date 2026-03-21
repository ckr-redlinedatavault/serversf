"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

const resources = [
  {
    name: "Python",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
    url: "https://docs.python.org/3/",
    description: "The official documentation for the Python programming language."
  },
  {
    name: "JavaScript",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
    url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript",
    description: "Comprehensive guide to JavaScript by MDN Web Docs."
  },
  {
    name: "React",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
    url: "https://react.dev/",
    description: "The library for web and native user interfaces."
  },
  {
    name: "TypeScript",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg",
    url: "https://www.typescriptlang.org/docs/",
    description: "Typed JavaScript at any scale."
  },
  {
    name: "Node.js",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
    url: "https://nodejs.org/en/docs",
    description: "Documentation for Node.js, the JavaScript runtime."
  },
  {
    name: "Go",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/go/go-original-wordmark.svg",
    url: "https://go.dev/doc/",
    description: "The cross-platform, open source language for developers."
  },
  {
    name: "Java",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg",
    url: "https://docs.oracle.com/en/java/",
    description: "The official Java documentation and tutorials."
  },
  {
    name: "PostgreSQL",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg",
    url: "https://www.postgresql.org/docs/",
    description: "Official documentation for the PostgreSQL database."
  }
];

export default function Resources() {
  return (
    <section className="bg-white py-8 lg:py-12 relative overflow-hidden" id="resources">
      {/* Decorative Square - Top Right */}
      <div className="absolute top-0 right-0 h-4 w-4 bg-[#0055FF] mt-12 mr-12 opacity-10 hidden lg:block" />
      
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        
        {/* Section Header */}
        <div className="mb-12">
          <div className="flex items-center gap-2 mb-4">
            <div className="h-1.5 w-1.5 bg-[#0055FF] rounded-none" />
            <span className="text-[11px] font-bold text-zinc-400 uppercase tracking-widest">Documentation</span>
          </div>
          <h2 className="text-2xl font-medium tracking-tight text-zinc-900 md:text-3xl lg:text-4xl">
            Official Resources
          </h2>
          <p className="mt-4 text-[14px] leading-relaxed text-zinc-500 max-w-2xl font-medium">
            Master your tools with direct access to official language and framework documentation. 
          </p>
        </div>

        {/* Resources Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {resources.map((resource, index) => (
            <motion.a
              key={resource.name}
              href={resource.url}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="group relative flex flex-col border border-zinc-100 bg-white p-6 transition-all hover:border-black active:scale-[0.98]"
            >
              {/* Logo Section */}
              <div className="mb-6 flex h-12 w-12 items-center justify-center transition-all">
                <img 
                  src={resource.logo} 
                  alt={`${resource.name} Logo`} 
                  className="h-full w-full object-contain"
                />
              </div>

              {/* Title & Arrow */}
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-[14px] font-medium tracking-tight text-zinc-900 group-hover:text-black">
                  {resource.name}
                </h3>
                <ArrowUpRight 
                  size={14} 
                  className="text-zinc-300 transition-all group-hover:text-black group-hover:translate-x-0.5 group-hover:-translate-y-0.5" 
                />
              </div>

              {/* Description */}
              <p className="text-[12px] leading-relaxed text-zinc-500 line-clamp-2">
                {resource.description}
              </p>

              {/* Bottom Decorative Edge */}
              <div className="absolute bottom-0 left-0 h-[1.5px] w-0 bg-[#0055FF] transition-all group-hover:w-full" />
            </motion.a>
          ))}
        </div>

        {/* Explore More - Simple Link */}
        <div className="mt-12 flex justify-center">
            <a 
                href="/resources" 
                className="flex h-11 items-center justify-center bg-[#0055FF] px-10 text-[14px] font-medium text-white transition-all hover:opacity-90 active:scale-[0.98]"
            >
                Explore All Docs
            </a>
        </div>
      </div>
    </section>
  );
}
