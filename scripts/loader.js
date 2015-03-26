//based on Dean Mathias' loader
window.addEventListener('load', function () {
    console.log('Loading resources...');
    Modernizr.load([
		{
		    load: [
				//'preload!scripts/myMath.js',
				//'preload!scripts/BasePhysicsObj.js',
				//'preload!scripts/Physics.js',
                //'preload!scripts/Emitters.js',
                //'preload!scripts/BaseEmitterSpecsObj.js',
                //'preload!scripts/Particles.js',
                'preload!scripts/Textures.js',
				'preload!scripts/Screens.js', 
                //'preload!scripts/AAScreens.js',
				'preload!scripts/ScreenManager.js', //requires Screens.js
                'preload!scripts/Blocks.js',
                'preload!scripts/TetrisPieces.js',
                'preload!scripts/TetrisGame.js', //requires Textures.js and Blocks.js and TetrisPieces.js
                //'preload!scripts/CarGameClocks.js',
                //'preload!scripts/CarGamePainter.js',
                //'preload!scripts/CarGameWaiting.js',
                //'preload!scripts/CarGameScores.js',
                //'preload!scripts/ObjectPainter.js',
                //'preload!scripts/AAKeyBoard.js',
                'preload!scripts/KeyBoard.js', //requires TetrisGame.js
                'preload!scripts/GameLoop.js' //requires TetrisGame.js
                
		    ],
		    complete: function () {
		        console.log('All files have finished loading; you\'re welcome bro!');
		        ScreenManager.changeToScreen(ScreenNames.GameMenu);

		        TetrisGame.GameLoop.intialize();
		    }
		}
    ]);
}, false);
