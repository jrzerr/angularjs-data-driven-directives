angular.module('DataDrivenDirectives').factory('PlayerService', function($http, $q, PlayerGameModelMapper) {
    
    var transformDataServiceResponse = function(jsonData, headers) {
        // take the result and transform into GameModel
        var playerGameModel = PlayerGameModelMapper(jsonData);
        return playerGameModel;
    };

    var transformDataServiceResponseArray = function(jsonData, headers) {
        // take each result and transform into GameModel
        var playerGameModels = [];
        angular.forEach(jsonData, function(jsonDataItem) {
            var playerGameModel = PlayerGameModelMapper(jsonDataItem);
            playerGameModels.push(playerGameModel);
        });
        return playerGameModels;
    };    
    
    var service = {
        query: function() {
            var httpConfig = {
                transformResponse: transformDataServiceResponseArray
            };
            return $http.get('/players', httpConfig);
            
        },
        get: function(id) {
            var httpConfig = {
                transformResponse: transformDataServiceResponse
            };
            return $http.get('/players/' + id, httpConfig);
        }
    };
    
    return service;
});