var express = require("express");
var bodyParser = require("body-parser");
var logger = require("morgan");
var mongoose = require("mongoose");

var app = express();
var PORT = process.env.PORT || 3000;

app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

app.use(express.static("./public"));

// Connects to MongoDB
mongoose.connect('mongodb://user:nyt123@ds127132.mlab.com:27132/heroku_pb7406n8');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'Mongoose connection error:'));
db.once('open', function() {
  console.log('Mongoose connection successful!')
  // we're connected!
});

// Requires schema
var Article = require("./server/Article");

// Defines api endpoints
app.get("/api/bookmarks", function(req, res) {
  Article.find({}, function(err, doc) {
    if (err) {
      console.log(err);
    }
    else {
      res.send(doc);
    }
  })
});
app.post("/api/bookmarks", function(req, res) {
  // Creates new bookmark for article to be saved
  var NewBookmark = new Article({
    article_id: req.body.article_id,
    title: req.body.title,
    url: req.body.url,
    pub_date: req.body.pub_date
  });
  // Checks if article already exists
  Article.find({article_id: req.body.article_id}, function(err, doc) {
    if (doc.length === 0) {
      NewBookmark.save(function(err, doc) {
        if (err) {
          console.log(err);
        }
        else {
          res.send(doc);
        }
      })
    }
  })
});
app.delete("/api/bookmarks", function(req, res) {
  Article.findOneAndRemove({article_id: req.body.article_id}, function(err, doc) {
    if (err) {
      console.log(err);
    }
    else {
      res.send(doc);
    }
  })
})

app.get("*", function(req, res) {
  res.sendFile(__dirname + "/public/index.html");
});

app.listen(PORT, function() {
  console.log("http://localhost:" + PORT);
});
