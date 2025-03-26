require("@nomicfoundation/hardhat-toolbox");

const path = require('path')
require('dotenv').config({
  path: path.resolve(__dirname, '..', '.env')
})

const key = process.env.ALCHEMY_KEY
const sepoliaURL = `${process.env.ALCHEMY_SEPOLIA_API_URL}${key}`

const unimaURL = process.env.NOT_UNIMA_URL_1

const mainMMKey = process.env.METAMASK_1_PRIVATE_KEY
const testMMKey = process.env.METAMASK_2_PRIVATE_KEY

const etherscanKey = process.env.ETHERSCAN_KEY

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.28",
  defaultNetwork: 'localhost',
  networks: {
    sepolia: {
      url: sepoliaURL,
      accounts: [mainMMKey]
    },
    unima: {
      url: unimaURL,
      accounts: [mainMMKey, testMMKey]
    }
  },
  etherscan: {
    apiKey: etherscanKey
  }
};
