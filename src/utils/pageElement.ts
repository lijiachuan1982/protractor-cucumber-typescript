import { ElementFinder, protractor, browser, element, by, WebElementPromise } from "protractor";

export class pageEl{

    byEL: any;
    el!: WebElementPromise;
    index: number = 0;

    constructor(byEl: any){
        this.byEL = byEl;
    }

    EC = protractor.ExpectedConditions;

    async click(){
        try{
            await (await this.getElement()).click();
        }catch(ex){
            throw new Error(ex);
        }
    }

    async sendKeys(text: string){
        try{
            await (await this.getElement()).sendKeys(text);
        }catch(ex){
            throw new Error(ex);
        }
    }

    async getText(): Promise<string>{
        try{
            let text = await (await this.getElement()).getText();
            return text;
        }catch(ex){
            throw new Error(ex);
        }
    }

    async waitForEl(){
        await browser.wait(this.EC.presenceOf(element(this.byEL)), 30000, 'Element didnot found');
    }

    async getElement(): Promise<WebElementPromise>{
        await this.waitForEl();
        if(this.index == 0){
            this.el = element(this.byEL).getWebElement();
        }else{
            this.el = element.all(this.byEL).get(this.index).getWebElement();
        }
        return this.el;
    }

    async getElements(): Promise<ElementFinder[]>{
        await this.waitForEl();
        return element.all(this.byEL).asElementFinders_();
    }

    async size(): Promise<number>{
        return (await this.getElements()).length;
    }

    async get(index: number){
        this.index = index;
        return this;
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