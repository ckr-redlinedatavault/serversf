"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, Clock, BookOpen, Send, CheckCircle2, ArrowLeft, ArrowRight } from "lucide-react";
import Link from "next/link";
import Navbar from "../components/home/Navbar";
import SubNavbar from "../components/home/SubNavbar";
import Footer from "../components/home/Footer";

export default function MentorshipPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    date: "",
    time: "",
    topic: ""
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const res = await fetch("/api/mentorship", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });

      if (res.ok) {
        setSubmitted(true);
        setFormData({ name: "", email: "", date: "", time: "", topic: "" });
      }
    } catch (err) {
      console.error("Mentorship scheduling failed");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-white text-zinc-900 font-sans">
      <Navbar />
      <SubNavbar />

      <main className="pt-16 pb-24">
        <div className="mx-auto max-w-4xl px-6 lg:px-10">
          
          <Link 
            href="/" 
            className="inline-flex items-center gap-2 text-[12px] font-bold uppercase tracking-widest text-zinc-400 hover:text-[#0055FF] transition-colors mb-8"
          >
            <ArrowLeft size={14} /> Back to Home
          </Link>

          <div className="mb-16">
            <motion.div 
               initial={{ opacity: 0, x: -20 }}
               animate={{ opacity: 1, x: 0 }}
               className="flex items-center gap-2 mb-6"
            >
              <div className="h-1.5 w-1.5 bg-[#0055FF] rounded-none" />
              <span className="text-[11px] font-semibold text-zinc-400 uppercase tracking-widest">Expert Guidance</span>
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight leading-[1.1]"
            >
              Book Your Free <span className="text-[#0055FF]">Mentorship</span>
            </motion.h1>
            
            <p className="mt-8 text-lg text-zinc-500 font-medium max-w-2xl leading-relaxed">
              Accelerate your engineering journey with a personalized 1-on-1 session. 
              Review your roadmap, solve technical blocks, and plan your global career.
            </p>
          </div>

          <AnimatePresence mode="wait">
            {submitted ? (
              <motion.div 
                key="success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="bg-zinc-50 border border-zinc-100 p-12 md:p-20 text-center rounded-none"
              >
                <div className="flex justify-center mb-8">
                  <div className="h-20 w-20 bg-[#0055FF] text-white flex items-center justify-center rounded-none shadow-2xl shadow-[#0055FF]/20">
                    <CheckCircle2 size={40} />
                  </div>
                </div>
                <h2 className="text-3xl font-bold tracking-tight mb-4">Master Session Scheduled!</h2>
                <p className="text-zinc-500 font-medium mb-10 max-w-md mx-auto">
                    We've received your request. Our team will verify the slot and send you a 
                    calendar invite on your email within 24 hours.
                </p>
                <button 
                  onClick={() => setSubmitted(false)}
                  className="h-14 px-10 bg-black text-white text-[13px] font-bold uppercase tracking-widest hover:bg-zinc-900 transition-all rounded-none"
                >
                  Schedule Another Session
                </button>
              </motion.div>
            ) : (
              <motion.form 
                key="form"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                onSubmit={handleSubmit}
                className="space-y-10 bg-white border border-zinc-100 p-8 md:p-12 shadow-2xl shadow-black/5 rounded-none"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                   <div className="space-y-3">
                      <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">Full Name</label>
                      <input 
                        required
                        type="text"
                        placeholder="Jane Doe"
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        className="w-full h-14 bg-zinc-50 border border-zinc-100 px-6 text-sm outline-none focus:border-[#0055FF] transition-all rounded-none font-medium"
                      />
                   </div>
                   <div className="space-y-3">
                      <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">Email Address</label>
                      <input 
                        required
                        type="email"
                        placeholder="jane@university.edu"
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                        className="w-full h-14 bg-zinc-50 border border-zinc-100 px-6 text-sm outline-none focus:border-[#0055FF] transition-all rounded-none font-medium"
                      />
                   </div>
                   <div className="space-y-3">
                      <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">Prefered Date</label>
                      <div className="relative">
                         <Calendar className="absolute left-6 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-300" />
                         <input 
                            required
                            type="date"
                            value={formData.date}
                            onChange={(e) => setFormData({...formData, date: e.target.value})}
                            className="w-full h-14 bg-zinc-50 border border-zinc-100 pl-14 pr-6 text-sm outline-none focus:border-[#0055FF] transition-all rounded-none font-medium"
                         />
                      </div>
                   </div>
                   <div className="space-y-3">
                      <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">Prefered Time Slot</label>
                      <div className="relative">
                         <Clock className="absolute left-6 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-300" />
                         <select 
                            required
                            value={formData.time}
                            onChange={(e) => setFormData({...formData, time: e.target.value})}
                            className="w-full h-14 bg-zinc-50 border border-zinc-100 pl-14 pr-6 text-sm outline-none focus:border-[#0055FF] transition-all rounded-none appearance-none font-medium"
                         >
                            <option value="">Select a time...</option>
                            <option>10:00 AM - 11:00 AM</option>
                            <option>2:00 PM - 3:00 PM</option>
                            <option>5:00 PM - 6:00 PM</option>
                            <option>8:00 PM - 9:00 PM</option>
                         </select>
                      </div>
                   </div>
                </div>

                <div className="space-y-3">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">Discussion Topic / Challenges</label>
                  <div className="relative">
                     <BookOpen className="absolute left-6 top-6 h-4 w-4 text-zinc-300" />
                     <textarea 
                        required
                        rows={5}
                        placeholder="What specific goals should we focus on during this session?"
                        value={formData.topic}
                        onChange={(e) => setFormData({...formData, topic: e.target.value})}
                        className="w-full bg-zinc-50 border border-zinc-100 p-6 pl-14 text-sm outline-none focus:border-[#0055FF] transition-all rounded-none resize-none font-medium"
                     />
                  </div>
                </div>

                <button 
                  type="submit"
                  disabled={submitting}
                  className="w-full h-16 bg-[#0055FF] text-white text-[13px] font-bold uppercase tracking-widest flex items-center justify-center gap-3 hover:bg-black transition-all disabled:bg-zinc-200 rounded-none shadow-xl shadow-blue-500/10"
                >
                  {submitting ? "Processing..." : <>Confirm Master Session <ArrowRight size={16} /></>}
                </button>
              </motion.form>
            )}
          </AnimatePresence>

        </div>
      </main>

      <Footer />
    </div>
  );
}
