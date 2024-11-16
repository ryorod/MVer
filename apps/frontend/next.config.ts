import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "Content-Security-Policy",
            value: `
              connect-src 
                'self'
                https://res.cloudinary.com/coin-nft/image 
                https://res.cloudinary.com/coin-nft/video 
                https://explorer-api.walletconnect.com 
                https://i.seadn.io 
                https://d392zik6ho62y0.cloudfront.net 
                https://lh3.googleusercontent.com/ 
                https://www.redditstatic.com 
                https://cdn.simplehash.com 
                https://arweave.net 
                https://mandelbrot.fractalnft.art 
                https://api.relay.link/execute/call 
                https://api.testnets.relay.link/execute/call 
                https://keys.coinbase.com 
                https://sessions.coinbase.com 
                https://go.wallet.coinbase.com 
                https://chain-proxy.wallet.coinbase.com 
                https://api.wallet.coinbase.com 
                https://as.coinbase.com/amp 
                https://as.coinbase.com/metrics 
                https://as.coinbase.com/traces 
                https://as.coinbase.com/track-exposures 
                https://exceptions.coinbase.com 
                https://paymaster.base.org 
                https://login.coinbase.com 
                https://translations.coinbase.com
                https://api.pinata.cloud
            `
              .replace(/\s+/g, " ")
              .trim(),
          },
        ],
      },
    ];
  },
};

export default nextConfig;
