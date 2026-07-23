import Reveal from "@/components/Reveal";
import ScrollLine from "@/components/ScrollLine";

export default function TheTourPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-16">
      <Reveal delay={0}>
        <h1 className="text-4xl font-bold text-brand-dark">
          Experience Dublin on two wheels
        </h1>
      </Reveal>

      <Reveal delay={150}>
        <p className="mt-6 text-lg text-gray-700">
          More than a bike ride: it&apos;s 2h30 pedaling through Dublin&apos;s
          most charming corners, with a local guide who knows the stories maps
          don&apos;t tell.
        </p>
      </Reveal>

      <Reveal delay={300}>
        <div className="relative">
          <ScrollLine
            className="pointer-events-none absolute -left-9 inset-y-0 hidden w-12 sm:block sm:-left-10 sm:w-14 md:-left-12 md:w-16"
            d="M30 0 C 0 50, 60 90, 30 140 C 0 190, 60 230, 30 280 C 0 330, 60 370, 30 400"
            viewBox="0 0 60 400"
            bikeSize={65}
          />

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
              <span className="text-2xl">🗣️</span>
              <span>
                <strong className="text-brand-dark">Passionate local guide</strong>,
                speaking multiple languages — stories only someone who lives the
                city can tell.
              </span>
            </li>
          </ul>
        </div>
      </Reveal>

      <Reveal delay={450}>
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
  );
}
