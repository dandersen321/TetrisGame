//this creates a base class with properties that all physical objects need
//maxSpeed, boundary, onCollision is optional
var createBasePhysicsObj = function (x, y, radius, xVector, yVector, speed, acceleration,
    friction, maxSpeed, boundary, onCollision, currentRotation, rotationAmountInRads) {

    var that = (function (x, y, radius, xVector, yVector, speed, acceleration,
        friction, maxSpeed, boundary, onCollision, currentRotation, rotationAmountInRads) {
        var x = x;
        var y = y;
        var radius = radius;
        var xVector = xVector;
        var yVector = yVector;
        var speed = speed;
        var acceleration = acceleration;
        var friction = friction;
        if (maxSpeed !== undefined && maxSpeed !== null)
            var maxSpeed = maxSpeed;
        if (boundary !== undefined && boundary !== null) {
            if (boundary.handleCollision === undefined) {
                console.error("boundary has no handleCollision method")
                return;
            }

            var boundary = boundary;
        }
        if (onCollision !== undefined && onCollision !== null) {
            var onCollision = onCollision; //handler for game if object collides i.e. for car
        }

        var currentRotation = currentRotation;
        var rotationAmountInRads = rotationAmountInRads;

        var getX = function () { return x; }
        var setX = function (newX) { x = newX; }

        var getY = function () { return y; }
        var setY = function (newY) { y = newY; }

        var getRadius = function () { return radius; }
        var setRadius = function (newRadius) { radius = newRadius; }

        var getXVector = function () { return xVector; }
        var setXVector = function (newXVector) { xVector = newXVector; }

        var getYVector = function () { return yVector; }
        var setYVector = function (newYVector) {
            yVector = newYVector;
        }

        var getSpeed = function () { return speed; }
        var setSpeed = function (newSpeed) {
            speed = newSpeed;
        }

        var getAcceleration = function () { return acceleration; }
        var setAcceleration = function (newAcceleration) { acceleration = newAcceleration; }

        var getFriction = function () { return friction; }
        var setFriction = function (newFriction) { friction = newFriction; }

        if (maxSpeed !== undefined && maxSpeed !== null) {
            var getMaxSpeed = function () { return maxSpeed; }
            var setMaxSpeed = function (newMaxSpeed) { maxSpeed = newMaxSpeed; }
        }
        else {
            var getMaxSpeed = undefined;
            var setMaxSpeed = undefined;
        }

        if (boundary !== undefined && boundary !== null) {
            var getBoundary = function () { return boundary; }
            var setBoundary = function (newBoundary) { boundary = newBoundary; }
        }
        else {
            var getBoundary = undefined;
            var setBoundary = undefined;
        }

        var getCurrentRotation = function () { return currentRotation; }
        var setCurrentRotation = function (newRotation) {
            currentRotation = newRotation;
            while (currentRotation < 0)
                currentRotation += (2 * Math.pi);

            while (currentRotation > 2 * Math.pi)
                currentRotation -= (2 * Math.pi);

        }
        var getRotationAmountInRads = function () { return rotationAmountInRads; }
        var setRotationAmountInRads = function (newRotationAmountInRads) { rotationAmountInRads = newRotationAmountInRads; }


        return {
            getX: getX,
            setX: setX,

            getY: getY,
            setY: setY,

            getRadius: getRadius,
            setRadius: setRadius,

            getXVector: getXVector,
            setXVector: setXVector,

            getYVector: getYVector,
            setYVector: setYVector,

            getSpeed: getSpeed,
            setSpeed: setSpeed,

            getAcceleration: getAcceleration,
            setAcceleration: setAcceleration,

            getFriction: getFriction,
            setFriction: setFriction,

            getMaxSpeed: getMaxSpeed,
            setMaxSpeed: setMaxSpeed,

            getBoundary: getBoundary,
            setBoundary: setBoundary,

            onCollision: onCollision,

            getCurrentRotation: getCurrentRotation,
            setCurrentRotation: setCurrentRotation,

            getRotationAmountInRads: getRotationAmountInRads,
            setRotationAmountInRads: setRotationAmountInRads
        };
    })(x, y, radius, xVector, yVector, speed, acceleration, friction, maxSpeed, boundary, onCollision, currentRotation, rotationAmountInRads);

    return that;

}