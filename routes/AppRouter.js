const Router = require('express').Router()
const AccountRouter = require('./AccountRouter')
const LessonRouter = require('./LessonRouter')
const ResourceRouter = require('./ResourceRouter')

Router.get('/', (req, res) => res.send('This is root!*'))

Router.use('/accounts', AccountRouter)
Router.use('/lessons', LessonRouter)
Router.use('resources', ResourceRouter)

module.exports = Router