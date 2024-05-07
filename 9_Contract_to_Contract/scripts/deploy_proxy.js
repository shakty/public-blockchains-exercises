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
  await v1.waitForDeployment();

  console.log(`Logic V1 deployed to ${v1.target}`);

  const LogicV2 = await hre.ethers.getContractFactory("LogicV2");
  const v2 = await LogicV2.deploy();
  await v2.waitForDeployment();

  console.log(`Logic V2 deployed to ${v2.target}`);

  const LogicV3 = await hre.ethers.getContractFactory("LogicV3");
  const v3 = await LogicV3.deploy();
  await v3.waitForDeployment();

  console.log(`Logic V3 deployed to ${v3.target}`);

  const secretNumber = 100;

  const Proxy = await hre.ethers.getContractFactory("Proxy");
  const proxy = await Proxy.deploy(v1.target, secretNumber);
  await proxy.waitForDeployment();

  console.log(`Proxy deployed to ${proxy.target}`);

  // Save the addresses so that we can re-use them in the interact.js script.
  // Order matters.
  _saveAddresses([ v1.target, v2.target, v3.target, proxy.target ]);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
