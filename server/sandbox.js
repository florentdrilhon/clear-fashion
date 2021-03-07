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


function storeProducts(products) {
  let data=JSON.stringify(products);
  // checking if the file already exist
  fs.stat('./database/products.json', function (err, stats) {
 
    if (err) {
        //the file does not exist, create it
          fs.writeFile("./database/products.json", data, function(error){
          if(error){console.log(error);}
          console.log("Products successfully added in the file");
        })
        return console.error(err);
    }
    // the file does exists, deleting it to avoid doublons when scraping several times
    fs.unlink('./database/products.json',function(err){
         if(err) return console.log(err);
         console.log('file deleted successfully');
         fs.writeFile("database/products.json", data, function(error){
          if(error){console.log(error);}
          console.log("Products successfully added in the file");
        })
         
    });  
 });}


async function main() {
  let res=[]

  await scraper.asyncForEach(brands, async (brand)=>{
    const products=await sandbox(brand);
    console.log(products.length);
    res=res.concat(products);
  });
  console.log("Products scrapped, storing in a JSON file");
  storeProducts(res);
}

main();

