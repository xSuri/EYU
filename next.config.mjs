/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'export', // Enables static export
    images: {
        unoptimized: true, // Disables image optimization for static exports
    },
};

export default nextConfig;
