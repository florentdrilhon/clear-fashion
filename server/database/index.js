'user strict';

const {MongoClient} = require('mongodb');
 // TODO put this information in a .config file 
 
const MONGODB_URI ="mongodb+srv://admin-user:ULTRA_password_92@clear-fashion-cluster.nnulq.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const MONGODB_DB_NAME = "clearfashion"
//const config = require("../config");
const fs=require('fs');



class MongoCluster {
    constructor(mongo_uri, mongo_db_name){
        this.mongo_uri=mongo_uri;
        this.mongo_db_name=mongo_db_name;
        this.db=null;
        this.client=null;
        this.collection=null;
    }

    // function to connect to the database and set the client, the db and the collection if not already connected
    async connect() {
        try{
            if (this.db != null){
                // db already connected
                console.log("Already connected");
            }
            else {
                // db not connected, initiating connection
                this.client = await MongoClient.connect(this.mongo_uri, {'useNewUrlParser': true});
                this.db =  this.client.db(this.mongo_db_name);
                this.collection = this.db.collection('products');
                console.log("Connected");
            }
        } catch(error){
            console.log("Error in connection to the mongo client :", error);
        }
    };

    //TODO function to instert an array of product in the DB and not stopping if the product is already in the DB
    async insert(products){
        //take the array as arg
        //check if the client is connected, connect if not
        this.connect();
        try {
            //try insert the products
            const result=await this.collection.insertMany(products, {'ordered': false});
            // return the result
            return result;
        } catch(error){
            //catch error if error
            console.log("Error inserting the products :", error);
            console.log("Storing the products in a JSON file");
            // put the products in a JSON file not to lose them
            fs.writeFileSync('products.json', JSON.stringify(products));
            return {
                'insertedCount': error.result.nInserted
             };
        }
    }
    //TODO function to make a query

    
    
    // function to close the connection
    async close(){
        try {
            await this.client.close();
            console.log("Connection closed")
        } catch(error){
            console.log("Error closing the connection :", error);
        }
    }
};



let Mongocluster = new MongoCluster(MONGODB_URI, MONGODB_DB_NAME);

async function test(Mongocluster){
    const products=[{brand:"LAcoste", name: "le polo stylax"}, {brand:"Tu le c", name: "eh la bb"}];
    await Mongocluster.connect();
    const result=await Mongocluster.insert(products);
    console.log(result);
    Mongocluster.close();
}

test(Mongocluster);


/*
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









// insertProductsFromJSON(MONGODB_URI,MONGODB_DB_NAME);
// deleteAllProducts(MONGODB_URI, MONGODB_DB_NAME);

//let test=getProductByBrand(MONGODB_URI, MONGODB_DB_NAME, "DEDICATED");

*/