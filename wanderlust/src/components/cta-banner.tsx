import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const CTA_IMAGE =
  "https://images.unsplash.com/photo-1473116763249-2faaef81ccda?auto=format&fit=crop&w=1920&q=80";

export function CtaBanner() {
  return (
    <section className="relative flex items-center justify-center py-40 text-white">
      {/* Background image + dark overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${CTA_IMAGE})` }}
      />
      <div className="absolute inset-0 bg-[#04121a]/80" />

      <div className="relative z-10 text-center">
        <h2 className="font-serif text-4xl font-light md:text-5xl">
          Ready To Start Your Journey?
        </h2>
        <p className="mt-2 text-sm text-white/85 md:text-base">
          Join thousands of travelers who have discovered the world with us
        </p>
        <Button className="mt-8 h-12 rounded-md bg-white px-8 text-sm font-medium tracking-wide text-gray-900 uppercase hover:bg-white/90">
          Book Your Trip Today <ArrowRight className="size-4" />
        </Button>
      </div>
    </section>
  );
}
