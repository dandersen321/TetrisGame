var ObjectPainter = function () {

    var getQuadrant = function (xVector, yVector) {
        if (xVector > 0 && yVector >= 0)
            return 1;
        if (xVector <= 0 && yVector > 0)
            return 2;
        if (xVector < 0 && yVector <= 0)
            return 3;
        else
            return 4;
    }

    function drawObj(obj, context) {

        context.save();

        var objX = obj.getX();
        var objY = obj.getY();

        var rotationInRads = Math.asin(Math.abs(obj.getYVector()));
        var quadNumber = getQuadrant(obj.getXVector(), obj.getYVector());
        if (quadNumber === 2)
            rotationInRads = Math.PI - rotationInRads;
        if (quadNumber === 3)
            rotationInRads = rotationInRads + Math.PI;
        if (quadNumber === 4)
            rotationInRads = Math.PI * 2 - rotationInRads;

        rotationInRads += obj.getCurrentRotation();

        //make sure rotations is within 0 - 2pi ratio
        while (rotationInRads < 0)
            rotationInRads += (2 * Math.pi);

        while (rotationInRads > 2 * Math.pi)
            rotationInRads -= (2 * Math.pi);


        context.translate(objX, objY);
        context.rotate(-rotationInRads);
        context.translate(-objX, -objY);

        context.drawImage(obj.image, obj.getX() - obj.getWidth() / 2, obj.getY() - obj.getHeight() / 2, obj.getWidth(), obj.getHeight());

        context.restore();
    }

    return {
        drawObj: drawObj
    };


}();