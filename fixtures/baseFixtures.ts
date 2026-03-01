import {test as base, Browser, Page} from '@playwright/test';

type MyFixtures = {
    autotest : Browser;
    pracPage : Page;
    softPage : Page;
};


export const test = base.extend<MyFixtures> ({
    autotest : async ({browser}, use) => {
        const context = await browser.newContext();
        const page = await context.newPage(); 
        await page.goto('/');
        //await use(page);
    },

    pracPage : async ({page}, use) => {
        await page.goto('/');
        await use(page);
    },

    softPage : async ({page}, use) => {
        await page.goto('/');
        await use(page);
    }
});

export {expect} from '@playwright/test';