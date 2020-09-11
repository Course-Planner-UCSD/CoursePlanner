const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");

// route: GET api/userData to return email to user
// private route
router.get("/", auth, async (req, res) => {
  try {
    res.send("Logged In");
  } catch (err) {
    console.error(err.message);
    res.status(500).send("There is a problem with the server");
  }
});

module.exports = router;
