"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import BookingButton from "@/components/BookingButton";

export default function Hero() {
  const [showVideo, setShowVideo] = useState(true);

  useEffect(() => {
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

    const update = () => setShowVideo(!motionQuery.matches);
    update();

    motionQuery.addEventListener("change", update);
    return () => motionQuery.removeEventListener("change", update);
  }, []);

  return (
    <section className="relative flex min-h-dvh items-center justify-center overflow-hidden text-center text-white">
      <Image
        src="/hero.jpg"
        alt=""
        fill
        priority
        sizes="100vw"
        className="animate-hero-zoom object-cover motion-reduce:animate-none"
      />
      {showVideo && (
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          poster="/hero.jpg"
          className="absolute top-1/2 left-1/2 h-auto min-h-full w-auto min-w-full -translate-x-1/2 -translate-y-1/2"
        >
          <source
            media="(max-width: 767px)"
            src="/videos/hero-loop-mobile.mp4"
            type="video/mp4"
          />
          <source src="/videos/hero-loop.mp4" type="video/mp4" />
        </video>
      )}
      <div className="absolute inset-0 bg-black/55" />
      <div className="relative z-10 max-w-3xl px-4">
        <h1 className="text-4xl font-extrabold md:text-6xl">
          Bicycle and E-bike Tours Around the City
        </h1>
        <p className="mt-4 text-lg text-white/90">
          Explore Dublin&apos;s historic streets on a guided bicycle or
          e-bike tour, with two daily departures — at 10am and 2pm. Our
          expert local guides take you through 8 historic sites in the city.
        </p>
        <BookingButton className="mt-8" />
      </div>
    </section>
  );
}
