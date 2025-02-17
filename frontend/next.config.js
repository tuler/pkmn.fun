/** @type {import('next').NextConfig} */
const nextConfig = {
    outputFileTracingRoot: process.cwd(),
    outputFileTracingIncludes: {
        "api/**/*": ["fonts/**/*"],
    },
};

module.exports = nextConfig;
