export default function TourPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-16">
      <h1 className="text-4xl font-bold text-brand-dark">O Tour</h1>
      <p className="mt-6 text-gray-700">
        Descreva aqui a duração, pontos de encontro, o que está incluído e
        recomendações para os participantes.
      </p>
      <ul className="mt-6 list-disc space-y-2 pl-6 text-gray-700">
        <li>Duração: 2 horas e 30 minutos</li>
        <li>Grupos pequenos (máx. 12 pessoas)</li>
        <li>Equipamento de segurança incluído</li>
        <li>Guia local em várias línguas</li>
      </ul>
    </div>
  );
}
