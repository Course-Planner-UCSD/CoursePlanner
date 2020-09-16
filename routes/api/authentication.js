const express = require("express");
const router = express.Router();
const userModel = require("../../dbModels/User");
const bcrypt = require("bcryptjs");
const config = require("config");
const jwt = require("jsonwebtoken");

//post to api/authentication to log in user
//public route
router.post("/", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await userModel.findOne({ email });
    if (!user) {
      res.status(401).send("Username or Password does not match");
    } else {
      await bcrypt
        .compare(password, user.password)
        .then((match) => {
          if (!match) {
            res.status(401).send("Username or Password does not match");
          } else {
            const userID = {
              user: {
                id: user.id,
              },
            };

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
          }
        })
        .catch((err) => console.error(err));
    }
  } catch (err) {
    res.status(500).send("There is a problem with the server");
    console.error(err);
  }
});

module.exports = router;
