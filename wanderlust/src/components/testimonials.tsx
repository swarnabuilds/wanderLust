"use client";

import { ArrowLeft, ArrowRight } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  useCarousel,
} from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";

const testimonials = [
  {
    name: "Michael Chen",
    location: "Singapore",
    quote:
      "The Bali Trip Was Absolutely Magical! Every Detail Was Perfectly Planned. The Resorts Were Luxurious And The Cultural Experiences Were Unforgettable.",
    image:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=480&q=80",
  },
  {
    name: "Sarah Johnson",
    location: "New York, USA",
    quote:
      "Swiss Alps Adventure Exceeded All Expectations. The Mountain Views Were Breathtaking And Our Guide Was Incredibly Knowledgeable. Highly Recommended!",
    image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=480&q=80",
  },
  {
    name: "Priya Sharma",
    location: "Mumbai, India",
    quote:
      "The Maldives Honeymoon Was A Dream Come True. Overwater Villas, Private Dinners And Flawless Transfers — Wanderlast Handled Everything Beautifully.",
    image:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=480&q=80",
  },
  {
    name: "David Miller",
    location: "London, UK",
    quote:
      "Our Japan Tour Was Flawless From Start To Finish. Cherry Blossoms, Ryokan Stays And A Bullet Train Pass — Every Day Felt Effortless And Special.",
    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=480&q=80",
  },
];

function CarouselControls() {
  const { scrollPrev, scrollNext, canScrollPrev, canScrollNext } = useCarousel();

  return (
    <div className="flex gap-3">
      <Button
        variant="outline"
        size="icon-lg"
        className="rounded-full"
        disabled={!canScrollPrev}
        onClick={scrollPrev}
        aria-label="Previous testimonials"
      >
        <ArrowLeft className="size-4" />
      </Button>
      <Button
        variant="outline"
        size="icon-lg"
        className="rounded-full"
        disabled={!canScrollNext}
        onClick={scrollNext}
        aria-label="Next testimonials"
      >
        <ArrowRight className="size-4" />
      </Button>
    </div>
  );
}

export function Testimonials() {
  return (
    <section className="bg-white py-16">
      <div className="mx-auto max-w-5xl px-4">
        <Carousel opts={{ align: "start", loop: true }}>
          <div className="flex items-start justify-between gap-4">
            <div>
              <h2 className="font-serif text-4xl font-semibold text-gray-900 md:text-5xl">
                What Travelers Say
              </h2>
              <p className="mt-2 text-sm text-gray-500">
                Real experiences from our happy travelers
              </p>
            </div>
            <CarouselControls />
          </div>

          <CarouselContent className="mt-10">
            {testimonials.map((testimonial) => (
              <CarouselItem key={testimonial.name} className="basis-full md:basis-1/2">
                <div className="flex h-56 overflow-hidden rounded-md border border-gray-200 bg-white shadow-sm">
                  <div className="flex flex-1 flex-col justify-between p-5">
                    <p className="text-sm font-semibold leading-relaxed text-gray-900">
                      &ldquo;{testimonial.quote}&rdquo;
                    </p>
                    <div>
                      <p className="text-sm font-medium text-[#00a8cc]">
                        &mdash; {testimonial.name}
                      </p>
                      <p className="mt-0.5 text-xs text-gray-400">
                        {testimonial.location}
                      </p>
                    </div>
                  </div>
                  <div
                    role="img"
                    aria-label={`Portrait of ${testimonial.name}`}
                    className="w-2/5 bg-cover bg-center"
                    style={{ backgroundImage: `url(${testimonial.image})` }}
                  />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
    </section>
  );
}
