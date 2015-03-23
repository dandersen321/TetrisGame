//the gameloop of the game, mainly does stuff when game is in a waiting, playing, or lost state
GameLoop = (function () {
    var lastTimeStamp = performance.now();
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
    };


    var render = function () {
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
        intialize: intialize
        //gameState: gameState,
        //GameState: GameState,
        //getGameState: getGameState,
        //setGameState: setGameState
    };

})();