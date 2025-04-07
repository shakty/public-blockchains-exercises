const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

const TOTAL_SUPPLY = 1_000_000n;
const HARDHAT_10_ADDRESS = '0xBcd4042DE499D14e55001CcbB24a551F3b954096'

module.exports = buildModule("MyERC20Module", (m) => {
  const token = m.contract("MyERC20", [TOTAL_SUPPLY], {
    from: HARDHAT_10_ADDRESS
  });
  return { token }
})