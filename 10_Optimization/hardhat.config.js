require("@nomicfoundation/hardhat-toolbox");

// For benchmarking and gas reporting.
require("hardhat-gas-reporter");
require("hardhat-contract-sizer");

const optimizerSettings = {
    none: { enabled: false, runs: 0 },
    low: { enabled: true, runs: 0 },
    default: { enabled: true, runs: 200 },
    high: { enabled: true, runs: 10000 },
};

const mode = process.env.OPT_MODE || "default";

console.log(`Using optimizer settings: ${mode}`);


const path = require('path');
const pathToDotEnv = path.join(__dirname, '..', '.env');
// console.log(pathToDotEnv);
require("dotenv").config({ path: pathToDotEnv });

// You may also use Alchemy.
const INFURA_KEY = process.env.INFURA_KEY;
const INFURA_URL = process.env.INFURA_SEPOLIA_API_URL;
const SEPOLIA_RPC_URL = `${INFURA_URL}${INFURA_KEY}`;

// console.log(SEPOLIA_RPC_URL);
// console.log('------------------------')

// Beware: NEVER put real Ether into testing accounts.
// Beware: NEVER put real Ether into testing accounts.
const MM_PRIVATE_KEY = process.env.METAMASK_1_PRIVATE_KEY;
const MM_PRIVATE_KEY_2 = process.env.METAMASK_2_PRIVATE_KEY;
const MM_PRIVATE_KEY_3 = process.env.METAMASK_3_PRIVATE_KEY;

const KURTOSIS_1_PRIVATE_KEY = process.env.KURTOSIS_1_PRIVATE_KEY;


/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {

  // evmVersion: 'london',
  allowUnlimitedContractSize: true,
  
  solidity: {
    version: "0.8.29",
    settings: {
        optimizer: optimizerSettings[mode]
      },
  },
  gasReporter: {
    enabled: true,
    showTimeSpent: true,
    currency: "USD",
  },
  contractSizer: {
    runOnCompile: true,
    only: ["MyContract"]
  },


  defaultNetwork: "unima4",
  // defaultNetwork: "localhost",
  etherscan: {
      apiKey: process.env.ETHERSCAN_KEY,
  },
  networks: {
      hardhat: {
          allowUnlimitedContractSize: true,
      },
      sepolia: {
          url: SEPOLIA_RPC_URL,
          accounts: [MM_PRIVATE_KEY_2, MM_PRIVATE_KEY_3],
      },
      // https://github.com/NomicFoundation/hardhat/issues/660
      unima1: {
          url: process.env.NOT_UNIMA_URL_1,
          accounts: [MM_PRIVATE_KEY, MM_PRIVATE_KEY_2, MM_PRIVATE_KEY_3],
          // gas: 12000000,
          // blockGasLimit: 0x1fffffffffffff,
          // allowUnlimitedContractSize: true,
          // timeout: 1800000
      },
      unima2: {
          url: process.env.NOT_UNIMA_URL_2,
          accounts: [MM_PRIVATE_KEY, MM_PRIVATE_KEY_2, MM_PRIVATE_KEY_3],
      },
      unima3: {
          url: process.env.NOT_UNIMA_URL_3,
          accounts: [MM_PRIVATE_KEY, MM_PRIVATE_KEY_2, MM_PRIVATE_KEY_3],
      },
      unima4: {
          url: process.env.UNIMA_RELOADED_1,
          accounts: [KURTOSIS_1_PRIVATE_KEY, MM_PRIVATE_KEY, MM_PRIVATE_KEY_2, MM_PRIVATE_KEY_3],
        },
  },
};
