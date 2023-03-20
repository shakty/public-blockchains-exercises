// Ethers JS: First interaction with Hardhat blockchain.
////////////////////////////////////////////////////////////

// Exercise 0. Make sure you environment is set up.
///////////////////////////////////////////////////

// In 4_Hardhat_ex you have been asked to init a new Hardhat project with
// a Lock contract. You can reuse that project, or create a new one (with
// the Lock contract).

// It is assumed that you could deploy the Lock contract to three networks:
// - Hardhat local network
// - Goerli
// - (not) Unima Blockchain

// Solidity By Example is a great resource to quickly pick up Solidity
// development and to do some of the exercises below:

// https://solidity-by-example.org/

// Exercise 1. A Closer Look at Lock.
////////////////////////////////////

// Let's open again at the Lock2 contract that you created in one of the
// previous exercises (you can also work with the Lock contract).

// a. What is the meaning of the `pragma` directive at the top of the file?
// Hint: https://solidity-by-example.org/hello-world/

// b. The pragma value must be compatible with the version of solidity
// in `hardhat.config.js. Try to set the value to a lower or higher number
// and to compile the Lock file. What happens?

// c. Bonus. What is the meaning of that caret symbol (^) ?
// Hint: https://docs.soliditylang.org/en/develop/layout-of-source-files.html#version-pragma
// Hint2: https://bytearcher.com/articles/semver-explained-why-theres-a-caret-in-my-package-json/

// c. Before `pragma` there is an important comment tha sets the license of
// the contract. Pick a license for your contract.
// Hint: https://docs.soliditylang.org/en/develop/layout-of-source-files.html#spdx-license-identifier

// d. The code of the contract Lock is introduced by the `contract` keyword
// and wrapped in curly braces { ... }. Before `contract` you have the option
// to `import` some code into the file.
//
// In the Lock contract file, there is a comment to import a hardhat plugin to
// print text with `console.log` to the terminal where you launched
// the Hardhat blockchain. Three things to keep in mind:
//
// 1. console.log works only in calls and transactions;
// 2. imported code is deployed alongside your contract;
// 3. console.log works only on the local Hardhat blockchain (i.e., not on
//    Goerli, Unima, etc.), so you should remove it before deployment on
//    ohter nets.
//
// Uncomment the import, and add a few console.log to the Lock code (e.g.,
// in the constructor), then deploy it.
//
// Notice that a new folder named "hardhat" is created under "artifacts/".
// More here: https://hardhat.org/hardhat-network/docs/overview#console.log

// Exercise 2. Variables Basics.
////////////////////////////////

// Variables are containers for data of some "type."

// a. In Solidity, you can find the main types here:

// https://solidity-by-example.org/primitives/

// The type uint (used for variable `unlockTime`) is an alias for another type.
// Change uint to its aliased name for more clarity.

// b. In Solidity, there are three types of variables:

// https://solidity-by-example.org/variables/

// Create a new global variable of type `string` and query it via Ether.JS
// (after deployment). Notice the difference if you declare it public or not.

// c. Since you are not changing it, your new variable at b. is a constant.
// Declare it as a constant (follow the convention) to optimize your code.
// Hint: https://solidity-by-example.org/constants/


// d. You can also optimize your code a bit, if you declare unlockTime as
// immutable.
// Hint: https://solidity-by-example.org/immutable/



async function readVar() {

  const contractName = "Lock";

  // No public globalVar.
  // const contractAddress = "0xCf7Ed3AccA5a467e9e704C703E8D87F634fB0Fc9";
  // Public global var.
  // const contractAddress = "0xDc64a140Aa3E981100a9becA4E685f962f0cF6C9";
  // Public constant var
  // const contractAddress = "0x5FC8d32690cc91D4c39d9d3abcBD16989F875707";
  // Constant var no public
  // const contractAddress = "0x0165878A594ca255338adfa4d48449f69242Eb8F";
  // Immutable unlockDate
  const contractAddress = "0xa513E6E4b8f2a923D98304ec87F64353C4D5C853";

  const hardhatSigners = await hre.ethers.getSigners();
  const hhSigner = hardhatSigners[0];

  console.log("HH Signer address:", hhSigner.address);

  // return

  // c. Getting the contract (as we did in previously...).
  const lock = await hre.ethers.getContractAt(
    contractName,
    contractAddress,
    hhSigner
  );

  console.log(contractName + " globalVar:", await lock.globalVar());

    // d.
    
  console.log(contractName + " GLOBAL_VAR:", await lock.GLOBAL_VAR());


//   let date = await hre.ethers.provider.getStorageAt(contractAddress, 0);
//   date = parseInt(date, 16);
//   date = new Date(date * 1000);
//   console.log(date);

//   let owner = await hre.ethers.provider.getStorageAt(contractAddress, 1);
//   console.log(owner);
//   // date = parseInt(storage, 16);
//   // date = new Date(date * 1000);
//   // console.log(date);
//   let a = hre.ethers.utils.toUtf8String(owner);
//   console.log(a);

}

// readVar();


// Exercise 3. Constructor.
///////////////////////////

// The constructor is executed once, at deployment time.

// It can take input parameters as passed by the deployment script. Let's 
// understand how they are connected.

// a. Let's make a new copy of Lock2, and name it Lock3. 
// Remove the input parameter and the require statement from the contructor,
// and assign a fixed value to unlockTime. 
// Also create a new deploy script (for instance deploy3.js) to deploy Lock3,
// and make sure that it does not pass any input parameter to Lock3.
// Hint: you can take the value for unlockTime from the console.log of a
// previous deployment.
// Hint2: in the deploy script, the first parameter goes to constructor,
// the second one is for overriding default transaction parameters. In this
// case, we set the "value" option that specifies how much ether to send
// along with a transaction (as we did in 3_EtherJS/3_signer.js).

// b. Let's create a new global variable that stores the block number
// at which the contract is deployed. This variable should be initialized in
// the constructor. How should it be declared?

// Hint: you can get the block number from the state variable `block`.



async function constructor() {

  const contractName = "Lock3";

  // Manual lock and block number.
  contractAddress = "0x2279B7A0a67DB372996a5FaB50D91eAA73d2eBe6";

  const hardhatSigners = await hre.ethers.getSigners();
  const hhSigner = hardhatSigners[0];

  const lock = await hre.ethers.getContractAt(
    contractName,
    contractAddress,
    hhSigner
  );

    let blockNum = await lock.blockNumber();

  console.log(contractName + " blockNumber:", Number(blockNum));


//   let date = await hre.ethers.provider.getStorageAt(contractAddress, 0);
//   date = parseInt(date, 16);
//   date = new Date(date * 1000);
//   console.log(date);

//   let owner = await hre.ethers.provider.getStorageAt(contractAddress, 1);
//   console.log(owner);
//   // date = parseInt(storage, 16);
//   // date = new Date(date * 1000);
//   // console.log(date);
//   let a = hre.ethers.utils.toUtf8String(owner);
//   console.log(a);

}

constructor();

// Exercise 3. Open Zeppelin.
/////////////////////////////

// How about creating a variable of the type:

// "This contract was created at block number <BLOCK_NUMBER>"

// Where <BLOCK_NUMBER> is the actual block number at which the contract
// was deployed.

// This operation requires joining a string and a number, an operation that
// is not supported in Solidity. Generally, string manipulations should be
// avoided because they cost gas, but if you really want to do it, you can
// use a library provided by Open Zeppelin.


// Variables in Solidity are slightly different than in other programming
// languages. All variables are "public," in the sense that a copy is stored
// in the memory of each computer running an Ethereum client. So even "private"
// variables are in fact
