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
      "A 13th-century fortress at the heart of Irish governance, with lavish State Apartments featuring Waterford crystal chandeliers, a medieval Undercroft and the Gothic Revival Chapel Royal. Its gardens offer a peaceful break from the busy city streets.",
    url: "/stops/dublin-castle.jpg",
    span: "col-span-2 row-span-2",
  },
  {
    id: 2,
    type: "image",
    title: "St Patrick's Cathedral",
    desc: "Ireland's largest cathedral, dedicated to the country's patron saint since the Middle Ages.",
    longDesc:
      "Ireland's largest cathedral, built in 1191 and dedicated to the country's patron saint. Home to the tomb of Jonathan Swift, author of 'Gulliver's Travels', with striking Gothic architecture and stained glass, and a history that includes sheltering locals during the 1641 Irish Rebellion.",
    url: "/stops/st-patricks-cathedral.jpg",
    span: "col-span-1 row-span-1",
  },
  {
    id: 3,
    type: "image",
    title: "The Liberties",
    desc: "Historic neighbourhood of narrow streets, traditional markets and strong local identity.",
    longDesc:
      "One of Dublin's oldest neighbourhoods, dating back to the 12th century and once located outside the city walls. Today it mixes traditional markets, craft distilleries and hidden gems like Marsh's Library, Ireland's oldest public library.",
    url: "/stops/the-liberties.jpg",
    span: "col-span-1 row-span-2",
  },
  {
    id: 4,
    type: "image",
    title: "Guinness Storehouse",
    desc: "Dublin's most visited attraction, birthplace of Ireland's most famous beer.",
    longDesc:
      "Dublin's most visited attraction, housed in a seven-storey building shaped like a giant pint glass. Learn about the 250-year history of Ireland's most famous export, explore vintage advertising, and take in panoramic views of the city from the Gravity Bar.",
    url: "/stops/guinness-storehouse.jpg",
    span: "col-span-2 row-span-1",
  },
  {
    id: 5,
    type: "image",
    title: "IMMA / Royal Hospital",
    desc: "Modern art museum housed in a former royal hospital, with formal gardens.",
    longDesc:
      "A magnificent 17th-century building inspired by Les Invalides in Paris, now home to the Irish Museum of Modern Art. Formal gardens and a collection of over 3,500 artworks, with the Great Hall and Chapel among its architectural highlights.",
    url: "/stops/imma-royal-hospital.jpg",
    span: "col-span-1 row-span-1",
  },
  {
    id: 6,
    type: "image",
    title: "Kilmainham Gaol",
    desc: "Former prison that witnessed decisive moments in Ireland's fight for independence.",
    longDesc:
      "A former prison, built in 1796, that held many leaders of Ireland's fight for independence, including participants of the 1916 Easter Rising. Its austere cells and restoration exhibition offer a powerful look at Ireland's history.",
    url: "/stops/kilmainham-gaol.jpg",
    span: "col-span-1 row-span-1",
  },
  {
    id: 7,
    type: "image",
    title: "St Patrick's Tower",
    desc: "Former windmill next to the Guinness factory, one of the city's most curious landmarks.",
    longDesc:
      "A unique octagonal smock windmill dating back to 1757, once part of the Roe Distillery. Europe's tallest windmill and no longer operational, its green copper dome remains an iconic landmark in the Liberties.",
    url: "/stops/st-patricks-tower.jpg",
    span: "col-span-1 row-span-1",
  },
  {
    id: 8,
    type: "image",
    title: "Christ Church Cathedral",
    desc: "Medieval cathedral, one of Dublin's oldest and most iconic buildings.",
    longDesc:
      "Founded in 1028 and standing at the heart of medieval Dublin, with one of the largest crypts in Britain and Ireland. Climb the belfry to ring the bells, and look out for the mummified cat and rat immortalised in James Joyce's 'Finnegans Wake'.",
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
