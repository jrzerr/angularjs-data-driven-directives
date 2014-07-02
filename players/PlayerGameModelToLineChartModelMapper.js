angular.module('DataDrivenDirectives').factory('PlayerGameModelToLineChartModelMapper', function(LineChartModel) {
    return function(playerModel, stat) {
        // Pluck out the particular stat we want
        // ColumnChartModel data is just xy pairs
        var statData = $.map(playerModel.games, function(playerGameModel, index) {
            var plucked = {
                x: playerGameModel.opponent,
                y: playerGameModel[stat],
                id: playerGameModel.gameid
            };
            return plucked;
        });        

        // add the xy pairs to the LineChartModel
        var lineChartModel = new LineChartModel();
        for(var i=0; i<statData.length; i++) {
            lineChartModel.addDataItem(statData[i]);
        }

        return lineChartModel;
    };
});