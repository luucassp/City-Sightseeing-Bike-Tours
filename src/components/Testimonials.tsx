const testimonials = [
  {
    name: "Ana Pereira",
    quote:
      "Guia excelente, muito simpático e cheio de histórias interessantes sobre a cidade. Recomendo a quem quer conhecer Dublin de um jeito diferente.",
  },
  {
    name: "João Ribeiro",
    quote:
      "A e-bike tornou o passeio muito mais leve — mesmo sem estar em grande forma, consegui acompanhar o grupo sem esforço e aproveitar cada paragem.",
  },
  {
    name: "Marta Santos",
    quote:
      "Vimos lugares que jamais encontraríamos a pé, e o ritmo do grupo foi perfeito. Uma das melhores atividades que fizemos na viagem.",
  },
  {
    name: "Carlos Mendes",
    quote:
      "Reservei em cima da hora e não me arrependi. O guia adaptou o percurso ao ritmo do grupo e explicou muito bem a história de cada paragem.",
  },
];

export default function Testimonials() {
  return (
    <section className="mx-auto max-w-5xl px-4 py-16">
      <h2 className="text-center text-3xl font-bold text-brand-dark">
        O Que Dizem os Nossos Clientes
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
          Ver mais avaliações (adicionar link do Google/TripAdvisor) →
        </a>
      </p>
    </section>
  );
}
