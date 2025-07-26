import { buildModule } from "@nomicfoundation/ignition-core";

export default buildModule("TelephoneModule", (m) => {
  const telephone = m.contract("Telephone");
  const hack = m.contract("Hack", [telephone]);

  return { telephone, hack };
});
