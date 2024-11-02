/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        // domains: ["lh3.googleusercontent.com"],
        remotePatterns: [
          {
            hostname: 'lh3.googleusercontent.com',
          }
        ],
      },
};

export default nextConfig;
