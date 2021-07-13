import { browser, Config } from "protractor"
import { Reporter } from "./reporter"

let path = require("path");
let outputDir = path.join(process.cwd(),"/reports/json");

export let config: Config = {
    framework: 'custom',
    frameworkPath: require.resolve('protractor-cucumber-framework'),
    SELENIUM_PROMISE_MANAGER: false,
    specs: ['../src/features/**/*.feature'],  //Feature files
    cucumberOpts: {
      // require step definitions
      require: [
        'timeout.js',  //Global timeout settings
        'steps/**/*.steps.js',  //Step definition files
        'utils/hooks.js'  //Screen creation function
      ],
      format: "json:../reports/json/cucumber_report.json"  //Cucumber reporting format
    },
    onPrepare: async () => {
      browser.waitForAngularEnabled(false);  //Only needed when testing one Non-Angular website
      Reporter.createDirectory(outputDir);  //Create reporting folder
    },
    onComplete: () => {
      Reporter.createHTMLReport();  //Generate cucumber report
    }
}