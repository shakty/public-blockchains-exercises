// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");

async function main() {

  const questions = ["Is a tomato a vegetable?", "If you clean a vacuum cleaner, does that make you the vacuum cleaner?", "If you enjoy wasting time, is it really wasted?"];
  const answers = [false, true, false];
  
  const quizContract = await hre.ethers.deployContract("MyQuiz", [questions, answers]);

  await quizContract.waitForDeployment();

  console.log(
    `Contract deployed to ${quizContract.target}`
  );
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
// deployment address: 0x34ca0006f4422570D1E211c658093738cfb223AD