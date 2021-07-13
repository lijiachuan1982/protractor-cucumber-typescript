import { Given, When, Then } from '@cucumber/cucumber'
import { browser } from 'protractor'
import { HomePage } from '../pages/homePage'
import * as keyword from '../../testdata/keyword.json'

let homePage: HomePage = new HomePage();

Given("User is in homepage", async () => {
    // Open the website
    await browser.get("https://baidu.com")
})

When("User type keyword", async () => {
    //Load search key word from one test data file
    const searchKeyword = (<any>keyword).keyword;
    await homePage.searchByKeyword(searchKeyword);
})