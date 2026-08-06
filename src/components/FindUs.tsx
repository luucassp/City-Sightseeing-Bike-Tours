const MEETING_POINT_ADDRESS =
  "Drury Street Multi-Storey Car Park (Bike Park), Dublin 2";

export default function FindUs() {
  return (
    <section className="mx-auto max-w-3xl px-4 py-16 text-center">
      <h2 className="text-3xl font-bold text-brand-dark">Find Us</h2>
      <p className="mt-3 text-gray-600">{MEETING_POINT_ADDRESS}</p>
      <a
        href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(MEETING_POINT_ADDRESS)}`}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-6 inline-block min-h-11 rounded-full border-2 border-brand-red px-8 py-3 font-bold text-brand-red transition hover:bg-brand-red hover:text-white active:scale-95"
      >
        View on Google Maps
      </a>
    </section>
  );
}
