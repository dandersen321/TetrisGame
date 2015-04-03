var showElem = function (elem) {
    elem.style.display = "";
}

var hideElem = function (elem) {
    elem.style.display = "none";
}

var GameMenuScreen = (function () {

    var menuScreen = document.getElementById("gameMenuScreen");
    var menuElem = document.getElementById("gameMenu");
    var menuItems = [];

    //specialClass is optional if the css should be one other than the generic menubutton class
    var newMenuItem = function (buttonText, functionToRun, showFunction, hideFunction, specialClass) {
        if (!specialClass)
            specialClass = "class-gameMenuOption";
        menuElem.innerHTML += ("<li onclick = '" + functionToRun + "' class = '" + specialClass + "' >" + buttonText + "</li>");
    }

    /* CONSTRUCTOR*/
    //var intializeMenu = function () {
    menuItems.push(newMenuItem("New Game", "ScreenManager.changeToScreen(ScreenNames.GamePlaying)"));
    menuItems.push(newMenuItem("High Scores", "ScreenManager.changeToScreen(ScreenNames.HighScores)"));
    menuItems.push(newMenuItem("Controls", "ScreenManager.changeToScreen(ScreenNames.Controls)"));
    menuItems.push(newMenuItem("Credits", "ScreenManager.changeToScreen(ScreenNames.Credits)"));
    //}



    var show = function () {
        showElem(menuScreen);
    }

    var hide = function () {
        hideElem(menuScreen);
    }

    return {
        //intializeMenu: intializeMenu,
        show: show,
        hide: hide
    };

}());

var GamePlayingScreen = function () {
    var gameScreenWrapperElem = document.getElementById("gamePlayingScreen");

    var show = function () {
        showElem(gameScreenWrapperElem);
    }

    var hide = function () {
        hideElem(gameScreenWrapperElem);
    }

    return {
        show: show,
        hide: hide
    };
}();

var HighScoresScreen = function () {
    var highScoresWrapperElem = document.getElementById("highScoresScreen");

    var show = function () {
        showElem(highScoresWrapperElem);
    }

    var hide = function () {
        hideElem(highScoresWrapperElem);
    }

    return {
        show: show,
        hide: hide
    };
}();

var ControlsScreen = function () {
    var controlsWrapperElem = document.getElementById("controlsScreen");
    var controlsListElem = document.getElementById("controlsList");

    var staticInnerHTMLElem = "<li> Menu: Esc </li>" +
        "<li><button onclick = \"KeyBoard.resetControls()\">Reset Controls</button></li>";

    var changeControlForFunction = function (functionToChange) {

    }

    var updateControls = function () {
        var hardDropKeyCode = KeyBoard.getKeyCodeForFunction(TetrisGame.hardDrop);
        var softDropKeyCode = KeyBoard.getKeyCodeForFunction(TetrisGame.softDrop);
        var moveRightKeyCode = KeyBoard.getKeyCodeForFunction(TetrisGame.moveRight);
        var moveLeftKeyCode = KeyBoard.getKeyCodeForFunction(TetrisGame.moveLeft);

        var hardDropKeyName = KeyBoard.getKeyNameFromKeyCode(hardDropKeyCode);
        var softDropKeyName = KeyBoard.getKeyNameFromKeyCode(softDropKeyCode);
        var moveRightKeyName = KeyBoard.getKeyNameFromKeyCode(moveRightKeyCode);
        var moveLeftKeyName = KeyBoard.getKeyNameFromKeyCode(moveLeftKeyCode);

        var newInnerHTML = "<li>" + "Hard Drop: " + hardDropKeyName +
            "   <button onclick = \"KeyBoard.changeKeyCodeForFunction(TetrisGame.hardDrop)\">" +
            "Change Key</button></li>";
        newInnerHTML += "<li>" + "Soft Drop: " + softDropKeyName +
            "   <button onclick = \"KeyBoard.changeKeyCodeForFunction(TetrisGame.softDrop)\">" +
            "Change Key</button></li>";
        newInnerHTML += "<li>" + "Move Right: " + moveRightKeyName +
            "   <button onclick = \"KeyBoard.changeKeyCodeForFunction(TetrisGame.moveRight)\">" +
            "Change Key</button></li>";
        newInnerHTML += "<li>" + "Move Left: " + moveLeftKeyName +
            "   <button onclick = \"KeyBoard.changeKeyCodeForFunction(TetrisGame.moveLeft)\">" +
            "Change Key</button></li>";

        controlsListElem.innerHTML = newInnerHTML + staticInnerHTMLElem;
        //console.log(hardDropKeyCode);
    }

    var show = function () {
        updateControls();
        showElem(controlsWrapperElem);
    }

    var hide = function () {
        hideElem(controlsWrapperElem);
    }

    return {
        show: show,
        hide: hide
    };
}();

var CreditsScreen = function () {
    var creditsWrapperElem = document.getElementById("creditsScreen");

    var show = function () {
        showElem(creditsWrapperElem);
    }

    var hide = function () {
        hideElem(creditsWrapperElem);
    }

    return {
        show: show,
        hide: hide
    };
}();