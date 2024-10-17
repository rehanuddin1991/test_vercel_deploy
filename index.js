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
      const filter = { userId: id };
      const result = await newUserCollection.findOne(filter);

      res.send(result);
    });


    app.delete("/user/:id", async (req, res) => {
      const id = req.params.id;
      console.log(id, "reud");
      const query = { _id: new ObjectId(id) };
      const result = await course_collection.deleteOne(query);
      res.send(result);
    });

    app.put("/user/:id", async (req, res) => {
      const id = req.params.id;
      console.log(id);
      const course = req.body;
      const filter = { _id: new ObjectId(id) };
      const option = { upsert: true };
      const updatedCourse = {
        $set: {
          course_title: course.course_title,
          course_description: course.course_description,
          course_price: course.course_price,
          course_duration: course.course_duration,

        },
      };

      const result = await course_collection.updateOne(
        filter,
        updatedCourse,
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