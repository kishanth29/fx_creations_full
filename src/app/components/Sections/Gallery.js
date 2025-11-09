"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";

export default function GalleryPage() {
  const [images, setImages] = useState([]);

  // Default layout classes for 6 images
  const layoutClasses = [
    "col-span-2 md:h-[18rem]", // first image
    "col-start-3 row-start-1 md:h-[18rem]", // second
    "row-span-2 col-start-1 row-start-2 md:h-[40.7rem]", // third
    "col-span-2 col-start-2 row-start-2 md:h-[18rem]", // fourth
    "col-start-2 row-start-3 md:h-[22rem]", // fifth
    "col-start-3 row-start-3 md:h-[22rem]", // sixth
  ];

  useEffect(() => {
    const fetchThirdAlbumImages = async () => {
      try {
        const res = await fetch(
          "https://backend.fxcreationstudio.com/api/albums-with-images"
        );
        const data = await res.json();

        if (data.status === "success" && data.data.length > 0) {
          const uniqueAlbumIds = [
            ...new Set(data.data.map((img) => img.album_id)),
          ];
          if (uniqueAlbumIds.length >= 3) {
            const thirdAlbumId = uniqueAlbumIds[2];
            const thirdAlbumImages = data.data
              .filter((img) => img.album_id === thirdAlbumId)
              .slice(0, 6);

            const formattedImages = thirdAlbumImages.map((img, index) => ({
              src: img.image_path,
              classes: layoutClasses[index] || "md:h-[18rem]", // keep layout classes
            }));

            setImages(formattedImages);
          }
        }
      } catch (err) {
        console.error("Failed to fetch third album images:", err);
      }
    };

    fetchThirdAlbumImages();
  }, []);

  // Fallback to default static images if fetch fails
  const defaultImages = [
    { src: "/images/gallery1.jpg", classes: layoutClasses[0] },
    { src: "/images/gallery8.jpg", classes: layoutClasses[1] },
    { src: "/images/gallery6.jpg", classes: layoutClasses[2] },
    { src: "/images/gallery9.jpg", classes: layoutClasses[3] },
    { src: "/images/gallery5.jpg", classes: layoutClasses[4] },
    { src: "/images/gallery10.jpg", classes: layoutClasses[5] },
  ];

  const displayImages = images.length > 0 ? images : defaultImages;

  return (
    <div className="md:min-h-screen min-h-[60vh] p-6 md:mb-30">
      {/* Header Section */}
      <div className="text-start max-w-2xl mx-auto mb-10 md:ml-[34rem]">
        <h1 className="text-4xl font-bold text-gray-800 mb-3">
          Journey Through Our Gallery
        </h1>
        <p className="text-gray-600 text-lg">
          Immerse yourself in the captivating world of photography.
        </p>
      </div>

      {/* Gallery Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 md:grid-rows-3 md:gap-8 gap-1 max-w-7xl mx-auto h-auto md:h-[120vh]">
        {displayImages.map((img, index) => (
          <div key={index} className={`${img.classes} p-1`}>
            <Image
              src={img.src}
              alt={`Gallery Image ${index + 1}`}
              width={1000}
              height={1000}
              className="w-full h-full object-cover rounded-2xl"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
