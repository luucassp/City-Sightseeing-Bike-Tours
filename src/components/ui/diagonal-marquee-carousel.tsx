"use client";

import Image from "next/image";
import { cn } from "@/lib/utils";

export interface CardItem {
  id: string | number;
  url: string;
  title: string;
}

export interface DiagonalMarqueeCarouselProps {
  cards: CardItem[];
  angle?: number;
  baseSpeed?: number;
  alternateDirections?: boolean;
  className?: string;
  cardClassName?: string;
  fadeClassName?: string;
}

const Card = ({ card, className }: { card: CardItem; className?: string }) => {
  return (
    <div
      className={cn(
        "group relative h-[180px] w-[260px] shrink-0 overflow-hidden rounded-xl shadow-2xl",
        className,
      )}
    >
      <Image src={card.url} alt={card.title} fill sizes="260px" className="object-cover" />
      <div className="absolute inset-0 bg-black/40" />
    </div>
  );
};

const MarqueeRow = ({
  cards,
  speed,
  direction,
  cardClassName,
}: {
  cards: CardItem[];
  speed: number;
  direction: 1 | -1;
  cardClassName?: string;
}) => {
  const animationClass =
    direction === -1 ? "animate-marquee-left" : "animate-marquee-right";

  return (
    <div className="flex w-full overflow-hidden">
      <div
        className={cn("flex shrink-0", animationClass)}
        style={{ "--speed": `${speed}s` } as React.CSSProperties}
      >
        <div className="flex shrink-0">
          {cards.map((card, idx) => (
            <div key={`${card.id}-${idx}`} className="shrink-0 pr-6">
              <Card card={card} className={cardClassName} />
            </div>
          ))}
        </div>
        <div className="flex shrink-0" aria-hidden="true">
          {cards.map((card, idx) => (
            <div key={`${card.id}-${idx}-copy`} className="shrink-0 pr-6">
              <Card card={card} className={cardClassName} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Adapted from the Great UI diagonal marquee carousel: rows animate via the
// `.animate-marquee-left/right` keyframes + `prefers-reduced-motion` guard
// defined in globals.css, rather than an injected <style> tag, so the rules
// aren't duplicated if this component renders more than once on a page.
export default function DiagonalMarqueeCarousel({
  cards,
  angle = -18,
  baseSpeed = 60,
  alternateDirections = true,
  className = "",
  cardClassName = "",
  fadeClassName = "",
}: DiagonalMarqueeCarouselProps) {
  const rowCards = [...cards, ...cards];
  const rowCardsReverse = [...rowCards].reverse();

  return (
    <div
      className={cn(
        "relative flex h-screen w-full items-center justify-center overflow-hidden",
        className,
      )}
    >
      <div
        className="absolute z-0 flex w-[200vw] flex-col gap-6"
        style={{ transform: `rotate(${angle}deg)` }}
      >
        <MarqueeRow cards={rowCards} speed={baseSpeed} direction={-1} cardClassName={cardClassName} />
        <MarqueeRow
          cards={rowCardsReverse}
          speed={Math.max(baseSpeed - 15, 20)}
          direction={alternateDirections ? 1 : -1}
          cardClassName={cardClassName}
        />
        <MarqueeRow cards={rowCards} speed={baseSpeed + 15} direction={-1} cardClassName={cardClassName} />
      </div>

      <div
        className={cn(
          "pointer-events-none absolute inset-x-0 top-0 z-10 h-1/4 bg-linear-to-b from-white to-transparent dark:from-neutral-950",
          fadeClassName,
        )}
      />
      <div
        className={cn(
          "pointer-events-none absolute inset-x-0 bottom-0 z-10 h-1/4 bg-linear-to-t from-white to-transparent dark:from-neutral-950",
          fadeClassName,
        )}
      />
    </div>
  );
}
