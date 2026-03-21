"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Search, BookOpen, Globe, Code2, Cpu } from "lucide-react";
import Navbar from "../components/home/Navbar";
import SubNavbar from "../components/home/SubNavbar";
import Footer from "../components/home/Footer";
import { useState } from "react";

const resources = [
  {
    name: "Python",
    category: "Languages",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
    url: "https://docs.python.org/3/",
    description: "The official documentation for the Python programming language."
  },
  {
    name: "JavaScript",
    category: "Languages",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
    url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript",
    description: "Comprehensive guide to JavaScript by MDN Web Docs."
  },
  {
    name: "React",
    category: "Frontend",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
    url: "https://react.dev/",
    description: "The library for web and native user interfaces."
  },
  {
    name: "TypeScript",
    category: "Languages",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg",
    url: "https://www.typescriptlang.org/docs/",
    description: "Typed JavaScript at any scale."
  },
  {
    name: "Node.js",
    category: "Backend",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
    url: "https://nodejs.org/en/docs",
    description: "Documentation for Node.js, the JavaScript runtime."
  },
  {
    name: "Go",
    category: "Languages",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/go/go-original-wordmark.svg",
    url: "https://go.dev/doc/",
    description: "The cross-platform, open source language for developers."
  },
  {
    name: "Java",
    category: "Languages",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg",
    url: "https://docs.oracle.com/en/java/",
    description: "The official Java documentation and tutorials."
  },
  {
    name: "PostgreSQL",
    category: "Database",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg",
    url: "https://www.postgresql.org/docs/",
    description: "Official documentation for the PostgreSQL database."
  },
  {
    name: "MongoDB",
    category: "Database",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg",
    url: "https://www.mongodb.com/docs/",
    description: "Flexible, scalable NoSQL document database docs."
  },
  {
    name: "Docker",
    category: "DevOps",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg",
    url: "https://docs.docker.com/",
    description: "Containerization platform for modern applications."
  },
  {
    name: "Git",
    category: "DevOps",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg",
    url: "https://git-scm.com/doc",
    description: "Distributed version control system documentation."
  },
  {
    name: "Next.js",
    category: "Frontend",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg",
    url: "https://nextjs.org/docs",
    description: "The React framework for the web."
  },
  {
    name: "Tailwind CSS",
    category: "Frontend",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg",
    url: "https://tailwindcss.com/docs",
    description: "Utility-first CSS framework for rapid UI development."
  },
  {
    name: "Rust",
    category: "Languages",
    logo: "https://cdn.jsdelivr.gh/devicons/devicon/icons/rust/rust-plain.svg",
    url: "https://doc.rust-lang.org/book/",
    description: "Powerful language for memory safety and performance."
  },
  {
    name: "C++",
    category: "Languages",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg",
    url: "https://en.cppreference.com/w/",
    description: "C++ reference documentation and resources."
  }
];

