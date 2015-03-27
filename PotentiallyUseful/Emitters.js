var Emitters = (function () {

    var listOfCurrentEmitters = [];

    //special param for this assignment is used to distinguish whether an emitter is for a clock 
    //(to determine which canvas it should be drawn on)
    var newEmitter = function (emitterSpecs, specialParam) {
        var listOfParticles = [];
        var particlesPerSecond = 500;
        var emitterLifeTimeLeft = emitterSpecs.getEmitterLifeTime();
        var newParticleX = emitterSpecs.getX();
        var newParticleY = emitterSpecs.getY();



        var updateEmitter = function (elapsedTime) {
            emitterLifeTimeLeft -= elapsedTime;

            var numberOfNewParticles = particlesPerSecond / 1000 * elapsedTime;

            for (var i = 0; i < listOfParticles.length; ++i) {
                listOfParticles[i].updateParticle(elapsedTime);
                if (listOfParticles[i].getLifeTimeLeft() < 0)
                    listOfParticles[i].splice(i, 1);
            }

            for (var i = 0; i < numberOfNewParticles; ++i) {
                var newParticleRadius = myMath.randomNumberBetweenTwoValues(emitterSpecs.getMinRadius(), emitterSpecs.getMaxRadius());
                var newParticleXVector = myMath.randomNumberBetweenTwoValues(-1, 1);
                var newParticleYVector = myMath.randomizeSign(1 - Math.abs(newParticleXVector) * Math.abs(newParticleXVector));
                var newParticleSpeed = myMath.randomNumberBetweenTwoValues(emitterSpecs.getMinSpeed(), emitterSpecs.getMaxSpeed());
                var newParticleAcceleration = myMath.randomNumberBetweenTwoValues(emitterSpecs.getMinAcceleration(), emitterSpecs.getMaxAcceleration());
                var newParticleFriction = myMath.randomNumberBetweenTwoValues(emitterSpecs.getMinFriction(), emitterSpecs.getMaxFriction());
                var newParticleMaxSpeed = myMath.randomNumberBetweenTwoValues(emitterSpecs.getMinMaxSpeed(), emitterSpecs.getMaxMaxSpeed());
                var newParticleBoundary = emitterSpecs.getBoundary();
                var newParticleOnCollision = emitterSpecs.getOnCollision();
                var newParticleImg = emitterSpecs.getImage();
                var newParticleLifeTime = myMath.randomNumberBetweenTwoValues(emitterSpecs.getMinLifeTime(), emitterSpecs.getMaxLifeTime());

                listOfParticles.push(Particles.newParticle(newParticleX, newParticleY, newParticleRadius,
                    newParticleXVector, newParticleYVector, newParticleSpeed, newParticleAcceleration,
                    newParticleFriction, newParticleMaxSpeed, newParticleBoundary, newParticleOnCollision, newParticleImg));

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