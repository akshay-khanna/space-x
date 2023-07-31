import express from "express";
import { router } from "./routes/index.js";
import cors from "cors";

import { ErrorHandler, removeStaleRecords, allowCrossDomain } from "./middlewares/index.js";
const app = express();
app.use("/public/uploads/", express.static("public/uploads"));
app.use(cors());
app.options("*", cors());
app.use(allowCrossDomain);
app.use(removeStaleRecords);
app.use(router);
app.use(ErrorHandler);

export default app;

