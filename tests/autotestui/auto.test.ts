import {test, expect} from '../../fixtures/baseFixtures';
import { SoftPracPage } from './page/softpracpage';

test.describe('Test', () => {

    test('Auto Test', async ({softPage}) => {
        const ap = new SoftPracPage(softPage);
        await ap.routeTest();
        await ap.clickHome();
    });

    test('step 2', async ({softPage}) => {
        const ap = new SoftPracPage(softPage);
        console.log(await ap.brokenLinks());
        //await ap.productSort();
        //await ap.clickContact();
        console.log(await ap.addBoltToCart());
    });
});