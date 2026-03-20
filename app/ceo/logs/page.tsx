"use client";

import { useEffect, useState } from "react";
import { 
    Clock, 
    ShieldCheck, 
    ArrowUpRight, 
    Search, 
    Star,
    Loader2, 
    RefreshCw,
    AlertCircle,
    CheckCircle,
    Users,
    CreditCard,
    Zap,
    MessageSquare,
    UserPlus,
    Activity,
    Download
} from "lucide-react";

export default function AuditLogsPage() {
    const [logs, setLogs] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");

    const fetchLogs = async () => {
        try {
            const res = await fetch("/api/ceo/audit-logs");
            const data = await res.json();
            if (data.success) setLogs(data.logs);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchLogs();
    }, []);

    const filteredLogs = logs.filter(log => 
        log.message.toLowerCase().includes(searchTerm.toLowerCase()) ||
        log.type.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const downloadLogs = () => {
        const headers = ["TIMESTAMP", "TYPE", "MESSAGE", "ID"];
        const rows = logs.map(l => [
            new Date(l.time).toISOString(),
            l.type,
            l.message.replace(/,/g, ' '),
            l.id
        ]);
        const csv = [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
        const blob = new Blob([csv], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `audit_logs_${new Date().toISOString().split('T')[0]}.csv`;
        a.click();
    };

    return (
        <div className="p-6 space-y-6">
            {/* Page Header */}
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 bg-[#0A0A0A] p-6 rounded-3xl border border-zinc-900 shadow-xl">
                <div className="space-y-1">
                    <h1 className="text-xl font-bold text-white flex items-center gap-3">
                        <ShieldCheck className="w-5 h-5 text-[#92E3A9]" />
                        System Audit <span className="text-[#92E3A9]">Logs</span>
                    </h1>
                    <p className="text-zinc-500 text-[11px] font-medium tracking-tight">Real-time monitoring of all high-level operational events.</p>
                </div>

                <div className="flex items-center gap-3">
                    <div className="relative group">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-zinc-600 transition-colors group-focus-within:text-[#92E3A9]" />
                        <input 
                            type="text" 
                            placeholder="Filter events..." 
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="bg-zinc-950 border border-zinc-800 rounded-xl pl-10 pr-6 py-2.5 text-[11px] font-semibold outline-none focus:border-[#92E3A9]/40 transition-all w-56 placeholder:text-zinc-700 text-white" 
                        />
                    </div>
                    <button 
                        onClick={downloadLogs}
                        className="h-10 px-4 bg-zinc-900 hover:bg-[#92E3A9] hover:text-black rounded-xl flex items-center gap-2 text-[10px] font-black text-zinc-500 uppercase tracking-widest border border-zinc-800 transition-all group"
                    >
                        <Download className="w-3.5 h-3.5" />
                        <span>Export CSV</span>
                    </button>
                    <button onClick={fetchLogs} className="h-10 w-10 bg-zinc-900 rounded-xl flex items-center justify-center text-zinc-500 hover:text-white border border-zinc-800 transition-all">
                        <RefreshCw className="w-3.5 h-3.5" />
                    </button>
                </div>
            </div>

            {/* Logs List */}
            <div className="bg-[#0A0A0A] border border-zinc-900 rounded-3xl overflow-hidden shadow-xl">
                {loading ? (
                    <div className="h-96 flex flex-col items-center justify-center gap-4">
                        <Loader2 className="w-8 h-8 text-[#92E3A9] animate-spin" strokeWidth={1.5} />
                        <p className="text-[10px] font-black text-[#92E3A9] uppercase tracking-[0.3em]">Connecting to Log Server</p>
                    </div>
                ) : filteredLogs.length === 0 ? (
                    <div className="h-96 flex items-center justify-center">
                        <p className="text-xs text-zinc-700 font-bold uppercase tracking-widest tracking-widest">No activities recorded</p>
                    </div>
                ) : (
                    <div className="divide-y divide-zinc-900/30">
                        {filteredLogs.map((log) => (
                            <div key={`${log.id}-${log.time}`} className="px-8 py-5 group hover:bg-zinc-900/20 transition-all flex items-start gap-6 border-l-2 border-l-transparent hover:border-l-[#92E3A9]/40">
                                <div className="shrink-0 mt-1">
                                    <LogIcon type={log.type} status={log.status} />
                                </div>
                                <div className="flex-1 space-y-1">
                                    <div className="flex items-center gap-3">
                                        <span className={`text-[10px] font-black px-2 py-0.5 rounded tracking-tighter ${
                                            log.type === 'PAYMENT' ? 'bg-green-500/10 text-green-500' :
                                            log.type === 'INTERN_APP' ? 'bg-blue-500/10 text-blue-500' :
                                            log.type === 'OPERATION' ? 'bg-[#92E3A9]/10 text-[#92E3A9]' :
                                            'bg-zinc-800 text-zinc-400'
                                        }`}>
                                            {log.type}
                                        </span>
                                        <span className="text-[10px] font-bold text-zinc-700">
                                            {new Date(log.time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })} • {new Date(log.time).toLocaleDateString()}
                                        </span>
                                    </div>
                                    <p className="text-[13px] font-bold text-white tracking-tight group-hover:text-[#92E3A9] transition-colors">{log.message}</p>
                                    <div className="flex items-center gap-3 pt-1">
                                        <span className="text-[9px] font-black text-zinc-700 font-mono tracking-tighter">{log.id}</span>
                                        <span className="w-1 h-1 rounded-full bg-zinc-800" />
                                        <span className="text-[9px] font-bold text-zinc-600">ID SOURCE : {log.type === 'PAYMENT' ? 'CourseEnrollment' : log.type === 'INTERN_APP' ? 'InternForm' : 'Task'}</span>
                                    </div>
                                </div>
                                <div className="shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <div className="h-8 w-8 bg-zinc-900 border border-zinc-800 rounded-lg flex items-center justify-center text-zinc-600 hover:text-[#92E3A9] cursor-pointer">
                                        <ArrowUpRight className="w-3.5 h-3.5" />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            <p className="text-center text-[9px] font-black text-zinc-800 uppercase tracking-[0.4em] py-4">
                FORGE ANALYTICS PROTOCOL ACTIVE • ENCRYPTED PAYLOAD DELIVERY
            </p>
        </div>
    );
}

function LogIcon({ type, status }: { type: string, status: string }) {
    if (type === 'PAYMENT') return <div className="h-10 w-10 bg-green-500/10 rounded-xl flex items-center justify-center text-green-500"><CreditCard className="w-4 h-4" /></div>;
    if (type === 'INTERN_APP') return <div className="h-10 w-10 bg-blue-500/10 rounded-xl flex items-center justify-center text-blue-500"><UserPlus className="w-4 h-4" /></div>;
    if (type === 'OPERATION') return <div className="h-10 w-10 bg-[#92E3A9]/10 rounded-xl flex items-center justify-center text-[#92E3A9]"><Activity className="w-4 h-4" /></div>;
    if (type === 'FEEDBACK') return <div className="h-10 w-10 bg-yellow-500/10 rounded-xl flex items-center justify-center text-yellow-500"><Star className="w-4 h-4" /></div>;
    if (type === 'INBOUND') return <div className="h-10 w-10 bg-zinc-900 rounded-xl flex items-center justify-center text-zinc-500"><MessageSquare className="w-4 h-4" /></div>;
    return <div className="h-10 w-10 bg-zinc-900 rounded-xl flex items-center justify-center text-zinc-500"><Zap className="w-4 h-4" /></div>;
}
