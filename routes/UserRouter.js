const Router = require('express').Router()
const controller = require('../controllers/UserController')
const {
    createToken,
    verifyToken,
    getToken
} = require('../middleware/jwtHandler')

Router.post('/signup', controller.createAccount)
Router.post("/signin", controller.signIn, createToken);
Router.get('/refresh/session', getToken, verifyToken, controller.refreshSession)

module.exports = Router