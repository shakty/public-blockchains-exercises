// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");

async function main() {

    // Get signers added in hardhat.config.js
    const [signer1, signer2] = await hre.ethers.getSigners();

    // Pick the deployer (default is signer1).
    const signer = signer1;
    
    console.log('Deploying validator...');

    // Deploying the empty validator for local deploying/testing.
    const Val = await hre.ethers.getContractFactory("EmptyValidator", {
        signer: signer,
    });
    const val = await Val.deploy();
    console.log('Local Validator address: ' + val.address);

    // Now we can deploy the assignment.
    const Ass = await hre.ethers.getContractFactory("Assignment2_Template", {
        signer: signer,
    });

    // We pass the validator address to the constructor (make sure to pass
    // the parameter to the constructor of BaseAssignment).
    const ass = await Ass.deploy(val.address);

    console.log("Deploying assignment from address: " + signer.address);

    await ass.deployed();

    console.log(`Assignment deployed to ${ass.address}`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
