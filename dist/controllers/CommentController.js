"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommentsController = void 0;
class CommentsController {
    constructor(dbHandler) {
        this.dbService = dbHandler;
    }
    getAllComments(req, res) {
        this.dbService.getAllObjects('Comments')
            .then((data) => {
            res.send(data);
        })
            .catch((err) => {
            console.log("Error while fetching comments", err);
            res.send("Unable to fetch all comments");
        });
    }
    getAllCommentsByUserIdPostId(req, res) {
        const userId = req.params.userId;
        const postId = req.params.postId;
        this.dbService.getAllObjects('Comments', `User_Id = ${userId} and Post_Id = ${{ postId }}`)
            .then((data) => {
            res.send(data);
        })
            .catch((err) => {
            console.log("Error while fetching comments", err);
            res.send("Unable to fetch all comments");
        });
    }
    getCommentById(req, res) {
        const cId = req.params.id;
        this.dbService.getObjectById(cId, 'Comments')
            .then((data) => {
            res.send(data);
        })
            .catch((err) => {
            console.log("Error while fetching a comment", err);
            res.send("Unable to fetch a comment");
        });
    }
    deleteCommentById(req, res) {
        const cId = req.params.id;
        this.dbService.deleteObjectById(cId, 'Comments')
            .then((data) => {
            res.send("Comments deleted!");
        })
            .catch((err) => {
            console.log("Error while deleting a comment", err);
            res.send("Unable to deleting a comment");
        });
    }
    addComment(req, res) {
        let body = req.body;
        const commentObj = Object.keys(body).map((k) => { return "'" + body[k] + "'"; }).join(",");
        this.dbService.addObject("Comments", commentObj)
            .then((data) => {
            res.send("Comment is added successfully!");
        })
            .catch((err) => {
            console.log("error while adding a comment", err);
            res.send("error while adding a comment");
        });
    }
    updateComment(req, res) {
        let body = req.body;
        const cId = body.id;
        delete body["id"];
        const commentObj = Object.keys(body).map((k) => { return k + " = '" + body[k] + "'"; }).join(" , ");
        this.dbService.updateObject("Comments", commentObj, cId)
            .then((data) => {
            res.send(`Comment ${cId} is updated successfully!`);
        })
            .catch((err) => {
            console.log("error while adding a Comment", err);
            res.send(`error while adding a Comments`);
        });
    }
}
exports.CommentsController = CommentsController;
//# sourceMappingURL=CommentController.js.map