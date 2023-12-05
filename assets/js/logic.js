var timer = document.getElementById("time");
var startQ = document.getElementById('start');

var startScreen = document.getElementById("start-screen");
var questionsSection = document.getElementById('questions');
var answersForQ = document.getElementById('choices');
var correctAudio = new Audio('./assets/sfx/correct.wav');
var incorrectAudio = new Audio('./assets/sfx/incorrect.wav');
var wrongAnswers = document.getElementById('wrongAnswer');
var endScreen = document.getElementById('end-screen');
var finalScore = document.getElementById('final-score');
var stopTimer = false;
var submit = document.getElementById('submit');
var enterInitials = document.getElementById('initials');

var quastions = [
    {
        quastion: 'Where is the correct place to insert a JavaScript?',
        answer: ['The <head> section', 'The <body>section', ' Both the <head> section and the <body> section are correct'],
        rightAnswer: 'The <body>section'
    },
    {
        quastion: 'How do you create a function in JavaScript?',
        answer: ['function:myfunction()', 'function = myFunction()', 'function myFunction()'],
        rightAnswer: 'function myFunction()'
    },
    {
        quastion: 'How to write an IF statement in JavaScript?',
        answer: ['if i = 5 then', 'if i = 5', 'if (i == 5)', 'if i == 5 then'],
        rightAnswer: 'if (i == 5)'
    },
    {
        quastion: 'How to write an IF statement for executing some code if "i" is NOT equal to 5?',
        answer: ['if (i <> 5)', 'if (i != 5)', 'if i <> 5', ' if i =! 5 then'],
        rightAnswer: 'if (i != 5)'
    }, {
        quastion: 'How does a WHILE loop start?',
        answer: ['while (i <= 10)', 'while i = 1 to 10', 'while (i <= 10; i++)'],
        rightAnswer: 'while (i <= 10)'
    }, {
        quastion: 'How can you add a comment in a JavaScript?',
        answer: ['//This is a comment', 'This is a comment', '<!--This is a comment-->'],
        rightAnswer: '//This is a comment'
    }, {
        quastion: 'What is the correct way to write a JavaScript array?',
        answer: ['var colors = (1:"red", 2:"green", 3:"blue")', 'var colors = ["red", "green", "blue"]', ' var colors = "red", "green", "blue" '],
        rightAnswer: 'var colors = ["red", "green", "blue"]'
    }, {
        quastion: 'How do you round the number 7.25, to the nearest integer?',
        answer: ['rnd(7.25)', ' Math.round(7.25)', 'round(7.25)'],
        rightAnswer: 'Math.round(7.25)'
    }, {
        quastion: 'JavaScript is the same as Java.',
        answer: ['True', 'False'],
        rightAnswer: 'False'
    }, {
        quastion: 'How do you declare a JavaScript variable?',
        answer: ['v carName', 'variable carName', 'var carName'],
        rightAnswer: 'var carName'
    },
]

var timeLeft = quastions.length * 2;

var title = document.getElementById('question-title');

function rightAnswerQ() {
    correctAudio.play();
    wrongAnswers.classList.add('hide');
    printQ(quastions.pop());
}

function wrongAnswer() {
    if (timeLeft < 5) {
        timeLeft = 0
    } else {
        timeLeft -= 5
    }
    incorrectAudio.play();
    wrongAnswers.classList.remove('hide');
    printQ(quastions.pop());
}

function printQ(question) {
    if (timeLeft <= 0) {
        showEndScreen();
    } else
        if (question === undefined) {
            showEndScreen()
        } else {
            var buttons = answersForQ.querySelectorAll('button')
            buttons.forEach((button) => answersForQ.removeChild(button))
            title.textContent = question.quastion
            for (i = 0; i < question.answer.length; i++) {
                var answerOption = document.createElement("button")
                answerOption.textContent = question.answer[i];
                answersForQ.appendChild(answerOption);
                if (question.answer[i] == question.rightAnswer) {
                    answerOption.addEventListener('click', rightAnswerQ)
                } else {
                    answerOption.addEventListener('click', wrongAnswer)
                }
            }
        }
}

function startQuastions() {
    startScreen.classList.add('hide');
    questionsSection.classList.remove('hide');
    var q1 = quastions.pop();
    printQ(q1);
}

function showEndScreen() {
    endScreen.classList.remove('hide');
    questionsSection.classList.add('hide');
    finalScore.textContent = timeLeft;
    stopTimer = true;
}


timer.textContent = timeLeft;

function countdown() {

    var timeInterval = setInterval(function () {
        if (stopTimer) {
            clearInterval(timeInterval);
        } else
            if (timeLeft <= 0) {
                clearInterval(timeInterval);
                timeLeft = 0;
                showEndScreen();
            } else {
                timeLeft--;
            }
        timer.textContent = timeLeft;

    }, 1000);
}

startQ.addEventListener("click", function () {
    countdown();
    startQuastions();
});

submit.addEventListener('click', function () {
    var initials = enterInitials.value;
    var items = localStorage.getItem('leaderBoards');
    var players = [];
    if (items !== null) {
        players = JSON.parse(items)
    }
    players.push({
        initials: initials,
        score: timeLeft
    })
    localStorage.setItem('leaderBoards', JSON.stringify(players))
    window.location.href = "highscores.html";
})