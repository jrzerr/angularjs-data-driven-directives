angular.module('DataDrivenDirectives').factory('LineChartModel', function LineChartModelFactory() {
    var LineChartModel = function() {
        this.data = [];
    }
    
    LineChartModel.prototype.getData = function() {
        return this.data;
    };
    
    // dataItem is an object with x, y, and id properties
    LineChartModel.prototype.addDataItem = function(dataItem) {
        this.data.push(dataItem);
    }
    
    return LineChartModel;
});