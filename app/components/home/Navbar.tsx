import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 w-full border-b border-zinc-100 bg-white/95 backdrop-blur-sm">
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-6 sm:px-10">

        {/* Left Side: Brand */}
        <div className="flex items-center gap-3">
          <Link href="/" className="flex items-center gap-3">
            <span className="text-[15px] tracking-tight text-zinc-900">
              Student Forge
            </span>
            <div className="h-3 w-[1px] bg-zinc-200" />
            <span className="text-[13px] text-zinc-400">
              Academy
            </span>
          </Link>
        </div>

        {/* Right Side: Navigation & Button */}
        <div className="flex items-center gap-8">
          <div className="hidden items-center gap-6 md:flex">
            <Link
              href="/courses"
              className="text-[13px] text-zinc-500 transition-colors hover:text-black"
            >
              Courses
            </Link>
            <Link
              href="/docs"
              className="text-[13px] text-zinc-500 transition-colors hover:text-black"
            >
              Docs
            </Link>
            <Link
              href="/support"
              className="text-[13px] text-zinc-500 transition-colors hover:text-black"
            >
              Support
            </Link>
          </div>

          {/* Sharp Edged Black Solid Button - Regular Font */}
          <Link
            href="/get-started"
            className="inline-flex h-9 items-center justify-center bg-black px-5 text-[13px] text-white transition-opacity hover:opacity-90 active:scale-[0.98]"
          >
            Get started
          </Link>
        </div>
      </div>
    </nav>
  );
}