## Tracy Web App

This project provides an APM (Application Performance Management) application. 
The UI is constructed using the [SB Admin](https://github.com/start-angular/sb-admin-angular) template.

## Installation
1. Clone this project or Download that ZIP file
2. Make sure you have [bower](http://bower.io/), [grunt-cli](https://www.npmjs.com/package/grunt-cli) and  [npm](https://www.npmjs.org/) installed globally
3. On the command prompt run the following commands
- cd `project-directory`
- `npm install` - bower install is ran from the postinstall
- `npm start` - a shortcut for `grunt serve`
- `npm run dist` - a shortcut for `grunt serve:dist` to minify the files for deployment

## Version history

### 0.7.0
* Renamed demo applications/tasks

### 0.6.1
* Fixed timeline tooltip incorrect time defect
* Fixed chart update issue (upgraded highcharts-ng to 0.0.11)

### 0.6.0
* Changed tws host from localhost to tws, to support docker deployment

### 0.5.0
* Application title renamed from APM Dashboard to Tracy Web App
* Removed (future) demoApp from menu - until implemented
* Removed SimulatedBatchApp from menu - main focus to be on transactional services
* Renamed war to twa instead of tracy-web-app

### 0.4.0
* Timeline analysis, triggered by latencyHistogram bars

### 0.3.0
Support for maximum response time in Vitals Timechart

### 0.2.0
* Updated Measure/Task to display APDEX rttT in label
* Added Measure>{Application} feature

### 0.1.0
* Added version to the UI
* Changed Latency histogram height from 400px to 300px
* Disallowed vitals chart from showing negative values in the Y axis

### 0.0.1
* Initial version
