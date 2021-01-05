const Router = require('express').Router()
const controller = require('../controllers/LessonController')

Router.get('/', controller.getAll)
Router.post('/:id', controller.createOne)
Router.get('/:id', controller.getOne)
Router.put('/:id', controller.updateOne)
Router.delete('/:id', controller.deleteOne)

module.exports = Router