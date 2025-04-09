const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules")

module.exports = buildModule("ValidatorModule", (m) => {

  const con = m.contract('EmptyValidator')

  return { con }
})