//object for useful math conversions
var myMath = new Object();

myMath.convertToRads = function (degrees) {
    return degrees * Math.PI / 180;
};

myMath.randomNumberBetweenTwoValues = function (value1, value2) {
    if (value1 > value2) {
        var temp = value2;
        value2 = value1;
        value1 = temp;
    }
    var range = value2 - value1;

    return Math.random() * range - Math.abs(value1);


};

myMath.randomizeSign = function (number) {
    if (Math.random() < 0.5)
        return number;
    else
        return number * -1;
};

myMath.getRandomFloats = (function(n) {
    var tr = [];
    for (var i = 0; i < n; ++i) {
        tr.push(Math.random() * 77);
    }
    return function () {
        return tr;
    };
})(5);