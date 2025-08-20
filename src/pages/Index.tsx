import Header from "@/components/Header";
import Hero from "@/components/Hero";
import VehicleShowcase from "@/components/VehicleShowcase";
import PricingSection from "@/components/PricingSection";
import Registration from "@/components/Registration";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Hero />
      <VehicleShowcase />
      <PricingSection />
      <Registration />
      <Footer />
    </div>
  );
};

export default Index;
