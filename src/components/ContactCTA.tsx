import Link from "next/link";

export default function ContactCTA() {
  return (
    <section className="bg-gray-50 py-16 text-center">
      <div className="mx-auto max-w-xl px-4">
        <h2 className="text-2xl font-bold text-brand-dark">
          Got questions?
        </h2>
        <p className="mt-2 text-gray-600">
          Get in touch and we&apos;ll help with whatever you need.
        </p>
        <Link
          href="/contact"
          className="mt-6 inline-block rounded-full bg-brand-red px-8 py-3 font-bold text-white shadow-lg transition hover:bg-brand-red-dark active:scale-95"
        >
          Contact Us
        </Link>
      </div>
    </section>
  );
}
