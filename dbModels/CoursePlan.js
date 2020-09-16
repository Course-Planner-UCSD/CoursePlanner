const mongoose = require("mongoose");

const CoursePlanSchema = new mongoose.Schema({
  ownerID: String,
  planID: String,
  name: String,
  notes: String,
  showSummer: Boolean,
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
            units: String,
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
            units: String,
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
            units: String,
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
            units: String,
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
            units: String,
          },
        ],
      },
    ],
  },
});

module.exports = coursePlan = mongoose.model("courseplan", CoursePlanSchema);
