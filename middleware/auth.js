const jwt = require("jsonwebtoken");
const config = require("config");

//checks if token is valid and gets the user id if it is
function auth(req, res, next) {
  // Get token from header
  const userToken = req.header("x-auth-token");

  if (!userToken) {
    res.status(400).send("Missing token");
  }

  try {
    //decoding the token and setting the request user equal to the decoded user
    //the object only contains the id which will can be used to get all user data
    const decodedToken = jwt.verify(userToken, config.get("jwt"));

    req.user = decodedToken.user;

    next();
  } catch (err) {
    res.status(401).json({ msg: "Not authorized" });
  }
}
module.exports = auth;
