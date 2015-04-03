//basic particle class that emitters will create
var Particles = (function () {

    //paramX, paramY, paramRadius, paramXVector, paramYVector, paramSpeed, paramPhysicsAcceleration, paramFriction, paramMaxSpeed, GameBoundary, paramOnCollision, particleImg, lifeTimeLeft, context
    var newParticle = function (basePhysicsSpecs, particalSpecificSpecs)
    {
        var paramRotationInRads = 0;
        var paramAmountOfRotation = 0;

        //var basePhysicsSpecs = {
        //    x: spec.x,
        //    y: spec.y,
        //    radius: spec.radius,
        //    xVector: spec.xVector,
        //    yVector: spec.yVector,
        //    speed: spec.speed,
        //    acceleration: spec.acceleration,
        //    friction: spec.friction,
        //    maxSpeed: spec.maxSpeed, 
        //    boundary: spec.boundary, 
        //    onCollision: spec.onCollision, 
        //    currentRotation: spec.currentRotation, 
        //    rotationAmountInRads: spec.rotationAmountInRads
        //};

        var that = createBasePhysicsObj(basePhysicsSpecs);

        that.image = particalSpecificSpecs.image;
        that.lifeTimeLeft = particalSpecificSpecs.lifeTimeLeft;
        that.getLifeTimeLeft = function () { return that.lifeTimeLeft; };

        that.getWidth = function () { return that.getRadius(); };
        that.getHeight = function () { return that.getRadius(); };

        var updateParticle = function (elapsedTime) {
            that.lifeTimeLeft -= elapsedTime;
            Physics.move(that, [], elapsedTime, false);
        };

        that.updateParticle = updateParticle;

        return that;
    }

    return {
        newParticle: newParticle
    };


})();