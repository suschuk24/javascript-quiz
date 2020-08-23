//query selectors for page variable interaction

var mainContentEl = document.querySelector(".main-content");
var submitScoreEl = document.querySelector(".enter-score");
var scoreScreenEl = document.querySelector(".high-scores")
var btnContainerEl = document.querySelector(".btn-container");
var displayEl = document.querySelector(".display");
var questionEl = document.querySelector(".question");
var questionLabelEl = document.querySelector(".question-label");
var FinalScoreEl = document.querySelector(".final-score");
var submitEL = document.querySelector(".submit");
var highScoresListEL = document.querySelector(".high-scores-list");

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
// var placeScore = document.getElementById("score-total")
var scoreEl = document.querySelector("#score");
var timeEl = document.querySelector("#time");
var seconds = 74
var score = 0

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
        hideEl ();
        timeLimit ();
        questionList()
};

// timer function
function timeLimit() {
    
var timer =  setInterval(function () {
        if (seconds >= 0 && currentQuestion < questions.length){
          timeEl.textContent = seconds--;
        }
        else {
          clearInterval(timer);
          timeEl.textContent = "Game Over";
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

// move to next question or end game
function nextQuestion() {
    if (currentQuestion < questions.length) {
        questionList();
    } else {
        enterScore();
    }
};

// Question List
function questionList() {
        questionEl.textContent = questions[currentQuestion].question; 
    for (var i = 0; i < answerButtons.length; i++) {
        answerButtons[i].textContent = questions[currentQuestion].answers[i];
    }
};


// check to see if correct answer was selected
function checkAnswer(selection) {
    var correct = questions[currentQuestion].correctAnswer;
    if (selection === correct ) {
        scoreEl.textContent = (1 + score++);
        var choice = document.getElementById("answer");
        var displayText = document.createTextNode("Correct");
        choice.appendChild(displayText);
    } else {
        var choice = document.getElementById("answer");
        var displayText = document.createTextNode("Incorrect...");
        choice.appendChild(displayText);
        seconds -= 10;
        console.log("incorrect, 10 seconds deducteed, try again");

    } 
    setTimeout(function() {
        choice.removeChild(displayText);
        currentQuestion++;
        nextQuestion();
    }, 500);
};

// exit quiz and transition CSS
function enterScore() {
    
    submitScoreEl.classList.remove("hide");
    questionLabelEl.classList.add("hide");
    btnContainerEl.classList.add("hide");
    displayEl.classList.add("hide");
    makeHighScore()

};

// create high score value, ask user to input initials 
function makeHighScore() {
    var finalScore = (" " + score);
    FinalScoreEl.textContent = finalScore;

    //get highscores from localStorage; returns empty array if none present
    // couldn't figure this part out on my own, had help during office hours over the weekend from Cameron, Jeff and the TA's
    var highScores = JSON.parse(localStorage.getItem("highScores"));
        if(!highScores){
            highScores = [];
        }
    //submit highscores to local storage and add them to highScores already stored.
    submitEL.addEventListener("click", function (event) {
        event.preventDefault();
        var initials = document.querySelector("#user-name").value
        
        var latestScore = {
            score: finalScore,
            initials: initials
        }
        highScores.push(latestScore);

        localStorage.setItem("highScores", JSON.stringify(highScores));
        makeScoreList();
    });
};


// create score list item
function makeScoreList () {
    var highScores = JSON.parse(localStorage.getItem("highScores"));
    for (let i = 0; i < highScores.length; i++) {
        var ListEl = document.createElement("li");
        ListEl.className = "score-list";
        ListEl.textContent = highScores[i].initials + "- " + highScores[i].score;
        highScoresListEL.appendChild(ListEl);
    }
    scoreScreen()
};

function scoreScreen () {
    // clearInterval(timer);
    timeEl.textContent = "Game Over"
    scoreScreenEl.classList.remove("hide");
    submitScoreEl.classList.add("hide");
    
};


// event listenrs to "step" HTML
startBtnEl.addEventListener("click", startQuiz)
// veent listeners for correct answers
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
    enterScore()
});
returnButtonEl.addEventListener("click", function () {
    location.reload ()
});

