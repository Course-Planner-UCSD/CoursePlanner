const express = require("express");
const connectToDB = require("./config/db");
const app = express();

connectToDB();

app.use(express.json({ extended: false }));
//Routes
app.use("/api/register", require("./routes/api/register"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on localhost port ${PORT}`));
