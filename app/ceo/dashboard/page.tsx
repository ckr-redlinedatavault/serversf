"use client";

import { useEffect, useState } from "react";
import { 
    Users,
    Star,
    PlusCircle,
    ChevronRight,
    Loader2,
    ClipboardList,
    Activity
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

    if (!stats) return null;

    return (
        <div className="p-10 max-w-[1400px] mx-auto w-full">
            {/* Hero Section */}
            <div className="mb-12">
                <h1 className="text-3xl font-semibold mb-2">Good afternoon, CEO.</h1>
                <p className="text-zinc-500 text-sm">System performance is optimal. All nodes are reporting nominal status.</p>
            </div>

            {/* Stats Row */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
                <StatCard icon={<Users className="w-4 h-4 text-[#92E3A9]" />} label="Total Reach" value={`${stats.students + stats.ctos + stats.media}`} trend="+12%" />
                <StatCard icon={<Star className="w-4 h-4 text-[#92E3A9]" />} label="Avg Rating" value="4.9" trend="Peak" />
                <StatCard icon={<Activity className="w-4 h-4 text-[#92E3A9]" />} label="Active Sessions" value="28" trend="+4" />
                <StatCard icon={<ClipboardList className="w-4 h-4 text-[#92E3A9]" />} label="Open Tasks" value={tasks.filter(t => t.status === 'pending').length} trend="Live" />
            </div>

            <div className="space-y-10">
                {/* Full Width Task Assignment */}
                <div className="bg-[#0A0A0A] border border-zinc-900 rounded-[2.5rem] p-10">
                    <div className="max-w-3xl">
                        <h3 className="text-xl font-bold mb-6 flex items-center gap-3">
                            <PlusCircle className="w-6 h-6 text-[#92E3A9]" />
                            Direct Task Broadcast
                        </h3>
                        <p className="text-zinc-500 text-sm mb-10 leading-relaxed font-medium">Assign critical objectives to the media core. Messages are broadcasted instantly to all registered units.</p>
                        
                        <form onSubmit={handleCreateTask} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="md:col-span-2">
                                <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest ml-1 mb-2 block">Task Identification</label>
                                <input 
                                    required
                                    placeholder="Task Title (e.g., Q2 Media Campaign)"
                                    value={newTask.title}
                                    onChange={(e) => setNewTask({...newTask, title: e.target.value})}
                                    className="w-full bg-zinc-900/50 border border-zinc-800 rounded-2xl px-6 py-4 text-sm outline-none focus:border-[#92E3A9] transition-all"
                                />
                            </div>
                            <div className="md:col-span-2">
                                <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest ml-1 mb-2 block">Objective Description</label>
                                <textarea 
                                    required
                                    placeholder="Outline the key performance indicators and requirements..."
                                    rows={4}
                                    value={newTask.description}
                                    onChange={(e) => setNewTask({...newTask, description: e.target.value})}
                                    className="w-full bg-zinc-900/50 border border-zinc-800 rounded-2xl px-6 py-4 text-sm outline-none focus:border-[#92E3A9] transition-all resize-none"
                                />
                            </div>
                            <div className="md:col-span-2">
                                <button 
                                    disabled={isCreatingTask}
                                    className="w-full md:w-fit bg-[#92E3A9] text-black px-12 h-14 rounded-2xl font-bold text-sm hover:bg-white transition-all transition-colors flex items-center justify-center gap-2 shadow-xl shadow-[#92E3A9]/5"
                                >
                                    {isCreatingTask ? <Loader2 className="w-4 h-4 animate-spin" /> : "Deploy Task"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>

                {/* Full Width Task List */}
                <div className="bg-[#0A0A0A] border border-zinc-900 rounded-[2.5rem] p-10">
                     <div className="flex items-center justify-between mb-8">
                        <div>
                            <h3 className="text-xl font-bold">Operational Log</h3>
                            <p className="text-xs text-zinc-500 mt-1">Audit trail of all broadcasted commands.</p>
                        </div>
                        <button onClick={fetchOverview} className="text-[10px] font-bold text-[#92E3A9] uppercase hover:underline">Refresh Matrix</button>
                     </div>
                     
                     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {tasks.map((task) => (
                            <div key={task.id} className="bg-zinc-900/30 border border-zinc-900 p-8 rounded-3xl flex flex-col group hover:border-zinc-700 transition-all border-l-4 border-l-[#92E3A9]">
                                <div className="flex items-center justify-between mb-4">
                                    <span className={`text-[10px] font-bold px-3 py-1 rounded-full uppercase ${
                                        task.status === 'pending' ? 'bg-yellow-500/10 text-yellow-500' : 'bg-green-500/10 text-green-500'
                                    }`}>
                                        {task.status}
                                    </span>
                                    <span className="text-[10px] font-bold text-zinc-600">{new Date(task.createdAt).toLocaleDateString()}</span>
                                </div>
                                <h4 className="font-bold text-base mb-3 group-hover:text-[#92E3A9] transition-colors">{task.title}</h4>
                                <p className="text-xs text-zinc-500 leading-relaxed line-clamp-2 mb-6">{task.description}</p>
                                <div className="mt-auto pt-4 border-t border-zinc-800/50 flex items-center justify-between">
                                    <span className="text-[10px] font-bold text-zinc-600 uppercase">Registered Units</span>
                                    <ChevronRight className="w-4 h-4 text-zinc-700 group-hover:text-white transition-colors" />
                                </div>
                            </div>
                        ))}
                        {tasks.length === 0 && (
                            <div className="col-span-full h-40 border border-dashed border-zinc-800 rounded-[2rem] flex items-center justify-center text-zinc-600 text-xs italic">
                                No active tasks broadcasted to the network.
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
        <div className="bg-[#0A0A0A] border border-zinc-900 p-8 rounded-[2rem] hover:border-zinc-700 transition-all shadow-xl shadow-black/20">
            <div className="flex items-center justify-between mb-6">
                <div className="p-3 bg-zinc-900 rounded-2xl border border-zinc-800 text-[#92E3A9]">
                    {icon}
                </div>
                <span className="text-[10px] font-bold text-[#92E3A9] bg-[#92E3A9]/10 px-2 py-0.5 rounded uppercase">{trend}</span>
            </div>
            <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-2">{label}</p>
            <p className="text-4xl font-black text-white">{value}</p>
        </div>
    );
}
