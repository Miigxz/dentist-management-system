import "dotenv/config";

import express from "express";

import rateLimiter from "./middleware/rateLimiter.js";

const app = express();
const port = process.env.PORT || 5001;

//middleware
app.use(express.json());
app.use(rateLimiter);

app.listen(port, () => {
  console.log("server started on port " + port);
});
