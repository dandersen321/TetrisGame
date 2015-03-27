//the gameloop of the game, mainly does stuff when game is in a waiting, playing, or lost state
TetrisGame.GameLoop = (function () {
    var lastTimeStamp = performance.now();
    var gameActive = false;

    //var playerEvents = function () {
    //    return {
    //        moveLeft: 0,
    //        moveRight: 1,
    //        softDrop: 2,
    //        hardDrop: 3,
    //        rotateLeft: 4,
    //        rotateRight: 5
    //    };
    //}

    //var playerInput = function () {
        
    //    var eventQueue = new Array();
    //    var moveLeftKeyCode, moveRightKeyCode, rotateRightKeyCode, rotateLeftKeyCode,
    //        softDropKeyCode, hardDropKeyCode;

    //    var resetControls = function(){
    //        moveLeftKeyCode = KeyCodes.ARROWLEFT;
    //        moveRightKeyCode = KeyCodes.ARROWRIGHT;
    //        softDropKeyCode = KeyCodes.ARROWDOWN;
    //        hardDropKeyCode = KeyCodes.ARROWUP;
    //        rotateLeftKeyCode = KeyCodes.Q;
    //        rotateRightKeyCode = KeyCodes.W;
    //    }

    //    resetControls();

    //    var keyDown = function(keyCode){
    //        if (keyCode == moveLeftKeyCode)
    //            eventQueue.push(playerEvents.moveLeft);
    //        else if (keyCode == moveRightKeyCode)
    //            eventQueue.push(playerEvents.moveRight);
    //        else if(keyCode == softDropKeyCode)
    //            eventQueue.push(playerEvents.softDrop);
    //        else if(keyCode == hardDropKeyCode)
    //            eventQueue.push(playerEvents.hardDrop);
    //        else if(keyCode == rotateLeftKeyCode)
    //            eventQueue.push(playerEvents.rotateLeft);
    //        else if(keyCode == rotateRightKeyCode)
    //            eventQueue.push(playerEvents.rotateRight);
    //    }


    //    return {
    //        eventQue: new Array()
    //    };
    //}

    //document.onkeydown = function (event) {
    //    playerInput.keyDown(event.keyCode);
    //}




    var setGameActive = function (newGameActive)
    {
        gameActive = newGameActive;
    };
    var getGameActive = function () { return gameActive; };
    //var gameState;
    //var getGameState = function () { return gameState; }
    //var setGameState = function (newGameState) { gameState = newGameState; }
    //var oldGameState;

    var intialize = function () {
        //gameState = GameState.Menu;
        //oldGameState = gameState;
        gameLoop();
    };

    var update = function (currentTimeStamp) {
        var elapsedTime = currentTimeStamp - lastTimeStamp;
        KeyBoard.update(elapsedTime);

        if(gameActive === true)
        {
            TetrisGame.Core.update(elapsedTime);
        }
    };


    var render = function () {

        if (gameActive === true) {
            TetrisGame.Core.render();
        }
    }

    var gameLoop = function () {
        var currentTimeStamp = performance.now();
        update(currentTimeStamp);
        render();
        lastTimeStamp = currentTimeStamp;
        //oldGameState = gameState;
        requestAnimationFrame(gameLoop);
    };

    //var GameState = {
    //    Menu: 1,
    //    Waiting: 2,
    //    Playing: 3,
    //    Lost: 4
    //}


    return {
        intialize: intialize,
        setGameActive: setGameActive,
        getGameActive: getGameActive
        //gameState: gameState,
        //GameState: GameState,
        //getGameState: getGameState,
        //setGameState: setGameState
    };

})();