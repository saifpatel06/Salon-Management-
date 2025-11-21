import React from "react";
import SalonHeader from "../src/components/SalonHeader";
import AboutSection from "../src/components/AboutSection";
import ServicesSection from "../src/components/ServicesSection";
import PricingSection from "../src/components/PricingSection";
import ContactSection from "../src/components/ContactSection";
import AppointmentAI from "../src/components/AppointmentAI";


const Salon = () => {
  return (
    <div className="container py-4">
      <SalonHeader />
      <AboutSection />
      <ServicesSection />
      <PricingSection />
      <AppointmentAI />
      <ContactSection />
    </div>
  );
};

export default Salon;
