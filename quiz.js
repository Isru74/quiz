// script.js
const startBtn = document.getElementById('start-btn');
const restartBtn = document.getElementById('restart-btn');
const welcomeScreen = document.getElementById('welcome-screen');
const questionScreen = document.getElementById('question-screen');
const resultScreen = document.getElementById('result-screen');
const questionElem = document.getElementById('question');
const optionsContainer = document.getElementById('options-container');
const progressBar = document.getElementById('progress-bar');
const scoreElem = document.getElementById('score');
const timerElem = document.getElementById('timer');

let currentQuestionIndex = 0;
let score = 0;
let timer;
let timeLeft = 10;

const questions = [
  {
    question: "What is the capital of France?",
    options: ["Berlin", "Madrid", "Paris", "Lisbon"],
    correct: 2
  },
  {
    question: "What is 5 + 3?",
    options: ["5", "8", "10", "15"],
    correct: 1
  },
  {
    question: "Which is the largest planet?",
    options: ["Earth", "Mars", "Jupiter", "Venus"],
    correct: 2
  }
];

function startQuiz() {
  welcomeScreen.classList.add('hidden');
  questionScreen.classList.remove('hidden');
  currentQuestionIndex = 0;
  score = 0;
  loadQuestion();
}

function loadQuestion() {
  clearInterval(timer);
  timeLeft = 10;
  timerElem.textContent = `Time Left: ${timeLeft}s`;

  if (currentQuestionIndex < questions.length) {
    const currentQuestion = questions[currentQuestionIndex];
    questionElem.textContent = currentQuestion.question;
    optionsContainer.innerHTML = '';
    progressBar.style.width = `${((currentQuestionIndex + 1) / questions.length) * 100}%`;

    currentQuestion.options.forEach((option, index) => {
      const button = document.createElement('button');
      button.textContent = option;
      button.addEventListener('click', () => handleAnswer(index));
      optionsContainer.appendChild(button);
    });

    timer = setInterval(() => {
      timeLeft--;
      timerElem.textContent = `Time Left: ${timeLeft}s`;
      if (timeLeft === 0) {
        clearInterval(timer);
        handleAnswer(null);
      }
    }, 1000);
  } else {
    endQuiz();
  }
}

function handleAnswer(selected) {
  clearInterval(timer);
  const currentQuestion = questions[currentQuestionIndex];
  const buttons = optionsContainer.querySelectorAll('button');

  if (selected === currentQuestion.correct) {
    score++;
    buttons[selected].classList.add('correct');
  } else {
    if (selected !== null) buttons[selected].classList.add('incorrect');
    buttons[currentQuestion.correct].classList.add('correct');
  }

  setTimeout(() => {
    currentQuestionIndex++;
    loadQuestion();
  }, 1000);
}

function endQuiz() {
  questionScreen.classList.add('hidden');
  resultScreen.classList.remove('hidden');
  scoreElem.textContent = `${score} / ${questions.length}`;
}

function restartQuiz() {
  resultScreen.classList.add('hidden');
  welcomeScreen.classList.remove('hidden');
}

startBtn.addEventListener('click', startQuiz);
restartBtn.addEventListener('click', restartQuiz);
