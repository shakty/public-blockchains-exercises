// This setup uses Hardhat Ignition to manage smart contract deployments.
// Learn more about it at https://hardhat.org/ignition

const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");
const hre = require('hardhat')

const THIRTY_ETH = hre.ethers.parseEther('30');

module.exports = buildModule("Lock4Module", (m) => {
  const lockedAmount = m.getParameter("lockedAmount", THIRTY_ETH);

  const lock = m.contract("Lock4", [], {
    value: lockedAmount,
  });

  return { lock };
});
