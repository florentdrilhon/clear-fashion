// Invoking strict mode https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Strict_mode#invoking_strict_mode
'use strict';

console.log('🚀 This is it.');

const MY_FAVORITE_BRANDS = [{
  'name': 'Hopaal',
  'url': 'https://hopaal.com/'
}, {
  'name': 'Loom',
  'url': 'https://www.loom.fr'
}, {
  'name': 'ADRESSE',
  'url': 'https://adresse.paris/'
}]

console.table(MY_FAVORITE_BRANDS);
console.log(MY_FAVORITE_BRANDS[0]);





/**
 * 🌱
 * Let's go with a very very simple first todo
 * Keep pushing
 * 🌱
 */

// 🎯 TODO: The cheapest t-shirt
// 0. I have 3 favorite brands stored in MY_FAVORITE_BRANDS variable
// 1. Create a new variable and assign it the link of the cheapest t-shirt
// I can find on these e-shops
// 2. Log the variable

const cheapest_tshirt='https://www.loom.fr/products/le-t-shirt';

console.log(cheapest_tshirt);


/**
 * 👕
 * Easy 😁?
 * Now we manipulate the variable `marketplace`
 * `marketplace` is a list of products from several brands e-shops
 * The variable is loaded by the file data.js
 * 👕
 */

// 🎯 TODO: Number of products
// 1. Create a variable and assign it the number of products
// 2. Log the variable

console.log(marketplace);

const number_of_products=marketplace.length;

console.log(number_of_products);



// 🎯 TODO: Brands name
// 1. Create a variable and assign it the list of brands name only
// 2. Log the variable
// 3. Log how many brands we have

var brands_name=[];

for(var i=0; i<marketplace.length; i++)
{
  // checking if the brand is already in the array
  if(brands_name.includes(marketplace[i].brand)==false) {
  // add the brand if not
  brands_name.push(marketplace[i].brand);
  }
}

console.log(brands_name);
console.log(brands_name.length);

// other solution with "map"
const brandsList=marketplace.map(function(product){
  return product.brand;
})


// 🎯 TODO: Sort by price
// 1. Create a function to sort the marketplace products by price
// 2. Create a variable and assign it the list of products by price from lowest to highest
// 3. Log the variable

// bubble sort function
function sort_by_price(products){
   var len = products.length;
   for (var i = len-1; i>=0; i--){
     for(var j = 1; j<=i; j++){
       if(products[j-1].price>products[j].price){
           var temp = products[j-1];
           products[j-1] = products[j];
           products[j] = temp;
        }
     }
   }
   return products;
}

// make a copy of the marketplace array
var products_by_price=marketplace.slice();

//sort it
sort_by_price(products_by_price);
// log it
console.table(products_by_price);

// other approach using the sorting function of JavaScript

function compareByPrice(a,b){
if (a.price<b.price)
  return -1;
if (a.price>b.price)
  return 1;
return 0
}

var products_by_price2=marketplace.slice();
products_by_price2.sort(compareByPrice);
//console.table(products_by_price2);


// 🎯 TODO: Sort by date
// 1. Create a function to sort the marketplace objects by products date
// 2. Create a variable and assign it the list of products by date from recent to old
// 3. Log the variable

function compareByDate(a,b){
if (new Date(a.date)>new Date(b.date))
  return -1;
if (new Date(a.date)<new Date(b.date))
  return 1;
return 0
}

// make a copy of the marketplace array
var products_by_date=marketplace.slice();

//sort it
products_by_date.sort(compareByDate)
console.table(products_by_date);
// log it




// 🎯 TODO: Filter a specific price range
// 1. Filter the list of products between 50€ and 100€
// 2. Log the list

const specific_price_range=marketplace.filter(product => (product.price>50 && product.price<100));
console.table(specific_price_range);


// 🎯 TODO: Average Basket
// 1. Determine the average basket of the marketplace
// 2. Log the average

