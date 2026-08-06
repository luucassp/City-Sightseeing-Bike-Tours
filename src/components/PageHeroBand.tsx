import { ReactNode } from "react";
import Reveal from "@/components/Reveal";
import DiagonalMarqueeCarousel, {
  CardItem,
} from "@/components/ui/diagonal-marquee-carousel";

type PageHeroBandProps = {
  kicker: string;
  title: ReactNode;
  subtitle: string;
  photos: CardItem[];
};

export default function PageHeroBand({
  kicker,
  title,
  subtitle,
  photos,
}: PageHeroBandProps) {
  return (
    <section className="relative h-[420px] overflow-hidden bg-brand-dark text-center text-white sm:h-[480px]">
      <DiagonalMarqueeCarousel
        cards={photos}
        angle={-14}
        baseSpeed={50}
        className="absolute inset-0 h-full"
        fadeClassName="from-brand-dark dark:from-brand-dark"
      />
      <div className="absolute inset-0 bg-brand-dark/70" />

      <div className="absolute inset-0 z-10 flex items-center justify-center px-4">
        <Reveal>
          <p className="text-sm font-bold tracking-widest text-brand-gold uppercase">
            {kicker}
          </p>
          <h1 className="mt-3 text-4xl font-extrabold sm:text-5xl">{title}</h1>
          <p className="mt-4 text-lg text-white/80">{subtitle}</p>
        </Reveal>
      </div>
    </section>
  );
}
