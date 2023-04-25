require("dotenv").config();
const { BigNumber, ethers } = require("ethers");
console.log(ethers.version);

// To generate a random seed.
const crypto = require("crypto");

// Update your contract name.
const cAddress = "0xe197c90f7544ADC0369a456DC4470ecD32747c33";
const cName = "Assignment2_Template";

const localhostProvider = new ethers.providers.JsonRpcProvider(
    "http://127.0.0.1:8545"
);

// Hardhat.
// const [signer1, signer2] = await hre.ethers.getSigners();

let signer = new ethers.Wallet(
    process.env.METAMASK_1_PRIVATE_KEY,
    notUniMaProvider
);
console.log("Signer 1: ", signer.address);

let deployer = new ethers.Wallet(
    process.env.METAMASK_2_PRIVATE_KEY,
    notUniMaProvider
);
console.log("Signer 2: ", deployer.address);

const getAssContract = async (
    signer = deployer
) => {
    // Fetch the ABI from the artifacts.
    const assABI = require("../../artifacts/contracts/assignment_2/" +
        cName +
        ".sol/" +
        cName +
        ".json").abi;

    // Create the contract and print the address.
    const ass = new ethers.Contract(cAddress, assABI, signer);

    console.log(cName + " address: ", ass.address);

    return ass;
};

// Exercise 1: Implement keccak256 hashing of a choice for assignment 2.
////////////////////////////////////////////////////////////////////////

// Hint: ethers.utils.keccak256
// Hint2: ethers.utils.toUtf8Bytes

const doKeccak256 = (choice, seed) => {
    let hashed = "";
    // Concatenate strings.
    if ("undefined" !== typeof seed) {
        hashed += seed + "_";
    }
    hashed += choice;

    // Convert string to bytes.
    hashed = ethers.utils.toUtf8Bytes(hashed);
    // Hash the bytes.
    hashed = ethers.utils.keccak256(hashed);
    return hashed;
};

const testReveal = async () => {
    let hashedRock = doKeccak256("rock");
    let hashedPaper = doKeccak256("paper");
    let hashedScissors = doKeccak256("scissors");

    console.log("Hashed rock:", hashedRock);
    console.log("Hash paper:", hashedPaper);
    console.log("Hash scissors:", hashedScissors);

    // See:
    // https://nodejs.org/api/crypto.html#crypto_crypto_randombytes_size_callback
    crypto.randomBytes(20, async function (ex, buf) {
        let seed = buf.toString("base64");
        console.log("Seed: ", seed);

        let hashedSeedRock = doKeccak256("rock", seed);
        let hashedSeedPaper = doKeccak256("paper", seed);
        let hashedSeedScissors = doKeccak256("scissors", seed);

        console.log("Hashed [seed]_rock:", hashedSeedRock);
        console.log("Hashed [seed]_paper:", hashedSeedPaper);
        console.log("Hashed [seed]_scissors:", hashedSeedScissors);

        const c = await getAssContract(deployer, localhostProvider);

        await checkRevealChoice(seed, "rock", hashedSeedRock, c);
        await checkRevealChoice(seed, "paper", hashedSeedPaper, c);
        await checkRevealChoice(seed, "scissors", hashedSeedScissors, c);

        console.log();
        console.log("Now mixing up the choices");
        console.log();

        await checkRevealChoice(seed, "banana", hashedSeedRock, c);
        await checkRevealChoice(seed, "cement", hashedSeedPaper, c);
        await checkRevealChoice(seed, "flame_thrower", hashedSeedScissors, c);
    });
};

testReveal();



// Helper functions.
////////////////////

const checkRevealChoice = async (seed, choice, hashedChoice, contract) => {
    const res = await contract.checkRevealed(seed, choice, hashedChoice);
    let str = 'Choice "' + choice + '" is ';
    if (!res) str += "NOT ";
    str += " revelead correctly";
    console.log(str);
};

const waitForTx = async (tx, verbose) => {
    console.log("Transaction in mempool!");
    if (verbose) console.log(tx);
    else console.log(tx.nonce, tx.hash);
    await tx.wait();
    console.log("Transaction mined!");
};
