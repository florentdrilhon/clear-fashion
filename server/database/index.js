'user strict';

const {MongoClient} = require('mongodb');
 // TODO put this information in a .config file 
 
const MONGODB_URI ="mongodb+srv://admin-user:ULTRA_password_92@clear-fashion-cluster.nnulq.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const MONGODB_DB_NAME = "clearfashion"
const config = require("../config");
const fs=require('fs');



class MongoCluster {
    constructor({mongo_uri, mongo_db_name}){
        this.mongo_uri=mongo_uri;
        this.mongo_db_name=mongo_db_name;
        this.db=null;
        this.client=null;
        this.collection=null;
    }

    //TODO function to connect to the database and set the client, the db and the collection if not already connected

    //TODO function to instert an array of product in the DB and not stopping if the product is already in the DB

    //TODO function to make a query 


    async insert (){
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
            res => console.log(`Successfuly deleted ${res.result.n} documents`),
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

}







// insertProductsFromJSON(MONGODB_URI,MONGODB_DB_NAME);
// deleteAllProducts(MONGODB_URI, MONGODB_DB_NAME);

let test=getProductByBrand(MONGODB_URI, MONGODB_DB_NAME, "DEDICATED");