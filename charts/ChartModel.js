angular.module('DataDrivenDirectives').factory('ChartModel', function() {
    var ChartModel = function() {
        this.data = [];
    }
    
    ChartModel.prototype.getData = function() {
        return this.data;
    };
    
    // dataItem is an object with x, y, and id properties
    ChartModel.prototype.addDataItem = function(dataItem) {
        this.data.push(dataItem);
    }
    
    return ChartModel;
});