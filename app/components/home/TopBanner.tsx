import Link from "next/link";

export default function TopBanner() {
  const guidanceItems = [
    { name: "Abroad Guidance", href: "/docs" },
    { name: "Startup Guidance", href: "/docs" },
    { name: "Business Guidance", href: "/docs" },
  ];

  return (
    <div className="w-full bg-black py-2 px-6 sm:px-10 overflow-hidden hidden sm:block">
      <div className="mx-auto max-w-7xl flex items-center justify-between">
        {/* Left Side: Guidance Items */}
        <div className="flex items-center gap-6">
          {guidanceItems.map((item, idx) => (
            <div key={item.name} className="flex items-center gap-4">
              <Link
                href={item.href}
                className="text-[12px] font-medium text-white/80 transition-colors hover:text-white tracking-tight"
              >
                {item.name}
              </Link>
              {idx < guidanceItems.length - 1 && (
                <div className="h-2.5 w-[1px] bg-white/20" />
              )}
            </div>
          ))}
        </div>

        {/* Right Side: Empty as requested */}
        <div />
      </div>
    </div>
  );
}