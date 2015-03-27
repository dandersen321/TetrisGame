var Textures = function () {

    var newTexture = function (newImage)
    {
        return{
            image: newImage
        };
    }

    var Empty = newTexture(document.getElementById("emptyTexture"));
    var ReverseS = newTexture(document.getElementById("reverseS"));
    var S = newTexture(document.getElementById("s"));
    var T = newTexture(document.getElementById("t"));
    var Square = newTexture(document.getElementById("square"));
    var Line = newTexture(document.getElementById("line"));
    var L = newTexture(document.getElementById("l"));
    var ReverseL = newTexture(document.getElementById("reverseL"));



    return {
        Empty: Empty,
        ReverseS: ReverseS,
        S: S,
        T: T,
        Square: Square,
        Line: Line,
        L: L,
        ReverseL: ReverseL
    };

}();