var Blocks = new function () {

    var newBlock = function (newR, newC, newTexture, amIFilled) {

        return {
            row: newR,
            col: newC,
            texture: newTexture,
            filled: amIFilled
        };



    }

    return {
        newBlock: newBlock
    };

}();