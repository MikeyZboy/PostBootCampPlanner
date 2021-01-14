const Router = require("express").Router();
const controller = require("../controllers/LessonController");

Router.get("/view/:id", controller.getAll);
Router.post("/", controller.createOne);
Router.get("/:id", controller.getOne);
Router.put("/:id", controller.updateOne); 
Router.delete("/:id", controller.deleteOne);

module.exports = Router;
