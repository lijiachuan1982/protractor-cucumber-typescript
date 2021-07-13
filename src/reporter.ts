import * as  fs from "fs";
let mkdirp = require("mkdirp");
let path = require("path");
let reporter = require("cucumber-html-reporter");

//Define report path
const jsonReports = path.join(process.cwd(),"/reports/json");
const htmlReports = path.join(process.cwd(),"/reports/html");
const targetJson = path.join(jsonReports + "/cucumber_report.json");

const cucumberReporterOptions = {
  jsonFile: targetJson,
  output: htmlReports + "/cucumber_reporter.html",
  screenshotsDirectory: htmlReports + "/screenshots/",
  storeScreenshots: true,
  reportSuiteAsScenarios: true,
  theme: "bootstrap"
}

/**
 * Reporting class
 */
export class Reporter {

  /**
   * Create reporting folder path
   * @param dir Target reporting folder path
   */
  public static createDirectory(dir: string) {
    // If the folder is not exist, then create it
    if (!fs.existsSync(dir)) {
      mkdirp.sync(dir);
    }
  }

  /**
   * Generate cucumber report
   */
  public static createHTMLReport() {
    try {
      reporter.generate(cucumberReporterOptions);
    } catch(err) {
      if (err) {
        throw new Error("Failed to save cucumber test results to json file." + err)
      }
    }
  }
}