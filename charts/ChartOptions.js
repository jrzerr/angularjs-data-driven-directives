angular.module('DataDrivenDirectives').factory('ChartOptions', function ChartOptionsFactory(ChartModel) { 
    
    var ChartOptions = function(options) {
        options = options || {};

        // set up defaults
        this.model = new ChartModel();
        this.doWatchModel = false;
        this.margin = {
            top: 50,
            right: 50,
            bottom: 80,
            left: 80
        };
        this.width = 960;
        this.height = 500;
        this.title = null;
        this.xaxis = {
            label: null,
            orientation: "bottom"
        };
        this.yaxis = {
            label: null,
            orientation: "left"
        };

        // allow the options to the constructor to override the defaults
        $.extend(true, this, options);
    };
    
    return ChartOptions;
});