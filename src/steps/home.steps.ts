import { Given, When, Then } from '@cucumber/cucumber'
import { browser } from 'protractor'
import { HomePage } from '../pages/homePage'
import * as keyword from '../../testdata/keyword.json'

let homePage: HomePage = new HomePage();

Given("User is in homepage", async () => {
    await browser.get("https://baidu.com")
})

When("User type keyword", async () => {
    const searchKeyword = (<any>keyword).keyword;
    await homePage.searchByKeyword(searchKeyword);
})