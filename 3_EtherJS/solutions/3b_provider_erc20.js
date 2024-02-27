
// Loading path module for operations with file paths.
const path = require('path');

// Ethers JS: Providers.
////////////////////////

// A Provider is a read-only connection to the blockchain, which allows
// querying the blockchain state, such as accout, block or transaction
// details, querying event logs or evaluating read-only code using call.

// See: https://docs.ethers.org/v6/getting-started/

// Exercise 0. Require the `dotenv` and `ethers` package.
/////////////////////////////////////////////////////////

// Hint: As you did in file 2_wallet.

// Require packages.

pathToDotEnv = path.join(__dirname, '..', '..', '.env');
// console.log(pathToDotEnv);
require("dotenv").config({ path: pathToDotEnv });

const ethers = require("ethers");

const providerKey = process.env.ALCHEMY_KEY;

const goerliUrl = `${process.env.ALCHEMY_GOERLI_API_URL}${providerKey}`;
// console.log(goerliUrl);
const goerliProvider = new ethers.JsonRpcProvider(goerliUrl);

// Exercise 1. Bonus. Get ERC20 Balance.
////////////////////////////////////////

// To get the balance of ERC20 tokens the procedure is a bit more complex.
// ETH is the native currency of Ethereum, so it's "simply there". Instead,
// ERC20 tokens are added to Ethereum via smart contracts. So, we need to 
// interact with the smart contract of the specific token we want to know
// the balance of.

// First, we need to know the address of the smart contract. We can use the 
// LINK contract.
const linkAddress = '0x326c977e6efc84e512bb9c30f76e30c160ed06fb';

// At the address, there is only bytecode. So we need to tell Ethers JS, what
// methods can be invoked. To do so, we pass the Application Binary Interface
// (ABI) of the contract, available at Etherscan. For your convenience, 
// the LINK ABI is stored in this directory, under "link_abi.json";

// Note: the path must be adapted to the folder where your run this code.
const linkABI = require('../link_abi.json');

// Now your task. Get the balance for LINK for "unima.eth" and "vitalik.eth".
// Hint: you need first to create a Contract object via `ethers.Contract`, 
// then invoke the appropriate smart contract method.
// Hint2: want to try it with your own address? Get some LINK ERC20 tokens here: 
// https://faucets.chain.link/goerli

const link = async () => {
    const contract = new ethers.Contract(linkAddress, linkABI, goerliProvider);
    const linkBalance = await contract.balanceOf("unima.eth");
    console.log(ethers.formatEther(linkBalance));
};


// link();


