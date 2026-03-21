"use client";

import { motion } from "framer-motion";
import { Award, Gift, GraduationCap, Briefcase, Zap, CheckCircle, ArrowRight, User, Mail, GraduationCap as Cap, Building2, Linkedin } from "lucide-react";
import Navbar from "../components/home/Navbar";
import SubNavbar from "../components/home/SubNavbar";
import Footer from "../components/home/Footer";
import { useState } from "react";

const benefits = [
  {
    title: "Exclusive Perks & Swag",
    description: "Get limited edition Student Forge hoodies, stickers, and tech accessories to represent us on campus.",
    icon: <Gift className="w-6 h-6 text-[#0055FF]" />
  },
  {
    title: "Internship & Placement",
    description: "Top performing ambassadors get direct priority for internships and full-time engineering roles.",
    icon: <Briefcase className="w-6 h-6 text-[#0055FF]" />
  },
  {
    title: "Expert Mentorship",
    description: "Get 1-on-1 sessions with senior engineers and industry leaders to guide your career path.",
    icon: <Award className="w-6 h-6 text-[#0055FF]" />
  },
  {
    title: "Leadership Experience",
    description: "Lead your own tech community, organize events, and build your resume with real leadership skills.",
    icon: <Zap className="w-6 h-6 text-[#0055FF]" />
  }
];

const responsibilities = [
  "Build and lead a local Student Forge community on your campus.",
  "Organize workshops, hackathons, and technical webinars.",
  "Act as the primary bridge between Student Forge and your college faculty.",
  "Promote our courses and initiatives through social media and on-ground activities.",
  "Collect feedback from students to help us build better tools for learners."
];

