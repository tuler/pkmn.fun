/** @type {import('next').NextConfig} */
const nextConfig = {
    outputFileTracingRoot: process.cwd(),
    outputFileTracingIncludes: {
        "/opengraph-image/**/*": ["fonts/**/*"],
    },
};

module.exports = nextConfig;
