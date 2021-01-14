const Router = require("express").Router()
const controller = require("../controllers/AchievementController")
const multer = require("multer");

let storage = multer.memoryStorage();

Router.get("/", controller.getAll)
Router.post("/", multer({storage}).single('achievementImage'), controller.createOne)
Router.delete("/:id", controller.deleteOne)

module.exports = Router