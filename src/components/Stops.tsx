import InteractiveBentoGallery, {
  MediaItem,
} from "@/components/blocks/interactive-bento-gallery";
import BookingButton from "@/components/BookingButton";
import RouteMap from "@/components/RouteMap";

const stops: MediaItem[] = [
  {
    id: 1,
    type: "image",
    title: "Dublin Castle",
    desc: "Once the seat of power in Ireland, now the stage for official State ceremonies.",
    longDesc:
      "For almost 800 years, this was the centre of British power in Ireland. The medieval fortress was transformed over the centuries into a Georgian palace, and the grounds today still include the castle gardens and attractions like the Chester Beatty museum.",
    url: "/stops/dublin-castle.jpg",
    span: "col-span-2 row-span-2",
  },
  {
    id: 2,
    type: "image",
    title: "St Patrick's Cathedral",
    desc: "Ireland's largest cathedral, dedicated to the country's patron saint since the Middle Ages.",
    longDesc:
      "Ireland's largest cathedral was built on the site where, according to tradition, St Patrick baptised the first converts. It stands out for its Gothic architecture and as the burial place of Jonathan Swift, author of Gulliver's Travels.",
    url: "/stops/st-patricks-cathedral.jpg",
    span: "col-span-1 row-span-1",
  },
  {
    id: 3,
    type: "image",
    title: "The Liberties",
    desc: "Historic neighbourhood of narrow streets, traditional markets and strong local identity.",
    longDesc:
      "One of Dublin's oldest neighbourhoods, dating back to the 12th century, when it lay outside the city walls. It was once an industrial hub of distilleries and breweries, and today blends history with modern urban life — look out for the colourful doors of the 19th-century workers' cottages.",
    url: "/stops/the-liberties.jpg",
    span: "col-span-1 row-span-2",
  },
  {
    id: 4,
    type: "image",
    title: "Guinness Storehouse",
    desc: "Dublin's most visited attraction, birthplace of Ireland's most famous beer.",
    longDesc:
      "Housed in a seven-storey building shaped like a giant pint glass, it tells the 250-year story of Ireland's most famous brand and how Guinness became a commercial success with huge influence on the city.",
    url: "/stops/guinness-storehouse.jpg",
    span: "col-span-2 row-span-1",
  },
  {
    id: 5,
    type: "image",
    title: "IMMA / Royal Hospital",
    desc: "Modern art museum housed in a former royal hospital, with formal gardens.",
    longDesc:
      "A 17th-century building inspired by Les Invalides in Paris, now home to the Irish Museum of Modern Art. A curious transition: from military hospital to contemporary art gallery.",
    url: "/stops/imma-royal-hospital.jpg",
    span: "col-span-1 row-span-1",
  },
  {
    id: 6,
    type: "image",
    title: "Kilmainham Gaol",
    desc: "Former prison that witnessed decisive moments in Ireland's fight for independence.",
    longDesc:
      "An 18th-century former prison that played a central role in Ireland's struggle for independence, including executions linked to the 1916 Easter Rising.",
    url: "/stops/kilmainham-gaol.jpg",
    span: "col-span-1 row-span-1",
  },
  {
    id: 7,
    type: "image",
    title: "St Patrick's Tower",
    desc: "Former windmill next to the Guinness factory, one of the city's most curious landmarks.",
    longDesc:
      "A former windmill, one of the tallest in Europe in its day, linked to a distillery that once produced millions of litres of whiskey a year — a great spot to talk about the history of Irish whiskey.",
    url: "/stops/st-patricks-tower.jpg",
    span: "col-span-1 row-span-1",
  },
  {
    id: 8,
    type: "image",
    title: "Christ Church Cathedral",
    desc: "Medieval cathedral, one of Dublin's oldest and most iconic buildings.",
    longDesc:
      "Founded in the 11th century, it stands at the heart of medieval Dublin. Striking Gothic architecture and a long history dating back to the Viking era.",
    url: "/stops/christ-church.jpg",
    span: "col-span-2 md:col-span-4 row-span-1",
  },
];

export default function Stops() {
  return (
    <section className="bg-gray-50 py-16">
      <InteractiveBentoGallery
        mediaItems={stops}
        title="Main Stops of the Tour"
        description="Click on a photo to explore each stop in detail."
      />
      <RouteMap />

      <div className="mt-10 text-center">
        <BookingButton />
      </div>
    </section>
  );
}
