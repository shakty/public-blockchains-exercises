const { ethers } = require("hardhat");

async function main() {
    // const [deployer] = await ethers.getSigners();

    const GasTest = await ethers.getContractFactory("GasTest");
    const gasTest = await GasTest.deploy();
    await gasTest.waitForDeployment();

    let tx, receipt;

    let estimate;

    console.log('\n');

    // Gas estimate for useStorage (writing to storage)
    estimate = await gasTest.useStorage.estimateGas(100);
    console.log(`Estimated Gas used by useStorage: ${estimate.toString()}`);

    // Gas estimate for useStorage (writing to storage)
    tx = await gasTest.useStorage(100);
    receipt = await tx.wait();
    console.log(`Gas actually used by useStorage: ${receipt.gasUsed.toString()}`);

    // Gas estimate for useMemory (using memory)
    estimate = await gasTest.useMemoryVal.estimateGas(100);
    console.log(`Estimated Gas used by useMemoryVal: ${estimate.toString()}`);

    console.log('\n-----\n');

    // Gas estimate for useMemoryArr (with array)
    estimate = await gasTest.useMemoryArr.estimateGas([1, 2, 3]);
    console.log(`Gas used by useMemoryArr: ${estimate.toString()}`);

    // Gas estimate for useCalldata
    estimate = await gasTest.useCalldata.estimateGas([1, 2, 3]);
    console.log(`Gas used by useCalldata: ${estimate.toString()}`);

    console.log('\n-----\n');

    // Gas estimate for useMemoryReturnMemory
    estimate = await gasTest.useMemoryReturnMemory.estimateGas("Hello!");
    console.log(`Gas used by useMemoryReturnMemory: ${estimate.toString()}`);

    // Gas estimate for useCalldataReturnCalldata
    estimate = await gasTest.useCalldataReturnCalldata.estimateGas("Hello!");
    console.log(`Gas used by useMemoryReturnCalldata: ${estimate.toString()}`);

    console.log('\n-----\n');

    // Gas estimate for useStack
    estimate = await gasTest.useStack.estimateGas(100);
    console.log(`Gas used by useStack: ${estimate.toString()}`);

    
    console.log('\n-----\n');

    // Gas estimate for useMemoryAndStorage
    estimate = await gasTest.useMemoryAndStorage.estimateGas(100);
    console.log(`Gas used by useMemoryAndStorage: ${estimate.toString()}`);
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
