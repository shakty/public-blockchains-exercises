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

const getContractInfo = async () => {
    const contract = await getContract(signer);
    console.log("Total Supply: ", Number(await contract.totalSupply()));
    await getContractBalance();
};
// getContractInfo();


const getContractBalance = async (formatEther = true) => {
    let balance = await notUniMaProvider.getBalance(cAddress);
    if (formatEther) balance = ethers.utils.formatEther(balance);
    console.log("ETH in contract: ", balance);
    return balance;
};
// getContractBalance();

const waitForTx = async (tx, verbose) => {
    console.log('Transaction in mempool!');
    if (verbose) console.log(tx);
    else console.log(tx.nonce, tx.hash);
    await tx.wait();
    console.log('Transaction mined!');
};

const transfer = async () => {
    // Get contract.
    const contract = await getContract(deployer);

    // Check balances.
    let balance = await contract.balanceOf(deployer.address);
    console.log("Current sender balance: ", Number(balance));
    let balanceReceiver = await contract.balanceOf(signer.address);
    console.log("Current receiver balance: ", Number(balanceReceiver));
    
    // Transfer.
    let amountToTransfer = 10;
    console.log("Tokens to send: ", amountToTransfer);
    let tx = await contract.transfer(signer.address, amountToTransfer);
    await waitForTx(tx);
    
    // Check balances.
    let balance2 = await contract.balanceOf(deployer.address);
    console.log("Updated sender balance: ", Number(balance2));
    let balanceReceiver2 = await contract.balanceOf(signer.address);
    console.log("Current receiver balance: ", Number(balanceReceiver2));
};

// transfer();

const transferFrom = async () => {
    // Get contracts.
    const contract = await getContract(deployer);
    const contractReceiver = await getContract(signer);
    
    // Approve.
    let tx = await contract.approve(signer.address, 100);
    await waitForTx(tx);
    console.log("Receiver Signer approved for spending!")

    // Check balances.
    let balance = await contract.balanceOf(deployer.address);
    console.log("Current sender balance: ", Number(balance));
    let balanceReceiver = await contract.balanceOf(signer.address);
    console.log("Current receiver balance: ", Number(balanceReceiver));

    // Transfer from.
    let amountToTransfer = 10;
    console.log("Tokens to transfer: ", amountToTransfer);
    tx = await contractReceiver.transferFrom(deployer.address, signer.address, amountToTransfer);
    await waitForTx(tx);

    // Check balances.
    let balance2 = await contract.balanceOf(deployer.address);
    console.log("Updated sender balance: ", Number(balance2));
    let balanceReceiver2 = await contract.balanceOf(signer.address);
    console.log("Current receiver balance: ", Number(balanceReceiver2));

    // Check allowance.
    let allowance = await contract.allowance(deployer.address, signer.address);
    console.log("Allowance left: ", Number(allowance));

};

// transferFrom();

// Exercise 2. Mint method.
///////////////////////////

// Add a mint method to the contract so that the owner (i.e., the deployer) 
// can increase the total supply and assign the new supply to an address of 
// choice (can't be the null address).

const mint = async (amount) => {
    const contract = await getContract(deployer);    
    let tx = await contract.mint(deployer.address, amount);
    await waitForTx(tx);
    const newTotalSupply = Number(await contract.totalSupply());
    console.log('New total supply:', newTotalSupply);
};
// mint(1000);


