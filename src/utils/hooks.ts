import { After } from "@cucumber/cucumber";
import { browser } from "protractor";

After(async function() {
    const screenshot = await browser.takeScreenshot();
    const image = Buffer.alloc(screenshot.length, screenshot, 'base64');
    await this.attach(image, "image/png");
})