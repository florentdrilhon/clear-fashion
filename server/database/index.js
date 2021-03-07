'user strict';

const {MongoClient} = require('mongodb');
const MONGODB_URI='mongodb+srv://admin-user:ULTRA_password_92@clear-fashion-cluster.nnulq.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
const MONGODB_DB_NAME = 'clearfashion';
const fs=require('fs');


function getJSONProducts (){
    
}

async function insertProductsFromJSON (mongo_uri, mongo_db_name){
    const client = await MongoClient.connect(mongo_uri, {'useNewUrlParser': true});
    const db =  client.db(mongo_db_name);
    const collection = db.collection('products');

    return fs.readFile("database/products.json", (err,jsonString)=>{
        if (err){
            console.log("Error reading the file");
            return 
        }
            const products=JSON.parse(jsonString);
            console.log('Products successfully got');
            collection.insertMany(products)
            .then(
                res => console.log(`Successfuly inserted ${res.result.n} documents`),
                error => console.error(error)
            );
            client.close();
    });    
}

async function deleteAllProducts (mongo_uri, mongo_db_name){
    const client = await MongoClient.connect(mongo_uri, {'useNewUrlParser': true});
    const db =  client.db(mongo_db_name);
    const collection = db.collection('products');
    collection.remove({})
        .then(
            res => console.log(res.result),
            error => console.error(error)
        )
    await client.close();
}


async function getProductByBrand(mongo_uri, mongo_db_name, brandname) {
    const client = await MongoClient.connect(mongo_uri, {'useNewUrlParser': true});
    const db =  client.db(mongo_db_name);
    const collection = db.collection('products');

    // find method of mongo driver send back a cursor object
    const cursor= await collection.find({
        brand : brandname ,
    });
    const products= await cursor.toArray()
    await client.close();
    console.log(products);
    return products;
}

async function getProductCheaperThan(mongo_uri, mongo_db_name, thresholdPrice) {
    const client = await MongoClient.connect(mongo_uri, {'useNewUrlParser': true});
    const db =  client.db(mongo_db_name);
    const collection = db.collection('products');

    // find method of mongo driver send back a cursor object
    const cursor= await collection.find({
        price : { $lt : thresholdPrice } ,
    });
    const products= await cursor.toArray()
    await client.close();
    console.log(products);
    return products;
}


async function getProductSortedByPrice(mongo_uri, mongo_db_name) {
    const client = await MongoClient.connect(mongo_uri, {'useNewUrlParser': true});
    const db =  client.db(mongo_db_name);
    const collection = db.collection('products');

    // find method of mongo driver send back a cursor object
    const sort={price:1};
    const cursor= await collection.find({}).sort(sort);
    const products= await cursor.toArray()
    await client.close();
    console.log(products);
    return products;
}








// insertProductsFromJSON(MONGODB_URI,MONGODB_DB_NAME);
// deleteAllProducts(MONGODB_URI, MONGODB_DB_NAME);

let test=getProductSortedByPrice(MONGODB_URI, MONGODB_DB_NAME);