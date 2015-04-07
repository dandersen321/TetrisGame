var AI = function () {

    var getScore = function(board) {

        // AI algorithm: http://totologic.blogspot.com/2013/03/tetris-ai-explained.html

        var rfs = myMath.getRandomFloats();
        var h0 = 0, h1 = 0, h2 = 0, h3 = 0, h4 = 0, h5;

        // h0: Number of holes in the play field
        // h1: Altitude of the higher cell in the play field
        // h2: The number of cells in the play field
        // h3: The value of the higher slope in the play field
        // h4: The roughness
        // h5: The number of cells in the play field weighted by their altitude

        for (var row = 0; row < board.length - 1; ++row) {
            for (var col = 0; col < board[row].length; ++col) {
                // Hole is defined as if there is an empty spot, with a something above it.
                if (board[row][col].filled == false && board[row + 1][col].filled == true) {
                    h0++;
                }
            }
        }

        for (var row = 0; row < board.length; ++row) {
            for (var col =0; col < board[row].length; ++col) {
                if (board[row][col].filled == true) {
                    if (row > h1) {
                        h1 = row;
                    }
                    h2++;
                }
            }
        }

        var highSpot = function(col) {
            var tr = 0;
            for (var i = 0; i < board.length; i++) {
                if (board[i][col].filled == true) {
                    tr = i;
                }
            }

            return tr;
        };

        var avg = 0;

        for (var col = 0; col < board[0].length; ++col) {
            // h3: compare delta between this and last row.
            if (col > 0 && Math.abs(highSpot(col) - highSpot(col - 1)) > h3) {
                h3 = Math.abs(highSpot(col) - highSpot(col - 1));
            }

            avg += highSpot(col);
        }

        avg /= board[0].length;
        for (var col = 0; col < board[0].length; ++col) {
            h4 += Math.abs(highSpot(col) - avg);
        }

        //console.log("h0: " + h0 + " h1: " + h1 + " h2 " + h2 + " h3 " + h3 + " h4 " + h4);
        //console.log(rfs);
        return rfs[0] * h0 + rfs[1] * h1 + rfs[2] * h2 + rfs[3] * h3 + rfs[4] * h4;
    };

    return {
        getScore: getScore
    };

}();