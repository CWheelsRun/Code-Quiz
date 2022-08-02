// Array of questions in the quiz
var questions = [
    {
        title: "Commonly used data types DO NOT include:",
        choices: ["strings", "booleans", "alerts", "numbers"],
        answer: "alerts"
    },
    {
        title: "The condition in an if / else statement is enclosed within ____.",
        choices: ["quotes", "curly brackets", "parentheses", "square brackets"],
        answer: "parentheses"
    },
    {
        title: "Arrays in Javascript can be used to store ____.",
        choices: ["numbers and strings", "other arrays", "booleans", "all of the above"],
        answer: "all of the above"
    },
    {
        title: "String values must be enclosed within ____ when being assigned to variables.",
        choices: ["commas", "curly brackets", "quotes", "parenthesis"],
        answer: "quotes"
    },
    {
        title: "A very useful tool for used during development and debugging for printing content to the debugger is:",
        choices: ["Javascript", "terminal / bash", "for loops", "console log"],
        answer: "console log"
    },
];

// Established variables for baseline
var score = 0;
var questionIndex = 0;

// Declared variables
var currentTime = document.querySelector("#timer");
var startTime = document.querySelector("#start");
var quizDiv = document.querySelector("#quizDiv");
var container = document.querySelector("#container");

// Starting seconds variable, alotting 12 seconds per question
var secondsLeft = 61;
// Represents the interval time between questions
var interval = 0;
// Represents penalty time for wrong answers
var penalty = 10;
// Creates list
var ulCreate = document.createElement("ul");

// Timer starts when user clicks, timer is then displayed on screen
startTime.addEventListener("click", function () {
    // Timer is originally set to 0, so anything outside of this check applies the 'secondsLeft' variable, otherwise process ends and 'Time's up' displays
    if (interval === 0) {
        interval = setInterval(function () {
            secondsLeft--;
            currentTime.textContent = "Time: " + secondsLeft;

            if (secondsLeft <= 0) {
                clearInterval(interval);
                complete();
                currentTime.textContent = "Time's up!";
            }
        }, 1000);
    }
    render(questionIndex);
});

