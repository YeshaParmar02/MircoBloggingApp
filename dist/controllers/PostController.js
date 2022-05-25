"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostController = void 0;
class PostController {
    constructor(dbHandler) {
        this.dbService = dbHandler;
    }
    getAllPosts(req, res) {
        this.dbService.getAllObjects('Posts')
            .then((data) => {
            res.send(data);
        })
            .catch((err) => {
            console.log("Error while fetching posts", err);
            res.send("Unable to fetch all posts");
        });
    }
    getAllPostsByUserId(req, res) {
        const userId = req.params.userId;
        this.dbService.getAllObjects('Posts', `User_id = ${userId}`)
            .then((data) => {
            res.send(data);
        })
            .catch((err) => {
            console.log("Error while fetching posts", err);
            res.send("Unable to fetch all posts");
        });
    }
    getPostById(req, res) {
        const postId = req.params.id;
        this.dbService.getObjectById(postId, 'Posts')
            .then((data) => {
            res.send(data);
        })
            .catch((err) => {
            console.log("Error while fetching post", err);
            res.send("Unable to fetch post");
        });
    }
    deletePostById(req, res) {
        const postId = req.params.id;
        this.dbService.deleteObjectById(postId, 'Posts')
            .then((data) => {
            res.send("Post deleted!");
        })
            .catch((err) => {
            console.log("Error while deleting post", err);
            res.send("Unable to deleting post");
        });
    }
    addPost(req, res) {
        let body = req.body;
        const postObj = Object.keys(body).map((k) => { return "'" + body[k] + "'"; }).join(",");
        this.dbService.addObject("Posts", postObj)
            .then((data) => {
            res.send("Post is added successfully!");
        })
            .catch((err) => {
            console.log("error while adding a post", err);
            res.send("error while adding a posts");
        });
    }
    updatePost(req, res) {
        let body = req.body;
        const postId = body.id;
        delete body["id"];
        const postObj = Object.keys(body).map((k) => { return k + " = '" + body[k] + "'"; }).join(" , ");
        this.dbService.updateObject("Posts", postObj, postId)
            .then((data) => {
            res.send(`Post ${postId} is updated successfully!`);
        })
            .catch((err) => {
            console.log("error while adding a post", err);
            res.send(`error while adding a posts`);
        });
    }
}
exports.PostController = PostController;
//# sourceMappingURL=PostController.js.map