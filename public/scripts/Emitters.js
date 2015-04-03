var Emitters = (function () {

    var listOfCurrentEmitters = [];

    //special param for this assignment is used to distinguish whether an emitter is for a clock 
    //(to determine which canvas it should be drawn on)
    var newEmitter = function (emitterSpecs, specialParam) {
        var listOfParticles = [];
        var particlesPerSecond = emitterSpecs.getParticlesPerSecond();
        var emitterLifeTimeLeft = emitterSpecs.getEmitterLifeTime();

        var updateEmitter = function (elapsedTime) {
            emitterLifeTimeLeft -= elapsedTime;

            var numberOfNewParticles = particlesPerSecond / 1000 * elapsedTime;

            for (var i = 0; i < listOfParticles.length; ++i) {
                listOfParticles[i].updateParticle(elapsedTime);
                if (listOfParticles[i].getLifeTimeLeft() < 0)
                    listOfParticles[i].splice(i, 1);
            }

            for (var i = 0; i < numberOfNewParticles; ++i) {

                var newParticleXVector = myMath.randomNumberBetweenTwoValues(-1, 1);

                var basePhysicsSpecs = {
                    x: emitterSpecs.getX(),
                    y: emitterSpecs.getY(),
                    radius: myMath.randomNumberBetweenTwoValues(emitterSpecs.getMinRadius(), emitterSpecs.getMaxRadius()),
                    xVector: myMath.randomNumberBetweenTwoValues(-1, 1),
                    yVector: myMath.randomizeSign(1 - Math.abs(newParticleXVector) * Math.abs(newParticleXVector)),
                    speed: myMath.randomNumberBetweenTwoValues(emitterSpecs.getMinSpeed(), emitterSpecs.getMaxSpeed()),
                    acceleration: myMath.randomNumberBetweenTwoValues(emitterSpecs.getMinMaxSpeed(), emitterSpecs.getMaxMaxSpeed()),
                    friction: myMath.randomNumberBetweenTwoValues(emitterSpecs.getMinFriction(), emitterSpecs.getMaxFriction()),
                    maxSpeed: myMath.randomNumberBetweenTwoValues(emitterSpecs.getMinMaxSpeed(), emitterSpecs.getMaxMaxSpeed()),
                    boundary: emitterSpecs.getBoundary(),
                    onCollision: emitterSpecs.getOnCollision(),
                    currentRotation: 0,
                    rotationAmountInRads: 0
                };

                var particleSpecificSpecs = {
                    image: emitterSpecs.getImage(),
                    lifeTimeLeft: myMath.randomNumberBetweenTwoValues(emitterSpecs.getMinLifeTime(), emitterSpecs.getMaxLifeTime())
                };
        

                listOfParticles.push(Particles.newParticle(basePhysicsSpecs, particleSpecificSpecs));

                if (specialParam)
                    listOfParticles[listOfParticles.length - 1].specialParam = specialParam;
            }

        }

        var getListOfParticles = function () {
            return listOfParticles;
        }

        var getEmitterLifeTimeLeft = function () { return emitterLifeTimeLeft; }

        return {
            updateEmitter: updateEmitter,
            getEmitterLifeTimeLeft: getEmitterLifeTimeLeft,
            getListOfParticles: getListOfParticles
        };
    }

    var addNewEmiter = function (emitterSpecs, specialParam) {
        listOfCurrentEmitters.push(newEmitter(emitterSpecs, specialParam));
    }



    var updateEmitters = function (elapsedTime) {
        for (var i = 0; i < listOfCurrentEmitters.length; ++i) {
            if (listOfCurrentEmitters[i].getEmitterLifeTimeLeft() >= 0)
                listOfCurrentEmitters[i].updateEmitter(elapsedTime);
            else
                listOfCurrentEmitters.splice(i, 1);
        }
    }

    var deleteEmitters = function () {
        listOfCurrentEmitters.length = 0;
    }

    var getEmitters = function () { return listOfCurrentEmitters; }

    return {
        addNewEmiter: addNewEmiter,
        updateEmitters: updateEmitters,
        deleteEmitters: deleteEmitters,
        getEmitters: getEmitters
    }


})();