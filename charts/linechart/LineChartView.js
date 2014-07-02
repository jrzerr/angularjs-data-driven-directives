angular.module('DataDrivenDirectives').factory('LineChartView', function LineChartViewFactory(ChartView, LineChartOptions) { 
    
    var LineChartView = function(options) {
        ChartView.apply(this, arguments);
    };
    
    // LineChartView inherits from ChartView
    LineChartView.prototype = Object.create(ChartView.prototype);    
    
    LineChartView.prototype.initOptions = function() {
        this.setOptions(new LineChartOptions());
    };
    
    LineChartView.prototype.xScale = function() {       
        ChartView.prototype.xScale.apply(this, arguments);
        this.x = d3.scale.ordinal()
            .domain(this.data.map(function(d) { return d.x; }))
            .rangePoints([100, this.width()]);
        return this.x;
    };
    
    LineChartView.prototype.yScale = function() {
        ChartView.prototype.yScale.apply(this, arguments);
        this.y = d3.scale.linear()
            .domain([0, d3.max(this.data, function(d) { return d.y; })])
            .range([this.height(), 0]);
        return this.y;
    };
    
    LineChartView.prototype.renderData = function() {
        ChartView.prototype.renderData.apply(this, arguments);
        var x = this.xScale();
        var y = this.yScale();
        var height = this.height();

        var line = d3.svg.line()
            .x(function(d) { return x(d.x); })
            .y(function(d) { return y(d.y); });  
    
        this.svg.append("path")
            .datum(this.data)
            .attr("class", "line")
            .attr("d", line);    

        return this;
    };
    
    return LineChartView;
});