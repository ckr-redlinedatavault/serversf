"use client";

import { useEffect, useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { 
    LayoutDashboard, 
    Briefcase,
    Paperclip,
    Download,
    CheckCircle2,
    Clock,
    ChevronRight,
    Search,
    RefreshCw,
    FileBadge,
    X
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface Task {
  id: string;
  title: string;
  description: string;
  attachmentUrl?: string;
  status: string;
  createdAt: string;
}

function InternDashboardContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const activeTab = searchParams.get("view") || "overview";
    
    const [user, setUser] = useState<any>(null);
    const [tasks, setTasks] = useState<Task[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isUpdating, setIsUpdating] = useState<string | null>(null);
    const [userStatus, setUserStatus] = useState<any>(null);
    const [showLetterModal, setShowLetterModal] = useState(false);

    useEffect(() => {
        const storedUser = localStorage.getItem("intern_user");
        if (!storedUser) {
            router.push("/intern/signin");
            return;
        }
        const userData = JSON.parse(storedUser);
        setUser(userData);
        fetchTasks(userData.id);
        fetchStatus(userData.id);

        // Auto-refresh data every 20 seconds
        const syncInterval = setInterval(() => {
            fetchTasks(userData.id);
            fetchStatus(userData.id);
        }, 20000);

        return () => clearInterval(syncInterval);
    }, [router]);

    const fetchStatus = async (id: string) => {
        try {
            const res = await fetch(`/api/intern/status?id=${id}`);
            const data = await res.json();
            setUserStatus(data);
            
            // Priority Check: Internship Letter Isuance
            const lastAck = localStorage.getItem(`letter_ack_${id}`);
            if (data.letterUrl && data.letterUrl !== lastAck) {
                setShowLetterModal(true);
            }
        } catch (e) {
            console.error("Status check offline");
        }
    };

    const fetchTasks = async (id: string) => {
       try {
          const res = await fetch(`/api/intern/tasks?internId=${id}`);
          const data = await res.json();
          setTasks(data);
       } catch (error) {
          console.error("Failed to load tasks");
       } finally {
          setIsLoading(false);
       }
    };

    const updateTaskStatus = async (taskId: string, currentStatus: string) => {
        setIsUpdating(taskId);
        const newStatus = currentStatus === "pending" ? "completed" : "pending";
        
        try {
            const res = await fetch("/api/tasks", {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ id: taskId, status: newStatus }),
            });

            if (res.ok) {
                setTasks(tasks.map(t => t.id === taskId ? { ...t, status: newStatus } : t));
            }
        } catch (error) {
            console.error("Failed to update status");
        } finally {
            setIsUpdating(null);
        }
    };

    if (!user) return null;

    return (
        <div className="p-8 lg:p-12 max-w-6xl w-full mx-auto">
           {activeTab === "overview" && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-12">
                 <div className="max-w-2xl">
                    <div className="inline-flex items-center gap-2 mb-6 text-emerald-500">
                       <div className="h-2 w-2 bg-emerald-500 rounded-none animate-pulse" />
                       <span className="text-[12px] font-bold tracking-tight leading-none uppercase">System online</span>
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-zinc-900 mb-6 font-sans">
                       Hello, {user.name.split(' ')[0]}! <span className="text-zinc-300">Welcome back.</span>
                    </h1>
                    <p className="text-zinc-500 text-lg font-medium leading-relaxed">
                       It's great to see you again. You currently have {tasks.filter(t => t.status === 'pending').length} assignments waiting for your action. Let's make an impact today.
                    </p>
                    
                    {userStatus?.letterUrl && (
                       <div className="mt-8 flex flex-col sm:flex-row items-center gap-6 p-8 bg-black text-white rounded-none shadow-2xl shadow-black/20">
                          <div className="h-14 w-14 bg-[#0055FF] text-white flex items-center justify-center shrink-0">
                             <FileBadge size={28} />
                          </div>
                          <div className="flex-1 text-center sm:text-left">
                             <h3 className="text-lg font-bold uppercase tracking-tighter italic">Official Documentation Issued</h3>
                             <p className="text-[11px] font-bold text-zinc-400 mt-1 uppercase tracking-widest leading-none">Your Internship Confirmation Letter is ready for download</p>
                          </div>
                          <a 
                            href={userStatus.letterUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="h-14 px-8 bg-[#0055FF] text-white text-[12px] font-bold uppercase tracking-widest flex items-center gap-3 hover:bg-emerald-600 transition-all rounded-none"
                          >
                             Download Letter <Download size={16} />
                          </a>
                       </div>
                    )}
                 </div>

                 <div className="space-y-6">
                    <h2 className="text-xl font-bold tracking-tight px-1 flex items-center gap-2 uppercase text-[13px] text-zinc-400">
                       Allocated Tasks <div className="h-1 w-1 bg-[#0055FF] rounded-none" />
                    </h2>
                    <div className="grid grid-cols-1 gap-4">
                       {tasks.map((task) => (
                          <div key={task.id} className="group bg-white border border-zinc-100 p-8 flex flex-col md:flex-row md:items-center justify-between gap-8 hover:border-[#0055FF] transition-all rounded-none shadow-sm">
                             <div className="space-y-2 max-w-xl">
                                <div className="flex items-center gap-3 mb-2">
                                   <span className={`text-[10px] font-bold uppercase tracking-widest px-3 py-1 border rounded-none ${
                                      task.status === "pending" ? "border-amber-200 text-amber-600 bg-amber-50" : "border-emerald-200 text-emerald-600 bg-emerald-50"
                                   }`}>
                                      {task.status}
                                   </span>
                                   <span className="text-[10px] text-zinc-400 font-medium">Deployed {new Date(task.createdAt).toLocaleDateString()}</span>
                                </div>
                                <h3 className="text-xl font-bold">{task.title}</h3>
                                <p className="text-[14px] text-zinc-500 leading-relaxed font-medium">
                                   {task.description}
                                </p>
                             </div>

                             <div className="flex items-center gap-4">
                                {task.attachmentUrl && (
                                   <a 
                                      href={task.attachmentUrl} 
                                      target="_blank" 
                                      rel="noopener noreferrer" 
                                      className="h-12 w-12 bg-zinc-50 text-[#0055FF] flex items-center justify-center hover:bg-[#0055FF] hover:text-white transition-all border border-zinc-100 rounded-none"
                                      title="Download Protocol"
                                   >
                                      <Download size={18} />
                                   </a>
                                )}
                                <button 
                                   disabled={isUpdating === task.id}
                                   onClick={() => updateTaskStatus(task.id, task.status)}
                                   className={`h-12 px-8 text-white text-[11px] font-bold uppercase tracking-widest transition-all flex items-center gap-2 rounded-none disabled:opacity-50 ${
                                      task.status === "pending" ? "bg-black hover:bg-emerald-600" : "bg-emerald-600 hover:bg-black"
                                   }`}
                                >
                                   {isUpdating === task.id ? (
                                      <RefreshCw size={16} className="animate-spin" />
                                   ) : (
                                      <>
                                         {task.status === "pending" ? "Mark Complete" : "Mark Pending"} 
                                         <CheckCircle2 size={16} />
                                      </>
                                   )}
                                </button>
                             </div>
                          </div>
                       ))}
                       {tasks.length === 0 && !isLoading && (
                          <div className="py-20 text-center border-2 border-dashed border-zinc-100 rounded-none">
                             <Briefcase size={40} className="mx-auto text-zinc-100 mb-4" />
                             <p className="text-zinc-400 font-medium tracking-tight">No system objectives deployed to your node.</p>
                          </div>
                       )}
                    </div>
                 </div>
              </motion.div>
           )}

           {activeTab === "tasks" && (
             <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
                <div className="flex items-center justify-between">
                   <h2 className="text-2xl font-bold tracking-tight">Active Assignments</h2>
                </div>
                <div className="grid grid-cols-1 gap-4">
                   {tasks.map((task) => (
                      <div key={task.id} className="group bg-white border border-zinc-100 p-8 flex flex-col md:flex-row md:items-center justify-between gap-8 hover:border-black transition-all rounded-none">
                         <div className="space-y-2 max-w-xl">
                            <div className="flex items-center gap-3 mb-2">
                               <span className={`text-[10px] font-bold uppercase tracking-widest px-3 py-1 border rounded-none ${
                                  task.status === "pending" ? "border-amber-200 text-amber-600 bg-amber-50" : "border-emerald-200 text-emerald-600 bg-emerald-50"
                               }`}>
                                  {task.status}
                               </span>
                               <span className="text-[10px] text-zinc-400 font-medium">Deployed {new Date(task.createdAt).toLocaleDateString()}</span>
                            </div>
                            <h3 className="text-xl font-bold">{task.title}</h3>
                            <p className="text-[14px] text-zinc-500 leading-relaxed font-medium">
                               {task.description}
                            </p>
                         </div>
                         <div className="flex items-center gap-4">
                            {task.attachmentUrl && (
                               <a 
                                  href={task.attachmentUrl} 
                                  target="_blank" 
                                  rel="noopener noreferrer" 
                                  className="h-12 w-12 bg-zinc-50 text-black flex items-center justify-center hover:bg-black hover:text-white transition-all border border-zinc-100 rounded-none"
                               >
                                  <Download size={18} />
                               </a>
                            )}
                            <button 
                               disabled={isUpdating === task.id}
                               onClick={() => updateTaskStatus(task.id, task.status)}
                               className={`h-12 px-6 text-white text-[11px] font-bold uppercase tracking-widest transition-all flex items-center gap-2 rounded-none ${
                                  task.status === "pending" ? "bg-black hover:bg-emerald-600" : "bg-emerald-600 hover:bg-black"
                               }`}
                            >
                               {isUpdating === task.id ? <RefreshCw size={16} className="animate-spin" /> : (
                                  <>
                                     {task.status === "pending" ? "Mark Complete" : "Mark Pending"} <CheckCircle2 size={16} />
                                  </>
                               )}
                            </button>
                         </div>
                      </div>
                   ))}
                   {tasks.length === 0 && !isLoading && (
                      <div className="py-20 text-center border-2 border-dashed border-zinc-100 rounded-none">
                         <Briefcase size={40} className="mx-auto text-zinc-100 mb-4" />
                         <p className="text-zinc-400 font-medium">No objectives found.</p>
                      </div>
                   )}
                </div>
             </motion.div>
           )}

           <AnimatePresence>
             {showLetterModal && userStatus?.letterUrl && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/80 backdrop-blur-md">
                   <motion.div 
                     initial={{ opacity: 0, scale: 0.95, y: 20 }}
                     animate={{ opacity: 1, scale: 1, y: 0 }}
                     exit={{ opacity: 0, scale: 0.95, y: 20 }}
                     className="bg-white max-w-lg w-full p-10 relative border-l-8 border-[#0055FF] rounded-none shadow-2xl"
                   >
                      <button 
                        onClick={() => {
                           setShowLetterModal(false);
                           localStorage.setItem(`letter_ack_${user.id}`, userStatus.letterUrl);
                        }}
                        className="absolute top-6 right-6 text-zinc-300 hover:text-black transition-colors"
                      >
                         <X size={24} />
                      </button>

                      <div className="flex flex-col items-center text-center">
                         <div className="h-20 w-20 bg-[#0055FF] text-white flex items-center justify-center mb-8 shadow-xl shadow-[#0055FF]/20">
                            <FileBadge size={40} />
                         </div>
                         
                         <h2 className="text-3xl font-bold tracking-tight mb-4 uppercase tracking-tighter">Credential Issued</h2>
                         <p className="text-zinc-500 text-[15px] leading-relaxed mb-10 font-medium">
                            The administration has authorized and issued your official **Internship Confirmation Letter**. You can now download and view your credentials.
                         </p>

                         <div className="flex flex-col w-full gap-4">
                            <a 
                              href={userStatus.letterUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              onClick={() => {
                                 setShowLetterModal(false);
                                 localStorage.setItem(`letter_ack_${user.id}`, userStatus.letterUrl);
                              }}
                              className="h-16 bg-black text-white text-[13px] font-bold uppercase tracking-widest flex items-center justify-center gap-3 hover:bg-emerald-600 transition-all rounded-none shadow-xl shadow-black/10"
                            >
                               Download Credentials <Download size={18} />
                            </a>
                            <button 
                              onClick={() => {
                                 setShowLetterModal(false);
                                 localStorage.setItem(`letter_ack_${user.id}`, userStatus.letterUrl);
                              }}
                              className="h-14 text-[11px] font-bold uppercase tracking-widest text-zinc-400 hover:text-zinc-900 transition-colors"
                            >
                               Review Portal Assignments
                            </button>
                         </div>
                      </div>
                   </motion.div>
                </div>
             )}
           </AnimatePresence>
        </div>
    );
}

export default function InternDashboard() {
  return (
    <Suspense fallback={<div className="p-12 text-zinc-400 text-[11px] font-bold uppercase tracking-[0.2em] animate-pulse">Initializing Portal Node...</div>}>
      <InternDashboardContent />
    </Suspense>
  );
}
