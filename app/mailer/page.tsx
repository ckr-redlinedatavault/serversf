"use client";

import { useState } from "react";
import Link from "next/link";
import {
    Lock,
    UserPlus,
    Send,
    ChevronRight,
    CheckCircle,
    AlertCircle,
    HelpCircle,
    Loader2,
    Calendar,
    ArrowRight
} from "lucide-react";

export default function MailerPage() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [loginForm, setLoginForm] = useState({ email: "", password: "" });
    const [loginError, setLoginError] = useState(false);

    const handleProtectedLogin = (e: React.FormEvent) => {
        e.preventDefault();
        // Hardcoded Credentials
        if (loginForm.email === "admin@studentforge.com" && loginForm.password === "Forge2026!") {
            setIsLoggedIn(true);
            setLoginError(false);
        } else {
            setLoginError(true);
        }
    };

    const [step, setStep] = useState(1);
    const [senderConfig, setSenderConfig] = useState({
        user: "",
        pass: "",
        host: "smtp.gmail.com",
        port: "465",
        secure: true,
    });

    const [templates, setTemplates] = useState([
        {
            id: 'welcome',
            name: 'Welcome Message',
            subject: 'Welcome to Student Forge, {name}!',
            eventType: 'COMMUNITY',
            description: "You've successfully joined the ecosystem built for student builders. We're excited to see what you'll ship next.",
            link: 'https://student-forge.com/dashboard',
            image: 'https://images.unsplash.com/photo-1517245386807-6466f272dd9e?q=80&w=800&auto=format&fit=crop',
            html: (data: any) => `
                <div style="font-family: sans-serif; padding: 40px; background: #f9fafb; color: #111827;">
                    <img src="${data.image}" style="width: 100%; height: 200px; object-fit: cover; border-radius: 8px; margin-bottom: 24px;" />
                    <span style="font-weight: bold; color: #4f46e5; font-size: 12px; letter-spacing: 1px; text-transform: uppercase;">${data.eventType}</span>
                    <h1 style="margin: 8px 0 24px 0; color: #111827;">Welcome to the Forge, {name}!</h1>
                    <p style="font-size: 16px; line-height: 1.6; color: #4b5563;">${data.description}</p>
                    <a href="${data.link}" style="display: inline-block; margin-top: 24px; padding: 12px 24px; background: #4f46e5; color: #ffffff; text-decoration: none; font-weight: bold; border-radius: 6px;">Get Started</a>
                    <div style="margin-top: 32px; padding-top: 24px; border-top: 1px solid #e5e7eb; font-size: 14px; color: #9ca3af;">
                        © 2026 Student Forge | Built for Builders
                    </div>
                </div>`
        },
        {
            id: 'hackathon',
            name: 'Hackathon Sprint',
            subject: 'Forge Sprint 2026: Invitation for {name}',
            eventType: '48 HOUR SPRINT',
            description: 'Our next hackathon begins this Friday. Assemble your team and prepare to forge something legendary.',
            link: 'https://student-forge.com/register',
            image: 'https://images.unsplash.com/photo-1504384308090-c894fd901191?q=80&w=800&auto=format&fit=crop',
            html: (data: any) => `
                <div style="font-family: sans-serif; padding: 0; background: #050505; color: #ffffff;">
                    <img src="${data.image}" style="width: 100%; height: 250px; object-fit: cover;" />
                    <div style="padding: 40px;">
                        <div style="background: #4f46e5; color: white; padding: 10px 20px; border-radius: 4px; display: inline-block; font-weight: bold; font-size: 14px; letter-spacing: 2px;">
                            ${data.eventType}
                        </div>
                        <h2 style="margin-top: 32px; font-size: 28px; color: #ffffff;">Gear up, {name}.</h2>
                        <p style="font-size: 16px; color: #a1a1aa; line-height: 1.8;">${data.description}</p>
                        <a href="${data.link}" style="display: inline-block; margin-top: 32px; padding: 16px 32px; background: #ffffff; color: #000000; text-decoration: none; font-weight: bold; border-radius: 4px; text-transform: uppercase; letter-spacing: 1px;">Join Sprint</a>
                    </div>
                </div>`
        }
    ]);

    const [selectedId, setSelectedId] = useState(templates[0].id);
    const selectedTemplate = templates.find(t => t.id === selectedId) || templates[0];

    const updateTemplateField = (field: string, value: string) => {
        setTemplates(prev => prev.map(t => t.id === selectedId ? { ...t, [field]: value } : t));
    };
    const [status, setStatus] = useState<"idle" | "verifying" | "ready" | "error">("idle");
    const [recipientsText, setRecipientsText] = useState("");
    const [students, setStudents] = useState<any[]>([]);
    const [isSending, setIsSending] = useState(false);
    const [results, setResults] = useState<any>(null);

    const verifyAccount = async () => {
        setStatus("verifying");
        try {
            const res = await fetch("/api/mailer/verify", {
                method: "POST",
                body: JSON.stringify(senderConfig),
            });
            const data = await res.json();
            if (data.success) {
                setStatus("ready");
                setStep(2);
            } else {
                setStatus("error");
                alert("Verification failed. Please check your email and app password.");
            }
        } catch (err) {
            setStatus("error");
        }
    };

    const importStudents = () => {
        try {
            let list = [];
            if (recipientsText.startsWith("[")) {
                list = JSON.parse(recipientsText);
            } else {
                list = recipientsText.split("\n").filter(l => l.includes("@")).map(line => {
                    const parts = line.split(/[ ,]+/);
                    return { name: parts[0] || "Student", email: parts[parts.length - 1] };
                });
            }

            if (list.length > 0) {
                setStudents(list);
                setStep(3); // Go to template selection
            } else {
                alert("No valid email addresses found.");
            }
        } catch (e) {
            alert("Please ensure the format is correct (Name, Email).");
        }
    };

    const startCampaign = async () => {
        setIsSending(true);
        try {
            // Pre-process the HTML: execute the template function if it exists
            // This injects the custom description, link, etc. while keeping {name} for the backend
            const processedHtml = typeof selectedTemplate.html === 'function'
                ? selectedTemplate.html(selectedTemplate)
                : selectedTemplate.html;

            const res = await fetch("/api/mailer/send", {
                method: "POST",
                body: JSON.stringify({
                    config: senderConfig,
                    students,
                    template: {
                        subject: selectedTemplate.subject,
                        html: processedHtml
                    }
                }),
            });
            const data = await res.json();
            setResults(data.results);
        } catch (err) {
            alert("Failed to send emails.");
        } finally {
            setIsSending(false);
        }
    };

    const navbar = (
        <nav className="w-full bg-[#92E3A9] px-12 py-3 sm:px-24 flex items-center justify-between z-50 shadow-lg">
            <div className="flex items-center gap-4">
                <Link href="/" className="flex items-center gap-4">
                    <span className="text-sm font-bold tracking-tighter text-zinc-900 uppercase">Student Forge</span>
                    <div className="h-4 w-[1px] bg-zinc-900/20" />
                    <span className="text-[10px] font-bold tracking-[0.2em] text-zinc-900/70 uppercase">MAILER</span>
                </Link>
            </div>
            <div className="flex gap-8">
                <Link href="/docs" className="text-xs font-semibold text-zinc-900/80 hover:text-zinc-900 transition-colors">Documentation</Link>
                <Link href="/support" className="text-xs font-semibold text-zinc-900/80 hover:text-zinc-900 transition-colors">Support</Link>
            </div>
        </nav>
    );

    const footer = (
        <footer className="px-12 sm:px-24 py-5 bg-[#f8f8f8] text-zinc-900 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-zinc-200 mt-auto">
            <div className="flex items-center gap-8">
                <div className="flex items-center gap-2.5">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.4)]" />
                    <span className="text-xs font-semibold text-zinc-600">Mailer Node Active</span>
                </div>
                <div className="h-4 w-[1px] bg-zinc-300 hidden sm:block" />
                <span className="text-xs font-medium text-zinc-500">Controlled by Technical Team</span>
            </div>

            <div className="flex items-center gap-4">
                <span className="text-xs font-medium text-zinc-400">© 2026 Student Forge</span>
                <span className="px-2 py-0.5 bg-zinc-200 text-zinc-600 rounded text-[10px] font-bold leading-none">v2.1.0 stable</span>
            </div>
        </footer>
    );

    if (!isLoggedIn) {
        return (
            <div className="h-screen w-full flex flex-col bg-[#050505] font-sans overflow-hidden">
                {navbar}
                <div className="flex-1 flex flex-col items-center justify-center text-white pb-20 px-8">
                    <div className="w-full max-w-[420px]">
                        <div className="bg-[#92E3A9] rounded-[2.5rem] p-10 sm:p-12 shadow-[0_20px_50px_rgba(146,227,169,0.2)] border border-[#92E3A9]/20">
                            <div className="mb-10 text-left">
                                <h1 className="text-3xl font-bold mb-3 text-zinc-900 tracking-tight">System Access</h1>
                                <p className="text-zinc-800/60 text-sm font-medium leading-relaxed">Protected node: mailer engine</p>
                            </div>

                            <form onSubmit={handleProtectedLogin} className="space-y-6">
                                <div className="space-y-2.5">
                                    <label className="text-[11px] font-bold text-zinc-800 uppercase tracking-widest ml-1">System ID</label>
                                    <input
                                        required
                                        type="email"
                                        value={loginForm.email}
                                        onChange={(e) => setLoginForm({ ...loginForm, email: e.target.value })}
                                        className="w-full bg-white text-zinc-900 rounded-xl px-5 py-4 text-sm font-semibold outline-none transition-all placeholder:text-zinc-400 focus:ring-4 focus:ring-black/5"
                                        placeholder="admin@studentforge.com"
                                    />
                                </div>
                                <div className="space-y-2.5">
                                    <label className="text-[11px] font-bold text-zinc-800 uppercase tracking-widest ml-1">Encryption Key</label>
                                    <input
                                        required
                                        type="password"
                                        value={loginForm.password}
                                        onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
                                        className="w-full bg-white text-zinc-900 rounded-xl px-5 py-4 text-sm font-semibold outline-none transition-all placeholder:text-zinc-400 focus:ring-4 focus:ring-black/5"
                                        placeholder="••••••••"
                                    />
                                </div>
                                {loginError && <p className="text-red-900 bg-red-100/30 px-3 py-1 rounded text-[10px] font-black italic uppercase tracking-tighter">access denied: invalid credentials</p>}
                                <button
                                    type="submit"
                                    className="w-full bg-black text-white h-14 rounded-xl font-bold text-sm hover:bg-zinc-900 transition-all mt-6 shadow-xl active:scale-[0.98]"
                                >
                                    Execute Handshake
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
                {footer}
            </div>
        );
    }

    return (
        <div className="h-screen w-full flex flex-col bg-[#050505] text-white overflow-hidden font-sans">
            {navbar}

            <main className="flex-1 flex flex-col max-w-[1400px] mx-auto w-full p-8 overflow-hidden">
                <div className="flex-1 flex gap-12 overflow-hidden mt-8">
                    {/* Left: Progress Sidebar */}
                    <div className="w-64 hidden md:flex flex-col gap-8 pt-4">
                        {[
                            { id: 1, label: "Sender Setup", icon: Lock },
                            { id: 2, label: "Add Recipients", icon: UserPlus },
                            { id: 3, label: "Pick Template", icon: Calendar },
                            { id: 4, label: "Review & Send", icon: Send }
                        ].map((s) => (
                            <div key={s.id} className={`flex items-center gap-4 transition-all ${step === s.id ? "opacity-100" : "opacity-30"}`}>
                                <div className={`h-10 w-10 rounded-full flex items-center justify-center border-2 ${step === s.id ? "border-[#92E3A9] bg-[#92E3A9]/10" : "border-zinc-800"}`}>
                                    <s.icon className={`w-4 h-4 ${step === s.id ? "text-[#92E3A9]" : "text-zinc-500"}`} />
                                </div>
                                <span className="text-sm font-semibold">{s.label}</span>
                            </div>
                        ))}
                    </div>

                    {/* Right: Content Cards */}
                    <div className="flex-1 overflow-y-auto pr-4 pb-20">
                        {step === 1 && (
                            <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
                                <h2 className="text-2xl font-bold mb-2">Connect Your Account</h2>
                                <p className="text-zinc-400 text-sm mb-8 font-medium">Link your Gmail to start sending professional updates.</p>

                                <div className="space-y-6">
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-zinc-500 uppercase tracking-wider">Email Address</label>
                                        <input
                                            type="email"
                                            placeholder="e.g. hello@gmail.com"
                                            value={senderConfig.user}
                                            onChange={(e) => setSenderConfig({ ...senderConfig, user: e.target.value })}
                                            className="w-full bg-black/40 border border-zinc-800 rounded-xl px-4 py-3 text-sm focus:ring-1 focus:ring-[#92E3A9] outline-none transition-all"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <div className="flex justify-between">
                                            <label className="text-xs font-bold text-zinc-500 uppercase tracking-wider">App Password</label>
                                            <Link href="/help" className="text-[10px] text-[#92E3A9] font-bold hover:underline">How to get this?</Link>
                                        </div>
                                        <input
                                            type="password"
                                            placeholder="•••• •••• •••• ••••"
                                            value={senderConfig.pass}
                                            onChange={(e) => setSenderConfig({ ...senderConfig, pass: e.target.value })}
                                            className="w-full bg-black/40 border border-zinc-800 rounded-xl px-4 py-3 text-sm focus:ring-1 focus:ring-[#92E3A9] outline-none transition-all"
                                        />
                                    </div>

                                    <button
                                        onClick={verifyAccount}
                                        disabled={status === "verifying"}
                                        className="w-full bg-[#92E3A9] text-black h-12 rounded-xl font-bold text-sm hover:bg-white transition-all flex items-center justify-center gap-2 shadow-lg"
                                    >
                                        {status === "verifying" ? <Loader2 className="w-4 h-4 animate-spin" /> : "Verify & Continue"}
                                    </button>
                                </div>
                            </div>
                        )}

                        {step === 2 && (
                            <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
                                <h2 className="text-2xl font-bold mb-2">Add Your Students</h2>
                                <p className="text-zinc-400 text-sm mb-8 font-medium">Paste a list of names and emails to build your mailing list.</p>

                                <textarea
                                    placeholder="Rahul, rahul@gmail.com&#10;Ananya, ananya@gmail.com"
                                    value={recipientsText}
                                    onChange={(e) => setRecipientsText(e.target.value)}
                                    className="w-full h-48 bg-black/40 border border-zinc-800 rounded-xl p-4 text-sm font-medium focus:ring-1 focus:ring-[#92E3A9] outline-none resize-none mb-6"
                                />

                                <div className="flex gap-4">
                                    <button
                                        onClick={() => setStep(1)}
                                        className="px-6 h-12 rounded-xl border border-zinc-800 font-bold text-sm text-zinc-400 hover:text-white transition-all"
                                    >
                                        Back
                                    </button>
                                    <button
                                        onClick={importStudents}
                                        className="flex-1 bg-[#92E3A9] text-black h-12 rounded-xl font-bold text-sm hover:bg-white transition-all"
                                    >
                                        Confirm List
                                    </button>
                                </div>
                            </div>
                        )}

                        {step === 3 && (
                            <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
                                <h2 className="text-2xl font-bold mb-2">Configure Template</h2>
                                <p className="text-zinc-400 text-sm mb-8 font-medium">Select and customize your campaign's visual content.</p>

                                <div className="grid grid-cols-1 xl:grid-cols-2 gap-12 items-start">
                                    <div className="space-y-8">
                                        <div className="flex gap-4">
                                            {templates.map((t) => (
                                                <button
                                                    key={t.id}
                                                    onClick={() => setSelectedId(t.id)}
                                                    className={`flex-1 text-center p-4 rounded-xl border-2 transition-all ${selectedId === t.id ? "border-[#92E3A9] bg-[#92E3A9]/5" : "border-zinc-800 hover:border-zinc-700 bg-black/20"}`}
                                                >
                                                    <h3 className="font-bold text-[10px] uppercase tracking-widest text-zinc-100">{t.name}</h3>
                                                </button>
                                            ))}
                                        </div>

                                        <div className="space-y-4 pt-4 border-t border-zinc-800">
                                            <div className="space-y-2">
                                                <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider">Email Subject</label>
                                                <input
                                                    type="text"
                                                    value={selectedTemplate.subject}
                                                    onChange={(e) => updateTemplateField('subject', e.target.value)}
                                                    className="w-full bg-black/40 border border-zinc-800 rounded-xl px-4 py-2 text-xs font-bold text-[#92E3A9] focus:ring-1 focus:ring-[#92E3A9] outline-none"
                                                />
                                            </div>
                                            <div className="grid grid-cols-2 gap-4">
                                                <div className="space-y-2">
                                                    <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider">Event Type</label>
                                                    <input
                                                        type="text"
                                                        value={selectedTemplate.eventType}
                                                        onChange={(e) => updateTemplateField('eventType', e.target.value)}
                                                        className="w-full bg-black/40 border border-zinc-800 rounded-xl px-4 py-2 text-xs focus:ring-1 focus:ring-[#92E3A9] outline-none"
                                                    />
                                                </div>
                                                <div className="space-y-2">
                                                    <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider">Image URL</label>
                                                    <input
                                                        type="text"
                                                        value={selectedTemplate.image}
                                                        onChange={(e) => updateTemplateField('image', e.target.value)}
                                                        className="w-full bg-black/40 border border-zinc-800 rounded-xl px-4 py-2 text-xs focus:ring-1 focus:ring-[#92E3A9] outline-none"
                                                    />
                                                </div>
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider">Message Description</label>
                                                <textarea
                                                    value={selectedTemplate.description}
                                                    onChange={(e) => updateTemplateField('description', e.target.value)}
                                                    className="w-full h-24 bg-black/40 border border-zinc-800 rounded-xl px-4 py-3 text-xs focus:ring-1 focus:ring-[#92E3A9] outline-none resize-none"
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider">Action Link</label>
                                                <input
                                                    type="text"
                                                    value={selectedTemplate.link}
                                                    onChange={(e) => updateTemplateField('link', e.target.value)}
                                                    className="w-full bg-black/40 border border-zinc-800 rounded-xl px-4 py-2 text-xs focus:ring-1 focus:ring-[#92E3A9] outline-none"
                                                />
                                            </div>
                                        </div>

                                        <div className="pt-6 flex gap-4">
                                            <button
                                                onClick={() => setStep(2)}
                                                className="px-6 h-12 rounded-xl border border-zinc-800 font-bold text-sm text-zinc-400 hover:text-white transition-all underline decoration-zinc-800"
                                            >
                                                Back
                                            </button>
                                            <button
                                                onClick={() => setStep(4)}
                                                className="flex-1 bg-[#92E3A9] text-black h-12 rounded-xl font-bold text-sm hover:bg-white transition-all font-bold"
                                            >
                                                Review Details
                                            </button>
                                        </div>
                                    </div>

                                    <div className="border border-zinc-800 rounded-xl overflow-hidden bg-white shadow-2xl sticky top-8">
                                        <div className="bg-zinc-100 px-4 py-2 border-b border-zinc-200 flex items-center justify-between">
                                            <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">Forge Preview</span>
                                        </div>
                                        <div className="p-4 bg-zinc-50 border-b border-zinc-200">
                                            <p className="text-[10px] text-zinc-400 font-medium italic">Subject: <span className="text-zinc-800 not-italic font-bold">{selectedTemplate.subject.replace('{name}', 'Student')}</span></p>
                                        </div>
                                        <div className="h-[350px] overflow-y-auto w-full bg-[#f3f4f6]">
                                            <div className="scale-[0.8] origin-top">
                                                <div dangerouslySetInnerHTML={{ __html: typeof selectedTemplate.html === 'function' ? selectedTemplate.html(selectedTemplate).replace('{name}', 'Student') : String(selectedTemplate.html).replace('{name}', 'Student') }} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {step === 4 && (
                            <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
                                <h2 className="text-2xl font-bold mb-2">Final Review</h2>
                                <p className="text-zinc-400 text-sm mb-8 font-medium">Verify your transmission details before sending.</p>

                                <div className="space-y-4 mb-10">
                                    <div className="flex items-center justify-between p-4 bg-black/20 rounded-xl border border-white/5">
                                        <span className="text-sm text-zinc-500 font-medium">Verified Account</span>
                                        <span className="text-sm font-bold text-[#92E3A9]">{senderConfig.user}</span>
                                    </div>
                                    <div className="flex items-center justify-between p-4 bg-black/20 rounded-xl border border-white/5">
                                        <span className="text-sm text-zinc-500 font-medium">Audience Count</span>
                                        <span className="text-sm font-bold text-white">{students.length} Students Ready</span>
                                    </div>
                                    <div className="flex items-center justify-between p-4 bg-black/20 rounded-xl border border-white/5">
                                        <span className="text-sm text-zinc-500 font-medium">Active Theme</span>
                                        <span className="text-sm font-bold text-white uppercase tracking-widest">{selectedTemplate.name}</span>
                                    </div>
                                </div>

                                {results ? (
                                    <div className="text-center py-6 border-2 border-dashed border-zinc-800 rounded-2xl">
                                        <div className="h-12 w-12 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                                            <CheckCircle className="text-green-500 w-6 h-6" />
                                        </div>
                                        <h4 className="text-white font-bold mb-1">Transmission Shipped</h4>
                                        <p className="text-zinc-500 text-xs mb-6">{results.success} delivered, {results.failed} failed</p>
                                        <button onClick={() => { setStep(1); setResults(null); }} className="text-xs font-bold text-[#92E3A9] hover:underline">Launch New Campaign</button>
                                    </div>
                                ) : (
                                    <div className="flex gap-4">
                                        <button
                                            onClick={() => setStep(3)}
                                            className="px-6 h-14 rounded-xl border border-zinc-800 font-bold text-sm text-zinc-400 hover:text-white transition-all underline decoration-zinc-800"
                                        >
                                            Edit Content
                                        </button>
                                        <button
                                            onClick={startCampaign}
                                            disabled={isSending}
                                            className="flex-1 bg-[#92E3A9] text-black h-14 rounded-xl font-bold text-base hover:bg-white transition-all flex items-center justify-center gap-3 shadow-lg disabled:opacity-50"
                                        >
                                            {isSending ? <Loader2 className="w-5 h-5 animate-spin" /> : <>Finalize & Send <ArrowRight className="w-4 h-4" /></>}
                                        </button>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </main>

            {footer}
        </div>
    );
}
