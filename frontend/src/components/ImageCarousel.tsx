"use client";
import { motion } from "framer-motion";
import React from "react";
import { ImagesSlider } from "../components/ui/images-slider";

export default function ImageCarousel() {
  const images = [
    "https://hips.hearstapps.com/digitalspyuk.cdnds.net/18/14/1522924460-avengers-infinity-war-poster.jpg?crop=1xw:1.0xh;center,top&resize=1200:*",
    "https://sm.mashable.com/t/mashable_in/photo/default/interstellar_ty84.1248.jpg",
    "https://images.thedirect.com/media/article_full/dune-two.jpg",
    "https://static.toiimg.com/imagenext/toiblogs/photo/blogs/wp-content/uploads/2023/07/ss_col_3c-1.jpg"
  ];
  return (
   <div className="p-[40px]">
     <ImagesSlider className="h-[40rem]" images={images}>
      <motion.div
        initial={{
          opacity: 0,
          y: -80,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 0.6,
        }}
        className="z-50 flex flex-col justify-center items-center"
      >
        <motion.p className="font-bold text-xl md:text-6xl text-center bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400 py-4">
        Your Gateway to Cinematic Adventures <br /> Discover, Watch, Connect
        </motion.p>
        <button className="px-4 py-2 backdrop-blur-sm border bg-emerald-300/10 border-emerald-500/20 text-white mx-auto text-center rounded-full relative mt-4">
          <span>Watch now →</span>
          <div className="absolute inset-x-0  h-px -bottom-px bg-gradient-to-r w-3/4 mx-auto from-transparent via-emerald-500 to-transparent" />
        </button>
      </motion.div>
    </ImagesSlider>
   </div>
  );
}
