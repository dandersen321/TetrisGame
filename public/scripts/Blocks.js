var Blocks = new function () {

    var newBlock = function (newR, newC, newTexture, amIFilled, attached) {

        if (attached === undefined)
            attached = true;

        return {
            row: newR,
            col: newC,
            texture: newTexture,
            filled: amIFilled,
            attached: attached
        };
        
    }

    return {
        newBlock: newBlock
    };

}();