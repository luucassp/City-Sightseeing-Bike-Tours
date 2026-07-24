import Image from "next/image";
import Reveal from "@/components/Reveal";
import ScrollLine from "@/components/ScrollLine";

const included = [
  { icon: "/icons/helmet-safety.png", label: "Safety equipment" },
  { icon: "/icons/tour-flag.png", label: "Local guide" },
  { icon: "/icons/earphones.png", label: "Earphones for live commentary between stops" },
];

const notSuitableFor = [
  "Pregnant women",
  "Children under 14 years",
  "Wheelchair users",
];

const thingsToBring = [
  "Camera",
  "Sunglasses",
  "Raincoat — just in case it rains!",
  "Spending money / credit card for entrance fees & to tip your guide",
];

const bikeOptions = [
  { src: "/bikes/bicicleta-tradicional.png", label: "Traditional Bicycle" },
  { src: "/bikes/e-bike.png", label: "E-bike" },
];

const testimonials = [
  {
    title: "A Great Find",
    text: "Excellent guide, and plenty to see by bike that you'd miss walking — Dublin is flat enough that even the push bike felt easy.",
    author: "Steve Robson",
  },
  {
    title: "Fabulous service",
    text: "A smooth, well-led ride through the city on electric bikes, with clear directions the whole way.",
    author: "Emma PH",
  },
  {
    title: "Another successful experience",
    text: "A phenomenal guide and an easy ride on the e-bikes, taking in some wonderful sights across the city.",
    author: "Rich Jacob",
  },
  {
    title: "Speechless",
    text: "A brilliant way to see the city and discover hidden gems alongside the major landmarks.",
    author: "Paul Waskett",
  },
];

// Repeats the same weave-left/weave-right curve used across the site's
// ScrollLine accents so the effect can run the full height of the page
// instead of being confined to a single section.
function buildRoutePath(
  totalHeight: number,
  segmentHeight = 140,
  amplitude = 30,
  centerX = amplitude
) {
  let d = `M${centerX} 0`;
  let y = 0;
  while (y < totalHeight) {
    const h = Math.min(segmentHeight, totalHeight - y);
    const c1y = y + h * (5 / 14);
    const c2y = y + h * (9 / 14);
    const endY = y + h;
    d += ` C ${centerX - amplitude} ${c1y}, ${centerX + amplitude} ${c2y}, ${centerX} ${endY}`;
    y = endY;
  }
  return d;
}

const ROUTE_HEIGHT = 2660;
const ROUTE_WIDTH = 300;
const ROUTE_AMPLITUDE = 135;
const routePath = buildRoutePath(ROUTE_HEIGHT, 140, ROUTE_AMPLITUDE, ROUTE_WIDTH / 2);

