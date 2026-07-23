import Reveal from "@/components/Reveal";

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-16">
      <Reveal delay={0}>
        <h1 className="text-4xl font-bold text-brand-dark">
          Let&apos;s Plan Your Dublin Adventure
        </h1>
      </Reveal>

      <Reveal delay={150}>
        <p className="mt-4 text-lg text-gray-700">
          Got a question about routes, private tours, or just want to say
          hello? Drop us a message below — a real person from our Dublin team
          will get back to you shortly.
        </p>
      </Reveal>

      <Reveal delay={300}>
        <div className="mt-10 grid gap-10 md:grid-cols-5">
          <form className="md:col-span-3 space-y-4">
            <input
              className="w-full rounded-lg border border-gray-300 p-3"
              placeholder="Name"
            />
            <input
              className="w-full rounded-lg border border-gray-300 p-3"
              placeholder="Email"
              type="email"
            />
            <textarea
              className="w-full rounded-lg border border-gray-300 p-3"
              placeholder="Message"
              rows={5}
            />
            <button className="rounded-full bg-brand-red px-8 py-3 font-bold text-white hover:bg-brand-red-dark transition">
              Send Message
            </button>
            <p className="text-sm text-gray-500">
              We usually reply within one business day.
            </p>
          </form>

          <div className="md:col-span-2 space-y-6 rounded-lg bg-gray-50 p-6">
            <div>
              <h2 className="text-sm font-semibold uppercase text-brand-dark">
                Meeting Point
              </h2>
              <p className="mt-1 text-gray-700">
                Drury Street Multi-Storey Car Park (Bike Park), Dublin 2.
              </p>
            </div>
            <div>
              <h2 className="text-sm font-semibold uppercase text-brand-dark">
                Call Us
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
          </div>
        </div>
      </Reveal>
    </div>
  );
}
