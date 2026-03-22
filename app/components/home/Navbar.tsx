import Link from "next/link";
import { CircleUser } from "lucide-react";

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 w-full border-b border-zinc-100 bg-white/95 backdrop-blur-sm">
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-6 sm:px-10">

        {/* Left Side: Brand */}
        <div className="flex items-center gap-3">
          <Link href="/" className="flex items-center gap-2 group">
            <img
              src="/sf-next-logo.png"
              alt="Student Forge Logo"
              className="h-8 w-8 object-contain transition-transform group-hover:scale-105 duration-300"
            />
            <span className="text-[17px] font-bold tracking-tight text-black shrink-0">
              Student Forge
            </span>
            <div className="hidden sm:block h-3 w-[1px] bg-zinc-200" />
            <span className="hidden sm:block text-[13px] text-zinc-400 font-medium">
              Academy
            </span>
          </Link>
        </div>

        {/* Right Side: Navigation & Button */}
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="hidden items-center gap-4 md:flex">
            <Link
              href="/courses"
              className="text-[13px] text-zinc-500 transition-colors hover:text-black font-medium"
            >
              Courses
            </Link>
            <Link
              href="/docs"
              className="text-[13px] text-zinc-500 transition-colors hover:text-black font-medium"
            >
              Docs
            </Link>
            <Link
              href="/support"
              className="text-[13px] text-zinc-500 transition-colors hover:text-black font-medium"
            >
              Support
            </Link>
          </div>

          {/* Intern login - Sharp Edge Bordered Button */}
          <Link
            href="/intern/signin"
            className="hidden md:inline-flex h-10 items-center justify-center border border-zinc-200 px-4 sm:px-6 text-[13px] text-zinc-600 transition-colors hover:bg-zinc-50 active:scale-[0.98] font-medium"
          >
            <CircleUser className="mr-2 h-5 w-5" />
            Intern login
          </Link>

          {/* New Get Started Button */}
          <Link
            href="/get-started"
            className="inline-flex h-10 items-center justify-center bg-black px-4 sm:px-8 text-[13px] text-white transition-opacity hover:opacity-90 active:scale-[0.98] font-bold"
          >
            Get Started
          </Link>

        </div>
      </div>
    </nav>
  );
}