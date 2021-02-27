'use strict'
const cheerio = require('cheerio');

const url = 'https://adresse.paris/';


const get_categories = data => {
  const $ = cheerio.load(data);
  let res={};
  $('.cbp-links.cbp-valinks a').map((i,element) =>{
    //getting the link
    const link=$(element)
    .attr('href');
    //getting the name of the category
    const category = $(element)
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
const parse = (data,category) => {
  const $ = cheerio.load(data);

  return  $('.product-container')
    .map((i, element) => {
      const name = $(element)
        .find('.versionpc .product-name')
        .text()
        .trim();

      const price = parseInt(
         $(element)
            .find('.product-price')
            .text()
        );
      const link = $(element)
        .find('.versionpc .product-name')
        .attr('href')
      const image =$(element)
        .find('.replace-2x.img-responsive.lazy.img_0.img_1e')
        .attr('data-original')
    return {name, price, link, category, image};
    })
    .get();
};



module.exports = {get_categories, parse, url};
