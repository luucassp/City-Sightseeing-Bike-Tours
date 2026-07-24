import Reveal from "@/components/Reveal";

export default function BookingPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-16">
      <Reveal delay={0}>
        <h1 className="text-4xl font-bold text-brand-dark">
          Manage Your Booking
        </h1>
      </Reveal>

      <Reveal delay={150}>
        <p className="mt-4 text-lg text-gray-700">
          Need to reschedule, cancel, or just have a question about a booking
          you already made? Send us the details below and a real person from
          our Dublin team will sort it out.
        </p>
      </Reveal>

      <Reveal delay={300}>
        <div className="mt-10 grid gap-10 md:grid-cols-5">
          <form className="md:col-span-3 space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <input
                className="w-full rounded-lg border border-gray-300 p-3"
                placeholder="Full Name"
              />
              <input
                className="w-full rounded-lg border border-gray-300 p-3"
                placeholder="Email"
                type="email"
              />
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <input
                className="w-full rounded-lg border border-gray-300 p-3"
                placeholder="Booking Reference (if you have one)"
              />
              <input
                className="w-full rounded-lg border border-gray-300 p-3 text-gray-500"
                type="date"
              />
            </div>
            <select
              className="w-full rounded-lg border border-gray-300 p-3 text-gray-500"
              defaultValue=""
            >
              <option value="" disabled>
                What do you need?
              </option>
              <option value="reschedule">Reschedule my tour</option>
              <option value="cancel">Cancel my booking</option>
              <option value="group-size">Update my group size</option>
              <option value="other">Something else</option>
            </select>
            <textarea
              className="w-full rounded-lg border border-gray-300 p-3"
              placeholder="Message"
              rows={5}
            />
            <button className="rounded-full bg-brand-red px-8 py-3 font-bold text-white hover:bg-brand-red-dark transition">
              Send Request
            </button>
            <p className="text-sm text-gray-500">
              We usually reply within one business day. Changes made with at
              least 24 hours&apos; notice qualify for a full refund.
            </p>
          </form>

          <div className="md:col-span-2 space-y-6 rounded-lg bg-gray-50 p-6">
            <div>
              <h2 className="text-sm font-semibold uppercase text-brand-dark">
                Prefer to talk?
              </h2>
              <a
                href="tel:+35319073265"
                className="mt-1 block text-gray-700 hover:text-brand-red"
              >
                (01) 907 3265
              </a>
            </div>
            <div>
              <h2 className="text-sm font-semibold uppercase text-brand-dark">
                Email Us
              </h2>
              <a
                href="mailto:hello@sightseeingbiketours.com"
                className="mt-1 block text-gray-700 hover:text-brand-red"
              >
                hello@sightseeingbiketours.com
              </a>
            </div>
            <div>
              <h2 className="text-sm font-semibold uppercase text-brand-dark">
                Meeting Point
              </h2>
              <p className="mt-1 text-gray-700">
                Drury Street Multi-Storey Car Park (Bike Park), Dublin 2.
              </p>
            </div>
          </div>
        </div>
      </Reveal>
    </div>
  );
}
