var TetrisGame = new Object();
TetrisGame.Core = function () {

    var board;
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

    }

    return {
        movePieceLeft: movePieceLeft,
        movePieceRight: movePieceRight,
        softPieceDrop: softPieceDrop,
        hardPieceDrop: hardPieceDrop,
        rotatePieceRight: rotatePieceRight,
        rotatePieceLeft: rotatePieceLeft,
        update: update
    };




}();