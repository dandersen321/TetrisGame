﻿//this object is similar to Dean's keyboard handling
var KeyBoard = (function () {
    var keys = {};
    var handlers = [];

    var moveMadeThisPress = false;

    var listenForKeys = function()
    {
        document.onkeydown = function (event) {
            keys[event.keyCode] = true; //the value here does not matter, it just matters the key exists

            if (TetrisGame.GameLoop.isAttractModeOn() === true) {
                TetrisGame.GameLoop.turnOffAttractMode();
            }
        }

        document.onkeyup = function (event) {
            moveMadeThisPress = false;
            delete keys[event.keyCode];

            if (TetrisGame.GameLoop.isAttractModeOn() === true) {
                TetrisGame.GameLoop.turnOffAttractMode();
            }
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
                alert(getKeyGivenKeyCode(event.keyCode) + " is currently in use, please select another one, NOOBCAKES!");
            }
                
        }

        
    }

    var intializeControls = function () {
        KeyBoard.registerEventWithHandler(KeyCodes.ESCAPE, function () {
            ScreenManager.changeToScreen(ScreenNames.GameMenu);
        });

        keyBoardFunctions[KeyCodes.ARROWUP] = callHardDrop;
        keyBoardFunctions[KeyCodes.ARROWDOWN] = callSoftDrop;
        keyBoardFunctions[KeyCodes.ARROWRIGHT] = callMoveRight;
        keyBoardFunctions[KeyCodes.ARROWLEFT] = callMoveLeft;
        keyBoardFunctions[KeyCodes.Q] = callRotateLeft;
        keyBoardFunctions[KeyCodes.W] = callRotateRight;

        for (var key in keyBoardFunctions) {
            KeyBoard.registerEventWithHandler(parseInt(key), keyBoardFunctions[key]);
        }
    }

    var resetControls = function()
    {
      
        for (var key in keyBoardFunctions)
        {
            unregisterEventHandlerGivenKeyCode(getKeyCodeForFunction(keyBoardFunctions[key]));
        }

        intializeControls();

        ControlsScreen.show();
        listenForKeys();
    }

    var keyBoardFunctions = {};

    var callHardDrop = function () {
        if (moveMadeThisPress == false)
        {
            moveMadeThisPress = true;
            TetrisGame.Core.currentPieceHardDrop();
        }
            
    };

    var callSoftDrop = function () {
        if (moveMadeThisPress == false) {
            moveMadeThisPress = true;
            TetrisGame.Core.currentPieceSoftDrop();
        }
    }

    var callMoveRight = function () {
        if (moveMadeThisPress == false) {
            moveMadeThisPress = true;
            TetrisGame.Core.currentPieceMoveRight();
        }
        
    }

    var callMoveLeft = function () {
        if (moveMadeThisPress == false) {
            moveMadeThisPress = true;
            TetrisGame.Core.currentPieceMoveLeft();
        }
        
    }

    var callRotateLeft = function () {
        if (moveMadeThisPress == false) {
            moveMadeThisPress = true;
            TetrisGame.Core.rotatePieceLeft();
        }
        
    }

    var callRotateRight = function () {
        if (moveMadeThisPress == false) {
            moveMadeThisPress = true;
            TetrisGame.Core.rotatePieceRight();
        }
        
    }

    var getKeyGivenKeyCode = function (keyCode) {
        for (var key in KeyCodes) {
            if (KeyCodes[key] === keyCode)
                return key;
        }
        return "Press Any Key";
    }

    var getKeyHardDrop = function () {
        return getKeyGivenKeyCode(getKeyCodeForFunction(callHardDrop));
    }

    var getKeySoftDrop = function () {
        return getKeyGivenKeyCode(getKeyCodeForFunction(callSoftDrop));
    }

    var getKeyMoveRight = function () {
        return getKeyGivenKeyCode(getKeyCodeForFunction(callMoveRight));
    }

    var getKeyMoveLeft = function () {
        return getKeyGivenKeyCode(getKeyCodeForFunction(callMoveLeft));
    }

    var getKeyRotateRight = function () {
        return getKeyGivenKeyCode(getKeyCodeForFunction(callRotateRight));
    }

    var getKeyRotateLeft = function () {
        return getKeyGivenKeyCode(getKeyCodeForFunction(callRotateLeft));
    }

    var changeKeyHardDrop = function () {
        changeKeyCodeForFunction(callHardDrop);
    }

    var changeKeySoftDrop = function () {
        changeKeyCodeForFunction(callSoftDrop);
    }

    var changeKeyMoveRight = function () {
        changeKeyCodeForFunction(callMoveRight);
    }

    var changeKeyMoveLeft = function () {
        changeKeyCodeForFunction(callMoveLeft);
    }

    var changeKeyRotateRight = function () {
        changeKeyCodeForFunction(callRotateRight);
    }

    var changeKeyRotateLeft = function () {
        changeKeyCodeForFunction(callRotateLeft);
    }




    

    return {
        registerEventWithHandler: registerEventWithHandler,
        update: update,
        getKeyCodeForFunction: getKeyCodeForFunction,
        changeKeyCodeForFunction: changeKeyCodeForFunction,
        resetControls: resetControls,
        intializeControls: intializeControls,
        getKeyHardDrop: getKeyHardDrop,
        getKeySoftDrop: getKeySoftDrop,
        getKeyMoveRight: getKeyMoveRight,
        getKeyMoveLeft: getKeyMoveLeft,
        getKeyRotateRight: getKeyRotateRight,
        getKeyRotateLeft: getKeyRotateLeft,
        changeKeyHardDrop: changeKeyHardDrop,
        changeKeySoftDrop: changeKeySoftDrop,
        changeKeyMoveRight: changeKeyMoveRight,
        changeKeyMoveLeft: changeKeyMoveLeft,
        changeKeyRotateRight: changeKeyRotateRight,
        changeKeyRotateLeft: changeKeyRotateLeft
    };



})();



