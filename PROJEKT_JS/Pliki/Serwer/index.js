var express = require("express");
var app = express();

// Set EJS as templating engine
app.set("view engine", "ejs");

// Employees data
const empSalary = [
  {
    name: "Sayan Ghosh",
    salary: 37000,
  },
  {
    name: "Susmita Sahoo",
    salary: 365000,
  },
  {
    name: "Nabonita Santra",
    salary: 36000,
  },
  {
    name: "Anchit Ghosh",
    salary: 30000,
  },
];

app.get("/employee/salary", (req, res) => {
  // Render method takes two parameter
  // first parameter is the ejs file to
  // render second parameter is an
  // object to send to the ejs file
  res.render("index.ejs", { empSalary: empSalary });
});

// Server setup
app.listen(3000, function (req, res) {
  console.log("Connected on port:3000");
});
