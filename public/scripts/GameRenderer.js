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

    var gameUpdateCanvas = document.getElementById("gameUpdateCanvas");
    var gameUpdateContext = gameUpdateCanvas.getContext("2d");

    gameUpdateContext.clear = function () {
        gameUpdateContext.clearRect(0, 0, gameUpdateCanvas.width, gameUpdateCanvas.height);
    };

    gameUpdateContext.font = "30px Arial";

    var messageWidth = 100;
    var x0FirstMessage = gameUpdateCanvas.width / 2 - messageWidth/2;
    var y0FirstMessage = gameUpdateCanvas.height / 2 - messageWidth/2;

    var x0SecondMessage = gameUpdateCanvas.width / 2 - messageWidth/2;
    var y0SecondMessage = gameUpdateCanvas.height / 2;

    var gradient = context.createLinearGradient(x0FirstMessage, y0FirstMessage, x0SecondMessage, y0SecondMessage);
    gradient.addColorStop("0", "red");
    gradient.addColorStop("1.0", "blue");
    gameUpdateContext.fillStyle = gradient;

    function drawScore(score) {
        gameUpdateContext.clear();
        gameUpdateContext.fillText("Score", x0FirstMessage, y0FirstMessage);
        gameUpdateContext.fillText(score, x0SecondMessage, y0SecondMessage);
    }

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
        var lob = tetrisPiece.getListOfBlocks();
        for(var i = 0; i < lob.length; ++i)
        {
            drawBlock(lob[i]);
        }
    }

    var drawParticles = function () {
        var listOfCurrentEmitters = Emitters.getEmitters();
        for (var i = 0; i < listOfCurrentEmitters.length; ++i) {
            var emitterListOfParticles = listOfCurrentEmitters[i].getListOfParticles();

            for (var j = 0; j < emitterListOfParticles.length; ++j) {
                    ObjectPainter.drawObj(emitterListOfParticles[j], context, canvas.height);
            }

        }
    }

    return {
        drawParticles: drawParticles,
        drawBoard: drawBoard,
        drawPiece: drawPiece,
        drawScore: drawScore,
        colWidth: colWidth,
        rowHeight: rowHeight
    };

}();