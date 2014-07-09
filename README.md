# AngularJS Data Driven Directives

Using AngularJS to model data and visualize it with D3 AngularJS directives.  This repo is a companion to a presentation given at the Boise AngularJS meetup on July 2, 2014, which can be seen at:

[AngularJS Data Driven Directives Presentation at jeremyzerr.com](http://jeremyzerr.com/angularjs-data-driven-directives-presentation)

## Data Driven Directives

* Using D3.js to create data visualization
* Creating a Column Chart and Line Chart directive that uses D3
* Making the chart interactive
* Creating chart Data Models and Options objects that correspond to each chart
* Transforming data from the server into chart Data Models compatible with the charts using a Mapper

## Challenges

* Create chart directives with a simple interface
* Organize the data in a structured way
* Transform domain data models into models compatible for displaying using the chart directives
* Avoid code duplication when creating multiple similar charts
* Keeping the D3 code separate from the directive to better adhere to Single Responsibility Principle

## AngularJS Directive Interfaces

Two extremes to create directive interfaces.

### Use directive scope to map all parameters individually

Example: [AngularJS NVD3](http://cmaurer.github.io/angularjs-nvd3-directives/)

Some of the directives can have 50+ items on their scope, which means you have a LOT of parameters defined in your HTML, lot of coupling to $scope variables, can be tough to keep track of.

To me this looks a lot like:
function foo(var1, var2, var3, var4, var5, var6, …) { … }

Whenever I see a function with too many arguments, code instincts kick in and tell me that something is not designed properly:

* The function is doing too much
* Has too many dependencies
* Typically solve by refactoring into subroutines or objects to encapsulate or replacing arguments with an object (or several)

### Use a small number of directive scope items to pass larger complex data structures.

Example: [ng-grid](http://angular-ui.github.io/ng-grid/)

This is the method I prefer
Allows you to fine-tune your $watch and data-binding too, and even put the user in control of that through the directive options
Also, since there are a lot of arguments, I prefer putting a little formality around that options structure and make it into its own Object

I have created an example of this in my ColumnChartOptions object
Default options already defined if you pass no options to the constructor.
Options you want to override can be passed into the constructor

## Directive Inheritance

* Creating a Column Chart and Line Chart, they are very similar.  So maybe you want directive inheritance?
* I say not a good idea, a directive has a well-defined public API, you don’t want to pollute that with non-directive methods that you would need to allow overriding methods
* Consider a more flexible alternative:
  * Within your directive link(), use a separate View object which you can then freely design with inheritance without worrying about the Directive API.

## Directive (View) Inheritance FTW!

* Let’s take a look at the ColumnChart directive at charts/columnchart/ColumnChart.js
* The chart creation heavy lifting is all in ColumnChartView, which inherits some of its functionality from ChartView.

## Chart Objects

Each chart (Column Chart and Line Chart) have 4 types of objects:
* columnChart (directive <column-chart>)
* ColumnChartOptions (chart configuration options)
* ColumnChartView (does the D3 rendering)
* ColumnChartModel (data model displayed by ColumnChartView)

## Why Create a ColumnChartModel?

* Maintaining sanity when moving large complex data around is critical.
* A ColumnChartModel is a great way to enforce a common data format that needs to be met before rendering the chart.
* Then write Mappers that are responsible for transforming one domain Data Model into the desired Chart Data Model.

## What Does That Process Look Like?

* Fetch data from server using $http from either GameService or PlayerService, this is initiated from the Controller.
* Before returning the data to the Controller, the response is transformed by the Services into the domain Models: GameModels and PlayerGameModels.
* When controller data changes (seen by $watch), the domain Models are mapped into the appropriate Chart Data Model.
* The Chart Directive is $watching the Chart Data Model, when the data changes, the Chart View is (re-)rendered.

## Doing backend-less development with a $httpBackend mock

* Also a part of this github project is an example of doing backend-less development by using a $httpBackend mock
* Great for isolating frontend from backend for testing and also development to avoid needing a dev node server to provide a REST API.
* I have taken the code from this github project and broke it out [into a Plunker](http://plnkr.co/edit/arsvfe) that adds more detail and more examples specifically on this topic.

## D3 Basics

* Uses SVG + HTML5 + CSS3
* Has its own implementations of a lot of jQuery DOM-related functions. (selectors, styling, attributes, etc.)
* It’s pretty low-level library, there’s no LineChart function.  You build it up from scratch by binding data to SVG entities.
* You can also integrate HTML with it too, for chart controls like tooltips, legends, buttons, etc.

## D3 Chart Components

* Scales for X and Y - Maps data (domain) to a scale (chart pixels)
* Axis for X and Y - Displays a scale
* Bind data to an SVG entity like a line or a rect - Uses the scales to map the data to a chart location/dimension and plot
* Add title, legend, tooltips, buttons, etc
* Add events like on clicking a bar, hovering over a data point, dragging a timeline, or transitions between different chart types or changing data sources

## D3 Directive

* The Directive object link function calls the render() function on the View object (ColumnChartView or LineChartView).
* Take a look at the base ChartView object to find the render() function.
* Calls several render functions for different visual components.
  * SVG, XAxis, YAxis, Title, Data
* Has functions for creating each of the components: scales, axes, SVG, title, data.
* These are overriden if necessary in the ColumnChartView or LineChartView objects.

## Taking a closer look at ColumnChartView
* Pieces being overriden
  * X and Y scales (not too much different than Line)
* Data
  * Compare data portions