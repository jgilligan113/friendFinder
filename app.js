//set up dependencies
// =============================================================
var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var fs = require('fs');
var aMath = require('array-math');
var diff = require('math-absolute-difference');
var math = require('mathjs');
var sortBy = require('sort-by');
var friends = require('./friends.js');
//set up Express App
// =============================================================
var app = express();
var PORT = 8080;
// Sets up the Express app to handle data parsing
// =============================================================
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.text());
app.use(bodyParser.json({
  type: "application/json"
}));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname)));

//set up routes
// =============================================================
// Basic route that sends the user first to the AJAX Page
app.get("/", function (req, res) {
  // res.send("Welcome to the Star Wars Page!")
  res.sendFile(path.join(__dirname, "index.html"));
});

app.get("/survey", function (req, res) {
  // res.send("Welcome to the Star Wars Page!")
  res.sendFile(path.join(__dirname, "survey.html"));
});
app.get("/api/friends", function (req, res) {
  // res.send("Welcome to the Star Wars Page!")
  return res.json(friends.friends);;
});
app.post("/add", function (req, res) {
  // res.send("Welcome to the Star Wars Page!")
  var newFriend = req.body;
  console.log(newFriend);
  console.log(newFriend.answers);
  

  for (var i = 0; i < friends.friends.length; i++) {
    var answerdiff = [];

    for (var int = 0; int < newFriend.answers.length; int++) {

      console.log(newFriend.answers[int]);
      console.log(friends.friends[i].answers[int]);
      answerdiff.push(diff(parseInt(newFriend.answers[int]), parseInt(friends.friends[i].answers[int])));
      console.log(answerdiff);
      console.log("this is the difference in the answers: ", aMath.sum(answerdiff));
    }
    friends.friends[i].difference = aMath.sum(answerdiff);
  }
  // var minDiff = getMin(friends.friends, "difference");
  //   console.log(minDiff.name + " - " + minDiff.difference);
  // console.log("This is the array of differences" , differences);
  // We then add the json the user sent to the character array
  friends.friends.push(newFriend);
  // var minimum = getMin(friends.friends, 'difference')
  // console.log(minimum);
  // We then display the JSON to the users
  
  var matchArr = friends.friends.sort(sortBy('difference'));
  console.log(matchArr)
  console.log(matchArr[1]);
  res.json(newFriend, matchArr[1]);
  

  //res.json(matchFriend);
});

// Starts the server to begin listening
// =============================================================
app.listen(PORT, function () {
  console.log("App listening on PORT " + PORT);
  //console.log(friends.friends[0]);
});


