// Invoking strict mode https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Strict_mode#invoking_strict_mode
'use strict';

// current products on the page
let currentProducts = [];
let currentPagination = {};

//new objects for the features
let currentBrands=new Object();
let currentFilter={price:false, release:false, brand:"all"};


// inititiqte selectors
const selectShow = document.querySelector('#show-select');
const selectPage = document.querySelector('#page-select');
const selectBrand=document.querySelector('#brand-select');
const filterPrice=document.querySelector('#reasonable-price');
const filterRelease=document.querySelector('#recently-released');
const selectSort=document.querySelector('#sort-select');
const sectionProducts = document.querySelector('#products');
const spanNbProducts = document.querySelector('#nbProducts');

/**
 * Set global value
 * @param {Array} result - products to display
 * @param {Object} meta - pagination meta info
 */

const setCurrentProducts = ({result, meta}) => {
  currentProducts = result;
  currentPagination = meta;
  let brands= new Object();
  currentProducts.forEach((product, i) => {
    if(brands[product.brand]){
      brands[product.brand].push(product);
    }
    else {
      brands[product.brand]=[product];
    }
  });
  brands["all"]=currentProducts;
  currentBrands=brands;
};

/**
 * Fetch products from api
 * @param  {Number}  [page=1] - current page to fetch
 * @param  {Number}  [size=12] - size of the page
 * @return {Object}
 */
const fetchProducts = async (page=1 , size = 12) => {
  try {
    const response = await fetch(
      `https://clear-fashion-api.vercel.app?page=${page}&size=${size}`
    );
    const body = await response.json();

    if (body.success !== true) {
      console.error(body);
      return {currentProducts, currentPagination};
    }

    return body.data;
  } catch (error) {
    console.error(error);
    return {currentProducts, currentPagination};
  }
};

/**
 * Render list of products
 * @param  {Array} products
 */
const renderProducts = products => {
  const fragment = document.createDocumentFragment();
  const div = document.createElement('div');
  const template = products
    .map(product => {
      return `
      <div class="product" id=${product.uuid}>
        <span>${product.brand}</span>
        <a href="${product.link}">${product.name}</a>
        <span>${product.price}</span>
      </div>
    `;
    })
    .join('');

  div.innerHTML = template;
  fragment.appendChild(div);
  sectionProducts.innerHTML = '<h2>Products</h2>';
  sectionProducts.appendChild(fragment);
};

/**
 * Render page selector
 * @param  {Object} pagination
 */
const renderPagination = pagination => {
  const {currentPage, pageCount} = pagination;
  const options = Array.from(
    {'length': pageCount},
    (value, index) => `<option value="${index + 1}">${index + 1}</option>`
  ).join('');

  selectPage.innerHTML = options;
  selectPage.selectedIndex = currentPage - 1;
};

/**
 * Render page selector
 * @param  {Object} pagination
 */
const renderIndicators = pagination => {
  const {count} = pagination;

  spanNbProducts.innerHTML = count;
};


const render = (products, pagination, currentBrands, filters) => {
  renderProducts(applyFilter(currentBrands, filters));
  renderPagination(pagination);
  renderIndicators(pagination);
  renderBrands(currentBrands);
};








/**
 * Declaration of all Listeners
 */

/**
 * Select the number of products to display
 * @type {[type]}
 */
selectShow.addEventListener('change', event => {
  fetchProducts(currentPagination.currentPage, parseInt(event.target.value))
    .then(setCurrentProducts)
    .then(() => render(currentProducts, currentPagination, currentBrands, currentFilter));
});






//feature 2 : select a product by brands

//the object current brand has been created
//the function setCurrentProducts has been modified to update the brands too
const renderBrands=currentBrands =>{
  let options='';
  let brands=Object.keys(currentBrands);
  for (var index=0; index<brands.length;index++)
  {
    options+=`<option value="${brands[index]}">${brands[index]}</option>`;
  }
  selectBrand.innerHTML=options;
};




//feature 3 and 4 : Filter by recent products and reasonable price
// object "currentFilter" has been created

// function to update the status of the check box associated with the filters
function setCurrentFilter(currentFilter) {
  if(filterRelease.checked==true){
    currentFilter["release"]=true;
  } else{
    currentFilter["release"]=false;
  }
  if(filterPrice.checked==true){
    currentFilter["price"]=true;
  } else{
    currentFilter["price"]=false;
  }
  return currentFilter;
}

// function to get the products having a reasonable price
function reasonable_products(products){
  let res=[];
  products.forEach((product, i) => {
    if(product.price<=100){
      res.push(product);
    }
  });
  return res;
}

// function to compute the difference in days between two dates
function dayDiff(d1, d2)
{
  var res= Math.trunc((d1-d2)/86400000);
  return res;
}

// function to get the recently released products
function recent_products(products){
  let res=[];
  products.forEach((product, i) => {
    if(dayDiff(Date.now(), new Date(product.released))<15){
      res.push(product);
    }
  });
  return res;
}

// function to apply the filters
function applyFilter(brands, filters){
  let res=brands[filters.brand];
  if (filters["price"]==true){
    res=reasonable_products(res);
  }

  if (filters["release"]==true){
    res=recent_products(res);
  }
  return res;
}




//Listeners

selectPage.addEventListener('change', event => {
  fetchProducts(parseInt(event.target.value), currentPagination.pageSize)
    .then(setCurrentProducts)
    .then(() => render(currentProducts, currentPagination, currentBrands, currentFilter));
});

selectBrand.addEventListener('change', event => {
   currentFilter.brand=event.target.value;
   renderProducts(applyFilter(currentBrands,currentFilter));
});


filterPrice.addEventListener('change', event => {
   currentFilter = setCurrentFilter(currentFilter);
   renderProducts(applyFilter(currentBrands, currentFilter));
});

filterRelease.addEventListener('change', event => {
   currentFilter = setCurrentFilter(currentFilter);
   renderProducts(applyFilter(currentBrands, currentFilter));
});








document.addEventListener('DOMContentLoaded', () =>
  fetchProducts()
    .then(setCurrentProducts)
    .then(() => render(currentProducts, currentPagination, currentBrands, currentFilter))
);
