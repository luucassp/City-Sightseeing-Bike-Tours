import BookingButton from "@/components/BookingButton";

export default function OpeningHours() {
  return (
    <section className="bg-brand-dark py-14 text-white">
      <div className="mx-auto flex max-w-4xl flex-col items-center gap-6 px-4 text-center sm:flex-row sm:justify-between sm:text-left">
        <div>
          <h2 className="text-2xl font-bold text-brand-gold">
            Horário de Funcionamento
          </h2>
          <p className="mt-2 text-white/80">
            Segunda a domingo, das 10h às 17h
          </p>
          <p className="text-white/80">Saídas diárias às 10h e às 14h</p>
        </div>
        <BookingButton className="shrink-0" />
      </div>
    </section>
  );
}
