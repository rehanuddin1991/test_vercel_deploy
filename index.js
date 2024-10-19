const express = require("express");
const cors = require("cors");
require('dotenv').config()

const app = express();
const PORT = process.env.PORT || 5000;
app.use(cors());
app.use(express.json());
const { MongoClient, ObjectId } = require('mongodb');
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_SECRET}@cluster0.grsue.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;
const client = new MongoClient(uri);
async function run() {
  try {
    await client.connect();
    const db = client.db("rehandb");
    const newUserCollection = db.collection("userLists");
    const categoryCollection = db.collection("category");
    const productsCollection = db.collection("products");

    //new user api start here 
    app.post("/user", async (req, res) => {
      const users = req.body;
      const result = await newUserCollection.insertOne(users);
      res.send(result);
    });

    app.get("/user", async (req, res) => {
      const result = await newUserCollection.find().toArray();
      res.send(result);
    });

    app.get("/user/:id", async (req, res) => {
      const id = req.params.id;
      const filter = { uid: id };
      const result = await newUserCollection.findOne(filter);

      res.send(result);
    });


    app.delete("/user/:id", async (req, res) => {
      const id = req.params.id;
      //console.log(id, "reud");
      const query = { _id: new ObjectId(id) };
      const result = await course_collection.deleteOne(query);
      res.send(result);
    });

    app.put("/user/:id", async (req, res) => {
      const id = req.params.id;
      console.log(id);
      const user = req.body;
      const filter = { _id: new ObjectId(id) };
      const option = { upsert: true };
      const updateduser = {
        $set: {
          displayName: user.displayName,
          phone: user.phone,
          address: user.address,
          phoroURL: user.phoroURL,
         

        },
      };

      const result = await newUserCollection.updateOne(
        filter,
        updateduser,
        option
      );
      res.send(result);


    })


    //new user api end



    //new user api start here 
    app.post("/category", async (req, res) => {
      const category = req.body;
      const result = await categoryCollection.insertOne(category);
      res.send(result);
    });

    app.get("/category", async (req, res) => {
      const result = await categoryCollection.find().toArray();
      res.send(result);
    });

    app.get("/category/:id", async (req, res) => {
      const id = req.params.id;
      console.log(399,id)
      //const filter = { _id: id };
      const filter={ _id: new ObjectId(id) };
      const result = await categoryCollection.findOne(filter);

      res.send(result);
    });


    app.delete("/category/:id", async (req, res) => {
      const id = req.params.id;
      //console.log(id, "reud");
      const query = { _id: new ObjectId(id) };
      const result = await categoryCollection.deleteOne(query);
      res.send(result);
    });

    app.put("/category/:id", async (req, res) => {
      const id = req.params.id;
      console.log(id);
      const category = req.body;
      const filter = { _id: new ObjectId(id) };
      const option = { upsert: true };
      const updatedcategory = {
        $set: {
          categoryName: category.categoryName,
          imageURL: category.imageURL,
           

        },
      };

      const result = await categoryCollection.updateOne(
        filter,
        updatedcategory,
        option
      );
      res.send(result);


    })


    //new user api end





    //new user api start here 
    app.post("/product", async (req, res) => {
      const products = req.body;
      const result = await productsCollection.insertOne(products);
      res.send(result);
    });

    app.get("/product", async (req, res) => {
      const result = await productsCollection.find().toArray();
      res.send(result);
    });

    app.get("/product/:id", async (req, res) => {
      const id = req.params.id;
      //const filter = { _id: id };
      const filter={ _id: new ObjectId(id) };
      const result = await productsCollection.findOne(filter);

      res.send(result);
    });


    app.delete("/product/:id", async (req, res) => {
      const id = req.params.id;
      //console.log(id, "reud");
      const query = { _id: new ObjectId(id) };
      const result = await productsCollection.deleteOne(query);
      res.send(result);
    });

    app.put("/product/:id", async (req, res) => {
      const id = req.params.id;
      console.log(id);
      const product = req.body;
      const filter = { _id: new ObjectId(id) };
      const option = { upsert: true };
      const updatedproduct = {
        
        $set: {
          productName: product.productName,
          imageURL: product.imageURL,
          

        },
      };

      const result = await productsCollection.updateOne(
        filter,
        updatedproduct,
        option
      );
      res.send(result);


    })


    //new user api end






    console.log("connected!!");
  } catch (err) {
    console.log(err.stack);
  }

  finally {
    //await client.close();
  }
}
run().catch(console.dir);

app.listen(PORT, () => {
  console.log(`server is Running on ${PORT}`);
});