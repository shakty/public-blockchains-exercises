// To make it a littler fancier.
const readline = require("readline");


const getUserAnswer = async () => {
    const userAnswer = await getUserInput("Your answer (type 'yes' or 'no'): ");
    const normalizedUserAnswer = userAnswer.toLowerCase() === "yes";
    console.log(`You answered: ${normalizedUserAnswer ? "Yes" : "No"}`);
    return normalizedUserAnswer;
};

const moreInfo = (receipt) => {
    console.log('More info here: https://sepolia.etherscan.io/tx/' + 
    receipt.hash);
};

const extractQuestion = (quizContract, receipt) => {

    // Retrieve logs from all events
    const logs = receipt.logs.map((log) => {
        // console.log(log);
        let parsedLog = quizContract.interface.parseLog(log);
        // console.log(parsedLog);
        return parsedLog;
    });

    // console.log('LOGS');
    // console.log(logs);

    // Find the QuestionAsked event
    const questionEvent = logs.find((log) => log.name === "QuestionAsked");

    if (!questionEvent) {
        console.log('Error! Could not find logs.');
        return { text: false, id: false };
    }

    const text = questionEvent.args[1];
    const id = questionEvent.args[2];

    return { text, id };
};

async function getUserInput(prompt) {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    });

    return new Promise((resolve) => {
        rl.question(prompt, (answer) => {
            rl.close();
            resolve(answer);
        });
    });
}

module.exports = { getUserAnswer, extractQuestion, moreInfo };