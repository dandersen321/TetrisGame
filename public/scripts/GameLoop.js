//the gameloop of the game, mainly does stuff when game is in a waiting, playing, or lost state
TetrisGame.GameLoop = (function () {
    var lastTimeStamp = performance.now();
    var gameActive = false;
    var timeSinceLastPlayerMove = 0;
    var gameAttractModeInterval = 15000;
    var attractModeActive = false;

    var setGameActive = function (newGameActive)
    {
        gameActive = newGameActive;
        if (newGameActive) {
            document.getElementById("aud_tetris_theme").play();
            document.getElementById("aud_tetris_theme").volume = 0.3;
        } else {
            document.getElementById("aud_tetris_theme").pause();
        }
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
    
    var isAttractModeOn = function () {
        return attractModeActive;
    }

    var turnOffAttractMode = function () {
        attractModeActive = false;
        TetrisGame.Core.setGameCurrentlyBeingPlayed(false);
        ScreenManager.changeToScreen(ScreenNames.GameMenu);
        timeSinceLastPlayerMove = 0;
        console.log("turning off attract mode");
        document.getElementById("gameAIControlButton").style.display = "";
    }

    var startAttractMove = function () {
        ScreenManager.changeToScreen(ScreenNames.GamePlaying, false);
        //TetrisGame.Core.startNewGame();
        TetrisGame.Core.turnOnAI();
        attractModeActive = true;
        document.getElementById("gameAIControlButton").style.display = "none";
        
    }

    var update = function (currentTimeStamp) {
        var elapsedTime = currentTimeStamp - lastTimeStamp;
        KeyBoard.update(elapsedTime);

        if(gameActive === true)
        {
            TetrisGame.Core.update(elapsedTime);
        }
        else {
            timeSinceLastPlayerMove += elapsedTime;
        }

        if (attractModeActive === false && timeSinceLastPlayerMove >= gameAttractModeInterval) {
            startAttractMove();
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
        getGameActive: getGameActive,
        isAttractModeOn: isAttractModeOn,
        turnOffAttractMode: turnOffAttractMode
        //gameState: gameState,
        //GameState: GameState,
        //getGameState: getGameState,
        //setGameState: setGameState
    };

})();