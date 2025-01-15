import express, { Request, Response } from "express";
import { Blog } from "../models/blog";
import {
  blogIndex,
  blogCreatePost,
  blogDetails,
  blogCreateGet,
  blogDelete,
} from "../controllers/blogController";

const router = express.Router();

router.get("/", blogIndex);
router.get("/create", blogCreateGet);
router.post("/", blogCreatePost);
router.get("/:id", blogDetails);
router.delete("/:id", blogDelete);

module.exports = router;
