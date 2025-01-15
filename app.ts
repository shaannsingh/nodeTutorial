import express, { Request, Response } from "express";
import { result } from "lodash";

const app = express();
const morgan = require("morgan");
const mongoose = require("mongoose");
const Blog = require("./models/blog");

// Middleware
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

const dbURI =
  "mongodb+srv://shaandummy:cr33P3r6969*-.-!@nodetutorialcluster.mbbow.mongodb.net/node-tutorial?retryWrites=true&w=majority&appName=nodeTutorialCluster";

mongoose
  .connect(dbURI)
  .then((result: typeof mongoose) => {
    console.log("Connected to MongoDB, connecting to port 3000...");
    app.listen(3000);
  })
  .catch((err: Error) => console.log(err));

app.get("/", (req, res) => {
  res.redirect("/blogs");
});

app.get("/about", (req, res) => {
  res.render("about", { title: "About" });
  console.log(req.url, req.method);
});

app.get("/blogs", (req, res) => {
  Blog.find()
    .sort({ createdAt: -1 }) //descending order
    .then((result: any) => {
      res.render("index", { title: "All Blogs", blogs: result });
    })
    .catch((err: Error) => {
      console.log(err);
    });
});

app.post("/blogs", (req, res) => {
  const blog = new Blog(req.body);

  blog
    .save()
    .then((result: any) => {
      res.redirect("/blogs");
    })
    .catch((err: Error) => {
      console.log(err);
    });
});

app.get("/blogs/create", (req, res) => {
  res.render("create", { title: "Create" });
  console.log(req.url, req.method);
});

app.get("/blogs/:id", (req, res) => {
  const id = req.params.id;
  Blog.findById(id)
    .then((result: any) => {
      res.render("details", { blog: result, title: "Blog Details" });
    })
    .catch((err: Error) => {
      console.log(err);
    });
});

app.delete("/blogs/:id", (req, res) => {
  const id = req.params.id;
  Blog.findByIdAndDelete(id)
    .then((result: any) => {
      res.json({
        redirect: "/blogs",
      });
    })
    .catch((err: Error) => console.log(err));
});

app.use((req, res) => {
  res.status(404).render("404", { title: "Not Found" });
  console.log(req.url, req.method);
});
