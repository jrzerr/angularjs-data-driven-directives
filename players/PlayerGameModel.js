angular.module('DataDrivenDirectives').factory('PlayerGameModel', function PlayerGameModelFactory() {

    var PlayerGameModel = function() {
        this.name = null;
        this.points = null;
        this.assists = null;
    };    
    
    return PlayerGameModel;
});