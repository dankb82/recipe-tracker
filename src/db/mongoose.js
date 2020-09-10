const mongoose = require("mongoose");
const validator = require("validator");

const connectionURL = "mongodb://127.0.0.1:27017";

mongoose.connect(`${connectionURL}/recipe-tracker-api`, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});

const User = mongoose.model("User", {
  name: {
    type: String,
    trim: true,
    default: "anonymous",
  },
  username: {
    type: String,
    trim: true,
    default: "anonymous",
  },
  email: {
    type: String,
    required: true,
    trim: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error("Please provide a valid email address");
      }
    },
  },
  password: {
    type: String,
    required: true,
    trim: true,
    minlength: 7,
  },
});

const user = new User({
  name: "Stache",
  email: "wubba@gmail.com",
  password: "chaserabbits",
});

user
  .save()
  .then(() => {
    console.log(user);
  })
  .catch((error) => {
    console.log(error);
  });
