// Dependencies
// =============================================================

// Requiring our Todo model
var db = require("../models");
var passport = require("../config/passport");

// Routes
// =============================================================
module.exports = function(app) {
  // GET route for getting all of the posts
  app.get("/api/posts", function(req, res) {
    // Add sequelize code to find all posts, and return them to the user with res.json
    db.Post.findAll({}).then(dbPost => {
      res.json(dbPost);
    });
  });

  // Get route for returning posts of a specific category
  app.get("/api/posts/category/:category", function(req, res) {
    // Add sequelize code to find all posts where the category is equal to req.params.category,
    // return the result to the user with res.json
    db.Post.findAll({
      where: {
        category: req.params.category
      }
    }).then(dbPost => {
      res.json(dbPost);
    });
  });

  // Get route for retrieving a single post
  app.get("/api/posts/:id", function(req, res) {
    // Add sequelize code to find a single post where the id is equal to req.params.id,
    // return the result to the user with res.json
    db.Post.findOne({
      where: {
        id: req.params.id
      }
    }).then(dbPost => {
      res.json(dbPost);
    });
  });

  // POST route for saving a new post
  app.post("/api/posts", function(req, res) {
    // Add sequelize code for creating a post using req.body,
    // then return the result using res.json
    db.Post.create({
      name: req.body.name,
      bio: req.body.bio,
      email: req.body.email,
      photo: req.body.photo,
      password: req.body.password
    }).then(dbPost => {
      res.json(dbPost);
    });
  });
  // Using the passport.authenticate middleware with our local strategy.
  // If the user has valid login credentials, send them to the members page.
  // Otherwise the user will be sent an error
  app.post("/api/login", passport.authenticate("local"), function(req, res) {
    res.json(req.user);
  });

  // DELETE route for deleting posts
  app.delete("/api/posts/:id", function(req, res) {
    // Add sequelize code to delete a post where the id is equal to req.params.id,
    // then return the result to the user using res.json
    db.Post.destroy({
      where: {
        id: req.params.id
      }
    }).then(dbPost => {
      res.json(dbPost);
    });
  });

  // PUT route for updating posts
  app.put("/api/posts", function(req, res) {
    // Add code here to update a post using the values in req.body, where the id is equal to
    // req.body.id and return the result to the user using res.json
    db.Post.update(req.body, {
      where: {
        id: req.body.id
      }
    });
  });
};
