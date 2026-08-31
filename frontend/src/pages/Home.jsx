import HeroSection from "../components/home/HeroSection";
import LifecycleStrip from "../components/home/LifecycleStrip";
import ProductPassportPreview from "../components/home/ProductPassportPreview";
import HealthRecommendation from "../components/home/HealthRecommendation";
import RepairNetworkPreview from "../components/home/RepairNetworkPreview";
import ResalePreview from "../components/home/ResalePreview";
import EndOfLifeSection from "../components/home/EndOfLifeSection";
import FinalCTA from "../components/home/FinalCTA";

function Home() {
  return (
    <main>
      <HeroSection />

      <LifecycleStrip />

      <ProductPassportPreview />

      <HealthRecommendation />

      <RepairNetworkPreview />

      <ResalePreview />

      <EndOfLifeSection />

      <FinalCTA />
    </main>
  );
}

export default Home;