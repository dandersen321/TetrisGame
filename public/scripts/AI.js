var AI = function () {

    var getScore = function(board, nbroken, ai_params) {

        // AI algorithm: http://totologic.blogspot.com/2013/03/tetris-ai-explained.html
        var aggregate_height = 0,
            num_pieces = 0,
            holes = 0,
            bumpiness = 0;

        var getColumnHeight = function (column) {
            var tr = 0;
            for (var row = 0; row < board.length; row++) {
                if (board[row][column].filled == true) {
                    tr = row + 1;
                }
            }

            return tr;
        };

        // Height and bumpiness require column heights...
        for (var column = 0; column < board[0].length; ++column) {
            aggregate_height += getColumnHeight(column);
            if (column > 0) {
                bumpiness += Math.abs(getColumnHeight(column) - getColumnHeight(column - 1));
            }

            // Holes: Number of empty spaaaaaces with one tile in col above
            var nsp = 0;
            for (var row = 0; row < board.length; ++row) {
                if (board[row][column].filled == true) {
                    holes += nsp;
                    nsp = 0;
                    num_pieces++;
                } else {
                    nsp++;
                }
            }
        }

        return Math.floor(aggregate_height * ai_params.aggregate_height
            + holes * ai_params.holes
            + bumpiness * ai_params.bumpiness
            + nbroken * ai_params.nbroken) * 300;
    };

    return {
        getScore: getScore
    };

}();