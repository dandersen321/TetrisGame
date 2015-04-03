//this creates the base class with all the functions and properties an emitter needs
var createEmitterSpecObj = function (spec) {

    var x = spec.x;
    var y = spec.y;
    var minRadius = spec.minRadius;
    var maxRadius = spec.maxRadius;
    var minSpeed = spec.minSpeed;
    var maxSpeed = spec.maxSpeed;
    var minAcceleration = spec.minAcceleration;
    var maxAcceleration = spec.maxAcceleration;
    var minMaxSpeed = spec.minMaxSpeed;
    var maxMaxSpeed = spec.maxMaxSpeed;
    var boundary = spec.boundary;
    var onCollision = spec.onCollision;
    var image = spec.image;
    var minLifeTime = spec.minLifeTime;
    var maxLifeTime = spec.maxLifeTime;
    var emitterLifeTime = spec.emitterLifeTime;
    var particlesPerSecond = spec.particlesPerSecond;

    var getX = function () { return x; }
    var getY = function () { return y; }
    var getMinRadius = function () { return minRadius; }
    var getMaxRadius = function () { return maxRadius; }
    var getMinSpeed = function () { return minSpeed; }
    var getMaxSpeed = function () { return maxSpeed; }
    var getMinAcceleration = function () { return minAcceleration; }
    var getMaxAcceleration = function () { return maxAcceleration; }
    var getMinMaxSpeed = function () { return minMaxSpeed; }
    var getMaxMaxSpeed = function () { return maxMaxSpeed; }
    var getBoundary = function () { return boundary; }
    var getOnCollision = function () { return onCollision; }
    var getImage = function () { return image; }
    var getMinLifeTime = function () { return getMinLifeTime; }
    var getMaxLifeTime = function () { return getMaxLifeTime; }
    var getEmitterLifeTime = function () { return emitterLifeTime; }
    var getMinFriction = function () { return 0; }
    var getMaxFriction = function () { return 0; }
    var getParticlesPerSecond = function () { return particlesPerSecond;}

    return {
        getX: getX,
        getY: getY,
        getMinRadius: getMinRadius,
        getMaxRadius: getMaxRadius,
        getMinSpeed: getMinSpeed,
        getMaxSpeed: getMaxSpeed,
        getMinAcceleration: getMinAcceleration,
        getMaxAcceleration: getMaxAcceleration,
        getMinMaxSpeed: getMinMaxSpeed,
        getMaxMaxSpeed: getMaxMaxSpeed,
        getBoundary: getBoundary,
        getOnCollision: getOnCollision,
        getImage: getImage,
        getMinLifeTime: getMinLifeTime,
        getMaxLifeTime: getMaxLifeTime,
        getEmitterLifeTime: getEmitterLifeTime,
        getMinFriction: getMinFriction,
        getMaxFriction: getMaxFriction,
        getParticlesPerSecond: getParticlesPerSecond
    };


}