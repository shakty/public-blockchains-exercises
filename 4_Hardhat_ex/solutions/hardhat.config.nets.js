require("@nomicfoundation/hardhat-toolbox");

const path = require('path')
const res = require('dotenv')
  .config({ path: path.resolve(__dirname, '..', '.env') });


// You may also use Alchemy.
const ALCHEMY_KEY = process.env.ALCHEMY_KEY;
const ALCHEMY_URL = process.env.ALCHEMY_SEPOLIA_API_URL;
const SEPOLIA_RPC_URL = `${ALCHEMY_URL}${ALCHEMY_KEY}`;

console.log(SEPOLIA_RPC_URL);
console.log('------------------------')

// Beware: NEVER put real Ether into testing accounts.
const MM_PRIVATE_KEY = process.env.METAMASK_2_PRIVATE_KEY;

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  
  solidity: "0.8.17",
  
  defaultNetwork: "localhost",
  
  etherscan: {
    apiKey: process.env.ETHERSCAN_KEY
  },

  networks: {
    sepolia: {
      url: SEPOLIA_RPC_URL,
      accounts: [ MM_PRIVATE_KEY ],
    }
  }

};
