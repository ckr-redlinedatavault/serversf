"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { 
    LayoutDashboard, 
    Settings, 
    LogOut, 
    Menu, 
    X,
    User,
    Users,
    Mail,
    ShieldCheck,
    Star,
    PlusCircle,
    ChevronRight,
    Loader2,
    Crown,
    ClipboardList,
    Activity,
    Search
} from "lucide-react";
import Link from "next/link";

export default function CEODashboard() {
    const router = useRouter();
    const [user, setUser] = useState<any>(null);
    const [currentTime, setCurrentTime] = useState(new Date());
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
        const storedUser = localStorage.getItem("ceo_user");
        if (!storedUser) {
            router.push("/ceo/signin");
            return;
        }
        setUser(JSON.parse(storedUser));
        
        const timer = setInterval(() => setCurrentTime(new Date()), 1000);
        fetchOverview();
        return () => clearInterval(timer);
    }, [router]);

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

    const handleLogout = () => {
        localStorage.removeItem("ceo_user");
        router.push("/");
    };

    if (!user || !stats) return null;

    return (
        <div className="min-h-screen bg-[#050505] text-white flex overflow-hidden font-sans">
            {/* Sidebar with all data categories */}
            <aside className="w-64 border-r border-zinc-900 bg-[#0A0A0A] flex flex-col z-50">
                <div className="p-8">
                    <div className="flex items-center gap-3">
                        <div className="h-8 w-8 bg-[#92E3A9] rounded-lg flex items-center justify-center">
                            <Crown className="w-4 h-4 text-black" strokeWidth={2.5} />
                        </div>
                        <div className="flex flex-col">
                            <span className="text-sm font-bold text-white tracking-tight leading-none">Forge CEO</span>
                            <span className="text-[10px] font-bold text-[#92E3A9] uppercase tracking-tighter mt-1">Operational Control</span>
                        </div>
                    </div>
                </div>

                <nav className="flex-1 px-4 space-y-1">
                    <SidebarNavItem icon={<LayoutDashboard size={18} />} label="Overview" active />
                    <SidebarNavItem icon={<ShieldCheck size={18} />} label="CTO Performance" badge={stats.ctos} />
                    <SidebarNavItem icon={<User size={18} />} label="Media Team" badge={stats.media} />
                    <SidebarNavItem icon={<Users size={18} />} label="Student Base" badge={stats.students} />
                    <SidebarNavItem icon={<Star size={18} />} label="Public Reviews" badge={stats.reviews} />
                    <SidebarNavItem icon={<Mail size={18} />} label="Global Messages" badge={stats.messages} />
                </nav>

                <div className="p-4 mt-auto border-t border-zinc-900">
                    <button 
                        onClick={handleLogout}
                        className="w-full flex items-center gap-3 p-3 text-zinc-500 hover:text-white hover:bg-zinc-800 rounded-xl transition-all"
                    >
                        <LogOut size={18} />
                        <span className="text-sm font-semibold">Exit Portal</span>
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 overflow-y-auto">
                <header className="h-20 border-b border-zinc-900 flex items-center justify-between px-10 bg-[#050505]/80 backdrop-blur-md sticky top-0 z-40">
                    <div className="flex flex-col">
                        <h2 className="text-xs font-bold text-zinc-500">CEO Management Gateway</h2>
                        <p className="text-[10px] font-medium text-zinc-500">
                            {currentTime.toLocaleDateString('en-US', { weekday: 'long', day: 'numeric', month: 'long' })} • {currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </p>
                    </div>
                    <div className="flex items-center gap-6">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3 h-3 text-zinc-500" />
                            <input type="text" placeholder="Global search..." className="bg-zinc-900 border border-zinc-800 rounded-full px-8 py-1.5 text-[10px] outline-none focus:border-[#92E3A9] w-48" />
                        </div>
                        <div className="w-8 h-8 rounded-full bg-zinc-800 border border-zinc-700 flex items-center justify-center">
                            <Activity className="w-4 h-4 text-[#92E3A9]" />
                        </div>
                    </div>
                </header>

                <div className="p-10 max-w-6xl w-full">
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

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                        {/* Task Assignment Section */}
                        <div className="lg:col-span-1 bg-[#0A0A0A] border border-zinc-900 rounded-3xl p-8 h-fit">
                            <h3 className="text-lg font-bold mb-6 flex items-center gap-3">
                                <PlusCircle className="w-5 h-5 text-[#92E3A9]" />
                                Assign Media Task
                            </h3>
                            <form onSubmit={handleCreateTask} className="space-y-4">
                                <input 
                                    required
                                    placeholder="Task Title"
                                    value={newTask.title}
                                    onChange={(e) => setNewTask({...newTask, title: e.target.value})}
                                    className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3 text-sm outline-none focus:border-[#92E3A9] transition-all"
                                />
                                <textarea 
                                    required
                                    placeholder="Task Description"
                                    rows={4}
                                    value={newTask.description}
                                    onChange={(e) => setNewTask({...newTask, description: e.target.value})}
                                    className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3 text-sm outline-none focus:border-[#92E3A9] transition-all resize-none"
                                />
                                <button 
                                    disabled={isCreatingTask}
                                    className="w-full bg-[#92E3A9] text-zinc-900 h-12 rounded-xl font-bold text-sm hover:bg-white transition-all transition-colors flex items-center justify-center gap-2"
                                >
                                    {isCreatingTask ? <Loader2 className="w-4 h-4 animate-spin" /> : "Broadcast Task"}
                                </button>
                            </form>
                        </div>

                        {/* Recent Tasks List */}
                        <div className="lg:col-span-2">
                             <div className="flex items-center justify-between mb-6">
                                <h3 className="text-lg font-bold">Operational Tasks</h3>
                                <button onClick={fetchOverview} className="text-[10px] font-bold text-[#92E3A9] uppercase hover:underline">Refresh List</button>
                             </div>
                             
                             <div className="space-y-3">
                                {tasks.map((task) => (
                                    <div key={task.id} className="bg-zinc-900/40 border border-zinc-900 p-6 rounded-2xl flex items-center justify-between group hover:border-zinc-700 transition-all">
                                        <div>
                                            <h4 className="font-bold text-sm mb-1">{task.title}</h4>
                                            <p className="text-xs text-zinc-500 line-clamp-1">{task.description}</p>
                                        </div>
                                        <div className="flex items-center gap-4">
                                            <span className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase ${
                                                task.status === 'pending' ? 'bg-yellow-500/10 text-yellow-500' : 'bg-green-500/10 text-green-500'
                                            }`}>
                                                {task.status}
                                            </span>
                                            <ChevronRight className="w-4 h-4 text-zinc-700 group-hover:text-white transition-colors" />
                                        </div>
                                    </div>
                                ))}
                                {tasks.length === 0 && (
                                    <div className="h-40 border border-dashed border-zinc-800 rounded-2xl flex items-center justify-center text-zinc-600 text-xs italic">
                                        No active tasks broadcasted.
                                    </div>
                                )}
                             </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}

function SidebarNavItem({ icon, label, active = false, badge }: { icon: any, label: string, active?: boolean, badge?: number }) {
    return (
        <button className={`
            w-full flex items-center justify-between p-3 rounded-xl transition-all
            ${active ? 'bg-[#92E3A9] text-black font-bold' : 'text-zinc-500 hover:text-white hover:bg-zinc-800 font-semibold'}
        `}>
            <div className="flex items-center gap-3">
                {icon}
                <span className="text-xs">{label}</span>
            </div>
            {badge !== undefined && (
                <span className={`text-[9px] font-black px-1.5 py-0.5 rounded-md ${active ? 'bg-black/20' : 'bg-zinc-800 text-[#92E3A9]'}`}>
                    {badge}
                </span>
            )}
        </button>
    );
}

function StatCard({ icon, label, value, trend }: { icon: any, label: string, value: string | number, trend: string }) {
    return (
        <div className="bg-[#0A0A0A] border border-zinc-900 p-6 rounded-3xl hover:border-zinc-700 transition-all">
            <div className="flex items-center justify-between mb-4">
                <div className="p-2 bg-zinc-900 rounded-lg border border-zinc-800">
                    {icon}
                </div>
                <span className="text-[10px] font-bold text-[#92E3A9] uppercase">{trend}</span>
            </div>
            <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-1">{label}</p>
            <p className="text-3xl font-black text-white">{value}</p>
        </div>
    );
}
