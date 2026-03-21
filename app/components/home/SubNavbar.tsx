import Link from "next/link";

export default function SubNavbar() {
  const items = [
    { name: "Resources", href: "/resources" },
    { name: "Ambassador", href: "/ambassador" },
    { name: "Community", href: "/community" },
    { name: "Internships", href: "/intern-form" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <div className="w-full bg-black py-2.5">
      <div className="mx-auto flex max-w-7xl items-center gap-6 px-6 sm:px-10 overflow-x-auto scrollbar-hide">
        {items.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            className="whitespace-nowrap text-[13px] font-normal tracking-tight text-white transition-all hover:text-[#0055FF]"
          >
            {item.name}
          </Link>
        ))}
      </div>
    </div>
  );
}
