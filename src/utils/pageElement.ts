import { ElementFinder, protractor, browser, element, by, WebElementPromise } from "protractor";

export class pageEl{

    byEL: any;
    el!: WebElementPromise;
    index: number = 0;  //Only be useful when get array of elements, default as 0

    constructor(byEl: any){
        this.byEL = byEl;
    }

    EC = protractor.ExpectedConditions;

    /**
     * Click one element
     */
    async click(){
        try{
            await (await this.getElement()).click();
        }catch(ex){
            throw new Error(ex);
        }
    }

    /**
     * Set text for one element
     * @param text The text to be set
     */
    async sendKeys(text: string){
        try{
            await (await this.getElement()).sendKeys(text);
        }catch(ex){
            throw new Error(ex);
        }
    }

    /**
     * Get text of one element
     * @returns Text of one element
     */
    async getText(): Promise<string>{
        try{
            let text = await (await this.getElement()).getText();
            return text;
        }catch(ex){
            throw new Error(ex);
        }
    }

    /**
     * Wait for one element until it is presented/shown on the page, for 1 minute, if the element is not shown on page, it will timeout
     */
    async waitForEl(){
        await browser.wait(this.EC.presenceOf(element(this.byEL)), 60000, 'Element didnot found');
    }

    /**
     * Get one specific element
     * @returns One specific element
     */
    async getElement(): Promise<WebElementPromise>{
        // Wait until element(s) presented/shown
        await this.waitForEl();
        if(this.index == 0){
            this.el = element(this.byEL).getWebElement();
        }else{
            // Get the specific element in the group
            this.el = element.all(this.byEL).get(this.index).getWebElement();
        }
        return this.el;
    }

    /**
     * Get a group of elements, use element.all
     * @returns A group of elements
     */
    async getElements(): Promise<ElementFinder[]>{
        await this.waitForEl();
        return element.all(this.byEL).asElementFinders_();
    }

    /**
     * Get the number of a group of elements
     * @returns Size of elements group
     */
    async size(): Promise<number>{
        return (await this.getElements()).length;
    }

    async getId(){
        return (await this.getElement()).getId();
    }

    async selectByOptionText(text: string){
        try{
            await (await this.getElement()).findElement(by.xpath('option[.= "' + text + '"]')).click();
        }
        catch(ex){
            throw new Error(ex);
        }
    }


}