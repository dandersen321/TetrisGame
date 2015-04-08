var TetrisPieces = function () {

    var boardRows = TetrisGame.Core.getNumberOfBoardRows();
    var boardCols = TetrisGame.Core.getNumberOfBoardCols();
    var boardMiddleCol = boardCols / 2;
    var bottomLeftCol = boardMiddleCol - 1;

    var currentPieceId = 0;

    var newBrick = function (newListOfBlocks, type) {
        var rotation;
        var listOfBlocks = newListOfBlocks;
        var r = boardRows - 2, c = bottomLeftCol;
        var getR = function () { return r; }
        var getC = function () { return c; }
        var setR = function (newR) { r = newR; };
        var setC = function (newC) { c = newC; };
        var piece = currentPieceId;
        currentPieceId++;
        var t = type;

        var getType = function () {
            return t;
        }

        var moveLeft = function () {
            c -= 1;
            //console.log("moving left");
        }

        var moveRight = function () {
            c += 1;
            //console.log("moving right");
        }

        //var softDrop = function () {
        //    //console.log("soft drop");
        //}

        //var hardDrop = function () {
        //    //console.log("hard drop");
        //}

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
            //for (var i = 0; i < listOfBlocks.length; i++)
            //    listOfBlocks[i].row--;
        }

        var rotateLeft = function () {
            for (var i = 0; i < listOfBlocks.length; i++) {
                var nr = -listOfBlocks[i].col,
                    nc = listOfBlocks[i].row;
                listOfBlocks[i].col = nc;
                listOfBlocks[i].row = nr;
            }
        }

        var getListOfBlocks = function () {
            var tr = [];
            for (var i = 0; i < listOfBlocks.length; i++) {
                tr.push(Blocks.newBlock(r + listOfBlocks[i].row, c + listOfBlocks[i].col + 1, listOfBlocks[i].texture, listOfBlocks[i].filled));
            }
            return tr;
        }

        var clone = function () {
            var newListOfBlocks = new Array(this.listOfBlocks.length);
            for (var i = 0; i < listOfBlocks.length; ++i)
            {
                newListOfBlocks[i] = Blocks.newBlock(listOfBlocks[i].row, listOfBlocks[i].col, listOfBlocks[i].texture, listOfBlocks[i].filled);
            }
            var that = newBrick(newListOfBlocks);
            that.setR(this.getR());
            that.setC(this.getC());
            return that;

        }

        return {
            listOfBlocks: listOfBlocks,
            moveLeft: moveLeft,
            moveRight: moveRight,
            //softDrop: softDrop,
            //hardDrop: hardDrop,
            rotateRight: rotateRight,
            rotateLeft: rotateLeft,
            getListOfBlocks: getListOfBlocks,
            moveDown: moveDown,
            clone: clone,
            currentPieceId: currentPieceId,
            getType: getType,
            getR: getR,
            getC: getC,
            setR: setR,
            setC: setC
        };
    }

    var newLBlock = function () {
        var listOfBlocks = new Array();
        listOfBlocks.push(Blocks.newBlock(0, -2, Textures.L, true));
        listOfBlocks.push(Blocks.newBlock(0, -1, Textures.L, true));
        listOfBlocks.push(Blocks.newBlock(0, 0, Textures.L, true));
        listOfBlocks.push(Blocks.newBlock(1, 0, Textures.L, true));

        return newBrick(listOfBlocks, 'L');
    };

    var newReverseLBlock = function () {

        var listOfBlocks = new Array();
        listOfBlocks.push(Blocks.newBlock(1, -2, Textures.ReverseL, true));
        listOfBlocks.push(Blocks.newBlock(1, -1, Textures.ReverseL, true));
        listOfBlocks.push(Blocks.newBlock(1, 0, Textures.ReverseL, true));
        listOfBlocks.push(Blocks.newBlock(0, 0, Textures.ReverseL, true));

        return newBrick(listOfBlocks, 'J');
    }

    var newTBlock = function () {
        return newBrick([
            Blocks.newBlock(0, 0, Textures.T, true),
            Blocks.newBlock(-1, 0, Textures.T, true),
            Blocks.newBlock(1, 0, Textures.T, true),
            Blocks.newBlock(0, 1, Textures.T, true)
        ], 'T');
    };

    var newSquiggly = function () {
        return newBrick([
            Blocks.newBlock(-1, 0, Textures.S, true),
            Blocks.newBlock(0, 0, Textures.S, true),
            Blocks.newBlock(0, 1, Textures.S, true),
            Blocks.newBlock(1, 1, Textures.S, true)
        ], 'S');
    }

    var newReverseSquiggly = function () {
        return newBrick([
            Blocks.newBlock(-1, 0, Textures.ReverseS, true),
            Blocks.newBlock(0, 0, Textures.ReverseS, true),
            Blocks.newBlock(0, 1, Textures.ReverseS, true),
            Blocks.newBlock(-1, -1, Textures.ReverseS, true)
        ], 'Z');
    }

    var newSquare = function () {
        return newBrick([
            Blocks.newBlock(0, 0, Textures.Square, true),
            Blocks.newBlock(0, 1, Textures.Square, true),
            Blocks.newBlock(1, 1, Textures.Square, true),
            Blocks.newBlock(1, 0, Textures.Square, true)
        ], 'O');
    }

    var newStraight = function () {
        return newBrick([
            Blocks.newBlock(-1, 0, Textures.Line, true),
            Blocks.newBlock(-2, 0, Textures.Line, true),
            Blocks.newBlock(0, 0, Textures.Line, true),
            Blocks.newBlock(1, 0, Textures.Line, true)
        ], 'I');
    }    

    return {
        newLBlock: newLBlock,
        newReverseLBlock: newReverseLBlock,
        newTBlock: newTBlock,
        newSquiggly: newSquiggly,
        newReverseSquiggly: newReverseSquiggly,
        newSquare: newSquare,
        newStraight: newStraight
    }

}();