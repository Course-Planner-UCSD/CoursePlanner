const express = require("express");
const connectToDB = require("./config/db");
const bodyParser = require("body-parser");
const app = express();

connectToDB();

app.use(bodyParser.urlencoded({ limit: "50mb", extended: false }));
app.use(bodyParser.json({ limit: "50mb" }));
//Routes
app.use("/api/register", require("./routes/api/register"));
app.use("/api/authentication", require("./routes/api/authentication"));
app.use("/api/checkAuth", require("./routes/api/checkAuth"));
app.use("/api/coursePlan", require("./routes/api/coursePlan"));

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () =>
  console.log(`Server started on localhost port ${PORT}`)
);

//removes process on exit properly
process.on("SIGTERM", shutDown);
process.on("SIGINT", shutDown);

function shutDown() {
  console.log("Shutting down server...");
  server.close(() => {
    process.exit(0);
  });
}
