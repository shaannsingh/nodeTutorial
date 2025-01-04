import express, { Request, Response } from "express";

const app = express();
const morgan = require("morgan");

app.set("view engine", "ejs");

app.listen(3000);

app.use(express.static("public"));
app.use(morgan("dev"));

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
  console.log(req.url, req.method);
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
