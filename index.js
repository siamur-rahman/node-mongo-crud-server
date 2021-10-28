const express = require('express');
const { MongoClient } = require('mongodb');
const cors = require('cors');

const ObjectId = require('mongodb').ObjectId;


const app = express();

//middlewere
app.use(cors());
app.use(express.json());

const port = 5000;

//user  siamdbuser1
//password 055JI4vtFvDQx9dK


const uri = "mongodb+srv://siamdbuser1:055JI4vtFvDQx9dK@cluster0.wrybq.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function run() {
   try {
      await client.connect();
      const database = client.db("foodMaster");
      const usersCollection = database.collection("users");

      //get api
      app.get('/users', async (req, res) => {
         const cursor = usersCollection.find({});
         const users = await cursor.toArray();
         res.send(users);
      })

      //get api single user
      app.get('/users/:id', async (req, res) => {
         const id = req.params.id;
         const query = { _id: ObjectId(id) };
         const user = await usersCollection.findOne(query)
         console.log('load user with id', id);
         res.send(user);
      })




      //post apii
      app.post('/users', async (req, res) => {

         const newUser = req.body;
         const result = await usersCollection.insertOne(newUser);
         console.log('got new user', req.body);
         console.log('added user', result);
         res.json(result);
      })



      //put api  --------update
      app.put('/users/:id', async (req, res) => {
         const id = req.params.id;
         const updatedUser = req.body;
         const filter = { _id: ObjectId(id) };
         const options = { upserts: true };
         const updateDoc = {
            $set: {
               name: updatedUser.name,
               email: updatedUser.email
            },


         };
         const result = await usersCollection.updateOne(filter, updateDoc, options)

         // console.log('updating user', req);
         // res.send('UPDATING NOT DATING')
         res.json(result)
      })


      //delete api
      app.delete('/users/:id', async (req, res) => {

         const id = req.params.id;
         const query = { _id: ObjectId(id) };
         const result = await usersCollection.deleteOne(query);
         console.log('delete id', result);
         console.log('delete', id)
         res.json(result);



      })



   } finally {
      // await client.close();
   }
}
run().catch(console.dir);



app.get('/', (req, res) => {
   res.send('running with my crud server')
});

app.listen(port, () => {
   console.log('running server', port)
})