import Image from "next/image";

export default function StudioHeroSection() {
  return (
    <section className="bg-[#d51317] text-white rounded-[50px] p-6 md:p-10 lg:p-16 w-full max-w-full xl:max-w-[90rem] 2xl:max-w-[96rem] mx-auto my-10 relative overflow-visible">
      <div className="flex flex-col md:flex-row gap-8 items-start md:h-[50vh]">
        {/* Text Section */}
        <div className="flex-1 z-10 md:mt-[5rem]">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 leading-tight">
            Step Into Our World
          </h1>
          <p className="text-white text-base sm:text-lg mb-8 max-w-md">
            Explore our studio like never before with our cutting-edge 3D
            visualization. Take a virtual tour and experience the ambiance,
            creativity, and tech.
          </p>
          <button className="bg-white text-[#d51317] font-medium px-5 py-3  rounded-xl flex items-center gap-3 shadow-md hover:shadow-lg transition-shadow text-sm sm:text-base">
            Explore Our Studio
            <span className="bg-[#d51317] rounded-full p-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </span>
          </button>
        </div>

        {/* Mobile View  */}
        <div className="md:hidden flex-1 grid grid-cols-2 grid-rows-2 gap-4 w-full relative">
          {/* Image 1 */}
          <div className="rounded-xl overflow-hidden">
            <Image
              src="/img1.jpg"
              alt="Studio View 1"
              width={600}
              height={600}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Image 2 — normal on mobile, shifted on md+ */}
          <div className="rounded-xl overflow-hidden relative md:absolute md:top-0 md:right-[-2rem] md:w-[calc(50%-0.5rem)] z-20">
            <Image
              src="/img1.jpg"
              alt="Studio View 2"
              width={600}
              height={600}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Image 3 */}
          <div className="rounded-xl overflow-hidden">
            <Image
              src="/img1.jpg"
              alt="Studio View 3"
              width={600}
              height={600}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Image 4 */}
          <div className="rounded-xl overflow-hidden">
            <Image
              src="/img1.jpg"
              alt="Studio View 4"
              width={600}
              height={600}
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Image Section container  desktop*/}
        <div className="hidden md:block flex-1 relative w-full h-[500px]">
          {/* Image 1 */}
          <div className="rounded-xl overflow-hidden md:absolute md:top-0 md:left-31 md:w-[40%] md:h-[18.4rem]">
            <Image
              src="/img1.jpg"
              alt="Studio View 1"
              layout="fill"
              className="object-cover rounded-xl"
              priority
            />
          </div>

          {/* Image 2 */}
          <div className="rounded-xl overflow-hidden md:absolute md:top-[-6rem] md:right-[-5rem] md:w-[50%] md:h-[70%] z-20">
            <Image
              src="/img1.jpg"
              alt="Studio View 2"
              layout="fill"
              className="object-cover rounded-xl"
              priority
            />
          </div>

          {/* Image 3 */}
          <div className="rounded-xl md:rounded-tl-xl md:rounded-bl-xl md:rounded-tr-none md:rounded-br-none overflow-hidden md:absolute md:bottom-[5rem] md:left-[3.6rem] md:w-[22rem] md:h-[20%] md:ml-6">
            <Image
              src="/img1.jpg"
              alt="Studio View 3"
              layout="fill"
              className="object-cover rounded-xl md:rounded-tl-xl md:rounded-bl-xl md:rounded-tr-none md:rounded-br-none"
              priority
            />
          </div>

          {/* Image 4 */}
          <div className="rounded-xl overflow-hidden md:absolute md:bottom-[5rem] md:left-[27rem] md:w-[16rem] md:h-[30%] md:rounded-bl-none">
            <Image
              src="/img1.jpg"
              alt="Studio View 4"
              layout="fill"
              className="object-cover rounded-xl md:rounded-bl-none"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
}
