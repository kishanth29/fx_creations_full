import Image from "next/image";
import Hero from "./components/Sections/Hero";
import CreativitySection from "./components/Sections/CreativitySection";

import ExpertiseSection from "./components/Sections/ExpertiseSection";
import StudioLayout from "./components/Sections/StudioLayout";
import GalleryPage from "./components/Sections/Gallery";
import HeroSection from "./components/Sections/Experience";
import Expertise from "./components/Sections/expect";
import MakeupSection from "./components/Sections/MakeupSection";
import VideoSection from "./components/Sections/VideoSection";
import Wedding from "./components/Sections/wedding";
import ContactForm from "./components/Sections/ContactForm";
import FloatingSocialButton from "./components/Sections/FloatingSocialButton";
import ReviewsForm from "./components/Sections/page";
export default function Home() {
  return (
    <div>
      <FloatingSocialButton />
      <div className="heros-section">
        <Hero />
      </div>
      <div className="experience-section">
        <HeroSection />
      </div>
      <div className="explore-section">
        <Expertise />
      </div>
      <div className="makeup-section" id="services">
        <MakeupSection />
      </div>
      <div className="carRent-section">
        <Wedding />
      </div>
      <div className="creativity-section">
        <CreativitySection />
      </div>
      <div className="vision-section" id="about">
        <ExpertiseSection />
      </div>
      <div className="gallery-section" id="portfolio">
        <GalleryPage />
      </div>
      <div className="video-section ">
        <VideoSection />
      </div>

      <div className="explore-section">
        <StudioLayout />
      </div>
      <div className="contact-form" id="form">
        <ContactForm />
      </div>
    </div>
  );
}
