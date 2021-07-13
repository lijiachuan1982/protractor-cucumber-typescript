import { pageEl } from "../utils/pageElement";
import { by } from "protractor"

export class HomePage {
    searchBox = new pageEl(by.id("kw"));
    searchButton = new pageEl(by.id("su"));

    async searchByKeyword(keyword: string) {
        await this.searchBox.sendKeys(keyword);
        await this.searchButton.click();
    }
}