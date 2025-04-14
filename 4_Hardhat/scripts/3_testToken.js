// Tester file for Assignment 3.
////////////////////////////////

// Uncomment the function calls for the task you want to test
// and then run the entire file.

// Do not forget to update contract address and path to ABI.

const path = require("path");

const hre = require("hardhat");
const ethers = hre.ethers;

async function main() {
  // Retrieve signers from Hardhat (as defined in the hardhat.config.js file).
  const [signer1, signer2, signer3] = await ethers.getSigners();

  // Pick the deployer (default is signer1).
  const signer = signer3;
  console.log("Deployer of contract is:", signer.address);

  // Contract.
  ////////////

  // Contract address.
  const contractAddr = "0xBb2A674a641F7EbE4f76b3cE78Da5D143F6D6F84";

  // Locate ABI as created by Hardhat after compilation/deployment.
  // (adjust names and path accordingly).
  const pathToABI = path.join(
    __dirname,
    "..",
    "artifacts",
    "contracts",
    "Assignment3.1_Token.sol",
    "Assignment3p1Token.json"
  );
  // console.log(pathToABI);

  const ABI = require(pathToABI).abi;
  // console.log(ABI);

  // Create contract with attached signer.
  const contract = new ethers.Contract(contractAddr, ABI, signer);

  // Addresses.
  /////////////

  // Owner.
  const owner = signer.address;
  // console.log(owner);

  // If owner is defined in your contract check that it is the same as above.
  // console.log("Owner is ", await contract.owner());

  // Address used for blacklisting.
  const testSigner = signer2;
  const testAddr = testSigner.address;
  // console.log('TEST ADDRESS: ', testAddr);

  // Validator address
  // (or any other address, not actually used for validation here).
  const validatorAddr = "0x0fc1027d91558dF467eCfeA811A8bCD74a927B1e";

  // TASK A.
  //////////

  const taskA1 = async function () {
    console.log("TASK A1");
    ///////////////////////

    // Check balances.
    let balVal = await contract.balanceOf(validatorAddr);
    console.log("Balance validator", ethers.formatEther(balVal));
    let balOwner = await contract.balanceOf(owner);
    console.log("Balance owner", ethers.formatEther(balOwner));

    const expectedBalVal = ethers.parseEther("10");

    if (balVal !== expectedBalVal) {
      console.info("  Error! Balance of validator is not 10.");
    } else {
      console.error("  OK! Balance of validator is 10.");
    }

    const totalSupply = await contract.totalSupply();

    if (balOwner !== totalSupply - expectedBalVal) {
      console.info("  Error! Balance of owner is not totalSupply - 10.");
    } else {
      console.error("  OK! Balance of validator is totalSupply - 10.");
    }
  };

  // await taskA1();

  const taskA2 = async function () {
    console.log("TASK A2");
    ///////////////////////

    let allowance = await contract.allowance(owner, validatorAddr);
    console.log(
      "Allowance of validator on owner",
      ethers.formatEther(allowance)
    );

    const expectedAll =
      (await contract.totalSupply()) - ethers.parseEther("10");

    if (expectedAll !== allowance) {
      console.info("  Error! Allowance of validator is not totalSupply - 10.");
    } else {
      console.error("  OK! Allowance of validator is totalSupply - 10.");
    }
  };

  // await taskA2();

  // TASK B and C.
  ////////////////

  // Parameters:
  //
  // addr: the address to test
  // cb: a callback to call after un/blacklisting.
  //
  // Note: callbacks are called also in case of errors.
  //
  async function taskBandC(addr, cb) {
    let bl = await contract.isBlacklisted(addr);
    if (bl) {
      console.log("Address is already blacklisted, undoing it.");
      let tx = await contract.unblacklistAddress(addr);
      await tx.wait();
      bl = await contract.isBlacklisted(addr);

      if (bl) console.log("  Error! Unblacklisting did not work!");
      else console.log("  OK! Unblacklisting worked!");
    } else {
      console.log("Address is not blacklisted, adding it to the list.");
      let tx = await contract.blacklistAddress(addr);
      await tx.wait();
      bl = await contract.isBlacklisted(addr);

      if (bl) console.log("  OK! Blacklisting worked!");
      else console.log("  Error! Blacklisting did not work!");
    }

    if (cb) await cb(addr, bl);
  }

  // await taskBandC(testAddr);

  // TASK D.
  //////////

  async function taskDcb(addr, isBlacklisted) {
    let tx;

    // Transaction TO blacklisted.
    try {
      tx = await contract.transfer(addr, ethers.parseEther("1"));
      await tx.wait();
      if (isBlacklisted) {
        console.log(
          "  Error! Transaction to blacklisted address did not revert!"
        );
      } else {
        console.log(
          "  OK! Transaction to non-blacklisted address did not revert!"
        );
      }
    } catch (e) {
      if (isBlacklisted) {
        console.log("  OK! Transaction to blacklisted address reverted!");
      } else {
        console.log(
          "  Error! Transaction to non-blacklisted address reverted!"
        );
      }
    }
  }

  // await taskBandC(testAddr, taskDcb);

  async function taskDcbFrom(addr) {
    const isBlacklisted = await contract.isBlacklisted(addr);

    // Transfer some tokens to testAddr and the blacklist it.
    if (!isBlacklisted) {
      console.log(
        "Address is not blacklisted, transferring Ether and blacklisting"
      );
      let tx = await contract.transfer(addr, ethers.parseEther("1"));
      await tx.wait();
      tx = await contract.blacklistAddress(addr);
      await tx.wait();
    } else {
      console.log("Address is already blacklisted.");
    }

    // Create contract with testSigner.
    const contractFrom = new ethers.Contract(contractAddr, ABI, testSigner);
    // const isBlacklisted2 = await contractFrom.isBlacklisted(addr);
    // console.log('CFrom is blacklisted', isBlacklisted2);

    try {
      tx = await contractFrom.transfer(owner, ethers.parseEther("1"));
      await tx.wait();
      console.log(
        "  Error! Transaction from blacklisted address did not revert!"
      );
    } catch (e) {
      console.log("  OK! Transaction from blacklisted address reverted!");
    }
  }

  // await taskDcbFrom(testAddr);

  // TASK E.
  //////////

  async function taskE() {
    let fromBlock = 0;
    let toBlock = ethers.provider.getBlock().number;

    // Interface.
    const contractInterface = new ethers.Interface(ABI);

    const events = await contract.queryFilter("*", fromBlock, toBlock);

    let eventCounterBl = 0;
    let eventCounterUbl = 0;
    const eventBlacklisted = "Blacklisted";
    const eventUnblacklisted = "Unblacklisted";
    events.forEach((logToParse) => {
      const parsedLog = contractInterface.parseLog(logToParse);
      // console.log(parsedLog)
      if (parsedLog.name === eventBlacklisted) {
        if (parsedLog.args[0] === testAddr) eventCounterBl++;
      } else if (parsedLog.name === eventUnblacklisted) {
        if (parsedLog.args[0] === testAddr) eventCounterUbl++;
      }
    });

    // console.log(eventCounterBl, eventCounterUbl);

    if (eventCounterBl > 0 && eventCounterUbl > 0) {
      console.log("  OK! Events correctly emitted!");
    } else {
      console.log("  Error! Events NOT correctly emitted!");
    }
  }

  await taskE();
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
