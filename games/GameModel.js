angular.module('DataDrivenDirectives').factory('GameModel', function GameModelFactory() {
    
    var GameModel = function() {
        this.opponent = null;
        this.date = null;
        this.players = [];
    };
    
    GameModel.prototype.getPlayers = function() {
        return this.players;
    };
    
    return GameModel;
});