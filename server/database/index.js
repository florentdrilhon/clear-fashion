'user strict';

const {MongoClient} = require('mongodb');
const MONGODB_URI='mongodb+srv://admin-user:ULTRA_password_92@clear-fashion-cluster.nnulq.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
const MONGODB_DB_NAME = 'clearfashion';

async function main (mongo_uri, mongo_db_name){
    const client = await MongoClient.connect(mongo_uri, {'useNewUrlParser': true});
    const db =  client.db(mongo_db_name);


    const products=[{ 
        name : "Test",
        brand : "test",
        category : "t-shirt"
    }];

    const collection = db.collection('products');
    const result = await collection.insertMany(products);

    console.log(result);
}
main(MONGODB_URI,MONGODB_DB_NAME);