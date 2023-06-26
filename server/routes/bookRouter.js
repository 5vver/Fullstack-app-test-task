const Router = require('express')
const router = new Router()
const bookController = require('../controllers/bookController')

router.get('/', bookController.getAll)
router.get('/booksWithAuthors', bookController.getBooksWithAuthors)
router.get('/:id', bookController.getOne)
router.post('/', bookController.createOne)
router.delete('/:id', bookController.deleteOne)
router.put('/:id', bookController.updateOne)

module.exports = router