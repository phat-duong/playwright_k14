import { test } from '@playwright/test';

test('Link Text - XPATH', async ({ page }) => {

    await page.goto("https://the-internet.herokuapp.com/");
    const footerLinkEle = await page.waitForSelector('//a[contains(text(),"Elemental")]', { timeout: 10000 });
    await footerLinkEle.click();

    //debug purpose only
    await page.waitForTimeout(3000);

    await page.close();

})

test.only('Link Text - CSS', async ({ page }) => {

    await page.goto("https://the-internet.herokuapp.com/");
    const footerLinkEle = await page.locator('a:has-text("Elemental")');
    await footerLinkEle.click();

    //debug purpose only
    await page.waitForTimeout(3000);

    await page.close();

})

test.only('Link Text - Filtering', async ({ page }) => {

    await page.goto("https://the-internet.herokuapp.com/");
    const footerLinkEle = await page.locator('a').filter({ hasText: "Elemental" });
    await footerLinkEle.scrollIntoViewIfNeeded();

    await footerLinkEle.click();

    //debug purpose only
    await page.waitForTimeout(3000);

    await page.close();

})

test.only('Multiple Matching', async ({ page }) => {

    await page.goto("https://the-internet.herokuapp.com/");
    const footerLinkEles = await page.locator('a').elementHandles();
    await footerLinkEles[10].click();

    //debug purpose only
    await page.waitForTimeout(3000);

    await page.close();

})

test.only('Hanlde Login form', async ({ page }) => {

    await page.goto("https://the-internet.herokuapp.com/");

    //Navigate to login form
    await page.locator('a').filter({ hasText: "" }).click();
    await page.waitForLoadState("domcontentloaded");

    //form interaction
    await page.locator("#username").fill("teo@sth.com");
    await page.locator("#password").fill("123456");

    await page.waitForTimeout(3000);

    await page.locator('button[type="submit"]').click();
    await page.waitForLoadState("domcontentloaded");

    //debug purpose only
    await page.waitForTimeout(3000);

    await page.close();

})

test.only('Element get text', async ({ page }) => {

    await page.goto("https://the-internet.herokuapp.com/");

    //Navigate to login form
    await page.locator('a').filter({ hasText: "" }).click();
    await page.waitForLoadState("domcontentloaded");

    //form interaction
    await page.locator("#username").fill("teo@sth.com");
    await page.locator("#password").fill("123456");

    await page.waitForTimeout(3000);

    await page.locator('button[type="submit"]').click();
    await page.waitForLoadState("domcontentloaded");

    //Get text
    const textContent = await page.locator('h4').textContent();
    const innerText = await page.locator('h4').innerText();

    console.log(textContent);
    console.log(innerText);

    //debug purpose only
    await page.waitForTimeout(3000);

    await page.close();

})