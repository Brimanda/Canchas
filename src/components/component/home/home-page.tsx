import { Eye, Link, Target } from "lucide-react";
import React, { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Logo from "./Logo";
import { HeaderComponent } from "./header";
import { AboutUsComponent } from "./about-us";
import { FooterComponent } from "./footer";
import Hero from "./hero";
import WorksComponent from "./works";
import Beneficios from "./beneficios";
import PropertyTypes from "./descubre";
import { HeroSectionComponent } from "./hero-section";


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
      <HeaderComponent/>
      {/* Carrito de Compras (Aun no) */}
      {/* Carousel */}
      <Hero/>
      <br />
      <br />

      {/* Sección Ultimas Añadidas */}
      <WorksComponent/>

      <PropertyTypes/>

      {/* Sección Canchas Deportivas */}
      <Beneficios/>

      {/* Sección Sobre Nosotros */}
      
      <HeroSectionComponent/>

      <br />

      {/* Footer */}
      <FooterComponent />

    </div>
  );
};

export default Home;
