import {test} from '@playwright/test';

function longestSub(s: string) : number {
    if(s==null || s.length < 2) { 
        "put longer string";
        return 0;
    }
    const h: string[]  = [];
    let l: number =0;
    for(let i=0; i < s.length; i++){
        if(!h.includes(s.charAt(i))) {
            h[i] = s.charAt(i);
            console.log("String: ", h);
            l++;
        }
        console.log("String: ", h);
    }
    return l;
}

test('coding practice', async ({}) => {
    console.log(longestSub("abcabcbba"));
});