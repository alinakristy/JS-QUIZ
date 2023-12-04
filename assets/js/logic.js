var timer = document.getElementById("time");
var startQ = document.getElementById('start');
var timeLeft = 65;
var startScreen = document.getElementById("start-screen");
var questionsSection = document.getElementById('questions');
var answersForQ = document.getElementById('choices');
var correctAudio = new Audio('./assets/sfx/correct.wav');
var incorrectAudio = new Audio('./assets/sfx/incorrect.wav');
var wrongAnswers = document.getElementById('wrongAnswer');
var endScreen = document.getElementById('end-screen');
var finalScore = document.getElementById('final-score');
var stopTimer = false;

var quastions = [
    {
        quastion: 'Choose browser name ',
        answer: ['Google Crome', 'Lenova', 'iPhone'],
        rightAnswer: "Google Crome"
    },
    {
        quastion: '?',
        answer: ['5', '6', '4'],
        rightAnswer: "6"
    },
    {
        quastion: '4 ',
        answer: ['i', '8', '8'],
        rightAnswer: "8"
    }
]

var title = document.getElementById('question-title');

function rightAnswerQ() {
    correctAudio.play();
    wrongAnswers.classList.add('hide');
    printQ(quastions.pop());
}

function wrongAnswer() {
    timeLeft -= 5
    incorrectAudio.play();
    wrongAnswers.classList.remove('hide');
    printQ(quastions.pop());
}

function printQ(question) {
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
        if (timeLeft === 0 || stopTimer) {
            clearInterval(timeInterval);
        }else {
         timeLeft--;
        timer.textContent = timeLeft;}
    }, 1000);
}

startQ.addEventListener("click", function () {
    countdown();
    startQuastions();
});

