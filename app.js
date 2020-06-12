require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const app = express();

const authRoute = require("./routes/auth.js");
const userRoute = require("./routes/user.js");
const videoRoute = require("./routes/video.js");



mongoose.connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => {
    console.log("DATABASE CONNECTED");
  });

app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());



app.use("/videoapi", authRoute);
app.use("/videoapi", userRoute);
app.use("/videoapi", videoRoute);



const port = process.env.PORT;


app.listen(port, (req, res) => {
    console.log(`server is up and running at ${port}`);
})

app.get("/user", (req, res) => {
    res.send("hello man how are you");
})