export default function AmbassadorPage() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    college: "",
    year: "1st Year",
    linkedin: "",
    motivation: ""
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    setSubmitting(false);
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-white text-zinc-900 font-sans">
      <Navbar />
      <SubNavbar />

      <main>
        {/* Hero Section */}
        <section className="bg-[#0055FF] pt-12 pb-16 relative overflow-hidden">
             <div className="absolute top-0 right-0 h-64 w-64 bg-white/5 -mt-32 -mr-32 rotate-45" />
             <div className="absolute bottom-0 left-0 h-48 w-48 bg-black/10 -mb-24 -ml-24" />

          <div className="mx-auto max-w-7xl px-6 lg:px-10">
            <motion.div 
               initial={{ y: 20, opacity: 0 }}
               animate={{ y: 0, opacity: 1 }}
               className="max-w-3xl"
            >
              <div className="flex items-center gap-2 mb-6 text-white/50">
                <div className="h-2 w-2 bg-white rounded-none" />
                <span className="text-[12px] font-bold uppercase tracking-[0.2em]">Join the Movement</span>
              </div>
              <h1 className="text-4xl font-normal leading-tight tracking-tight text-white md:text-5xl lg:text-7xl lg:leading-[1.1]">
                Campus Ambassador <br />
                <span className="text-white/40">Program</span>
              </h1>
              <p className="mt-8 text-xl leading-relaxed text-white/70 font-medium">
                Be the face of Student Forge on your campus. Help fellow students master 
                industry tools and build a thriving tech community.
              </p>
              
              <div className="mt-12 flex gap-4">
                 <button 
                   onClick={() => document.getElementById('apply-form')?.scrollIntoView({ behavior: 'smooth' })}
                   className="h-14 px-10 bg-white text-[#0055FF] text-[15px] font-bold uppercase tracking-widest hover:bg-zinc-100 transition-colors"
                 >
                    Apply Now
                 </button>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Benefits Grid */}
        <section className="py-12 lg:py-16 bg-white border-b border-zinc-100">
           <div className="mx-auto max-w-7xl px-6 lg:px-10">
               <div className="mb-16">
                   <h2 className="text-3xl font-medium tracking-tight text-zinc-900 md:text-4xl">Why Join Us?</h2>
                   <p className="mt-4 text-zinc-500 font-medium text-lg">The perks of being a Student Forge Ambassador.</p>
               </div>
               
               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                   {benefits.map((benefit, index) => (
                       <motion.div 
                          key={benefit.title}
                          initial={{ opacity: 0, y: 10 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="p-8 border border-zinc-100 bg-zinc-50/50 hover:bg-white hover:border-black transition-all group"
                       >
                           <div className="mb-8 w-12 h-12 bg-[#0055FF]/5 flex items-center justify-center transition-all group-hover:bg-[#0055FF] group-hover:text-white">
                                {benefit.icon}
                           </div>
                           <h3 className="text-[18px] font-bold tracking-tight text-zinc-900 mb-3">{benefit.title}</h3>
                           <p className="text-[14px] leading-relaxed text-zinc-500 font-medium">{benefit.description}</p>
                       </motion.div>
                   ))}
               </div>
           </div>
        </section>

        {/* Responsibilities */}
        <section className="py-12 lg:py-16 bg-zinc-50">
            <div className="mx-auto max-w-7xl px-6 lg:px-10 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                <div>
                    <div className="flex items-center gap-2 mb-6">
                        <div className="h-1.5 w-1.5 bg-[#0055FF] rounded-none" />
                        <span className="text-[12px] font-bold text-zinc-400 uppercase tracking-widest">Your Role</span>
                    </div>
                    <h2 className="text-3xl font-medium tracking-tight text-zinc-900 md:text-4xl lg:text-5xl">Roles & Responsibilities</h2>
                    <p className="mt-6 text-zinc-500 text-lg leading-relaxed font-medium">As a Lead Ambassador, you take ownership of your campus technical growth.</p>
                    
                    <div className="mt-10 space-y-4">
                        {responsibilities.map((item, i) => (
                            <div key={i} className="flex gap-4 items-start">
                                <div className="mt-1">
                                    <CheckCircle className="w-5 h-5 text-[#0055FF]" />
                                </div>
                                <span className="text-zinc-700 font-medium">{item}</span>
                            </div>
                        ))}
                    </div>
                </div>
                
                <div className="relative">
                    <img 
                      src="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=1200" 
                      alt="Student community" 
                      className="w-full aspect-[4/5] object-cover border border-black shadow-[20px_20px_0px_0px_#0055FF]"
                    />
                </div>
            </div>
        </section>

        {/* Application Form */}
        <section id="apply-form" className="py-12 lg:py-20 bg-white">
            <div className="mx-auto max-w-4xl px-6 lg:px-10">
                <div className="text-center mb-16">
                    <h2 className="text-3xl font-medium tracking-tight text-zinc-900 md:text-5xl">Ready to Lead?</h2>
                    <p className="mt-4 text-zinc-500 text-lg font-medium">Fill out your application below and we'll be in touch.</p>
                </div>

                {submitted ? (
                    <motion.div 
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="p-16 border-2 border-dashed border-[#0055FF] text-center"
                    >
                        <div className="flex justify-center mb-6">
                            <div className="h-16 w-16 bg-[#0055FF] rounded-none flex items-center justify-center">
                                <CheckCircle className="text-white w-8 h-8" />
                            </div>
                        </div>
                        <h3 className="text-2xl font-bold tracking-tight text-zinc-900">Application Received!</h3>
                        <p className="mt-2 text-zinc-500 font-medium">Our team will review your profile and reach out to you within 3-5 business days.</p>
                        <button 
                          onClick={() => setSubmitted(false)}
                          className="mt-8 text-[12px] font-bold text-[#0055FF] uppercase tracking-widest border-b border-[#0055FF]"
                        >
                            Submit another application
                        </button>
                    </motion.div>
                ) : (
                    <form onSubmit={handleSubmit} className="space-y-6 bg-zinc-50/50 p-6 md:p-10 border border-zinc-100">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {/* Full Name */}
                            <div className="space-y-2">
                                <label className="text-[11px] font-bold uppercase tracking-widest text-zinc-400">Full Name</label>
                                <div className="relative">
                                    <User className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-300" />
                                    <input 
                                        type="text" required
                                        className="h-14 w-full border border-zinc-200 bg-white px-12 text-[14px] outline-none focus:border-black transition-all"
                                        placeholder="Jane Doe"
                                        value={formData.fullName}
                                        onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                                    />
                                </div>
                            </div>

                            {/* Email */}
                            <div className="space-y-2">
                                <label className="text-[11px] font-bold uppercase tracking-widest text-zinc-400">Email Address</label>
                                <div className="relative">
                                    <Mail className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-300" />
                                    <input 
                                        type="email" required
                                        className="h-14 w-full border border-zinc-200 bg-white px-12 text-[14px] outline-none focus:border-black transition-all"
                                        placeholder="jane@university.edu"
                                        value={formData.email}
                                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                                    />
                                </div>
                            </div>

                            {/* College */}
                            <div className="space-y-2">
                                <label className="text-[11px] font-bold uppercase tracking-widest text-zinc-400">College / University</label>
                                <div className="relative">
                                    <Building2 className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-300" />
                                    <input 
                                        type="text" required
                                        className="h-14 w-full border border-zinc-200 bg-white px-12 text-[14px] outline-none focus:border-black transition-all"
                                        placeholder="Institute of Technology"
                                        value={formData.college}
                                        onChange={(e) => setFormData({...formData, college: e.target.value})}
                                    />
                                </div>
                            </div>

                            {/* Year of Study */}
                            <div className="space-y-2">
                                <label className="text-[11px] font-bold uppercase tracking-widest text-zinc-400">Year of Study</label>
                                <div className="relative">
                                    <Cap className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-300" />
                                    <select 
                                        className="h-14 w-full border border-zinc-200 bg-white px-12 text-[14px] outline-none focus:border-black transition-all appearance-none"
                                        value={formData.year}
                                        onChange={(e) => setFormData({...formData, year: e.target.value})}
                                    >
                                        <option>1st Year</option>
                                        <option>2nd Year</option>
                                        <option>3rd Year</option>
                                        <option>4th Year</option>
                                        <option>Graduate</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        {/* LinkedIn */}
                        <div className="space-y-2">
                            <label className="text-[11px] font-bold uppercase tracking-widest text-zinc-400">LinkedIn Profile (Optional)</label>
                            <div className="relative">
                                <Linkedin className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-300" />
                                <input 
                                    type="url"
                                    className="h-14 w-full border border-zinc-200 bg-white px-12 text-[14px] outline-none focus:border-black transition-all"
                                    placeholder="https://linkedin.com/in/username"
                                    value={formData.linkedin}
                                    onChange={(e) => setFormData({...formData, linkedin: e.target.value})}
                                />
                            </div>
                        </div>

                        {/* Motivation */}
                        <div className="space-y-2">
                            <label className="text-[11px] font-bold uppercase tracking-widest text-zinc-400">Why do you want to join? (Brief)</label>
                            <textarea 
                                required
                                className="w-full min-h-[120px] border border-zinc-200 bg-white p-6 text-[14px] outline-none focus:border-black transition-all resize-none"
                                placeholder="Tell us about your interest and any previous community experience..."
                                value={formData.motivation}
                                onChange={(e) => setFormData({...formData, motivation: e.target.value})}
                            ></textarea>
                        </div>

                        {/* Submit Button */}
                        <button 
                            type="submit" 
                            disabled={submitting}
                            className="w-full h-16 bg-[#0055FF] text-white text-[15px] font-bold uppercase tracking-widest hover:bg-black transition-colors flex items-center justify-center gap-3 disabled:bg-zinc-300"
                        >
                            {submitting ? "Submitting..." : (
                                <>
                                    Submit Application
                                    <ArrowRight className="w-4 h-4" />
                                </>
                            )}
                        </button>
                    </form>
                )}
            </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
