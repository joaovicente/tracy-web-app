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

### 0.0.1
* Initial version

### 0.1.0
* Added version to the UI
* Changed Latency histogram height from 400px to 300px
* Disallowed vitals chart from showing negative values in the Y axis

### 0.2.0
* Updated Measure/Task to display APDEX rttT in label
* Added Measure>{Application} feature
