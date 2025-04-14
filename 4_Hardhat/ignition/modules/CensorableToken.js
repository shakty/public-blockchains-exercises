const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules")
require('dotenv').config()

module.exports = buildModule("CensorableTokenModule", (m) => {
  const name = "CensorableToken"
  const symbol = "CST"
  const initialSupply = 25
  const owner = process.env.METAMASK_1_ADDRESS
  const validatorLocal = "0xCf7Ed3AccA5a467e9e704C703E8D87F634fB0Fc9"
  const validator = "0x8452E41BA34aC00458B70539264776b2a379448f"

  const con = m.contract('CensorableToken', [name, symbol, initialSupply, owner, validator])

  return { con }
})