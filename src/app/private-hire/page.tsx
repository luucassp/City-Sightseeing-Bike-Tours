import Image from "next/image";
import Reveal from "@/components/Reveal";
import ScrollLine from "@/components/ScrollLine";

const highlights = [
  {
    icon: "🗺️",
    title: "Fully customisable route",
    text: "Choose the landmarks and neighbourhoods that matter to you.",
  },
  {
    icon: "⏱️",
    title: "Flexible duration",
    text: "We adapt the schedule to fit your plans, not the other way around.",
  },
  {
    icon: "🎙️",
    title: "A guide who lives Dublin",
    text: "Entertaining stories and hidden gems you won't find in a guidebook.",
  },
  {
    icon: "👨‍👩‍👧‍👦",
    title: "Made for any group",
    text: "Families, friends, or corporate teams looking for a fun team outing.",
  },
];

const addOns = [
  {
    icon: "🚌",
    title: "City Bus Tour",
    text: "See Dublin from the top deck, hopping on and off between the stops that matter to your group.",
  },
  {
    icon: "🚶",
    title: "Walking Tour",
    text: "Slow down and explore the medieval streets on foot with a local guide.",
  },
  {
    icon: "🚤",
    title: "Boat River Cruise",
    text: "Take in the city skyline from the water on the River Liffey.",
  },
];

const faqs = [
  {
    q: "How long does a private tour last?",
    a: "Around 2 hours 30 minutes, but it's your tour — we can shorten or extend it to fit your group's plans.",
  },
  {
    q: "What's the maximum group size?",
    a: "Up to 12 people per guide. Bigger group? We simply add more guides riding together.",
  },
  {
    q: "Can you include entry to Dublin's attractions?",
    a: "Yes — we work with several of the city's attractions and can build stops with tickets straight into your route.",
  },
];

// Repeats the same weave-left/weave-right curve used across the site's
// ScrollLine accents so the effect can run the full height of the page
// instead of being confined to a single section.
function buildRoutePath(totalHeight: number, segmentHeight = 140, amplitude = 30) {
  let d = `M${amplitude} 0`;
  let y = 0;
  while (y < totalHeight) {
    const h = Math.min(segmentHeight, totalHeight - y);
    const c1y = y + h * (5 / 14);
    const c2y = y + h * (9 / 14);
    const endY = y + h;
    d += ` C 0 ${c1y}, ${amplitude * 2} ${c2y}, ${amplitude} ${endY}`;
    y = endY;
  }
  return d;
}

const ROUTE_HEIGHT = 2100;
const routePath = buildRoutePath(ROUTE_HEIGHT);

export default function PrivateHirePage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-16">
      <div className="relative">
        <ScrollLine
          className="pointer-events-none absolute -left-9 inset-y-0 hidden w-12 sm:block sm:-left-10 sm:w-14 md:-left-12 md:w-16"
          d={routePath}
          viewBox={`0 0 60 ${ROUTE_HEIGHT}`}
          preserveAspectRatio="none"
        />

        <Reveal delay={0}>
          <h1 className="text-4xl font-bold text-brand-dark">
            Your Dublin. Your Route. Your Pace.
          </h1>
        </Reveal>

        <Reveal delay={75}>
          <p className="mt-2 text-lg font-semibold text-brand-red">
            For every kind of group.
          </p>
        </Reveal>

        <Reveal delay={125}>
          <p className="mt-4 text-lg text-gray-700">
            Skip the fixed schedule. Book a private bike tour built entirely
            around your group — the route, the stops, the stories you want to
            hear. Perfect for families, friends, or corporate teams looking
            for something a little more memorable.
          </p>
        </Reveal>

        <Reveal delay={175}>
          <div className="mt-6">
            <a
              href="/contact"
              className="inline-block rounded-md bg-brand-red px-8 py-3 font-semibold text-white hover:bg-brand-red-dark transition"
            >
              Book It Now
            </a>
          </div>
        </Reveal>

        <Reveal delay={250}>
          <div className="mt-10 grid h-64 grid-cols-3 grid-rows-2 gap-3 sm:h-80">
            <div className="relative col-span-2 row-span-2 overflow-hidden rounded-2xl shadow-sm">
              <Image
                src="/tour/group-photo.jpg"
                alt="A private group posing with helmets in hand mid-tour"
                fill
                sizes="(min-width: 640px) 512px, 66vw"
                className="object-cover"
              />
            </div>
            <div className="relative overflow-hidden rounded-2xl shadow-sm">
              <Image
                src="/tour/guide-presentation.jpg"
                alt="A guide talking to a private group in front of St Patrick's Cathedral"
                fill
                sizes="(min-width: 640px) 256px, 34vw"
                className="object-cover"
              />
            </div>
            <div className="relative overflow-hidden rounded-2xl shadow-sm">
              <Image
                src="/tour/guide-portrait.jpg"
                alt="One of our guides, helmeted and ready to lead a private tour"
                fill
                sizes="(min-width: 640px) 256px, 34vw"
                className="object-cover"
              />
            </div>
          </div>
        </Reveal>

        <Reveal delay={325}>
          <div className="mt-10">
            <h2 className="text-2xl font-bold text-brand-dark">
              What Is Private Hire?
            </h2>
            <p className="mt-3 text-gray-700">
              A private hire is your own dedicated tour, with no other guests
              along for the ride. You bring the group — whether it&apos;s
              family, friends, or colleagues — and we build the experience
              around you: the pace, the route, the amount of history and
              storytelling versus fresh air and photo stops.
            </p>
          </div>
        </Reveal>

        <Reveal delay={400}>
          <div className="mt-10">
            <h2 className="text-2xl font-bold text-brand-dark">
              Why Go Private?
            </h2>
            <ul className="mt-6 space-y-4">
              {highlights.map((item) => (
                <li key={item.title} className="flex items-start gap-3 text-gray-700">
                  <span className="text-2xl">{item.icon}</span>
                  <span>
                    <strong className="text-brand-dark">{item.title}</strong> —{" "}
                    {item.text}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>

        <Reveal delay={475}>
          <div className="mt-10">
            <h2 className="text-2xl font-bold text-brand-dark">
              Want to Make It a Full Day?
            </h2>
            <p className="mt-2 text-gray-700">
              Combine your private bike tour with one of these, all tailored
              into one seamless Dublin experience.
            </p>
            <div className="mt-6 grid gap-4 sm:grid-cols-3">
              {addOns.map((item) => (
                <div
                  key={item.title}
                  className="rounded-xl border border-gray-200 p-5 text-center"
                >
                  <span className="text-3xl">{item.icon}</span>
                  <p className="mt-2 font-semibold text-brand-dark">
                    {item.title}
                  </p>
                  <p className="mt-1 text-sm text-gray-600">{item.text}</p>
                </div>
              ))}
            </div>
          </div>
        </Reveal>

        <Reveal delay={550}>
          <div className="mt-10">
            <h2 className="text-2xl font-bold text-brand-dark">
              Frequently Asked Questions
            </h2>
            <div className="mt-4 space-y-3">
              {faqs.map((item, i) => (
                <details
                  key={item.q}
                  className="group rounded-lg border border-gray-200 p-4"
                  open={i === 0}
                >
                  <summary className="cursor-pointer list-none font-semibold text-brand-dark">
                    {item.q}
                  </summary>
                  <p className="mt-2 text-gray-700">{item.a}</p>
                </details>
              ))}
            </div>
          </div>
        </Reveal>

        <Reveal delay={625}>
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
    </div>
  );
}
