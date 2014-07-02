angular.module('DataDrivenDirectives').factory('ColumnChartView', function ColumnChartViewFactory(ChartView, ColumnChartOptions) { 
    
    var ColumnChartView = function(options) {
        ChartView.apply(this, arguments);
    };
    
    // ColumnChartView inherits from ChartView
    ColumnChartView.prototype = Object.create(ChartView.prototype);     
    
    ColumnChartView.prototype.initOptions = function() {
        this.setOptions(new ColumnChartOptions());
    };
    
    ColumnChartView.prototype.xScale = function() {
        ChartView.prototype.xScale.apply(this, arguments);   
        this.x = d3.scale.ordinal()
            .domain(this.data.map(function(d) { return d.x; }))
            .rangeRoundBands([0, this.width()], this.options.columnPadding);
        return this.x;
    };
    
    ColumnChartView.prototype.yScale = function() {
        ChartView.prototype.yScale.apply(this, arguments);
        this.y = d3.scale.linear()
            .domain([0, d3.max(this.data, function(d) { return d.y; })])
            .range([this.height(), 0]);
        return this.y;
    };
    
    ColumnChartView.prototype.onColumnClick = function(d, i) {
        if(angular.isFunction(this.options.onColumnClick)) {
            this.options.onColumnClick(d, i);
        }
    };
    
    ColumnChartView.prototype.renderData = function() {
        ChartView.prototype.renderData.apply(this, arguments);
        var x = this.xScale();
        var y = this.yScale();
        var height = this.height();
        var _this = this;
        this.svg.selectAll(".bar")
            .data(this.data)
            .enter().append("rect")
            .attr("class", "bar")
            .attr("x", function(d) { return x(d.x); })
            .attr("width", x.rangeBand())
            .attr("y", function(d) { return y(d.y); })
            .attr("height", function(d) { return height - y(d.y); })
            .on("click", function(d, i) {
                _this.onColumnClick(d, i);
            });
        return this;
    };
    
    return ColumnChartView;
});