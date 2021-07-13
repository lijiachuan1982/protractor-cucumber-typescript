import { pageEl } from "../utils/pageElement";
import { by, ElementFinder } from "protractor"

export class SearchResultPage {
    resultTags = new pageEl(by.tagName("h3"));

    async getResultList() {
        return await this.resultTags.getElements();
    }

    async getResultCount() {
        return await this.resultTags.size();
    }

    async getResultText(index: number) {
        this.resultTags.index = index;
        return await this.resultTags.getText();
    }
}