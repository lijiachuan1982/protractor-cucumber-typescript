# protractor-cucumber-typescript
This repository includes a basic project which is used for functional automation test with Protractor, Cucumber and Typescript, using Visual Studio Code as IDE.

# Prerequisits

You need to install below software/tools before running this application:

- [Java JDK 1.8](https://www.oracle.com/java/technologies/javase/javase-jdk8-downloads.html): to support Selenum server running
- [Node.js TLS version](https://nodejs.org/en/download/): to support protractor running
- [Visual Studio Code](https://code.visualstudio.com/Download): as our development IDE
- [VS Code Extension: Cucumber (Gherkin) Full Support](https://marketplace.visualstudio.com/items?itemName=alexkrechik.cucumberautocomplete): to have the auto-completion for Gherkin language and also associtate Gherkin with step definition

# Quick Start

To quickly experiment how protractor and cucumber works together, you can clone this repository with below command:
```
git clone https://github.com/lijiachuan1982/protractor-cucumber-typescript.git
```
Open this downloaded folder in VS Code, then open one terminal in VS Code(Ctrl+Shift+`).

As protractor is one Node.js application, simply run `npm install` to install needed dependencies.

To run the Selenium Server, we need to use below command to download needed binaries firstly:
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