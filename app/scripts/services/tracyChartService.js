'use strict';
/* Services */

var tracyChartService = 
 angular.module('tracyChartService', ['highcharts-ng']);

var rttUnit = "?";
var rttF = 0;
var singleTaskApdexTimechart =             
        {
            options: {
                chart: {
                    zoomType: 'xy'
                },
                plotOptions: {
                    series: {
                        cursor: 'pointer',
                        point: {
                            events: {
                                click: function() {
                                    window.open(this.url);
//                                    alert('Category: ' + this.category + ', value: ' + this.url);
                                }
                            }
                        }
                    }
                }
            },
            title: {
                // text: 'APDEX'
                text: ''
            },
            // subtitle: {
            //     text: 'Application/Task'
            // },
            xAxis: {
                type: 'datetime',
                title: {
                    text: 'Time'
                }
            },
            yAxis: {
                title: {
                    text: 'APDEX'
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
                name: 'APDEX',
                type: 'spline',
                data: [
                    // [1429975020000, 0.96],
                    // [1429975080000, 0.95],
                    // [1429975140000, 0.94],
                    // [1429975200000, 0.93],
                    // [1429975260000, 0.94],
                    // [1429975320000, 0.97],
                    // [1429975380000, 0.95],
                    // [1429975440000, 0.97],
                    // [1429975500000, 0.83],
                    // [1429975560000, 0.93],
                    // [1429975620000, 0.97],
                    // [1429975680000, 0.94],
                    // [1429975740000, 0.96],
                    // [1429975800000, 0.98],
                    // [1429975860000, 0.95],
                    // [1429975920000, 0.96]
                ]
            }],
            loading: false,
            credits: {
                enabled: false
            },
            size: {
             height: 300
         }
     };
