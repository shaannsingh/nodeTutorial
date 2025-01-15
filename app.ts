import express, { Request, Response } from "express";
import { result } from "lodash";

const app = express();
const morgan = require("morgan");
const mongoose = require("mongoose");
const blogRoutes = require("./routes/blogRoutes");

const dbURI =
  "mongodb+srv://shaandummy:cr33P3r6969*-.-!@nodetutorialcluster.mbbow.mongodb.net/node-tutorial?retryWrites=true&w=majority&appName=nodeTutorialCluster";

mongoose
  .connect(dbURI)
  .then((result: typeof mongoose) => {
    console.log("Connected to MongoDB, connecting to port 3000...");
    app.listen(3000);
  })
  .catch((err: Error) => console.log(err));

// Middleware
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

app.get("/", (req, res) => {
  res.redirect("/blogs");
});

app.get("/about", (req, res) => {
  res.render("about", { title: "About" });
  console.log(req.url, req.method);
});

app.use("/blogs", blogRoutes);

app.use((req, res) => {
  res.status(404).render("404", { title: "Not Found" });
  console.log(req.url, req.method);
});
