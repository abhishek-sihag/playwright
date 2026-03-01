import {test as base, request, APIRequestContext} from '@playwright/test';

interface Rating  {
    rate : number;
    count : number;
};
interface Product  { //or use: type Product = {}
    id : number;
    title : string;
    description : string;
    category : string;
    image : string;
    rating : Rating;
};

interface NewProduct  {
    id : number;
    title : string;
    description : string;
    category : string;
    image : string;
};

type ApiFix = {
    apiContext : APIRequestContext;
    getApiRes : Product;
    getAll : Product[];
    postProduct : number;
};

export const test = base.extend<ApiFix> ({
    apiContext : async ({}, use) => {
        const api = await request.newContext();
        await use(api);
    },

    getApiRes : async ({apiContext}, use) => {
        const res = await apiContext.get('https://fakestoreapi.com/products/1');
        await use(await res.json());
    },

    getAll : async ({apiContext}, use) => {
        const res = await apiContext.get('https://fakestoreapi.com/products');
        await use(await res.json());
    },

    postProduct : async ({apiContext}, use) => {
        const res = await apiContext.post('https://fakestoreapi.com/products', {
            data: {
                "id": 24,
                "title": "MyProd",
                "price": 0.12,
                "description": "string",
                "category": "string",
                "image": "http://example.com/asd"
            }
            }
        );
        await use(await res.status());
    },
});

export {expect} from '@playwright/test';