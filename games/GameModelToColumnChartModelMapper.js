angular.module('DataDrivenDirectives').factory('GameModelToColumnChartModelMapper', function(ColumnChartModel) {
    return function(gameModel, stat) {
        // Pluck out the particular stat we want
        // ColumnChartModel data is just xy pairs
        var statData = $.map(gameModel.players, function(playerGameModel, index) {
            var plucked = {
                x: playerGameModel.name,
                y: playerGameModel[stat],
                id: playerGameModel.playerid
            };
            return plucked;
        });        

        // add the xy pairs to the ColumnChartModel
        var columnChartModel = new ColumnChartModel();
        for(var i=0; i<statData.length; i++) {
            columnChartModel.addDataItem(statData[i]);
        }

        return columnChartModel;
    };
});