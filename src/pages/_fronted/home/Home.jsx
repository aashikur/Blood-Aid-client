import FAQAccordion from "@/components/home/FAQAccordion";
import Banner from "@/components/Banner";
import StatsCards from "@/components/home/StatsCards";
import TopNotice from "@/components/home/TopNotice";
import ContactUs from "@/components/home/ContactUs";

const Home = () => {
  return (
    <>
      <Banner></Banner>
      <StatsCards/>
      <FAQAccordion/>
      <ContactUs/>  

    </>
  );
};

export default Home;
