"use client";
import Image from "next/image";
import CountUp from "react-countup";

const stats = [
  { value: 550, suffix: "+", label: "Happy Clients" },
  { value: 38, suffix: "+", label: "Awards Won" },
  { value: 9000, suffix: "+", label: "Captured Events" },
];

export default function CreativitySection() {
  return (
    <section className="min-h-[70vh] py-16 px-4 md:px-5 flex flex-col md:flex-row items-center justify-center gap-16">
      {/* Image Collage */}
      <div className="w-full bg-pink-100 p-2 md:p-0 md:mr-12">
        <div className="relative grid grid-cols-1 md:grid-cols-5 grid-rows-4 md:p-6 md:ml-22 md:grid-rows-2 gap-5 w-full md:h-[60vh]">
          {/* Image2 placed inside the L-cutout */}
          <div className="absolute hidden md:block left-[11.7rem] top-[15rem] w-[8rem] h-[11.4rem] xl:left-[15.5rem] xl:top-[19rem] xl:w-[12rem] xl:h-[15.7rem]">
            <Image
              src="/img1.jpg"
              alt="img2"
              width={200}
              height={200}
              className="w-full h-full object-cover rounded-lg"
            />
          </div>
          <div className="relative rounded-xl overflow-hidden md:col-span-2 md:row-span-2 md:[clip-path:polygon(0%_0%,100%_0%,100%_50%,50%_50%,50%_100%,0%_100%)]">
            {/* Background image (L-shape) */}
            <Image
              src="/img1.jpg"
              alt="img1"
              width={400}
              height={400}
              className="w-full h-full object-cover"
            />

            {/* Image2 placed inside the L-cutout */}
            <div className="absolute z-50">
              <Image
                src="/img1.jpg"
                alt="img2"
                width={200}
                height={200}
                className="w-full h-full object-cover rounded-lg"
              />
            </div>
          </div>

          <div className="rounded-xl overflow-hidden md:col-start-3 md:row-span-2">
            <Image
              src="/img1.jpg"
              alt="img2"
              width={200}
              height={400}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="rounded-xl overflow-hidden md:col-start-4">
            <Image
              src="/img1.jpg"
              alt="img3"
              width={150}
              height={200}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="rounded-xl overflow-hidden md:col-start-4 md:row-start-2">
            <Image
              src="/img1.jpg"
              alt="img4"
              width={150}
              height={200}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>

      {/* Text Content */}
      <div className="max-w-xl text-center md:text-left flex flex-col justify-center">
        <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6 leading-tight">
          Unmatched <br /> Creativity
        </h2>
        <p className="text-gray-600 mb-8 text-base md:text-lg md:mb-[13rem]">
          With over 10 years of experience, we have captured countless moments
          and crafted stunning visuals. Our team&apos;s dedication and passion
          have led to numerous awards and...
        </p>

        <div className="flex flex-wrap justify-center md:justify-start gap-8">
          {stats.map((stat, i) => (
            <div key={i}>
              <p className="text-3xl font-bold text-gray-800">
                <CountUp end={stat.value} duration={2.5} suffix={stat.suffix} />
              </p>
              <p className="text-gray-600 text-sm">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
