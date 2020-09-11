const jwt = require("jsonwebtoken");
const config = require("config");

const auth = (req, res, next) => {
  const userToken = req.header("x-auth-token");

  try {
    //decoding the token and setting the request user equal to the decoded user

    req.user = jwt.verify(userToken, config.get("jwt")).user;

    next();
  } catch (err) {
    res.status(401).send("Not Authorized");
  }
};
module.exports = auth;
