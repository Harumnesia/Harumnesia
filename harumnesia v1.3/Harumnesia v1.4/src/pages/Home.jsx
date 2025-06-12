import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import ContentSection from "../components/ContentSection";
import FeaturesSection from "../components/FeaturesSection";
import RecomSection from "../components/RecomSection";
import Footer from "../components/Footer";

const Home = () => {
  return (
    <>
      <Navbar />
      <Hero />
      <FeaturesSection />
      <ContentSection />
      <RecomSection />
      <Footer />
    </>
  );
};

export default Home;
