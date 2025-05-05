// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");

const fs = require('fs');
const path = require('path');

const _saveAddresses = (addresses) => {

  // Your code here.

  // Save the addresses to file system.

  // Hint: use a combination of fs.writeFileSync and JSON.stringiy
  
  console.log("Deployed addresses saved to .addresses.json")
};

async function main() {
  
  const TestContract = await hre.ethers.getContractFactory("TestContract");
  const tc = await TestContract.deploy();
  await tc.waitForDeployment();

  console.log(`Test Contract deployed to ${tc.target}`);

  const Sender = await hre.ethers.getContractFactory("Sender");
  const se = await Sender.deploy();
  await se.waitForDeployment();

  console.log(`Sender Contract deployed to ${se.target}`);

  const Receiver = await hre.ethers.getContractFactory("Receiver");
  const re = await Receiver.deploy();
  await re.waitForDeployment();

  console.log(`Receiver Contract deployed to ${re.target}`);

  // Save the addresses so that we can re-use them in the interact.js script.
  // Order matters.
  _saveAddresses([ tc.target, se.target, re.target ]);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
