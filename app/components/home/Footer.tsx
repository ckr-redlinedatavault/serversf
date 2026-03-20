import Link from "next/link";

export default function Footer() {
  return (
    <footer className="w-full bg-black py-16">
      {/* 
        Full width container matching the design language of the 
        Navbar and Services section 
      */}
      <div className="mx-auto flex w-full max-w-7xl flex-col items-center justify-between gap-10 px-6 sm:flex-row lg:px-10">

        {/* Left Side: Branding & Status */}
        <div className="flex flex-col items-center gap-6 sm:flex-row sm:gap-10">
          <div className="flex items-center gap-3">
            <span className="text-[14px] font-medium text-white">
              Student Forge
            </span>
            <div className="h-4 w-[1px] bg-zinc-800" />
            <div className="flex items-center gap-2">
              <div className="h-1 w-1 bg-[#92E3A9]" />
              <span className="text-[12px] text-zinc-500">
                All systems functional
              </span>
            </div>
          </div>
        </div>

        {/* Right Side: Metadata & Credits */}
        <div className="flex flex-col items-center gap-6 sm:flex-row sm:gap-10">
          <div className="flex items-center gap-8">
             <span className="text-[12px] text-zinc-500">
              © 2026 Student Forge
            </span>
            <div className="border border-zinc-800 px-3 py-1 text-[11px] text-zinc-600">
              v2.0.4 - stable
            </div>
          </div>
        </div>

      </div>
    </footer>
  );
}