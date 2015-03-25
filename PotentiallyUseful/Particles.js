//basic particle class that emitters will create
var Particles = (function () {


    var newParticle = function (paramX, paramY, paramRadius, paramXVector, paramYVector, paramSpeed, paramPhysicsAcceleration, paramFriction, paramMaxSpeed, GameBoundary, paramOnCollision, particleImg, lifeTimeLeft, context)
    {
        var paramRotationInRads = 0;
        var paramAmountOfRotation = 0;
        var that = createBasePhysicsObj(paramX, paramY, paramRadius, paramXVector, paramYVector, paramSpeed, paramPhysicsAcceleration,
            paramFriction, paramMaxSpeed, GameBoundary, paramOnCollision, paramRotationInRads, paramAmountOfRotation);

        that.image = particleImg;
        that.lifeTimeLeft = lifeTimeLeft;
        that.getLifeTimeLeft = function () { return that.lifeTimeLeft; };

        that.getWidth = function () { return paramRadius; }
        that.getHeight = function () { return paramRadius;}

        var updateParticle = function(elapsedTime)
        {
            that.lifeTimeLeft -= elapsedTime;
            Physics.move(that, [], elapsedTime, false);
        }

        that.updateParticle = updateParticle;

        return that;
    }

    return {
        newParticle: newParticle
    }


})();