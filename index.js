const cors = require('cors');
const express = require('express');
const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config()
const app = express();
const port = process.env.PORT || 5000;

// middleware
app.use(cors({
  origin: 'http://localhost:5173', // replace with your client's origin
  credentials: true,
}));
app.use(express.json());




console.log(process.env.DB_USER, process.env.DB_PASS)


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.kqeap4x.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    // await client.connect();

    //create collection 
    const ProdectCollection = client.db('emaJohnDB').collection('Prodect');

app.get('/Prodect', async(req, res)=>{
  const page = parseInt(req.query.page) 
  const size  =parseInt(req.query.size)
  console.log(page, size)
  const result = await ProdectCollection.find().
  skip(page * size)
  .limit(size)
  .toArray();
  res.send(result);
})

app.get('/ProdectCound', async(req, res)=>{
  const count = await ProdectCollection.estimatedDocumentCount();
  res.send({count})
})




    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  }  catch (error) {
    console.error('MongoDB connection error:', error);
  }
}
run().catch(console.dir);




app.get('/', (req, res) => {
  res.send('john is busy shopping')
})

app.listen(port, () => {
  console.log(`ema john server is running on port: ${port}`);
})
