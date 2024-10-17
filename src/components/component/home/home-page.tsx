import React, { useState } from "react";
import { HeaderComponent } from "./header";
import { FooterComponent } from "./footer";
import Hero from "./hero";
import WorksComponent from "./works";
import Beneficios from "./beneficios";
import PropertyTypes from "./descubre";
import { HeroSectionComponent } from "./hero-section";
import { OpinionesUsuariosCard } from "@/components/opiniones";


const images = [
  "/canchababy.jpg?height=1600&width=1200",
  "/canchabasket.jpg?height=1600&width=1200",
]

const Home = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const [currentIndex, setCurrentIndex] = React.useState(0)

  const prevSlide = () => {
    const isFirstSlide = currentIndex === 0
    const newIndex = isFirstSlide ? images.length - 1 : currentIndex - 1
    setCurrentIndex(newIndex)
  }

  const nextSlide = () => {
    const isLastSlide = currentIndex === images.length - 1
    const newIndex = isLastSlide ? 0 : currentIndex + 1
    setCurrentIndex(newIndex)
  }

  return (
    <div>
      <HeaderComponent />
      {/* Carrito de Compras (Aun no) */}
      <Hero />
      <br />
      <br />
      <br />
      <PropertyTypes />
      <OpinionesUsuariosCard
        courtName="Cancha Central Fútbol"
        courtImage="https://sdhopbvwmexqitualize.supabase.co/storage/v1/object/public/canchas/0.004778225623510712-canchababy.jpg"
        courtLocation="Buenos Aires, Argentina"
        clientName="Carlos Rodríguez"
        clientAvatar="https://sdhopbvwmexqitualize.supabase.co/storage/v1/object/public/canchas/0.004778225623510712-canchababy.jpg"
        comment="Excelente cancha, el césped está en perfectas condiciones."
        rating={5}
      />
      <br />
      <br />
      <HeroSectionComponent />
      <WorksComponent />
      <Beneficios />
      <br />

      <FooterComponent />

    </div>
  );
};

export default Home;
