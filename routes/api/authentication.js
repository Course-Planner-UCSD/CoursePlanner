const express = require("express");
const router = express.Router();
const userModel = require("../../dbModels/User");
const bcrypt = require("bcryptjs");
const config = require("config");
const jwt = require("jsonwebtoken");

//post to api/authentication to log in user
//public route
router.post("/", async (req, res) => {
  //getting name email and password from req.body
  const { email, password } = req.body;

  try {
    //Check if user exists and prints error if they don't
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(400).send("Username or Password does not match");
    }
    //checks if encrypted password and entered password match
    await bcrypt
      .compare(password, user.password)
      .then((match) => {
        if (!match) {
          return res.status(401).send("Username or Password does not match");
        }

        const userID = {
          user: {
            id: user.id,
          },
        };

        //signs jwt, change the expiresIn value
        jwt.sign(
          userID,
          config.get("jwt"),
          { expiresIn: 36000000 },
          (err, token) => {
            if (err) {
              console.error(err);
            }
            res.json({ token });
            console.log("Logged In User");
          }
        );
      })
      .catch((err) => console.error(err));
  } catch (err) {
    //logs error and sends code 500 for server error
    res.status(500).send("There is a problem with the server");
    console.error(err);
  }
});

module.exports = router;
