import { buildModule } from "@nomicfoundation/ignition-core";

export default buildModule("CoinFlipModule", (m) => {
  const coinFlip = m.contract("CoinFlip");
  const hack = m.contract("Hack", [coinFlip]);

  return { coinFlip, hack };
});
