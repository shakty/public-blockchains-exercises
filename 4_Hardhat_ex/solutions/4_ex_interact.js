////////////////////////////////////////////////////////////////////////
// Attention!
// You should not execute this file here, but rather copy it
// inside the scripts/ directory of a newly inited hardhat project.
////////////////////////////////////////////////////////////////////////

const hre = require("hardhat");
console.log('Hardhat\'s default network:', hre.config.defaultNetwork);

const ethers = require("ethers");
console.log("Ethers version:", ethers.version);


// Exercise 2. Interact with your new Solidity contract (READ).
///////////////////////////////////////////////////////////////

// If you remember from 3_EtherJS/2_signer.js, to interact with a smart 
// contract you need three pieces of information:
// 1. The contract address.
// 2. The ABI
// 3. A signer (with access to a provider)

// Here it is the same, however the Hardhat wrapped version of Ether makes
// things a bit easier, as I mentioned above.

// a. Update with your contract's name and address.
// Hint: The address is known only after deployment.
const contractName = "Lock2";
const contractAddress = "0xDc64a140Aa3E981100a9becA4E685f962f0cF6C9";

// Let's continue inside the async main function (the recommended Hardhat
// pattern of execution).

async function main() {
  
  // b. Get the first of the default Hardhat signers. Print its address, and
  // checks that it matches the first address printed to console when you
  // execute: npx hardhat node
  // Hint: hre.ethers.getSigners() returns an array of signers.

  const hardhatSigners = await hre.ethers.getSigners();
  const hhSigner = hardhatSigners[0];

  console.log("HH Signer address:", hhSigner.address);

  return

  // c. Get your new contract. Hardhat Ethers automatically fetches the ABI from
  // the artifacts, so you don't need to specify it. Use the method
  // hre.ethers.getContractAt(<name>, <address>, <signer>)
  // then print the contract address.

  const lock = await hre.ethers.getContractAt(contractName,
                                              contractAddress,
                                              hhSigner);  
  

  console.log(contractName + " address", lock.address); 

  // Exercise 3. Interact with your new Solidity contract (WRITE).
  ////////////////////////////////////////////////////////////////

  // a. Let's try to withdraw from the lock. 
  // Print the balance before and after withdrawal.
  // Hint: Invoke the asynchronous withdraw method.
  // Hint2: Ethers Syntax for accessing formatEther:
  // balance = ethers.formatEther(balance);
  // Hint3: Do you get an error? You should! Check in the long error msg,
  // the reason why.

  const withdrawAttempt1 = async (lockContract = lock) => {
    let b1 = await hhSigner.getBalance();
    b1 = ethers.formatEther(b1);
    console.log('The balance before withdrawing is ', b1);

    console.log("Withdrawing fom Lock");
    await lockContract.withdraw();

    let b2 = await hhSigner.getBalance();
    b2 = ethers.utils.formatEther(b2);
    console.log('The balance after withdrawing is ', b2);
  };

  // await withdrawAttempt1();
  
  // Exercise 3. Remove the check for unlock date (WRITE).
  ////////////////////////////////////////////////////////////////////

  // a. Comment out the require checking for the unlock date.

  // b. Deploy the Lock2 contract again and try to withdraw now.
  // Hint: the contract address will be different.
  
  const withdrawAgain = async() => {
    const newContractAddress = "0x4ed7c70F96B99c776995fB64377f0d4aB3B0e1C1";

      // Wrapped Ethers.
        const newLock = await hre.ethers.getContractAt(contractName,
          newContractAddress,
          hhSigner);

      // Standard Ethers (V5).
      // const newLock = await getContractManual(hhSigner, newContractAddress);

      // Can also print:
      // console.log(newLock.address);
      // await readContract(newLock);  

    await withdrawAttempt1(newLock);
  };
  
  await withdrawAgain();
  


  // Exercise 4. Bonus. Connect with another address (WRITE).
  //////////////////////////////////////////////////////////

  // Redeploy the Lock2 contract and try to withdraw from an address that
  // is not the owner. It should trigger an error from the second
  // `require` statement in the withdraw method.

  const triggerNotOwner = async () => {
    const thirdContractAddress = "0x59b670e9fA9D0A427751Af201D676719a970857b";

    // b.1 Add the RPC url as shown after starting `npx hardhat node`
    const hardhatUrl = "http://127.0.0.1:8545";
    const hardhatProvider = new ethers.JsonRpcProvider(hardhatUrl);
    
    // b.2 Require the `dotenv` package.
    // For execution with npx you need to specify the path from the directory 
    // of execution. E.g., if you execute from 4_Hardhat/:
    require('dotenv').config({ path: "../.env" });

    // b.3 Create a new signer.
    const nonOwner = new ethers.Wallet(process.env.METAMASK_1_PRIVATE_KEY,
                                       hardhatProvider);

    // b.4 Get the contract instance and then try to withdraw.
    // Hint: You could use the method `getContractManual` created before

    // Wrapped Ethers.
    const newLock = await hre.ethers.getContractAt(contractName,
      thirdContractAddress,
      nonOwner);

   // Standard Ethers
   // const newLock = await getContractManual(nonOwner, thirdContractAddress);

    await newLock.withdraw();
  
  };

  // await triggerNotOwner();

}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
