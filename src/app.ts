import express, { Express } from "express";
import mongoose from "mongoose";
import cors from "cors";
import todoRoutes from "./routes";
import bodyParser from "body-parser";

const app: Express = express();

const PORT: string | number = process.env.PORT || 4000;

app.use([cors(), express.json()]);
app.use(todoRoutes);

const uri: string = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0.2925e.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority`;

const options = { useNewUrlParser: true, useUnifiedTopology: true };
mongoose.set("useFindAndModify", false);

mongoose
  .connect(uri, options)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on PORT: ${PORT}`);
    });
  })
  .catch((err) => {
    throw err;
  });

// const MongoClient = require('mongodb').MongoClient;
// const uri = "mongodb+srv://kayyali:<password>@cluster0.2925e.mongodb.net/<dbname>?retryWrites=true&w=majority";
// const client = new MongoClient(uri, { useNewUrlParser: true });
// client.connect(err => {
//   const collection = client.db( "test").collection("devices");
//   // perform actions on the collection object
//   client.close();
// });
