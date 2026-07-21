const testimonials = [
  { name: "Ana P.", quote: "Guia excelente, aprendi muito sobre a história da cidade." },
  { name: "João R.", quote: "A e-bike tornou o passeio muito mais leve e divertido." },
  { name: "Marta S.", quote: "Vimos lugares que jamais encontraríamos a pé." },
];

export default function Testimonials() {
  return (
    <section className="mx-auto max-w-5xl px-4 py-16">
      <h2 className="text-center text-3xl font-bold text-brand-dark">
        O Que Dizem os Nossos Clientes
      </h2>
      <div className="mt-10 grid gap-8 md:grid-cols-3">
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
    </section>
  );
}
