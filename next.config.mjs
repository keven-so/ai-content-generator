/** @type {import('next').NextConfig} */
const nextConfig = {
    images:{
        domains:['cdn-icons-png.flaticon.com']
    },
    webpack: (config, { isServer }) => {
        if (!isServer) {
            // Don't resolve 'net' module on the client-side
            config.resolve.fallback = {
                ...config.resolve.fallback,
                net: false,
                tls: false,
                fs: false,
            };
        }
        return config;
    },
};

export default nextConfig;
