var TetrisGame = new Object();
TetrisGame.Core = function () {
    var boardRows = 20;
    var boardCols = 10;
    var timeUntilRotate = 0;
    var getNumberOfBoardRows = function () { return boardRows; };
    var getNumberOfBoardCols = function () { return boardCols; };

    var playerScore = 0;
    var computerPlaying = false;
    var computerMove = null;
    var simulationMode = false;
    var computerSpeed = 100; //computer can make a move every X ms
    var timeSinceLastComputerMove = 0;

    var bag = [];

    // Add pieces to bag...
    function initBag() {
        //bag.push(TetrisPieces.newStraight());
        //bag.push(TetrisPieces.newStraight());
        //bag.push(TetrisPieces.newStraight());

        bag.push(TetrisPieces.newLBlock());
        bag.push(TetrisPieces.newLBlock());
        bag.push(TetrisPieces.newReverseLBlock());
        bag.push(TetrisPieces.newReverseLBlock());
        bag.push(TetrisPieces.newTBlock());
        bag.push(TetrisPieces.newTBlock());
        bag.push(TetrisPieces.newSquiggly());
        bag.push(TetrisPieces.newSquiggly());
        bag.push(TetrisPieces.newSquiggly());
        bag.push(TetrisPieces.newReverseSquiggly());
        bag.push(TetrisPieces.newReverseSquiggly());
        bag.push(TetrisPieces.newReverseSquiggly());
        bag.push(TetrisPieces.newReverseSquiggly());
        bag.push(TetrisPieces.newSquare());
        bag.push(TetrisPieces.newSquare());
        bag.push(TetrisPieces.newSquare());
        bag.push(TetrisPieces.newStraight());
        bag.push(TetrisPieces.newStraight());
        bag.push(TetrisPieces.newStraight());
    }
    var timeSinceLastDrop = 0;
    var dropTimeInterval = 1000;

    //var newUserMovementTimer = function(timeDelay){

    //    var that = {
    //        lastTimeCalled: 0,
    //        timeDelay: timeDelay
    //    };

    //var shouldPieceBeMovedByUser = function (UserTimers.moveLeft.timeSinceLastUserMove) {
    //    if (timeSinceLastUserMove > userDelay && currentPiece != null)
    //        return true;
    //    else
    //        return false;
    //}

    var currentPieceMoveLeft = function () {
        if (currentPiece == null)
            return false;
        //if (UserTimers.moveLeft.canPieceMove())
        //    UserTimers.moveLeft.lastTimeCalled = 0;
        //else
        //    return;
        //console.log("moving left");
        var curListOfBlocks = currentPiece.getListOfBlocks();
        var newCol;
        for(var i = 0; i < curListOfBlocks.length; ++i)
        {
            if (curListOfBlocks[i].col - 1 < 0 || board[curListOfBlocks[i].row][curListOfBlocks[i].col-1].filled === true)
                return false;
        }

        currentPiece.moveLeft();
        return true;
    }

    var currentPieceMoveRight = function () {
        //if (UserTimers.moveRight.canPieceMove())
        //    UserTimers.moveRight.lastTimeCalled = 0;
        //else
        // return;
        if (currentPiece == null)
            return false;

        var curListOfBlocks = currentPiece.getListOfBlocks();
        var newCol;
        for (var i = 0; i < curListOfBlocks.length; ++i) {
            if (curListOfBlocks[i].col + 1 >= boardCols || board[curListOfBlocks[i].row][curListOfBlocks[i].col + 1].filled === true)
                return false;
        }

        currentPiece.moveRight();
        return true;
    }

    var currentPieceSoftDrop = function ()
    {
        //if (UserTimers.softDrop.canPieceMove())
        //    UserTimers.softDrop.lastTimeCalled = 0;
        //else
        //    return;
        if (currentPiece == null)
            return false;
        dropCurrentPiece();
        return true;
    }

    var currentPieceHardDrop = function ()
    {
        //if (UserTimers.hardDrop.canPieceMove())
        //    UserTimers.hardDrop.lastTimeCalled = 0;
        //else
        //    return;
        //console.log("hard drop");
        if (currentPiece == null)
            return false;
        while(currentPiece != null)
        {
            currentPieceSoftDrop();
        }
        return true;
    }

    var validRotation = function () {
        var listOfBlocks = currentPiece.getListOfBlocks();
        for(var i = 0; i < listOfBlocks.length; ++i)
        {
            if (listOfBlocks[i].row < 0 || listOfBlocks[i].row >= boardRows || listOfBlocks[i].col < 0 || listOfBlocks[i].col > boardCols)
                return false;
        }

        return true;
    }

    var rotatePieceLeft = function () {
        //if (UserTimers.rotateLeft.canPieceMove())
        //    UserTimers.rotateLeft.lastTimeCalled = 0;
        //else
        //    return;
        if (currentPiece == null)
            return false;

        var currentPieceClone = currentPiece.clone();

        currentPiece.rotateLeft();
        if (!validRotation())
        {
            currentPiece = currentPieceClone;
            return false;
        }
        //console.log("rotating left");
        return true;
    }

    var rotatePieceRight = function () {
        //if (UserTimers.rotateRight.canPieceMove() && currentPiece)
        //{
        //    UserTimers.rotateRight.lastTimeCalled = 0;
        //    currentPiece.rotateRight();
        //    timeUntilRotate += 500; //<-- what is this for?
        //}
        //else
        //    return;
        var currentPieceClone = currentPiece.clone();
        currentPiece.rotateRight();
        if (!validRotation()) {
            currentPiece = currentPieceClone;
            return false;
        }
        if (currentPiece == null)
            return false;
        //console.log("rotating right");
        return true;
    }

    

    var dropCurrentPiece = function () {

        var curListOfBlocks = currentPiece.getListOfBlocks();

        var newRow, newCol;

        for (var i = 0; i < curListOfBlocks.length; ++i)
        {
            newRow = curListOfBlocks[i].row - 1;
            newCol = curListOfBlocks[i].col;
            if(newRow < 0 || board[newRow][newCol].filled === true)
            {
                transferCurrentPieceToBoard();
                return;
            }
        }

        //if this for loop is reached, then the new position is a valid one
        currentPiece.moveDown();
    }

    var createCurrentPiece = function () {
        if (bag.length === 0) {
            initBag();
        }
        currentPiece = bag.splice(Math.floor(Math.random() * bag.length), 1)[0];
        nextPiece = bag.splice(Math.floor(Math.random() * bag.length), 1)[0];

        var curListOfBlocks = currentPiece.getListOfBlocks();
        for (var i = 0; i < curListOfBlocks.length; ++i) {
            if (board[curListOfBlocks[i].row][curListOfBlocks[i].col].filled === true) {
                onLose();
                break;
            }
        }
        //currentPiece = TetrisPieces.newLBlock();
    }

    var transferCurrentPieceToBoard = function () {
        var curListOfBlocks = currentPiece.getListOfBlocks();
        for (var i = 0; i < curListOfBlocks.length; ++i) {
            board[curListOfBlocks[i].row][curListOfBlocks[i].col] = curListOfBlocks[i];
        }
        currentPiece = null;

        
        var linesBroken = handleBreakingLines(0);
        if(linesBroken === 1)
        {
            playerScore += 40;
        }
        else if(linesBroken === 2)
        {
            playerScore += 100;
        }
        else if (linesBroken === 3) {
            playerScore += 300;
        }
        else if(linesBroken === 4) {
            playerScore += 1200;
        }

    }

    var handleBreakingLines = function (linesBrokenSoFar) {
        var lineIsComplete;
        for(var r = 0; r < boardRows; ++r)
        {
            lineIsComplete = true;
            for(var c = 0; c < boardCols; ++c)
            {
                if(board[r][c].filled === false)
                {
                    lineIsComplete = false;
                    break;
                }
            }

            if(lineIsComplete)
            {
                destroyLine(r);
                break;
            }
        }

        if(lineIsComplete === true)
        {
            return handleBreakingLines(linesBrokenSoFar+1);
        }
        else
        {
            return linesBrokenSoFar;
        }
    }

    var createTetrisBlockEmitter = function (block) {

        var maxSpeed = 250;
        var emitterSpecs = {
            particlesPerSecond: 750,
            x: block.col * TetrisGame.Renderer.colWidth + TetrisGame.Renderer.colWidth / 2,
            y: block.row * TetrisGame.Renderer.rowHeight + TetrisGame.Renderer.rowHeight / 2,
            minRadius: 4,
            maxRadius: 7,
            minSpeed: 25,
            maxSpeed: maxSpeed,
            minAcceleration: 0,
            maxAcceleration: 0,
            minMaxSpeed: maxSpeed,
            maxMaxSpeed: maxSpeed,
            boundary: null,
            onCollision: null,
            image: block.texture.image,
            minLifeTime: 250,
            maxLifeTime: 750,
            emitterLifeTime: 500
        };

        Emitters.addNewEmiter(createEmitterSpecObj(emitterSpecs));




    }

    var destroyLine = function (rowToDestroy) {

        if (simulationMode !== true)
        {
            for (var c = 0; c < boardCols; ++c) {
                createTetrisBlockEmitter(board[rowToDestroy][c]);
            }
        }
        



        for (var r = rowToDestroy; r < boardRows -1; ++r) {

            for (var c = 0; c < boardCols; ++c) {
                board[r][c].texture = board[r + 1][c].texture;
                board[r][c].filled = board[r + 1][c].filled;
            }
        }

        //for top row if this ever happens
        for(var c = 0; c < boardCols; ++c)
        {
            board[boardRows - 1][c].filled = false;
            board[boardRows - 1][c].texture = Textures.Empty;
        }

    }

    var onLose = function () {

        var playerName = prompt("You lost with score: " + playerScore + ".\nPlease enter you name");
        if (!playerName)
            playerName = "the nameless one";
        console.log(playerName +" lost with score " + playerScore);

        $.post('/api/high-scores', { name: playerName, score: playerScore }, function (data, status) {
            console.log('Data: ' + JSON.stringify(data) + ', status: ' + JSON.stringify(status));
        }).fail(function (jqxhr, text, err) {
            console.log('FAIL! ' + JSON.stringify(err));
        });
        
        TetrisGame.GameLoop.setGameActive(false);
    }

    //var updateUserTimers = function (elapsedTime) {
    //    for(key in UserTimers)
    //    {
    //        UserTimers[key].lastTimeCalled += elapsedTime;
    //    }
    //}

    var numOfUniqueRotations = 4;

    function findComputerMoveUsingAI() {
        var boardClone = board.clone();
        var currentPieceClone = currentPiece.clone();
        var maxScore = 1;
        var maxMove = null;
        var canMakeMove, newScore;
        simulationMode = true;
        for (var r = 0; r < numOfUniqueRotations; ++r)
        {
            for (var c = 0; c < boardCols; ++c) {
                board = boardClone.clone();
                currentPiece = currentPieceClone.clone();
                canMakeMove = createPotentialBoard(numOfUniqueRotations, c);
                if (canMakeMove === false)
                    continue;

                newScore = AI.getScore(board);
                if(newScore > maxScore)
                {
                    maxScore = newScore;
                    maxMove = {
                        col: c,
                        numOfRotations: r
                    };
                }

            }
        }

        board = boardClone.clone();
        currentPiece = currentPieceClone.clone();
        rotateCurrentPieceNTimes(maxMove.numOfRotations);
        simulationMode = false;
        computerMove = maxMove;
    }

    function createPotentialBoard(numOfRotations, col) {
        var currentCol = getCurrentCol();
        var colsToMove = Math.abs(currentCol - col);

        rotateCurrentPieceNTimes(numOfRotations);

        var canMoveThatDirection;
        for(var i = 0; i < colsToMove; ++i)
        {
            if(currentCol > col)
            {
                canMoveThatDirection = currentPieceMoveLeft();
            }
            else {
                canMoveThatDirection = currentPieceMoveRight();
            }

            if(canMoveThatDirection !== true)
            {
                return false;
            }
        }

        currentPieceHardDrop();

        return true;
    }

    function getCurrentCol() {
        return currentPiece.getListOfBlocks()[0].col;
    }

    function moveTowardsComputerMove() {
        timeSinceLastComputerMove = 0;
        var currentCol = getCurrentCol();
        var colsToMove = Math.abs(currentCol - computerMove.col);
        var canMoveInDirection;

        if (currentCol > computerMove.col) {
            canMoveInDirection = currentPieceMoveLeft();
        }
        else if(currentCol < computerMove.col) {
            canMoveInDirection = currentPieceMoveRight();
        }
        else {
            currentPieceHardDrop();
        }

        if (!canMoveInDirection) {
            currentPieceHardDrop();
        }
   

    }

    function rotateCurrentPieceNTimes(n)
    {
        for(var i = 0; i < n; ++i)
        {
            rotatePieceRight();
        }
    }

    var update = function(elapsedTime)
    {
        timeSinceLastDrop += elapsedTime;
        timeSinceLastComputerMove += elapsedTime;
        Emitters.updateEmitters(elapsedTime);

        if (currentPiece === null)
        {
            computerMove = null;
        }
        else if (computerPlaying === true && computerMove === null)
        {
            findComputerMoveUsingAI();
        }
        else if (computerPlaying && timeSinceLastComputerMove >= computerSpeed) {
            moveTowardsComputerMove();
            
        }
        

        //updateUserTimers(elapsedTime);
        if(timeSinceLastDrop >= dropTimeInterval)
        {
            timeSinceLastDrop = 0;
            if (currentPiece != null)
                dropCurrentPiece();
            else
                createCurrentPiece();
        }
        //console.log("tetris game playing!");
    }

    var render = function()
    {
        //console.log("tetris game rendering!");
        TetrisGame.Renderer.drawBoard(board);
        TetrisGame.Renderer.drawScore(playerScore);
        TetrisGame.Renderer.drawParticles();
        

        if(currentPiece != null)
        {
            TetrisGame.Renderer.drawPiece(currentPiece);
        }
    }

    var stopAI = function () {
        computerPlaying = false;
    }

    var letAITakeOver = function () {
        computerPlaying = true;
    }


    return {
        getNumberOfBoardCols: getNumberOfBoardCols,
        getNumberOfBoardRows: getNumberOfBoardRows,
        currentPieceMoveLeft: currentPieceMoveLeft,
        currentPieceMoveRight: currentPieceMoveRight,
        currentPieceSoftDrop: currentPieceSoftDrop,
        currentPieceHardDrop: currentPieceHardDrop,
        rotatePieceLeft: rotatePieceLeft,
        rotatePieceRight: rotatePieceRight,
        update: update,
        render: render,
        stopAI: stopAI,
        letAITakeOver: letAITakeOver
    };
}();