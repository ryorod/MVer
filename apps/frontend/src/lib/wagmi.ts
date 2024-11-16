import { http, cookieStorage, createConfig, createStorage } from "wagmi";
import { baseSepolia } from "wagmi/chains"; // add baseSepolia for testing
import { coinbaseWallet } from "wagmi/connectors";

export function getConfig() {
  return createConfig({
    chains: [baseSepolia], // add baseSepolia for testing
    connectors: [
      coinbaseWallet({
        appName: "MVer",
        preference: "smartWalletOnly",
        version: "4",
      }),
    ],
    storage: createStorage({
      storage: cookieStorage,
    }),
    ssr: true,
    transports: {
      [baseSepolia.id]: http(), // add baseSepolia for testing
    },
  });
}

declare module "wagmi" {
  interface Register {
    config: ReturnType<typeof getConfig>;
  }
}
