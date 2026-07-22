import InteractiveBentoGallery, {
  MediaItem,
} from "@/components/blocks/interactive-bento-gallery";
import BookingButton from "@/components/BookingButton";

const stops: MediaItem[] = [
  {
    id: 1,
    type: "image",
    title: "Dublin Castle",
    desc: "Antigo centro do poder na Irlanda, hoje palco de cerimónias oficiais do Estado.",
    longDesc:
      "Durante quase 800 anos, este foi o centro do poder britânico na Irlanda. A fortaleza medieval foi transformada ao longo dos séculos num palácio georgiano, e o terreno inclui ainda hoje os jardins do castelo e atrações como o museu Chester Beatty.",
    url: "/stops/dublin-castle.jpg",
    span: "col-span-2 row-span-2",
  },
  {
    id: 2,
    type: "image",
    title: "St Patrick's Cathedral",
    desc: "A maior catedral da Irlanda, dedicada ao padroeiro do país desde a Idade Média.",
    longDesc:
      "A maior catedral da Irlanda foi erguida no local onde, segundo a tradição, São Patrício batizava os primeiros convertidos. Destaca-se pela arquitetura gótica e por ser o local de sepultamento de Jonathan Swift, autor de As Viagens de Gulliver.",
    url: "/stops/st-patricks-cathedral.jpg",
    span: "col-span-1 row-span-1",
  },
  {
    id: 3,
    type: "image",
    title: "The Liberties",
    desc: "Bairro histórico de ruas estreitas, mercados tradicionais e forte identidade local.",
    longDesc:
      "Um dos bairros mais antigos de Dublin, que remonta ao século XII e ficava fora dos muros da cidade. Foi um polo industrial de destilarias e cervejarias, e hoje mistura história e vida urbana moderna — repare nas casas operárias do século XIX com as suas portas coloridas.",
    url: "/stops/the-liberties.jpg",
    span: "col-span-1 row-span-2",
  },
  {
    id: 4,
    type: "image",
    title: "Guinness Storehouse",
    desc: "A fábrica mais visitada de Dublin, berço da cerveja mais famosa da Irlanda.",
    longDesc:
      "Instalado num edifício de sete andares em formato de caneca de cerveja, conta a história de 250 anos da marca mais famosa da Irlanda e como a Guinness se tornou um sucesso comercial com enorme influência na cidade.",
    url: "/stops/guinness-storehouse.jpg",
    span: "col-span-2 row-span-1",
  },
  {
    id: 5,
    type: "image",
    title: "IMMA / Royal Hospital",
    desc: "Museu de arte moderna instalado num antigo hospital real, com jardins formais.",
    longDesc:
      "Um edifício do século XVII inspirado no Les Invalides de Paris, hoje sede do Museu Irlandês de Arte Moderna. Uma transição curiosa: de hospital militar a galeria de arte contemporânea.",
    url: "/stops/imma-royal-hospital.jpg",
    span: "col-span-1 row-span-1",
  },
  {
    id: 6,
    type: "image",
    title: "Kilmainham Gaol",
    desc: "Antiga prisão que testemunhou momentos decisivos da história da independência irlandesa.",
    longDesc:
      "Antiga prisão do século XVIII com papel central na luta pela independência irlandesa, incluindo execuções ligadas ao Levante de 1916.",
    url: "/stops/kilmainham-gaol.jpg",
    span: "col-span-1 row-span-1",
  },
  {
    id: 7,
    type: "image",
    title: "St Patrick's Tower",
    desc: "Antigo moinho de vento junto à fábrica Guinness, um dos marcos mais curiosos da cidade.",
    longDesc:
      "Um antigo moinho de vento, um dos mais altos da Europa na sua época, ligado a uma destilaria que chegou a produzir milhões de litros de uísque por ano — um ótimo ponto para falar da história do uísque irlandês.",
    url: "/stops/st-patricks-tower.jpg",
    span: "col-span-1 row-span-1",
  },
  {
    id: 8,
    type: "image",
    title: "Christ Church Cathedral",
    desc: "Catedral medieval, uma das construções mais antigas e emblemáticas de Dublin.",
    longDesc:
      "Fundada no século XI, está no coração da Dublin medieval. Arquitetura gótica marcante e uma longa história que remonta à era viking.",
    url: "/stops/christ-church.jpg",
    span: "col-span-2 md:col-span-4 row-span-1",
  },
];

export default function Stops() {
  return (
    <section className="bg-gray-50 py-16">
      <InteractiveBentoGallery
        mediaItems={stops}
        title="Principais Paragens do Tour"
        description="Clique numa foto para explorar cada paragem em detalhe."
      />
      <div className="mt-10 text-center">
        <BookingButton />
      </div>
    </section>
  );
}
