"use client";
import React, { useState } from "react";

const expertiseData = [
  { imgSrc: "/images/map.jpg", title: "Map" },
  { imgSrc: "/images/thumb2.jpg", title: "Culture" },
  { imgSrc: "/images/thumb1.jpg", title: "Personality" },
  { imgSrc: "/images/thumb2.jpg", title: "Step 4" },
  { imgSrc: "/images/thumb1.jpg", title: "Step 5" },
  { imgSrc: "/images/thumb2.jpg", title: "Step 6" },
];

export default function ExpertiseSection() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % (expertiseData.length / 3));
  };

  const handlePrevious = () => {
    setCurrentIndex(
      (prev) =>
        (prev - 1 + expertiseData.length / 3) % (expertiseData.length / 3)
    );
  };

  const displayedImages = expertiseData
    .sort((a, b) => a.title.localeCompare(b.title))
    .slice(currentIndex * 3, currentIndex * 3 + 3);

  const progressPercentage = (currentIndex + 1) * 50; // 0%, 50%, 100%

  return (
    <div className="bg-pink-50 p-4 md:p-1 md:py-13 max-w-7xl mx-auto">
      <h1 className="text-xl md:text-3xl font-bold mb-4 text-gray-600 text-center md:text-left">
        Your Vision, Our Expertise
      </h1>

      <p className="mb-6 text-gray-600 text-sm md:text-base text-center md:text-left">
        At Capture Studio, we understand that <br />
        every client has unique needs and desires. <br />
        That’s why we collaborate closely with you, <br />
        ensuring that your vision is brought to life.
      </p>

      <div className="flex justify-center md:justify-start">
        <button className="bg-red-500 text-white px-3 py-1 md:px-4 md:py-2 rounded mb-4 md:mb-8">
          Request a Consultation
        </button>
      </div>

      {/* Grid of images and titles */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 md:gap-43 gap-4">
        {displayedImages.map((image, idx) => (
          <div
            key={idx}
            className={`transform transition-all duration-300 ${
              idx % 3 === 1 ? "md:-mt-23" : idx % 3 === 2 ? "md:-mt-47" : ""
            }`}
          >
            <div className="w-full flex flex-col items-center">
              <img
                src={image.imgSrc}
                alt={image.title}
                className="rounded-lg mb-2 w-[250px] h-[250px] sm:w-full sm:h-[360px] object-cover"
              />
              <h2 className="text-md md:text-lg font-semibold text-center text-gray-600">
                {image.title}
              </h2>
            </div>
          </div>
        ))}
      </div>

      {/* Progress and navigation */}
      <div className="flex justify-end items-center mt-4 gap-2">
        <div
          className="w-1/4 md:w-1/3 bg-gray-300 rounded-full h-1 cursor-pointer"
          onClick={(e) => {
            const { left, width } = e.currentTarget.getBoundingClientRect();
            const clickX = e.clientX - left;
            const newIndex = clickX < width / 2 ? 0 : 1;
            setCurrentIndex(newIndex);
          }}
        >
          <div
            className="bg-blue-500 h-1 rounded-full transition-all duration-300"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>

        <button
          onClick={handlePrevious}
          className="text-blue-500 text-sm md:text-base"
        >
          &lt; Prev
        </button>
        <button
          onClick={handleNext}
          className="text-blue-500 text-sm md:text-base"
        >
          Next &gt;
        </button>
      </div>
    </div>
  );
}
