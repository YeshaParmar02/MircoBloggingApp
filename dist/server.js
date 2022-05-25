"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const bodyParser = require("body-parser");
const config_1 = require("./config");
const DatabaseHandler_1 = require("./services/DatabaseHandler");
const UserController_1 = require("./controllers/UserController");
const PostController_1 = require("./controllers/PostController");
const CommentController_1 = require("./controllers/CommentController");
const app = express();
app.use(bodyParser.json());
const dbHandler = new DatabaseHandler_1.DatabaseHandler(config_1.config);
const usersController = new UserController_1.UsersController(dbHandler);
const postsController = new PostController_1.PostController(dbHandler);
const commentsController = new CommentController_1.CommentsController(dbHandler);
app.get("/", (req, res) => {
    console.log("Request ::", req.url, req.params);
    res.send("Welcome!");
});
// handle all the requests for the users object
app.get("/users", (req, res) => usersController.getAllUsers(req, res));
app.post("/users", (req, res) => usersController.getAllUsers(req, res));
app.get("/user/:id", (req, res) => usersController.getUserById(req, res));
app.delete("/user/:id", (req, res) => usersController.deleteUserById(req, res));
app.post("/user", (req, res) => usersController.addUser(req, res));
app.put("/user", (req, res) => usersController.updateUser(req, res));
// handle all the requests for the posts object
app.get("/posts", (req, res) => postsController.getAllPosts(req, res));
app.get("/posts/:userId", (req, res) => postsController.getAllPostsByUserId(req, res));
app.get("/post/:id", (req, res) => postsController.getPostById(req, res));
app.delete("/post/:id", (req, res) => postsController.deletePostById(req, res));
app.post("/post", (req, res) => postsController.addPost(req, res));
app.put("/post", (req, res) => postsController.updatePost(req, res));
// handle all the requests for the comments object
app.get("/comments", (req, res) => commentsController.getAllComments(req, res));
app.get("/comment/:id", (req, res) => commentsController.getCommentById(req, res));
app.get("/comment/:userId/:postId", (req, res) => commentsController.getCommentById(req, res));
app.delete("/comment/:id", (req, res) => commentsController.deleteCommentById(req, res));
app.post("/comment", (req, res) => commentsController.addComment(req, res));
app.put("/comment", (req, res) => commentsController.updateComment(req, res));
// Start the server
app.listen(config_1.config.port, () => {
    console.log("Micro blogging app service is started on port :: ", config_1.config.port);
});
//# sourceMappingURL=server.js.map