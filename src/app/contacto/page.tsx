export default function ContactoPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-16">
      <h1 className="text-4xl font-bold text-brand-dark">Fale Connosco</h1>
      <form className="mt-8 space-y-4">
        <input
          className="w-full rounded-lg border border-gray-300 p-3"
          placeholder="Nome"
        />
        <input
          className="w-full rounded-lg border border-gray-300 p-3"
          placeholder="Email"
          type="email"
        />
        <textarea
          className="w-full rounded-lg border border-gray-300 p-3"
          placeholder="Mensagem"
          rows={5}
        />
        <button className="rounded-full bg-brand-red px-8 py-3 font-bold text-white hover:bg-brand-red-dark">
          Enviar
        </button>
      </form>
    </div>
  );
}
