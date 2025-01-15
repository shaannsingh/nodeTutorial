import { Blog } from "../models/blog";
import { Request, Response } from "express";

const blogIndex = (req: Request, res: Response) => {
  Blog.find()
    .sort({ createdAt: -1 }) //descending order
    .then((result: any) => {
      res.render("blogs/index", { title: "All Blogs", blogs: result });
    })
    .catch((err: Error) => {
      console.log(err);
    });
};

const blogDetails = (req: Request, res: Response) => {
  const id = req.params.id;
  Blog.findById(id)
    .then((result: any) => {
      res.render("blogs/details", { blog: result, title: "Blog Details" });
    })
    .catch((err: Error) => {
      console.log(err);
    });
};

const blogCreatePost = (req: Request, res: Response) => {
  const blog = new Blog(req.body);

  blog
    .save()
    .then((result: any) => {
      res.redirect("/blogs");
    })
    .catch((err: Error) => {
      console.log(err);
    });
};

const blogCreateGet = (req: Request, res: Response) => {
  res.render("blogs/create", { title: "Create" });
};

const blogDelete = (req: Request, res: Response) => {
  const id = req.params.id;
  Blog.findByIdAndDelete(id)
    .then((result: any) => {
      res.json({
        redirect: "/blogs",
      });
    })
    .catch((err: Error) => console.log(err));
};

export { blogIndex, blogCreatePost, blogDetails, blogCreateGet, blogDelete };
