import { Given, When, Then } from '@cucumber/cucumber'
import { browser, element, ElementFinder, WebElement } from 'protractor'
import { SearchResultPage } from '../pages/searchResultPage'
import { expect } from 'chai'
import * as keyword from '../../testdata/keyword.json'

let resultPage: SearchResultPage = new SearchResultPage();

Then("Each returned item title includes keyword", async () => {
    
    // Get the search keyword from test data file
    const searchKeyword = (<any>keyword).keyword;
    // Get the total number of first result page
    const resultNumber: number = await resultPage.getResultCount();

    for (let i = 0; i < resultNumber; i++) {
        // Get text for this item
        const title = await resultPage.getResultText(i);
        // Assertation with Chai's expect
        expect(title.toLowerCase()).to.include(searchKeyword.toLowerCase());
        // Output the text for verification purpose, is not a required step
        console.log(await resultPage.getResultText(i));
    }
    // Make browser stay for 1 second for verification purpose, is not a required step
    await browser.sleep(1000)
})