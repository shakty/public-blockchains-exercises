// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.

require('dotenv').config({ path: "../.env" });

const hre = require("hardhat");

const ethers = require("ethers");

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
  const hardhatProvider = new ethers.providers.JsonRpcProvider(hardhatUrl);

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
