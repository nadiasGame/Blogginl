//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");


const homeStartingContent =
  "Välkommen till den snyggaste sidan ever...AWSOME pages.";
const aboutContent =
  "Vill ni vet va!!.";
const contactContent =
  "Googla för fan!!!";
  const composeContent ="";
const app = express();


app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

let posts = []; 

app.get("/", (req, res) => {
  res.render("home", { startingContent: homeStartingContent,posts:posts});
  
});
app.get("/about", (req, res) => {
  res.render("about", { aboutContent });
});
app.get("/contact", (req, res) => {
  res.render("contact", { contactContent });
});

app.get("/compose", (req, res) => {
  res.render("compose");
});


app.post("/compose", (req, res) => {
  
  const post = {
    title :  req.body.postTitle,
    content : req.body.postBody,
    
  }
  posts.push(post);
  res.redirect("/");
});

app.post("/post", (req, res) => {
  res.render("post");
});

app.get("/posts/:postName", (req, res) => {
 
  const requestedTitle = _.lowerCase (req.params.postName);
  posts.forEach((post) => {
     const storedTitle =_.lowerCase( post.title);
     if (storedTitle === requestedTitle) {
       res.render ("post", { title:post.title, content:post.content});

     }      
 });
});

app.listen(4000, function () {
  console.log("Server started on port 4000");
});
