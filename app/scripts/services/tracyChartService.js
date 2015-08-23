'use strict';
/* Services */

var tracyChartService = 
 angular.module('tracyChartService', ['highcharts-ng']);

    this.singleTaskDapdexTemplate =             
        {
            options: {
                chart: {
                    zoomType: 'xy'
                }
            },
            title: {
                text: 'DAPDEX'
            },
            subtitle: {
                text: 'Application/Task'
            },


            xAxis: {
                type: 'datetime',
                title: {
                    text: 'Time'
                }
            },
            yAxis: {
                title: {
                    text: 'DAPDEX'
                },
                min: 0,
                max: 1,
                tickPositions: [0, 0.50, 0.70, 0.85, 0.94, 1],
                minorGridLineWidth: 0,
                gridLineWidth: 0,
                alternateGridColor: null,
                plotBands: [{
                    from: 0,
                    to: 0.49,
                    color: '#f2f2f2',
                    label: {
                        text: 'Unacceptable',
                        style: {
                            color: '#606060'
                        }
                    }
                }, {
                    from: 0.50,
                    to: 0.69,
                    color: '#fce3e3',
                    label: {
                        text: 'Poor',
                        style: {
                            color: '#606060'
                        }
                    }
                }, {
                    from: 0.70,
                    to: 0.84,
                    color: '#fcead9',
                    label: {
                        text: 'Fair',
                        style: {
                            color: '#606060'
                        }
                    }
                }, {
                    from: 0.85,
                    to: 0.93,
                    color: '#e8f9e9',
                    label: {
                        text: 'Good',
                        style: {
                            color: '#606060'
                        }
                    }
                }, { // Excellent
                    from: 0.94,
                    to: 1,
                    color: '#d9f9f9',
                    label: {
                        text: 'Excellent',
                        style: {
                            color: '#606060'
                        }
                    }
                }]
            },
            series: [{
                name: 'DAPDEX',
                type: 'spline',
                data: [
                    [1429975020000, 0.99],
                    [1429975080000, 0.98],
                    [1429975140000, 0.99],
                    [1429975200000, 0.93],
                    [1429975260000, 0.94],
                    [1429975320000, 0.97],
                    [1429975380000, 0.95],
                    [1429975440000, 0.97],
                    [1429975500000, 0.83],
                    [1429975560000, 0.93],
                    [1429975620000, 0.97],
                    [1429975680000, 0.94],
                    [1429975740000, 0.96],
                    [1429975800000, 0.98],
                    [1429975860000, 0.95],
                    [1429975920000, 0.96]
                ]
            }],
            loading: false
        };


tracyChartService.factory('tracyCharts', function(){
    return {
        getSingleTaskDapdexTimechart: function(application, task){
            // return application + " "+ task + " " + "singleTaskDapdexTimechart";
            return singleTaskDapdexTemplate;
        },
        getSingleTaskVitalsTimechart: function(application, task){
            return application + " " + task + " " + "singleTaskVitalsTimechart";
        }  
    }               
});
