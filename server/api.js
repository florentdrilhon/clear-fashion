const cors = require('cors');
const express = require('express');
const helmet = require('helmet');
const MongoCluster= require('./database/index')
// TODO : mettre ces infos dans un config file
const MONGODB_URI ="mongodb+srv://admin-user:le_booliste_92@clear-fashion-cluster.nnulq.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const MONGODB_DB_NAME = "clearfashion";

const PORT = 8092;

const app = express();

const mydb= new MongoCluster(MONGODB_URI, MONGODB_DB_NAME);

module.exports = app;

app.use(require('body-parser').json());
app.use(cors());
app.use(helmet());

app.options('*', cors());

//home endpoint
app.get('/', (request, response) => {
  response.send({'ack': true});
});

//endpoint to get a simple product by its id
app.get('/product/:id', async (request,response) => {
  const _id=request.params.id;
  const product=await mydb.find({_id});
  if (product){
    response.send({product});
  } response.send("No product found");
});


//endpoint to make a query with parameters
app.get('/products/search', async (req,res)=>{
  // setting the base parameters
  let limit=12;
  let brand="";
  let price=10000;
  // if parameters are specified in the endpoint, get them
  if (req.query.limit){
    limit=parseInt(req.query.limit);
  }
  if (req.query.brand){
    brand=req.query.brand
  }
  if (req.query.price){
    price=parseFloat(req.query.price);
  }
  // making the query and sending it to the database
  const query={ brand, "price":{$lte : price}}
  const products=await mydb.find(query,limit);
  // sending back the products
  res.send(products);
});

app.listen(PORT);
console.log(`📡 Running on port ${PORT}`);
