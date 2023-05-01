const path = require('path');
const pathToEnv = path.join(__dirname, '..', '..', '.env');

const fs = require('fs');

console.log(pathToEnv);
if (fs.existsSync(pathToEnv)) {
    console.log('You found the .env file!');
}
// return;

// Default: path.resolve(process.cwd(), '.env')
// console.log(process.cwd());
// console.log(__dirname);
// return;

// Understanding loading of of .env file.

// require("dotenv").config(); // Works with Node Runner.
// require("dotenv").config({ path: '../.env' }); // Works relatively to the the directory of execution in terminal.

// Default: path.resolve(process.cwd(), '.env')

require("dotenv").config({ path: pathToEnv });


const { BigNumber, ethers } = require("ethers");
console.log(ethers.version);

// To generate a random seed.
const crypto = require("crypto");

const cAddress = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512";
const cName = "TestContract";

const localhostProvider = new ethers.providers.JsonRpcProvider(
    "http://127.0.0.1:8545"
);

// Hardhat.
// const [signer1, signer2] = await hre.ethers.getSigners();

let signer = new ethers.Wallet(
    process.env.HARDHAT_1_PRIVATE_KEY,
    localhostProvider
);
// console.log("Signer 1: ", signer.address);

let deployer = new ethers.Wallet(
    process.env.HARDHAT_2_PRIVATE_KEY,
    localhostProvider
);
// console.log("Signer 2: ", deployer.address);

const getContract = async (
    signer = deployer
) => {
    // Fetch the ABI from the artifacts.
    const cABI = require("../artifacts/contracts/" +
        cName +
        ".sol/" +
        cName +
        ".json").abi;

    // Create the contract and print the address.
    const c = new ethers.Contract(cAddress, cABI, signer);

    // console.log(cName + " address: ", c.address);

    return c;
};


// Exercise 1: Raw transaction with no parameters: aided encoding.
//////////////////////////////////////////////////////////////////

// In Ethereum everything is a transaction. Invoking a method on a smart 
// contract is no exception, that is a transaction too.

// Now, instead of invoking a smart contract's method like a human, you will
// do it like your client is doing it behind the scenes, that is with a 
// "raw transaction."

// A raw transaction is a transaction to a contract address with a special
// `data` parameter (other parameters are available, but let's focus on data).

// The `data` parameter contains the ABI encoded signature of the method, plus
// any input parameter append along. For instance: 

// - Encoded signature of a method with no input parameters:
//   "0xc48d6d5e"
// - Encoded signature of a method with two input parameters: 
//   "0xcdcd77c000000000000000000000000000000000000000000000000000000000000000450000000000000000000000000000000000000000000000000000000000000001"

// We'll understand the nitty gritty details in the next exercise. For now, 
// we will use this website:

// https://abi.hashex.org/

// to get out the encoded signature for the method `reset()` of the
// contract TestContract.
// Hint: No parentheses.

const rawTransactionBasic = async () => {
    console.log();
    
    const contract = await getContract(deployer);
    // Reset contract state.
    await contract.reset();

    let greeting = await contract.greeting();
    console.log("Current greeting:", greeting);
    
    // Updating greeting.
    await contract.setGreeting("Buongiorno");
    
    greeting = await contract.greeting();
    console.log("Updated greeting:", greeting);
    
    console.log();
    console.log("**Raw transaction**: reset()");
    console.log();

    // Fill in this value with the encoded signature of reset():
    let encodedSignature = "ENCODED_SIGNATURE_HERE"; // "d826f88f"; 
    let calldata = "0x" + encodedSignature;

    // Raw transaction.
    const tx = await signer.sendTransaction({
        to: cAddress,
        data: calldata
    });
    
    await waitForTx(tx);
    
    greeting = await contract.greeting();
    console.log("Greeting after reset:", greeting);
    
};

// rawTransactionBasic();


// Exercise 2: Raw transaction with no parameters: do your own encoding.
///////////////////////////////////////////////////////////////////////

// Now that you got the gist of raw transactions, it's time to understand
// how to do your own encoding.

// To get a function signature, you need to hash the prototype string of
// function with Keccak256. Then extract its first 4 bytes.

// Here is additional explanation with examples.
// https://docs.soliditylang.org/en/v0.8.11/abi-spec.html#examples

