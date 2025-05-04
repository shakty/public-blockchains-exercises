const hre = require("hardhat");

async function main() {
  console.log("Deploying contract...");
  const baseContract = await hre.ethers.deployContract("NFTminter", [
    "AmyTheDog",
    "AD",
    "bafybeie6enldpuq7umq5zfliesqq3xxtdmokteolc4uvx32hd4tntlis2q",
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
