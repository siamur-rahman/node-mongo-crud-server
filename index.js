const express = require('express');
const { MongoClient } = require('mongodb');
// const cors = require('cors');
const app = express();
// app.use(cors());
// app.use(express.json());

const port = 5000;


//user  siamdbuser1
//password 055JI4vtFvDQx9dK




const uri = "mongodb+srv://siamdbuser1:055JI4vtFvDQx9dK@cluster0.wrybq.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

// //etai async await diye korbo//////or///////////
// client.connect(err => {
//    const collection = client.db("foodMaster").collection("users");
//    // perform actions on the collection object
//    // console.log('hit data');//ami likhchi

//    const user = { name: "akhiiiihi", email: 'kkk@gmail.com', phone: "01736464437" }
//    collection.insertOne(user)
//       .then(() => {
//          console.log('insert success');
//       })

//    // console.error(err)//ami likhchi
//    // client.close();
// });

//etai async await diye korbo//////or///////////
async function run() {
   try {
      await client.connect();
      const database = client.db("foodMaster");
      const usersCollection = database.collection("users");

      //post api

      app.post('/users', async (req, res) => {
         console.log('hitting post', req.body);
         res.send('inside post')

         // const newUser = req.body;
         // newUser.id = users.length;
         // users.push(newUser);
         // console.log('hitting post', req.body);
         // //res.send(JSON.stringify(newUser))
         // res.json(newUser);

      })


   } finally {
      await client.close();
   }
}
run().catch(console.dir);



app.get('/', (req, res) => {
   res.send('running with my crud server')
});

app.listen(port, () => {
   console.log('running server', port)
})