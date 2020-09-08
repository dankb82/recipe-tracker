const mongoose = require("mongoose");

const connectionURL = "mongodb://127.0.0.1:27017";

mongoose.connect(`${connectionURL}/recipe-tracker-api`, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});

const User = mongoose.model("User", {
  name: {
    type: String,
  },
  username: {
    type: String,
  },
});

User.updateOne(
  {
    name: "Daniel",
  },
  {
    username: "",
  }
)
  .then((result) => {
    console.log(result);
  })
  .catch((error) => {
    console.log(error);
  });
