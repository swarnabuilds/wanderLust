import { Headset, Map, ShieldCheck } from "lucide-react";

const features = [
  {
    icon: ShieldCheck,
    title: "Safe & Secure",
    description:
      "Your safety is our priority with comprehensive travel insurance and 24/7 support.",
  },
  {
    icon: Map,
    title: "Expert Guides",
    description:
      "Local experts who bring destinations to life with authentic cultural insights.",
  },
  {
    icon: Headset,
    title: "24/7 Support",
    description:
      "Round-the-clock customer service to assist you wherever your journey takes you.",
  },
];

export function WhyChoose() {
  return (
    <section className="bg-[#e9f6fb] py-16">
      <div className="mx-auto max-w-5xl px-4 text-center">
        <h2 className="font-serif text-4xl font-semibold text-gray-900 md:text-5xl">
          Why Choose Wanderlast
        </h2>
        <p className="mt-2 text-sm text-gray-500">
          Your trusted partner for exceptional travel experiences
        </p>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="rounded bg-white p-8 text-left shadow-sm"
            >
              <feature.icon className="size-8 text-[#00a8cc]" strokeWidth={2} />
              <h3 className="mt-5 text-xl text-gray-900">{feature.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-gray-500">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
