// Ethers JS: First exercises with Solidity.
////////////////////////////////////////////

// Resources:

// Solidity By Example is a great resource to quickly pick up Solidity
// development and to do some of the exercises below:

// https://solidity-by-example.org/

// For the full syntax and detailed explanations refer to the latest docs:

// https://docs.soliditylang.org/en/latest/index.html


// Exercise 0. Make sure you environment is set up.
///////////////////////////////////////////////////

// In 4_Hardhat you have learnt to init a new Hardhat project. 
// Now, let's do it again! Create a new folder and run `npx hardhat`.
// If you wish you might also re-use the old project folder. In either case,
// you need to run this file from a hardhat project's directory.

// You can deploy the contracts of these exercises to any network, e.g.:
// - Hardhat local network
// - Goerli
// - (not) Unima Blockchain

// You will need to deploy the same contract multiple times, so the Hardhat
// local network could be the easiest and fastest solution. Do you remember
// how to start it?

// Hint: the Hardhat blockchain might actually be still running from the last
// time. Check all open terminals before starting a new blockchain.
// Hint2: if you want to quickly open and close the Terminal in VS Code, the
// shortcut is Ctrl-`.

// Exercise 1. A Closer Look at Lock.
////////////////////////////////////

// Let's open again the Lock contract created by Hardhat that we used in the
// previous exercises.

// a. What is the meaning of the `pragma` directive at the top of the file?
// Hint: https://solidity-by-example.org/hello-world/

// b. The pragma value must be compatible with the version of solidity
// in `hardhat.config.js. Try to set the value to a lower or higher number
// and to compile the Lock file. What happens?
// Hint: npx hardhat compile

// c. Checkpoint. What is the meaning of that caret symbol (^) ?
// Hint: https://docs.soliditylang.org/en/develop/layout-of-source-files.html#version-pragma
// Hint2: https://bytearcher.com/articles/semver-explained-why-theres-a-caret-in-my-package-json/

// c. Before `pragma` there is an important comment tha sets the license of
// the contract. Pick a license for your contract.
// Hint: https://docs.soliditylang.org/en/develop/layout-of-source-files.html#spdx-license-identifier

// d. The code of the Lock contract is introduced by the `contract` keyword
// and wrapped in curly braces { ... }. Before `contract` you have the option
// to `import` some code into the file.
//
// Read about imports:
// https://solidity-by-example.org/import/
//
// In the Lock contract file, there is a comment to import a hardhat plugin to
// print text with `console.log` to the terminal _where you launched
// the Hardhat blockchain_ (i.e., not the one from where you run the exercises).
// A couple of things to keep in mind:
//
// 2. Imported code is deployed with your contract code;
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

// Important. Let's work on a new file:
// Copy the default Lock contract into `Lock2` and create a new deploy script
// (for instance deploy2.js) to deploy Lock2.

// Hint: remember to also rename the contract.

// Let's work with variables now.
// Variables are containers for data of some "type."

// a. In Solidity, you can find some of the primitive types here:

// https://solidity-by-example.org/primitives/

// The type uint (used for variable `unlockTime`) is an alias for another type.
// Change uint to its aliased name for more clarity.

// Hint: remember to redeploy the contract after each change.

// b. In Solidity, there are three types of variables:

// https://solidity-by-example.org/variables/

// Create a new _global_ variable of type `string` and query it via Ether.JS
// (after deployment). Notice the difference if you declare it public or not.

// c. The new variable you created at point b. is never changing, i.e., it is
// a constant. To optimize your code, you could declare it as a constant 
// (follow the convention), then query it with Ethers.JS.

// Hint: https://solidity-by-example.org/constants/

// d. You can also optimize your code a bit more, if you declare unlockTime as
// immutable, then query it with Ethers.JS.

// Hint: https://solidity-by-example.org/immutable/

