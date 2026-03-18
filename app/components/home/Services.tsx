import { ArrowRight } from "lucide-react";
import Link from "next/link";

const SERVICES = [
  {
    id: "01",
    title: "Course Academy",
    desc: "Learn modern coding with our expert courses.",
    href: "/courses",
    buttonText: "View Courses"
  },
  {
    id: "02",
    title: "Mailer System",
    desc: "Send emails easily to student groups.",
    href: "/mailer",
    buttonText: "View Mailer"
  },
  {
    id: "03",
    title: "Event Center",
    desc: "Join and manage student events and workshops.",
    href: "/events",
    buttonText: "View Events"
  },
  {
    id: "04",
    title: "Media Portal",
    desc: "Manage your media files and team projects.",
    href: "/media/signin",
    buttonText: "View Media"
  }
];

export default function Services() {
  return (
    <section className="w-full bg-white border-y border-zinc-100">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        {/* Reduced height grid with thin borders */}
        <div className="grid w-full grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 lg:divide-x lg:divide-zinc-100">
          {SERVICES.map((item, idx) => (
            <div
              key={idx}
              className="flex flex-col bg-white transition-colors hover:bg-zinc-50/50"
            >
              {/* Reduced Padding Content Area */}
              <div className="flex flex-1 flex-col p-6 pt-8 lg:p-8 lg:pt-10">
                <h3 className="mb-2 text-[15px] tracking-tight text-zinc-900 font-bold">
                  {item.title}
                </h3>
                <p className="mb-6 text-[13px] leading-relaxed text-zinc-500">
                  {item.desc}
                </p>
              </div>

              {/* Slimmer Solid Black Sharp Button */}
              <Link
                href={item.href}
                className="group flex h-11 w-full items-center justify-between bg-black px-6 text-[12px] text-white transition-all hover:bg-zinc-900 uppercase tracking-widest font-bold"
              >
                <span>{item.buttonText}</span>
                <ArrowRight
                  className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1"
                  strokeWidth={2}
                />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}