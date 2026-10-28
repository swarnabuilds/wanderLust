import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const HERO_IMAGE =
  "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1920&q=80";

const searchFields = [
  { label: "Location", placeholder: "Address, City Or Zip" },
  { label: "Date/Duration", placeholder: "Anytime/ 3 Days" },
  { label: "Budget", placeholder: "$0 - $3000" },
  { label: "People", placeholder: "5 - 10" },
];

export function Banner() {
  return (
    <section className="relative flex min-h-[560px] h-[68vh] flex-col text-white">
      {/* Background image + dark overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${HERO_IMAGE})` }}
      />
      <div className="absolute inset-0 bg-black/40" />

      {/* Centered hero copy + CTAs */}
      <div className="relative z-10 flex flex-1 items-center justify-center px-4 text-center">
        <div>
          <h1 className="mx-auto max-w-3xl font-serif text-5xl leading-tight font-light md:text-7xl">
            Discover Your
            <br />
            Next Adventure
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-sm text-white/85 md:text-base">
            Explore breathtaking destinations and create unforgettable memories
            with our curated travel experiences.
          </p>
          <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
            <Button className="h-11 rounded-md bg-[#00a8cc] px-6 text-sm font-medium tracking-wide text-white uppercase hover:bg-[#0093b3]">
              Explore Now <ArrowRight className="size-4" />
            </Button>
            <Link
              href="#"
              className="inline-flex h-11 items-center rounded-md border border-white/30 bg-white/20 px-6 text-sm font-medium tracking-wide uppercase backdrop-blur-sm transition-colors hover:bg-white/30"
            >
              View Destination
            </Link>
          </div>
        </div>
      </div>

      {/* Search bar pinned to the bottom of the banner */}
      <div className="relative z-10 grid grid-cols-2 md:grid-cols-5">
        {searchFields.map((field) => (
          <div key={field.label} className="border-l border-white/10 bg-[#5b6470]/80 px-5 py-4 first:border-l-0">
            <p className="text-sm font-medium">{field.label}</p>
            <input
              type="text"
              placeholder={field.placeholder}
              className="mt-1 w-full border-0 bg-transparent p-0 text-sm text-white outline-none placeholder:text-white/60"
            />
          </div>
        ))}
        <Button className="rounded-none bg-[#00a8cc] text-base font-medium text-white hover:bg-[#0093b3]">
          Search
        </Button>
      </div>
    </section>
  );
}
