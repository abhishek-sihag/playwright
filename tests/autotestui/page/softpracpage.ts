import { Page } from "@playwright/test";

export class SoftPracPage {
    constructor(private page: Page){}

    home = () => this.page.locator("a[data-test='nav-home']");
    contact = () => this.page.getByRole('link', {name: 'Contact'});
    boltCutter = () => this.page.getByText('Bolt Cutters');
    addToCart = () => this.page.getByText('Add to Cart');
    sort = () => this.page.locator('[data-test="sort"]');

    async goto() {
        await this.page.goto('https://practicesoftwaretesting.com/');
    }
    
    async clickHome() {
        await this.home().click();
    }

    async clickContact() {
        await this.contact().click();
    }

    async productSort() {
        //await this.page.waitForResponse('**/products?sort**');
        await this.page.pause();
        await this.sort().selectOption('Price (High - Low)');
        await this.page.getByTestId('product-price').first().waitFor({state: 'visible'});
    }

    async addBoltToCart() : Promise<string> {
        await this.boltCutter().click();
        await this.addToCart().click();
        return this.page.getByRole('alert').innerText();
    }

    async routeTest() {
        await this.page.route('**/products?page=1between=price,1,100&is_rental=false', async route => {
            await route.fulfill({
                status: 200,
                contentType: 'application/json'
            });
        });
    }

    async brokenLinks() : Promise<number> {
        const urls = await this.page.getByRole('link').all();
        let bl = 0;
        for(let url of urls){
            let link = await url.getAttribute('href');
            const status = (await this.page.request.get(link!, {failOnStatusCode: false})).status();
            if(status >= 400){
                bl++;
            }
        }
        return bl;
    }
}