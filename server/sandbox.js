'use strict';

const scraper = require('./sources/scrape');
const dedicatedbrand=require('./sources/dedicatedbrand');
const adress=require('./sources/adress');
const mudjeans=require('./sources/mudjeans');
const mongo=require('./database/index');
require('dotenv').config();


const MONGODB_URI=process.env.MONGODB_URI;
const MONGODB_DB_NAME=process.env.MONGODB_DB_NAME;


// function to use the scraper for a given brand
async function sandbox (brand) {
  try {

    console.log(`🕵️‍♀️  browsing ${brand.url} source`);
    // trying to scrape the url of the brand
    const products = await scraper.scrape(brand);
    // returning result
    return products
  } catch (e) {
    // if error, exiting the program
    console.error(e);
    process.exit(1);
  }
}

const [,, eshop] = process.argv;


let brands=[dedicatedbrand, adress, mudjeans];

// main function to orchestrate the scrapping

async function main() {
  let res=[]
  // initialization of the database connection
  const mongocluster=new mongo(MONGODB_URI, MONGODB_DB_NAME);
  await mongocluster.removeProducts({});
  
  // scraping the products from the brands
  await scraper.asyncForEach(brands, async (brand)=>{
    const products=await sandbox(brand);
    console.log(`Scraped ${products.length} products`);
    // storing the products in an array
    res=res.concat(products);
  });
  // scrapping finish, inserting the array of products in the DB
  console.log("Products scrapped, storing in the database");
  await mongocluster.insert(res);
  await mongocluster.close();
  process.exit(1);
}

main();

