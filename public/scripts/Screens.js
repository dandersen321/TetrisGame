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
    var newMenuItem = function (buttonText, functionToRun, specialClass, specialId) {
        if (!specialClass)
            specialClass = "class-gameMenuOption";

        if (specialId !== undefined)
            specialId = "id = \"" + specialId + "\"";
        else
            specialId = "";
        menuElem.innerHTML += ("<li " + specialId + " onclick = '" + functionToRun + "' class = '" + specialClass + "' >" + buttonText + "</li>");
    }


    /* CONSTRUCTOR*/
    //var intializeMenu = function () {
    menuItems.push(newMenuItem("New Game", "ScreenManager.changeToScreen(ScreenNames.GamePlaying, false)"));
    menuItems.push(newMenuItem("Continue Game", "ScreenManager.changeToScreen(ScreenNames.GamePlaying, true)", null, "continueGame"));
    menuItems.push(newMenuItem("High Scores", "ScreenManager.changeToScreen(ScreenNames.HighScores)"));
    menuItems.push(newMenuItem("Controls", "ScreenManager.changeToScreen(ScreenNames.Controls)"));
    menuItems.push(newMenuItem("Credits", "ScreenManager.changeToScreen(ScreenNames.Credits)"));
    //}

    

    

    var show = function () {
        showElem(menuScreen);
        if(TetrisGame.Core.getGameCurrentlyBeingPlayed() === true)
        {
            showElem(document.getElementById("continueGame"));
        }
        else
        {
            hideElem(document.getElementById("continueGame"));
        }
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

    var show = function (continueGame) {
        if (continueGame === true)
            TetrisGame.GameLoop.setGameActive(true);
        else
            TetrisGame.Core.startNewGame();
        showElem(gameScreenWrapperElem);
    }

    var hide = function () {
        TetrisGame.GameLoop.setGameActive(false);
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
        angular.element(document.getElementById('highScoresScreen')).scope().updateScores();
        showElem(highScoresWrapperElem);
    };

    var hide = function () {
        hideElem(highScoresWrapperElem);
    };

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

    var changeControlForFunction = function(functionToChange){

    }

    var updateControls = function () {
        var hardDropKeyCode = KeyBoard.getKeyHardDrop();
        var softDropKeyCode = KeyBoard.getKeySoftDrop();
        var moveRightKeyCode = KeyBoard.getKeyMoveRight();
        var moveLeftKeyCode = KeyBoard.getKeyMoveLeft();
        var rotateRightKeyCode = KeyBoard.getKeyRotateRight();
        var rotateLeftKeyCode = KeyBoard.getKeyRotateLeft();

        //var hardDropKeyName = KeyBoard.getKeyNameFromKeyCode(hardDropKeyCode);

        var newInnerHTML = "<li>" + "Hard Drop: " + hardDropKeyCode + "</br>" +
            "   <button onclick = \"KeyBoard.changeKeyHardDrop()\">" +
            "Change Key</button></li>";
        newInnerHTML += "<li>" + "Soft Drop: " + softDropKeyCode + "</br>" +
            "   <button onclick = \"KeyBoard.changeKeySoftDrop()\">" +
            "Change Key</button></li>";
        newInnerHTML += "<li>" + "Move Right: " + moveRightKeyCode + "</br>" +
            "   <button onclick = \"KeyBoard.changeKeyMoveRight()\">" +
            "Change Key</button></li>";
        newInnerHTML += "<li>" + "Move Left: " + moveLeftKeyCode + "</br>" +
            "   <button onclick = \"KeyBoard.changeKeyMoveLeft()\">" +
            "Change Key</button></li>";
        newInnerHTML += '<li>' + 'Rotate Right: ' + rotateRightKeyCode + "</br>" +
            '   <button onclick = "KeyBoard.changeKeyRotateRight()">' +
            'Change Key</button></li>';

        newInnerHTML += '<li>' + 'Rotate Left: ' + rotateLeftKeyCode + "</br>" +
            '   <button onclick = "KeyBoard.changeKeyRotateLeft()">' +
            'Change Key</button></li>';


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