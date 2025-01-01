import express, { Request, Response } from "express";

const app = express();

app.get("/", (req, res) => {
  res.sendFile("./views/index.html", { root: __dirname });
  console.log(req.url, req.method);
});

app.get("/about", (req, res) => {
  res.sendFile("./views/about.html", { root: __dirname });
  console.log(req.url, req.method);
});

app.get("/about-me", (req, res) => {
  res.redirect("/about");
  console.log(req.url, req.method);
});

app.use((req, res) => {
  res.status(404).sendFile("./views/404.html", { root: __dirname });
  console.log(req.url, req.method);
});

app.listen(3000);
