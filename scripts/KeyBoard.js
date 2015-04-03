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
        unregisterEventHandlerGivenKeyCode(getKeyCodeForFunction(TetrisGame.Core.rotatePieceRight));
        unregisterEventHandlerGivenKeyCode(getKeyCodeForFunction(TetrisGame.Core.rotatePieceLeft));
        KeyBoard.registerEventWithHandler(KeyCodes.ARROWUP, TetrisGame.Core.currentPieceHardDrop);
        KeyBoard.registerEventWithHandler(KeyCodes.ARROWDOWN, TetrisGame.Core.currentPieceSoftDrop);
        KeyBoard.registerEventWithHandler(KeyCodes.ARROWRIGHT, TetrisGame.Core.currentPieceMoveRight);
        KeyBoard.registerEventWithHandler(KeyCodes.ARROWLEFT, TetrisGame.Core.currentPieceMoveLeft);
        KeyBoard.registerEventWithHandler(KeyCodes.Q, TetrisGame.Core.rotatePieceLeft);
        KeyBoard.registerEventWithHandler(KeyCodes.W, TetrisGame.Core.rotatePieceRight);
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
KeyBoard.registerEventWithHandler(KeyCodes.ARROWUP, TetrisGame.Core.currentPieceHardDrop);
KeyBoard.registerEventWithHandler(KeyCodes.ARROWDOWN, TetrisGame.Core.currentPieceSoftDrop);
KeyBoard.registerEventWithHandler(KeyCodes.ARROWRIGHT, TetrisGame.Core.currentPieceMoveRight);
KeyBoard.registerEventWithHandler(KeyCodes.ARROWLEFT, TetrisGame.Core.currentPieceMoveLeft);
KeyBoard.registerEventWithHandler(KeyCodes.Q, TetrisGame.Core.rotatePieceLeft);
KeyBoard.registerEventWithHandler(KeyCodes.W, TetrisGame.Core.rotatePieceRight);
KeyBoard.registerEventWithHandler(KeyCodes.ESCAPE, function () {
    ScreenManager.changeToScreen(ScreenNames.GameMenu);
});
