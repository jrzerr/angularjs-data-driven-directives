angular.module('DataDrivenDirectives').controller('Ctrl', function($scope, GameService, PlayerService, ColumnChartOptions, LineChartOptions, GameModelToColumnChartModelMapper, PlayerGameModelToLineChartModelMapper) {
    
    // this contains the selected game from the GameService, a single GameModel
    $scope.game = null;
    // this contains all games from the GameService, array of GameModels
    $scope.games = [];
    
    // this contains the selected player from the PlayerService, a single PlayerGameModel
    $scope.player = null;
    // this contains all players from the PlayerService, array of PlayerGameModels
    $scope.players = [];
    
    // this contains all stat options
    $scope.stats = [
        { name: "Points", value: "points" },
        { name: "Assists", value: "assists" }
    ];
    // this is the selected stat
    $scope.stat = $scope.stats[0];
    
    // pass in the Column Chart Options that you would like to override
    // and they extend the object via constructor
    $scope.columnChartOptions = new ColumnChartOptions({
        doWatchModel: true,
        title: 'Points By Player',
        width: 800,
        height: 320,
        xaxis: {
            label: 'Players'
        },
        yaxis: {
            label: 'Points'
        },
        onColumnClick: function(d, i) { 
            // take the id from the selected column and use to fetch
            // the player with that playerid
            PlayerService.get(d.id).then(function(response) {
                $scope.player = response.data;
            });
        }
    });
    
    $scope.lineChartOptions = new LineChartOptions({
        doWatchModel: true,
        title: "Player Stats",
        width: 800,
        height: 320,
        xaxis: {
            label: "Opponents"
        },
        yaxis: {
            label: "Points"
        }
    });
    
    // updates the column chart with the desired game and stat
    var updateColumnChartModel = function(game, stat) {
        $scope.columnChartOptions.model = GameModelToColumnChartModelMapper(game, stat);
    };
    
    // updates the line chart with the desired player and stat
    var updateLineChartModel = function(player, stat) {
        $scope.lineChartOptions.model = PlayerGameModelToLineChartModelMapper(player, stat);
    };

    // When the game changes, it contains a new GameModel, we need to turn GameModel into a ColumnChartModel
    // We will use the information from our select box for stat to help us
    $scope.$watch('game', function(newValue, oldValue) {
        if(newValue === oldValue) { return; }
        updateColumnChartModel($scope.game, $scope.stat.value);
    });
    
    // When the stat looked at changes:
    //   update column chart model
    //   update line chart model
    //   change the chart labels to appropriately reflect the stat being shown
    $scope.$watch('stat', function(newValue, oldValue) {
        if(newValue === oldValue) { return; }
        $scope.columnChartOptions.title = $scope.stat.name + " by Player";
        $scope.columnChartOptions.yaxis.label = $scope.stat.name;
        updateColumnChartModel($scope.game, $scope.stat.value);
        $scope.lineChartOptions.yaxis.label = $scope.stat.name;
        updateLineChartModel($scope.player, $scope.stat.value);
    });
    
    // When the player changes
    //   update the line chart model
    $scope.$watch('player', function(newValue, oldValue) {
        if(newValue === oldValue) { return; }
        updateLineChartModel($scope.player, $scope.stat.value);
    });
    
    // Populating initial games via call to server
    GameService.query().then(function(response) {
        $scope.games = response.data;
        if(!angular.isObject($scope.game)) {
            $scope.game = $scope.games[0];
        }
    });
    
    // Populating initial players via call to server
    PlayerService.query().then(function(response) {
        $scope.players = response.data;
        if(!angular.isObject($scope.player)) {
            $scope.player = $scope.players[0];
        }        
    });   

});