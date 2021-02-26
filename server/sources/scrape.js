const dedicatedbrand=require('./dedicatedbrand');
const adress=require('./adress');
const axios = require("axios");


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

async function scrape(dedicatedbrand){
  let data=await load_data('https://www.dedicatedbrand.com/en/');
  let res=[];
  await asyncForEach(dedicatedbrand.get_categories(data), async (url) => {
    data = await load_data(url);
    res.push(dedicatedbrand.parse(data));
  });
  return res;
};

async function scrape_adress(adress){
    let data=await load_data('https://adresse.paris/602-nouveautes');
    let res=[];
    let urls=adress.get_categories(data);
    await asyncForEach(Object.values(urls), async (url) => {
      data = await load_data(url);
      res.push(adress.parse(data));
    });
    console.log(res.length);
}

scrape_adress(adress);




//module.exports={scrape}
