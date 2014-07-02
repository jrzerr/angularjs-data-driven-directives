angular.module('DataDrivenDirectives').directive('columnChart', function(ColumnChartView) {
    
    var linkFn = function(scope, element, attrs) {
        
        var view = null;
        
        var renderChart = function() {
            if(scope.chartoptions.model.data.length === 0) {
                element.text('No data!');
                return;
            }
            // if the view already existed, make sure to close it first
            // otherwise need to create it
            if(angular.isObject(view)) {
                view.close();
            }
            
            view = new ColumnChartView({
                data: scope.chartoptions.model.getData(),
                options: scope.chartoptions,
                element: element[0]
            });
            view.render();
        };

        // Using a single chartoptions directive attribute instead of one for each
        // individual option gives the flexibility to allow the user to fine-tune
        // the watches as appropriate
        if(scope.chartoptions.doWatchModel) {
            scope.$watchCollection('chartoptions.model.getData()', function(newCollection, oldCollection, watchScope) {
                if(newCollection === oldCollection) { return; }
                renderChart();
            });
        } else {
            renderChart();            
        }
        
        // No cleanup of watches needed because chartoptions.model.getData() is on scope
        scope.$on('$destroy', function() {
            // no cleanup needed here
        });
  
    };
  
    return {
        restrict: 'E',
        scope: {
            chartoptions: '='
        },
        link: linkFn
    };
});