//this object is similar to Dean's keyboard handling
var KeyBoard = (function () {
    var keys = {};
    var handlers = [];

    var listenForKeys = function()
    {
        document.onkeydown = function (event) {
            keys[event.keyCode] = true; //the value here does not matter, it just matters the key exists
        }

        document.onkeyup = function (event) {
            delete keys[event.keyCode];
        }
    }
    listenForKeys();
    

    var registerEventWithHandler = function (keyCode, handler) {
        handlers.push({ keyCode: keyCode, handler: handler });
    }

    var unregisterEventHandlerGivenKeyCode = function(keyCode)
    {
        for (var i = 0; i < handlers.length; ++i) {
            if (handlers[i].keyCode === keyCode )
            {
                handlers.splice(i, 1);
            }
        }
    }

    var update = function (elapsedTime) {
        for (var i = 0; i < handlers.length; ++i) {
            if (keys.hasOwnProperty(handlers[i].keyCode)) {
                handlers[i].handler(elapsedTime);
            }
        }
    }

    var checkIfKeyCodeIsFree = function(keyCode)
    {
        for (var i = 0; i < handlers.length; ++i) {
            if(handlers[i].keyCode === keyCode)
            {
                return false;
            }
        }

        return true;
    }

    var getKeyCodeForFunction = function(myFunction)
    {
        for (var i = 0; i < handlers.length; ++i) {
            if(handlers[i].handler == myFunction)
            {
                return handlers[i].keyCode;
            }
        }

        return "Please press a key";
    }

    var changeKeyCodeForFunction = function(myFunction)
    {
        //console.log("starting changeKeyCode");
        unregisterEventHandlerGivenKeyCode(getKeyCodeForFunction(myFunction));
        ControlsScreen.show();
        document.onkeyup = function (event) {};
        document.onkeydown = function (event)
        {
            //console.log("temp keydown event");
            if (checkIfKeyCodeIsFree(event.keyCode))
            {
                registerEventWithHandler(event.keyCode, myFunction);
                ControlsScreen.show();
                listenForKeys();
            }
            else
            {
                alert(event.keyCode + " is currently in use, please select another one, NOOBCAKES!");
            }
                
        }

        
    }

    var resetControls = function()
    {
        unregisterEventHandlerGivenKeyCode(getKeyCodeForFunction(TetrisGame.Core.currentPieceHardDrop));
        unregisterEventHandlerGivenKeyCode(getKeyCodeForFunction(TetrisGame.Core.currentPieceSoftDrop));
        unregisterEventHandlerGivenKeyCode(getKeyCodeForFunction(TetrisGame.Core.currentPieceMoveRight));
        unregisterEventHandlerGivenKeyCode(getKeyCodeForFunction(TetrisGame.Core.currentPieceMoveLeft));
        KeyBoard.registerEventWithHandler(KeyCodes.ArrowUp, TetrisGame.Core.currentPieceHardDrop);
        KeyBoard.registerEventWithHandler(KeyCodes.ArrowDown, TetrisGame.Core.currentPieceSoftDrop);
        KeyBoard.registerEventWithHandler(KeyCodes.ArrowRight, TetrisGame.Core.currentPieceMoveRight);
        KeyBoard.registerEventWithHandler(KeyCodes.ArrowLeft, TetrisGame.Core.currentPieceMoveLeft);
        ControlsScreen.show();
        listenForKeys();
    }

    return {
        registerEventWithHandler: registerEventWithHandler,
        update: update,
        getKeyCodeForFunction: getKeyCodeForFunction,
        changeKeyCodeForFunction: changeKeyCodeForFunction,
        resetControls: resetControls
    }



})();

var KeyCodes = {
    ArrowUp: 38,
    ArrowRight: 39,
    ArrowDown: 40,
    ArrowLeft: 37,
    W: 87,
    D: 68,
    S: 83,
    A: 65,
    I: 73,
    L: 76,
    K: 75,
    J: 74,
    H: 72,
    B: 66,
    P: 80,
    Y: 89,
    N: 78,
    ESC: 27
};

KeyBoard.registerEventWithHandler(KeyCodes.ArrowUp, TetrisGame.Core.currentPieceHardDrop);
KeyBoard.registerEventWithHandler(KeyCodes.ArrowDown, TetrisGame.Core.currentPieceSoftDrop);
KeyBoard.registerEventWithHandler(KeyCodes.ArrowRight, TetrisGame.Core.currentPieceMoveRight);
KeyBoard.registerEventWithHandler(KeyCodes.ArrowLeft, TetrisGame.Core.currentPieceMoveLeft);
KeyBoard.registerEventWithHandler(KeyCodes.ESC, function () {
    ScreenManager.changeToScreen(ScreenNames.GameMenu);
});
