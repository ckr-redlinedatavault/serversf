"use client";

import { useState, useEffect } from "react";
import { Users, MessageSquare, Globe, Heart, Shield, Sparkles, Zap, ArrowRight, Github, Twitter, Linkedin, Plus, MessageCircle, X, Search, Lightbulb, Share2 } from "lucide-react";
import Link from "next/link";
import Navbar from "../components/home/Navbar";
import SubNavbar from "../components/home/SubNavbar";
import Footer from "../components/home/Footer";
import Breadcrumbs from "../components/Breadcrumbs";
import { motion, AnimatePresence } from "framer-motion";

interface Idea {
  id: string;
  name: string;
  subline: string;
  title: string;
  description: string;
  likes: number;
  shares: number;
  createdAt: string;
}

export default function CommunityPage() {
  const [ideas, setIdeas] = useState<Idea[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    subline: "",
    title: "",
    description: ""
  });

  useEffect(() => {
    fetchIdeas();
  }, []);

  const fetchIdeas = async () => {
    try {
      const res = await fetch("/api/community/ideas");
      const data = await res.json();
      setIdeas(data);
    } catch (error) {
      console.error("Error fetching ideas:", error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/community/ideas", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        setIsModalOpen(false);
        setFormData({ name: "", subline: "", title: "", description: "" });
        fetchIdeas();
      }
    } catch (error) {
      console.error("Error submitting idea:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleShare = async (idea: Idea) => {
    // 1. Social Sharing logic
    if (typeof navigator !== "undefined" && navigator.share) {
      try {
        await navigator.share({
          title: idea.title,
          text: `Check out this idea from ${idea.name} on Student Forge!`,
          url: window.location.href,
        });
      } catch (error) {
        console.log("Sharing failed or cancelled");
      }
    } else {
      const shareUrl = window.location.href;
      const shareText = `Check out this idea from ${idea.name} on Student Forge:\n\n${idea.title}\n\n${shareUrl}`;
      window.open(`https://wa.me/?text=${encodeURIComponent(shareText)}`, "_blank");
    }

    // 2. Increment in DB
    handleEngage(idea.id, "share");
  };

  const handleEngage = async (id: string, type: "like" | "share") => {
    // Optimistic Update
    setIdeas((prev) =>
      prev.map((idea) => {
        if (idea.id === id) {
          return {
            ...idea,
            likes: type === "like" ? (idea.likes || 0) + 1 : idea.likes,
            shares: type === "share" ? (idea.shares || 0) + 1 : idea.shares,
          };
        }
        return idea;
      })
    );

    try {
      await fetch(`/api/community/ideas/${id}/engage`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type }),
      });
    } catch (error) {
       console.error(`Engagement error:`, error);
    }
  };

  return (
    <div className="min-h-screen bg-white text-zinc-900 font-sans selection:bg-[#0055FF]/10">
      <Navbar />
      <SubNavbar />
      
      <main className="w-full">
        {/* Hero Section */}
        <section className="bg-black py-6 lg:py-8 overflow-hidden relative border-b border-zinc-900">
          <div className="absolute top-0 right-0 w-1/3 h-full bg-[#0055FF]/10 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2" />
          <div className="mx-auto max-w-7xl px-6 lg:px-10 relative z-10">
            <Breadcrumbs items={[{ label: "Global", href: "/" }, { label: "Community" }]} />
            <div className="mt-4 max-w-3xl">
              <div className="flex items-center gap-2 mb-2">
                <div className="h-1 w-1 bg-[#0055FF] rotate-45" />
                <span className="text-[10px] font-medium text-zinc-400 uppercase tracking-widest">Collective Intelligence</span>
              </div>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-medium tracking-tight text-white leading-[1.1]">
                Built by students, <span className="text-[#0055FF]">for the future.</span>
              </h1>
            </div>
          </div>
        </section>

        {/* Idea Board Toolbar */}
        <section className="sticky top-[104px] z-40 bg-zinc-50 border-y border-zinc-100 py-4 shadow-sm backdrop-blur-md">
           <div className="mx-auto max-w-7xl px-6 lg:px-10 flex items-center justify-between">
              <div className="flex items-center gap-4">
                 <h2 className="text-[13px] font-medium uppercase tracking-widest text-[#0055FF]">The Idea Board</h2>
                 <div className="h-4 w-[1px] bg-zinc-200" />
                 <span className="text-[12px] text-zinc-500 font-medium">{ideas.length} Shared Ideas</span>
              </div>
              <button 
                onClick={() => setIsModalOpen(true)}
                className="h-10 px-6 bg-black text-white text-[11px] font-medium uppercase tracking-[0.2em] flex items-center gap-2 hover:bg-[#0055FF] transition-all"
              >
                <Plus size={14} /> Share Idea
              </button>
           </div>
        </section>

        {/* Bento Grid - Ideas */}
        <section className="py-20 bg-white">
          <div className="mx-auto max-w-7xl px-6 lg:px-10">
            {ideas.length === 0 ? (
               <div className="py-20 text-center border-2 border-dashed border-zinc-100">
                  <Lightbulb className="mx-auto h-12 w-12 text-zinc-200 mb-4" />
                  <p className="text-zinc-400 font-medium">No ideas shared yet. Be the first to forge a path.</p>
               </div>
            ) : (
              <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
                {ideas.map((idea, index) => (
                  <motion.div 
                    key={idea.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="break-inside-avoid relative group p-8 border border-zinc-100 bg-white hover:border-[#0055FF]/30 transition-all hover:shadow-2xl hover:shadow-[#0055FF]/5"
                  >
                    <div className="flex justify-between items-start mb-6">
                       <div className="px-3 py-1 bg-zinc-50 text-[10px] font-medium uppercase tracking-[0.1em] text-zinc-500 border border-zinc-100">
                         {idea.subline}
                       </div>
                       <span className="text-[10px] text-zinc-300 font-medium">
                         {new Date(idea.createdAt).toLocaleDateString()}
                       </span>
                    </div>
                    
                    <h3 className="text-2xl font-medium tracking-tight mb-4 group-hover:text-[#0055FF] transition-colors">{idea.title}</h3>
                    <p className="text-zinc-500 text-[14px] leading-relaxed mb-8">
                       {idea.description}
                    </p>
                    
                    <div className="pt-6 border-t border-zinc-50 flex flex-col gap-6">
                       <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                             <div className="h-8 w-8 rounded-full bg-zinc-900 flex items-center justify-center text-white text-[10px] font-medium">
                               {idea.name[0]?.toUpperCase()}
                             </div>
                             <span className="text-[12px] font-medium text-zinc-900">{idea.name}</span>
                          </div>
                          <div className="flex items-center gap-4">
                              <button 
                                onClick={() => handleEngage(idea.id, "like")}
                                className="flex items-center gap-1.5 text-zinc-400 hover:text-red-500 transition-colors group/btn"
                              >
                                 <Heart size={14} className={(idea.likes || 0) > 0 ? "fill-red-500 text-red-500" : ""} />
                                 <span className="text-[11px] font-medium">{idea.likes || 0}</span>
                              </button>
                              <button 
                                onClick={() => handleShare(idea)}
                                className="flex items-center gap-1.5 text-zinc-400 hover:text-[#0055FF] transition-colors"
                              >
                                 <Share2 size={14} />
                                 <span className="text-[11px] font-medium">{idea.shares || 0}</span>
                              </button>
                          </div>
                       </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </section>

      </main>

      {/* Share Idea Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-2xl bg-white p-10 lg:p-12 shadow-2xl"
            >
              <button 
                onClick={() => setIsModalOpen(false)}
                className="absolute top-6 right-6 text-zinc-400 hover:text-black transition-colors"
              >
                <X size={20} />
              </button>
              
              <div className="mb-10">
                 <div className="flex items-center gap-2 mb-3">
                    <Lightbulb className="w-5 h-5 text-[#0055FF]" />
                    <span className="text-[11px] font-medium text-[#0055FF] uppercase tracking-widest">Innovation Lab</span>
                 </div>
                 <h2 className="text-3xl font-medium tracking-tight">Post your idea</h2>
              </div>

              <form onSubmit={handleSubmit} className="space-y-8">
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-3">
                       <label className="text-[11px] font-medium uppercase tracking-widest text-zinc-400">Your Name</label>
                       <input 
                         required
                         type="text" 
                         className="w-full h-12 bg-zinc-50 border border-zinc-100 px-4 text-[14px] outline-none focus:border-[#0055FF] transition-colors" 
                         placeholder="Enter your name"
                         value={formData.name}
                         onChange={(e) => setFormData({...formData, name: e.target.value})}
                       />
                    </div>
                    <div className="space-y-3">
                       <label className="text-[11px] font-medium uppercase tracking-widest text-zinc-400">Sub Headline</label>
                       <input 
                         required
                         type="text" 
                         className="w-full h-12 bg-zinc-50 border border-zinc-100 px-4 text-[14px] outline-none focus:border-[#0055FF] transition-colors" 
                         placeholder="e.g., Tech Strategy"
                         value={formData.subline}
                         onChange={(e) => setFormData({...formData, subline: e.target.value})}
                       />
                    </div>
                 </div>

                 <div className="space-y-3">
                    <label className="text-[11px] font-medium uppercase tracking-widest text-zinc-400">Idea Title</label>
                    <input 
                      required
                      type="text" 
                      className="w-full h-12 bg-zinc-50 border border-zinc-100 px-4 text-[14px] font-medium outline-none focus:border-[#0055FF] transition-colors" 
                      placeholder="What are you building?"
                      value={formData.title}
                      onChange={(e) => setFormData({...formData, title: e.target.value})}
                    />
                 </div>

                 <div className="space-y-3">
                    <label className="text-[11px] font-medium uppercase tracking-widest text-zinc-400">Description</label>
                    <textarea 
                      required
                      rows={5}
                      className="w-full bg-zinc-50 border border-zinc-100 p-4 text-[14px] outline-none focus:border-[#0055FF] transition-colors resize-none" 
                      placeholder="Describe your vision..."
                      value={formData.description}
                      onChange={(e) => setFormData({...formData, description: e.target.value})}
                    />
                 </div>

                 <button 
                   disabled={loading}
                   type="submit"
                   className="w-full h-14 bg-black text-white text-[12px] font-medium uppercase tracking-widest hover:bg-[#0055FF] transition-all disabled:opacity-50"
                 >
                   {loading ? "Submitting..." : "Submit to Board"}
                 </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <Footer />
    </div>
  );
}
