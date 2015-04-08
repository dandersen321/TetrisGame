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
    var message1x = gameUpdateCanvas.width / 2 - messageWidth/2 - 35;
    var message1y = gameUpdateCanvas.height / 2 - messageWidth/2 - 50;

    var message2x = message1x;
    var message2y = message1y + 35;

    var message3x = message2x;
    var message3y = message2y + 35;

    var message4x = message2x;
    var message4y = message3y + 35;

    var message5x = message2x;
    var message5y = message4y + 35;

    var message6x = message2x;
    var message6y = message5y + 35;


    var gradient = context.createLinearGradient(message1x, message1y, message6x, message6y);
    gradient.addColorStop("0", "red");
    gradient.addColorStop("1.0", "blue");
    gameUpdateContext.fillStyle = gradient;

    var nextPieceLeftMargin = 30;
    var nextPieceTopMargin = 30;
    var drawUpdated = function(nextPiece, score, linesBroken, level){
        gameUpdateContext.clear();
        drawNextPiece(nextPiece);
        drawScore(score, linesBroken, level);
    }

    var drawNextPiece = function (tetrisPiece) {
        
        var lob = tetrisPiece.getListOfBlocks();
        for (var i = 0; i < lob.length; ++i) {
            //gameUpdateContext.drawImage(lob[i].texture.image, nextPieceLeftMargin, nextPieceTopMargin, colWidth, rowHeight);
            gameUpdateContext.drawImage(lob[i].texture.image, (lob[i].col - boardCols/2 + 3) * colWidth, (boardRows - lob[i].row ) * rowHeight, colWidth, rowHeight);
        }
    }

    function drawScore(score, linesBroken, level) {
        gameUpdateContext.fillText("Score", message1x, message1y);
        gameUpdateContext.fillText(score, message2x, message2y);
        gameUpdateContext.fillText("Lines Broken", message3x, message3y);
        gameUpdateContext.fillText(linesBroken, message4x, message4y);
        gameUpdateContext.fillText("Level", message5x, message5y);
        gameUpdateContext.fillText(level, message6x, message6y);
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
                    ObjectPainter.drawObj(emitterListOfParticles[j], context, canvas.height, canvas.width);
            }

        }
    }

    return {
        drawParticles: drawParticles,
        drawBoard: drawBoard,
        drawPiece: drawPiece,
        drawUpdated: drawUpdated,
        colWidth: colWidth,
        rowHeight: rowHeight
    };

}();