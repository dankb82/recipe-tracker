const mongodb = require("mongodb");
const MongoClient = mongodb.MongoClient;

const connectionURL = "mongodb://127.0.0.1:27017";
const databaseName = "recipe-tracker";

MongoClient.connect(
  connectionURL,
  { useNewUrlParser: true },
  (error, client) => {
    if (error) {
      return console.log("Unable to connect to database");
    }
    const db = client.db(databaseName);

    db.collection("users").insertMany(
      [
        {
          name: "Dan B",
          username: "",
        },
        {
          name: "Colleen",
          username: "",
        },
      ],
      (error, response) => {
        if (error) {
          return console.log("Unable to create users");
        }
        console.log(response.ops);
      }
    );
  }
);
