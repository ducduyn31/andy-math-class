const extractURL = (url) => {
  if (!url) return { protocol: "", hostname: "" };
  const urlParts = url.split("/");
  const protocol = urlParts[0].slice(0, -1);
  const hostnameAndPort = urlParts[2].split(":");
  const hostname = hostnameAndPort[0];
  const port = hostnameAndPort.length > 0 ? hostnameAndPort[1] : "";
  return { protocol, hostname, port };
};

/** @type {import("next").NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: extractURL(process.env.NEXT_PUBLIC_SUPABASE_URL).protocol,
        hostname: extractURL(process.env.NEXT_PUBLIC_SUPABASE_URL).hostname,
        port: extractURL(process.env.NEXT_PUBLIC_SUPABASE_URL).port,
        pathname: "/storage/v1/object/public/class-questions/**",
      },
    ],
  },
};

module.exports = nextConfig;
