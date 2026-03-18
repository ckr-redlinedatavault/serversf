"use client";

import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";

interface BreadcrumbItem {
    label: string;
    href?: string;
}

interface BreadcrumbsProps {
    items: BreadcrumbItem[];
}

export default function Breadcrumbs({ items }: BreadcrumbsProps) {
    return (
        <nav className="flex flex-wrap items-center gap-y-2 gap-x-2 text-[10px] font-bold uppercase tracking-[0.2em] mb-8">
            <Link
                href="/"
                className="text-zinc-500 hover:text-[#92E3A9] transition-colors flex items-center gap-1.5"
            >
                <Home className="w-3 h-3" />
                Home
            </Link>

            {items.map((item, index) => (
                <div key={index} className="flex items-center gap-x-2">
                    <ChevronRight className="w-3 h-3 text-zinc-700" />
                    {item.href ? (
                        <Link
                            href={item.href}
                            className="text-zinc-500 hover:text-[#92E3A9] transition-colors"
                        >
                            {item.label}
                        </Link>
                    ) : (
                        <span className="text-[#92E3A9]">
                            {item.label}
                        </span>
                    )}
                </div>
            ))}
        </nav>
    );
}
