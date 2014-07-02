angular.module('DataDrivenDirectives').factory('GameService', function($http, $q, GameModelMapper) {
    
    var transformDataServiceResponse = function(jsonData, headers) {
        // take the result and transform into GameModel
        var gameModel = GameModelMapper(jsonData);
        return gameModel;
    };

    var transformDataServiceResponseArray = function(jsonData, headers) {
        // take each result and transform into GameModel
        var gameModels = [];
        angular.forEach(jsonData, function(jsonDataItem) {
            var gameModel = GameModelMapper(jsonDataItem);
            gameModels.push(gameModel);
        });
        return gameModels;
    };    
    
    var service = {
        query: function() {
            var httpConfig = {
                transformResponse: transformDataServiceResponseArray
            };
            return $http.get('/games', httpConfig);
            
        },
        get: function(id) {
            var httpConfig = {
                transformResponse: transformDataServiceResponse
            };
            return $http.get('/games/' + id, httpConfig);
        }
    };
    
    return service;
});