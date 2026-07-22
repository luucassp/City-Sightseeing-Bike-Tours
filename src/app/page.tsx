import Hero from "@/components/Hero";
import PricingCards from "@/components/PricingCards";
import MeetingPointNotice from "@/components/MeetingPointNotice";
import Stops from "@/components/Stops";
import Testimonials from "@/components/Testimonials";
import OpeningHours from "@/components/OpeningHours";
import FindUs from "@/components/FindUs";
import ContactCTA from "@/components/ContactCTA";

export default function HomePage() {
  return (
    <>
      <Hero />
      <PricingCards />
      <MeetingPointNotice />
      <Stops />
      <Testimonials />
      <OpeningHours />
      <FindUs />
      <ContactCTA />
    </>
  );
}
