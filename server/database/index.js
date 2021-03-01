'user strict';

const {MongoClient} = require('mongodb');
const MONGODB_URI='mongodb+srv://admin-user:ULTRA_password_92@clear-fashion-cluster.nnulq.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
const MONGODB_DB_NAME = 'clearfashion';
const fs=require('fs');

async function main (mongo_uri, mongo_db_name){
    const client = await MongoClient.connect(mongo_uri, {'useNewUrlParser': true});
    const db =  client.db(mongo_db_name);



    const collection = db.collection('products');
    await insertFromJSON(collection);
    client.close();
}

async function insertFromJSON (collection){
    const products=await fs.readFile("../data/products.json", (err,jsonString)=>{
        if (err){
            console.log("Error reading the file");
            return 
        }
        try {
            const products=JSON.parse(jsonString);
            console.log('Products successfully got');
            return products

        } catch(err) {
            console.log('Error parsing json string : ',err);
        }
    });
    const result=await collection.insertMany(products);
    console.log(result)

}

main(MONGODB_URI,MONGODB_DB_NAME);