var TetrisGame = new Object();
TetrisGame.Core = function () {
    var boardRows = 20;
    var boardCols = 10;
    var getNumberOfBoardRows = function () { return boardRows; };
    var getNumberOfBoardCols = function () { return boardCols; };

    var timeSinceLastDrop = 0;
    var dropTimeInterval = 1000;

    var newUserMovementTimer = function(timeDelay){

        var that = {
            lastTimeCalled: 0,
            timeDelay: timeDelay
        };

        that.canPieceMove = function(){
            if(that.lastTimeCalled > that.timeDelay && currentPiece !=null)
                return true;
            else
                return false;
        }

        return that;
    }

    var UserTimers = {
            moveLeft : newUserMovementTimer(100),
            moveRight : newUserMovementTimer(100),
            softDrop : newUserMovementTimer(100),
            hardDrop : newUserMovementTimer(100),
            rotateLeft : newUserMovementTimer(100),
            rotateRight : newUserMovementTimer(100),
        };
    //var moveLeftTimer = newUserMovementTimer(100);
    //var moveRightTimer = newUserMovementTimer(100);
    //var softDropTimer = newUserMovementTimer(100);
    //var hardDropTimer = newUserMovementTimer(100);
    //var rotateLeftTimer = newUserMovementTimer(100);
    //var rotateRightTimer = newUserMovementTimer(100);
    //var timeSinceLastUserMoveLeft = 0;
    //var timeSinceLastUserMoveRight = 0;
    //var timeSinceLastUserSoftDrop = 0;
    //var timeSinceLastUserHardDrop = 0;
    //var timeSinceLastUserRotateLeft = 0;
    //var timeSinceLastUserRotateRight = 0;
    //var userDelay = 100;


    var board = new Array(boardRows);
    for (var i = 0; i < boardRows; i++)
    {
        board[i] = new Array(boardCols);
        for(var j = 0; j < boardCols; ++j)
        {
            board[i][j] = Blocks.newBlock(i, j, Textures.Empty, false);
        }
    }
    var currentPiece = null;
    var nextPiece;

    //var shouldPieceBeMovedByUser = function (UserTimers.moveLeft.timeSinceLastUserMove) {
    //    if (timeSinceLastUserMove > userDelay && currentPiece != null)
    //        return true;
    //    else
    //        return false;
    //}

    var currentPieceMoveLeft = function () {
        if (UserTimers.moveLeft.canPieceMove())
            UserTimers.moveLeft.lastTimeCalled = 0;
        else
            return;
        //console.log("moving left");
        var curListOfBlocks = currentPiece.listOfBlocks;
        var newCol;
        for(var i = 0; i < curListOfBlocks.length; ++i)
        {
            if (curListOfBlocks[i].col - 1 < 0)
                return;
        }

        for (var i = 0; i < curListOfBlocks.length; ++i) {
            curListOfBlocks[i].col -= 1;
        }
    }

    var currentPieceMoveRight = function () {
        if (UserTimers.moveRight.canPieceMove())
            UserTimers.moveRight.lastTimeCalled = 0;
        else
            return;
        //console.log("moving right");

        var curListOfBlocks = currentPiece.listOfBlocks;
        var newCol;
        for (var i = 0; i < curListOfBlocks.length; ++i) {
            if (curListOfBlocks[i].col + 1 >= boardCols)
                return;
        }

        for (var i = 0; i < curListOfBlocks.length; ++i) {
            curListOfBlocks[i].col += 1;
        }
    }

    var currentPieceSoftDrop = function ()
    {
        if (UserTimers.softDrop.canPieceMove())
            UserTimers.softDrop.lastTimeCalled = 0;
        else
            return;
        dropCurrentPiece();
    }

    var currentPieceHardDrop = function ()
    {
        if (UserTimers.hardDrop.canPieceMove())
            UserTimers.hardDrop.lastTimeCalled = 0;
        else
            return;
        //console.log("hard drop");
        while(currentPiece != null)
        {
            dropCurrentPiece();
        }
    }

    var rotatePieceLeft = function () {
        if (UserTimers.rotateLeft.canPieceMove())
            UserTimers.rotateLeft.lastTimeCalled = 0;
        else
            return;
        console.log("rotating left");
    }

    var rotatePieceRight = function () {
        if (UserTimers.rotateRight.canPieceMove())
            UserTimers.rotateRight.lastTimeCalled = 0;
        else
            return;
        console.log("rotating right");
    }

    

    var dropCurrentPiece = function () {

        var curListOfBlocks = currentPiece.listOfBlocks;

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
        for (var i = 0; i < curListOfBlocks.length; ++i) {
            curListOfBlocks[i].row -= 1;
        }
    }

    var createCurrentPiece = function () {
        currentPiece = TetrisPieces.newLBlock();
    }

    var transferCurrentPieceToBoard = function () {
        var curListOfBlocks = currentPiece.listOfBlocks;
        for (var i = 0; i < curListOfBlocks.length; ++i) {
            board[curListOfBlocks[i].row][curListOfBlocks[i].col] = curListOfBlocks[i];
        }
        currentPiece = null;
    }

    var updateUserTimers = function (elapsedTime) {
        for(key in UserTimers)
        {
            UserTimers[key].lastTimeCalled += elapsedTime;
        }
    }

    var update = function(elapsedTime)
    {
        timeSinceLastDrop += elapsedTime;
        updateUserTimers(elapsedTime);
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
        

        if(currentPiece != null)
        {
            TetrisGame.Renderer.drawPiece(currentPiece);
        }
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
        render: render
    };




}();