//------------------------------------------------------------------
//
// Source: http://stackoverflow.com/questions/1465374/javascript-event-keycode-constants
//
//------------------------------------------------------------------
var KeyCodes = {
    CANCEL: 3,
    HELP: 6,
    BACK_SPACE: 8,
    TAB: 9,
    CLEAR: 12,
    RETURN: 13,
    ENTER: 14,
    SHIFT: 16,
    CONTROL: 17,
    ALT: 18,
    PAUSE: 19,
    CAPS_LOCK: 20,
    ESCAPE: 27,
    SPACE: 32,
    PAGE_UP: 33,
    PAGE_DOWN: 34,
    END: 35,
    HOME: 36,
    ARROWLEFT: 37,
    ARROWUP: 38,
    ARROWRIGHT: 39,
    ARROWDOWN: 40,
    PRINTSCREEN: 44,
    INSERT: 45,
    DELETE: 46,
    0: 48,
    1: 49,
    2: 50,
    3: 51,
    4: 52,
    5: 53,
    6: 54,
    7: 55,
    8: 56,
    9: 57,
    SEMICOLON: 59,
    EQUALS: 61,
    A: 65,
    B: 66,
    C: 67,
    D: 68,
    E: 69,
    F: 70,
    G: 71,
    H: 72,
    I: 73,
    J: 74,
    K: 75,
    L: 76,
    M: 77,
    N: 78,
    O: 79,
    P: 80,
    Q: 81,
    R: 82,
    S: 83,
    T: 84,
    U: 85,
    V: 86,
    W: 87,
    X: 88,
    Y: 89,
    Z: 90,
    CONTEXT_MENU: 93,
    NUMPAD0: 96,
    NUMPAD1: 97,
    NUMPAD2: 98,
    NUMPAD3: 99,
    NUMPAD4: 100,
    NUMPAD5: 101,
    NUMPAD6: 102,
    NUMPAD7: 103,
    NUMPAD8: 104,
    NUMPAD9: 105,
    MULTIPLY: 106,
    ADD: 107,
    SEPARATOR: 108,
    SUBTRACT: 109,
    DECIMAL: 110,
    DIVIDE: 111,
    F1: 112,
    F2: 113,
    F3: 114,
    F4: 115,
    F5: 116,
    F6: 117,
    F7: 118,
    F8: 119,
    F9: 120,
    F10: 121,
    F11: 122,
    F12: 123,
    F13: 124,
    F14: 125,
    F15: 126,
    F16: 127,
    F17: 128,
    F18: 129,
    F19: 130,
    F20: 131,
    F21: 132,
    F22: 133,
    F23: 134,
    F24: 135,
    NUM_LOCK: 144,
    SCROLL_LOCK: 145,
    COMMA: 188,
    PERIOD: 190,
    SLASH: 191,
    BACK_QUOTE: 192,
    OPEN_BRACKET: 219,
    BACK_SLASH: 220,
    CLOSE_BRACKET: 221,
    QUOTE: 222,
    META: 224
};

//var KeyCodes = {
//    ArrowUp: 38,
//    ArrowRight: 39,
//    ArrowDown: 40,
//    ArrowLeft: 37,
//    Enter: 14,
//    Spacebar: 32,
//    W: 87,
//    D: 68,
//    S: 83,
//    A: 65,
//    I: 73,
//    L: 76,
//    K: 75,
//    J: 74,
//    H: 72,
//    B: 66,
//    P: 80,
//    Y: 89,
//    N: 78,
//    ESC: 27
//};
//KeyBoard.registerEventWithHandler(KeyCodes.ARROWUP, TetrisGame.Core.currentPieceHardDrop);
//KeyBoard.registerEventWithHandler(KeyCodes.ARROWDOWN, TetrisGame.Core.currentPieceSoftDrop);
//KeyBoard.registerEventWithHandler(KeyCodes.ARROWRIGHT, TetrisGame.Core.currentPieceMoveRight);
//KeyBoard.registerEventWithHandler(KeyCodes.ARROWLEFT, TetrisGame.Core.currentPieceMoveLeft);
//KeyBoard.registerEventWithHandler(KeyCodes.Q, TetrisGame.Core.rotatePieceLeft);
//KeyBoard.registerEventWithHandler(KeyCodes.W, TetrisGame.Core.rotatePieceRight);
//KeyBoard.registerEventWithHandler(KeyCodes.ESCAPE, function () {
//    ScreenManager.changeToScreen(ScreenNames.GameMenu);
//});

KeyBoard.intializeControls();

var oldX = 0;
var oldY = 0;
document.onmousemove = function (event) {
    console.log("mouse move");
    console.log(Math.abs(event.clientX - oldX));
    console.log(Math.abs(event.clientY - oldY));
    try {
        if (TetrisGame.GameLoop.isAttractModeOn() === true && (Math.abs(event.clientX - oldX) > 50 || Math.abs(event.clientY - oldY) > 50)) {
            TetrisGame.GameLoop.turnOffAttractMode();
            oldX = event.clientX;
            oldY = event.clientY;
        }
    }
    catch (e) {

    }
}