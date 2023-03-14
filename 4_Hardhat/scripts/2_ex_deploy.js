////////////////////////////////////////////////////////////////////////
// Attention!
// You should not execute this file here, but rather copy it
// inside the scripts/ directory of a newly inited hardhat project.
////////////////////////////////////////////////////////////////////////

// Exercise 0. Load dependencies.
/////////////////////////////////

// a. Require the `dotenv` package.

// For execution with npx you need to specify the path from the directory 
// of execution. E.g., if you execute from 4_Hardhat/:
// require('dotenv').config({ path: "../.env" });

// b. Learn how to run this file.
// Text below taken from official hardhat template. 

// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.

const hre = require("hardhat");

// c. Notice Hardhat currently still uses Ethers v5 (we have learnt v6, 
// released Feb 2023). Print the version of Ethers to make sure.

const ethers = require("ethers");

console.log(ethers.version);

// d. Ethers uses v5 because it offers a plugin that is a wrapped version of
// Ethers that makes things a little easier.

console.log(hre.ethers);

// return;

// const contractAddress = "0xDc64a140Aa3E981100a9becA4E685f962f0cF6C9";
const contractAddress = "0x3Aa5ebB10DC797CAC828524e59A333d0A371443c";

async function main() {
  
  // const hardhatSigners = await hre.ethers.getSigners();
  // const signer = hardhatSigners[0];

  // const lock = await hre.ethers.getContractAt("Lock2", contractAddress, signer);  
  // console.log("Withdrawing fom Lock");
  // await lock.withdraw()

  // console.log(ethers.version)

  const hardhatUrl = "http://127.0.0.1:8545";
  // v5
  const hardhatProvider = new ethers.providers.JsonRpcProvider(hardhatUrl);
  // What we used in v6.
  // const hardhatProvider = new ethers.JsonRpcProvider(hardhatUrl);


  const lock2ABI = require("../artifacts/contracts/Lock2.sol/Lock2.json").abi;

  const signer = new ethers.Wallet(process.env.METAMASK_1_PRIVATE_KEY, hardhatProvider);


  const contract = new ethers.Contract(contractAddress, lock2ABI, signer);

  
  console.log("Owner of Lock");
  const owner = await contract.owner();
  console.log(owner);

  console.log("Owner of Lock");
  let unlockTime = await contract.unlockTime();
  unlockTime = ethers.BigNumber.from(unlockTime).toNumber();
  console.log(unlockTime)
  let date = Date(unlockTime);
  console.log(date);

  return;

  console.log("Withdrawing fom Lock");
  await contract.withdraw()

}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});


// Exercise 0. Load dependencies.
/////////////////////////////////

// a. Require the `dotenv` package.
// Hint: As you did multiple times now.

// For execution with Code Runner.
// require('dotenv').config();

// For execution with npx you need to specify the path from the directory 
// of execution. E.g., if you execute from 4_Hardhat/:
// require('dotenv').config({ path: "../.env" });

// console.log(process.env);

// const hre = require("hardhat");

// const ethers = require("ethers");

// Exercise 1. Deploy the default Lock contract.
////////////////////////////////////////////////

// Run the deploy script with the command:
// npx hardhat run scripts/deploy.js

// Hint: adjust the path to the deploy script depending on the directory of
// execution.

// Where was the contract deployed?
// Did you see an output 

// Exercise 1. Set as default the Hardnet network.
//////////////////////////////////////////////////

// Update the hardhat config file so that the default network is localhost.
// Hint: defaultNetwork: "localhost"

// Your code here!

// Exercise . Tinkering Solidity
////////////////////////////////

// Make a copy of the Lock smart contract and rename into something creative,
// for instance Lock2.sol.

// a. Make a copy of the deploy script and rename it accordingly, for instance
// deploy2.js. Now update the deploy2 to deploy the new contract instead of 
// the original Lock.sol.

// b. Deploy Lock2.sol.
// Hint: before doing anything check the content of the artifacts folder
// for differences.



