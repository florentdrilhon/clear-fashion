'use strict';
const cheerio = require('cheerio');
const url = 'https://adresse.paris/630-toute-la-collection';
const {'v5': uuidv5} = require('uuid');


const get_categories = data => {
  // getting all the categories instead of "toute la collection" because
  // it makes it easier to get the category names
  const $ = cheerio.load(data);
  let res={};
  $('.col-xs-4.cbp-menu-column.cbp-menu-element.menu-element-id-2.typeContent_3 .cbp-links.cbp-valinks a').map((i,element) =>{
    //getting the link
    const link=$(element)
    .attr('href');
    //getting the name of the category
    const category = $(element)
    .text()
    
    //storing the result in an object
    res[category.toString()]=link;
  });
  // removing the last categories because it's "toute la collection"
  delete res["Toute la collection"];
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
      const brand = 'Adresse'
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
      if(brand && name && price && link && image && category){
        return {brand, name, price, link, image, category,'_id' : uuidv5(link, uuidv5.URL)};
      } return null 
    })
    .get();
};


module.exports = {get_categories, parse, url};
