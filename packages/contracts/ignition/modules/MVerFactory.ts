// This setup uses Hardhat Ignition to manage smart contract deployments.
// Learn more about it at https://hardhat.org/ignition

import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";
import { ORIGINAL_CONTRACT } from "../arguments/MVerFactory";

const MVerFactoryModule = buildModule("MVerFactoryModule", (m) => {
  const originalContract = m.getParameter(
    "originalContract",
    ORIGINAL_CONTRACT
  );

  const MVerFactory = m.contract("MVerFactory", [originalContract]);

  return { MVerFactory };
});

export default MVerFactoryModule;
