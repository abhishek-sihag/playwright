import { expect, Page, APIRequestContext } from "@playwright/test";

export class AutoTestPage {
    constructor (private page: Page, private request: APIRequestContext) {}

    name = () => this.page.locator("#name");
    email = () => this.page.locator("#email");
    address = () => this.page.getByLabel('Address:');
    phone = () => this.page.getByPlaceholder('Enter Phone');
    country = () => this.page.getByLabel('Country:');
    female = () => this.page.getByRole('radio', {name: 'Female'});
    tuesday = () => this.page.getByLabel('Tuesday');
    date1 = () => this.page.locator('#datepicker');
    date2 = () => this.page.locator('#txtDate');
    date3start = () => this.page.locator('#start-date');
    date3end = () => this.page.locator('#end-date');
    submit = () => this.page.getByRole("button", {name: 'Submit'}).first();
    singleFile = () => this.page.locator('#singleFileInput');
    uploadSingleFileBtn = () => this.page.locator('button:text("Upload Single File")');
    multipleFiles = () => this.page.locator('#multipleFilesInput');
    uploadMultiFileBtn = () => this.page.locator('button:text("Upload Multiple Files")');
    start = () => this.page.getByRole("button", {name: 'START'});
    stop = () => this.page.getByRole("button", {name: 'STOP'});
    slide = () => this.page.locator("span[class='ui-slider-handle ui-corner-all ui-state-default']").first();
    selectAnItem = () => this.page.getByPlaceholder('Select an item');
    scrollingdropdown = () => this.page.locator('#dropdown');
    scrollingdropdownItem = () => this.page.getByText('Item 40');
    simpleAlert = () => this.page.getByRole('button', {name: 'Simple Alert'});
    conAlert = () => this.page.getByRole('button', {name: 'Confirmation Alert'});
    promptAlert = () => this.page.getByRole('button', {name: 'Prompt Alert'});
    dragEle = () => this.page.locator('#draggable');
    dropEle = () => this.page.locator('#droppable');

    shadowDomBlog = () => this.page.locator('#shadow_host a');
    shadowDomInput = () => this.page.locator("#shadow_host input[type='text']");

    links = () => this.page.locator('a[href]').all();

    async enterName(text: string) {
        await this.name().fill(text);
    }

    async enterCapitalName(text: string) : Promise<string> {
        const arr = text.split('');
        for(const c of arr){
            await this.name().press(`Shift+${c}`);
        }
        return await this.name().inputValue();
    }

    async enterEmail(email: string) {
        await this.email().fill(email);
    }

    async enterPhone(phone: string) {
        await this.phone().fill(phone);
    }

    async enterAddress(text: string) {
        await this.address().fill(text);
    }

    async selectCountry(country: string) {
        await this.country().selectOption(country);
    }

    async clickFemale() {
        await this.female().click();
    }

    async setDate1() : Promise<string> {
        await this.date1().click();
        await this.page.keyboard.press('Enter');
        return this.date1().inputValue();
    }

    async setDate2(dateInput : string) : Promise<string> {
        await this.date2().click();
        const month = dateInput.substring(2, 4);
        //await this.page.pause();
        await this.page.selectOption('.ui-datepicker-month', month);
        await this.page.selectOption('.ui-datepicker-year', dateInput.substring(4));
        const day = ("//*[@id='ui-datepicker-div']//a[text()='")
         .concat(dateInput.substring(0, 2).startsWith('0') ? dateInput.substring(1, 2) : dateInput.substring(0, 2)).concat("']");
        await this.page.locator(day).click();
        return await this.date2().inputValue();
    }

    async setDate3(dateInput : Date) : Promise<string> {
        const date = new Date(dateInput);
        await this.date3start().fill(date.toISOString().split('T')[0], { force: true });
        return await this.date3start().inputValue();
    }

    async setDate3end(dateInput : Date) : Promise<string> {
        const date = new Date(dateInput);
        await this.date3end().fill(date.toISOString().split('T')[0], { force: true });
        return await this.date3end().inputValue();
    }

    async clickSubmit() {
        await this.submit().click();
    }

    async checkTuesday() {
        await this.tuesday().check();
    }

    async uploadSingleFile(file : string) {
        await this.singleFile().setInputFiles(file);
        await this.uploadSingleFileBtn().click();
    }

    async uploadMultipleFile(files : string[]) {
        await this.multipleFiles().setInputFiles(files);
        await this.uploadMultiFileBtn().click();
    }

    async clickStart() {
        await this.start().click();
    }

    async clickStop() {
        await this.stop().click();
    }

    async slidePlease() {
        await this.slide().focus();
        await this.slide().press('ArrowRight');
        await this.slide().press('ArrowRight');
    }

    async clickScrollAndSelect() : Promise<string> {
        await this.selectAnItem().click();
        await this.scrollingdropdownItem().scrollIntoViewIfNeeded();
        await this.scrollingdropdownItem().click();
        return await this.selectAnItem().inputValue();
    }

    async simpleAlertAccept() {
        await this.simpleAlert().click();
        this.page.once('dialog', (a)=>{
            a.accept();
        });
    }

    async conAlertCancel() {
        await this.conAlert().click();
        this.page.once('dialog', (a)=>{
            a.dismiss();
        });
    }

    async promptAlertHandle(value : string) {
        await this.promptAlert().click();
        this.page.once('dialog', (a)=> {
            a.accept(value);
        });
    }

    async clickBlog() {
        await this.shadowDomBlog().click();
    }

    async enterShadowDomText(text: string) {
        await this.shadowDomInput().waitFor();
        await this.shadowDomInput().fill(text);
    }

    async getShadowDomInputValue(): Promise<string> {
        return await this.shadowDomInput().inputValue();
    }

    async dragNdrop() {
        await this.dragEle().dragTo(this.dropEle());
    }

    async brokenLinks(): Promise<number> {
        let count: number = 0;
        const urls = await this.links();
        for(const link of urls) {
            const url = await link.getAttribute('href');
            if (!url || url.startsWith('#') || url.startsWith('mailto:') || url.startsWith('tel:') || url.startsWith('javascript:')) {
                continue;
            }
            const response = await this.request.get(url, {failOnStatusCode: false});
            if(response.status() >= 400) count++;
        }
        return count;
    }

    async routeTest() {
        await this.page.route('**/',  async (route) => {
            await route.fulfill({
                status: 200,
                contentType: 'application/json'
            });
        });
    }
}