var AI = function () {

    var getScore = function(board, nbroken) {

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
        /*
         0 (221): {"aggregate_height":"55.69540897849947","holes":"91.92954336758703","bumpiness":"28.974953875876963","nbroken":"-42.00027167331427","score":"221"}
         1 (170): {"aggregate_height":"60.55679735727608","holes":"51.540208398364484","bumpiness":"25.861013121902943","nbroken":"-4.280327903106809","score":"170"}
         2 (150): {"aggregate_height":"31.05099336244166","holes":"60.47634384594858","bumpiness":"25.653465907089412","nbroken":"-43.39852232020348","score":"150"}
         3 (141): {"aggregate_height":"82.99063455779105","holes":"14.234625385142863","bumpiness":"1.0069441283121705","nbroken":"-50.941374213434756","score":"141"}
         4 (139): {"aggregate_height":"75.95235100015998","holes":"33.580080210231245","bumpiness":"18.604058655910194","nbroken":"-54.37472792342305","score":"139"}
         5 (138): {"aggregate_height":"33.42759523075074","holes":"20.90301150456071","bumpiness":"13.047884264960885","nbroken":"-27.586306598968804","score":"138"}
         6 (122): {"aggregate_height":"58.32972270436585","holes":"59.658864117227495","bumpiness":"14.453838742338121","nbroken":"-78.74302546493709","score":"122"}
         7 (121): {"aggregate_height":"36.02374438196421","holes":"97.54086041357368","bumpiness":"11.216660961508751","nbroken":"-47.93020509183407","score":"121"}
         8 (114): {"aggregate_height":"28.16827711649239","holes":"69.93170795030892","bumpiness":"14.225711207836866","nbroken":"-2.657439084723592","score":"114"}
         9 (113): {"aggregate_height":"23.935084557160735","holes":"55.84412105381489","bumpiness":"26.00004270207137","nbroken":"0.4590266942977905","score":"113"}
         */
        return Math.floor(aggregate_height * 60.55679735727608
            + holes * 51.540208398364484
            + bumpiness * 25.861013121902943
            + nbroken * -4.280327903106809) * 300;
    };

    return {
        getScore: getScore
    };

}();