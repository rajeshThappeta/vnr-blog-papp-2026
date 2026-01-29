import express from "express";
import { Article } from "../models/ArticleModel.js";
import { User } from "../models/UserTypeModel.js";
import { getAuth } from "@clerk/express";
export const authorRouter = express.Router();

//API routes

//Create new Article
authorRouter.post("/article", async (req, res) => {
  //Auth
  const { userId } = getAuth(req);
  if (!userId) {
    return res.json({
      status: 401,
      message: "Authentication required",
    });
  }

  //fetch author from db
  let author = await User.findOne({ clerkUserId: userId });

  //check author
  if (!author) {
    return res.status(404).json({
      error: "AUTHOR_NOT_FOUND",
      message: "Author profile not found",
    });
  }

  //check role
  if (author.role !== "AUTHOR") {
    return res.status(403).json({
      error: "FORBIDDEN",
      message: "Only authors can create articles",
    });
  }

  //Create atricle document
  const newArticle = new Article({
    author: author._id,
    title: req.body.title,
    category: req.body.category,
    content: req.body.content,
  });
  //save document
  await newArticle.save();

  //send res
  res.status(201).json({
    message: "Article created",
    payload: newArticle,
  });
});
