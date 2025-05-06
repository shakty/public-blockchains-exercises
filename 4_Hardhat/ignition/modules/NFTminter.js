const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules")

require('dotenv').config()

module.exports = buildModule("NFTminterModule", (m) => {
  const name = "WeiWuxianNFT"
  const symbol = "WWX"
  const validator = "0x766483FE15F19112d9f6069d05e4eA4d24C4eFA5"
  const validatorLocal = "0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0"
  const imageHash = "bafkreiayyc6eecvkwdsazhswb6pww4bi5thbqhifktrsuztbctlrv2jtu4"

  const con = m.contract('NFTminter', [name, symbol, imageHash, validator])

  return { con }
})