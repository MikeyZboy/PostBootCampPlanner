const Router = require('express').Router()
const controller = require('../controllers/LessonController')

Router.get('/view/:id', controller.getAll) // works
Router.post('/', controller.createOne) // works but doesn't pass an account_id
Router.get('/:id', controller.getOne) // works by grabbing the lesson by its id, not account_id <-- which may be okay
Router.put('/:id', controller.updateOne) // this is returning [0,[]] ... wtf
Router.delete('/:id', controller.deleteOne)

module.exports = Router