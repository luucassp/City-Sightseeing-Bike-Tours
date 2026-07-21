export default function Footer() {
  return (
    <footer className="bg-brand-dark py-10 text-white">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 md:grid-cols-3">
        <div>
          <h3 className="font-bold text-brand-gold">Horário</h3>
          <p className="mt-2 text-white/80">Seg – Dom: 10:00 – 17:00</p>
        </div>
        <div>
          <h3 className="font-bold text-brand-gold">Ponto de Encontro</h3>
          <p className="mt-2 text-white/80">Parque de Bicicletas, Centro da Cidade</p>
        </div>
        <div>
          <h3 className="font-bold text-brand-gold">Contacto</h3>
          <p className="mt-2 text-white/80">hello@seudominio.com</p>
        </div>
      </div>
      <p className="mt-8 text-center text-sm text-white/50">
        © {new Date().getFullYear()} BikeTours. Todos os direitos reservados.
      </p>
    </footer>
  );
}
