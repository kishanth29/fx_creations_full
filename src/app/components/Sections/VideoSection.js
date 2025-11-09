"use client";

import React, { useEffect, useState } from "react";

// Helper function to convert YouTube URLs to embed format
const convertToEmbedUrl = (url) => {
  try {
    const regexShort = /youtu\.be\/([^\?]+)/;
    const regexFull = /youtube\.com\/watch\?v=([^\&]+)/;

    let videoId = "";

    if (regexShort.test(url)) {
      videoId = url.match(regexShort)[1];
    } else if (regexFull.test(url)) {
      videoId = url.match(regexFull)[1];
    }

    return `https://www.youtube.com/embed/${videoId}`;
  } catch {
    return url; // fallback
  }
};

// Video Card Component
const VideoCard = ({ videoData }) => {
  return (
    <div className="min-w-[300px] md:min-w-[400px] snap-start rounded-xl overflow-hidden shadow hover:shadow-lg transition duration-300 transform hover:scale-105 bg-white">
      <iframe
        src={convertToEmbedUrl(videoData.video_url)} // Convert to embed URL
        className="w-full h-56 sm:h-64 md:h-72"
        frameBorder="0"
        allowFullScreen
      ></iframe>
      {videoData.description && (
        <p className="p-2 text-gray-700 text-sm">{videoData.description}</p>
      )}
    </div>
  );
};

// Main Video Section Component
const VideoSection = () => {
  const [videos, setVideos] = useState([]);

  // Fetch videos from API
  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const res = await fetch(
          "https://backend.fxcreationstudio.com/api/public/videos"
        );
        const data = await res.json();
        setVideos(data);
      } catch (error) {
        console.error("Error fetching videos:", error);
      }
    };

    fetchVideos();
  }, []);

  return (
    <main className="px-4 md:px-8 py-10">
      {/* Title */}
      <div className="text-center mb-8">
        <h2 className="text-3xl sm:text-4xl font-bold text-gray-800">
          Discover Our Featured Wedding Videos
        </h2>
        <p className="text-gray-600 mt-2 text-sm sm:text-base">
          Handpicked wedding moments from cities around the world. Explore and
          enjoy!
        </p>
      </div>

      {/* Horizontal scrollable area with scrollbar hidden */}
      <div className="flex gap-6 overflow-x-auto snap-x snap-mandatory px-1 custom-scrollbar">
        {videos.length > 0 ? (
          videos.map((video, index) => (
            <VideoCard key={index} videoData={video} />
          ))
        ) : (
          <p className="text-center w-full text-gray-500">Loading videos...</p>
        )}
      </div>

      {/* Inline CSS to hide scrollbar */}
      <style jsx>{`
        .custom-scrollbar {
          scrollbar-width: none; /* Firefox */
          -ms-overflow-style: none; /* IE and Edge */
        }

        .custom-scrollbar::-webkit-scrollbar {
          display: none; /* Chrome, Safari */
        }
      `}</style>
    </main>
  );
};

export default VideoSection;
