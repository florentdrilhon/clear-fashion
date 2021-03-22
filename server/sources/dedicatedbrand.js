// Invoking strict mode https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Strict_mode#invoking_strict_mode
'use strict';

const url = 'https://www.dedicatedbrand.com/en/';
const request=require('request');
const {'v5': uuidv5} = require('uuid');




const get_info = (product)=> {
  const brand = "DEDICATED";
  const name=product.name;
  const price = parseFloat(product.price.price);
  const link= 'https://www.dedicatedbrand.com/en/'+product.canonicalUri;
  const image=product.image[0];
  const category=link.split('/')[5];
  const _id= uuidv5(link, uuidv5.URL);
  const release = (new Date).toLocaleDateString('en-US');
  return {brand, name,price,link,image,category, _id, release};
}

const parse=()=>{
  return new Promise ((resolve, reject)=>{
    try {
      request.get(
        'https://www.dedicatedbrand.com/en/loadfilter',
        {
          json:true
        }, (err, res, body) => {
          if(err){return console.log(err);}
          let result = body.products
          // cleaning the non object values (there are some null array)
          result=result.filter(product => product.canonicalUri);
          // keeping only the men products
          result=result.filter(product => (product.canonicalUri.includes('men/')==true) && 
          (product.canonicalUri.includes('women/')==false));
          resolve(result);
        });
      
    } catch(err){
      console.log("error : ",err);
      reject(err);
    }
  });
}


const scrape = async()=> {

  let data=await parse();
  let res= [];
  data.forEach(product => {
    const p=get_info(product);
    res.push(p);
  });
  return res;
}

module.exports={scrape, url};

