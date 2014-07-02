angular.module('DataDrivenDirectives').factory('ColumnChartOptions', function ColumnChartOptionsFactory(ChartOptions, ColumnChartModel) { 
    
    var ColumnChartOptions = function(options) {
        options = options || {};
        
        ChartOptions.apply(this, arguments);
        
        // add ColumnChartOptions specific options
        var defaults = {
            columnPadding: 0.1,
            onColumnClick: null
        };
        $.extend(true, this, defaults);

        // add in options passed to the constructor
        $.extend(true, this, options);       
    }
    
    ColumnChartOptions.prototype = Object.create(ChartOptions.prototype);
    
    return ColumnChartOptions;
});