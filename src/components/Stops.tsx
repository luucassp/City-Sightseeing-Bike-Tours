const stops = [
  {
    number: "1",
    title: "Praça Central",
    text: "Ponto de partida histórico, onde contamos a origem da cidade.",
  },
  {
    number: "2",
    title: "Catedral Antiga",
    text: "Um marco de arquitetura gótica com séculos de história.",
  },
  {
    number: "3",
    title: "Bairro Histórico",
    text: "Ruas de paralelepípedos e casas coloridas de um bairro operário.",
  },
  {
    number: "4",
    title: "Fábrica Emblemática",
    text: "A atração mais visitada, símbolo de um produto local famoso.",
  },
];

export default function Stops() {
  return (
    <section className="bg-gray-50 py-16">
      <div className="mx-auto max-w-5xl px-4">
        <h2 className="text-center text-3xl font-bold text-brand-dark">
          Principais Paragens do Tour
        </h2>
        <div className="mt-10 grid gap-8 sm:grid-cols-2">
          {stops.map((stop) => (
            <div key={stop.number} className="flex gap-4">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-red font-bold text-white">
                {stop.number}
              </span>
              <div>
                <h3 className="font-bold text-brand-dark">{stop.title}</h3>
                <p className="text-gray-600">{stop.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
