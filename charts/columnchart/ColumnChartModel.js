angular.module('DataDrivenDirectives').factory('ColumnChartModel', function() {
    var ColumnChartModel = function() {
        this.data = [];
    }
    
    ColumnChartModel.prototype.getData = function() {
        return this.data;
    };
    
    // dataItem is an object with x, y, and id properties
    ColumnChartModel.prototype.addDataItem = function(dataItem) {
        this.data.push(dataItem);
    }
    
    return ColumnChartModel;
});