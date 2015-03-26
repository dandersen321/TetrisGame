var Blocks = new function () {

    var newBlock = function (newR, newC, newTexture, amIFilled) {

        return {
            row: newR,
            col: newC,
            newTexture: newTexture,
            filled: amIFilled
        };



    }

    return {
        newBlock: newBlock
    };

}();