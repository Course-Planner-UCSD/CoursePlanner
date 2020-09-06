const mongoose = require("mongoose");

const CoursePlanSchema = new mongoose.Schema({
  ownerID: String,
  planID: String,
  name: String,
  createdDate: {
    type: Date,
    default: Date.now,
  },
  modifiedDate: {
    type: Date,
    default: Date.now,
  },
  lastOpened: {
    type: Date,
    default: Date.now,
  },
  firstYear: {
    quarters: [
      {
        season: String,
        courses: [
          {
            course: String,
          },
        ],
      },
    ],
  },
  secondYear: {
    quarters: [
      {
        season: String,
        courses: [
          {
            course: String,
          },
        ],
      },
    ],
  },
  thirdYear: {
    quarters: [
      {
        season: String,
        courses: [
          {
            course: String,
          },
        ],
      },
    ],
  },
  fourthYear: {
    quarters: [
      {
        season: String,
        courses: [
          {
            course: String,
          },
        ],
      },
    ],
  },
  fifthYear: {
    quarters: [
      {
        season: String,
        courses: [
          {
            course: String,
          },
        ],
      },
    ],
  },
});

module.exports = coursePlan = mongoose.model("courseplan", CoursePlanSchema);
