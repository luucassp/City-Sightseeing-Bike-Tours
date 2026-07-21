import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative flex min-h-[520px] items-center justify-center bg-brand-dark bg-[url('/hero.jpg')] bg-cover bg-center text-center text-white">
      <div className="absolute inset-0 bg-black/40" />
      <div className="relative z-10 max-w-3xl px-4">
        <h1 className="text-4xl font-extrabold md:text-6xl">
          Tours de Bicicleta e E-bike pela Cidade
        </h1>
        <p className="mt-4 text-lg text-white/90">
          Descubra recantos que só se veem de bicicleta, com guias locais e
          duas saídas diárias.
        </p>
        <Link
          href="/o-tour"
          className="mt-8 inline-block rounded-full bg-brand-gold px-8 py-3 font-bold text-brand-dark shadow-lg transition hover:scale-105"
        >
          Reservar Bilhete
        </Link>
      </div>
    </section>
  );
}
