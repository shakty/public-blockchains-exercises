// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");
const { ethers, BigNumber } = require("ethers");

async function main() {

  
  const signer = new ethers.Wallet(process.env.FIREFOX_METAMASK_PRIVATE_KEY);

  console.log(signer.address);

  const contractAddress = "0x8c00633d81c0B9391028b4d0C11144338d5A816B";

  const lock = await hre.ethers.getContractAt("Lock", contractAddress);

  console.log("Withdrawing fom Lock", await lock.withdraw());


}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
