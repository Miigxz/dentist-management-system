import "dotenv/config";
import express from "express";
import rateLimiter from "./middleware/rateLimiter.js";
import cors from "cors";
import path from "path";

const app = express();
const port = process.env.PORT || 5001;
const __dirname = path.resolve();

//middleware -----------------------
if (process.env.NODE_ENV !== "production") {
  app.use(
    cors({
      origin: "http://localhost:5173",
    }),
  );
}
app.use(express.json());
app.use(rateLimiter);
// ---------------------------------

// Routes --------------------------
// ---------------------------------

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
  });
}

app.listen(port, () => {
  console.log("server started on port " + port);
});