// Luckily, we have worked with Keccack256 in the previous exercise sheet.
// It is time to send your first raw transaction.

const doKeccak256 = (signature) => {
    // Convert string to bytes.
    signature = ethers.utils.toUtf8Bytes(signature);
    // Hash the bytes.
    return ethers.utils.keccak256(signature);
};

const rawTransaction2DIY = async () => {
    console.log();

    const contract = await getContract(deployer);
    // Reset contract state.
    await contract.reset();

    let greeting = await contract.greeting();
    console.log("Current greeting:", greeting);

    // Updating greeting.
    await contract.setGreeting("Buongiorno");

    greeting = await contract.greeting();
    console.log("Updated greeting:", greeting);
    
    console.log();
    console.log("**Raw transaction**: reset()");
    console.log();
    
    // Hash the signature with Keccak256.
    let signature = "reset()";
    
    let calldata = doKeccak256(signature);
    console.log("Hashed signature:", calldata);

    // Take the first 4 bytes.
    calldata = calldata.substring(0, 10); // 8 + 2 (0x).
    console.log("Taking 4 Bytes:  ", calldata);


    const tx = await signer.sendTransaction({
        to: cAddress,
        data: calldata
    });

    await waitForTx(tx);

    greeting = await contract.greeting();
    console.log("Greeting after reset:", greeting);
};

// rawTransactionDIY();

// Exercise 3: Raw transaction with parameters & do your own encoding.
//////////////////////////////////////////////////////////////////////

// Now let's do it even more complicated. Let's send parameters along.

// Hint: You can compare your own encoding with the output from
// https://abi.hashex.org/

const encodeSignature = (signature, verbose) => {
    // Hash the signature with Keccak256.    
    let hashed = doKeccak256(signature);
    if (verbose) console.log("Hashed signature:", hashed);
    // Take the first 4 bytes.
    hashed = hashed.substring(0, 10); // 8 + 2 (0x).
    if (verbose) console.log("Taking 4 Bytes:  ", hashed);
    return hashed;
}

const rawTransactionParams = async () => {

    const contract = await getContract(deployer);
    // Reset contract state.
    await contract.reset();

    let greeting = await contract.greeting();
    console.log("Current greeting:", greeting);

    // Set greeting with raw transaction.

    let signature = "setGreeting(string)";
    // Hash the signature with Keccak256 and takes 4 bytes.
    let calldata = encodeSignature(signature);
    

    // Add parameter String parameter "Buongiorno", or get inspired here:
    // https://www.berlitz.com/blog/hello-different-languages

    const abc = new ethers.utils.AbiCoder();
    const encodedParam = abc.encode(["string"], ["Buongiorno"]);
    console.log("Encoded params:", encodedParam);

    calldata += encodedParam;
    console.log("Calldata:      ", calldata);

    // calldata = "0x" + "a41368620000000000000000000000000000000000000000000000000000000000000020000000000000000000000000000000000000000000000000000000000000000a42756f6e67696f726e6f00000000000000000000000000000000000000000000";
    // console.log()
    // console.log("Calldata:      ", calldata);

    console.log();
    console.log("**Raw transaction**: setGreeting(string)");
    console.log();

    tx = await signer.sendTransaction({
        to: cAddress,
        data: calldata
    });

    await waitForTx(tx);

    // Check if greeting was updated.
    greeting = await contract.greeting();
    console.log("Updated greeting:", greeting);

    console.log();
    console.log("**Raw transaction**: reset()");
    console.log();
    
    // Reset.
    signature = "reset()";
    calldata = encodeSignature(signature);

    const tx = await signer.sendTransaction({
        to: cAddress,
        data: calldata
    });

    await waitForTx(tx);

    greeting = await contract.greeting();
    console.log("Greeting after reset:", greeting);    
};

rawTransactionParams();

const getCode = async () => {
    const code = await notUniMaProvider.getCode(cAddress);
    console.log(code);
    const abc = new ethers.utils.AbiCoder();
    abc.encode(["uint32", "bool"], [69, true]);
};


// getCode();


// Helper:


const waitForTx = async (tx, verbose) => {
    console.log();
    console.log("Transaction in mempool...");
    if (verbose) console.log(tx);
    else console.log('Nonce:', tx.nonce, 'Hash:', tx.hash);
    await tx.wait();
    console.log("Transaction mined!");
    console.log();
};
