const jwt = require("jsonwebtoken");
const User = require("../models/user");

const auth = async (req, res, next) => {
  try {
    //Grab the token from the request and strip it out
    const token = req.header("Authorization").replace("Bearer ", "");
    const decodedToken = jwt.verify(token, "secretfornow");

    //Query the collection with user id and check the tokens array for existing token
    const user = await User.findOne({
      _id: decodedToken._id,
      "tokens.token": token,
    });

    if (!user) {
      throw new Error();
    }
    //Add user and token to the request in the middleware so the route handler has it
    req.token = token;
    req.user = user;
    next();
  } catch (e) {
    res.status(401).send({ error: "Please sign in or create an account" });
  }
};

module.exports = auth;
