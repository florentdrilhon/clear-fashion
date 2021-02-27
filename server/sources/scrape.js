const dedicatedbrand=require('./dedicatedbrand');
const adress=require('./adress');
const axios = require("axios");
const mudjeans=require('./mudjeans');


// asynchronous forEach Loop
async function asyncForEach(array, cb) {
  for (let i=0; i<array.length;i++){
    await cb(array[i]);
  }
}

async function load_data(url){
  let response=await axios(url);
  const {data, status}=response;
  if (status >= 200 && status < 300) {
    return data;
  }
  console.error(status);
  return null;
};


//as dedicated brand returns a complete JSON file, there is no need to get through
// all the categories, so the scraping function is not like the other brands.

async function scrape_dedicated(dedicatedbrand){
  let data=await load_data('https://www.dedicatedbrand.com/en/');
  let res=[];
  await asyncForEach(dedicatedbrand.get_categories(data), async (url) => {
    data = await load_data(url);
    res.push(dedicatedbrand.parse(data));
  });
  return res;
};

async function scrape_brands(brand){
    let data=await load_data(brand.url);
    let res=[];
    let urls=brand.get_categories(data);
    await asyncForEach(Object.keys(urls), async (category) => {
      data = await load_data(urls[category]);
      let products=brand.parse(data,category)
      products.forEach((element)=>{
        res.push(element);
      })
    });
    console.log(res);
}


async function test(){
  let data=await load_data('https://mudjeans.eu/collections/men-buy-jeans');
  let categories=mudjeans.parse(data);
  console.log(categories);
}

scrape_brands(mudjeans);


//module.exports={scrape}
