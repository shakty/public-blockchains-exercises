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
  fs.writeFileSync(path.join(__dirname, ".addresses_attack.json"),
                   JSON.stringify(addresses));
  console.log("Deployed addresses saved to .addresses_attack.json")
};

async function main() {
  
  const Bank = await hre.ethers.getContractFactory("Bank");
  const ba = await Bank.deploy();
  await ba.deployed();

  console.log(`Bank Contract deployed to ${ba.address}`);

  const Attacker = await hre.ethers.getContractFactory("Attacker");
  const at = await Attacker.deploy(ba.address);
  await at.deployed();

  console.log(`Attacker Contract deployed to ${at.address}`);

  const BankWithGuard = await hre.ethers.getContractFactory("BankWithGuard");
  const ba2 = await BankWithGuard.deploy();
  await ba2.deployed();


  console.log(`Bank with Guard Contract deployed to ${ba2.address}`);

  // Save the addresses so that we can re-use them in the interact.js script.
  // Order matters.
  _saveAddresses([ ba.address, at.address, ba2.address ]);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
