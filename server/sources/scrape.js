const dedicatedbrand=require('./dedicatedbrand');
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


module.exports={scrape};
