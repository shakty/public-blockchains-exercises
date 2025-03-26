
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

// Import BaseAssignment.sol (Note! You might need to adjust the path).
import "../BaseAssignment.sol";


contract MyQuiz is BaseAssignment {
    address public owner;

    string[] public questions;
    mapping(string => bool) public answers;

    mapping(address => mapping(string => bool)) public userAnswers;

    event QuestionAsked(address indexed user, string question, bool answerIsYes);
    event AnswerStored(address indexed user, string question, bool userAnswer);

    constructor(string[] memory initialQuestions, bool[] memory initialAnswers)
    BaseAssignment(0x57BcE7314275bc435b2dAB9191f5777bb2C4F7a9)
    {
        require(initialQuestions.length == initialAnswers.length, "Mismatched array lengths");

        owner = msg.sender;
        questions = initialQuestions;

        for (uint256 i = 0; i < initialQuestions.length; i++) {
            answers[initialQuestions[i]] = initialAnswers[i];
        }
    }

    function askQuestion() external payable {
        uint256 randomIndex = uint256(keccak256(abi.encodePacked(block.timestamp, blockhash(block.number - 1)))) % questions.length;
        string memory question = questions[randomIndex];
        bool answerIsYes = answers[question];
        emit QuestionAsked(msg.sender, question, answerIsYes);
    }

    function answerQuestion(string memory question, bool userAnswer) external {
        userAnswers[msg.sender][question] = userAnswer;
        emit AnswerStored(msg.sender, question, userAnswer);
    }

    function getAnswer(string memory question) external view returns (bool) {
        return userAnswers[msg.sender][question];
    }

    function getQuestions() external view returns (string[] memory) {
        return questions;
    }

}