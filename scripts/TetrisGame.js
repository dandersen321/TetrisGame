var TetrisGame = function () {

    var moveLeft = function () {
        console.log("moving left");
    }

    var moveRight = function () {
        console.log("moving right");
    }

    var softDrop = function()
    {
        console.log("soft drop");
    }

    var hardDrop = function()
    {
        console.log("hard drop");
    }

    var rotateRight = function () {
        console.log("rotating right");
    }

    var rotateLeft = function () {
        console.log("rotating left");
    }

    return {
        moveLeft: moveLeft,
        moveRight: moveRight,
        softDrop: softDrop,
        hardDrop: hardDrop,
        rotateRight: rotateRight,
        rotateLeft: rotateLeft
    };




}();