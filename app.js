const express = require("express");
const bodyParser = require("body-parser");
const date = require(__dirname + "/date.js"); // current dir
const app = express();

const items = ["Programmeren", "Koken", "I'M A DANCER"];
const workItems = [];

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public")); // Now the CSS/JS can work

app.get("/", (req, res) => {
  const day = date.getDate(); // date function from date
  // render list.ejs, kindofday with day value used in template
  res.render("list", { listTitle: day, newListItems: items });
});

app.post("/", (req, res) => {
  const item = req.body.newItem;

  if (req.body.list === "Work") {
    workItems.push(item);
    res.redirect("/work");
  } else {
    items.push(item);
    res.redirect("/");
  }
});

app.get("/work", (req, res) => {
  res.render("list", { listTitle: "Work List", newListItems: workItems });
});

app.post("/work", (req, res) => {
  let item = req.body.newItem;
  workItems.push(item);
  res.redirect("/work");
});

app.get("/about", (req, res) => {
  res.render("about");
});

app.listen(4000, () => {
  console.log("Server started on port 4000.");
});
