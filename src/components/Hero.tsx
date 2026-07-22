"use client";
import { useEffect, useRef } from "react";
import BookingButton from "@/components/BookingButton";

export default function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mq.matches) videoRef.current?.pause();
  }, []);

  return (
    <section className="relative flex min-h-155 items-center justify-center overflow-hidden text-center text-white">
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        poster="/hero.jpg"
        className="absolute inset-0 h-full w-full object-cover"
      >
        <source src="/videos/hero-loop.mp4" type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-black/55" />
      <div className="relative z-10 max-w-3xl px-4">
        <h1 className="text-4xl font-extrabold md:text-6xl">
          Tours de Bicicleta e E-bike pela Cidade
        </h1>
        <p className="mt-4 text-lg text-white/90">
          Explore as ruas históricas de Dublin num passeio guiado de
          bicicleta ou e-bike, com duas saídas diárias — às 10h e às 14h. Os
          nossos guias especializados conduzem-no por 8 pontos históricos da
          cidade.
        </p>
        <BookingButton className="mt-8" />
      </div>
    </section>
  );
}