export default function TheTourPage() {
  return (
    <div className="relative">
      <ScrollLine
        className="pointer-events-none absolute inset-y-0 left-1/2 w-screen -translate-x-1/2 opacity-[0.15]"
        d={routePath}
        viewBox={`0 0 ${ROUTE_WIDTH} ${ROUTE_HEIGHT}`}
        preserveAspectRatio="none"
        bikeImageSrc="/icons/bike-pedal.png"
        bikeSize={64}
      />

      <div className="relative z-10 mx-auto max-w-4xl px-4 py-16">
        <Reveal delay={0}>
          <h1 className="text-4xl font-bold text-brand-dark">
            Experience Dublin on two wheels
          </h1>
        </Reveal>

        <Reveal delay={75}>
          <p className="mt-6 text-lg text-gray-700">
            More than a bike ride: it&apos;s 2h30 pedaling through
            Dublin&apos;s most charming corners, with a local guide who knows
            the stories maps don&apos;t tell.
          </p>
        </Reveal>

        <Reveal delay={150}>
          <div className="mt-6 flex flex-wrap items-center gap-4 rounded-lg border border-gray-200 bg-white p-4 text-sm text-gray-700 shadow-sm">
            <span className="rounded-full bg-brand-dark px-4 py-1 font-semibold text-white">
              From €35.00
            </span>
            <span className="flex items-center gap-1">
              <span className="text-lg">🕙</span> Tours at 10 AM & 2 PM, daily
            </span>
            <span className="flex items-center gap-1">
              <span className="text-lg">📍</span> Meets at Drury Street
              Multi-Storey Car Park (Bike Park), Dublin 2
            </span>
          </div>
        </Reveal>

        <Reveal delay={225}>
          <div className="mt-8 grid h-64 grid-cols-3 grid-rows-2 gap-3 sm:h-80">
            <div className="relative col-span-2 row-span-2 overflow-hidden rounded-2xl shadow-sm">
              <Image
                src="/tour/group-photo.jpg"
                alt="Our group posing with helmets in hand at the Guinness Storehouse gate, mid-tour"
                fill
                sizes="(min-width: 640px) 512px, 66vw"
                className="object-cover"
              />
            </div>
            <div className="relative overflow-hidden rounded-2xl shadow-sm">
              <Image
                src="/tour/guide-portrait.jpg"
                alt="One of our local guides, helmeted and wearing earphones for live commentary"
                fill
                sizes="(min-width: 640px) 256px, 34vw"
                className="object-cover"
              />
            </div>
            <div className="relative overflow-hidden rounded-2xl shadow-sm">
              <Image
                src="/tour/guide-presentation.jpg"
                alt="A Sightseeing Bike Tours guide talking to the group in front of St Patrick's Cathedral"
                fill
                sizes="(min-width: 640px) 256px, 34vw"
                className="object-cover"
              />
            </div>
          </div>
        </Reveal>

        <Reveal delay={260}>
          <div className="mt-10 grid items-center gap-8 sm:grid-cols-5">
            <div className="sm:col-span-3">
              <h2 className="text-2xl font-bold text-brand-dark">
                See It In Action
              </h2>
              <p className="mt-3 text-gray-700">
                A minute with Laura, one of our guides, on what a day
                pedaling through Dublin with us actually looks like.
              </p>
            </div>
            <div className="sm:col-span-2">
              <div className="relative mx-auto aspect-4/5 w-full max-w-xs overflow-hidden rounded-3xl bg-black shadow-xl">
                <video
                  controls
                  preload="metadata"
                  poster="/tour/promo-poster.jpg"
                  className="h-full w-full object-cover"
                >
                  <source src="/tour/promo.mp4" type="video/mp4" />
                </video>
              </div>
            </div>
          </div>
        </Reveal>

        <Reveal delay={300}>
          <ul className="mt-8 space-y-4">
            <li className="flex items-start gap-3 text-gray-700">
              <span className="text-2xl">⏱</span>
              <span>
                <strong className="text-brand-dark">2h30 of pure discovery</strong> —
                a relaxed pace, no rush, so you can enjoy every corner.
              </span>
            </li>
            <li className="flex items-start gap-3 text-gray-700">
              <span className="text-2xl">👥</span>
              <span>
                <strong className="text-brand-dark">Small groups</strong> (max. 12
                people) — a close, personalized experience.
              </span>
            </li>
            <li className="flex items-start gap-3 text-gray-700">
              <span className="text-2xl">🛡️</span>
              <span>
                <strong className="text-brand-dark">Safety equipment included</strong> —
                all you need to worry about is pedaling.
              </span>
            </li>
            <li className="flex items-start gap-3 text-gray-700">
              <span className="text-2xl">🚲</span>
              <span>
                <strong className="text-brand-dark">Push bikes or e-bikes</strong> —
                choose the ride that suits you, both are fully insured.
              </span>
            </li>
            <li className="flex items-start gap-3 text-gray-700">
              <span className="text-2xl">🗣️</span>
              <span>
                <strong className="text-brand-dark">Passionate local guide</strong>,
                speaking multiple languages — stories only someone who lives the
                city can tell.
              </span>
            </li>
          </ul>
        </Reveal>

        <Reveal delay={375}>
          <div className="mt-6 grid grid-cols-2 gap-4">
            {bikeOptions.map((bike) => (
              <div
                key={bike.label}
                className="rounded-xl border border-gray-200 p-4 text-center"
              >
                <div className="relative mx-auto h-24 w-full">
                  <Image
                    src={bike.src}
                    alt={bike.label}
                    fill
                    sizes="200px"
                    className="object-contain"
                  />
                </div>
                <p className="mt-2 text-sm font-semibold text-brand-dark">
                  {bike.label}
                </p>
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal delay={430}>
          <div className="relative mx-auto mt-10 h-12 w-32">
            <Image
              src="/icons/strokes.png"
              alt=""
              fill
              sizes="128px"
              className="object-contain"
            />
          </div>
        </Reveal>

        <Reveal delay={450}>
          <div className="mt-4 grid gap-6 sm:grid-cols-2">
            <div className="rounded-lg border border-gray-200 p-6">
              <h2 className="text-xl font-bold text-brand-dark">Included</h2>
              <ul className="mt-4 space-y-3">
                {included.map((item) => (
                  <li key={item.label} className="flex items-center gap-3 text-gray-700">
                    <span className="relative h-8 w-8 shrink-0">
                      <Image
                        src={item.icon}
                        alt=""
                        fill
                        sizes="32px"
                        className="object-contain"
                      />
                    </span>
                    <span>{item.label}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-lg border border-gray-200 p-6">
              <h2 className="text-xl font-bold text-brand-dark">Not suitable for</h2>
              <ul className="mt-4 space-y-2 text-gray-700">
                {notSuitableFor.map((item) => (
                  <li key={item} className="flex items-center gap-2">
                    <span>⚠️</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Reveal>

        <Reveal delay={525}>
          <div className="mt-10">
            <h2 className="text-2xl font-bold text-brand-dark">Tour Plan</h2>

            <div className="mt-4 space-y-3">
              <details className="group rounded-lg border border-gray-200 p-4" open>
                <summary className="cursor-pointer list-none font-semibold text-brand-dark">
                  Meeting Point
                </summary>
                <p className="mt-2 text-gray-700">
                  We meet at Drury Street Multi-Storey Car Park (Bike Park),
                  Dublin 2, Ireland.
                </p>
              </details>

              <details className="group rounded-lg border border-gray-200 p-4">
                <summary className="cursor-pointer list-none font-semibold text-brand-dark">
                  End Point
                </summary>
                <p className="mt-2 text-gray-700">
                  All tours finish back at the meeting point.
                </p>
              </details>

              <details className="group rounded-lg border border-gray-200 p-4">
                <summary className="cursor-pointer list-none font-semibold text-brand-dark">
                  Things to Bring
                </summary>
                <ul className="mt-2 list-inside list-disc space-y-1 text-gray-700">
                  {thingsToBring.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </details>

              <details className="group rounded-lg border border-gray-200 p-4">
                <summary className="cursor-pointer list-none font-semibold text-brand-dark">
                  Cancellation Policy
                </summary>
                <p className="mt-2 text-gray-700">
                  Full refund available with at least 24 hours&apos; notice
                  before the tour.
                </p>
              </details>
            </div>
          </div>
        </Reveal>

        <Reveal delay={600}>
          <div className="mt-10">
            <h2 className="text-2xl font-bold text-brand-dark">
              What Our Riders Are Saying
            </h2>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              {testimonials.map((t) => (
                <div
                  key={t.author}
                  className="rounded-lg bg-gray-50 p-5 text-gray-700"
                >
                  <p className="font-semibold text-brand-dark">{t.title}</p>
                  <p className="mt-2 italic">&ldquo;{t.text}&rdquo;</p>
                  <p className="mt-3 text-sm font-medium text-gray-500">
                    — {t.author}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </Reveal>

        <Reveal delay={675}>
          <div className="mt-10 rounded-lg bg-gray-50 p-6">
            <p className="text-gray-700">
              Want to know which places we&apos;ll visit along the way?
            </p>
            <a
              href="/points-of-interest"
              className="mt-4 inline-block rounded-md bg-brand-dark px-6 py-3 font-semibold text-white hover:opacity-90 transition"
            >
              See the Full Route
            </a>
          </div>
        </Reveal>
      </div>
    </div>
  );
}
