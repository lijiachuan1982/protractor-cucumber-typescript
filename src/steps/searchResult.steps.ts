import { Given, When, Then } from '@cucumber/cucumber'
import { browser, element, ElementFinder, WebElement } from 'protractor'
import { SearchResultPage } from '../pages/searchResultPage'
import { expect } from 'chai'
import * as keyword from '../../testdata/keyword.json'

let resultPage: SearchResultPage = new SearchResultPage();

Then("Each returned item title includes keyword", async () => {
    
    const searchKeyword = (<any>keyword).keyword;
    const resultNumber: number = await resultPage.getResultCount();
    for (let i = 0; i < resultNumber; i++) {
        const title = await resultPage.getResultText(i);
        expect(title.toLowerCase()).to.include(searchKeyword.toLowerCase());
        console.log(await resultPage.getResultText(i));
    }
    await browser.sleep(1000)
})