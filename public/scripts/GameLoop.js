//the gameloop of the game, mainly does stuff when game is in a waiting, playing, or lost state
TetrisGame.GameLoop = (function () {
    var lastTimeStamp = performance.now();
    var gameActive = false;

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