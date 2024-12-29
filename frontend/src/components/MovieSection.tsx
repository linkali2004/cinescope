"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { Carousel, Card } from "../components/ui/apple-cards-carousel";

type Card = {
  src: string;
  title: string;
  category: string;
  content: React.ReactNode;
};

const DummyContent = ({ plot,src }: { plot: string,src:string }) => {
  return (
    <div className="bg-[#F5F5F7] dark:bg-neutral-800 p-8 md:p-14 rounded-3xl mb-4">
      <p className="text-neutral-600 dark:text-neutral-400 text-base md:text-2xl font-sans max-w-3xl mx-auto">
        <span className="font-bold text-neutral-700 dark:text-neutral-200">
          {plot}
        </span>
      </p>
      <Image
        src={src}
        alt="Macbook mockup from Aceternity UI"
        height={500}
        width={500}
        className="md:w-1/2 md:h-1/2 h-full w-full mx-auto object-contain"
      />
    </div>
  );
};

export default function MovieSection({genre}:{genre:string}) {
  const [cardData, setCardData] = useState<Card[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const res = await fetch(`http://localhost:8000/genres/${genre}`,{cache:"force-cache"});
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        const data = await res.json();
        const structuredData = data.map((ele: any) => ({
          category: ele.year,
          title: ele.title,
          src: ele.poster,
          content: <DummyContent plot={ele.plot} src={ele.poster} />,
        }));
        setCardData(structuredData);
      } catch (error:any) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  const cards = cardData.map((card, index) => (
    <Card key={card.src} card={card} index={index} />
  ));

  return (
    <div className="w-full h-full py-20">
      <h2 className="max-w-7xl pl-4 mx-auto text-xl md:text-5xl font-bold text-[#171717] dark:text-neutral-200 font-sans">
        {genre}
      </h2>
      <Carousel items={cards} />
    </div>
  );
}
