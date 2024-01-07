const express = require("express");

const {
  getUser,
  createUser,
  updateUser,
  deleteUser,
} = require("./users.controller");
const verifyAuth = require("../../middleware/auth");

const usersRouter = express.Router();
usersRouter.use(verifyAuth);

usersRouter.get("/:id", getUser);
usersRouter.post("/", createUser);
usersRouter.put("/:id", updateUser);
usersRouter.delete("/:id", deleteUser);

module.exports = usersRouter;
