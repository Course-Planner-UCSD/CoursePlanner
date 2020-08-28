const express = require("express");
const connectToDB = require("./config/db");
const app = express();

connectToDB();

app.use(express.json({ extended: false }));
//Routes
app.use("/api/register", require("./routes/api/register"));
app.use("/api/authentication", require("./routes/api/authentication"));
app.use("/api/userData", require("./routes/api/userData"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on localhost port ${PORT}`));

//removes process on exit properly
process.once("SIGUSR2", function () {
  gracefulShutdown(function () {
    process.kill(process.pid, "SIGUSR2");
  });
});
