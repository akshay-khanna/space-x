import express from "express";
import { router } from "./routes/index.js";
import cors from "cors";
import { ErrorHandler, removeStaleRecords } from "./middlewares/index.js";
const app = express();
app.use("/public/uploads/", express.static("public/uploads"));
app.use(cors());
app.options("*", cors());
var allowCrossDomain = function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Methods",
    "GET, PUT, POST, DELETE",
    "OPTIONS"
  );
  res.header("Access-Control-Allow-Headers", "Content-Type");
  next();
};
app.use(allowCrossDomain);
app.use(removeStaleRecords);
app.use(router);
app.use(ErrorHandler);

app.listen("4000");
console.log(
  `Listening on port: 4000, wait for the development server to be up...`
);
