import Image from "next/image";
import Link from "next/link";

export default function Wedding() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-pink-50 to-pink-100">
      <div className="text-center p-6 max-w-3xl">
        {/* Heading */}
        <h1 className="text-4xl md:text-5xl font-extrabold text-red-600 mb-2">
          WEDDING SEASON
        </h1>
        <p className="text-gray-600 mb-6">
          Make Your Wedding Memorable with Our Luxury And Affordable Cars.
        </p>

        {/* Car Image */}
        <div className="relative w-full h-72 sm:h-96 mx-auto mb-6">
          <Image
            src="/images/thumb3.jpg"
            alt="Wedding Car"
            layout="fill"
            objectFit="contain"
            className="drop-shadow-lg"
          />
        </div>

        {/* Car Types */}
        <p className="text-red-600 font-medium mb-4">
          Car | Jeep | Hiace | Bus
        </p>

        {/* Button */}
        <Link href="#form">
          <button className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-6 rounded-full transition duration-300 shadow-md">
            BOOK NOW !
          </button>
        </Link>
      </div>
    </div>
  );
}
