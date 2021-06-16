const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

const personRoutes = require("./routes/personRoutes");

const port = process.env.PORT || 5000;
dotenv.config();

mongoose.set("useNewUrlParser", true);
mongoose.set("useFindAndModify", false);
mongoose.set("useCreateIndex", true);
mongoose.set("useUnifiedTopology", true);

//connect to database
mongoose
  .connect(process.env.DB_CONNECTION, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((result) => {
    // listen to requests when connected to db
    app.listen(port);
    console.log("connected to database!");
  })
  .catch((error) => console.log(error));

//middlewares
app.use(express.json());
app.use(cors());

app.use("/person", personRoutes);

app.get("/", (req, res) => {
  res.send("<h1>welcome!</h1>");
});
