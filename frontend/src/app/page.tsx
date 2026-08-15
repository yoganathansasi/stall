import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import BrandIntro from "@/components/BrandIntro";
import BeveragesBites from "@/components/BeveragesBites";
import GroceryHighlights from "@/components/GroceryHighlights";
import WhyChooseUs from "@/components/WhyChooseUs";
import Reviews from "@/components/Reviews";
import LocationContact from "@/components/LocationContact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      {/* Navigation Header */}
      <Navbar />

      {/* Main Content Layout */}
      <main>
        {/* Hero Banner Section */}
        <Hero />

        {/* Story & Legacy Intro */}
        <BrandIntro />

        {/* Brewed & Bites Menu */}
        <BeveragesBites />

        {/* Maligai provisions highlights */}
        <GroceryHighlights />

        {/* Value Propositions / Why Us */}
        <WhyChooseUs />

        {/* Customer Review masonry details */}
        <Reviews />

        {/* Directions, Contact Form, maps */}
        <LocationContact />
      </main>

      {/* Footer Details */}
      <Footer />
    </>
  );
}
