import express, { Request, Response } from "express";

const app = express();
const morgan = require("morgan");
const mongoose = require("mongoose");
const Blog = require("./models/blog");

// Middleware
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(morgan("dev"));

// Routing

app.get("/add-blog", (req, res) => {
  const blog = new Blog({
    title: "About my learning",
    snippet: "So when I started to learn Node...",
    body: "...I'll tell you later",
  });

  blog
    .save()
    .then((result: any) => {
      res.send(result);
    })
    .catch((err: Error) => console.log(err));
});

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
  const blogs = [
    {
      title: "Yoshi finds eggs",
      snippet: "Lorem ipsum dolor sit amet consectetur",
    },
    {
      title: "Mario finds stars",
      snippet: "Lorem ipsum dolor sit amet consectetur",
    },
    {
      title: "How to defeat bowser",
      snippet: "Lorem ipsum dolor sit amet consectetur",
    },
  ];
  res.render("index", { title: "Home", blogs });
});

app.get("/about", (req, res) => {
  res.render("about", { title: "About" });
  console.log(req.url, req.method);
});

app.get("/blogs/create", (req, res) => {
  res.render("create", { title: "Create" });
  console.log(req.url, req.method);
});

app.use((req, res) => {
  res.status(404).render("404", { title: "Not Found" });
  console.log(req.url, req.method);
});
