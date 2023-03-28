// First exercises with ERC Tokens.
//////////////////////////////////////////////

// Resources:

// https://ethereum.org/en/developers/docs/standards/tokens/

// https://ethereum.org/en/developers/docs/standards/tokens/erc-20/

// https://eips.ethereum.org/EIPS/eip-20


// Exercise 1. Make sure you environment is set up.
///////////////////////////////////////////////////

// Implement an ERC-20 token.

// a. Easier. From the template:

// contracts/ERC_20_template.sol

// b. Harder. From scratch.

// Checkpoint. What is purpose of the variable decimals?
// Here is a good explanation from OpenZeppelin:
// https://docs.openzeppelin.com/contracts/4.x/erc20#a-note-on-decimals

// c. Deploy your token to your favorite net and test it:

// Try to execute the transfer and the transferFrom methods.

require('dotenv').config();
const ethers = require("ethers");
console.log(ethers.version);

// Update info to match your contract.
const cAddress = "";
const cName = "MyERC20";

// V5 Syntax for executing within an Hardhat project.
const notUniMaUrl = process.env.NOT_UNIMA_URL_1;
const notUniMaProvider = new ethers.providers.JsonRpcProvider(notUniMaUrl);

// The deployer is the first address in the `accounts` field inside a 
// network declaration in hardhat.config.js. 

// For instance, if this the declation of the unima network:

// unima: {
//     url: ...,
//     accounts: [ "0x1...", "0x2..." ],
// }

// The deployer is the address beginning with "0x1...", unless otherwise
// specified by in the deploy script.

let signer = new ethers.Wallet(process.env.METAMASK_1_PRIVATE_KEY, notUniMaProvider);
console.log(signer.address);

let deployer = new ethers.Wallet(process.env.METAMASK_2_PRIVATE_KEY, notUniMaProvider);
console.log(deployer.address);

const getContract = async(signer) => {

    // Adjust path as needed.
    // Fetch the ABI from the artifacts.
    const cABI = require("../artifacts/contracts/" + cName + 
                           ".sol/" + cName + ".json").abi;

    // Create the contract and print the address.
    const c = new ethers.Contract(cAddress, cABI, signer);

    console.log(cName + " address: ", c.address);

    return c;
};

const transfer = async () => {

    // Your code here.
};

// transfer();

const transferFrom = async () => {

    // Your code here.

};

// transferFrom();




// Checkpoint. What is purpose of the variable decimals?
// Here is a good explanation from OpenZeppelin:
// https://docs.openzeppelin.com/contracts/4.x/erc20#a-note-on-decimals

// Exercise 2. Mint method.
///////////////////////////

// Add a mint method to the contract so that the owner (i.e., the deployer) 
// can increase the total supply and assign the new supply to an address of 
// choice (can't be the null address).

const mint = async (amount) => {
  
    // Your code here.
};
// mint(1000);




