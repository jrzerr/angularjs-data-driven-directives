angular.module('DataDrivenDirectives').factory('ChartView', function ChartViewFactory(ChartOptions) { 
    
    var ChartView = function(options) {
        options = options || {};
        
        if(angular.isDefined(options.data)) {
            this.setData(options.data);
        }
        if(angular.isDefined(options.element)) {
            this.setElement(options.element);
        }
        if(angular.isDefined(options.options)) {
            this.setOptions(options.options);
        }
        else {
            this.initOptions();
        }
        
        // object caching
        this.clearCache();
    };
    
    ChartView.prototype.setOptions = function(options) {
        this.options = options;
    };
    
    ChartView.prototype.initOptions = function() {
        this.setOptions(new ChartOptions());
    }
    
    ChartView.prototype.setData = function(data) {
        this.data = data;
    };
    
    ChartView.prototype.setElement = function(element) {
        this.element = element;
    };
    
    ChartView.prototype.clearCache = function() {
        this.x = null;
        this.y = null;
    };
    
    ChartView.prototype.width = function() {
        return this.options.width - this.options.margin.left - this.options.margin.right;
    };
    
    ChartView.prototype.height = function() {
        return this.options.height - this.options.margin.top - this.options.margin.bottom;
    };
    
    ChartView.prototype.xScale = function() {
        // return previously computed copy if exists
        if(angular.isObject(this.x)) {
            return this.x;
        }        
        this.x = null;
        return this.x;
    };
    
    ChartView.prototype.yScale = function() {
        // return previously computed copy if exists
        if(angular.isObject(this.y)) {
            return this.y;
        }
        this.y = null;
        return this.y;
    };
    
    ChartView.prototype.xAxis = function() {
        return d3.svg.axis()
            .scale(this.xScale())
            .orient(this.options.xaxis.orientation);
    };
    
    ChartView.prototype.yAxis = function() {
        return d3.svg.axis()
            .scale(this.yScale())
            .orient(this.options.yaxis.orientation);
    };    
    
    ChartView.prototype.renderSVG = function() {
        this.svg = d3.select(this.element).append("svg")
            .attr("width", this.width() + this.options.margin.left + this.options.margin.right)
            .attr("height", this.height() + this.options.margin.top + this.options.margin.bottom)
            .append("g")
            .attr("transform", "translate(" + this.options.margin.left + "," + this.options.margin.top + ")");        
        return this;
    };
    
    ChartView.prototype.renderXAxis = function() {
        var xaxisLabel = this.options.xaxis.label || ''; 
        this.svg.append("g")
            .attr("class", "x axis")
            .attr("transform", "translate(0," + this.height() + ")")
            .call(this.xAxis())
            .append("text")
            .attr("x", ( this.width() / 2 ) ) 
            .attr("y", ( this.options.margin.bottom / 2 ) )
            .style("text-anchor", "middle")
            .text(xaxisLabel); 
        return this;
    };
    
    ChartView.prototype.renderYAxis = function() {
        var yaxisLabel = this.options.yaxis.label || '';
        this.svg.append("g")
            .attr("class", "y axis")
            .call(this.yAxis())
            .append("text")
            .attr("transform", "rotate(-90)")
            .attr("x", -1 * (this.height() / 2))
            .attr("y", -1 * (this.options.margin.left / 2))
            .style("text-anchor", "end")
            .text(yaxisLabel);
        return this;
    };
    
    ChartView.prototype.renderTitle = function() {
        var title = this.options.title || '';
        this.svg.append("text")
            .attr("class", "title")
            .attr("x", ( this.width() / 2 ) )
            .attr("y", 0 - ( this.options.margin.top / 2 ) )
            .style("text-anchor", "middle")
            .text(title);
        return this;
    };
    
    ChartView.prototype.renderData = function() {
        return this;
    };
    
    ChartView.prototype.render = function() {

        if(angular.isUndefined(this.element)) {
            throw "ChartView::render element not defined";
        }        
        
        if(angular.isUndefined(this.data)) {
            throw "ChartView::render data not defined";
        }
        
        // for performance reasons, some items will be cached, so clear them
        // upon every call to render
        this.clearCache();    
        
        this.renderSVG()
            .renderXAxis()
            .renderYAxis()
            .renderTitle()
            .renderData();
    
        return this;
    };
    
    /**
     * Cleanup after the chart was created
     * Unbind any events, clear out SVG
     * @returns {undefined}
     */
    ChartView.prototype.close = function() {
        this.element.innerHTML = '';
    };
    
    return ChartView;
});