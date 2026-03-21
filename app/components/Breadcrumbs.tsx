"use client";

import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";

interface BreadcrumbItem {
    label: string;
    href?: string;
}

interface BreadcrumbsProps {
    items: BreadcrumbItem[];
    white?: boolean;
}

export default function Breadcrumbs({ items, white }: BreadcrumbsProps) {
    const textColor = white ? "text-white/60 hover:text-white" : "text-zinc-500 hover:text-[#0055FF]";
    const currentTextColor = white ? "text-white" : "text-[#0055FF]";
    const iconColor = white ? "text-white/40" : "text-zinc-300";

    return (
        <nav className="flex flex-wrap items-center gap-y-2 gap-x-2 text-[13px] font-medium mb-8">
            <Link
                href="/"
                className={`${textColor} transition-colors flex items-center gap-1.5`}
            >
                <Home className="w-3 h-3" />
                Home
            </Link>

            {items.map((item, index) => (
                <div key={index} className="flex items-center gap-x-2">
                    <ChevronRight className={`w-3 h-3 ${iconColor}`} />
                    {item.href ? (
                        <Link
                            href={item.href}
                            className={`${textColor} transition-colors`}
                        >
                            {item.label}
                        </Link>
                    ) : (
                        <span className={currentTextColor}>
                            {item.label}
                        </span>
                    )}
                </div>
            ))}
        </nav>
    );
}
