'use strict';

const scraper = require('./sources/scrape');
const dedicatedbrand=require('./sources/dedicatedbrand');
const adress=require('./sources/adress');
const mudjeans=require('./sources/mudjeans');
const fs=require('fs');




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

async function main() {
  let res=[]

  await scraper.asyncForEach(brands, async (brand)=>{
    const products=await sandbox(brand);
    console.log(products.length);
    res=res.concat(products);
  });
console.log(res.length);
}

main();