async function readVar() {
    console.log("Exercise 1: Read Var");

    // You need to get a signer and a contract.
    // Hint: use methods .getContractAt and .getSigners as we did in 
    // 4_Hardhat/2_ex_deploy.js
  
    // Getting the default signer.
    const hardhatSigners = await hre.ethers.getSigners();
    const hhSigner = hardhatSigners[0];
    console.log("HH Signer address:", hhSigner.address);
  
    // Getting the contract.
    const contractName = "Lock";
    // Change the contract address to your deployed contract address.
    const contractAddress = "YOUR_CONTRACT_ADDRESS";
  
    const lock = await hre.ethers.getContractAt(
        contractName,
        contractAddress,
        hhSigner
    );
  
    // Print the global variable you just created.
  
    // console.log(contractName + " globalVar:", await lock.globalVar());
    // Constant (followed the convention).
    console.log(contractName + " GLOBAL_VAR:", await lock.GLOBAL_VAR());
    
    console.log(contractName + " unlockTime:", await lock.unlockTime());
  
  };
  
  // readVar();
  
  // Bonus. Exercise 2B. Utility Function.
  ////////////////////////////////////////
  
  // In exercise 2, we accessed the contract and the signers from Hardhat. 
  // We will do it often in the exercises below, so it will be useful to write
  // a concise function to return a contract for a given signer and the signer
  // itself. 
  
  // The function could take the following input parameters:
  // 1. Contract name
  // 2. Contract address
  // 3. Index of the signer among Hardhat's signers
  
  // Hint1: return the default signer (index 0), if no signer index is specified
  // Hint2: return an array of [ contract, signer ] and use "array 
  // destruction" for quicker assignment outside of the function.
  // https://www.javascripttutorial.net/javascript-return-multiple-values/
  
  async function getContractAndSigner(cName, cAddress, signerIdx = 0) {
    
    // Getting the default signer.
    const hardhatSigners = await hre.ethers.getSigners();
    const signer = hardhatSigners[signerIdx];
  
    const contract = await hre.ethers.getContractAt(
        cName,
        cAddress,
        signer
    );
  
    return [ contract, signer ];
  }
  
  // Exercise 3. Constructor.
  ///////////////////////////
  
  // The constructor is an optional function executed once, at deployment time.
  
  // It can take input parameters as passed by the deployment script. Let's
  // understand better how the process works.
  
  // a. Let's make a new copy of Lock2, and name it Lock3.
  // Remove the input parameter and the require statement from the contructor,
  // and assign a fixed value to unlockTime.
  
  // Hint: you can take the value for unlockTime from the console.log of a
  // previous deployment.
  // Hint2: remember to also rename the contract.
  
  // b. Also create a new deploy script (for instance deploy3.js) to deploy Lock3,
  // and make sure that it does not pass any input parameter to Lock3.
  
  // Hint: in the deploy script, the first parameter goes to the constructor,
  // the second one is for overriding default transaction parameters. In this
  // case, we set the "value" option that specifies how much ether to send
  // along with a transaction (as we did in 3_EtherJS/3_signer.js).
  
  // c. Let's create a new global variable that stores the block number
  // at which the contract is deployed. This variable should be initialized in
  // the constructor. How should it be declared?
  
  // Hint: you can get the block number from the state variable `block`.
  
  // Checkpoint. How can you find out the block at which a contract was deployed
  // if you don't keep track of the block number?
  
  async function constructor() {
    console.log("Exercise 3: Constructor");
  
    // Getting the contract.
    const cName = "Lock3";
    // Change the contract address to your deployed contract address.
    const cAddress = "YOUR_CONTRACT_ADDRESS";
  
    const [ lock ] = await getContractAndSigner(cName, cAddress);
  
    let blockNum = await lock.blockNumber();
    console.log(contractName + " blockNumber:", Number(blockNum));
  }
  
  constructor();
  
  // Exercise 4. Events (and reverts).
  ////////////////////////////////////
  
  // Events allow logging to the Ethereum blockchain. Some use cases are:
  
  // - Listening for events and updating a user interface
  // - A cheap form of storage
  
  // https://solidity-by-example.org/events/
  
  // Events are stored forever on the blockchain, but they cannot be queried
  // by smart contracts (not even by the contract that created them). It's their
  // inaccessibility to smart contracts that makes them cheaper to emit.
  
  // Luckily, we can query them with Ethers.JS.
  
  // a. Create the event "WithdrawalAttempt" emitting the address attempting
  // to withdraw.
  
  // b. Emit the event "WithdrawalAttempt" before the require statements in the
  // withdraw method.
  
  // c. Listen to both events "WithdrawalAttempt" and "Withdrawal" with Ethers.js.
  // Try now to withdraw to the owner address and enjoy listening to the
  // events. What a music!
  // Hint: <contract>.on(<event>, callback)
  // Hint2: when you listen for events the process won't exit automatically, and
  // you need to invoke Ctrl-C to stop it.
  
  // d. Now, redeploy the same contract and try to withdraw from an 
  // unauthorized address. How many events are emitted in this case? 1, 2, or 0?
  
  // Checkpoint. The `require` command reverts completely a transaction if 
  // conditions are not met. It's all or nothing. If a transaction is reverted,
  // no changes at all are taking place, meaning that no event is ever emitted,
  // even if the require statement comes _after_ the emit statement.
  
  async function events() {
    console.log("Exercise 4: Events");
  
    // Getting the contract.
    const cName = "Lock3";
    // Change the contract address to your deployed contract address.
    const cAddress = "YOUR_CONTRACT_ADDRESS";
  
    const [ lock ] = await getContractAndSigner(cName, cAddress);
  
    // ...args is a special notation (rest operator) to combine any number
    // of input arguments into an array.
    // https://www.freecodecamp.org/news/three-dots-operator-in-javascript/
    lock.on("WithdrawalAttempt", (...args) => {
        console.log("Attempted Withdrwal");
        console.log(args);
    });
  
    // You can also access the input arguments directly.
    lock.on("Withdrawal", (balance, timestamp) => {
        console.log("Withdrawal");
        console.log("Balance: ", balance);
        console.log("Timestamp: ", timestamp);
        process.exit(0);
    });
  
    // Try and catch is not necessary, but it will hide a long error message.
    try {
        await lock.withdraw();
    }
    catch (e) {
        console.log("An exception occurred.");
    }
  }
  
  // events();
  
  // f. Bonus. You can query all the past events of a smart contract using
  
  // <contract>.queryFilter("*", fromBlock, toBlock);
  
  // Try to get how many past events have been emitted, and review what
  // information is available.
  
  async function getAllEvents() {
    console.log("Bonus. Exercise 4: Get All Events");
  
    // Getting the contract.
    const cName = "Lock3";
    // Change the contract address to your deployed contract address.
    const cAddress = "YOUR_CONTRACT_ADDRESS";
  
    const [ lock ] = await getContractAndSigner(cName, cAddress);
  
    let fromBlock = 0;
    let toBlock = hre.ethers.provider.getBlock().number;
    const events = await lock.queryFilter("*", fromBlock, toBlock);
  
    console.log(cName + ": " + events.length + " events found.");
  
    console.log("First Event:");
    console.log(events[0]);
  }
  
  // getAllEvents();
  
  // Advanced. Exercise 5. Mappings (and payable).
  ////////////////////////////////////////////////
  
  // Maps are key-value data structures that are optimized for fast retrieval.
  
  // You can immediately know if an index (key) exists in the mapping, but
  // you cannot iterate through the mapping to know all the existing keys.
  // You don't know how many entries are in the map either.
  
  // https://solidity-by-example.org/mapping/
  
  // Let's modify the Lock contract to support multiple owners and fractional
  // widthdrawals. Let's call the new contract Lock4.
  
  // a. The first owner is the creator of the contract, but owners can be added
  // at any time.
  // Hint: you need a mapping and a new method to add owners.
  
  // b. The withdraw method now returns a fraction of the value locked. For
  // instance, if the contract has three owners, each owner is entitled to
  // withdraw the value locked divided by three. 
  
  // Hint: the payable keyword defines method and addresses that can receive
  // ether into the contract.
  // https://solidity-by-example.org/payable/
  
  // Hint2: There exists two types of addresses: payable and non payable.
  // https://docs.soliditylang.org/en/latest/types.html#address
  
  // c. Each owner can withdraw only once; revert the transaction if an owner
  // has already withdrawn.
  
  // d. Write two utility methods to display:
  // - the amount received by each owner (i.e., before and after withdrawing)
  // - the number of owners and the amount of Ether left in the contract.
  
  
  async function mappings() {
    console.log("Advanced. Exercise 5: Mappings (and payable)");
  
   // Getting the contract.
   const cName = "Lock4";
   // Change the contract address to your deployed contract address.
   const cAddress = "YOUR_CONTRACT_ADDRESS";
  
   // Get five contracts for 5 signers.
   const [ lock0, signer0 ] = await getContractAndSigner(cName, cAddress, 0);
   const [ lock1, signer1 ] = await getContractAndSigner(cName, cAddress, 1);
   const [ lock2, signer2 ] = await getContractAndSigner(cName, cAddress, 2);
   const [ lock3, signer3 ] = await getContractAndSigner(cName, cAddress, 3);
   const [ lock4, signer4 ] = await getContractAndSigner(cName, cAddress, 4);
   
   // This will not be added as owner.
   const [ lock5, signer5 ] = await getContractAndSigner(cName, cAddress, 5);
  
    // Let's have 5 owners in total.
    
    // Default signer adds two other owners.
    await lock0.addOwner(signer1.address);
    await lock0.addOwner(signer2.address);
    // Owner at index 2 adds another one.
    await lock2.addOwner(signer3.address);
    // Owner at index 3 adds another one.
    await lock3.addOwner(signer4.address);
  
    // Let's count how many we have.
    await getContractStatus(lock0);
  
    // Let's check the mapping values.
    console.log('Mappings for signers (0-5):')
    console.log(await lock0.owners(signer0.address));
    console.log(await lock0.owners(signer1.address));
    console.log(await lock0.owners(signer2.address));
    console.log(await lock0.owners(signer3.address));
    console.log(await lock0.owners(signer4.address));
    console.log(await lock0.owners(signer5.address));
  
    // Each owner should get 0.2 Ether. Let's check whether it works.
    await checkBalanceBeforeAfter(signer0, lock0);
    await checkBalanceBeforeAfter(signer1, lock1);
    await checkBalanceBeforeAfter(signer2, lock2);
    await checkBalanceBeforeAfter(signer3, lock3);
    await checkBalanceBeforeAfter(signer4, lock4);
  }
  
  const checkBalanceBeforeAfter = async (signer, lockContract) => {
    // Check the balance change for signer.
    let b1 = await signer.getBalance();
    let tx = await lockContract.withdraw();
    await tx.wait();
    let b2 = await signer.getBalance();
    // With Ethers v5 we need to explicitely cast to BigInt. 
    let diff = BigInt(b2) - BigInt(b1);
    b2 = ethers.utils.formatEther(diff);
    console.log('The balance after withdrawing is net +' + b2 + ' ETH');
  
    await getContractStatus(lockContract);
  };
  
  const getContractStatus = async lockContract => {
    // Report info about contract.
    let leftInContract = await hre.ethers.provider.getBalance(lockContract.address);
    leftInContract = ethers.utils.formatEther(leftInContract);
    let numOwners = await lockContract.ownerCounter();
    console.log('On lock there is +' + leftInContract + ' ETH left and ' + 
                    numOwners + " owners now");
  };
  
  // mappings();
  