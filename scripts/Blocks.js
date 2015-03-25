var Blocks = new function () {

    var newBlock = function (newR, newC, newColor) {

        return {
            row: newR,
            col: newC,
            color: newColor
        };



    }

    return
    {
        newBlock: newBlock
    }

}();