const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const UserModel = require("../../dbModels/User");

// POST to api/register to register user and is public
router.post("/", async (req, res) => {
  const { email, password } = req.body;
  try {
    if (await UserModel.findOne({ email })) {
      res
        .status(400)
        .send("There is already an account associated with that email address");
    } else {
      const encryptedPassword = await bcrypt.hash(
        password,
        await bcrypt.genSalt(10)
      );
      let user = new UserModel({
        email,
        password: encryptedPassword,
      });

      await user.save();

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
          console.log("Registered User");
        }
      );
    }
  } catch (err) {
    console.error(err);
    res.status(500).send("There is a problem with the server");
  }
});

module.exports = router;
