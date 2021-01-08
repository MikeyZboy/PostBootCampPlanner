const Router = require("express").Router()
const controller = require("../controllers/AchievementController")
const multer = require("multer");

let storage = multer.memoryStorage();

Router.get("/", controller.getAll)
Router.post("/", multer({storage}).single('achievementImage'), controller.createOne)
Router.delete("/:id", controller.deleteOne)

// from lesson <-- not necessary here, this is just because he's not using an approuter
// app.get('/people', GetPeople)
// app.post('/people', multer({storage}).single('achievementImage') CreatePerson)
// app.use('/people/:person_id', GetPerson)


module.exports = Router