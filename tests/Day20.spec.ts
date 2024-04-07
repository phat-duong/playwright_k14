import { test } from '@playwright/test';
import { timeout } from '../playwright.config';

test('Handle dropdown option', async ({ page }) => {
    await page.goto('https://the-internet.herokuapp.com/dropdown')

    //target the dropdown element
    const dropdownEle = await page.locator('#dropdown');

    //Select option 1
    await dropdownEle.selectOption({ index: 1 });

    await page.waitForTimeout(3000);

    //Select option 2
    await dropdownEle.selectOption({ value: '2' });

    //debug purpose only
    await page.waitForTimeout(3000);
})

test.only('Handle iFrame', async ({ page }) => {
    await page.goto('https://the-internet.herokuapp.com/iframe')

    //target the iFrame using frameLocator
    const iframeEle = await page.frameLocator('iframe[id^="mce"]');

    //Find edit text area in the iframe
    const editTextAreaEle = await iframeEle.locator('body p');

    //clear then input the new content
    await editTextAreaEle.click();
    await editTextAreaEle.clear();
    await editTextAreaEle.fill('New Content');

    //interact with the main frame's elements
    const footerPowerByLinkEle = await page.locator('a:has-text("Element")');
    await footerPowerByLinkEle.click();


    //debug purpose only
    await page.waitForTimeout(3000);
})


test.only('Mouse hover and narrowdown searching scope ', async ({ page }) => {
    await page.goto('https://the-internet.herokuapp.com/hovers');

    //find all figures
    const allFigureEles = await page.locator('.figure').all();

    //loop all the figures 
    for (const figureEle of allFigureEles) {
        //and narrowdown searching scope
        const imgEle = await figureEle.locator('img');

        const usernameEle = await figureEle.locator('h5');
        const viewProfileHyperLinkEle = await figureEle.locator('a');
        const isUsernameVisible = await usernameEle.isVisible();
        const isViewProfileHyperLinkVisible = await viewProfileHyperLinkEle.isVisible();

        console.log(`isUsernameVisileBefore: ${isUsernameVisible}`);
        console.log(`isViewProfileHyperLinkVisibleBefore: ${isViewProfileHyperLinkVisible}`);

        //mouse hover
        await imgEle.hover();
        const isUsernameVisibleAfter = await usernameEle.isVisible();
        const isViewProfileHyperLinkVisibleAfter = await viewProfileHyperLinkEle.isVisible();

        console.log(`isUsernameVisibleAfter: ${isUsernameVisibleAfter}`);
        console.log(`isViewProfileHyperLinkVisibleAfter: ${isViewProfileHyperLinkVisibleAfter}`);

        console.log('\n\n')
        //debug purpose only
        await page.waitForTimeout(3000);
    }

})


test.only('Checking element status and handle dynamic states', async ({ page }) => {
    await page.goto('https://the-internet.herokuapp.com/dynamic_controls');

    //locate 2 parent components
    const checkboxComp = await page.locator('#checkbox-example');
    const inputExampleComp = await page.locator('#input-example');

    //interact with the checkbox component
    const checkboxEle = await page.locator('#checkbox input');
    const isEnabled = await checkboxEle.isEnabled();
    let isSelected = await checkboxEle.isChecked();

    console.log(`Is checkbox enabled: ${isEnabled}`);
    console.log(`Is checkbox selected: ${isSelected}`);

    if (!isSelected) {
        await checkboxEle.click();
    }

    let isSelectedAfter = await checkboxEle.isChecked();
    console.log(`Is checkbox selected after selecting: ${isSelectedAfter}`);
    if (!isSelectedAfter) {
        await checkboxEle.click();
    }

    const removeBtnEle = await checkboxComp.locator('button');
    await removeBtnEle.click();
    await page.waitForSelector('#checkbox-example #checkbox input', { state: 'hidden', timeout: 5 * 1000 })


})