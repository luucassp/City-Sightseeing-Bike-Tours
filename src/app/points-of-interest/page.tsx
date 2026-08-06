import PageHeroBand from "@/components/PageHeroBand";
import Stops from "@/components/Stops";

const bannerPhotos = [
  { id: 1, url: "/tour-photos/dublin-castle-record-tower.jpg", title: "Dublin Castle" },
  { id: 2, url: "/tour-photos/st-patricks-cathedral-view.jpg", title: "St Patrick's Cathedral" },
  { id: 3, url: "/tour-photos/guinness-storehouse-gate.jpg", title: "Guinness Storehouse" },
  { id: 4, url: "/tour-photos/imma-royal-hospital-gardens.jpg", title: "IMMA / Royal Hospital" },
  { id: 5, url: "/tour-photos/group-photo-kilmainham.jpg", title: "Kilmainham Gaol" },
  { id: 6, url: "/tour-photos/christ-church-cathedral.jpg", title: "Christ Church Cathedral" },
  { id: 7, url: "/tour-photos/guide-portrait-castle.jpg", title: "Your Guide" },
  { id: 8, url: "/tour-photos/riding-through-dublin.jpg", title: "On the Route" },
];

export default function PointsOfInterestPage() {
  return (
    <div>
      <PageHeroBand
        kicker="Dublin · 8 Historic Stops"
        title={
          <>
            Points of <span className="text-brand-gold">Interest</span>
          </>
        }
        subtitle="Every stop on the route has a story — from a Norman castle to the world's most famous pint."
        photos={bannerPhotos}
      />

      <Stops />
    </div>
  );
}
