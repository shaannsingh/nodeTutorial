import express, { Request, Response } from "express";

const app = express();
app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.render("index");
  console.log(req.url, req.method);
});

app.get("/about", (req, res) => {
  res.render("about");
  console.log(req.url, req.method);
});

app.get("/blogs/create", (req, res) => {
  res.render("create");
  console.log(req.url, req.method);
});

app.use((req, res) => {
  res.status(404).render("404");
  console.log(req.url, req.method);
});

app.listen(3000);
