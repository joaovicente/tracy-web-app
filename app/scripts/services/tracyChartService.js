'use strict';
/* Services */

var tracyChartService = 
 angular.module('tracyChartService', ['highcharts-ng']);


var singleTaskApdexTimechart =             
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

     var singleTaskVitalsTemplate = 
        {
            options: {
                chart: {
                    zoomType: 'xy'
                },
                tooltip: {
                    shared: true
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
                labels: {
                    format: '{value}',
                    style: {
                        color: Highcharts.getOptions().colors[2]
                    }
                },
                title: {
                    text: 'Latency (p95)',
                    style: {
                        color: Highcharts.getOptions().colors[2]
                    }
                },
                opposite: true

            }, { // Secondary yAxis
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
                name: 'Latency (p95)',
                type: 'spline',
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
                    text: 'latency range [ms]',
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
                name: 'Count within latency range',
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

tracyChartService.factory('tracyCharts', function(){
    return {
        getSingleTaskApdexTimechart: function(application, task, chartData){
            var i = 0, newData = [];
			for (i = 0; i < chartData.timeSequence.length; i++) {
				if (null != chartData.apdexScores[i])	{
	            	newData.push([chartData.timeSequence[i], chartData.apdexScores[i]]);
	        	}
			}
			singleTaskApdexTimechart.series[0].data = newData;
            singleTaskApdexTimechart.series[0].name = 'APDEX [' + chartData.rttT + chartData.rttUnit + ']';
			// console.log(singleTaskApdexTimechart);
            return singleTaskApdexTimechart;
        },

        getSingleTaskVitalsTimechart: function(application, task, chartData){
        	// console.log(chartData);
            var i = 0, countData = [], errorCountData = [], p95Data = [];
			for (i = 0; i < chartData.timeSequence.length; i++) {
				if (null != chartData.count[i])	{
	            	countData.push([chartData.timeSequence[i], chartData.count[i]]);
	        	}
				if (null != chartData.errors[i])	{
	            	errorCountData.push([chartData.timeSequence[i], chartData.errors[i]]);
	        	}
				if (null != chartData.p95[i])	{
	            	p95Data.push([chartData.timeSequence[i], chartData.p95[i]]);
	        	}
			}
			singleTaskVitalsTemplate.series[0].data = countData;
			singleTaskVitalsTemplate.series[1].data = errorCountData;
			singleTaskVitalsTemplate.series[2].data = p95Data;
			// console.log(singleTaskVitalsTemplate);
			// console.log(JSON.stringify(singleTaskVitalsTemplate));
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
						countAndColor.color = '#D0FEC0';
					} else if (chartData.rttZone[i] == "Satisfied") {
						countAndColor.color = '#228B22';
					} else {
						console.log("Unexpected Performance Zone")
					}
	            	countAndColourData.push(countAndColor);
	        	}
			}
			singleTaskHistogramTemplate.xAxis.categories = binsData;
			singleTaskHistogramTemplate.series[0].data = countAndColourData;
			// console.log(singleTaskHistogramTemplate);
			// console.log(JSON.stringify(singleTaskHistogramTemplate));
            return singleTaskHistogramTemplate;
        }  
    }               
});
