import express from "express";
import { get } from "../controllers/dentistController.js";

const router = express.Router();

router.get("/", get);
// router.post("/", create);
// router.put("/:id", update);
// router.delete("/:id", remove);

export default router;
