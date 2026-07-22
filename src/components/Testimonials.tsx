const testimonials = [
  {
    name: "Ana Pereira",
    quote:
      "Excellent guide, really friendly and full of interesting stories about the city. I'd recommend it to anyone who wants to see Dublin in a different way.",
  },
  {
    name: "John Ryan",
    quote:
      "The e-bike made the ride so much easier — even without being very fit, I kept up with the group effortlessly and enjoyed every stop.",
  },
  {
    name: "Marta Santos",
    quote:
      "We saw places we'd never have found on foot, and the group's pace was perfect. One of the best activities we did on the trip.",
  },
  {
    name: "Carlos Mendes",
    quote:
      "I booked last minute and have no regrets. The guide adapted the route to the group's pace and explained the history of each stop really well.",
  },
];

export default function Testimonials() {
  return (
    <section className="mx-auto max-w-5xl px-4 py-16">
      <h2 className="text-center text-3xl font-bold text-brand-dark">
        What Our Customers Say
      </h2>
      <div className="mt-10 grid gap-8 md:grid-cols-2">
        {testimonials.map((t) => (
          <blockquote
            key={t.name}
            className="rounded-2xl bg-gray-50 p-6 text-gray-700 shadow-sm"
          >
            <p>&quot;{t.quote}&quot;</p>
            <footer className="mt-4 font-semibold text-brand-red">
              {t.name}
            </footer>
          </blockquote>
        ))}
      </div>
      <p className="mt-8 text-center">
        <a
          href="#"
          className="font-semibold text-brand-red underline decoration-brand-gold decoration-2 underline-offset-4 hover:text-brand-red-dark"
        >
          See more reviews (add Google/TripAdvisor link) →
        </a>
      </p>
    </section>
  );
}
