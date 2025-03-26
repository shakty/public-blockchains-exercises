const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

const questions = [
  'Does the group Seventeen have 17 members?',
  'Was Twice created on the survival show Sixteen?',
  'Did BoA make her debut in the current century?',
  'Did Red Velvet debut with all its current members?',
  'Does the group Enhypen have a former professional fencer?',
  'Are Keeho, Beomgyu and Sung Hanbin all the same age?',
  'Is Zico the former leader of iKON?',
  'Is Taemin the most iconic dancer in Kpop?'
]

const answers = [
  false, true, true, false, false, true, false, true
]

module.exports = buildModule("MyQuizModule", (m) => {
  const initialQuestions = m.getParameter('initialQuestions', questions)
  const initialAnswers = m.getParameter('initialAnswers', answers)

  const quiz = m.contract('MyQuiz', [initialQuestions, initialAnswers])

  return { quiz }
})