//gather the products corresponding to baskets or sneakers
const baskets_list=marketplace.filter(product =>(product.name.toLowerCase().includes("basket")||product.name.toLowerCase().includes("sneaker")));
var average_basket=0
baskets_list.forEach((product, i) => {
  average_basket = average_basket + product.price;
});
average_basket=average_basket/baskets_list.length;
console.log("The average price for baskets in the marketplace is "+average_basket+"€");





/**
 * 🏎
 * We are almost done with the `marketplace` variable
 * Keep pushing
 * 🏎
 */

// 🎯 TODO: Products by brands
// 1. Create an object called `brands` to manipulate products by brand name
// The key is the brand name
// The value is the array of products
//
// Example:
// const brands = {
//   'brand-name-1': [{...}, {...}, ..., {...}],
//   'brand-name-2': [{...}, {...}, ..., {...}],
//   ....
//   'brand-name-n': [{...}, {...}, ..., {...}],
// };
//
// 2. Log the variable
// 3. Log the number of products by brands

var brands = new Object();
marketplace.forEach((product, i) => {
  if(brands[product.brand]){
    brands[product.brand].push(product);
  }
  else {
    brands[product.brand]=[product];
  }
});
console.table(brands.adresse);



// with reduce

/*
const brands=marketplace.reduce((brands,p)=> {
  const brand=brands[p.brand] || []
  brand.push(p)
  brands[p.brand]=brands
  return brands
}, {});

console.log(brands);
*/


// 🎯 TODO: Sort by price for each brand
// 1. For each brand, sort the products by price, from highest to lowest
// 2. Log the sort

console.log("Products from each brand sorted by price :")
// we access the keys of the object brands by calling the function Object.keys(myObject) which returns an array
Object.keys(brands).forEach((brand, i) => {
  // to sort, we reuse the function we defined earlier
  brands[brand].sort(compareByPrice)
  console.table(brands[brand]);
});

// 🎯 TODO: Sort by date for each brand
// 1. For each brand, sort the products by date, from old to recent
// 2. Log the sort

console.log("Products from each brand sorted by date :")
// we access the keys of the object brands by calling the function Object.keys(myObject) which returns an array
Object.keys(brands).forEach((brand, i) => {
  // to sort, we reuse the function we defined earlier
  brands[brand].sort(compareByDate)
  console.table(brands[brand]);
});



/**
 * 💶
 * Let's talk about money now
 * Do some Maths
 * 💶
 */

// 🎯 TODO: Compute the p90 price value
// 1. Compute the p90 price value of each brand
// The p90 value (90th percentile) is the lower value expected to be exceeded in 90% of the products


function p90(products){
  products.sort(compareByPrice);
  let index_p90=Math.trunc(products.length/10); //returns the integer truncature of a number
  return products[index_p90].price;
}

Object.keys(brands).forEach((brand, i) => {
  // to sort, we reuse the function we defined earlier
  console.log("The p90 value for "+brand+" is "+p90(brands[brand])+"€");
});




/**
 * 🧥
 * Cool for your effort.
 * It's almost done
 * Now we manipulate the variable `COTELE_PARIS`
 * `COTELE_PARIS` is a list of products from https://coteleparis.com/collections/tous-les-produits-cotele
 * 🧥
 */

