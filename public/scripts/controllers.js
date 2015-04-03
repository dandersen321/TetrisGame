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
    // TODO KIP: When recording a score, also re-gather scores here.
});