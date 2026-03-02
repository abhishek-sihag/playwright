import { test, expect } from '../../fixtures/ApiFixtures';
import Ajv from 'ajv';
import * as schema from './schema/product.json'; // Import your schema

//For schema validation
const ajv = new Ajv();

test.describe('API Automation', () => {
    test('API get Method', async ({ getApiRes }) => {
        const json = getApiRes;
        const validate = ajv.compile(schema);
        const isValid = validate(json);
        expect(isValid).toBe(true);
        console.log(json.id);
        expect(json.id).toBe(1);
    });

    test('Path param', async ({apiContext}) => {
        const product = 1;
        const res = await apiContext.get(`https://fakestoreapi.com/products/${product}`);
        expect(res.status()).toBe(200);
        const body = await res.json();
        expect(body.id).toEqual(1);
    });

    test.skip('Query param', async ({apiContext}) => {
        const res = await apiContext.get('https://reqres.in/api/users', 
            {
                params: {
                    page: 2
                }
            }
        );
        expect(res.status()).toBe(403);
        const body = await res.json();
        expect(body.id).toEqual(1);
    });

    test('API getAll Method', async ({ getAll }) => {
        const json = getAll[3];
        console.log(json.title);
        expect(json.title).toEqual('Mens Casual Slim Fit');
    });

    test('Add new product', async({ postProduct }) => {
        const code = postProduct;
        console.log(code);
        expect(code).toBe(201);
    });
});