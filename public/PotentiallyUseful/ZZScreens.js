//handles the changing of screens, and what is displayed on the screen
var Screens = function () {

    var listOfScreens = [];

    var menuElem = document.getElementById("id-gameOptionsList");
    var carGameElem = document.getElementById("id-canvasWrapper");
    var highScoresElem = document.getElementById("id-highScores");
    var creditsElem = document.getElementById("id-credits");
    var helpElem = document.getElementById("id-help");

    var newScreen = function (name, showFunction, hideFunction) {
        return {
            name: name,
            showFunction: showFunction,
            hideFunction: hideFunction
        };
    }

    var showGame = function () {
        showElem(carGameElem);
        CarGame.startNewGame();
    }

    var hideGame = function () {
        CarGame.gameLoop.setGameState(CarGame.gameLoop.GameState.Menu)
        hideElem(carGameElem);
    }

    var showMenu = function () {
        CarGame.gameLoop.gameState = CarGame.gameLoop.GameState.Menu;
        showElem(menuElem);
    }

    var hideMenu = function () {
        hideElem(menuElem);
    }

    var showHighScores = function () {
        showElem(highScoresElem);
        var innerHTML = "";
        var highScores = CarGame.scores.getHighScores();
        for (var i = 0; i < highScores.length; ++i) {
            innerHTML += "<li>Score " + (i + 1) + ": " + highScores[i] + "</li>";
        }

        highScoresElem.innerHTML = innerHTML;
    }

    var hideHighScores = function () {
        hideElem(highScoresElem);
    }

    var ScreenNames =
        {
            Menu: 0,
            HighScores: 1,
            CarGame: 2,
            Credtis: 3,
            Help: 4
        };

    var showCredits = function () {
        showElem(creditsElem);
    }
    var hideCredits = function () {
        hideElem(creditsElem);
    }

    var showHelp = function () { showElem(helpElem); };
    var hideHelp = function () { hideElem(helpElem); };

    listOfScreens.push(newScreen(ScreenNames.Menu, showMenu, hideMenu));
    listOfScreens.push(newScreen(ScreenNames.CarGame, showGame, hideGame));
    listOfScreens.push(newScreen(ScreenNames.HighScores, showHighScores, hideHighScores));
    listOfScreens.push(newScreen(ScreenNames.Credits, showCredits, hideCredits));
    listOfScreens.push(newScreen(ScreenNames.Help, showHelp, hideHelp));


    var changeToScreen = function (screenName) {
        for (var i = 0; i < listOfScreens.length; ++i) {
            if (listOfScreens[i].name === screenName) {
                listOfScreens[i].showFunction();
            }
            else {
                listOfScreens[i].hideFunction();
            }
        }
    }

    return {
        ScreenNames: ScreenNames,
        changeToScreen: changeToScreen
    };

}();

var showElem = function (elem) {
    elem.style.display = "";
}

var hideElem = function (elem) {
    elem.style.display = "none";
}

var GameMenuScreen = (function () {

    var menuElemWrapper = document.getElementById("gameMenuWrapper");
    var menuElem = document.getElementById("gameMenu");
    var menuItems = [];

    //specialClass is optional if the css should be one other than the generic menubutton class
    var newMenuItem = function (buttonText, functionToRun, showFunction, hideFunction, specialClass) {
        if (!specialClass)
            specialClass = "class-gameMenuOption";
        menuElem.innerHTML += ("<li onclick = '" + functionToRun + "' class = '" + specialClass + "' >" + buttonText + "</li>");
    }

    var intializeMenu = function () {
        menuItems.push(newMenuItem("New Game", "Screens.changeToScreen(Screens.ScreenNames.CarGame)"));
        menuItems.push(newMenuItem("HighScores", "Screens.changeToScreen(Screens.ScreenNames.HighScores)"));
        menuItems.push(newMenuItem("Credits", "Screens.changeToScreen(Screens.ScreenNames.Credits)"));
        menuItems.push(newMenuItem("Help", "Screens.changeToScreen(Screens.ScreenNames.Help)"));
    }

    var show = function () {
        showElem(menuElemWrapper);
    }

    var hide = function () {
        hideElem(menuElemWrapper);
    }

    return {
        intializeMenu: intializeMenu,
        show: show,
        hide: hide
    };

}());