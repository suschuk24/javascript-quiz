//query selectors for page variable interaction

var mainContentEl = document.querySelector(".main-content");
var startScreenEl = document.querySelector(".start-screen");
var timeEl = document.querySelector("#time");
var startBtnEl  = document.querySelector("#start-btn");
var btnContainerEl = document.querySelector(".btn-container");
var displayEl = document.querySelector(".display");
var questionEl = document.querySelector(".question");
var questionLabelEl = document.querySelector(".question-label");

//element ID variables


var answerBtn1El = document.getElementById("btn-1");
var answerBtn2El = document.getElementById("btn-2");
var answerBtn3El = document.getElementById("btn-3");
var answerBtn4El = document.getElementById("btn-4");
// var score = setInterval(math.add++)

var correct = 10
var timer = 74
var score = 0

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



// console.log(questions)

var answerBtns = [];
answerBtns.push(answerBtn1El);
answerBtns.push(answerBtn2El);
answerBtns.push(answerBtn3El);
answerBtns.push(answerBtn4El);

function startQuiz() {
        console.log("starting game")
        timeLimit ();
        hideEl ();
        questionList ();
    
};



function timeLimit() {
    
    setInterval(function () {
        if (timer >= 0){
          timeEl.textContent = timer--;
        }
        else {
          clearInterval(timer);
          timeEl.textContent = "";
          //jump to enter high score info function
        } 
      }, 1000);
    }

    // debugger
function hideEl() {
    mainContentEl.classList.add("hide");
    questionLabelEl.classList.remove("hide");
    btnContainerEl.classList.remove("hide");
    displayEl.classList.remove("hide");
}
// Question List


function questionList() {
    for (var i = 0; i < questions.length; i++) {
        questionEl.textContent = questions[currentQuestion].question;
    } 
    for (var i = 0; i < answerBtns.length; i++) {
        answerBtns[i].textContent = questions[currentQuestion].answers[i];
    }
}

function checkAnswer(selection) {
    if( selection === questions[currentQuestion].correctAnswer) {
        currentQuestion++
        console.log("question number", currentQuestion)
        score++
        console.log("score", score)
        console.log("correct, next question")
        nextQuestion()
    } else {
         timer -= 10;
         nextQuestion()
         console.log("incorrect, 10 seconds deducteed, next question")
    } 
}
function nextQuestion() {
    questionList()
    for (var i = 0; i < answerBtns.length; i++) {
        answerBtns[i].textContent = questions[currentQuestion].answers[i];
    } 
}
function enterScore() {

}


startBtnEl.addEventListener("click", startQuiz)


answerBtn1El.addEventListener("click", function () {
    checkAnswer(0);
})
answerBtn2El.addEventListener("click", function () {
    checkAnswer(1);
})
answerBtn3El.addEventListener("click", function () {
    checkAnswer(2);
})
answerBtn4El.addEventListener("click", function () {
    checkAnswer(3);
})