const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const coursePlanModel = require("../../dbModels/CoursePlan");

router.get("/allPlansByID", auth, async (req, res) => {
  try {
    if (!req.body.userID) {
      res.status(400).send("Missing userID");
    }
    await coursePlanModel
      .find({ ownerID: req.body.userID })
      .select("_id")
      .then((plans) => res.json(plans))
      .catch((err) => {
        console.error(err);
        res.status(500).send("There is a problem with the server");
      });
  } catch (error) {
    console.error(error);
  }
});

router.post("/createPlan", auth, async (req, res) => {
  try {
    const { userID } = req.body;
    if (!userID) {
      res.status(400).send("Missing userID");
    }
    let plan = new coursePlanModel({
      ownerID: userID,
    });
    await plan
      .save()
      .then(res.send("Saved course plan"))
      .catch((err) => {
        console.error(err);
        res.status(500).send("There is a problem with the server");
      });
  } catch (error) {
    console.error(error);
  }
});

module.exports = router;
