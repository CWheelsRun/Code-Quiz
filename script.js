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
        title: "A very useful tool for use during development and debugging for printing content to the debugger is:",
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
var listCreate = document.createElement("ul");

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

// Creating the cycle for the quiz array
function render(questionIndex) {
    // Clear any existing data 
    quizDiv.innerHTML = "";
    listCreate.innerHTML = "";
    // Cycle through all quesions in the array
    for (var i = 0; i < questions.length; i++) {
        // Appends question title, leaves choices to proper function
        var currentQuestion = questions[questionIndex].title;
        var currentChoices = questions[questionIndex].choices;
        quizDiv.textContent = currentQuestion;
    }
    // Displays choices per question
    currentChoices.forEach(function (newItem) {
        var listItem = document.createElement("li");
        listItem.textContent = newItem;
        quizDiv.appendChild(listCreate);
        listCreate.appendChild(listItem);
        listItem.addEventListener("click", (compare));
    })
}

// Comparing submitted choices with answer of each question
function compare(event) {
    var element = event.target;

    if (element.matches("li")) {

        var response = document.createElement("div");
        response.setAttribute("id", "response");
        // Correct response
        if (element.textContent == questions[questionIndex].answer) {
            score++;
            response.textContent = "Correct!";
        } else {
            // Wrong response, includes 10 second reduction
            secondsLeft = secondsLeft - penalty;
            response.textContent = "Wrong!";
        }

    }
    // Index cycle to move on to next question
    questionIndex++;

    // Completed quiz variation
    if (questionIndex >= questions.length) {
        complete();
        response.textContent = "You got  " + score + "/" + questions.length + " Correct!";
    } else {
        render(questionIndex);
    }
    quizDiv.appendChild(response);

}

function complete() {
    // Clear any existing data
    quizDiv.innerHTML = "";
    currentTime.innerHTML = "";

// Building the completed page and its elements

    // Heading
    var completeH = document.createElement("h1");
    completeH.setAttribute("id", "completeH");
    completeH.textContent = "GAME OVER!"

    quizDiv.appendChild(completeH);

    // Paragraph
    var completeP = document.createElement("p");
    completeP.setAttribute("id", "completeP");

    quizDiv.appendChild(completeP);

    // Uses remaining time to calculate final score
    if (secondsLeft >= 0) {
        var timeLeft = secondsLeft;
        var completeP2 = document.createElement("p");
        clearInterval(interval);
        completeP.textContent = "Your final score is: " + timeLeft;

        quizDiv.appendChild(completeP2);
    }

    // Label
    var enterUser = document.createElement("label");
    enterUser.setAttribute("id", "enterUser");
    enterUser.textContent = "Enter your initials: ";

    quizDiv.appendChild(enterUser);

    // input
    var userInput = document.createElement("input");
    userInput.setAttribute("type", "text");
    userInput.setAttribute("id", "initials");
    userInput.textContent = "";

    quizDiv.appendChild(userInput);

    // submit
    var submit = document.createElement("button");
    submit.setAttribute("type", "submit");
    submit.setAttribute("id", "Submit");
    submit.textContent = "Submit";

    quizDiv.appendChild(submit);

    // Event listener to capture initials and local storage for initials and score
    submit.addEventListener("click", function () {
        var initials = userInput.value;

        if (initials === null) {

            console.log("No value entered!");

        } else {
            var finalScore = {
                initials: initials,
                score: timeLeft
            }
            console.log(finalScore);
            var allScores = localStorage.getItem("allScores");
            if (allScores === null) {
                allScores = [];
            } else {
                allScores = JSON.parse(allScores);
            }
            allScores.push(finalScore);
            var newScore = JSON.stringify(allScores);
            localStorage.setItem("allScores", newScore);
            // Navigates to high scores page
            window.location.replace("./scores.html");
        }
    });

}
