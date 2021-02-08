/* eslint-disable no-console, no-process-exit */
const scrape = require('./sources/scrape');
const dedicatedbrand=require('./sources/dedicatedbrand');




async function sandbox (eshop = 'https://www.dedicatedbrand.com/en/') {
  try {
    console.log(`🕵️‍♀️  browsing ${eshop} source`);

    const products = await scrape.scrape(dedicatedbrand);
    console.log(products);
    process.exit(0);
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
}

const [,, eshop] = process.argv;


sandbox();
