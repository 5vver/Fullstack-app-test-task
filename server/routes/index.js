const Router = require('express')
const router = new Router()

const authorRouter = require('./authorRouter')
const bookRouter = require('./bookRouter')

router.use('/authors', authorRouter)
router.use('/books', bookRouter)

module.exports = router