import { test } from '@playwright/test';

test('Login Test', async ({ page }) => {

    await page.goto("https://playwright.dev");

    //debug purpose only
    await page.waitForTimeout(3000);

    await page.close();

})