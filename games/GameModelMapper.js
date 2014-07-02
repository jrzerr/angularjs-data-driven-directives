angular.module('DataDrivenDirectives').factory('GameModelMapper', function(GameModel, PlayerGameModelMapper) {
    return function(jsonData) {
        var gameModel = new GameModel();
        angular.extend(gameModel, jsonData);
        // players property needs to be turned into PlayerGameModel items
        var gameModelPlayers = [];
        angular.forEach(gameModel.players, function(playerJson) {
            var playerGameModel = PlayerGameModelMapper(playerJson);
            gameModelPlayers.push(playerGameModel);
        });
        gameModel.players = gameModelPlayers;
        return gameModel;
    };
});