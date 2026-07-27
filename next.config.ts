import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    serverActions: {
      // Popup images can be up to 5MB (enforced in lib/popup.ts and the
      // Supabase Storage bucket); leave headroom for multipart overhead.
      bodySizeLimit: "6mb",
    },
  },
};

export default nextConfig;
