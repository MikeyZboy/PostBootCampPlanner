const Router = require('express').Router()
const controller = require('../controllers/UserController')

Router.post('/signup', controller.createAccount)
Router.post("/signin", controller.signIn);

module.exports = Router