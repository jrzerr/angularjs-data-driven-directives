angular.module('DataDrivenDirectives').factory('PlayerGameModelMapper', function(PlayerGameModel) {
    return function(jsonData) {
        var playerGameModel = new PlayerGameModel(); 
        angular.extend(playerGameModel, jsonData);
        return playerGameModel;
    };
});