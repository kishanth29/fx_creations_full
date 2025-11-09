"use client";
import React, { useEffect, useState } from "react";

export default function HeroSection() {
  const [imageSrc, setImageSrc] = useState("/images/experience.jpg"); // default fallback

  useEffect(() => {
    const fetchSecondAlbumImage = async () => {
      try {
        const res = await fetch(
          "https://backend.fxcreationstudio.com/api/albums-with-images"
        );
        const data = await res.json();

        if (data.status === "success" && data.data.length > 0) {
          // Get second album_id
          const uniqueAlbumIds = [
            ...new Set(data.data.map((img) => img.album_id)),
          ];
          if (uniqueAlbumIds.length >= 2) {
            const secondAlbumId = uniqueAlbumIds[1];

            // Filter first image of second album
            const secondAlbumImages = data.data.filter(
              (img) => img.album_id === secondAlbumId
            );

            if (secondAlbumImages.length > 0) {
              setImageSrc(secondAlbumImages[0].image_path);
            }
          }
        }
      } catch (err) {
        console.error("Failed to fetch second album image:", err);
      }
    };

    fetchSecondAlbumImage();
  }, []);

  return (
    <section className="min-h-[60vh] flex items-center justify-around px-6 py-12">
      <div className="grid grid-cols-1 md:flex gap-6 max-w-7xl w-full items-stretch">
        {/* Left Column - 4 Boxes */}
        <div className="hidden md:flex flex-col justify-around gap-1 ">
          <div className="w-16 h-16 rounded-xl overflow-hidden">
            <img
              src={imageSrc}
              className="w-full h-full object-contain object-[200%_0%] scale-499"
            />
          </div>
          <div className="w-36 h-29 rounded-xl overflow-hidden">
            <img
              src={imageSrc}
              className="w-full h-full object-cover object-[0%_31%] scale-328"
            />
          </div>
          <div className="w-36 h-20 rounded-xl overflow-hidden">
            <img
              src={imageSrc}
              className="w-full h-full object-cover object-[190%_0%] scale-200"
            />
          </div>
          <div className="w-16 h-16 rounded-xl overflow-hidden ml-[5rem]">
            <img
              src={imageSrc}
              className="w-full h-full object-cover object-[0%_170%] scale-260"
            />
          </div>
        </div>

        {/* Middle Column - One Big Image */}
        <div className="h-full md:flex items-center justify-start">
          <div className="w-full md:w-[25%] h-[500px] sm:h-[400px] xs:h-[300px] rounded-xl overflow-hidden">
            <img
              src={imageSrc}
              className="w-full h-full object-cover md:object-[170%_99%] md:scale-167"
            />
          </div>

          {/* Right Column - Text + Button */}
          <div className="justify-center h-full md:ml-[7rem] ml-0 mt-9 md:mt-0">
            <p className="text-red-600 font-semibold text-sm mb-2 uppercase">
              Immortalize Your Memories
            </p>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 leading-tight mb-4">
              Experience Photography
              <br />
              Like Never Before
            </h1>
            <p className="text-gray-600 mb-6 max-w-md">
              With our state-of-the-art equipment and artistic vision, we
              transform ordinary moments into extraordinary memories. Our
              talented photographers...
            </p>
            <button className="bg-red-600 hover:bg-red-700 text-white px-6 md:mt-[5rem] mt-0 py-4 rounded-md text-sm font-medium">
              Explore Our Portfolio →
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
