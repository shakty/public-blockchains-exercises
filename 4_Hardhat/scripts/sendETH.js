// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");
const { ethers, BigNumber } = require("ethers");

async function main() {
  const hardhatSigners = await hre.ethers.getSigners();
  
  hardhatSigners.forEach(async s =>  {
    let b = await s.getBalance();
    // console.log(b)
    // console.log(ethers.utils.formatEther(b))
    console.log(s.address, ethers.utils.formatEther(b))
  });
  
  console.log();

  const hardhatSigner = hardhatSigners[0];
  const toAddress = hardhatSigners[1].address;
  const tx = await hardhatSigner.sendTransaction({
    to: toAddress,
    value: (await hardhatSigner.getBalance()).div(BigNumber.from(10))
  });

  console.log();

  hardhatSigners.forEach(async s =>  {
    let b = await s.getBalance();
    // console.log(b)
    // console.log(ethers.utils.formatEther(b))
    console.log(s.address, ethers.utils.formatEther(b))
  });

  console.log();


}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
