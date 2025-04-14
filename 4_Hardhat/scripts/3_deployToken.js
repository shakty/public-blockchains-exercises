const hre = require("hardhat");

async function main() {
  const baseContract = await hre.ethers.deployContract("Assignment3p1Token", [
    "TmToken",
    "TMT",
    1000000,
    "0x475a3dA9349DfdD61C1462Ab907520FeEDBb3d91",
  ]);

  await baseContract.waitForDeployment();

  console.log(`Contract deployed to ${baseContract.target}`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

//3.1 Token address: 0xBb2A674a641F7EbE4f76b3cE78Da5D143F6D6F84
