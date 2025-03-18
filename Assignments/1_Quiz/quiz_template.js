// Ethers JS: Quiz Contract.
////////////////////////////

// Note: this script includes reading from command-line and it might not
// work well with Code Runner. Please run inside a terminal.

// Load dependencies.
/////////////////////

const path = require("path");

const ethers = require("ethers");

// Adjust path to your .env file.
const pathToDotEnv = path.join(__dirname, "..", "..", ".env");
// console.log(pathToDotEnv);
require("dotenv").config({ path: pathToDotEnv });

const { getUserAnswer, extractQuestion } =
    require(path.join(__dirname, "quiz_helper.js"));

// Create Signer and Contract.
//////////////////////////////

const providerKey = process.env.ALCHEMY_KEY;
const sepoliaUrl = `${process.env.ALCHEMY_SEPOLIA_API_URL}${providerKey}`;
// console.log(sepoliaUrl);
const sepoliaProvider = new ethers.JsonRpcProvider(sepoliaUrl);

const signer = new ethers.Wallet(
    process.env.METAMASK_1_PRIVATE_KEY,
    sepoliaProvider
);

const quizABI = require(path.join(__dirname, "quiz_abi"));

// The address of the Quiz contract.
const contractAddress = "0x01FaE6a3E15b8cf2cb89C259b2d6e5bf7cf94782";

const quizContract = new ethers.Contract(contractAddress, quizABI, signer);

async function main() {

    // A. Ask question and get a transaction receipt.
    // Hint: method `askQuestion()`

    // Your code here.
    console.log('Calling askQuestion()')
    tx = await quizContract.askQuestion()
    console.log('Transaction in the mempool!')
    const receipt = await tx.wait()
    console.log('First transaction mined')

    // From the transaction receipt we can extract useful information, such as
    // as the question's text and id that were stored in the logs
    // (we will understand logs in detail later in the course).
    console.log('Extracting the question and question ID')
    const { text, id } = extractQuestion(quizContract, receipt);

    if (!text) {
        console.log('An error occurred, please try again.');
        console.log('More info here: https://sepolia.etherscan.io/tx/' +
            receipt.hash);
        return;
    }

    console.log('Question: ', text)
    // Now YOU answer the question!
    // Capture user input from the terminal.
    console.log('Enter Yes/No:')
    const userAnswer = await getUserAnswer();
    console.log('Saving your answer to the blockchain')
    // B. Send the answer to the smart contract.
    // Hint: method `answerQuestion`.

    // Your code here.
    tx = await quizContract.answerQuestion(id, userAnswer)
    console.log('Second transaction in mempool')
    await tx.wait()
    console.log('Second transaction mined!')

    // C. Optional. Verify that the answer is correctly stored.
    // Hint: method `getAnswer(questionId)`

    // Your code here.
    stored = await quizContract.getAnswer(id)
    console.log(stored)
}


main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
