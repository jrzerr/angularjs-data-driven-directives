angular.module('DataDrivenDirectives', ['ngMockE2E']);

// We will be using backend-less development
// $http uses $httpBackend to make its calls to the server
// We will mock $httpBackend, capturing routes and returning data
angular.module('DataDrivenDirectives').run(function($httpBackend) {
    var gamedata = [
        {
            "gameid": 1,
            "opponent": "Tech",
            "date": new Date(2014, 4, 7),
            "players": [
                { "playerid": 1, "name": "Fred", "points": 22, "assists": 1 },
                { "playerid": 2, "name": "Tony", "points": 12, "assists": 5},
                { "playerid": 3, "name": "Mike", "points": 6, "assists": 2},
                { "playerid": 4, "name": "Ron", "points": 4, "assists": 2 }
            ]
        },
        {
            "gameid": 2,
            "opponent": "State",
            "date": new Date(2014, 4, 13),
            "players": [
                { "playerid": 1, "name": "Fred", "points": 16, "assists": 3 },
                { "playerid": 2, "name": "Tony", "points": 7, "assists": 1},
                { "playerid": 3, "name": "Mike", "points": 12, "assists": 1 },
                { "playerid": 4, "name": "Ron", "points": 6, "assists": 1 }
            ]            
        },
        {
            "gameid": 3,
            "opponent": "College",
            "date": new Date(2014, 4, 20),
            "players": [
                { "playerid": 1, "name": "Fred", "points": 8, "assists": 5 },
                { "playerid": 2, "name": "Tony", "points": 8, "assists": 2},
                { "playerid": 3, "name": "Mike", "points": 10, "assists": 3 },
                { "playerid": 4, "name": "Ron", "points": 14, "assists": 3 }
            ]            
        }        
    ];
    
    $httpBackend.whenGET('/games').respond(gamedata);
    
    $httpBackend.whenGET(/\/games\/\d+/).respond(function(method, url, data) {
        // parse the matching URL to pull out the id (/games/:id)
        var gameid = url.split('/')[2];

        // find the game that matches that id
        var list = $.grep(gamedata, function(element, index) {
            return (element.gameid == gameid);
        });
        if(list.length == 0) {
            throw "$httpBackend::whenGET /games/:id No game found with gameid " + gameid;
        }
        if(list.length > 1) {
            throw "$httpBackend::whenGET /games/:id Duplicate games for gameid " + gameid;
        }

        return [200, list[0], {}];
    });

    var playerdata = [
        {
            "playerid": 1,
            "name": "Fred",
            "games": [
                { "gameid": 1, "opponent": "Tech", "date": new Date(2014, 4, 7), "points": 22, "assists": 1 },
                { "gameid": 2, "opponent": "State", "date": new Date(2014, 4, 13), "points": 16, "assists": 3 },
                { "gameid": 3, "opponent": "College", "date": new Date(2014, 4, 20), "points": 8, "assists": 5 }
            ]
        },
        {
            "playerid": 2,
            "name": "Tony",
            "games": [
                { "gameid": 1, "opponent": "Tech", "date": new Date(2014, 4, 7), "points": 12, "assists": 5 },
                { "gameid": 2, "opponent": "State", "date": new Date(2014, 4, 13), "points": 7, "assists": 1 },
                { "gameid": 3, "opponent": "College", "date": new Date(2014, 4, 20), "points": 8, "assists": 2 }
            ]
        },
        {
            "playerid": 3, 
            "name": "Mike",
            "games": [
                { "gameid": 1, "opponent": "Tech", "date": new Date(2014, 4, 7), "points": 6, "assists": 2 },
                { "gameid": 2, "opponent": "State", "date": new Date(2014, 4, 13), "points": 12, "assists": 1 },
                { "gameid": 3, "opponent": "College", "date": new Date(2014, 4, 20), "points": 10, "assists": 3 }
            ]
        },
        {
            "playerid": 4, 
            "name": "Ron",
            "games": [
                { "gameid": 1, "opponent": "Tech", "date": new Date(2014, 4, 7), "points": 4, "assists": 2 },
                { "gameid": 2, "opponent": "State", "date": new Date(2014, 4, 13), "points": 6, "assists": 1 },
                { "gameid": 3, "opponent": "College", "date": new Date(2014, 4, 20), "points": 14, "assists": 3 }
            ]
        }
    ];
    
    $httpBackend.whenGET('/players').respond(playerdata);

    $httpBackend.whenGET(/\/players\/\d+/).respond(function(method, url, data) {
        // parse the matching URL to pull out the id (/players/:id)
        var playerid = url.split('/')[2];

        // find the player that matches that id
        var list = $.grep(playerdata, function(element, index) {
            return (element.playerid == playerid);
        });
        if(list.length == 0) {
            throw "$httpBackend::whenGET /players/:id No player found with playerid " + playerid;
        }
        if(list.length > 1) {
            throw "$httpBackend::whenGET /players/:id Duplicate players for playerid " + playerid;
        }

        return [200, list[0], {}];
    });    
    
    
});