const mongoose = require("mongoose");

const CoursePlanSchema = new mongoose.Schema({
  ownerID: String,
  firstYear: {
    quarters: [
      {
        season: String,
        course1: String,
        course2: String,
        course3: String,
        course4: String,
        course5: String,
        course6: String,
        course7: String,
      },
    ],
  },
  secondYear: {
    quarters: [
      {
        season: String,
        course1: String,
        course2: String,
        course3: String,
        course4: String,
        course5: String,
        course6: String,
        course7: String,
      },
    ],
  },
  thirdYear: {
    quarters: [
      {
        season: String,
        course1: String,
        course2: String,
        course3: String,
        course4: String,
        course5: String,
        course6: String,
        course7: String,
      },
    ],
  },
  fourthYear: {
    quarters: [
      {
        season: String,
        course1: String,
        course2: String,
        course3: String,
        course4: String,
        course5: String,
        course6: String,
        course7: String,
      },
    ],
  },
  fifthYear: {
    quarters: [
      {
        season: String,
        course1: String,
        course2: String,
        course3: String,
        course4: String,
        course5: String,
        course6: String,
        course7: String,
      },
    ],
  },
});

module.exports = coursePlan = mongoose.model("courseplan", CoursePlanSchema);
