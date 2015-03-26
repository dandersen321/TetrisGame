var Blocks = new function () {

    var newBlock = function (newR, newC, newTexture) {

        return {
            row: newR,
            col: newC,
            newTexture: newTexture
        };



    }

    return
    {
        newBlock: newBlock
    }

}();