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
      return res
        .status(400)
        .send("There is already an account associated with that email address");
    }
    let user = new UserModel({
      email,
      password,
    });
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    await user.save();

    const userID = {
      user: {
        id: user.id,
      },
    };

    //change expiresInv value to 3600
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
  } catch (error) {
    console.log(error.message);
    res.status(500).send("There is a problem with the server");
  }
});

module.exports = router;
