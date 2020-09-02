const mongoose = require("mongoose");
const config = require("config");
const db = config.get("mongoURI");

// removing depreciations
mongoose.set("useUnifiedTopology", true);
mongoose.set("useNewUrlParser", true);
mongoose.set("useCreateIndex", true);
mongoose.set("useFindAndModify", false);

//connect to Database
const connectToDB = async () => {
  try {
    await mongoose.connect(db).then(() => {
      console.log("Connected to MongoDB");
    });
  } catch (err) {
    console.error(err.message);
  }
};

module.exports = connectToDB;
