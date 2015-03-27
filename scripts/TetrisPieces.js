var TetrisPieces = function () {

    var boardRows = TetrisGame.Core.getNumberOfBoardRows();
    var boardCols = TetrisGame.Core.getNumberOfBoardCols();
    var boardMiddleCol = boardCols / 2;

    var newBrick = function (newListOfBlocks) {
        var rotation;
        var listOfBlocks = newListOfBlocks;

        var moveLeft = function () {
            console.log("moving left");
        }

        var moveRight = function () {
            console.log("moving right");
        }

        var softDrop = function () {
            console.log("soft drop");
        }

        var hardDrop = function () {
            console.log("hard drop");
        }

        var rotateRight = function () {
            console.log("rotating right");
        }

        var rotateLeft = function () {
            console.log("rotating left");
        }

        return {
            listOfBlocks: listOfBlocks,
            moveLeft: moveLeft,
            moveRight: moveRight,
            softDrop: softDrop,
            hardDrop: hardDrop,
            rotateRight: rotateRight,
            rotateLeft: rotateLeft
        };
    }

    var newReverseSPiece = function () {
        var listOfBlocks = new Array();
        var bottomLeftCol = boardMiddleCol - 2;
        listOfBlocks.push(Blocks.newBlock(boardRows - 2, bottomLeftCol, Textures.ReverseS, true));
        listOfBlocks.push(Blocks.newBlock(boardRows - 2, bottomLeftCol + 1, Textures.ReverseS, true));
        listOfBlocks.push(Blocks.newBlock(boardRows - 2, bottomLeftCol + 2, Textures.ReverseS, true));
        listOfBlocks.push(Blocks.newBlock(boardRows - 1, bottomLeftCol + 2, Textures.ReverseS, true));

        return newBrick(listOfBlocks);
    };

    var newSPiece = function () {
        var listOfBlocks = new Array();
        var bottomLeftCol = boardMiddleCol - 2;
        listOfBlocks.push(Blocks.newBlock(boardRows - 2, bottomLeftCol, Textures.S, true));
        listOfBlocks.push(Blocks.newBlock(boardRows - 2, bottomLeftCol + 1, Textures.S, true));
        listOfBlocks.push(Blocks.newBlock(boardRows - 2, bottomLeftCol + 2, Textures.S, true));
        listOfBlocks.push(Blocks.newBlock(boardRows - 1, bottomLeftCol + 2, Textures.S, true));

        return newBrick(listOfBlocks);
    };

    var newTPiece = function () {
        var listOfBlocks = new Array();
        var bottomLeftCol = boardMiddleCol - 2;
        listOfBlocks.push(Blocks.newBlock(boardRows - 2, bottomLeftCol, Textures.T, true));
        listOfBlocks.push(Blocks.newBlock(boardRows - 2, bottomLeftCol + 1, Textures.T, true));
        listOfBlocks.push(Blocks.newBlock(boardRows - 2, bottomLeftCol + 2, Textures.T, true));
        listOfBlocks.push(Blocks.newBlock(boardRows - 1, bottomLeftCol + 2, Textures.T, true));

        return newBrick(listOfBlocks);
    };

    var newSquarePiece = function () {
        var listOfBlocks = new Array();
        var bottomLeftCol = boardMiddleCol - 2;
        listOfBlocks.push(Blocks.newBlock(boardRows - 2, bottomLeftCol, Textures.Square, true));
        listOfBlocks.push(Blocks.newBlock(boardRows - 2, bottomLeftCol + 1, Textures.Square, true));
        listOfBlocks.push(Blocks.newBlock(boardRows - 2, bottomLeftCol + 2, Textures.Square, true));
        listOfBlocks.push(Blocks.newBlock(boardRows - 1, bottomLeftCol + 2, Textures.Square, true));

        return newBrick(listOfBlocks);
    };

    var newLinePiece = function () {
        var listOfBlocks = new Array();
        var bottomLeftCol = boardMiddleCol - 2;
        listOfBlocks.push(Blocks.newBlock(boardRows - 2, bottomLeftCol, Textures.Line, true));
        listOfBlocks.push(Blocks.newBlock(boardRows - 2, bottomLeftCol + 1, Textures.Line, true));
        listOfBlocks.push(Blocks.newBlock(boardRows - 2, bottomLeftCol + 2, Textures.Line, true));
        listOfBlocks.push(Blocks.newBlock(boardRows - 1, bottomLeftCol + 2, Textures.Line, true));

        return newBrick(listOfBlocks);
    };

    var newLPiece = function () {
        var listOfBlocks = new Array();
        var bottomLeftCol = boardMiddleCol - 2;
        listOfBlocks.push(Blocks.newBlock(boardRows - 2, bottomLeftCol, Textures.L, true));
        listOfBlocks.push(Blocks.newBlock(boardRows - 2, bottomLeftCol + 1, Textures.L, true));
        listOfBlocks.push(Blocks.newBlock(boardRows - 2, bottomLeftCol + 2, Textures.L, true));
        listOfBlocks.push(Blocks.newBlock(boardRows - 1, bottomLeftCol + 2, Textures.L, true));

        return newBrick(listOfBlocks);
    };

    var newReverseLPiece = function () {
        var listOfBlocks = new Array();
        var bottomLeftCol = boardMiddleCol - 2;
        listOfBlocks.push(Blocks.newBlock(boardRows - 2, bottomLeftCol, Textures.ReverseL, true));
        listOfBlocks.push(Blocks.newBlock(boardRows - 2, bottomLeftCol + 1, Textures.ReverseL, true));
        listOfBlocks.push(Blocks.newBlock(boardRows - 2, bottomLeftCol + 2, Textures.ReverseL, true));
        listOfBlocks.push(Blocks.newBlock(boardRows - 1, bottomLeftCol + 2, Textures.ReverseL, true));

        return newBrick(listOfBlocks);
    };

    var getRandomPiece = function(){
        var result = Math.floor(Math.random() * 7); //7 pieces

        if (result === 0)
            return newReverseSPiece();
        else if (result === 1)
            return newSPiece();
        else if (result === 2)
            return newTPiece();
        else if (result === 3)
            return newSquarePiece();
        else if (result === 4)
            return newLinePiece();
        else if (result === 5)
            return newLPiece();
        else if (result === 6)
            return newReverseLPiece();
        
    }


    return {
        getRandomPiece: getRandomPiece
        //newReverseSPiece: newReverseSPiece,
        //newSPiece: newSPiece,
        //newTPiece: newTPiece,
        //newSquarePiece: newSquarePiece,
        //newLinePiece: newLinePiece,
        //newLPiece: newLPiece,
        //newReverseLPiece: newReverseLPiece
    };


}();