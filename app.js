require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const app = express();

// IMPORTING THE ROUTES //
const authRoute = require("./routes/auth.js");
const userRoute = require("./routes/user.js");
const videoRoute = require("./routes/video.js");


// DTABASE CONNECTION //
mongoose.connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => {
    console.log("DATABASE CONNECTED");
  });

// USING MIDDLEWARES //
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());


// CREATING VIDEOAPI //
app.use("/videoapi", authRoute);
app.use("/videoapi", userRoute);
app.use("/videoapi", videoRoute);


// PORT //
const port = process.env.PORT;

// SERVER //
app.listen(port, (req, res) => {
    console.log(`server is up and running at ${port}`);
})

// TEST //
app.get("/user", (req, res) => {
    res.send("hello man how are you");
})