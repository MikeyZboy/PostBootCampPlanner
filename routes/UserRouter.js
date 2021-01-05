const Router = require('express').Router()
const controller = require('../controllers/UserController')

Router.post('/signup', controller.createUser)
Router.post("/signin", controller.signInUser);

module.exports = Router