const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const userModel = require("../../dbModels/User");

// route: GET api/userData to return email to user
// private route
router.get("/", auth, async (req, res) => {
  try {
    //get user email
    await userModel
      .findById(req.user.id)
      .select("email")
      .select("-_id")
      .then((userData) => res.json(userData))
      .catch((err) => console.log(err));
  } catch (err) {
    console.error(err.message);
    res.status(500).send("There is a problem with the server");
  }
});

module.exports = router;
