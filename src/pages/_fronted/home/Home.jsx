import FAQAccordion from "@/components/home/FAQAccordion";
import Banner from "@/components/Banner";
import StatsCards from "@/components/home/StatsCards";
import TopNotice from "@/components/home/TopNotice";
import ContactUs from "@/components/home/ContactUs";
import ShortageTicker from "./homeSections/ShortageTicker";
import Hero from "./homeSections/Hero";
import UrgentNearYou from "./homeSections/UrgentNearYou";
import PartnersTestimonials from "./homeSections/PartnersTestimonials";
import BlogHighlights from "./homeSections/BlogHighlights";
import FaqStrip from "./homeSections/FaqStrip";
import LiveImpact from "./homeSections/LiveImpact";
import SafetyEligibility from "./homeSections/SafetyEligibility";

const Home = () => {
  return (
    <>
      <Banner></Banner>
      {/* <StatsCards/> */}
      <ShortageTicker sticky/>
      <Hero/>
      {/* <UrgentNearYou/> */}
      {/* <PartnersTestimonials/> */}
      <BlogHighlights/>
      <FaqStrip/>
      <SafetyEligibility/>

      <LiveImpact/>
      <FAQAccordion/>
      <ContactUs/>  

    </>
  );
};

export default Home;
