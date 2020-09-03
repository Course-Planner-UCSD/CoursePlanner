const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const coursePlanModel = require("../../dbModels/CoursePlan");

//GET all plans that a user has made by their userID
//Private route so token is required
router.get("/allPlansByID/:userID", auth, async (req, res) => {
  try {
    const { userID } = req.params;
    if (!userID) {
      res.status(400).send("Missing userID");
    }
    await coursePlanModel
      .find({ ownerID: userID })
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

//POST to create a plan with a userID and returns planID
//Private route so token is required

router.post("/createPlan/:userID", auth, async (req, res) => {
  try {
    const { userID } = req.params;
    if (!userID) {
      res.status(400).send("Missing userID");
    }
    let plan = new coursePlanModel({
      ownerID: userID,
    });
    await plan
      .save()
      .then(res.send(plan._id))
      .catch((err) => {
        console.error(err);
        res.status(500).send("There is a problem with the server");
      });
  } catch (error) {
    console.error(error);
  }
});

//POST route to update plan by planID
//Private route so token is required

router.post("/updatePlan/:planID", auth, async (req, res) => {
  try {
    const { planID } = req.params;
    if (!planID) {
      res.status(400).send("Missing Plan ID");
    }
    await coursePlanModel
      .findOneAndUpdate({ _id: planID }, req.body, { returnNewDocument: true })
      .then((newDoc) => res.send(newDoc))
      .catch((err) => {
        console.error(err);
        res.status(500).send("There was a problem with the server");
      });
  } catch (error) {
    console.error(error);
  }
});

//GET Route to get all of the plan info from planID
//Private route so token is required

router.get("/getPlan/:planID", auth, async (req, res) => {
  try {
    const { planID } = req.params;
    if (!planID) {
      res.status(400).send("Missing Plan ID");
    }

    await coursePlanModel
      .find({ _id: planID })
      .then((plan) => res.json(plan))
      .catch((err) => {
        console.error(err);
        res.status(500).send("There is a problem with the server");
      });
  } catch (error) {
    console.error(error);
  }
});

//DELETE route to delete plan
//Private route so token is required
//in progress

router.delete("/deletePlan/:planID", auth, async (req, res) => {
  try {
    const { planID } = req.params;
    if (!planID) {
      res.status(400).send("Missing Plan ID");
    }

    await coursePlanModel
      .deleteOne({ _id: planID })
      .then((result) => {
        if (result.deletedCount == 1) {
          res.send("Deleted course plan");
        } else {
          res.status(400).send("Course Plan not found");
        }
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send("There was a problem with the server");
      });
  } catch (error) {
    console.error(error);
  }
});

module.exports = router;
