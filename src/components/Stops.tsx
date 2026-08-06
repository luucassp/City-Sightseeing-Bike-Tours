import InteractiveBentoGallery, {
  MediaItem,
} from "@/components/blocks/interactive-bento-gallery";
import BookingButton from "@/components/BookingButton";
import RouteMap from "@/components/RouteMap";
import { getPointsOfInterest } from "@/lib/points-of-interest";

// Grid layout is a design concern, not marketing content, so it stays
// keyed by id here rather than living in the points_of_interest table.
const SPAN_BY_ID: Record<number, string> = {
  1: "col-span-2 row-span-2",
  2: "col-span-1 row-span-1",
  3: "col-span-1 row-span-2",
  4: "col-span-2 row-span-1",
  5: "col-span-1 row-span-1",
  6: "col-span-1 row-span-1",
  7: "col-span-1 row-span-1",
  8: "col-span-2 md:col-span-4 row-span-1",
};

export default async function Stops() {
  const points = await getPointsOfInterest();

  const stops: MediaItem[] = points.map((point) => ({
    id: point.id,
    type: "image",
    title: point.title,
    desc: point.shortDesc,
    longDesc: point.longDesc,
    url: point.imageUrl,
    span: SPAN_BY_ID[point.id] ?? "col-span-1 row-span-1",
  }));

  return (
    <section className="bg-gray-50 py-16">
      <InteractiveBentoGallery
        mediaItems={stops}
        title="Main Stops of the Tour"
        description="Click on a photo to explore each stop in detail."
      />
      <RouteMap points={points} />

      <div className="mt-10 text-center">
        <BookingButton />
      </div>
    </section>
  );
}
