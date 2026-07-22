export default function Footer() {
  return (
    <footer className="bg-brand-dark py-10 text-white">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 md:grid-cols-3">
        <div>
          <h3 className="font-bold text-brand-gold">Opening Hours</h3>
          <p className="mt-2 text-white/80">Mon – Sun: 10:00 – 17:00</p>
        </div>
        <div>
          <h3 className="font-bold text-brand-gold">Meeting Point</h3>
          <p className="mt-2 text-white/80">Bike Park, City Centre</p>
        </div>
        <div>
          <h3 className="font-bold text-brand-gold">Contact</h3>
          <p className="mt-2 text-white/80">hello@yourdomain.com</p>
        </div>
      </div>
      <p className="mt-8 text-center text-sm text-white/50">
        © {new Date().getFullYear()} BikeTours. All rights reserved.
      </p>
    </footer>
  );
}
