import Navbar from "../components/Navbar";
import HeroSection from "../components/HeroSection";
import Highlights from "../components/Highlights";
import Statistics from "../components/Statistics";
import LandingClient from "../components/LandingClient"; // 👈 Komponen klien terpisah

export default function LandingPage() {
  return (
    <main className="bg-black text-white font-sans scroll-smooth">
      <Navbar />
      <section id="about"><HeroSection /></section>
      <section id="highlights"><Highlights /></section>
      <section id="statistics"><Statistics /></section>
      <LandingClient /> 
    </main>
  );
}
