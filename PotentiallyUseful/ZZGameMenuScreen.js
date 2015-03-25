//var GameMenuScreen = (function () {

//    var menuElemWrapper = document.getElementById("gameMenuWrapper");
//    var menuElem = document.getElementById("gameMenu");
//    //var tetrisGameElem = document.getElementById("gameCanvasWrapper");
//    //var highScoresElem = document.getElementById("highScoresWrapper");

//    var menuItems = [];

//    //specialClass is optional if the css should be one other than the generic menubutton class
//    var newMenuItem = function (buttonText, functionToRun, showFunction, hideFunction, specialClass) {
//        if (!specialClass)
//            specialClass = "class-gameMenuOption";
//        menuElem.innerHTML += ("<li onclick = '" + functionToRun + "' class = '" + specialClass + "' >" + buttonText + "</li>");
//    }

//    var intializeMenu = function () {
//        menuItems.push(newMenuItem("New Game", "Screens.changeToScreen(Screens.ScreenNames.CarGame)"));
//        menuItems.push(newMenuItem("HighScores", "Screens.changeToScreen(Screens.ScreenNames.HighScores)"));
//        menuItems.push(newMenuItem("Credits", "Screens.changeToScreen(Screens.ScreenNames.Credits)"));
//        menuItems.push(newMenuItem("Help", "Screens.changeToScreen(Screens.ScreenNames.Help)"));
//    }

//    var show = function () {
//        menuElemWrapper.style.display = "";
//    }

//    var hide = function () {
//        menuElemWrapper.style.display = "none";
//    }

//    //var showHighScores = function () {
//    //    menuElem.style.display = "";
//    //    var innerHTML = "";
//    //    var highScores = CarGame.scores.getHighScores();
//    //    for (var i = 0; i < highScores.length; ++i) {
//    //        innerHTML += "<li>" + highScores[i] + "<li>";
//    //    }

//    //    menuElem.innerHTML = innerHTML;
//    //}

//    //var hideHighScores = function () {
//    //    menuElem.style.display = "";
//    //}

//    //var notCurrentlyShowing = function () {
//    //    if (menuElem.style.display === "none")
//    //        return true;
//    //    else
//    //        return false;
//    //}

//    return {
//        intializeMenu: intializeMenu,
//        show: show,
//        hide: hide
//        //intializeMenu: intializeMenu,
//        //showMenu: showMenu,
//        //hideMenu: hideMenu,
//        //showGame: showGame,
//        //hideGame: hideGame,
//        //showHighScores: showHighScores,
//        //hideHighScores: hideHighScores,
//        //notCurrentlyShowing: notCurrentlyShowing
//    };

//}());