const COTELE_PARIS = [
  {
    link: 'https://coteleparis.com//collections/tous-les-produits-cotele/products/la-baseball-cap-gris',
    price: 45,
    name: 'BASEBALL CAP - TAUPE',
    uuid: 'af07d5a4-778d-56ad-b3f5-7001bf7f2b7d',
    released: '2021-01-11'
  },
  {
    link: 'https://coteleparis.com//collections/tous-les-produits-cotele/products/la-chemise-milleraie-navy',
    price: 85,
    name: 'CHEMISE MILLERAIE MIXTE - NAVY',
    uuid: 'd62e3055-1eb2-5c09-b865-9d0438bcf075',
    released: '2020-12-21'
  },
  {
    link: 'https://coteleparis.com//collections/tous-les-produits-cotele/products/la-veste-fuchsia',
    price: 110,
    name: 'VESTE - FUCHSIA',
    uuid: 'da3858a2-95e3-53da-b92c-7f3d535a753d',
    released: '2020-11-17'
  },
  {
    link: 'https://coteleparis.com//collections/tous-les-produits-cotele/products/la-baseball-cap-camel',
    price: 45,
    name: 'BASEBALL CAP - CAMEL',
    uuid: 'b56c6d88-749a-5b4c-b571-e5b5c6483131',
    released: '2020-10-19'
  },
  {
    link: 'https://coteleparis.com//collections/tous-les-produits-cotele/products/la-chemise-milleraie-beige',
    price: 85,
    name: 'CHEMISE MILLERAIE MIXTE - BEIGE',
    uuid: 'f64727eb-215e-5229-b3f9-063b5354700d',
    released: '2021-01-11'
  },
  {
    link: 'https://coteleparis.com//collections/tous-les-produits-cotele/products/la-veste-rouge-vermeil',
    price: 110,
    name: 'VESTE - ROUGE VERMEIL',
    uuid: '4370637a-9e34-5d0f-9631-04d54a838a6e',
    released: '2020-12-21'
  },
  {
    link: 'https://coteleparis.com//collections/tous-les-produits-cotele/products/la-chemise-milleraie-bordeaux',
    price: 85,
    name: 'CHEMISE MILLERAIE MIXTE - BORDEAUX',
    uuid: '93d80d82-3fc3-55dd-a7ef-09a32053e36c',
    released: '2020-12-21'
  },
  {
    link: 'https://coteleparis.com//collections/tous-les-produits-cotele/products/le-bob-dylan-gris',
    price: 45,
    name: 'BOB DYLAN - TAUPE',
    uuid: 'f48810f1-a822-5ee3-b41a-be15e9a97e3f',
    released: '2020-12-21'
  }
]

// 🎯 TODO: New released products
// // 1. Log if we have new products only (true or false)
// // A new product is a product `released` less than 2 weeks.

// return the difference in days between 2 dates
function dayDiff(d1, d2)
{
  var res= Math.trunc((d1-d2)/86400000);
  return res;
}

let new_release=false;
let current_date= Date.now();
COTELE_PARIS.forEach((product, i) => {
  // check if one of the new releases is within 2 weeks
  if (dayDiff(current_date,new Date(product.released))<14){
    new_release=true;
  }
});

console.log(new_release);






// 🎯 TODO: Reasonable price
// // 1. Log if coteleparis is a reasonable price shop (true or false)
// // A reasonable price if all the products are less than 100€


// 🎯 TODO: Find a specific product
// 1. Find the product with the uuid `b56c6d88-749a-5b4c-b571-e5b5c6483131`
// 2. Log the product


// 🎯 TODO: Delete a specific product
// 1. Delete the product with the uuid `b56c6d88-749a-5b4c-b571-e5b5c6483131`
// 2. Log the new list of product

// 🎯 TODO: Save the favorite product
let blueJacket = {
  'link': 'https://coteleparis.com/collections/tous-les-produits-cotele/products/la-veste-bleu-roi',
  'price': 110,
  'uuid': 'b4b05398-fee0-4b31-90fe-a794d2ccfaaa'
};

// we make a copy of blueJacket to jacket
// and set a new property `favorite` to true
let jacket = blueJacket;
jacket.favorite = true;

// 1. Log `blueJacket` and `jacket` variables
// 2. What do you notice?

blueJacket = {
  'link': 'https://coteleparis.com/collections/tous-les-produits-cotele/products/la-veste-bleu-roi',
  'price': 110,
  'uuid': 'b4b05398-fee0-4b31-90fe-a794d2ccfaaa'
};

// 3. Update `jacket` property with `favorite` to true WITHOUT changing blueJacket properties





/**
 * 🎬
 * The End
 * 🎬
 */

// 🎯 TODO: Save in localStorage
// 1. Save MY_FAVORITE_BRANDS in the localStorage
// 2. log the localStorage
