import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 w-full border-b border-zinc-100 bg-white/95 backdrop-blur-sm">
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-6 sm:px-10">

        {/* Left Side: Brand */}
        <div className="flex items-center gap-3">
          <Link href="/" className="flex items-center gap-2 sm:gap-3">
            <span className="text-[15px] font-bold tracking-tight text-zinc-900 shrink-0">
              Student Forge
            </span>
            <div className="hidden sm:block h-3 w-[1px] bg-zinc-200" />
            <span className="hidden sm:block text-[13px] text-zinc-400">
              Academy
            </span>
          </Link>
        </div>

        {/* Right Side: Navigation & Button */}
        <div className="flex items-center gap-4 sm:gap-8">
          <div className="hidden items-center gap-6 md:flex">
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

          {/* Sharp Edged Black Solid Button - Regular Font */}
          <Link
            href="/courses"
            className="inline-flex h-10 items-center justify-center bg-black px-4 sm:px-6 text-[11px] text-white transition-opacity hover:opacity-90 active:scale-[0.98] font-bold uppercase tracking-widest"
          >
            Join now
          </Link>
        </div>
      </div>
    </nav>
  );
}