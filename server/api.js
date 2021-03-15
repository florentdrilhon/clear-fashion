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
app.get('/products/:id', async (request,response) => {
  const _id=request.params.id;
  const product=await mydb.find({_id});
  response.send({product});
});

app.get('/products/search', async (req,res)=>{

});

app.listen(PORT);
console.log(`📡 Running on port ${PORT}`);
