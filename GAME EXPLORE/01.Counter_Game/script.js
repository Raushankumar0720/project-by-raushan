// buttons select

var currentScore = document.querySelector('#currentScore');
var highScore = document.querySelector('#highScore');
var timer = document.querySelector('#timer');
var clickButton = document.querySelector('#clickButton');
var startButton = document.querySelector('#startButton');
var statusMessage = document.querySelector('#statusMessage');
var resetButton = document.querySelector('#resetButton');
var pauseButton = document.querySelector('#pauseButton');
var resumeButton = document.querySelector('#resumeButton');
var video = document.querySelector('#video');

// extra use variable
var current = 0;   // user => button clicked => data store (click me)
var high = 0;   // highscore => track rakh sake.....
var time1 = 10; // time => update.....
var track = false;
var idTrack = null; //time => control

function loadContent() {
    dataLoad();
    displayMessage();
}

function dataLoad() {

    var temp = localStorage.getItem('highScore');  //pehli baar local storage  => return null otherwise => data;
    if (temp != null) {
        high = parseInt(temp);  // explicity type coversion.....
    }
    else {
        high = 0;
    }

};

function displayMessage() {

    currentScore.textContent = current;
    highScore.textContent = high;
    timer.textContent = time1;
};

function statuMsg(msg) {
    statusMessage.textContent = msg;
}

function endGame() {
    clearInterval(idTrack);
    track = false;
    clickButton.disabled = true;
    startButton.disabled = false;
    time1 = 0;
    if (current > high) {
        localStorage.setItem('highScore', current);
        high = current;
        displayMessage();
        statuMsg("You're current score is higher than previous score");
        video.style.display = 'block';
        alert("Game Finish! You are won!");


    }

    else if (current == high) {
        statuMsg("Your current score and high score is equal");
        alert("Game tied");
    }

    else {
        statuMsg("Your current score is less than privious score");
        alert("You are Lose")
    }
};

function startGame() {
    track = true;
    time1 = 10;
    current = 0;
    clickButton.disabled = false;
    startButton.disabled = true;
    resumeButton.style.display = 'none';
    statuMsg("Game is started");
    video.style.display = 'none';


    idTrack = setInterval(function () {
        time1--;
        if (time1 < 0) {
            endGame();
        }
        displayMessage();
    }, 1000);

};

function clickMe() {
    if (track) {
        current++;
        displayMessage();
    }
};

loadContent();

function resetGame() {
    startButton.disabled = false;
    localStorage.clear();
    high = 0;
    current = 0;
    time1 = 10;
    loadContent();
    displayMessage();
    video.style.display = 'none';
    resumeButton.style.display = 'none';
    statuMsg("Your entire Game reset! Click 'Start Game' to play again.");
}

function pauseGame() {

    clearInterval(idTrack);
    clickButton.disabled = true;
    displayMessage();
    statuMsg("Game is Pause");
    resumeButton.style.display = 'block';

}
function resumeGame() {

    clickButton.disabled = false;
    displayMessage();
    idTrack = setInterval(function () {
        time1--;
        if (time1 < 0) {
            endGame();
        }
        displayMessage();
    }, 1000);
    resumeButton.style.display = 'none';
    statuMsg("Game is Start");

}




startButton.addEventListener('click', startGame);
clickButton.addEventListener('click', clickMe);
resetButton.addEventListener('click', resetGame);
pauseButton.addEventListener('click', pauseGame);
resumeButton.addEventListener('click', resumeGame);



// reset button => user click => 1.localstorage => previous => total clear (localstorage.clear()),
//  2.display message

