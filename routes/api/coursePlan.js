const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const coursePlanModel = require("../../dbModels/CoursePlan");

//GET all plans that a user has made by their userID
//Private route so token is required
router.get("/allPlansByID", auth, async (req, res) => {
  try {
    const userID = req.user.id;
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

router.put("/createPlan", auth, async (req, res) => {
  try {
    const userID = req.user.id;
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
    //checking if user is authorized to see plan
    await coursePlanModel
      .findOne({ _id: planID })
      .select("ownerID")
      .then((result) => {
        if (result.ownerID != req.user.id) {
          res.status(400).send("You are not authorized");
        }
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send("There was a problem with the server");
      });
    //updating plan
    await coursePlanModel
      .findOneAndUpdate({ _id: planID }, req.body)
      .catch((err) => {
        console.error(err);
        res.status(500).send("There was a problem with the server");
      });
    //finding and returning updated plan
    await coursePlanModel
      .findOne({ _id: planID })
      .then((result) => {
        res.send(result);
      })
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
      .findOne({ _id: planID })
      .select("ownerID")
      .then((result) => {
        if (result.ownerID != req.user.id) {
          res.status(400).send("You are not authorized");
        }
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send("There was a problem with the server");
      });

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
      .findOne({ _id: planID })
      .select("ownerID")
      .then((result) => {
        if (result.ownerID != req.user.id) {
          res.status(400).send("You are not authorized");
        }
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send("There was a problem with the server");
      });

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
