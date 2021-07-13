import { browser, Config } from "protractor"
import { Reporter } from "./reporter"

let path = require("path");
let outputDir = path.join(process.cwd(),"/reports/json");

export let config: Config = {
    framework: 'custom',
    frameworkPath: require.resolve('protractor-cucumber-framework'),
    SELENIUM_PROMISE_MANAGER: false,
    specs: ['../src/features/**/*.feature'],
    cucumberOpts: {
      // require step definitions
      require: [
        'timeout.js',
        'steps/**/*.steps.js',
        'utils/hooks.js'
      ],
      format: "json:../reports/json/cucumber_report.json"
    },
    onPrepare: async () => {
      browser.waitForAngularEnabled(false);
      Reporter.createDirectory(outputDir);
    },
    onComplete: () => {
      Reporter.createHTMLReport();
    }
}