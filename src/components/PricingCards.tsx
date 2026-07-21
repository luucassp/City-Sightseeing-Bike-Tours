const options = [
  {
    name: "Bicicleta Tradicional",
    price: "30€",
    description:
      "Ideal para ciclistas experientes que gostam de pedalar enquanto exploram a cidade.",
  },
  {
    name: "E-bike",
    price: "40€",
    description:
      "Conforto e facilidade para todos os níveis. Suba ladeiras sem esforço.",
  },
];

export default function PricingCards() {
  return (
    <section className="mx-auto max-w-5xl px-4 py-16">
      <h2 className="text-center text-3xl font-bold text-brand-dark">
        Qual Bicicleta Escolher?
      </h2>
      <div className="mt-10 grid gap-8 md:grid-cols-2">
        {options.map((opt) => (
          <div
            key={opt.name}
            className="rounded-2xl border border-gray-200 p-8 text-center shadow-sm transition hover:shadow-lg"
          >
            <h3 className="text-xl font-bold text-brand-red">{opt.name}</h3>
            <p className="mt-2 text-3xl font-extrabold">{opt.price}</p>
            <p className="mt-4 text-gray-600">{opt.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
