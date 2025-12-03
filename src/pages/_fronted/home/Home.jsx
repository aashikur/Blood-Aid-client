import FAQAccordion from "@/components/home/FAQAccordion";
import Banner from "@/components/Banner";
import ContactUs from "@/components/home/ContactUs";
import ShortageTicker from "./homeSections/ShortageTicker";
import BlogHighlights from "./homeSections/BlogHighlights";
import LiveImpact from "./homeSections/LiveImpact";
import SafetyEligibility from "./homeSections/SafetyEligibility";
import Home2 from "@/components/Home2";

const Home = () => {
  return (
    <>
      <Banner />
      <ShortageTicker/>
      <LiveImpact />
      <SafetyEligibility />
      <BlogHighlights />
      <FAQAccordion />
      <ContactUs />
      {/* <Home2/> */}
    </>
  );
};

export default Home;
