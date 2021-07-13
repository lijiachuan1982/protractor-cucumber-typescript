import { pageEl } from "../utils/pageElement";
import { by } from "protractor"

export class HomePage {
    //Define elements/objects on the page
    searchBox = new pageEl(by.id("kw"));
    searchButton = new pageEl(by.id("su"));

    /**
     * Search with keyword
     * @param keyword 
     */
    async searchByKeyword(keyword: string) {
        await this.searchBox.sendKeys(keyword);
        await this.searchButton.click();
    }
}