var Textures = function () {

    var newTexture = function (newImage)
    {
        return{
            image: newImage
        };
    }

    var Empty = newTexture(document.getElementById("emptyTexture"));
    var Blue = newTexture(document.getElementById("blueTexture"));



    return {
        Empty: Empty,
        Blue: Blue
    };

}();