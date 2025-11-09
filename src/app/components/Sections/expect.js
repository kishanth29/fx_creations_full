import Image from "next/image";

const expertiseData = [
  {
    title: "Professional editing",
    description: "Your creativity our inspiration.\nWhat ever your want",
    image: "/img2.jpg",
  },
  {
    title: "Long hour shoots",
    description: "Your creativity our inspiration.\nWhat ever your want",
    image: "/img2.jpg",
  },
  {
    title: "Extensive equipment",
    description: "Your creativity our inspiration.\nWhat ever your want",
    image: "/img2.jpg",
  },
];

export default function Expertise() {
  return (
    <section className="py-1 pb-[66]">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-12">
          Explore Our Expertise
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {expertiseData.map((item, index) => (
            <div key={index} className="flex flex-col items-center text-center">
              <div className="w-16 h-16 mb-4">
                <Image
                  src={item.image}
                  alt={item.title}
                  width={64}
                  height={64}
                  className="object-contain rounded"
                />
              </div>
              <h3 className="font-semibold text-lg text-gray-800">
                {item.title}
              </h3>
              <p className="text-gray-600 text-sm mt-2">
                {item.description.split("\n").map((line, i) => (
                  <span key={i}>
                    {line}
                    <br />
                  </span>
                ))}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
