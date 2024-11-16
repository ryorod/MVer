// This setup uses Hardhat Ignition to manage smart contract deployments.
// Learn more about it at https://hardhat.org/ignition

import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const MVerOriginalModule = buildModule("MVerOriginalModule", (m) => {
  const MVerOriginal = m.contract("MVerOriginal");

  return { MVerOriginal };
});

export default MVerOriginalModule;
