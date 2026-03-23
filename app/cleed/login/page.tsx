"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Shield, Lock, Mail, ArrowRight, Loader2 } from "lucide-react";
import { motion } from "framer-motion";
import { PWAInstallButton } from "@/app/components/PWAInstallButton";

export default function CleedLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const res = await fetch("/api/cleed/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (res.ok) {
        // In a real app, set cookie/session here
        // For simplicity, we'll just redirect
        router.push("/cleed/dashboard");
      } else {
        const data = await res.json();
        setError(data.error || "Invalid credentials");
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-6 relative overflow-hidden">
      {/* Decorative Background */}
      <div className="absolute top-0 left-0 w-full h-full bg-[#0055FF]/5 blur-[120px] rounded-full -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-full h-full bg-[#0055FF]/5 blur-[120px] rounded-full translate-x-1/2 translate-y-1/2" />
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md relative z-10"
      >
        <div className="bg-zinc-900/50 backdrop-blur-xl border border-zinc-800 p-8 md:p-12 shadow-2xl">
          <div className="flex flex-col items-center mb-10 text-center">
            <div className="h-16 w-16 bg-[#0055FF] flex items-center justify-center mb-6 shadow-2xl shadow-[#0055FF]/20">
              <Shield className="text-white h-8 w-8" />
            </div>
            <h1 className="text-2xl font-bold tracking-tight text-white mb-2">Cleed Access</h1>
            <p className="text-zinc-500 text-sm">Secure administrative gateway</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 ml-1">Email Identifier</label>
              <div className="relative group">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-600 group-focus-within:text-[#0055FF] transition-colors" />
                <input 
                  required
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter administrator email"
                  className="w-full h-14 bg-black/40 border border-zinc-800 pl-12 pr-4 text-base md:text-sm text-white outline-none focus:border-[#0055FF] transition-all"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 ml-1">Security Key</label>
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-600 group-focus-within:text-[#0055FF] transition-colors" />
                <input 
                  required
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter secure password"
                  className="w-full h-14 bg-black/40 border border-zinc-800 pl-12 pr-4 text-base md:text-sm text-white outline-none focus:border-[#0055FF] transition-all"
                />
              </div>
            </div>

            {error && (
              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-red-500 text-[12px] font-medium text-center"
              >
                {error}
              </motion.p>
            )}

            <button 
              disabled={isLoading}
              type="submit"
              className="w-full h-14 bg-white text-black text-[12px] font-bold uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-[#0055FF] hover:text-white transition-all disabled:opacity-50"
            >
              {isLoading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <>
                  Authenticate <ArrowRight className="h-4 w-4" />
                </>
              )}
            </button>
          </form>

          <p className="mt-10 text-center text-zinc-600 text-[11px]">
            Unauthorized access is strictly prohibited and monitored.
          </p>
        </div>
      </motion.div>
      <PWAInstallButton />
    </div>
  );
}
