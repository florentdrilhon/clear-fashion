// Invoking strict mode https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Strict_mode#invoking_strict_mode
'use strict';

const url = 'https://www.dedicatedbrand.com/en/';

const request=require('request');

const get_info = (product)=> {
  const name=product.name;
  const price = parseFloat(product.price.price);
  const link= 'https://www.dedicatedbrand.com/en/loadfilter'+product.canonicalUri;
  const image=product.image[0];
  return {name,price,link,image};
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
          result=result.filter(product => product.canonicalUri.includes('men/'));
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