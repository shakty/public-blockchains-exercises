const hre = require("hardhat");

async function main() {
  const [deployer] = await hre.ethers.getSigners();
  console.log("Deploying with:", deployer.address);

  const Factory = await hre.ethers.getContractFactory("MyContract");
  const contract = await Factory.deploy();
  await contract.waitForDeployment();

  console.log("Contract deployed to:", await contract.getAddress());

  // Run test transactions
  const tx1 = await contract.increment();
  await tx1.wait();

  const tx2 = await contract.expensiveLoop(100);
  await tx2.wait();

  const tx3 = await contract.deposit({ value: hre.ethers.parseEther("0.01") });
  await tx3.wait();

  const tx4 = await contract.withdraw(hre.ethers.parseEther("0.005"));
  await tx4.wait();

  console.log("Test function calls completed.");
}
