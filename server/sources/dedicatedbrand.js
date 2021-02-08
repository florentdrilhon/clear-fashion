const axios = require('axios');
const cheerio = require('cheerio');


const get_categories = data => {
  const $ = cheerio.load(data);
  let res=[];
  $('.mainNavigation-link-subMenu-link--image > a[href*="en/men"]').map((i,element) =>{
    const category=$(element)
    .attr('href');
    res.push('https://www.dedicatedbrand.com'+category+'#page=1000');
  });
  return res;
};

/**
 * Parse webpage e-shop
 * @param  {String} data - html response
 * @return {Array} products
 */
const parse = data => {
  const $ = cheerio.load(data);

  return $('.productList-container .productList')
    .map((i, element) => {
      const name = $(element)
        .find('.productList-title')
        .text()
        .trim()
        .replace(/\s/g, ' ');
      const price = parseInt(
        $(element)
          .find('.productList-price')
          .text()
      );

      return {name, price};
    })
    .get();
};


/*

module.exports.scrape_products= async url => {
  const response = await axios(url);
  const {data, status} = response;
  if (status >= 200 && status < 300) {
    return parse(data);
  }

  console.error(status);
  return null;
};

*/


/**
 * Scrape all the products for a given url page
 * @param  {[type]}  url
 * @return {Array|null}
 */


/*
module.exports.scrape_categories = async url => {
  const response = await axios(url);
  const {data, status} = response;
  if (status >= 200 && status < 300) {
    return categories(data);
  }
  console.error(status);
  return null;
}; */



module.exports = {get_categories, parse};
