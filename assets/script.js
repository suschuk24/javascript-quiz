//query selectors for page variable interaction

var mainContentEl = document.querySelector(".main-content");
var submitScoreEl = document.querySelector(".enter-score");
var scoreScreenEl = document.querySelector(".high-scores")
var btnContainerEl = document.querySelector(".btn-container");
var displayEl = document.querySelector(".display");
var questionEl = document.querySelector(".question");
var questionLabelEl = document.querySelector(".question-label");

// button variables
var startBtnEl  = document.querySelector("#start-btn");
var scoreButtonEl = document.querySelector("#submit-btn");
var returnButtonEl = document.querySelector("#return-btn");

//element ID variables
var answerButton1El = document.getElementById("btn-1");
var answerButton2El = document.getElementById("btn-2");
var answerButton3El = document.getElementById("btn-3");
var answerButton4El = document.getElementById("btn-4");

// time and score variables 
var scoreEl = document.querySelector("#score");
var timeEl = document.querySelector("#time");
var timer = 74
var score = 1

// questions array
var currentQuestion = 0
var questions = [
    {
        question: "Commonly used data types DO Not Include:",
        answers: ["strings", "booleans", "alerts", "numbers"],
        correctAnswer: 2,
    },
    {
        question: "The condition in an if / else statement is enclosed with ________.",
        answers: ["quotations", "curly brackets", "parenthesis", "square brackets"],
        correctAnswer: 1,
    },
    {
        question: "Arrays in JavaScript can be used to store ________.",
        answers: ["numbers and strings", "other arrays", "booleans", "all of the above"],
        correctAnswer: 3,
    },
    {
        question: "String values must be enclosed within ______ when being assigned to variables.",
        answers: ["commas", "curly brackets", "quotations", "parenthesis"],
        correctAnswer: 2,
    },
    {
        question: "A very useful tool used during development and debugging for printing content to the debugger is:",
        answers: ["JavaScript", "terminal/bash", "for loops", "console.log"],
        correctAnswer: 3,
    },
];

// answers array
var answerButtons = [];
answerButtons.push(answerButton1El);
answerButtons.push(answerButton2El);
answerButtons.push(answerButton3El);
answerButtons.push(answerButton4El);

// start quiz
function startQuiz() {
        console.log("starting game")
        timeLimit ();
        hideEl ();
        questionList ();
    
};

// timer function
function timeLimit() {
    
    setInterval(function () {
        if (timer >= 0){
          timeEl.textContent = timer--;
        }
        else {
          clearInterval(timer);
          timeEl.textContent = "0";
          enterScore()
        } 
      }, 1000);
    };

// change css elements as needed to display correct HTML
function hideEl() {
    mainContentEl.classList.add("hide");
    questionLabelEl.classList.remove("hide");
    btnContainerEl.classList.remove("hide");
    displayEl.classList.remove("hide");
};

// Question List
function questionList() {
    if (currentQuestion >= questions.length) {
        clearInterval(timer);
        console.log("Game Over");
        enterScore();
    }
    for (var i = 0; i < questions.length; i++) {
        questionEl.textContent = questions[currentQuestion].question;
    } 
    for (var i = 0; i < answerButtons.length; i++) {
        answerButtons[i].textContent = questions[currentQuestion].answers[i];
    }
};

// check to see if correct answer was selected
function checkAnswer(selection) {
    var correct = questions[currentQuestion].correctAnswer;
    if (selection === correct ) {
        scoreEl.textContent = score++;
        currentQuestion++;

    } else {
         timer -= 10;
         console.log("incorrect, 10 seconds deducteed, next question")
    } 
    
    nextQuestion()
    if (currentQuestion >= questions.length) {
        clearInterval(timer);

    }
};

function nextQuestion() {
    questionList()
    for (var i = 0; i < answerButtons.length; i++) {
        answerButtons[i].textContent = questions[currentQuestion].answers[i];
    } 
};
function enterScore() {
    submitScoreEl.classList.remove("hide");
    questionLabelEl.classList.add("hide");
    btnContainerEl.classList.add("hide");
    displayEl.classList.add("hide");

};

function scoreScreen () {
    scoreScreenEl.classList.remove("hide");
    submitScoreEl.classList.add("hide");
};

function homeScreen () {
    mainContentEl.classList.remove("hide");
    scoreScreenEl.classList.add("hide");

};

// event listenrs to "step" HTML
startBtnEl.addEventListener("click", startQuiz)
answerButton1El.addEventListener("click", function () {
    checkAnswer(0);
});
answerButton2El.addEventListener("click", function () {
    checkAnswer(1);
});
answerButton3El.addEventListener("click", function () {
    checkAnswer(2);
});
answerButton4El.addEventListener("click", function () {
    checkAnswer(3);
});
scoreButtonEl.addEventListener("click", function () {
    scoreScreen()
});
returnButtonEl.addEventListener("click", function () {
    homeScreen()
});