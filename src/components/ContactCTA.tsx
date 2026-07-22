import Link from "next/link";

export default function ContactCTA() {
  return (
    <section className="bg-gray-50 py-16 text-center">
      <div className="mx-auto max-w-xl px-4">
        <h2 className="text-2xl font-bold text-brand-dark">
          Ficou com dúvidas?
        </h2>
        <p className="mt-2 text-gray-600">
          Fale connosco e ajudamos no que precisar.
        </p>
        <Link
          href="/contacto"
          className="mt-6 inline-block rounded-full bg-brand-red px-8 py-3 font-bold text-white shadow-lg transition hover:bg-brand-red-dark"
        >
          Fale Connosco
        </Link>
      </div>
    </section>
  );
}
