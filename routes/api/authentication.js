const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const User = require("../../dbModels/User");
const { check, validationResult } = require("express-validator");
const config = require("config");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

//post to api/authentication to authenticate user
//public route
router.post(
  "/",
  [
    check("email", "Please enter a valid email address").isEmail(),
    check("password", "Password is required").exists(),
  ],
  async (req, res) => {
    //validationResult completes the above check
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    //getting name email and password from req.body
    const { email, password } = req.body;

    try {
      //Check if user exists and prints error if they don't
      let user = await User.findOne({ email });
      if (!user) {
        return res
          .status(400)
          .json({ errors: [{ msg: "Invalid Credentials" }] });
      }
      //checks if encrypted password and entered password match
      const matchFound = await bcrypt.compare(password, user.password);

      if (!matchFound) {
        return res
          .status(400)
          .json({ errors: [{ msg: "Invalid Credentials" }] });
      }

      //return jsonwebtoken so that the user is logged in right away

      const userID = {
        user: {
          id: user.id,
        },
      };

      //signs jwt, change the expiresIn value to 3600 when deploying
      jwt.sign(
        userID,
        config.get("jwtSecret"),
        { expiresIn: 36000000 },
        (err, token) => {
          if (err) {
            throw err;
          }
          res.json({ token });
        }
      );
    } catch (err) {
      //logs error and sends code 500 for server error
      console.error(err.message);
      res.status(500).send("There is a problem with the server");
    }
  }
);

module.exports = router;
