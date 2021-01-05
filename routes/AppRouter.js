const Router = require('express').Router()
const AccountRouter = require('./AccountRouter')
const LessonRouter = require('./LessonRouter')
const ResourceRouter = require('./ResourceRouter')

Router.get('/', (req, res) => res.send('This is root!*'))

Router.use('/accounts', AccountRouter) //works with /api/accounts/1 <-- Joe Schmoe and all his resources, lessons
Router.use('/lessons', LessonRouter) // works with /api/lessons/1 <-- just the lesson with id 1
Router.use('/resources', ResourceRouter) // 

module.exports = Router