const mongoose = require("mongoose");

const CoursePlanSchema = new mongoose.Schema({
  ownerID: String,
  planID: String,
  name: String,
  notes: String,
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
            units: Number,
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
            units: Number,
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
            units: Number,
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
            units: Number,
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
            units: Number,
          },
        ],
      },
    ],
  },
});

module.exports = coursePlan = mongoose.model("courseplan", CoursePlanSchema);
