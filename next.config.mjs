/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  output: "standalone",
};

export default nextConfig;
