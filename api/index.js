const express = require("express");
const cors = require("cors");
require('dotenv').config()

const app = express();
const PORT = process.env.PORT || 3000;
app.use(cors());
app.use(express.json());
//app.use('/route');
const { MongoClient, ObjectId } = require('mongodb');
//const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_SECRET}@cluster0.grsue.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;
const uri=process.env.MONGODB_URI;
const client = new MongoClient(uri);
async function run() {
  try {
    await client.connect();
    const db = client.db("rehandb");
    const newUserCollection = db.collection("userLists");
    const categoryCollection = db.collection("category");
    const productsCollection = db.collection("products");
    const buyProductCollection = db.collection("buyProduct");
    const messageCollection = db.collection("message");


    //message api here
    //new user api start here 
    app.post("/message", async (req, res) => {
      const message = req.body;
      const result = await messageCollection.insertOne(message);
      res.send(result);
    });

    app.get("/message", async (req, res) => {
      const result = await messageCollection.find().toArray();
      res.send(result);
    });

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
      const query = { uid: id };
      const result = await newUserCollection.deleteOne(query);
      res.send(result);
    });

    app.put("/user/:id", async (req, res) => {
      const id = req.params.id;
      console.log(id);
      const user = req.body;
      const filter = { uid:   id };
      const option = { upsert: false };
      const updateduser = {
        $set: {
          displayName: user.displayName,
          phone: user.phone,
          address: user.address,
          photoURL: user.photoURL,
          isAdmin: user.isAdmin,
          isBlocked: user.isBlocked,
         

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
      
      const category = req.body;
      //console.log(category, 333333333);
      const filter = { _id: new ObjectId(id) };
      const option = { upsert: false };
      const updatedcategory = {
        $set: {
          categoryName: category.categoryName,
          categoryDescription: category.categoryDescription,  
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

    //purchase info
    app.post("/buy_product", async (req, res) => {
      const products = req.body;
      const result = await buyProductCollection.insertOne(products);
      res.send(result);
    });


    


    app.get("/buy_product/:uid", async (req, res) => {
      const id = req.params.uid;
      console.log(11,id)
      //const filter = { _id: id };
      const filter={ uid: id };
      const result = await buyProductCollection.findOne(filter);

      res.send(result);
    });


    

    app.get("/product", async (req, res) => {
      const result = await productsCollection.find().toArray();
      res.send(result);
    });

    //purchase info get
    app.get("/buy_product", async (req, res) => {
      const result = await buyProductCollection.find().toArray();
      res.send(result);
    });
    

    app.get("/product/:id", async (req, res) => {
      const id = req.params.id;
      //const filter = { _id: id };
      const filter={ _id: new ObjectId(id) };
      const result = await productsCollection.findOne(filter);

      res.send(result);
    });

    //category wise product
    app.get("/categorywiseproduct/:id", async (req, res) => {
      const id = req.params.id;
      //console.log(id," eeeeshhh")
      //const filter = { _id: id };
      const filter={ productCategory: id };
      const result = await productsCollection.find(filter).toArray();

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
      //console.log('backend obj',product)
      const filter = { _id: new ObjectId(id) };
      const option = { upsert: false };
      const updatedproduct = {
        
        $set: {
          productName: product.productName,
          productPrice: product.productPrice,
          productQuantity: product.productQuantity,
          productRating: product.productRating,
          productDescription: product.productDescription,
          productCategory: product.productCategory,
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

app.listen(3000, () => {
  console.log(`server is Running on ${PORT}`);
});

module.exports = app;
