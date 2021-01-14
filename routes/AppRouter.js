const Router = require('express').Router()
const AccountRouter = require('./AccountRouter')
const LessonRouter = require('./LessonRouter')
const ResourceRouter = require('./ResourceRouter')
const UserRouter = require('./UserRouter')
const AchievementRouter = require('./AchievementRouter')

Router.get('/', (req, res) => res.send('This is root!*'))

Router.use('/', UserRouter)
Router.use('/accounts', AccountRouter) 
Router.use('/lessons', LessonRouter) 
Router.use('/resources', ResourceRouter) 
Router.use('/achievements', AchievementRouter)

module.exports = Router