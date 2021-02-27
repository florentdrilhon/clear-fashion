'use strict'
const cheerio = require('cheerio');

const url = 'https://mudjeans.eu/';


const get_categories = data => {
  const $ = cheerio.load(data);
  let res={};
  $('.header-nav-link.level-3[href*="/collections/men-buy"]').map((i,element) =>{
    //getting the link
    const link='https://mudjeans.eu'+$(element)
    .attr('href');
    //getting the name of the category
    const category = $(element)
    .find('span')
    .text()
    
    res[category.toString()]=link;
  });
  return res;
};

/**
 * Parse webpage e-shop
 * @param  {String} data - html response
 * @return {Array} products
 */
const parse = (data,category=null) => {
  const $ = cheerio.load(data);

  return  $('.product-link.product-link__grid')
    .map((i, element) => {
      const name = $(element)
        .find('.product-title > a')
        .text()
        .trim();

      const price = parseInt(
         $(element)
            .find('p.product-price')
            .text()
            .replace(/Buy€/g, '')
            .replace(/\n/g, '')
      );
        
      const link = 'https://mudjeans.eu' + $(element)
        .find('.product-title > a')
        .attr('href')
      const image =$(element)
        .find('img')
        .attr('src')
       
    return {name, price,link,image};
    })
    .get();
};



module.exports = {get_categories, parse, url};