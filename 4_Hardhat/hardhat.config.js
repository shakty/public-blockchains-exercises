require("@nomicfoundation/hardhat-toolbox");
const path = require('path');
pathToDotEnv = path.join(__dirname, '..', '.env');
console.log(pathToDotEnv);

require("dotenv").config({ path: pathToDotEnv });
console.log(process.env.NOT_UNIMA_URL_1);

const MM_PRIVATE_KEY = process.env.METAMASK_1_PRIVATE_KEY;
const MM_PRIVATE_KEY_2 = process.env.METAMASK_2_PRIVATE_KEY;
/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  defaultNetwork: 'unima1',
  solidity: "0.8.28",
  networks: {
    unima1: {
      url: process.env.NOT_UNIMA_URL_1,
      accounts: [MM_PRIVATE_KEY, MM_PRIVATE_KEY_2]
    }
  }
};
