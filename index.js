// index.js
// where your node app starts

// init project
var express = require("express");
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require("cors");
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/views/index.html");
});

// your first API endpoint...
app.get("/api/hello", function (req, res) {
  res.json({ greeting: "hello API" });
});

app.get("/api/:date?", (req, res) => {
  const { date } = req.params;

  let dt_to_num;

  if (date) {
    dt_to_num = Number(date);
  } else {
    dt_to_num = Number(new Date());
  }

  if (isNaN(dt_to_num) && new Date(date) == "Invalid Date") {
    res.json({
      error: "Invalid Date",
    });
  } else {
    if (new Date(date) == "Invalid Date") {
      res.json({
        unix: dt_to_num,
        utc: new Date(dt_to_num).toUTCString(),
      });
    } else {
      res.json({
        unix: new Date(date).getTime(),
        utc: new Date(date).toUTCString(),
      });
    }
  }
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log("Your app is listening on port " + listener.address().port);
});
