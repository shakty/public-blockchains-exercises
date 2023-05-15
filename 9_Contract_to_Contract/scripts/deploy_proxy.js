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
  fs.writeFileSync(path.join(__dirname, ".addresses_proxy.json"),
                   JSON.stringify(addresses));
  console.log("Deployed addresses saved to .addresses_proxy.json")
};

async function main() {
  
  const LogicV1 = await hre.ethers.getContractFactory("LogicV1");
  let v1 = await LogicV1.deploy();
  await v1.deployed();

  console.log(`Logic V1 deployed to ${v1.address}`);

  const LogicV2 = await hre.ethers.getContractFactory("LogicV2");
  const v2 = await LogicV2.deploy();
  await v2.deployed();

  console.log(`Logic V2 deployed to ${v2.address}`);

  const LogicV3 = await hre.ethers.getContractFactory("LogicV3");
  const v3 = await LogicV3.deploy();
  await v3.deployed();

  console.log(`Logic V3 deployed to ${v3.address}`);

  const secretNumber = 100;

  const Proxy = await hre.ethers.getContractFactory("Proxy");
  const proxy = await Proxy.deploy(v1.address, secretNumber);
  await proxy.deployed();

  console.log(`Proxy deployed to ${proxy.address}`);

  // Save the addresses so that we can re-use them in the interact.js script.
  // Order matters.
  _saveAddresses([ v1.address, v2.address, v3.address, proxy.address ]);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
