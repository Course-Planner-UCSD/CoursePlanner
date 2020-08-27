const jwt = require("jsonwebtoken");
const config = require("config");

//checks if token is valid and gets the user id if it is
module.exports = function (req, res, next) {
  // Get token from header
  const token = req.header("x-auth-token");

  // check if no token
  if (!token) {
    return res.status(401).json({ msg: "Authorization Denied" });
  }

  try {
    //decoding the token and setting the request user equal to the decoded user
    //the object only contains the id which will can be used to get all user data
    const decoded = jwt.verify(token, config.get("jwtSecret"));

    req.user = decoded.user;

    next();
  } catch (err) {
    res.status(401).json({ msg: "Invalid Token" });
  }
};
