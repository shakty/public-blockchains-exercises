require("@nomicfoundation/hardhat-toolbox");
const path = require("path");
pathToDotEnv = path.join(__dirname, "..", ".env");
//console.log(pathToDotEnv);

require("dotenv").config({ path: pathToDotEnv });
//console.log(process.env.NOT_UNIMA_URL_1);

const MM_PRIVATE_KEY = process.env.METAMASK_1_PRIVATE_KEY;
const MM_PRIVATE_KEY_2 = process.env.METAMASK_2_PRIVATE_KEY;
/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  defaultNetwork: "unima1", // Changed from 'unima1' to 'localhost'
  solidity: "0.8.28",
  networks: {
    localhost: {
      url: "http://127.0.0.1:8545", // Default Hardhat local node URL
      chainId: 31337, // Default Hardhat chain ID
    },
    unima1: {
      url: process.env.NOT_UNIMA_URL_1,
      accounts: [MM_PRIVATE_KEY, MM_PRIVATE_KEY_2],
    },
  },
};
