const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const { check, validationResult } = require("express-validator");

const UserModel = require("../../dbModels/User");

// POST to api/register to register user and is public
router.post(
  "/",
  [
    check("email", "Enter a valid email address").isEmail(),
    check(
      "password",
      "Please enter a password with at least 5 characters"
    ).isLength({ min: 5 }),
  ],
  async (req, res) => {
    const inputErrors = validationResult(req);
    if (!inputErrors.isEmpty()) {
      return res.status(400).json({ errors: inputErrors.array() });
    }
    const { email, password } = req.body;
    try {
      if (await UserModel.findOne({ email })) {
        return res.status(400).json({
          errors: [
            { msg: "There is already an account for that email address" },
          ],
        });
      }

      let currentUser = new UserModel({
        email,
        password,
      });

      const salt = await bcrypt.genSalt(15);
      currentUser.password = await bcrypt.hash(password, salt);
      await currentUser.save();

      const userID = {
        currentUser: {
          id: currentUser.id,
        },
      };

      //change expiresInv value to 3600
      jwt.sign(
        userID,
        config.get("jwtSecret"),
        { expiresIn: 3600000 },
        (err, token) => {
          if (err) {
            throw err;
          }
          res.json({ token });
        }
      );
    } catch (error) {
      console.log(error.message);
      res.status(500).send("There is a problem with the server");
    }
  }
);

module.exports = router;
