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

    var newLBlock = function () {
        var listOfBlocks = new Array();
        var bottomLeftCol = boardMiddleCol - 2;
        listOfBlocks.push(Blocks.newBlock(boardRows - 2, bottomLeftCol, Textures.Blue, true));
        listOfBlocks.push(Blocks.newBlock(boardRows - 2, bottomLeftCol + 1, Textures.Blue, true));
        listOfBlocks.push(Blocks.newBlock(boardRows - 2, bottomLeftCol + 2, Textures.Blue, true));
        listOfBlocks.push(Blocks.newBlock(boardRows - 1, bottomLeftCol + 2, Textures.Blue, true));

        return newBrick(listOfBlocks);
    };

    var newTBlock = function () {

    };

    //etc new blocks ...


    return {
        newLBlock: newLBlock,
        newTBlock: newTBlock
    }


}();