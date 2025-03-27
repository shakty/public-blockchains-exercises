////////////////////////////////////////////////////////////////////////
// Attention!
// You should not execute this file here, but rather copy it
// inside the scripts/ directory of a newly inited hardhat project.
////////////////////////////////////////////////////////////////////////

// Exercise 0. Learn how to run this file.
//////////////////////////////////////////

// Text below taken from official hardhat template:

// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.

// Try to execute this file in both ways and check which one is faster.
// Then comment the return statement below and proceed with something more
// interesting.

const hre = require("hardhat");
console.log('Hardhat\'s default network:', hre.config.defaultNetwork);

return;


// Exercise 1. Understand Ethers in Hardhat.
////////////////////////////////////////////

// Hardhat offers a wrapped version of Ethers with additional functionalities.
// Sometimes their version numbers might differ.

// a. Require ethers (as an npm package) and print its version to console.

// Your code here!

return;

// b. Now prints the the version of the Hardhat's plugin available under
// hre.ethers.

// Your code here!

return;

// Exercise 1. Create a new Solidity contract.
//////////////////////////////////////////////

// We haven't fully understood the Lock contract and we are already creating
// a new one? Yes, it's quite easy. 

// a. Copy the contract file "Lock.sol" and creatively rename it as "Lock2.sol".

// b. Copy the deployment script "deploy.js" and repeat the same creative
// act by renaming it into "deploy2.js".

// c. Important! The name of a contract is not the name of the file, it is
// the name of the contract inside the file. Go on and rename the contract
// name "Lock" into "Lock2" inside both "Lock2.sol" and "deploy2.js".

// d. Deploy the "new" contract.

// Exercise 2. Read data of your new Solidity contract.
///////////////////////////////////////////////////////

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
const contractAddress = "FILL_THIS_VALUE";

// Let's continue inside the async main function (the recommended Hardhat
// pattern of execution).

async function main() {
  
  // b. Get the first of the default Hardhat signers. Print its address, and
  // checks that it matches the first address printed to console when you
  // execute: npx hardhat node
  // Hint: hre.ethers.getSigners() returns an array.

  // Your code here!

  return;

  // c. Get your new contract. Hardhat Ethers automatically fetches the ABI from
  // the artifacts, so you don't need to specify it. Use the method
  // hre.ethers.getContractAt(<name>, <address>, <signer>)
  // then print the contract address.

  // Your code here!

  return;

  // d. Bonus. You can get the contract also without Hardhat's wrapped Ethers.
  // The standard Ethers.JS requires a bit more code, but is is 
  // useful to understand how it works.

  const getContractManual = async(signer = hhSigner, 
                                  address = contractAddress) => {
    
    // d.1 Fetch the ABI from the artifacts 
    // (it expects contract name = file name).

    // Your code here!

    // d.2 Create the contract and print the address.

    // Your code here!

    // const lock = ... ;

    return lock;

  };

  // const lock2 = await getContractManual();
  
  // e. Print out the public variables of the contract: owner and unlockTime.
  // Hint: Public variables have automatic getters that can be invoked.

  const readContract = async (lockContract = lock) => {
      
    // Print the owner of the lock.
   
    // Your code here!

    // Print the unlock time. 
    // Be careful! You will get a BigInt, you need first
    // to convert it to a Number and then to a Date so that it is readable.
    // For the conversions these threads might help:
    // https://stackoverflow.com/questions/847185/convert-a-unix-timestamp-to-time-in-javascript
    // https://stackoverflow.com/questions/53970655/how-to-convert-bigint-to-number-in-javascript

    // Your code here!
  };

  // await readContract();

}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