var singleTaskVitalsTemplate = 
     {
            options: {
                chart: {
                    zoomType: 'xy'
                },
                tooltip: {
                    shared: true
                },
                plotOptions: {
                    series: {
                        cursor: 'pointer',
                        point: {
                            events: {
                                click: function() {
                                    window.open(this.options.url);
//                                    alert('Category: ' + this.category + ', value: ' + this.url);
                                }
                            }
                        }
                    }
                }
            },
            title: {
                text: ''
                // text: 'Vitals'
            },
            // subtitle: {
            //     text: 'Application/Task'
            // },
            xAxis: {
                type: 'datetime',
                title: {
                    text: 'Time'
                }
            },
            yAxis: [{ // Primary yAxis
                visible: true,
                labels: {
                    format: '{value}',
                    style: {
                        // color: '#228B22'//Highcharts.getOptions().colors[2]
                        color: Highcharts.getOptions().colors[7]
                    }
                },
                title: {
                    text: 'Response time (ms)',
                    style: {
                        // color: '#228B22' //Highcharts.getOptions().colors[2]
                        color: Highcharts.getOptions().colors[7]
                    }
                },
                opposite: true

            }, { // Secondary yAxis
                visible: true,
                gridLineWidth: 0,
                title: {
                    text: 'Count',
                    style: {
                        color: Highcharts.getOptions().colors[0]
                    }
                },
                labels: {
                    format: '{value}',
                    style: {
                        color: Highcharts.getOptions().colors[0]
                    }
                },
                min: 0

            }, { // Tertiary yAxis
                visible: true,
                gridLineWidth: 0,
                title: {
                    text: 'Error count',
                    style: {
                        color: Highcharts.getOptions().colors[1]
                    }
                },
                labels: {
                    format: '{value}',
                    style: {
                        color: Highcharts.getOptions().colors[1]
                    }
                },
                opposite: true,
                min: 0
            }],
            legend: {
                layout: 'vertical',
                align: 'left',
                x: 80,
                verticalAlign: 'top',
                y: 55,
                floating: true,
                backgroundColor: (Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF'
            },
            series: [{
                name: 'Count',
                type: 'column',
                visible: true,
                yAxis: 1,
                data: [                
                    [1429975020000, 200   ],
                    [1429975080000, 243   ],
                    [1429975140000, 254   ],
                    [1429975200000, 234   ],
                    [1429975260000, 253   ],
                    [1429975320000, 265   ],
                    [1429975380000, 245   ],
                    [1429975440000, 247   ],
                    [1429975500000, 765   ],
                    [1429975560000, 243   ],
                    [1429975620000, 265   ],
                    [1429975680000, 273   ],
                    [1429975740000, 247   ],
                    [1429975800000, 256   ],
                    [1429975860000, 236   ],
                    [1429975920000, 245   ]
                ],
            }, {
                name: 'Error count',
                type: 'spline',
                visible: true,
                yAxis: 2,
                data: [                                
                    [1429975020000, 1   ],
                    [1429975080000, 2   ],
                    [1429975140000, 1   ],
                    [1429975200000, 2   ],
                    [1429975260000, 1   ],
                    [1429975320000, 2   ],
                    [1429975380000, 1   ],
                    [1429975440000, 2   ],
                    [1429975500000, 4   ],
                    [1429975560000, 1   ],
                    [1429975620000, 2   ],
                    [1429975680000, 1   ],
                    [1429975740000, 2   ],
                    [1429975800000, 1   ],
                    [1429975860000, 2   ],
                    [1429975920000, 1   ]
                    ],
                marker: {
                    enabled: false
                },
                dashStyle: 'shortdot'
            }, {
                name: 'p95 Response Time',
                color: Highcharts.getOptions().colors[7],//'#228B22',
                type: 'spline',
                visible: true,
                yAxis: 0,
                data: [
                    [1429975020000, 110   ],
                    [1429975080000, 132   ],
                    [1429975140000, 141   ],
                    [1429975200000, 143   ],
                    [1429975260000, 151   ],
                    [1429975320000, 134   ],
                    [1429975380000, 123   ],
                    [1429975440000, 131   ],
                    [1429975500000, 111   ],
                    [1429975560000, 125   ],
                    [1429975620000, 123   ],
                    [1429975680000, 143   ],
                    [1429975740000, 122   ],
                    [1429975800000, 156   ],
                    [1429975860000, 116   ],
                    [1429975920000, 145   ]
                    ],
            }, {
                name: 'max Response Time',
                type: 'spline',
                color: Highcharts.getOptions().colors[7],//'#228B22',
                visible: true,
                yAxis: 0,
                data: [
                    [1429975020000, 110   ],
                    [1429975080000, 132   ],
                    [1429975140000, 141   ],
                    [1429975200000, 143   ],
                    [1429975260000, 151   ],
                    [1429975320000, 134   ],
                    [1429975380000, 123   ],
                    [1429975440000, 131   ],
                    [1429975500000, 111   ],
                    [1429975560000, 125   ],
                    [1429975620000, 123   ],
                    [1429975680000, 143   ],
                    [1429975740000, 122   ],
                    [1429975800000, 156   ],
                    [1429975860000, 116   ],
                    [1429975920000, 145   ]
                    ],
            }],
            credits: {
                enabled: false
            },
            size: {
             height: 300
         }
        };
var multiTaskApdexTimechart =             
        {
            options: {
                chart: {
                    zoomType: 'xy'
                }
            },
            title: {
                // text: 'APDEX'
                text: ''
            },
            // subtitle: {
            //     text: 'Application/Task'
            // },
            xAxis: {
                type: 'datetime',
                title: {
                    text: 'Time'
                }
            },
            yAxis: {
                title: {
                    text: 'APDEX'
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
                name: 'APDEX',
                type: 'spline',
                data: [
                    // [1429975020000, 0.96],
                    // [1429975080000, 0.95],
                    // [1429975140000, 0.94],
                    // [1429975200000, 0.93],
                    // [1429975260000, 0.94],
                    // [1429975320000, 0.97],
                    // [1429975380000, 0.95],
                    // [1429975440000, 0.97],
                    // [1429975500000, 0.83],
                    // [1429975560000, 0.93],
                    // [1429975620000, 0.97],
                    // [1429975680000, 0.94],
                    // [1429975740000, 0.96],
                    // [1429975800000, 0.98],
                    // [1429975860000, 0.95],
                    // [1429975920000, 0.96]
                ]
            }],
            loading: false,
            credits: {
                enabled: false
            },
            size: {
             height: 300
         }
     };
var singleTaskHistogramTemplate = 
       {
            options : { 
                chart: {
                    type: 'bar'
                },
                    tooltip: {
                },
                legend: {
                    enabled: false
                },
                plotOptions: {
                    series: {
                        cursor: 'pointer',
                        point: {
                            events: {
                                click: function() {
                                    window.open(this.options.url);
                                }
                            }
                        }
                    }
                }
            },
            title: {
                text: ''
                // text: 'Latency histogram'
            },
            // subtitle: {
            //     text: 'Application/Task'
            // },
            xAxis: {
                categories: [
                    '>640', 
                    '560-640', 
                    '480-560', 
                    '400-480', 
                    '320-400', 
                    '240-320', 
                    '160-240', 
                    '120-160', 
                    '80-120', 
                    '40-80', 
                    '0-40'
                ],
                title: {
                    text: 'Response time range [ms]',
                }
            },
            yAxis: {
                min: 0,
                title: {
                    text: 'count',
                    align: 'high'
                },
                labels: {
                    overflow: 'justify'
                }
            },
            plotOptions: {
                bar: {
                    dataLabels: {
                        enabled: true
                    }
                }
            },
            credits: {
                enabled: false
            },
            series: [{
                name: 'Count within response time range',
                data: [
                    {y: 3, color: '#C92524'},
                    {y: 4, color: '#D0FEC0'},
                    {y: 5, color: '#D0FEC0'},
                    {y: 6, color: '#D0FEC0'},
                    {y: 7, color: '#D0FEC0'},
                    {y: 8, color: '#D0FEC0'},
                    {y: 9, color: '#D0FEC0'},
                    {y: 10, color: '#228B22'},
                    {y: 40, color: '#228B22'},
                    {y: 30, color: '#228B22'},
                    {y: 2, color: '#228B22'}
                ]
            }],
            size: {
             height: 400
         }
        };
var lineColorPallete = ['#000000', '#058DC7', '#50B432', '#ED561B',  '#24CBE5', '#64E572', '#FF9655', '#FFF263', '#6AF9C4', '#DDDF00'];
var markerShapes = ['circle', 'triangle', 'square', 'diamond', 'triangle-down'];

tracyChartService.factory('tracyCharts', function(){
    return {
        getSingleTaskApdexTimechart: function(application, task, chartData){
            var i = 0, newDataArray = [];
			for (i = 0; i < chartData.timeSequence.length; i++) {
				if (null != chartData.apdexScores[i])	{
                    var latest = chartData.timeSequence[i]
                        + chartData.timeSequence[chartData.timeSequence.length-1]
                        - chartData.timeSequence[chartData.timeSequence.length-2];
                    var url = "#/timeline/1?application=" + application
                        + "&task=" + task
                        + "&earliest=" + chartData.timeSequence[i]
                        + "&latest=" + latest
                        + "&rtBelow=" + chartData.rttF * 10
                        + "&rtAbove=" + 0;
				    var newData = {};
				    newData.x = chartData.timeSequence[i];
				    newData.y = chartData.apdexScores[i];
				    newData.url = url;
                    newDataArray.push(newData);
	        	}
			}
			singleTaskApdexTimechart.series[0].data = newDataArray;
            rttUnit = chartData.rttUnit;
            rttF = chartData.rttF;
            singleTaskApdexTimechart.series[0].name = 'APDEX [' + chartData.rttT + chartData.rttUnit + ']';
			// console.log(singleTaskApdexTimechart);
//			 console.log(JSON.stringify(singleTaskApdexTimechart));
            return singleTaskApdexTimechart;
        },

        getMultiTaskApdexTimechart: function(application, chartData){
            var i = 0;
            var taskIx = 0;
            multiTaskApdexTimechart.series = [];
            for (taskIx = 0; taskIx < chartData.tasks.length ; taskIx++) {
                var newData = [];
                for (i = 0; i < chartData.tasks[taskIx].timeSequence.length; i++) {
                    if (null != chartData.tasks[taskIx].apdexScores[i])   {
                       newData.push([chartData.tasks[taskIx].timeSequence[i], chartData.tasks[taskIx].apdexScores[i]]);
                    }
                }

                var series = {};
                series.data = newData;
                series.name = chartData.tasks[taskIx].task +
                    ' [' + chartData.tasks[taskIx].rttT + chartData.tasks[taskIx].rttUnit + ']';
                series.type = 'spline';
                series.color = lineColorPallete[taskIx];
                series.lineWidth = 1;
                series.marker = {};
                series.marker.symbol = markerShapes[taskIx];
                // series.marker.enabled = false;
                
                if (multiTaskApdexTimechart.series[taskIx] == 'undefined') {
                    multiTaskApdexTimechart.series.push(series)
                }
                else {
                    multiTaskApdexTimechart.series[taskIx] = series;

                }
            }

            // console.log(multiTaskApdexTimechart);
            return multiTaskApdexTimechart;
        },

        getSingleTaskVitalsTimechart: function(application, task, chartData){
        	// console.log(chartData);
            var i = 0, countDataArray = [], errorCountDataArray = [], p95DataArray = [], maxDataArray = [];
            var totalErrorCount=0, maxSnapCount=0;
            var twsSupportsMax = chartData.hasOwnProperty('max');
			for (i = 0; i < chartData.timeSequence.length; i++) {
                // Establish latest
                var latest = chartData.timeSequence[i]
                    + chartData.timeSequence[chartData.timeSequence.length-1]
                    - chartData.timeSequence[chartData.timeSequence.length-2];

                var url = "#/timeline/1?application=" + application
                    + "&task=" + task
                    + "&earliest=" + chartData.timeSequence[i]
                    + "&latest=" + latest
                    + "&rtBelow=" + rttF * 10
                    + "&rtAbove=" + 0;

                var countData = {}, errorCountData = {}, p95Data = {}, maxData = {};
				if (null != chartData.count[i])	{
				    countData.x = chartData.timeSequence[i];
				    countData.y = chartData.count[i];
				    countData.url = url;
	            	countDataArray.push(countData)
                    maxSnapCount = Math.max(maxSnapCount, chartData.count[i]);
	        	}
				if (null != chartData.errors[i])	{
				    errorCountData.x = chartData.timeSequence[i];
				    errorCountData.y = chartData.errors[i];
				    errorCountData.url = url;
	            	errorCountDataArray.push(errorCountData);
                    totalErrorCount = totalErrorCount + chartData.errors[i];
	        	}
				if (null != chartData.p95[i])	{
				    p95Data.x = chartData.timeSequence[i];
				    p95Data.y = chartData.p95[i];
				    p95Data.url = url;
	            	p95DataArray.push(p95Data);
	        	}
                if (twsSupportsMax && null != chartData.max[i])   {
				    maxData.x = chartData.timeSequence[i];
				    maxData.y = chartData.max[i];
				    maxData.url = url;
                    maxDataArray.push(maxData);
                }
                else {
                    singleTaskVitalsTemplate.series[3].data = {};
                    singleTaskVitalsTemplate.series[3].visible = false;
                }
			}
            // console.log(singleTaskVitalsTemplate);
            singleTaskVitalsTemplate.yAxis[0].title.text = 'Response time (' + rttUnit+ ')',
			singleTaskVitalsTemplate.series[0].data = countDataArray;
            singleTaskVitalsTemplate.series[0].visible = (maxSnapCount == 1 ?  false : true);
			singleTaskVitalsTemplate.series[1].data = errorCountDataArray;
            singleTaskVitalsTemplate.series[1].visible = (totalErrorCount == 0 ?  false : true);
			singleTaskVitalsTemplate.series[2].data = p95DataArray;
            singleTaskVitalsTemplate.series[2].visible = (maxSnapCount == 1 ?  false : true);
            if (twsSupportsMax) {
                singleTaskVitalsTemplate.series[3].data = maxDataArray;
                singleTaskVitalsTemplate.series[3].visible = (maxSnapCount == 1 ?  true : false);
            }


//			 console.log(singleTaskVitalsTemplate);
//			 console.log(JSON.stringify(singleTaskVitalsTemplate));
            return singleTaskVitalsTemplate;
        },

        getLatencyHistogram: function(application, task, chartData){
            var i = 0, binsData = [], countAndColourData = [];
			for (i = 0; i < chartData.bins.length; i++) {
				var countAndColor = {};
				if (null != chartData.bins[i])	{
					// singleTaskHistogramTemplate.xAxis.categories should look like ['>1200', '1000-1200' ...]
	            	binsData.push(chartData.bins[i]);
					// console.log(JSON.stringify(singleTaskHistogramTemplate));
	        	}
				if (null != chartData.count[i] && null != chartData.rttZone[i])	{
					// singleTaskHistogramTemplate.series[0].data should look like:
					// [{y: 3, color: '#C92524'}, {y: 9, color: '#D0FEC0'}, {y: 10, color: '#228B22'}]
					countAndColor.y = chartData.count[i];
					if (chartData.rttZone[i] == "Frustrated") {
						countAndColor.color = '#C92524';
					} else if (chartData.rttZone[i] == "Tolerating") {
						countAndColor.color = '#F0AD4E';
					} else if (chartData.rttZone[i] == "Satisfied") {
						countAndColor.color = '#228B22';
					} else {
						console.log("Unexpected Performance Zone")
					}
                    // Extract bin boundary values is not last bin (e.g. '10-20')
                    var binBoundary = chartData.bins[i].split("-");
                    if (binBoundary.length < 2) {
                        // or single value if last bin (e.g. '>720')
                        var lower = chartData.bins[i].replace(/>/g, '');
                        var upper = lower*1000;
                        binBoundary = [lower, lower*1000];
                    }
                    // TODO: latencyHistogram to be extended to supply earliest and latests.
                    // Should not be relying on a another chart to obtain these
                    var timesequenceArraySize = singleTaskVitalsTemplate.series[0].data.length;
                    var earliest = singleTaskVitalsTemplate.series[0].data[0].x;
                    var latestMinus1 = singleTaskVitalsTemplate.series[0].data[timesequenceArraySize-2].x;
                    var latest = singleTaskVitalsTemplate.series[0].data[timesequenceArraySize-1].x;
                    var latestPlus1 = latest + latest - latestMinus1;
                    // http://api.highcharts.com/highcharts#plotOptions.area.point.events.click
                    var url = "#/timeline/1?application=" + application
                        + "&task=" + task
                        + "&earliest=" + earliest
                        + "&latest=" + latestPlus1
                        + "&rtBelow=" + binBoundary[1]
                        + "&rtAbove=" + binBoundary[0]
                    countAndColor.url = url;
	            	countAndColourData.push(countAndColor);
	        	}
			}
			singleTaskHistogramTemplate.xAxis.categories = binsData;
            singleTaskHistogramTemplate.xAxis.title.text = 'Response time range [' + rttUnit + ']',
			singleTaskHistogramTemplate.series[0].data = countAndColourData;
//			 console.log(singleTaskHistogramTemplate);
//			 console.log(JSON.stringify(singleTaskHistogramTemplate));
            return singleTaskHistogramTemplate;
        }  
    }               
});
