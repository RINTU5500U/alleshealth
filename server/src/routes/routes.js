const routes = require('express').Router()

const { userLogin, userRegister,createText,getText } = require('../controller/user.controller')
const auth = require('../middleware/auth.middleware')

routes.post('/login', userLogin)
routes.post('/register', userRegister)
routes.post('/create_text', auth,createText)
routes.get('/get_text',auth,getText)


module.exports = routes;