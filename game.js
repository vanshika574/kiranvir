var panel = new Panel();
var gameWindow = new Window(panel, "TheColorGameWindow");

initGui();

var colorObjects = document.querySelectorAll(".colorObj");
var result = document.querySelector("#displayedResult");
var displayedColor = document.querySelector("#headerRGBValue");
var gameHeader = document.querySelector(".gameHeader");

var tryAgain = document.querySelector("#tryAgain");
var diffEasy = document.querySelector("#diffEasy");
var diffHard = document.querySelector("#diffHard");

// GAME FUNCTIONS

function initGui() {
    gameWindow.initialize();

    panel.addAWindow(gameWindow);

    gameWindow.setWidth(1200);
    gameWindow.setHeight(600);
    gameWindow.setWindowX(0);
    gameWindow.setWindowY(0);
    gameWindow.setBackgroundColor("white");
    gameWindow.setTitle("The Color Game");
    gameWindow.setWindowIcon("themes/newtheme/assets/icons/default.png");
    gameWindow.getPanelItem().getContextMenu().addAnItem("Try again?", function() {
        gameHeader.style.backgroundColor = "LimeGreen";
        newGame();
    }).addASeparator().addAnItem("Hard mode", function() {
        difficulty = "hard";
        diffEasy.style.color = "black";
        diffHard.style.color = "gold";
        gameHeader.style.backgroundColor = "LimeGreen";
        newGame();
    }).addAnItem("Easy mode", function() {
        difficulty = "easy";
        diffHard.style.color = "black";
        diffEasy.style.color = "gold";
        gameHeader.style.backgroundColor = "LimeGreen";
        newGame();
    });
    var gameContent = document.querySelector("#gameContent");
    gameWindow.setContent(gameContent.outerHTML);
    gameContent.remove();
}

function generateColors() {
    var arr = [];
    var numOfColors;

    if(difficulty == "easy") {
        numOfColors = 3;
    } else {
        numOfColors = 6;
    }

    for(i = 0; i < numOfColors; i++) {
        var r = Math.floor(Math.random() * 256);
        var g = Math.floor(Math.random() * 256);
        var b = Math.floor(Math.random() * 256);

        arr[i] = "rgb("+r+", "+g+", "+b+")";
    }

    return arr;
}

function initEventListeners() {
    colorObjects.forEach(function(element, index) {
        element.addEventListener('click', function() {
            if(index != correctColor-1) {
                result.textContent = "NOT CORRECT";
                result.style.opacity = "1.0";
                element.style.backgroundColor = "transparent";
            } else {
                result.textContent = "";
                gameHeader.style.backgroundColor = element.style.backgroundColor;
                newGame();
            }
        });
    });

    tryAgain.addEventListener('click', function() {
        gameHeader.style.backgroundColor = "LimeGreen";
        newGame();
    });

    diffEasy.addEventListener('click', function() {
        if(difficulty == "hard") {
            difficulty = "easy";
            this.style.color = "gold";
            diffHard.style.color = "black";
            gameHeader.style.backgroundColor = "LimeGreen";
            newGame();
        }
    });

    diffHard.addEventListener('click', function() {
        if(difficulty == "easy") {
            difficulty = "hard";
            this.style.color = "gold";
            diffEasy.style.color = "black";
            gameHeader.style.backgroundColor = "LimeGreen";
            newGame();
        }
    });
}

function newGame() {
    colors = generateColors();
    correctColor = 0;

    if(difficulty == "easy") {
        correctColor = Math.floor(Math.random()*3+1);
    } else {
        correctColor = Math.floor(Math.random()*6+1);
    }

    displayedColor.textContent = colors[correctColor-1].toUpperCase();

    for(i = 0; i < colorObjects.length; i++) {
        colorObjects[i].style.backgroundColor = colors[i];
    }

    if(difficulty == "easy") {
        for(i = 3; i < colorObjects.length; i++) {
            colorObjects[i].style.display = "none";
        }
    } else {
        for(i = 0; i < colorObjects.length; i++) {
            colorObjects[i].style.display = "inline-block";
        }
    }
}

// GAME VARIABLES

var difficulty = "hard";

var colors;
var correctColor;

initEventListeners();
newGame();