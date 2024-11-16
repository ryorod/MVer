import MVerFactoryABI from "@/abis/MVerFactory.json";
import MVerOriginalABI from "@/abis/MVerOriginal.json";
import { MVER_FACTORY_ADDRESS, MVER_ORIGINAL_ADDRESS } from "./config";

export const MVerFactoryABIAddress = {
  abi: MVerFactoryABI,
  address: MVER_FACTORY_ADDRESS,
};

export const MVerOriginalABIAddress = {
  abi: MVerOriginalABI,
  address: MVER_ORIGINAL_ADDRESS,
};
