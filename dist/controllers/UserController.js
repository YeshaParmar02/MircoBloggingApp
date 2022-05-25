"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersController = void 0;
class UsersController {
    constructor(dbHandler) {
        this.dbService = dbHandler;
    }
    getAllUsers(req, res) {
        this.dbService.getAllObjects('Users')
            .then((data) => {
            res.send(data);
        })
            .catch((err) => {
            console.log("Error while fetching users", err);
            res.send("Unable to fetch all users");
        });
    }
    getUserById(req, res) {
        const userId = req.params.id;
        console.log("user id", userId);
        this.dbService.getObjectById(userId, 'Users')
            .then((data) => {
            res.send(data);
        })
            .catch((err) => {
            console.log("Error while fetching user", err);
            res.send("Unable to fetch user");
        });
    }
    deleteUserById(req, res) {
        const userId = req.params.id;
        this.dbService.deleteObjectById(userId, 'Users')
            .then((data) => {
            res.send("User deleted!");
        })
            .catch((err) => {
            console.log("Error while deleting user", err);
            res.send("Unable to deleting user");
        });
    }
    addUser(req, res) {
        let body = req.body;
        const userObj = Object.keys(body).map((k) => { return "'" + body[k] + "'"; }).join(",");
        this.dbService.addObject("Users", userObj)
            .then((data) => {
            res.send("User is added successfully!");
        })
            .catch((err) => {
            console.log("error while adding a user", err);
            res.send("error while adding a users");
        });
    }
    updateUser(req, res) {
        let body = req.body;
        const userId = body.id;
        delete body["id"];
        const userObj = Object.keys(body).map((k) => { return k + " = '" + body[k] + "'"; }).join(" , ");
        this.dbService.updateObject("Users", userObj, userId)
            .then((data) => {
            res.send(`User ${userId} is updated successfully!`);
        })
            .catch((err) => {
            console.log("error while adding a user", err);
            res.send(`error while adding a users`);
        });
    }
}
exports.UsersController = UsersController;
//# sourceMappingURL=UserController.js.map