var TetrisGame = new Object();
TetrisGame.Core = function () {
    var boardRows = 20;
    var boardCols = 10;
    var timeUntilRotate = 0;
    var getNumberOfBoardRows = function () { return boardRows; };
    var getNumberOfBoardCols = function () { return boardCols; };

    var bag = [];

    // Add pieces to bag...
    function initBag() {
        bag.push(TetrisPieces.newLBlock());
        bag.push(TetrisPieces.newLBlock());
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
    //initBag();

    var timeSinceLastMove = 0;
    var moveLength = 1000;


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

    var currentPieceMoveLeft = function () {
        if (currentPiece == null)
            return;
        //console.log("moving left");
        var curListOfBlocks = currentPiece.getListOfBlocks();
        var newCol;
        for(var i = 0; i < curListOfBlocks.length; ++i)
        {
            if (curListOfBlocks[i].col - 1 < 0)
                return;
        }

        currentPiece.moveLeft();
    }

    var currentPieceMoveRight = function () {
        //console.log("moving right");
        if (currentPiece == null)
            return;
        var curListOfBlocks = currentPiece.getListOfBlocks();
        var newCol;
        for (var i = 0; i < curListOfBlocks.length; ++i) {
            if (curListOfBlocks[i].col + 1 >= boardCols)
                return;
        }

        currentPiece.moveRight();
    }

    var currentPieceSoftDrop = function ()
    {
        if (currentPiece == null)
            return;
        moveCurrentPiece();
    }

    var currentPieceHardDrop = function ()
    {
        if (currentPiece == null)
            return;
        //console.log("hard drop");
        while(currentPiece != null)
        {
            moveCurrentPiece();
        }
    }

    var rotatePieceRight = function () {
        if (currentPiece && timeUntilRotate <= 0)
        {
            currentPiece.rotateRight();
            timeUntilRotate += 500;
        }
        // console.log("rotating right");
    }

    var rotatePieceLeft = function () {
        console.log("rotating left");
    }

    var moveCurrentPiece = function () {

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
        //currentPiece = TetrisPieces.newLBlock();
    }

    var transferCurrentPieceToBoard = function () {
        var curListOfBlocks = currentPiece.getListOfBlocks();
        for (var i = 0; i < curListOfBlocks.length; ++i) {
            board[curListOfBlocks[i].row][curListOfBlocks[i].col] = curListOfBlocks[i];
        }
        currentPiece = null;
    }

    var update = function(elapsedTime)
    {
        timeSinceLastMove += elapsedTime;
        if (timeUntilRotate > 0) {
            timeUntilRotate -= elapsedTime;
        }

        if(timeSinceLastMove >= moveLength)
        {
            timeSinceLastMove = 0;
            if (currentPiece != null)
                moveCurrentPiece();
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