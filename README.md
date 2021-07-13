# Functional Automation Test with Protract, Cucumber and Typescript
This repository includes a basic project/framework which is used for functional automation test with Protractor, Cucumber and Typescript, using Visual Studio Code as IDE.

## Prerequisits

You need to install below software/tools before running this application:

- [Java JDK 1.8](https://www.oracle.com/java/technologies/javase/javase-jdk8-downloads.html): to support Selenum server running
- [Node.js TLS version](https://nodejs.org/en/download/): to support protractor running
- [Visual Studio Code](https://code.visualstudio.com/Download): as our development IDE
- [VS Code Extension: Cucumber (Gherkin) Full Support](https://marketplace.visualstudio.com/items?itemName=alexkrechik.cucumberautocomplete): to have the auto-completion for Gherkin language and also associtate Gherkin with step definition

## Quick Start

To quickly experiment how protractor and cucumber works together, you can clone this repository with below command:
```
git clone https://github.com/lijiachuan1982/protractor-cucumber-typescript.git
```
Open this downloaded folder in VS Code, then open one terminal in VS Code(Ctrl+Shift+`).

As protractor is one Node.js application, simply run `npm install` to install needed dependencies.

To run the Selenium Server, we need to use below command to download needed binaries firstly(sometimes it might failed for the first time, re-run it if you encounter errors):
```
.\node_modules\.bin\webdriver-manager update
```
Use below command to start Selenium Server:
```
.\node_modules\.bin\webdriver-manager start
```
If Selenium Server started successfully, below message should be shown in the terminal window:
```
[SeleniumServer.boot] - Selenium Server is up and running on port 4444
```
We need to keep current terminal window for running Selenium Server, so click the "+" icon in the terminal panel to open a new terminal window. In the new terminal window, run `npm test` to start one automation test process, which will open Baidu.com and do a quick search. once the process is done, you should be able to find the report in `reports` folder, and screenshot in the `reports\html\screenshots` folder.

## Behind the Science

If you's like to know more about the underlying tools and technologies, continue reading. In these next sections, we'll walk you through the various aspects of this framework.

### Code structure

Root
+-- .vscode
| +-- settings.json    // VS Code settings about Cucumber support
+-- node_modules       // Dependencies installed by npm install
+-- outputjs           // Output folder stored compiled js files
+-- reports            // Cucumber html reports
+-- src                // Source code
| +--features          // Cucumber features with Gherkin
| +--pages             // Page objects
| +--steps             // Step definitions
| +--utils             // Utility functions
| +--conf.ts           // Protractor and cucumber configuration
| +--reporter.ts       // Cucumber report configurations and functions
| +--timeout.ts        // Cucumber step timeout settings
| +--typings.d.ts      // Typings for .json file to make it as test data
+-- testdata           // Json test data
+-- package.json
+-- README.md
+-- tsconfig.json      // Typescript configurations

### What does the sample test do

The sample test has below three steps to conduct one search in baidu.com:
- Open baidu.com homepage
- Type a keyword in the search textbox and click search button
- Verify all returned items' title include the keyword

### Compile .ts to .js

As we put our source code under `src` folder, so we need to let Typescript know that only compile `.ts` files which are under `src` folder. add below line of code in Typescript configuration file(tsconfig.json), within `compilerOptions` section:

```
"rootDir": "src"
```

Also to seperate oringial `.ts` files from the generated `.js` files to have a better folder struture, add below line of code in `tsconfig.json`, within `compilerOptions` section:
```
"outDir": "outputjs"
``` 

### Angular or Non-Angular website

By default, Protractor treats the website as an Angular website, if you are testing one non-Angular website, below error will be returned:
```
Error: Angular could not be found on the page https://abc.com/. If this is not an Angular application, you may need to turn off waiting for Angular.
Please see 
https://github.com/angular/protractor/blob/master/docs/timeouts.md#waiting-for-angular-on-page-load
```

To resolve this, add below line of code in protractor's config file(conf.ts), within `onPrepare` section:
```
browser.waitForAngularEnabled(false);
```

### 5000 million seconds timeout

By default, Cucumber step uses 5 seconds(5000 million seconds) as the timeout duration, if the step could not be able to complete, below error will be returned:
```
Error: function timed out, ensure the promise resolves within 5000 milliseconds
```

To resolve this, create a new file named `timeout.ts`, with below content which will globally set the timeout duration:
```
import { setDefaultTimeout } from "@cucumber/cucumber"

setDefaultTimeout(60 * 1000);
```

Then in `conf.ts` `cucumberOpts/require` section, add this timeout file, so the new configured timeout will be used for the test.

### Do operation for an element only when it is presented

Current website always using asynchronize technology to load page content dynamically. When we want to operate(click, sendkey, etc.) on one element, we need to ensure that element must be presented/shown on the page.

This problem can be resolved by protractor's `ExpectedConditions` and the `presenceOf` condition. Whenever we want to get one element to operate, browser always wait until that specific element is presented.

This function is coded in the utils file named `pageElement.ts`. And you can refer to sample step definitions about how to use it.

### Cucumber reporting and screenshot

We are using `cucumber-html-reporter` library to generate cucumber reports, and also use `mkdirp` library to create report folder path if that not exist before.

Reporting related functions are defined in `reporter.ts` file, and in `conf.ts`:
- Within `cucumberOpts` section, it specifies report format
- Within `onPrepare` section, it invokes create report folder function `Reporter.createDirectory(outputDir)`
- Within `onComplete` section, it invokes generate report function `Reporter.createHTMLReport()`

Screenshot related functions are defined in `hooks.ts` file and it uses Cucumber's `After` hook. Then in `conf.ts` `cucumberOpts` section, added hook file into the `require` section, so it will be loaded for the project.

### Assertation with Chai

We are using Chai's assertation to determin whether the result is the same as expect.

### Using .json as test data source

To be able to use a Json file as data source, we need to create one `typings.d.ts` and put below content into it:
```
declare module "*.json" {
    const value: any;
    export default value;
}
```

So in the code, simply use `import * as keyword from '../../testdata/keyword.json'` to use the data.