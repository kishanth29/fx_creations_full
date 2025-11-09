/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  images: {
    unoptimized: true, // important for static export
    domains: ["backend.fxcreationstudio.com"],
  },
};

export default nextConfig;
