var TetrisGame = new Object();
TetrisGame.Core = function () {
    var boardRows = 20;
    var boardCols = 10;
    var getNumberOfBoardRows = function () { return boardRows; };
    var getNumberOfBoardCols = function () { return boardCols; };

    var timeSinceLastDrop = 0;
    var dropTimeInterval = 1000;

    var timeSinceLastUserMove = 0;
    var userDelay = 100;
    


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

    var shouldPieceBeMovedByUser = function () {
        if (timeSinceLastUserMove > userDelay && currentPiece != null)
            return true;
        else
            return false;
    }

    var currentPieceMoveLeft = function () {
        if (!shouldPieceBeMovedByUser())
            return;
        else
            timeSinceLastUserMove = 0;
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
        if (!shouldPieceBeMovedByUser())
            return;
        else
            timeSinceLastUserMove = 0;
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
        if (!shouldPieceBeMovedByUser())
            return;
        else
            timeSinceLastUserMove = 0;
        dropCurrentPiece();
    }

    var currentPieceHardDrop = function ()
    {
        if (!shouldPieceBeMovedByUser())
            return;
        else
            timeSinceLastUserMove = 0;
        //console.log("hard drop");
        while(currentPiece != null)
        {
            dropCurrentPiece();
        }
    }

    var rotatePieceRight = function () {
        if (!shouldPieceBeMovedByUser())
            return;
        else
            timeSinceLastUserMove = 0;
        console.log("rotating right");
    }

    var rotatePieceLeft = function () {
        if (!shouldPieceBeMovedByUser())
            return;
        else
            timeSinceLastUserMove = 0;
        console.log("rotating left");
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

    var update = function(elapsedTime)
    {
        timeSinceLastDrop += elapsedTime;
        timeSinceLastUserMove += elapsedTime;
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
        rotatePieceRight: rotatePieceRight,
        rotatePieceLeft: rotatePieceLeft,
        update: update,
        render: render
    };




}();