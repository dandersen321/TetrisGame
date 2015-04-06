var AI = function () {

    var getScore = function(board) {

        //100 is not a cap, just an arbitruary number i came up with for now
        return myMath.randomNumberBetweenTwoValues(0, 100);
    }

    return {
        getScore: getScore
    };

}();