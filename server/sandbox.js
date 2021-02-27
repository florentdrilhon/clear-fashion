/* eslint-disable no-console, no-process-exit */
const scraper = require('./sources/scrape');
const dedicatedbrand=require('./sources/dedicated2');
const adress=require('./sources/adress');
const mudjeans=require('./sources/mudjeans');




async function sandbox (eshop) {
  try {
    console.log(`🕵️‍♀️  browsing ${eshop.url} source`);

    const products = await scraper.scrape(eshop);
    return products
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
}

const [,, eshop] = process.argv;


let brands=[dedicatedbrand, adress, mudjeans];

let res={}

scraper.asyncForEach(brands, async (brand)=>{
    const products=await sandbox(brand);
    console.log(products.length);
    res[brand.url]=products;
})

console.log(Object.keys(res));

