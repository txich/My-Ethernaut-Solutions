import { buildModule } from "@nomicfoundation/ignition-core";

export default buildModule("FallbackModule", (m) => {
  const fallback = m.contract("Fallback");
  const hack = m.contract("Hack", [fallback]);

  return { fallback, hack };
});
