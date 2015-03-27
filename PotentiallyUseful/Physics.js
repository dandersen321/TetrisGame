//generic physics module (to be reused in other games)
var Physics = function () {

    var distanceBetweenTwoObjects = function(obj1, obj2)
    {
        return Math.sqrt(Math.pow(obj2.getX() - obj1.getX(), 2) + Math.pow(obj2.getY() - obj1.getY(), 2));
    }

    var collisionHasOccurred = function(obj1, obj2)
    {
        var distance = distanceBetweenTwoObjects(obj1, obj2);

        if (distance < obj1.getRadius() + obj2.getRadius()) //collision has occured
            return true;
    }

    var transferForce = function(obj1, obj2)
    {
        var obj1XVectorOld = obj1.getXVector();
        var obj1YVectorOld = obj1.getYVector();


        obj1.setXVector(obj2.getXVector());
        obj1.setYVector(obj2.getYVector());

        obj2.setXVector(obj1XVectorOld);
        obj2.setYVector(obj1YVectorOld);

    }

    var collisionHandling = function(obj1, obj2)
    {
        if (collisionHasOccurred(obj1, obj2))
        {
            //always do player collision last
            if (obj1 === CarGame.player)
            {
                obj2.onCollision();
                obj1.onCollision();
            }
            else
            {
                obj1.onCollision();
                obj2.onCollision();
            }
            
            transferForce(obj1, obj2);
            var count = 0;
            while(collisionHasOccurred(obj1, obj2))
            {
                move(obj1, [], 10, false); //keep moving objects until they have no longer collided
                move(obj2, [], 10, false);
                ++count;
            }
        }
    }

    var accelerate = function(obj, elapsedTime) //elaspedTime is in miliseconds
    {
        obj.setSpeed(obj.getSpeed() + obj.getAcceleration() * (elapsedTime / 1000));
        applyFriction(obj, elapsedTime);
        checkSpeed(obj);
    }

    var applyFriction = function(obj, elapsedTime)
    {
        obj.setSpeed(obj.getSpeed() - obj.getFriction() * (elapsedTime / 1000));
    }

    var checkSpeed = function(obj)
    {
        if(obj.getMaxSpeed != undefined && obj.getSpeed() > obj.getMaxSpeed())
        {
            obj.setSpeed(obj.getMaxSpeed());
        }
        else if(obj.getSpeed() < 0)
        {
            obj.setSpeed(0);
        }
    }

    var updateObjPosition = function(obj, elapsedTime)
    {
        obj.setX(obj.getX() + obj.getXVector() * (obj.getSpeed()*elapsedTime/1000));
        obj.setY(obj.getY() + obj.getYVector() * (obj.getSpeed() * elapsedTime / 1000) * -1);//since y decreases as you go
        obj.setCurrentRotation(obj.getCurrentRotation() + obj.getRotationAmountInRads() * elapsedTime / 1000);
        checkBoundary(obj);
    }

    var checkBoundary = function(obj)
    {
        if (obj.getBoundary !== undefined && obj.getBoundary !== null)
        {
            obj.getBoundary().handleCollision(obj);
        }
    }

    var move = function(obj, listOfObjs, elapsedTime, checkCollision)
    {
        
        accelerate(obj, elapsedTime);

        updateObjPosition(obj, elapsedTime);



        if(checkCollision === true)
        {
            for (var i = 0; i < listOfObjs.length; ++i)
                if(obj != listOfObjs[i])
                    collisionHandling(obj, listOfObjs[i]);
        }
    }

    var moveObjects = function (listOfObjs, elapsedTime)
    {
        for(var i = 0; i < listOfObjs.length; ++i)
        {
            move(listOfObjs[i], listOfObjs, elapsedTime, true);
        }
    }




    return {
        moveObjects: moveObjects,
        updateObjPosition: updateObjPosition,
        move: move,
        collisionHasOccurred: collisionHasOccurred,
        transferForce: transferForce
    };

}();