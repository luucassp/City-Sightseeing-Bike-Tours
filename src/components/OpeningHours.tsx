import BookingButton from "@/components/BookingButton";

export default function OpeningHours() {
  return (
    <section className="bg-brand-dark py-14 text-white">
      <div className="mx-auto flex max-w-4xl flex-col items-center gap-6 px-4 text-center sm:flex-row sm:justify-between sm:text-left">
        <div>
          <h2 className="text-2xl font-bold text-brand-gold">
            Opening Hours
          </h2>
          <p className="mt-2 text-white/80">
            Monday to Sunday, 10am – 5pm
          </p>
          <p className="text-white/80">Daily departures at 10am and 2pm</p>
        </div>
        <BookingButton className="shrink-0" />
      </div>
    </section>
  );
}
