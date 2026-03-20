"use client";

import { useEffect, useState } from "react";
import { 
    Users,
    PlusCircle,
    Loader2,
    ClipboardList,
    MessageSquare,
    FileText,
    Trash2,
    CheckCircle2,
    RefreshCw
} from "lucide-react";

export default function CEODashboard() {
    const [stats, setStats] = useState<any>(null);
    const [tasks, setTasks] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [isCreatingTask, setIsCreatingTask] = useState(false);
    const [newTask, setNewTask] = useState({ title: "", description: "" });

    const fetchOverview = async () => {
        try {
            const res = await fetch("/api/ceo/overview");
            const data = await res.json();
            if (data.success) setStats(data.data);
            
            const taskRes = await fetch("/api/tasks");
            const taskData = await taskRes.json();
            if (taskData.success) setTasks(taskData.tasks);
        } catch (error) {
            console.error("Failed to fetch dashboard");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchOverview();
    }, []);

    const handleCreateTask = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsCreatingTask(true);
        try {
            const res = await fetch("/api/tasks", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(newTask),
            });
            if (res.ok) {
                setNewTask({ title: "", description: "" });
                fetchOverview();
            }
        } catch (error) {
            console.error("Task failed");
        } finally {
            setIsCreatingTask(false);
        }
    };

    const handleUpdateStatus = async (id: string, status: string) => {
        try {
            const res = await fetch("/api/tasks", {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ id, status }),
            });
            if (res.ok) fetchOverview();
        } catch (error) {
            console.error("Update failed");
        }
    };

    const handleDeleteTask = async (id: string) => {
        if (!confirm("Are you sure you want to delete this task?")) return;
        try {
            const res = await fetch(`/api/tasks?id=${id}`, {
                method: "DELETE",
            });
            if (res.ok) fetchOverview();
        } catch (error) {
            console.error("Delete failed");
        }
    };

    if (!stats || loading) {
        return (
            <div className="h-full w-full flex items-center justify-center p-20">
                <Loader2 className="w-8 h-8 text-[#92E3A9] animate-spin" />
            </div>
        );
    }

    return (
        <div className="p-6 max-w-[1400px] mx-auto w-full space-y-8">
            {/* Header */}
            <div>
                <h1 className="text-2xl font-bold mb-1">Executive <span className="text-[#92E3A9]">Overview</span></h1>
                <p className="text-zinc-500 text-xs font-medium tracking-tight">System deployment: Nominal • Security: Active</p>
            </div>

            {/* Stats Matrix */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <StatCard 
                    icon={<Users className="w-4 h-4" />} 
                    label="Total Ecosystem" 
                    value={stats.students + stats.ctos + stats.media} 
                    trend="Unified Reach" 
                />
                <StatCard 
                    icon={<MessageSquare className="w-4 h-4" />} 
                    label="Public Feedback" 
                    value={stats.reviews} 
                    trend="Verified" 
                />
                <StatCard 
                    icon={<FileText className="w-4 h-4" />} 
                    label="Intern Pipeline" 
                    value={stats.interns} 
                    trend="New Applications" 
                />
                <StatCard 
                    icon={<ClipboardList className="w-4 h-4" />} 
                    label="Pending Tasks" 
                    value={tasks.filter(t => t.status === 'pending').length} 
                    trend="Action Required" 
                />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Task Broadcast Panel */}
                <div className="bg-[#0A0A0A] border border-zinc-900 rounded-3xl p-8 flex flex-col shadow-2xl">
                    <div className="mb-8">
                        <h3 className="text-lg font-bold mb-2 flex items-center gap-3">
                            <PlusCircle className="w-5 h-5 text-[#92E3A9]" />
                            Direct Task Broadcast
                        </h3>
                        <p className="text-zinc-500 text-[11px] font-medium tracking-tight">Deploy operational objectives to registered units.</p>
                    </div>
                    
                    <form onSubmit={handleCreateTask} className="space-y-4 flex-1">
                        <div>
                            <label className="text-[10px] font-black text-zinc-600 mb-2 block">Identifier</label>
                            <input 
                                required
                                placeholder="Task Title"
                                value={newTask.title}
                                onChange={(e) => setNewTask({...newTask, title: e.target.value})}
                                className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-xs outline-none focus:border-[#92E3A9] transition-all"
                            />
                        </div>
                        <div>
                            <label className="text-[10px] font-black text-zinc-600 mb-2 block">Objectives</label>
                            <textarea 
                                required
                                placeholder="Outcome requirements..."
                                rows={4}
                                value={newTask.description}
                                onChange={(e) => setNewTask({...newTask, description: e.target.value})}
                                className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-xs outline-none focus:border-[#92E3A9] transition-all resize-none"
                            />
                        </div>
                        <button 
                            disabled={isCreatingTask}
                            className="w-full h-12 bg-[#92E3A9] text-black rounded-xl font-bold text-[12px] flex items-center justify-center gap-2 mt-2"
                        >
                            {isCreatingTask ? <Loader2 className="w-4 h-4 animate-spin" /> : "Deploy Command"}
                        </button>
                    </form>
                </div>

                {/* Operational Log */}
                <div className="bg-[#0A0A0A] border border-zinc-900 rounded-3xl p-8 shadow-2xl flex flex-col">
                    <div className="flex items-center justify-between mb-8">
                        <div>
                            <h3 className="text-lg font-bold mb-2">Operational Log</h3>
                            <p className="text-[11px] font-medium text-zinc-500 tracking-tight">Audit trail of all broadcasted commands.</p>
                        </div>
                        <button onClick={fetchOverview} className="h-8 px-3 bg-zinc-900 border border-zinc-800 rounded-lg text-[10px] font-black text-[#92E3A9] flex items-center gap-2 hover:border-[#92E3A9]/30 transition-all group">
                            <RefreshCw className="w-3 h-3 group-hover:rotate-180 transition-transform duration-500" />
                            <span>Refresh</span>
                        </button>
                    </div>
                     
                    <div className="space-y-3 overflow-y-auto max-h-[400px] pr-2 custom-scrollbar">
                        {tasks.map((task) => (
                            <div key={task.id} className="bg-zinc-950 border border-zinc-900/50 p-5 rounded-xl flex flex-col group hover:border-[#92E3A9]/20 transition-all border-l-2 border-l-[#92E3A9]/40 relative overflow-hidden">
                                <div className="flex items-center justify-between mb-2">
                                    <span className={`text-[10px] font-bold px-3 py-1 rounded tracking-tighter ${
                                        task.status === 'pending' ? 'bg-yellow-500/10 text-yellow-500' : 'bg-green-500/10 text-green-500'
                                    }`}>
                                        {task.status.charAt(0).toUpperCase() + task.status.slice(1)}
                                    </span>
                                    <span className="text-[10px] font-bold text-zinc-700">{new Date(task.createdAt).toLocaleDateString()}</span>
                                </div>
                                <h4 className="font-bold text-sm mb-1 group-hover:text-[#92E3A9] transition-colors line-clamp-1">{task.title}</h4>
                                <p className="text-[11px] text-zinc-600 line-clamp-2 font-medium mb-6">{task.description}</p>
                                
                                <div className="flex items-center gap-2 pt-4 border-t border-zinc-900">
                                    {task.status === 'pending' && (
                                        <button 
                                            onClick={() => handleUpdateStatus(task.id, 'completed')}
                                            className="flex-1 flex items-center justify-center gap-2 py-2 bg-green-500/10 hover:bg-green-500 text-green-500 hover:text-white rounded-lg text-[10px] font-bold transition-all"
                                        >
                                            <CheckCircle2 className="w-3 h-3" />
                                            Mark Completed
                                        </button>
                                    )}
                                    <button 
                                        onClick={() => handleDeleteTask(task.id)}
                                        className="h-8 px-3 bg-red-500/10 hover:bg-red-500 text-red-500 hover:text-white rounded-lg flex items-center justify-center transition-all group/trash"
                                    >
                                        <Trash2 className="w-3.5 h-3.5" />
                                    </button>
                                </div>
                            </div>
                        ))}
                        {tasks.length === 0 && (
                            <div className="h-32 border border-dashed border-zinc-800 rounded-2xl flex items-center justify-center text-zinc-700 text-[10px] font-bold tracking-tight">
                                No commands broadcasted
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

function StatCard({ icon, label, value, trend }: { icon: any, label: string, value: string | number, trend: string }) {
    return (
        <div className="bg-[#0A0A0A] border border-zinc-900 p-6 rounded-3xl hover:border-[#92E3A9]/20 transition-all shadow-xl group overflow-hidden relative">
            <div className="absolute -right-4 -top-4 w-20 h-20 bg-[#92E3A9]/5 rounded-full blur-2xl group-hover:bg-[#92E3A9]/10 transition-colors" />
            <div className="flex items-center justify-between mb-4 relative z-10">
                <div className="p-2.5 bg-zinc-950 rounded-xl border border-zinc-900 text-zinc-600 group-hover:text-[#92E3A9] transition-colors">
                    {icon}
                </div>
                <span className="text-[9px] font-bold text-[#92E3A9] bg-[#92E3A9]/10 px-2 py-0.5 rounded tracking-tighter">{trend}</span>
            </div>
            <p className="text-[10px] font-black text-zinc-600 tracking-tight mb-1.5 relative z-10">{label}</p>
            <p className="text-3xl font-bold text-white relative z-10 font-mono tracking-tighter">{value}</p>
        </div>
    );
}
