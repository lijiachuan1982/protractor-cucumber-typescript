import { pageEl } from "../utils/pageElement";
import { by, ElementFinder } from "protractor"

export class SearchResultPage {
    //Define elements/objects on the page
    resultTags = new pageEl(by.tagName("h3"));

    /**
     * Get search result item list
     * @returns returned result list
     */
    async getResultList() {
        return await this.resultTags.getElements();
    }

    /**
     * Get total number of returned result(on the first result page)
     * @returns Total number of first page's items
     */
    async getResultCount() {
        return await this.resultTags.size();
    }

    /**
     * Get text for a specific item in the result list
     * @param index The index of expected item in the list
     * @returns The text for a specific item in the list
     */
    async getResultText(index: number) {
        //Set the index of the to be checked item
        this.resultTags.index = index;
        return await this.resultTags.getText();
    }
}