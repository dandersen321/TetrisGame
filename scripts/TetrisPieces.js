var TetrisPieces = function () {

    var boardRows = TetrisGame.Core.getNumberOfBoardRows();
    var boardCols = TetrisGame.Core.getNumberOfBoardCols();
    var boardMiddleCol = boardCols / 2;
    var bottomLeftCol = boardMiddleCol - 2;

    var newBrick = function (newListOfBlocks) {
        var rotation;
        var listOfBlocks = newListOfBlocks;
        var r = boardRows - 2, c = bottomLeftCol;

        var moveLeft = function () {
            c -= 1;
            console.log("moving left");
        }

        var moveRight = function () {
            c += 1;
            console.log("moving right");
        }

        var softDrop = function () {
            console.log("soft drop");
        }

        var hardDrop = function () {
            console.log("hard drop");
        }

        var rotateRight = function () {
            for (var i = 0; i < listOfBlocks.length; i++) {
                var nr = listOfBlocks[i].col,
                    nc = -listOfBlocks[i].row;
                listOfBlocks[i].col = nc;
                listOfBlocks[i].row = nr;
            }
        }

        var moveDown = function () {
            r -= 1;
        }

        var rotateLeft = function () {
            console.log("rotating left");
        }

        var getListOfBlocks = function () {
            var tr = [];
            for (var i = 0; i < listOfBlocks.length; i++) {
                tr.push(Blocks.newBlock(r + listOfBlocks[i].row, c + listOfBlocks[i].col, listOfBlocks[i].texture, listOfBlocks[i].filled));
            }
            return tr;
        }

        return {
            listOfBlocks: listOfBlocks,
            moveLeft: moveLeft,
            moveRight: moveRight,
            softDrop: softDrop,
            hardDrop: hardDrop,
            rotateRight: rotateRight,
            rotateLeft: rotateLeft,
            getListOfBlocks: getListOfBlocks,
            moveDown: moveDown
        };
    }

    var newLBlock = function () {
        var listOfBlocks = new Array();
        listOfBlocks.push(Blocks.newBlock(0, -2, Textures.Blue, true));
        listOfBlocks.push(Blocks.newBlock(0, -1, Textures.Blue, true));
        listOfBlocks.push(Blocks.newBlock(0, 0, Textures.Blue, true));
        listOfBlocks.push(Blocks.newBlock(1, 0, Textures.Blue, true));

        return newBrick(listOfBlocks);
    };

    var newTBlock = function () {
        return newBrick([
            Blocks.newBlock(0, 0, Textures.Blue, true),
            Blocks.newBlock(-1, 0, Textures.Blue, true),
            Blocks.newBlock(1, 0, Textures.Blue, true),
            Blocks.newBlock(0, 1, Textures.Blue, true)
        ]);
    };

    var newSquiggly = function () {
        return newBrick([
            Blocks.newBlock(-1, 0, Textures.Blue, true),
            Blocks.newBlock(0, 0, Textures.Blue, true),
            Blocks.newBlock(0, 1, Textures.Blue, true),
            Blocks.newBlock(1, 1, Textures.Blue, true)
        ]);
    }

    var newReverseSquiggly = function () {
        return newBrick([
            Blocks.newBlock(-1, 0, Textures.Blue, true),
            Blocks.newBlock(0, 0, Textures.Blue, true),
            Blocks.newBlock(0, 1, Textures.Blue, true),
            Blocks.newBlock(-1, -1, Textures.Blue, true)
        ]);
    }

    var newSquare = function () {
        return newBrick([
            Blocks.newBlock(0, 0, Textures.Blue, true),
            Blocks.newBlock(0, 1, Textures.Blue, true),
            Blocks.newBlock(1, 1, Textures.Blue, true),
            Blocks.newBlock(1, 0, Textures.Blue, true)
        ]);
    }

    var newStraight = function () {
        return newBrick([
            Blocks.newBlock(0, 0, Textures.Blue, true),
            Blocks.newBlock(-1, 0, Textures.Blue, true),
            Blocks.newBlock(1, 0, Textures.Blue, true),
            Blocks.newBlock(2, 0, Textures.Blue, true)
        ]);
    }    

    //etc new blocks ...


    return {
        newLBlock: newLBlock,
        newTBlock: newTBlock,
        newSquiggly: newSquiggly,
        newReverseSquiggly: newReverseSquiggly,
        newSquare: newSquare,
        newStraight: newStraight
    }


}();