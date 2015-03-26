TetrisGame.Renderer = function () {

    var canvas = document.getElementById("gameCanvas");
    var context = canvas.getContext("2d");
    context.clear = function () {
        context.clearRect(0, 0, canvas.width, canvas.height);
    }

    var boardRows, boardCols;
    var rowHeight, colWidth;

    boardRows = TetrisGame.Core.getNumberOfBoardRows();
    boardCols = TetrisGame.Core.getNumberOfBoardCols();

    rowHeight = canvas.height / boardRows;
    colWidth = canvas.width / boardCols;

    var drawBoard = function (board) {
        context.clear();
        for (var r = 0; r < boardRows; ++r) {
            for (var c = 0; c < boardCols; ++c) {
                drawBlock(board[r][c]);
            }
        }
    }

    var drawBlock = function (block) {
        //(boardRows - r - 1) because 0, 0 is bottom left corner of board
        context.drawImage(block.texture.image, block.col * colWidth, (boardRows - block.row - 1) * rowHeight, colWidth, rowHeight);
    }

    var drawPiece = function (tetrisPiece) {
        for(var i = 0; i < tetrisPiece.listOfBlocks.length; ++i)
        {
            drawBlock(tetrisPiece.listOfBlocks[i]);
        }
    }

    return {
        drawBoard: drawBoard,
        drawPiece: drawPiece
    };

}();