export default function ResourcesPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = ["All", ...new Set(resources.map(r => r.category))];

  const filteredResources = resources.filter(r => 
    (selectedCategory === "All" || r.category === selectedCategory) &&
    (r.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
     r.description.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="min-h-screen bg-white text-zinc-900 font-sans selection:bg-[#0055FF]/10">
      <Navbar />
      <SubNavbar />

      <main className="w-full">
        {/* Header - Brand Blue */}
        <div className="bg-[#0055FF] pt-16 pb-20 relative overflow-hidden">
             {/* Decorative Geometric Shapes */}
             <div className="absolute top-0 right-0 h-32 w-32 bg-white/5 -mt-16 -mr-16 rotate-45" />
             <div className="absolute bottom-0 left-0 h-48 w-48 bg-black/10 -mb-24 -ml-24" />

          <div className="mx-auto max-w-7xl px-6 lg:px-10">
            <motion.div 
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="max-w-2xl"
            >
              <div className="flex items-center gap-2 mb-6">
                <div className="h-2 w-2 bg-white rounded-none" />
                <span className="text-[12px] font-bold text-white/50 uppercase tracking-[0.2em]">Platform Resources</span>
              </div>
              <h1 className="text-4xl font-normal leading-tight tracking-tight text-white md:text-5xl lg:text-6xl lg:leading-[1.1]">
                Master Your Tools
              </h1>
              <p className="mt-6 text-lg leading-relaxed text-white/70 font-medium">
                Deep-dive into official documentation and student-centered learning guides for the world's most popular technologies.
              </p>
            </motion.div>

            {/* Sticky Search Bar */}
            <div className="mt-12 max-w-2xl relative group">
                <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-white/30" strokeWidth={1.5} />
                <input 
                    type="text" 
                    placeholder="Search documentation, languages, or tools..." 
                    className="h-14 w-full border-none bg-white/10 px-12 text-[15px] text-white outline-none transition-all focus:bg-white/20 placeholder:text-white/40 backdrop-blur-sm"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className="mx-auto max-w-7xl px-6 lg:px-10 py-16">
          {/* Category Filter */}
          <div className="mb-12 flex items-center gap-4 overflow-x-auto pb-4 scrollbar-hide">
             {categories.map((lvl) => (
                <button
                    key={lvl}
                    onClick={() => setSelectedCategory(lvl)}
                    className={`whitespace-nowrap px-6 py-2.5 text-[12px] font-bold uppercase tracking-widest transition-all ${
                        selectedCategory === lvl 
                        ? 'bg-[#0055FF] text-white' 
                        : 'bg-zinc-50 text-zinc-400 hover:bg-zinc-100 hover:text-zinc-900'
                    }`}
                >
                    {lvl}
                </button>
             ))}
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {filteredResources.map((resource, index) => (
              <motion.a
                key={resource.name}
                href={resource.url}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="group relative flex flex-col border border-zinc-100 bg-white p-10 transition-all hover:border-black active:scale-[0.99]"
              >
                {/* Logo Section */}
                <div className="mb-10 flex h-16 w-16 items-center justify-center transition-all">
                  <img 
                    src={resource.logo} 
                    alt={`${resource.name} Logo`} 
                    className="h-full w-full object-contain"
                  />
                </div>

                {/* Meta info */}
                <div className="mb-4 flex items-center gap-2">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-[#0055FF] bg-[#0055FF]/5 px-2 py-0.5">
                        {resource.category}
                    </span>
                </div>

                {/* Title & Arrow */}
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-[20px] font-medium tracking-tight text-zinc-900 group-hover:text-black">
                    {resource.name}
                  </h3>
                  <ArrowUpRight 
                    size={16} 
                    className="text-zinc-300 transition-all group-hover:text-[#0055FF] group-hover:translate-x-1 group-hover:-translate-y-1" 
                  />
                </div>

                {/* Description */}
                <p className="text-[14px] leading-relaxed text-zinc-500 font-medium">
                  {resource.description}
                </p>

                {/* Bottom Decorative Square */}
                <div className="absolute top-0 right-0 h-4 w-4 bg-[#0055FF] opacity-0 transition-opacity group-hover:opacity-10 mt-6 mr-6" />
                <div className="absolute bottom-0 left-0 h-[2px] w-0 bg-[#0055FF] transition-all group-hover:w-full" />
              </motion.a>
            ))}
          </div>

          {/* Empty State */}
          {filteredResources.length === 0 && (
              <div className="flex h-96 flex-col items-center justify-center gap-4 text-center">
                  <Globe className="w-12 h-12 text-zinc-100" strokeWidth={1} />
                  <div>
                    <p className="text-[16px] font-bold text-zinc-900">No resources matched your search.</p>
                    <p className="text-[14px] text-zinc-400 mt-1 font-medium">Try searching for a different language or framework.</p>
                  </div>
              </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
