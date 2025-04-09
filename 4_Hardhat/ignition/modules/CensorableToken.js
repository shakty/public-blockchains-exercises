const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules")

module.exports = buildModule("CensorableTokenModule", (m) => {
  const name = "CensoredToken"
  const symbol = "CST"
  const initialSupply = 25
  const owner = '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266'
  const validator = "0xCf7Ed3AccA5a467e9e704C703E8D87F634fB0Fc9"

  const con = m.contract('CensorableToken', [name, symbol, initialSupply, owner, validator])

  return { con }
})