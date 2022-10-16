const cloudinary = require("cloudinary");
const connectDatabase = require("./config/db");
const express = require("express");
const cookiesParser = require("cookie-parser");
const errorMiddleware = require("./middlewares/errors");
const bodyparser = require("body-parser");

var cors = require("cors");
const app = express();

//allow all to requst domain
app.use(
  cors({
    origin: true,
    credentials: true,
    optionsSuccessStatus: 200,
  })
);
app.use("/images", express.static("images"));
app.use(express.json({ limit: "50mb" }));
app.use(bodyparser.urlencoded({ extended: true }));
app.use(cookiesParser());

app.set("trust proxy", 1);
// import all routes here
const product = require("./routes/product");
const user = require("./routes/auth");
const order = require("./routes/order");
const payment = require("./routes/payment");
const slider = require("./routes/slider");
app.use("/api/auth", user);
app.use("/api", product);
app.use("/api", order);
app.use("/api", payment);
app.use("/api", slider);

app.get("/api", (req, res) => {
  res.send("Api is working on Port ");
});
//middleware to handle errors
app.use(errorMiddleware);
//setupn of cloudnary
cloudinary.config({
  cloud_name: "ab-ecommerce",
  api_key: "441619151451343",
  api_secret: "U_hWsazTOwFgvjhipPB6kr8Hloo",
});
//setting up config file
const path = require("path");
require("dotenv").config({
  path: path.join(__dirname, ".env"),
});
//cennectting to mongodb
connectDatabase();
app.listen(process.env.PORT, () => {
  console.log(
    `backend listening at http://localhost:${process.env.PORT} in ${process.env.NODE_ENV} mode.`
  );
});
