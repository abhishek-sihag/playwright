import {test, expect} from '../../fixtures/baseFixtures';
import { AutoTestPage } from './page/autotestprac';
import {readExcel} from '../../utils/excelReader';

const testData = readExcel('test-data/form_data_20_rows.xlsx');

// test.describe('Auto Test Practice', () => {
//     testData.forEach((data: any, index: number) => {
//         test(`Auto Test #${index+1} - #${data.name}`, async ({pracPage}) => {
//             const autotestprac = new AutoTestPage(pracPage);
//             await autotestprac.enterName(data.name);
//             await autotestprac.enterEmail(data.email);
//             await autotestprac.enterAddress(data.address);
//             await autotestprac.enterPhone(data.phone);
//             await autotestprac.selectCountry(data.country);
//             await autotestprac.clickStart();
//             await autotestprac.clickStop();
//             await autotestprac.clickSubmit();
//             await autotestprac.slidePlease();
//             expect(await autotestprac.clickScrollAndSelect()).toBeTruthy();
//             await autotestprac.enterShadowDomText(data.shadowDom);
//             console.log(await autotestprac.getShadowDomInputValue());
//             await autotestprac.clickBlog();
//         });
//     });
// });

test.describe('Auto Test Practice', () => {
    test('Auto Test 1', async ({pracPage, request}) => {
        const autotestprac = new AutoTestPage(pracPage, request);
        await autotestprac.enterName('Aparik');
        await autotestprac.enterEmail('aprik@gmail.com');
        await autotestprac.enterAddress('101 Boston US 11123');
        await autotestprac.enterPhone('+19898989');
        await autotestprac.clickFemale();
        await autotestprac.checkTuesday();
        await autotestprac.selectCountry('India');
        await autotestprac.clickStart();
        await autotestprac.clickStop();
        console.log(await autotestprac.setDate1());
        const d2 = await autotestprac.setDate2('03112027');
        console.log(d2);
        const date = new Date();
        const d3 = await autotestprac.setDate3(date);
        console.log(d3);
        date.setDate(date.getDate() + 5);
        const d3end = await autotestprac.setDate3end(date);
        console.log(d3end);
        await autotestprac.clickSubmit();
        await autotestprac.uploadSingleFile('test-data/form_data_20_rows.xlsx');
        await autotestprac.uploadMultipleFile(['test-data/form_data_20_rows.xlsx','test-data/test.txt']);
        await autotestprac.slidePlease();
        await autotestprac.dragNdrop();
        await autotestprac.simpleAlertAccept();
        await autotestprac.conAlertCancel();
        await autotestprac.promptAlertHandle('My test');
        const s = await autotestprac.clickScrollAndSelect();
        console.log(s);
        await autotestprac.enterShadowDomText('Shadow dom');
        console.log(await autotestprac.getShadowDomInputValue());
        //console.log(await autotestprac.brokenLinks());
        await autotestprac.clickBlog();
    });
});