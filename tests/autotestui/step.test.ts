import {test, expect, Page} from '@playwright/test';

test.describe('Test', () => {
    test.beforeEach('Before each', async ({page}) => {
        await page.goto('https://practicesoftwaretesting.com/');
    });

    async function sortPro(page: Page){
    await page.locator('[data-test="sort"]').selectOption('Price (High - Low)');
    }

    test('step 1', async ({page}) => {
        await sortPro(page);
    });

    async function productPrice(page: Page) {
        await sortPro(page);
        await expect(page.locator('[data-test="product-price"]').first()).toBeVisible();
        await expect(page.locator('[data-test="product-price"]').first()).toHaveText('$89.55');
    }

    test('step 2', async ({page}) => {
        await sortPro(page);
        await expect(page.locator('[data-test="product-price"]').first()).toBeVisible();
        await expect(page.locator('[data-test="product-price"]').first()).toHaveText('$89.55');
    });

    test('step 3', async ({page}) => {
        await productPrice(page);
        await expect(page.locator('[data-test="co2-rating-badge"]').first()).toBeVisible();
        await page.locator('[data-test="co2-rating-badge"]').first().hover();
        await expect(page.getByTitle('A = most environmentally friendly, E = higher environmental impact').first()).toBeVisible();
    });
});