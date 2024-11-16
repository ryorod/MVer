import { baseSepolia } from "wagmi/chains";

export const SITE_URL = "https://mver.ryorod.dev";

export const BASE_SEPOLIA_CHAIN_ID = baseSepolia.id;

export const MVER_ORIGINAL_ADDRESS = process.env
  .NEXT_PUBLIC_MVER_ORIGINAL_ADDRESS as `0x${string}`;
export const MVER_FACTORY_ADDRESS = process.env
  .NEXT_PUBLIC_MVER_FACTORY_ADDRESS as `0x${string}`;

export const ONCHAINKIT_API_KEY = process.env
  .NEXT_PUBLIC_ONCHAINKIT_API_KEY as string;

export const PINATA_JWT = process.env.NEXT_PUBLIC_PINATA_JWT as string;
export const PINATA_GATEWAY = process.env.NEXT_PUBLIC_PINATA_GATEWAY as string;
