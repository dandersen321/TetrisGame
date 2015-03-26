var TetrisGame = new Object();
TetrisGame.Core = function () {
    var boardRows = 20;
    var boardCols = 10;
    var board = new Array(boardRows);
    //for (var i = 0; i < boardRows; boardRows++)
    //{
    //    board[i] = new Array(boardCols);
    //    for(var j = 0; j < boardCols; ++j)
    //    {
    //        board[i][j] = Blocks.newBlock(i, j, Textures.Empty, false);
    //    }
    //}
    var currentPiece;
    var nextPiece;

    var movePieceLeft = function () {
        console.log("moving left");
    }

    var movePieceRight = function () {
        console.log("moving right");
    }

    var softPieceDrop = function()
    {
        console.log("soft drop");
    }

    var hardPieceDrop = function()
    {
        console.log("hard drop");
    }

    var rotatePieceRight = function () {
        console.log("rotating right");
    }

    var rotatePieceLeft = function () {
        console.log("rotating left");
    }

    var update = function(elapsedTime)
    {
        console.log("tetris game playing!");
    }

    var render = function()
    {
        console.log("tetris game rendering!");
    }


    return {
        movePieceLeft: movePieceLeft,
        movePieceRight: movePieceRight,
        softPieceDrop: softPieceDrop,
        hardPieceDrop: hardPieceDrop,
        rotatePieceRight: rotatePieceRight,
        rotatePieceLeft: rotatePieceLeft,
        update: update,
        render: render
    };




}();