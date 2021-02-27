const dedicatedbrand=require('./dedicated2');
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




async function scrape(brand){
    let res=[];
    //as dedicated brand returns a complete JSON file, there is no need to get through
  // all the categories, so the scraping function is not like the other brands.
    if(brand.url=='https://www.dedicatedbrand.com/en/'){
        res= await brand.scrape()
    } else {

    let data=await load_data(brand.url);
    let urls=brand.get_categories(data);
    await asyncForEach(Object.keys(urls), async (category) => {
      data = await load_data(urls[category]);
      let products=brand.parse(data,category)
      products.forEach((element)=>{
        res.push(element);
      })
    });
  }
  return(res);
}





module.exports={scrape, asyncForEach}
