"use client";

import { useState, useEffect } from "react";
import { 
  Users, 
  Send, 
  History, 
  Plus, 
  LayoutDashboard, 
  ChevronRight, 
  Search, 
  Filter, 
  MoreVertical, 
  CheckCircle2, 
  Clock, 
  AlertCircle,
  Mail,
  Briefcase,
  Github,
  Globe,
  Paperclip
} from "lucide-react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

interface Intern {
  id: string;
  name: string;
  email: string;
  internForm?: {
    college: string;
    branch: string;
    githubLink: string;
  };
}

interface Task {
  id: string;
  title: string;
  description: string;
  attachmentUrl?: string;
  user: { name: string; email: string };
  status: string;
  createdAt: string;
}

export default function CleedDashboard() {
  const [activeTab, setActiveTab] = useState("interns");
  const [interns, setInterns] = useState<Intern[]>([]);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // Selection
  const [selectedIntern, setSelectedIntern] = useState<Intern | null>(null);
  
  // New Task Form
  const [taskData, setTaskData] = useState({ title: "", description: "", attachmentUrl: "" });
  const [sendingTask, setSendingTask] = useState(false);
  const [formSuccess, setFormSuccess] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const [internsRes, tasksRes] = await Promise.all([
        fetch("/api/cleed/interns"),
        fetch("/api/cleed/tasks")
      ]);
      const internsData = await internsRes.json();
      const tasksData = await tasksRes.json();
      setInterns(internsData);
      setTasks(tasksData);
    } catch (err) {
      console.error("Failed to load dashboard data");
    } finally {
      setIsLoading(false);
    }
  };

  const handlePostTask = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedIntern) return;
    setSendingTask(true);
    
    try {
      const res = await fetch("/api/cleed/tasks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
           internId: selectedIntern.id, 
           title: taskData.title, 
           description: taskData.description,
           attachmentUrl: taskData.attachmentUrl
        }),
      });

      if (res.ok) {
        setFormSuccess(true);
        setTaskData({ title: "", description: "", attachmentUrl: "" });
        setTimeout(() => setFormSuccess(false), 3000);
        fetchData();
      }
    } catch (err) {
      console.error("Task allocation failed");
    } finally {
      setSendingTask(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F5F7FA] font-sans text-zinc-900">
       {/* Sidebar */}
       <aside className="fixed left-0 top-0 h-full w-20 lg:w-64 bg-black border-r border-zinc-900 z-50 flex flex-col">
          <div className="p-8 flex items-center gap-3">
             <div className="h-4 w-4 bg-[#0055FF]" />
             <span className="hidden lg:block text-white font-bold text-[14px] uppercase tracking-widest">Cleed Panel</span>
          </div>

          <nav className="flex-1 mt-10 space-y-2 px-4">
             {[
               { id: "interns", icon: Users, label: "Intern Registry" },
               { id: "assign", icon: Send, label: "Dispatch Task" },
               { id: "history", icon: History, label: "Transmission Log" }
             ].map((item) => (
                <button 
                   key={item.id}
                   onClick={() => setActiveTab(item.id)}
                   className={`w-full h-12 flex items-center px-4 gap-4 transition-all ${
                      activeTab === item.id 
                      ? "bg-[#0055FF] text-white" 
                      : "text-zinc-500 hover:text-white"
                   }`}
                >
                   <item.icon size={18} />
                   <span className="hidden lg:block text-[12px] font-bold uppercase tracking-widest">{item.label}</span>
                </button>
             ))}
          </nav>
          
          <div className="p-8 border-t border-zinc-900">
             <div className="flex items-center gap-3">
                <div className="h-8 w-8 rounded bg-zinc-800" />
                <div className="hidden lg:block">
                   <p className="text-[11px] text-white font-bold">Admin Cleed</p>
                   <p className="text-[10px] text-zinc-500 uppercase">Executive Manager</p>
                </div>
             </div>
          </div>
       </aside>

       {/* Main Content */}
       <main className="pl-20 lg:pl-64 min-h-screen">
          <header className="h-20 bg-white border-b border-zinc-100 flex items-center justify-between px-8 sticky top-0 z-40 backdrop-blur-md bg-white/80">
             <div className="flex items-center gap-2">
                <span className="text-zinc-400 text-sm">Dashboard</span>
                <ChevronRight size={14} className="text-zinc-300" />
                <span className="text-zinc-900 font-bold text-sm uppercase tracking-widest">
                   {activeTab === "interns" ? "Interns" : activeTab === "assign" ? "Allocations" : "Logbook"}
                </span>
             </div>
             
             <div className="flex items-center gap-6">
                <div className="relative group hidden md:block">
                   <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-zinc-400" />
                   <input className="h-9 w-64 bg-zinc-50 border border-zinc-100 pl-9 pr-4 text-[12px] outline-none focus:border-[#0055FF] transition-all" placeholder="Audit registry..." />
                </div>
                <div className="h-5 w-[1px] bg-zinc-200" />
                <button className="h-9 w-9 bg-[#0055FF] text-white flex items-center justify-center hover:shadow-xl hover:shadow-[#0055FF]/20 transition-all">
                   <Plus size={16} />
                </button>
             </div>
          </header>

          <div className="p-8 md:p-12 max-w-7xl mx-auto">
             
             {/* Interns Tab */}
             {activeTab === "interns" && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
                   <div className="flex items-center justify-between">
                      <h2 className="text-2xl font-bold tracking-tight">Registered Interns</h2>
                      <span className="px-4 py-1.5 bg-white border border-zinc-100 text-[11px] font-bold text-[#0055FF] uppercase tracking-widest flex items-center gap-2">
                         <div className="h-1.5 w-1.5 bg-[#0055FF] rounded-full animate-pulse" />
                         {interns.length} Direct Entities
                      </span>
                   </div>

                   <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {interns.map((intern) => (
                         <div key={intern.id} className="bg-white border border-zinc-100 p-8 group hover:border-[#0055FF]/40 transition-all hover:shadow-2xl hover:shadow-black/[0.02] relative overflow-hidden">
                            <div className="absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity">
                               <button onClick={() => { setSelectedIntern(intern); setActiveTab("assign"); }} className="h-8 w-8 bg-[#0055FF] text-white flex items-center justify-center">
                                  <Send size={14} />
                               </button>
                            </div>
                            
                            <div className="flex items-center gap-4 mb-6">
                               <div className="h-12 w-12 bg-black text-white flex items-center justify-center text-sm font-bold">
                                  {intern.name[0]}
                               </div>
                               <div>
                                  <h3 className="font-bold text-[15px]">{intern.name}</h3>
                                  <p className="text-[11px] text-zinc-400 font-medium uppercase tracking-widest">{intern.internForm?.branch || "Trainee"}</p>
                               </div>
                            </div>

                            <div className="space-y-3 pt-6 border-t border-zinc-50">
                               <div className="flex items-center gap-3 text-[12px] text-zinc-500">
                                  <Mail size={14} className="text-zinc-300" />
                                  <span>{intern.email}</span>
                               </div>
                               <div className="flex items-center gap-3 text-[12px] text-zinc-500">
                                  <Briefcase size={14} className="text-zinc-300" />
                                  <span>{intern.internForm?.college || "Global Forge"}</span>
                               </div>
                            </div>

                            <div className="flex items-center gap-4 mt-8">
                               <Link href={intern.internForm?.githubLink || "#"} className="h-8 px-4 border border-zinc-100 flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest hover:border-[#0055FF] hover:text-[#0055FF] transition-all">
                                  <Github size={12} /> Git
                               </Link>
                               <button className="h-8 w-8 border border-zinc-100 flex items-center justify-center hover:border-[#0055FF] hover:text-[#0055FF] transition-all">
                                  <History size={12} />
                               </button>
                            </div>
                         </div>
                      ))}
                   </div>
                </motion.div>
             )}

             {/* Assign Task Tab */}
             {activeTab === "assign" && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="max-w-2xl mx-auto space-y-8">
                   <div className="text-center mb-12">
                      <h2 className="text-3xl font-bold tracking-tight mb-3">Dispatch Mission</h2>
                      <p className="text-zinc-500 text-sm">Allocate individual tasks to your registered assets</p>
                   </div>

                   <form onSubmit={handlePostTask} className="bg-white border border-zinc-100 p-10 md:p-12 space-y-8 shadow-2xl shadow-black/5">
                      <div className="space-y-4">
                         <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-500">Target Asset</label>
                         <div className="relative">
                            <Users className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" />
                            <select 
                              required
                              value={selectedIntern?.id || ""}
                              onChange={(e) => {
                                 const found = interns.find(i => i.id === e.target.value);
                                 setSelectedIntern(found || null);
                              }}
                              className="w-full h-14 bg-zinc-50 border border-zinc-100 pl-12 pr-4 text-sm outline-none focus:border-[#0055FF] transition-all appearance-none"
                            >
                               <option value="">Select an intern...</option>
                               {interns.map((i) => (
                                  <option key={i.id} value={i.id}>{i.name} ({i.email})</option>
                               ))}
                            </select>
                         </div>
                      </div>

                      <div className="space-y-4">
                         <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-500">Task Objective</label>
                         <input 
                           required 
                           value={taskData.title}
                           onChange={(e) => setTaskData({...taskData, title: e.target.value})}
                           placeholder="Enter project/task title"
                           className="w-full h-14 bg-zinc-50 border border-zinc-100 px-6 text-sm outline-none focus:border-[#0055FF] transition-all font-bold" 
                         />
                      </div>

                      <div className="space-y-4">
                         <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-500">Protocol Attachment (PDF Link)</label>
                         <input 
                           value={taskData.attachmentUrl}
                           onChange={(e) => setTaskData({...taskData, attachmentUrl: e.target.value})}
                           placeholder="Paste document link (optional)"
                           className="w-full h-14 bg-zinc-50 border border-zinc-100 px-6 text-sm outline-none focus:border-[#0055FF] transition-all" 
                         />
                      </div>

                      <div className="space-y-4">
                         <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-500">Protocol Details</label>
                         <textarea 
                           required 
                           rows={6}
                           value={taskData.description}
                           onChange={(e) => setTaskData({...taskData, description: e.target.value})}
                           placeholder="Describe the mission requirements and expected outcomes..."
                           className="w-full bg-zinc-50 border border-zinc-100 p-6 text-sm outline-none focus:border-[#0055FF] transition-all resize-none leading-relaxed" 
                         />
                      </div>

                      {formSuccess && (
                         <div className="p-4 bg-emerald-50 border border-emerald-100 flex items-center gap-3 text-emerald-600">
                            <CheckCircle2 size={16} />
                            <span className="text-[12px] font-bold uppercase tracking-widest">Transmission Successful</span>
                         </div>
                      )}

                      <button 
                        disabled={sendingTask || !selectedIntern}
                        type="submit"
                        className="w-full h-16 bg-black text-white text-[12px] font-bold uppercase tracking-widest flex items-center justify-center gap-3 hover:bg-[#0055FF] transition-all disabled:opacity-50"
                      >
                         {sendingTask ? "Processing..." : <>Initiate Dispatch <ChevronRight size={16} /></>}
                      </button>
                   </form>
                </motion.div>
             )}

             {/* History Tab */}
             {activeTab === "history" && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
                   <div className="flex items-center justify-between">
                      <h2 className="text-2xl font-bold tracking-tight">Transmission Logbook</h2>
                      <div className="flex items-center gap-4">
                         <button className="h-10 px-6 bg-white border border-zinc-100 text-[11px] font-bold uppercase tracking-widest flex items-center gap-2">
                            <Filter size={14} /> Filter Logs
                         </button>
                      </div>
                   </div>

                   <div className="bg-white border border-zinc-100 overflow-hidden shadow-2xl shadow-black/5">
                      <table className="w-full text-left">
                         <thead>
                            <tr className="bg-zinc-50 border-b border-zinc-100">
                               <th className="px-8 py-5 text-[10px] font-bold uppercase tracking-widest text-zinc-400">Assigned Asset</th>
                               <th className="px-8 py-5 text-[10px] font-bold uppercase tracking-widest text-zinc-400">Task Protocol</th>
                               <th className="px-8 py-5 text-[10px] font-bold uppercase tracking-widest text-zinc-400">System Status</th>
                               <th className="px-8 py-5 text-[10px] font-bold uppercase tracking-widest text-zinc-400">Timestamp</th>
                               <th className="px-8 py-5 text-[10px] font-bold uppercase tracking-widest text-zinc-400 text-right">Action</th>
                            </tr>
                         </thead>
                         <tbody className="divide-y divide-zinc-50">
                            {tasks.map((task) => (
                               <tr key={task.id} className="hover:bg-zinc-50/50 transition-colors">
                                  <td className="px-8 py-6">
                                     <div className="flex items-center gap-3">
                                        <div className="h-8 w-8 bg-zinc-100 flex items-center justify-center text-[10px] font-bold">
                                           {task.user?.name[0]}
                                        </div>
                                        <div>
                                           <p className="text-[13px] font-bold">{task.user?.name}</p>
                                           <p className="text-[10px] text-zinc-400">{task.user?.email}</p>
                                        </div>
                                     </div>
                                  </td>
                                  <td className="px-8 py-6">
                                     <div className="flex items-center gap-2">
                                        <p className="text-[13px] font-bold">{task.title}</p>
                                        {task.attachmentUrl && (
                                           <a href={task.attachmentUrl} target="_blank" rel="noopener noreferrer" className="text-[#0055FF] hover:scale-110 transition-transform">
                                              <Paperclip size={14} />
                                           </a>
                                        )}
                                     </div>
                                     <p className="text-[11px] text-zinc-400 truncate max-w-[200px]">{task.description}</p>
                                  </td>
                                  <td className="px-8 py-6">
                                     <div className="flex items-center gap-2">
                                        {task.status === "pending" ? (
                                           <Clock size={14} className="text-amber-500" />
                                        ) : (
                                           <CheckCircle2 size={14} className="text-emerald-500" />
                                        )}
                                        <span className={`text-[11px] font-bold uppercase tracking-widest ${
                                           task.status === "pending" ? "text-amber-600" : "text-emerald-600"
                                        }`}>
                                           {task.status}
                                        </span>
                                     </div>
                                  </td>
                                  <td className="px-8 py-6 text-[12px] text-zinc-500">
                                     {new Date(task.createdAt).toLocaleDateString()}
                                  </td>
                                  <td className="px-8 py-6 text-right">
                                     <button className="h-8 w-8 text-zinc-300 hover:text-black transition-colors">
                                        <MoreVertical size={16} />
                                     </button>
                                  </td>
                               </tr>
                            ))}
                         </tbody>
                      </table>
                      {tasks.length === 0 && (
                         <div className="py-20 text-center">
                            <History className="mx-auto h-12 w-12 text-zinc-100 mb-4" />
                            <p className="text-zinc-400 text-sm font-medium">No system transmissions recorded yet.</p>
                         </div>
                      )}
                   </div>
                </motion.div>
             )}

          </div>
       </main>
    </div>
  );
}
