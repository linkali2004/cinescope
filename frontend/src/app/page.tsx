import ImageCarousel from "@/components/ImageCarousel";
import MovieSection from "@/components/MovieSection";
import Navbar from "@/components/Navbar";
import Image from "next/image";

export default function Home() {
  return (
    <>
        <Navbar></Navbar>
        <ImageCarousel></ImageCarousel>
        <MovieSection genre="Action"></MovieSection>
        <MovieSection genre="Drama"></MovieSection>
        <MovieSection genre="Romance"></MovieSection>
    </>
  );
}
