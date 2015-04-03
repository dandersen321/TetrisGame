/**
 * Created by kamaron on 4/2/15.
 */

var tetris_app = angular.module('tetris-app', []);

tetris_app.controller('high-scores', function ($scope, $http) {
    $scope.highscores = [];
    $http.get('/api/high-scores').
        success(function (data, status, headers, config) {
            $scope.highscores = data.result;
        }).
        error(function (data, status, headers, config) {
            console.log('Error retriving highscores - ' + JSON.stringify(data));
        });

    //$scope.addHighScore = function(playerScore)
    //{
    //    $http.post('/api/high-scores', { "name": "yolo", "score": playerScore }).
    //        success(function (data, status, headers, config) {
    //            console.log("success!");
    //            console.log(data.result);
    //            //$scope.highscores = data.result;
    //        }).
    //        error(function (data, status, headers, config) {
    //            console.log('Error posting highscore - ' + JSON.stringify(data));
    //        });
    //}
    
});