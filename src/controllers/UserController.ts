import { Json } from "sequelize/types/utils";
import { IUser } from "../models/Users";
import { DatabaseHandler } from "../services/DatabaseHandler";

export class UsersController {
  public dbService: DatabaseHandler;

  constructor(dbHandler: DatabaseHandler) {
    this.dbService = dbHandler;
  }

  /**
   * Get all users data
   */
  public getAllUsers(req, res) {
    this.dbService.getAllObjects('Users')
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      console.log("Error while fetching users", err);
      res.send("Unable to fetch all users");
    });
  }

  /**
   * Get user data based on Id
   */
  public getUserById(req, res) {
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

  public deleteUserById(req, res) {
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

  public addUser(req, res) {
    let body: IUser = req.body;
    const userObj = Object.keys(body).map((k) => {return "'" + body[k] + "'"}).join(",");
    this.dbService.addObject("Users", userObj)
    .then((data) => {
      res.send("User is added successfully!");
    })
    .catch((err) => {
      console.log("error while adding a user", err);
        res.send("error while adding a users");
    });
  }

  public updateUser(req, res) {
    let body: IUser = req.body;
    const userId = body.id;
    delete body["id"];
    // make query by appending all the data in the request
    const userObj = Object.keys(body).map((k) => {return k + " = '" + body[k] + "'"}).join(" , ");
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
