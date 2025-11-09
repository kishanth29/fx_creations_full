"use client";
import { FaFacebookF, FaInstagram } from "react-icons/fa";

export default function FloatingSocialButton() {
  return (
    <div className="fixed bottom-5 right-5 flex flex-col items-end gap-3 z-50">
      <a
        href="https://www.facebook.com/p/FX-creation-Studio-100069234291790/"
        target="_blank"
        rel="noopener noreferrer"
        className="bg-white p-4 rounded-full shadow-lg hover:scale-110 transition"
      >
        <FaFacebookF size={24} className="text-[#1877F2]" />
      </a>
      <a
        href="https://www.instagram.com/fx_creation_studio/p/DDMMzxwTodL/"
        target="_blank"
        rel="noopener noreferrer"
        className="bg-white p-4 rounded-full shadow-lg hover:scale-110 transition"
      >
        <FaInstagram size={24} className="text-[#E1306C]" />
      </a>
    </div>
  );
}
