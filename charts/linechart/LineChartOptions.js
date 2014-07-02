angular.module('DataDrivenDirectives').factory('LineChartOptions', function LineChartOptionsFactory(ChartOptions) { 
    
    var LineChartOptions = function(options) {
        options = options || {};
        
        ChartOptions.apply(this, arguments);
        
        // add LineChartOptions specific options
        var defaults = {
        };
        $.extend(true, this, defaults);

        // add in options passed to the constructor
        $.extend(true, this, options);       
    }
    
    LineChartOptions.prototype = Object.create(ChartOptions.prototype);

    return LineChartOptions;
});