import Reveal from "@/components/Reveal";
import ScrollLine from "@/components/ScrollLine";

export default function PrivateHirePage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-16">
      <Reveal delay={0}>
        <h1 className="text-4xl font-bold text-brand-dark">
          Your Dublin. Your Route. Your Pace.
        </h1>
      </Reveal>

      <Reveal delay={150}>
        <p className="mt-6 text-lg text-gray-700">
          Skip the fixed schedule. Book a private bike tour built entirely
          around your group — the route, the stops, the stories you want to
          hear. Perfect for families, friends, or corporate teams looking for
          something a little more memorable.
        </p>
      </Reveal>

      <Reveal delay={300}>
        <div className="relative">
          <ScrollLine
            className="pointer-events-none absolute -left-9 inset-y-0 hidden w-12 sm:block sm:-left-10 sm:w-14 md:-left-12 md:w-16"
            d="M30 0 C 0 50, 60 90, 30 140 C 0 190, 60 230, 30 280 C 0 330, 60 370, 30 400"
            viewBox="0 0 60 400"
          />

          <ul className="mt-8 space-y-4">
            <li className="flex items-start gap-3 text-gray-700">
              <span className="text-2xl">🗺️</span>
              <span>
                <strong className="text-brand-dark">Fully customisable route</strong> —
                choose the landmarks and neighbourhoods that matter to you.
              </span>
            </li>
            <li className="flex items-start gap-3 text-gray-700">
              <span className="text-2xl">⏱️</span>
              <span>
                <strong className="text-brand-dark">Flexible duration</strong> —
                we adapt the schedule to fit your plans, not the other way
                around.
              </span>
            </li>
            <li className="flex items-start gap-3 text-gray-700">
              <span className="text-2xl">🎙️</span>
              <span>
                <strong className="text-brand-dark">A guide who lives Dublin</strong> —
                entertaining stories and hidden gems you won&apos;t find in a
                guidebook.
              </span>
            </li>
            <li className="flex items-start gap-3 text-gray-700">
              <span className="text-2xl">👨‍👩‍👧‍👦</span>
              <span>
                <strong className="text-brand-dark">Made for any group</strong> —
                families, friends, or corporate teams looking for a fun team
                outing.
              </span>
            </li>
          </ul>
        </div>
      </Reveal>

      <Reveal delay={450}>
        <div className="mt-10 rounded-lg bg-gray-50 p-6">
          <h2 className="text-xl font-semibold text-brand-dark">
            Want to make it a full day?
          </h2>
          <p className="mt-2 text-gray-700">
            Combine your private bike tour with a City Bus Tour, a guided
            Walking Tour, or a relaxing Boat River Cruise — all tailored into
            one seamless Dublin experience.
          </p>
        </div>
      </Reveal>

      <Reveal delay={600}>
        <div className="mt-10 text-center">
          <a
            href="/contact"
            className="inline-block rounded-md bg-brand-dark px-8 py-3 font-semibold text-white hover:opacity-90 transition"
          >
            Start Planning Your Private Tour
          </a>
          <p className="mt-3 text-sm text-gray-500">
            Tell us your idea — we&apos;ll design the rest.
          </p>
        </div>
      </Reveal>
    </div>
  );
}
