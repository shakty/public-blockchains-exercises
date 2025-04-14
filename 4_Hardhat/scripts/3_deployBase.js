const hre = require("hardhat");

async function main() {

  const baseContract = await hre.ethers.deployContract("BaseAssignment", ["0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266"]);

  await baseContract.waitForDeployment();

  console.log(
    `Contract deployed to ${baseContract.target}`
  );
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
// deployment address: 0x34ca0006f4422570D1E211c658093738cfb223AD